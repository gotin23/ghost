"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { tdmbApiAction } from "@/Services/TmdbApi/TmdbApi";
import FeaturedMediaDisplay from "../../components/FeaturedMediaDisplay/FeaturedMediaDisplay";
import { setFeaturedMediaId, setReleaseDate } from "@/redux/Reducers/FeaturedMediaReducer";

// import Navigation from "@/components/Navigation/Navigation";
import PopularMovies from "@/components/PopularMovies/PopularMovies";

const Browse = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.log.token);
  const featuredMedia = useSelector((state) => state.featuredMedia.id);

  const router = useRouter();
  const [idFeaturedMediaDisplay, setFeaturedMediaDisplay] = useState("");
  // const playerRef = useRef(null);

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, []);
  console.log("Loading");
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

        dispatch(setReleaseDate(resultWithUS));
      } catch (error) {
        // Gérer les erreurs de la requête API
        console.log(error);
      }
    };
    fetchPopularMovies();
  }, []);
  // const initPlayer = () => {
  //   if (window.YT && window.YT.Player) {
  //     // Si l'API YouTube est déjà chargée, initialisez le lecteur
  //     createPlayer();
  //   } else {
  //     // Sinon, chargez l'API YouTube
  //     const tag = document.createElement("script");
  //     tag.src = "https://www.youtube.com/iframe_api";
  //     const firstScriptTag = document.getElementsByTagName("script")[0];
  //     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  //     window.onYouTubeIframeAPIReady = createPlayer;
  //   }
  // };

  // const createPlayer = () => {
  //   new window.YT.Player(playerRef.current, {
  //     videoId: "W5Gwgw-DpDw",
  //     events: {
  //       onReady: onPlayerReady,
  //     },
  //   });
  // };

  // const onPlayerReady = (event) => {
  //   // Exemple d'action à effectuer une fois que le lecteur est prêt
  //   event.target.playVideo();
  // };

  return (
    <>
      {token && (
        <main className="flex flex-col min-h-screen justify-center items-center w-full relative">
          {/* <Navigation /> */}

          {/* <iframe
            width="1000"
            height="1000"
            src="https://www.youtube.com/embed/W5Gwgw-DpDw?autoplay=1"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowfullscreen
          ></iframe> */}
          {/* <div ref={playerRef}></div> */}
          <FeaturedMediaDisplay id={idFeaturedMediaDisplay} />
          <PopularMovies />
        </main>
      )}
    </>
  );
};

export default Browse;
