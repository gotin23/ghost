import axios from "axios";
// import { useSelector } from "react-redux";
// const featuredMedia = useSelector((state) => state.featuredMedia.featuredMediaDisplay);
// console.log(featuredMedia);
const API_BASE_URL = "https://api.themoviedb.org/";
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OWUyNjE2OGVjNmVlNDZmMTAxYmU0OTRmZjhmZTc1YyIsInN1YiI6IjY2MGJlNTFjMGI1ZmQ2MDE2MjM2YmYwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JF9sPgk5kYk31ioqQBJnK3xF6LAsY4jcQ4P_iHscwjg";

// Toute les actions de l'api
// const apiActions = {
//   getPopularMovies: {
//     method: "get",
//     url: "3/discover/movie?include_adult=false&include_video=true&language=en-US&page=20&sort_by=popularity.desc",
//   },
//   getDetails: {
//     method: "get",
//     url: `3/movie/${featuredMedia}?language=en-US`,
//     requiresAuth: true,
//   },
//   addNewProfile: {
//     method: "post",
//     url: "/profiles",
//     requiresAuth: true,
//   },
//   deleteProfile: {
//     method: "delete",
//     url: "/profiles",
//     requiresAuth: true,
//   },
//   modifyProfile: {
//     method: "put",
//     url: "/profiles",
//     requiresAuth: true,
//   },
//   //   editUser: {
//   //     method: "put",
//   //     url: "/user/profile",
//   //     requiresAuth: true,
//   //   },
//   signUp: {
//     method: "post",
//     url: "/signup",
//     requiresAuth: false,
//   },
// };
// fonction pour gerer les appel a l'api avec l'action donnée
export const tdmbApiAction = async (action, url) => {
  console.log(action, url);
  if (!url || !action) {
    console.error("Action non prise en charge.");
    return;
  }

  const headers = {
    "Content-Type": "application/json",
  };

  //   if (actionConfig.requiresAuth) {
  headers.Authorization = `Bearer ${token}`;
  //   }

  try {
    const response = await axios({
      method: action,
      url: `${API_BASE_URL}${url}`,
      headers,
    });

    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'exécution de l'action :", error);
    throw error;
  }
};
// export const tdmbApiAction = async (action, id) => {
//   const actionConfig = apiActions[action];
//  console.log(action, id , "action id")
//   if (!actionConfig) {
//     console.error("Action non prise en charge.");
//     return;
//   }

//   const headers = {
//     "Content-Type": "application/json",
//   };

//   //   if (actionConfig.requiresAuth) {
//   headers.Authorization = `Bearer ${token}`;
//   //   }

//   try {
//     const response = await axios({
//       method: actionConfig.method,
//       url: `${API_BASE_URL}${actionConfig.url}`,
//       headers,
//     });

//     return response.data;
//   } catch (error) {
//     console.error("Erreur lors de l'exécution de l'action :", error);
//     throw error;
//   }
// };
