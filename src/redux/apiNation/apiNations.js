import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNations = createAsyncThunk(
  "Nations/fetchNations",
  async () => {
    try {
      const response = await axios.get(
        "https://restcountries.com/v3.1/independent?status=true&fields=languages,capital,name,population,continents,flags"
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const nationSlice = createSlice({
  name: "Nations",
  initialState: {
    nations: [],
    loading: false,
    status: "none",
    total: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNations.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(fetchNations.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.nations = action.payload;
        state.total = action.payload.length;
      })
      .addCase(fetchNations.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default nationSlice.reducer;
