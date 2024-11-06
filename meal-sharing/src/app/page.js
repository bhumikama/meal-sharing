import { Button } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative h-screen w-full">
      <img
        src="/cover.jpg"
        alt="Full Screen Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center flex-col">
        <Link href={"/meals"}>
          <Button variant="contained" className="bg-amber-300 text-3xl">
            Explore Our Meals
          </Button>
        </Link>
      </div>
    </div>
  );
}
