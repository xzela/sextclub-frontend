"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useActionState, useRef, useState } from "react";
import {
  CA_DRIVER_LICENSE_POSITIONS,
  isOldeEnough,
  runOcrFromCanvas,
} from "../client/lib/verification-helper";

type InitialState = {
  message: string;
  image?: ImageBitmap | null;
};

const initialState: InitialState = {
  message: "",
  image: null,
};

export default function VerificationPage() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [ocrRunning, setOcrRunning] = useState(false);
  const canvasRef = useRef(null);
  const webcamCanvasRef = useRef(null);
  const videoRef = useRef(null);
  const intervalRef = useRef<number | null>(null);
  const { data: session, status } = useSession();

  async function fileUpload(previousState: InitialState, formData: FormData) {
    const file = formData.get("identification") as File;
    let imageBitmap = null;
    try {
      // Step 1: Create the imageBitmap from the uploaded file
      // Step 1: Decode the uploaded image
      imageBitmap = await createImageBitmap(file);

      // === Step 2: Resize the image to fit within max dimensions while preserving aspect ratio ===
      const maxWidth = CA_DRIVER_LICENSE_POSITIONS.idWidth;
      const maxHeight = CA_DRIVER_LICENSE_POSITIONS.idWidth;

      const originalWidth = imageBitmap.width;
      const originalHeight = imageBitmap.height;

      const scaleRatio = Math.min(
        maxWidth / originalWidth,
        maxHeight / originalHeight
      );
      const scaledWidth = Math.round(originalWidth * scaleRatio);
      const scaledHeight = Math.round(originalHeight * scaleRatio);

      // === Step 3: Draw the scaled image into an offscreen canvas ===
      const offscreenCanvas = document.createElement(
        "canvas"
      ) as unknown as HTMLCanvasElement;
      offscreenCanvas.width = scaledWidth;
      offscreenCanvas.height = scaledHeight;

      const offscreenCtx = offscreenCanvas.getContext(
        "2d"
      ) as CanvasRenderingContext2D;
      offscreenCtx.drawImage(imageBitmap, 0, 0, scaledWidth, scaledHeight);

      // === Step 4: Crop fixed coordinates from the scaled image ===
      const cropY = 225;
      const cropX = 455;
      const cropWidth = 204;
      const cropHeight = 66;

      const canvas = canvasRef.current as unknown as HTMLCanvasElement;
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

      canvas.width = cropWidth;
      canvas.height = cropHeight;

      ctx.drawImage(
        offscreenCanvas,
        cropX,
        cropY, // source region (on scaled image)
        cropWidth,
        cropHeight, // size to copy
        0,
        0, // destination in canvas
        cropWidth,
        cropHeight // final drawn size
      );
      const text = await runOcrFromCanvas(canvas);
      console.log(text);
      const isOldEnough = isOldeEnough(text);
      console.log(isOldEnough);
    } catch (err) {
      console.error("Error displaying image in canvas:", err);
    }

    return {
      message: "All Done",
      image: imageBitmap,
    };
  }

  async function startWebCam() {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      const video = videoRef.current as unknown as HTMLVideoElement;
      video.srcObject = mediaStream;
      setStream(mediaStream);
      return video;
    } catch (err) {
      console.error("Error accessing webcam:", err);
      return false;
    }
  }

  function getScaledDimensions(width: number, height: number): Record<string, number> {
    const FIXED = {
      idWidth: 600,
      idHeight: 427,
    };

    const scaleRatio = Math.min(width / FIXED.idWidth, height / FIXED.idHeight);
    const scaledWidth = Math.round(FIXED.idWidth * scaleRatio) - 20 * 2;
    const scaledHeight = Math.round(FIXED.idHeight * scaleRatio) - 20 * 2;

    const x = (width - scaledWidth) / 2;
    const y = (height - scaledHeight) / 2;

    return { x, y };
  }

  const initWebCam = async () => {
    const video = await startWebCam();
    if (video === false) {
      return;
    }
    video.addEventListener("loadedmetadata", () => {
      const canvas = webcamCanvasRef.current as unknown as HTMLCanvasElement;
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const { x: scaledWidth, y: scaledHeight } = getScaledDimensions(
        canvas.width,
        canvas.height
      );

      ctx?.clearRect(0, 0, canvas.width, canvas.height);

      // const FIXED = {
      //   idWidth: 600,
      //   idHeight: 427,
      // };
      // const scaleRatio = Math.min(
      //   canvas.width / FIXED.idWidth,
      //   canvas.height / FIXED.idHeight
      // );

      // const scaledWidth = Math.round(FIXED.idWidth * scaleRatio) - 20 * 2;
      // const scaledHeight = Math.round(FIXED.idHeight * scaleRatio) - 20 * 2;

      const x = (canvas.width - scaledWidth) / 2;
      const y = (canvas.height - scaledHeight) / 2;

      ctx.lineWidth = 3;
      ctx.strokeStyle = "red";
      ctx.strokeRect(x, y, scaledWidth, scaledHeight);

      startOcrLoop();
    });
  };

  const [state, fileUploadAction, pending] = useActionState(
    fileUpload,
    initialState
  );

  // Start periodic OCR once video is playing
  const startOcrLoop = () => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    const video = videoRef.current as unknown as HTMLVideoElement;
    const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;

    if (!canvas || !video || !ctx) return;

    intervalRef.current = window.setInterval(async () => {
      if (ocrRunning) return; // Avoid overlapping calls

      setOcrRunning(true);
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const { x: scaledWidth, y: scaledHeight } = getScaledDimensions(canvas.width, canvas.height);

      ctx.drawImage(video, 0, 0, scaledWidth, scaledHeight);

      try {
        await runOcrFromCanvas(canvas);
      } catch (err) {
        console.error("OCR error:", err);
      } finally {
        setOcrRunning(false);
      }
    }, 3000); // every 3 seconds
  };

  if (status != "authenticated") {
    redirect("/");
  }

  return (
    <div className="">
      <h1>Verification page</h1>
      <p>Before we can let you enjoy this site, we need to verify your age.</p>
      <div className="p-2">
        <h1 className="text-2xl">File Upload</h1>
        <form action={fileUploadAction}>
          <div>
            <label>Drivers License</label>
            <input
              disabled={pending}
              className="p-2 bg-amber-400"
              name="identification"
              type="file"
            />
          </div>
          <div className="flex flex-col justify-end pt-4">
            <button
              disabled={pending}
              className="bg-amber-500 p-2 py-1 rounded-md text-zinc-900 font-bold text-xl uppercase flex justify-end"
              type="submit"
            >
              Upload
              <svg
                className="pt-1"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="fill-zinc-900 stroke-zinc-900 stroke-1"
                  d="M21 12L14 5V9H3.8C3.51997 9 3.37996 9 3.273 9.0545C3.17892 9.10243 3.10243 9.17892 3.0545 9.273C3 9.37996 3 9.51997 3 9.8V14.2C3 14.48 3 14.62 3.0545 14.727C3.10243 14.8211 3.17892 14.8976 3.273 14.9455C3.37996 15 3.51997 15 3.8 15H14V19L21 12Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {state?.message && (
              <div className="p-2 text-red-500 text-center w-full">
                {state?.message}
              </div>
            )}
          </div>
          <div>
            <canvas ref={canvasRef} id="canvas"></canvas>
          </div>
        </form>
      </div>

      <div className="p-2">
        <h1 className="text-2xl">Web Cam</h1>
        <div className="flex flex-col justify-end pt-4">
          <button
            className="bg-amber-500 p-2 py-1 rounded-md text-zinc-900 font-bold text-xl uppercase flex justify-center"
            type="button"
            onClick={initWebCam}
          >
            Start Webcam
          </button>
        </div>
        <div className="relative inline-block">
          <video ref={videoRef} autoPlay playsInline className="block"></video>
          <canvas
            ref={webcamCanvasRef}
            className="absolute top-0 left-0 h-full w-full pointer-events-none"
          ></canvas>
        </div>
      </div>
    </div>
  );
}
