import axios from "axios";

const API_URL = '/api/tickets/'

const createTicketBE = async (ticket) => {
   const response = await axios.post(API_URL, ticket)
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
}
const getTicketsBE = async () => {
    const response = await axios.get(API_URL)
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
}



const ticketService = {
    createTicketBE,
    getTicketsBE
}

export default ticketService