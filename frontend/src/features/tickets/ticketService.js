import axios from "axios";

const API_URL = "/api/tickets/";

const createTicketBE = async (ticket, token) => {
  
  const response = await axios.post(API_URL, ticket, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
const getTicketsBE = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const ticketService = {
  createTicketBE,
  getTicketsBE,
};

export default ticketService;
