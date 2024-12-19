import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const CONVERSATION_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/conversation`;
const initialState = {
  status: "",
  error: "",
  conversations: [],
  activeConversation: {},
  notifications: [],
};

// functions
export const getCoversations = createAsyncThunk(
  "conversation/all",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${CONVERSATION_ENDPOINT}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversation: (state, actions) => {
      state.activeConversation = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCoversations.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCoversations.fulfilled, (state, action) => {
        state.status = "succeded";
        state.conversations = action.payload;
      })
      .addCase(getCoversations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setActiveConversation } = chatSlice.actions;

export default chatSlice.reducer;
