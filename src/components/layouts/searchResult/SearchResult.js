import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { tdmbApiAction } from "@/Services/TmdbApi/TmdbApi";
import { setResults } from "@/redux/Reducers/SearchResultReducer";
import MovieCard from "@/components/MovieCard/MovieCard";
// import { fetchAndSetResults } from "@/redux/Reducers/SearchResultReducer";

const SearchResult = ({ value }) => {
  const dispatch = useDispatch();
  const [pages, setPages] = useState({ currentPage: 1, totalPages: "" });
  useEffect(() => {
    const fetchSearchResult = async () => {
      try {
        const response = await tdmbApiAction("get", `3/search/multi?query=${value}&include_adult=false&language=en-US&page=${pages.currentPage}`);
        // const response = await tdmbApiAction("get", `3/search/keyword?query=${value}&page=${pages.currentPage}&limit`);

        setPages((prevPages) => ({
          ...prevPages,
          totalPages: response.total_pages,
        }));
        // Dispatch l'action setSignIn avec le token reçu de l'API
        console.log(response);
        dispatch(setResults({ response }));
        // dispatch(fetchAndSetResults(response.results));
        // redirection vers son profile
        // navigate("/user");

        // initPlayer();
      } catch (error) {
        // Gérer les erreurs de la requête API
        console.log(error);
      }
    };
    fetchSearchResult();
  }, [value]);
  const results = useSelector((state) => state.searchResult);
  console.log(results, "ici", value);
  return (
    <div className="pt-40 pb-20 items-center justify-center flex  flex-wrap px-20 gap-5 overflow-x-auto  max-h-[100vh] max-w-screen">
      {results &&
        results.results.map((el, idx) => {
          return (
            <>
              {el.media_type !== "person" && (
                <MovieCard key={idx} id={el.id} image={el.backdrop_path} average={el.vote_average} genres={el.genre_ids} title={el.title} overview={el.overview} />
              )}
              {el.media_type !== "person" && (
                <MovieCard key={idx} id={el.id} image={el.backdrop_path} average={el.vote_average} genres={el.genre_ids} title={el.title} overview={el.overview} />
              )}
            </>
          );
        })}
    </div>
  );
};

export default SearchResult;
