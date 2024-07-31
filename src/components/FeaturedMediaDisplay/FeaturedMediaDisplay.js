"use client";
import { tdmbApiAction } from "@/Services/TmdbApi/TmdbApi";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFeaturedMediaId, setReleaseDate } from "@/redux/Reducers/FeaturedMediaReducer";
import { setFeaturedMediaDisplay } from "@/redux/Reducers/FeaturedMediaReducer";
import playIcon from "../../../public/assets/icons/play-icon.svg";
import infoIcon from "../../../public/assets/icons/info-icon.svg";
import Image from "next/image";
import Player from "../Player/Player";
import MoreInfo from "../MoreInfo/MoreInfo";

const FeaturedMediaDisplay = () => {
  const featuredMediaId = useSelector((state) => state.featuredMedia.id);
  const featuredMediaDisplay = useSelector((state) => state.featuredMedia.featuredMediaDisplay);
  console.log(featuredMediaDisplay, "featured media display");
  const [videoId, setVideoId] = useState("");
  const releaseDate = useSelector((state) => state.featuredMedia.releaseDate);
  const [togglePlayer, setTogglePlayer] = useState(false);
  const [toggleMoreInfo, setToggleMoreInfo] = useState(false);
  const voteAverage = featuredMediaDisplay.vote_average?.toString().replace(".", "").substring(0, 2);
  const dispatch = useDispatch();
  const genresArray = [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science-Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
  ];
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await tdmbApiAction("get", "3/discover/movie?include_adult=false&include_video=true&language=en-US&page=20&sort_by=popularity.desc");
        // Dispatch l'action setSignIn avec le token reçu de l'API
        // dispatch(setSignIn({ response }));
        // redirection vers son profile
        // navigate("/user");

        const idArrays = response.results.map((el) => el.id);
        const randomIndex = Math.floor(Math.random() * idArrays.length);

        dispatch(setFeaturedMediaId(idArrays[randomIndex]));
        setFeaturedMediaDisplay(idArrays[randomIndex]);
        const release = await tdmbApiAction("get", `3/movie/${idArrays[randomIndex]}/release_dates`);
        // initPlayer();
        const resultWithUS = release.results.filter((el) => {
          return el.iso_3166_1 === "US";
        });
        // console.log(resultWithUS);

        dispatch(setReleaseDate(resultWithUS));
      } catch (error) {
        // Gérer les erreurs de la requête API
        console.log(error);
      }
    };
    fetchPopularMovies();
  }, []);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      if (featuredMediaId) {
        try {
          const response = await tdmbApiAction("get", `3/movie/${featuredMediaId}?language=en-US`);
          // Dispatch l'action setSignIn avec le token reçu de l'API

          dispatch(setFeaturedMediaDisplay({ response }));
          console.log(response, "response id");
          // redirection vers son profile
          // navigate("/user");

          // initPlayer();
        } catch (error) {
          // Gérer les erreurs de la requête API
          console.log(error);
        }
      }
    };
    fetchPopularMovies();
  }, []);

  const playMedia = () => {
    setTogglePlayer(true);
  };
  const displayGenre = () => {
    let genreList = "";
    // featuredMediaDisplay.genres.forEach((element, idx) => {
    // const genre = genresArray.filter((el) => el.id === element.id);
    const genre = featuredMediaDisplay.genres;

    genre.forEach((element, idx) => {
      genreList += element.name + (idx === genre.length - 1 ? "" : " • ");
    });
    // genreList += genre[0].name + (idx === genres.length - 1 || genres.length === 1 ? "" : " • ");
    // });

    return genreList;
  };
  useEffect(() => {
    const fetchVideoId = async () => {
      try {
        const response = await tdmbApiAction("get", `/3/movie/${featuredMediaDisplay.id}/videos?language=en-US`);

        setVideoId(response.results[0].key);
        // dispatch(setPopularMoviesList(response.results));

        // dispatch(setReleaseDate(resultWithUS));
      } catch (error) {
        // Gérer les erreurs de la requête API
        console.log(error);
      }
    };
    fetchVideoId();
  }, []);
  return (
    <div className="w-full h-[100vh] relative">
      {featuredMediaDisplay.backdrop_path && (
        // <Image
        //   src={`https://image.tmdb.org/t/p/original${featuredMediaDisplay.backdrop_path}`}
        //   width={1920}
        //   height={1080}
        //   className="w-[100%] h-[100%] object-cover  brightness-75"
        //   alt={"featured media image"}
        // />

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
      {togglePlayer && (
        <div className="absolute inset-0 bg-grey z-50 overflow-hidden">
          <Player />
        </div>
      )}
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
