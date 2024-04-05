"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import FeaturedMediaDisplay from "@/components/FeaturedMediaDisplay/FeaturedMediaDisplay";

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
          <iframe
            width="500px"
            className="video"
            title="Youtube player"
            sandbox="allow-same-origin  allow-scripts "
            frameborder="0"
            allow="autoplay; fullscreen"
            allowfullscreen
            src={`https://youtube.com/embed/elSs0KU2eJE?autoplay=0`}
          ></iframe>
        </main>
      )}
    </>
  );
};

export default Series;
