import Image from "next/image";
export default async function page() {
  const fetchData = await fetch("http://localhost:3000/api",{method:"POST"});
  const data = await fetchData.json();
  console.log(data);

  return (
    <div>
      <div>
        {data.choices[0].message.content}
      </div>
      <Image
        src="/assets/bg.jpg"
        width={500}
        height={400}
        alt="this is test image"
      />
    </div>
  );
}
