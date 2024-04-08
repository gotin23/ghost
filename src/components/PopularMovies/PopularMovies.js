import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPopularMoviesList } from "@/redux/Reducers/PopularMoviesReducer";
import { tdmbApiAction } from "@/Services/TmdbApi/TmdbApi";
import MovieCard from "../MovieCard/MovieCard";
import Title from "../Title/Title";
const PopularMovies = () => {
  const dispatch = useDispatch();
  const moviesList = useSelector((state) => state.popularMovies.popularMoviesList);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(0);
  //   const popularClass = "ml-[-300px]";
  //   const popularClass = "ml-[-" + 100 + "px]";
  //   console.log(popularClass);
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await tdmbApiAction("get", `3/movie/popular?language=en-US&page=${page}`);
        console.log(response.results, "response popular");
        dispatch(setPopularMoviesList(response.results));

        // dispatch(setReleaseDate(resultWithUS));
      } catch (error) {
        // Gérer les erreurs de la requête API
        console.log(error);
      }
    };
    fetchPopularMovies();
  }, [page]);
  const test = () => {
    console.log("oki");
    setNextPage(nextPage + 1296);
  };
  console.log(nextPage);
  return (
    <>
      <div className=" cursor-pointer  w-full pl-10 mb-18 mt-[-200px] z-10">
        <Title level={2} text={"Popular movies"} style={"text-white text-3xl mb-5"} />

        <div className="flex gap-2 ">
          {moviesList &&
            moviesList.map((el, idx) => {
              return <MovieCard key={idx} id={el.id} image={el.backdrop_path} average={el.vote_average} genres={el.genre_ids} title={el.title} />;
            })}
        </div>
      </div>
      <div className=" mt-16 cursor-pointer  w-full pl-10 mb-48 relative">
        <Title level={2} text={"For you"} style={"text-white text-3xl mb-5"} onClick={test} />
        <div className="absolute bg-black z-50 h-[180px] w-[50px] left-[-10px]"></div>
        <div className={`flex gap-2 transition-all`} style={{ marginLeft: "-" + nextPage + "px" }}>
          {moviesList &&
            moviesList.map((el, idx) => {
              return <MovieCard key={idx} id={el.id} image={el.backdrop_path} average={el.vote_average} genres={el.genre_ids} title={el.title} />;
            })}
        </div>
        <button className="bg-primary" onClick={test}>
          click
        </button>
      </div>
    </>
  );
};

export default PopularMovies;
