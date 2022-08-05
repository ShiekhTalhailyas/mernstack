import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketService from "../tickets/ticketService";

const { createTicketBE, getTicketsBE } = ticketService;
export const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createTicket = createAsyncThunk(
  "auth/tickets",
  async (ticket, thunkAPI) => {
    try {
      return await createTicketBE(ticket);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTickets = createAsyncThunk("auth/tickets", async (thunkAPI) => {
  try {
    return await getTicketsBE();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});



const ticketSlice = createSlice({
  name: "ticketauth",
  initialState,
  reducers: { reset: (state) => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export default ticketSlice.reducer;
export const { reset } =ticketSlice.actions;
