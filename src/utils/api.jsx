import axios from "axios";

const API_BASE_URL = "https://api.github.com";

export const fetchRepositories = async (username, page = 1, perPage = 10) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/users/${username}/repos`,
      {
        params: {
          page,
          per_page: perPage,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch repositories");
  }
};

export const fetchRepository = async (username, repoName) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/repos/${username}/${repoName}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch repository details");
  }
};
