import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_FOOTBALL_API_BASE_URL,
});

export const getTeamDetails = async (teamId) => {
  try {
    const response = await apiClient.get(`/teams/${teamId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar detalhes do time com ID ${teamId}:`, error);
    throw error;
  }
};

export const getAllTeams = async () => {
  try {
    const response = await apiClient.get('/teams');
    return response.data;
  } catch (error) {
    console.error("Erro ao obter os times:", error);
    throw error; 
  }
};