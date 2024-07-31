"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import FeaturedMediaDisplay from "@/components/FeaturedMediaDisplay/FeaturedMediaDisplay";
import Player from "@/components/Player/Player";
import { tdmbApiAction } from "@/Services/TmdbApi/TmdbApi";
import { setFeaturedMediaId, setReleaseDate } from "@/redux/Reducers/FeaturedMediaReducer";

import Navigation from "@/components/Navigation/Navigation";
const Series = () => {
  // const [color, setColor] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.log.token);
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, []);
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

  return (
    <>
      {token && (
        <main className="flex min-h-[200vh] w-full relative flex-col">
          <FeaturedMediaDisplay />
          {/* <Player /> */}
        </main>
      )}
    </>
  );
};

export default Series;
