"use client";
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="">
      <div className="hero-wrapper flex flex-col justify-center items-center p-2 min-h-screen">
        <h1 className="text-3xl md:text-5xl font-bold p-2 text-center">Welcome to SextClub</h1>
        <div className="flex gap-2 p-2">
          <svg className="stroke-green-500" width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="stroke-2" d="M10 15L6.92474 18.1137C6.49579 18.548 6.28131 18.7652 6.09695 18.7805C5.93701 18.7938 5.78042 18.7295 5.67596 18.6076C5.55556 18.4672 5.55556 18.162 5.55556 17.5515V15.9916C5.55556 15.444 5.10707 15.0477 4.5652 14.9683V14.9683C3.25374 14.7762 2.22378 13.7463 2.03168 12.4348C2 12.2186 2 11.9605 2 11.4444V6.8C2 5.11984 2 4.27976 2.32698 3.63803C2.6146 3.07354 3.07354 2.6146 3.63803 2.32698C4.27976 2 5.11984 2 6.8 2H14.2C15.8802 2 16.7202 2 17.362 2.32698C17.9265 2.6146 18.3854 3.07354 18.673 3.63803C19 4.27976 19 5.11984 19 6.8V11M19 22L16.8236 20.4869C16.5177 20.2742 16.3647 20.1678 16.1982 20.0924C16.0504 20.0255 15.8951 19.9768 15.7356 19.9474C15.5558 19.9143 15.3695 19.9143 14.9969 19.9143H13.2C12.0799 19.9143 11.5198 19.9143 11.092 19.6963C10.7157 19.5046 10.4097 19.1986 10.218 18.8223C10 18.3944 10 17.8344 10 16.7143V14.2C10 13.0799 10 12.5198 10.218 12.092C10.4097 11.7157 10.7157 11.4097 11.092 11.218C11.5198 11 12.0799 11 13.2 11H18.8C19.9201 11 20.4802 11 20.908 11.218C21.2843 11.4097 21.5903 11.7157 21.782 12.092C22 12.5198 22 13.0799 22 14.2V16.9143C22 17.8462 22 18.3121 21.8478 18.6797C21.6448 19.1697 21.2554 19.5591 20.7654 19.762C20.3978 19.9143 19.9319 19.9143 19 19.9143V22Z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <svg className="stroke-blue-500" width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="stroke-2" d="M7.5 10.5H7.51M12 10.5H12.01M16.5 10.5H16.51M9.9 19.2L11.36 21.1467C11.5771 21.4362 11.6857 21.5809 11.8188 21.6327C11.9353 21.678 12.0647 21.678 12.1812 21.6327C12.3143 21.5809 12.4229 21.4362 12.64 21.1467L14.1 19.2C14.3931 18.8091 14.5397 18.6137 14.7185 18.4645C14.9569 18.2656 15.2383 18.1248 15.5405 18.0535C15.7671 18 16.0114 18 16.5 18C17.8978 18 18.5967 18 19.1481 17.7716C19.8831 17.4672 20.4672 16.8831 20.7716 16.1481C21 15.5967 21 14.8978 21 13.5V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V13.5C3 14.8978 3 15.5967 3.22836 16.1481C3.53284 16.8831 4.11687 17.4672 4.85195 17.7716C5.40326 18 6.10218 18 7.5 18C7.98858 18 8.23287 18 8.45951 18.0535C8.76169 18.1248 9.04312 18.2656 9.2815 18.4645C9.46028 18.6137 9.60685 18.8091 9.9 19.2ZM8 10.5C8 10.7761 7.77614 11 7.5 11C7.22386 11 7 10.7761 7 10.5C7 10.2239 7.22386 10 7.5 10C7.77614 10 8 10.2239 8 10.5ZM12.5 10.5C12.5 10.7761 12.2761 11 12 11C11.7239 11 11.5 10.7761 11.5 10.5C11.5 10.2239 11.7239 10 12 10C12.2761 10 12.5 10.2239 12.5 10.5ZM17 10.5C17 10.7761 16.7761 11 16.5 11C16.2239 11 16 10.7761 16 10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5Z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <svg className="stroke-pink-500" width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="stroke-2" d="M3 7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V13.5C21 14.8978 21 15.5967 20.7716 16.1481C20.4672 16.8831 19.8831 17.4672 19.1481 17.7716C18.5967 18 17.8978 18 16.5 18C16.0114 18 15.7671 18 15.5405 18.0535C15.2383 18.1248 14.9569 18.2656 14.7185 18.4645C14.5397 18.6137 14.3931 18.8091 14.1 19.2L12.64 21.1467C12.4229 21.4362 12.3143 21.5809 12.1812 21.6327C12.0647 21.678 11.9353 21.678 11.8188 21.6327C11.6857 21.5809 11.5771 21.4362 11.36 21.1467L9.9 19.2C9.60685 18.8091 9.46028 18.6137 9.2815 18.4645C9.04312 18.2656 8.76169 18.1248 8.45951 18.0535C8.23287 18 7.98858 18 7.5 18C6.10218 18 5.40326 18 4.85195 17.7716C4.11687 17.4672 3.53284 16.8831 3.22836 16.1481C3 15.5967 3 14.8978 3 13.5V7.8Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M11.9973 8.33059C11.1975 7.4216 9.8639 7.17708 8.86188 8.00945C7.85986 8.84182 7.71879 10.2335 8.50568 11.2179C8.97361 11.8033 10.1197 12.8531 10.9719 13.6079C11.3237 13.9195 11.4996 14.0753 11.7114 14.1385C11.8925 14.1926 12.102 14.1926 12.2832 14.1385C12.4949 14.0753 12.6708 13.9195 13.0226 13.6079C13.8748 12.8531 15.0209 11.8033 15.4888 11.2179C16.2757 10.2335 16.1519 8.83306 15.1326 8.00945C14.1134 7.18584 12.797 7.4216 11.9973 8.33059Z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="text-2xl text-center">The <strong className="fire">hottest</strong> place to <strong className="text-red-500 uppercase">sext</strong> on the whole damn <strong className="">internet</strong></h2>
      </div>
      <div>
        <Link href='/login'>Login Here</Link>
      </div>
      <div className="content-wrapper p-2">
        <div>
          <h2 className="text-2xl text-center font-bold">You can do it anywhere. Even from your bed</h2>
          <div className="">
            <Image
            src="/sexting_lady_01.png"
            width={500}
            height={500}
            alt="Picture of woman sexting in bed"
            className="pb-4"
            />
            <p>Rebecca loves winding down with a sext before bed—it's one of her favorite nightly rituals. And as for her hands, don't worry about the way ring fingers conjoin together. She's lived with that deformity since birth and never lets it get in the way of her love of sexting!</p>
          </div>
        </div>
      </div>

      <div className="content-wrapper p-2">
        <div>
          <h2 className="text-2xl text-center font-bold">Don't have a bed? The couch works too!</h2>
          <div>
            <Image
            src="/sexting_lady_03.jpg"
            width={500}
            height={500}
            alt="Picture of woman sexting in bed"
            className="pb-4"
            />
            <p>Rebecca loves winding down with a sext before bed—it's one of her favorite nightly rituals. And as for her hands, don't worry about the way ring fingers conjoin together. She's lived with that deformity since birth and never lets it get in the way of her love of sexting!</p>
          </div>
        </div>
      </div>

      <style jsx>{`
      .fire {
        color: #f5f5f5; /* Light text color */
        /* Multi-layered text-shadow for fire effect */
        text-shadow:
        0px -1px 3px #fff, /* Innermost layer - intense heat (white) */
        0px -2px 6px #FF3, /* Second layer - core of flame (yellow) */
        0px -6px 12px #F90, /* Middle layer - body of flame (orange) */
        0px -10px 20px #C33; /* Outermost layer - edges of flame (red) */
       }

       /* Define the animation named "flicker" */
       @keyframes flicker {
           /* Initial state of animation */
           0%,
           /* Final state of animation */
           100% {
               text-shadow:
                   0 -1px 3px #fff, /* Innermost layer - intense heat (white) */
                   0 -2px 6px #FF3, /* Second layer - core of flame (yellow) */
                   0 -6px 12px #F90, /* Middle layer - body of flame (orange) */
                   0 -10px 20px #C33; /* Outermost layer - edges of flame (red) */
           }
           /* Middle state of animation */
           50% {
               text-shadow:
                   0 -2px 6px #fff, /* Innermost layer - intense heat (white) */
                   0 -4px 12px #FF3, /* Second layer - core of flame (yellow) */
                   0 -8px 16px #F90, /* Middle layer - body of flame (orange) */
                   0 -12px 24px #C33; /* Outermost layer - edges of flame (red) */
           }
       }

       .fire {
           /* Apply the "flicker" animation to the .fire class */
           animation: flicker 2s infinite;
       }
      `}</style>
    </div>
  );
}
