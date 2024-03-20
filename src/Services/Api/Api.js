import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

// Toute les actions de l'api
const apiActions = {
  login: {
    method: "post",
    url: "/login/password",
    requiresAuth: false,
  },
  getProfile: {
    method: "get",
    url: "/profiles",
    requiresAuth: true,
  },
  addNewProfile: {
    method: "post",
    url: "/profiles",
    requiresAuth: true,
  },
  deleteProfile: {
    method: "delete",
    url: "/profiles",
    requiresAuth: true,
  },
  //   editUser: {
  //     method: "put",
  //     url: "/user/profile",
  //     requiresAuth: true,
  //   },
  signUp: {
    method: "post",
    url: "/signup",
    requiresAuth: false,
  },
};
// fonction pour gerer les appel a l'api avec l'action donnée
export const performApiAction = async (action, token, data = {}) => {
  const actionConfig = apiActions[action];

  if (!actionConfig) {
    console.error("Action non prise en charge.");
    return;
  }

  const headers = {
    "Content-Type": "application/json",
  };

  if (actionConfig.requiresAuth) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await axios({
      method: actionConfig.method,
      url: `${API_BASE_URL}${actionConfig.url}`,
      data,
      headers,
    });

    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'exécution de l'action :", error);
    throw error;
  }
};
