import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { tdmbApiAction } from "@/Services/TmdbApi/TmdbApi";
import { setResults } from "@/redux/Reducers/SearchResultReducer";

const SearchResult = ({ value }) => {
  const dispatch = useDispatch();
  const [pages, setPages] = useState({ currentPage: 1, totalPages: "" });
  useEffect(() => {
    const fetchSearchResult = async () => {
      try {
        const response = await tdmbApiAction("get", `3/search/keyword?query=${value}&page=${pages.currentPage}&limit`);
        setPages((prevPages) => ({
          ...prevPages,
          totalPages: response.total_pages,
        }));
        // Dispatch l'action setSignIn avec le token reçu de l'API
        console.log(response);
        dispatch(setResults({ response }));
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
  const search = useSelector((state) => state.searchResult);
  console.log(search, "ici", value);
  return <div className="bg-primary">{pages.totalPages}</div>;
};

export default SearchResult;
