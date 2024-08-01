"use client";
import { tdmbApiAction } from "@/Services/TmdbApi/TmdbApi";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFeaturedMediaId, setReleaseDate, setFeaturedMediaDisplay, setReset } from "@/redux/Reducers/FeaturedMediaReducer";
import playIcon from "../../../public/assets/icons/play-icon.svg";
import infoIcon from "../../../public/assets/icons/info-icon.svg";
import Image from "next/image";

import MoreInfo from "../MoreInfo/MoreInfo";

const FeaturedMediaDisplay = () => {
  const featuredMediaId = useSelector((state) => state.featuredMedia.id);
  const featuredMediaDisplay = useSelector((state) => state.featuredMedia.featuredMediaDisplay);

  const [videoId, setVideoId] = useState("");
  const releaseDate = useSelector((state) => state.featuredMedia.releaseDate);
  const [toggleMoreInfo, setToggleMoreInfo] = useState(false);
  const voteAverage = featuredMediaDisplay.vote_average?.toString().replace(".", "").substring(0, 2);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMediaId = async () => {
      dispatch(setReset());
      try {
        const response = await tdmbApiAction("get", "3/discover/movie?include_adult=false&include_video=true&language=en-US&page=20&sort_by=popularity.desc");

        const idArrays = response.results.map((el) => el.id);
        const randomIndex = Math.floor(Math.random() * idArrays.length);

        dispatch(setFeaturedMediaId(idArrays[randomIndex]));
        setFeaturedMediaDisplay(idArrays[randomIndex]);

        const release = await tdmbApiAction("get", `3/movie/${idArrays[randomIndex]}/release_dates`);

        const resultWithUS = release.results.filter((el) => {
          return el.iso_3166_1 === "US";
        });

        dispatch(setReleaseDate(resultWithUS));
      } catch (error) {
        // Gérer les erreurs de la requête API
        console.log(error);
      }
    };
    fetchMediaId();
  }, []);

  useEffect(() => {
    const fetchMedia = async () => {
      if (featuredMediaId) {
        try {
          const response = await tdmbApiAction("get", `3/movie/${featuredMediaId}?language=en-US`);

          dispatch(setFeaturedMediaDisplay({ response }));
          fetchVideoId();
          console.log(response, "response id");
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchMedia();
  }, [featuredMediaId]);

  const playMedia = () => {
    // setTogglePlayer(true);
    console.log("play media");
  };
  const displayGenre = () => {
    let genreList = "";
    const genre = featuredMediaDisplay.genres;
    genre.forEach((element, idx) => {
      genreList += element.name + (idx === genre.length - 1 ? "" : " • ");
    });

    return genreList;
  };

  const fetchVideoId = async () => {
    try {
      const response = await tdmbApiAction("get", `/3/movie/${featuredMediaId}/videos?language=en-US`);
      console.log(response.results[0].key, "video id ciciicicicici");
      setVideoId(response.results[0].key);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[100vh] relative">
      {featuredMediaDisplay.backdrop_path && (
        <Image src={`https://image.tmdb.org/t/p/original${featuredMediaDisplay.backdrop_path}`} fill className="brightness-75 object-cover" alt="featured media image" />
      )}
      <div className="absolute left-16 bottom-[30vh] min-h-[200px] w-[40vw] ">
        <h1 className="text-6xl text-white">{featuredMediaDisplay.title}</h1>
        <p className="mt-5 text-white text-xl">{featuredMediaDisplay.overview}</p>
        <div className="mt-10 flex w-full">
          <button className="bg-white mr-10 min-w-[200px] py-3 flex justify-center items-center rounded-md hover:bg-grey" onClick={playMedia}>
            <Image src={playIcon} width={30} height={30} className="mr-2" alt={"featured media image"} />
            <p className="text-xl">Play</p>
          </button>
          <button onClick={() => setToggleMoreInfo(true)} className="bg-[#6e6d6db0]  min-w-[200px] flex justify-center items-center  rounded-md hover:bg-grey">
            <Image src={infoIcon} width={30} height={30} className="mr-2" alt={"featured media image"} />
            <p className="text-xl text-white">More infos</p>
          </button>
        </div>
      </div>
      <div className="absolute right-0 bottom-[30vh] bg-blackTransparent min-w-[120px] p-2 border-l-4 border-grey">
        <p className="text-white text-xl text-justify">{releaseDate.certification ? releaseDate.certification : "PG"}</p>
      </div>

      {toggleMoreInfo && (
        <MoreInfo
          id={featuredMediaId}
          videoId={videoId}
          title={featuredMediaDisplay.title}
          genres={displayGenre}
          average={voteAverage}
          overview={featuredMediaDisplay.overview}
          // style={styleMoreInfo}
          toggleModal={setToggleMoreInfo}
        />
      )}
    </div>
  );
};

export default FeaturedMediaDisplay;
