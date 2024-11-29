import { createSlice } from "@reduxjs/toolkit";

// Här bestämmer vi allt som vi vill spara i vårt state, kan vara ett objekt med flera olika egenskaper
const initialState = {
  username: "",
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
  },
});

export const { setUsername } = notesSlice.actions;

export default notesSlice.reducer;
