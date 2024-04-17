"use client";
import { tdmbApiAction } from "@/Services/TmdbApi/TmdbApi";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFeaturedMediaDisplay } from "@/redux/Reducers/FeaturedMediaReducer";
import playIcon from "../../../public/assets/icons/play-icon.svg";
import infoIcon from "../../../public/assets/icons/info-icon.svg";
import Image from "next/image";
import Player from "../Player/Player";

const FeaturedMediaDisplay = () => {
  const featuredMediaId = useSelector((state) => state.featuredMedia.id);
  const featuredMediaDisplay = useSelector((state) => state.featuredMedia.featuredMediaDisplay);
  const releaseDate = useSelector((state) => state.featuredMedia.releaseDate);
  const [togglePlayer, setTogglePlayer] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await tdmbApiAction("get", `3/movie/${featuredMediaId}?language=en-US`);
        // Dispatch l'action setSignIn avec le token reçu de l'API

        dispatch(setFeaturedMediaDisplay({ response }));
        // redirection vers son profile
        // navigate("/user");

        // initPlayer();
      } catch (error) {
        // Gérer les erreurs de la requête API
        console.log(error);
      }
    };
    fetchPopularMovies();
  }, []);

  const playMedia = () => {
    setTogglePlayer(true);
  };
  return (
    <div className="w-full h-[100vh] relative">
      <Image
        src={`https://image.tmdb.org/t/p/original${featuredMediaDisplay.backdrop_path}`}
        width={1920}
        height={1080}
        className="w-[100%] h-[100%] object-cover  brightness-75"
        alt={"featured media image"}
      />
      <div className="absolute left-16 bottom-[30vh] min-h-[200px] w-[40vw] ">
        <h1 className="text-6xl text-white">{featuredMediaDisplay.title}</h1>
        <p className="mt-5 text-white text-xl">{featuredMediaDisplay.overview}</p>
        <div className="mt-10 flex w-full">
          <button className="bg-white mr-10 min-w-[200px] py-3 flex justify-center items-center rounded-md hover:bg-grey" onClick={playMedia}>
            <Image src={playIcon} width={30} height={30} className="mr-2" alt={"featured media image"} />
            <p className="text-xl">Play</p>
          </button>
          <button className="bg-[#6e6d6db0]  min-w-[200px] flex justify-center items-center  rounded-md hover:bg-grey">
            <Image src={infoIcon} width={30} height={30} className="mr-2" alt={"featured media image"} />
            <p className="text-xl text-white">More infos</p>
          </button>
        </div>
      </div>
      <div className="absolute right-0 bottom-[30vh] bg-blackTransparent min-w-[120px] p-2 border-l-4 border-grey">
        <p className="text-white text-xl text-justify">{releaseDate.certification ? releaseDate.certification : "PG"}</p>
      </div>
      {togglePlayer && (
        <div className="absolute inset-0 bg-grey z-50 overflow-hidden">
          <Player />
        </div>
      )}
    </div>
  );
};

export default FeaturedMediaDisplay;
