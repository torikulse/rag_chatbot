import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl mb-10">Welcome to SoftAql</h1>
        <Link
          href={"/aqkel-text-bot"}
          className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-5 rounded-full"
        >
          RechargeWise
        </Link>
      </div>
    </>
  );
}
