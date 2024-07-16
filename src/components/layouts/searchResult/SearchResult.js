import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { tdmbApiAction } from "@/Services/TmdbApi/TmdbApi";
import { setResults, resetResults } from "@/redux/Reducers/SearchResultReducer";
import MovieCard from "@/components/MovieCard/MovieCard";
import PersonCard from "@/components/PersonCard/PersonCard";
// import { fetchAndSetResults } from "@/redux/Reducers/SearchResultReducer";

const SearchResult = ({ value }) => {
  const dispatch = useDispatch();
  const [pages, setPages] = useState({ currentPage: 1, totalPages: 1 });
  const targetRef = useRef(null);
  const results = useSelector((state) => state.searchResult);
  //
  useEffect(() => {
    const resetCurrentPageAndFetch = () => {
      // Réinitialiser la currentPage
      setPages(() => ({
        totalPages: 1,
        currentPage: 1,
      }));

      dispatch(resetResults());
    };

    if (value) {
      resetCurrentPageAndFetch();
    }
  }, [value]);

  useEffect(() => {
    const fetchSearchResult = async () => {
      try {
        if (pages.currentPage <= pages.totalPages) {
          console.log("yeah", pages.currentPag <= pages.totalPages);
          const response = await tdmbApiAction("get", `3/search/multi?query=${value}&include_adult=false&language=en-US&page=${pages.currentPage}`);
          dispatch(setResults({ response }));
          setPages((prevPages) => ({
            ...prevPages,
            totalPages: response.total_pages,
          }));

          console.log(response, pages.totalPages, "regarde", response.total_pages, value);
        }
        // dataSet();
      } catch (error) {
        console.log(error);
      }
    };

    // if (value || pages.currentPage) {
    fetchSearchResult();
    // }
  }, [pages.currentPage]);

  //   useEffect(() => {
  //     const options = { root: null, threshold: 1 };
  //     const observer = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting) {
  //         setPages((prevPages) => ({
  //           ...prevPages,
  //           currentPage: pages.currentPage + 1,
  //         }));
  //       }
  //     }, options);
  //     // setTimeout(() => {
  //     observer?.observe(targetRef.current);
  //     // }, 100);
  //   }, [pages]);
  useEffect(() => {
    const options = { root: null, threshold: 1 };
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPages((prevPages) => ({
          ...prevPages,
          currentPage: prevPages.currentPage + 1,
        }));
      }
    }, options);

    const target = targetRef.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [targetRef, setPages]);
  //   const dataSet = () => {
  //     const options = { root: null, threshold: 1 };
  //     const observer = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting) {
  //         console.log("observer search", pages.currentPage, pages.totalPages);

  //         setPages((prevPages) => ({
  //           ...prevPages,
  //           currentPage: pages.currentPage + 1,
  //         }));
  //       }
  //     }, options);
  //     // setTimeout(() => {
  //     observer?.observe(targetRef.current);
  //     // }, 100);
  //   };

  return (
    <div className="pt-40 pb-20 items-center justify-center flex  flex-wrap px-20 gap-5 overflow-x-auto  max-h-[100vh] max-w-screen">
      {results &&
        results.results.map((el, idx) => {
          return (
            <>
              {el.media_type === "movie" && (
                <MovieCard key={idx} id={el.id} image={el.backdrop_path} average={el.vote_average} genres={el.genre_ids} title={el.title} overview={el.overview} />
              )}
              {el.media_type === "person" && <PersonCard data={el} />}
              {el.media_type === "tv" && <div className="h-[16vh] w-[18vw] bg-grey"></div>}
              {/* 
              {idx === results.results.length - 1 && <div ref={targetRef} className=" bg-primary w-10 h-10"></div>} */}
            </>
          );
        })}
      {/* {pages.currentPage < pages.totalPages && <div ref={targetRef} className=" bg-primary w-10 h-10"></div>} */}
      {
        <div
          ref={targetRef}
          onClick={() =>
            setPages((prevPages) => ({
              ...prevPages,
              currentPage: pages.currentPage + 1,
            }))
          }
          className=" bg-primary w-full h-[3vh] mb-5"
        >
          {/* <p className="text text-[100px]">{pages.currentPage}</p>
          <p className="text text-[100px]">{pages.totalPages}</p> */}
        </div>
      }
    </div>
  );
};

export default SearchResult;
