"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import FeaturedMediaDisplay from "@/components/FeaturedMediaDisplay/FeaturedMediaDisplay";
import Player from "@/components/Player/Player";

import Navigation from "@/components/Navigation/Navigation";
const Series = () => {
  // const [color, setColor] = useState("");
  const token = useSelector((state) => state.log.token);
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, []);

  return (
    <>
      {token && (
        <main className="flex min-h-[200vh] w-full relative flex-col">
          <FeaturedMediaDisplay />
          <Player />
        </main>
      )}
    </>
  );
};

export default Series;
