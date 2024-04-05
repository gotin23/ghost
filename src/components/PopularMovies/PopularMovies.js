import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPopularMoviesList } from "@/redux/Reducers/PopularMoviesReducer";
import { tdmbApiAction } from "@/Services/TmdbApi/TmdbApi";
import MovieCard from "../MovieCard/MovieCard";
const PopularMovies = () => {
  const dispatch = useDispatch();
  const moviesList = useSelector((state) => state.popularMovies);
  const [page, setPage] = useState(1);
  console.log(moviesList, "list de film populaires");
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
  return (
    <div onClick={() => setPage(page + 1)} className="text-primary cursor-pointer">
      Enter knfkasfnkjajksndkj
    </div>
  );
};

export default PopularMovies;
