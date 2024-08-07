import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPopularMoviesList, setResetPopularMoviesList } from "@/redux/Reducers/PopularMoviesReducer";
import useImageSize from "@/hook/UseImageSize/useImageSize";
import { tdmbApiAction } from "@/Services/TmdbApi/TmdbApi";
import Image from "next/image";
import MovieCard from "../MovieCard/MovieCard";
import Title from "../Title/Title";
import nextIcon from "../../../public/assets/icons/next-icon.svg";
const MediaSlider = ({ title, url, dispatchMedias, data }) => {
  const dispatch = useDispatch();
  const moviesList = useSelector((state) => state[data][data + "List"]);
  const targetRef = useRef(null);
  const [page, setPage] = useState(1);
  const [position, setPosition] = useState(0);
  const { width, height } = useImageSize();
  console.log(width, height);

  useEffect(() => {
    console.log("reset");
    dispatch(setResetPopularMoviesList());
  }, []);
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await tdmbApiAction("get", `${url + page}`);
        console.log(response.results, "response popular");
        dispatch(dispatchMedias(response.results));

        // dispatch(setReleaseDate(resultWithUS));
      } catch (error) {
        // Gérer les erreurs de la requête API
        console.log(error);
      }
    };
    fetchMedia();
  }, []);

  useEffect(() => {
    const options = { root: null, threshold: 1 };
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log("observer");
        setPage(page + 1);
      }
    }, options);
    setTimeout(() => {
      observer?.observe(targetRef.current);
    }, 100);
  }, [page]);

  const nextMovies = () => {
    setPosition(position + (width * 5 + 10));
    // setPosition(parseFloat((position + 73.76).toFixed(2)));
  };
  const previousMovies = () => {
    if (position > 0) {
      setPosition(parseFloat(position - (width * 5 + 10)));
      // setPosition(parseFloat((position - 73.76).toFixed(2)));
    }
  };

  return (
    <>
      <div className="mb-16">
        <Title level={2} text={title} style={"text-white text-3xl mb-3"} />

        <div className="flex gap-[2px] transition-all duration-500 ease-linear" style={{ marginLeft: "-" + position + "px" }}>
          {moviesList &&
            moviesList.map((el, idx) => {
              return (
                <>
                  <MovieCard
                    key={idx}
                    id={el.id}
                    image={el.backdrop_path}
                    average={el.vote_average}
                    genres={el.genre_ids}
                    title={el.title}
                    overview={el.overview}
                    height={height}
                    width={width}
                  />
                  {idx === moviesList.length - 1 && <div ref={targetRef} className=" bg-primary w-10 h-10"></div>}
                </>
              );
            })}
          {position > 0 ? (
            <div className="cursor-pointer absolute left-0 w-[80px] h-[16vh] flex items-center justify-center  opacity-60 bg-primary hover:opacity-100" onClick={previousMovies}>
              <Image src={nextIcon} width={60} height={60} alt="next icon" className="rotate-180 rotate" />
            </div>
          ) : (
            <div className="absolute left-0 w-[80px] h-[14vh] cursor-auto"></div>
          )}
          <div className="cursor-pointer absolute right-0 w-[80px] h-[16vh] flex items-center justify-center  opacity-60 bg-primary hover:opacity-100" onClick={nextMovies}>
            <Image src={nextIcon} width={60} height={60} alt="next icon" />
          </div>
        </div>
      </div>
    </>
  );
};

export default MediaSlider;
