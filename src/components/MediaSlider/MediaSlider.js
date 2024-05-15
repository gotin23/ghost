import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPopularMoviesList } from "@/redux/Reducers/PopularMoviesReducer";
import { tdmbApiAction } from "@/Services/TmdbApi/TmdbApi";
import Image from "next/image";
import MovieCard from "../MovieCard/MovieCard";
import Title from "../Title/Title";
import nextIcon from "../../../public/assets/icons/next-icon.svg";
const MediaSlider = ({ title, url, dispatchMedias, data }) => {
  console.log(data);
  const dispatch = useDispatch();
  const moviesList = useSelector((state) => state[data][data + "List"]);
  console.log(moviesList);
  const targetRef = useRef(null);
  const [page, setPage] = useState(1);
  const [position, setPosition] = useState(0);
  //   const [fetchData, setFetchData] = useState(1);
  //   const popularClass = "ml-[-300px]";
  //   const popularClass = "ml-[-" + 100 + "px]";
  //   console.log(popularClass);
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await tdmbApiAction("get", `${url + page}`);
        // console.log(response.results, "response popular");
        dispatch(dispatchMedias(response.results));

        // dispatch(setReleaseDate(resultWithUS));
      } catch (error) {
        // Gérer les erreurs de la requête API
        console.log(error);
      }
    };
    fetchPopularMovies();
  }, [page]);
  useEffect(() => {
    const options = { root: null, threshold: 1 };
    const observer = new IntersectionObserver((entries) => {
      console.log(entries);
      if (entries[0].isIntersecting) {
        console.log("observer");
        setPage(page + 1);
      }
    }, options);
    setTimeout(() => {
      observer.observe(targetRef.current);
    }, 100);
  }, [page]);

  const nextMovies = () => {
    setPosition(parseFloat((position + 73.76).toFixed(2)));
  };
  const previousMovies = () => {
    if (position > 0) {
      setPosition(parseFloat((position - 73.76).toFixed(2)));
    }
  };

  return (
    <>
      <div className=" cursor-pointer  w-full pl-[4vw] mb-18 mt-[-180px] z-10 mb-48">
        <Title level={2} text={title} style={"text-white text-3xl mb-3"} />

        <div className="flex gap-[0.2vw] transition-all duration-500" style={{ marginLeft: "-" + position + "vw" }}>
          {moviesList &&
            moviesList.map((el, idx) => {
              return (
                <>
                  <MovieCard key={idx} id={el.id} image={el.backdrop_path} average={el.vote_average} genres={el.genre_ids} title={el.title} overview={el.overview} />
                  {idx === moviesList.length - 1 && <div ref={targetRef} className=" bg-primary w-10 h-10"></div>}
                </>
              );
            })}
          {position > 0 ? (
            <div className="absolute left-0 w-[4vw] h-[16vh] flex items-center justify-center  opacity-50 bg-blackTransparent hover:opacity-100" onClick={previousMovies}>
              <Image src={nextIcon} width={40} height={40} alt="next icon" className="rotate-180 rotate" />
            </div>
          ) : (
            <div className="absolute left-0 w-[4vw] h-[14vh] cursor-auto"></div>
          )}
          <div className="absolute right-0 w-[4vw] h-[16vh] flex items-center justify-center  opacity-50 bg-blackTransparent hover:opacity-100" onClick={nextMovies}>
            <Image src={nextIcon} width={40} height={40} alt="next icon" />
          </div>
        </div>
      </div>
    </>
  );
};

export default MediaSlider;
