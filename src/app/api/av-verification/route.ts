"use server";

async function getHandler(request:Request) {
  const data = [
    {

    }
  ];
  console.log('request', request);
  return new Response(JSON.stringify(data),{
    status:200,
    headers:{ "Content-Type": "application/json" }
})
}

async function postHandler(request:Request) {
  const data = [
    {

    }
  ];
  console.log('request', request);
  const bodyFormData = await request.formData();
  console.log('request:body', bodyFormData);

  return new Response(JSON.stringify(data),{
    status:200,
    headers:{ "Content-Type": "application/json" }
  })
}

export { getHandler as GET, postHandler as POST };
