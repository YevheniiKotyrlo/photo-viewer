import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postRequest } from "../../api/postRequest";
import { apiKey, apiUrl } from "../../config";

interface AuthState {
  auth: boolean;
  token: string;
}

const initialState: AuthState = {
  auth: false,
  token: "",
};

const signIn = createAsyncThunk("auth/signIn", async () => {
  const data = {
    apiKey,
  };

  return await postRequest(`${apiUrl}/auth`, data).then((json) => {
    if (json.auth) {
      return {
        auth: json.auth,
        token: json.token,
      };
    } else {
      return {
        auth: false,
        token: "",
      };
    }
  });
});

const name = "auth";

const authSlice = createSlice({
  name,
  initialState,
  reducers: {
    signOut() {
      return initialState;
    },
    updateApiKey(state, action) {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state = action.payload;
      return state;
    });
    builder.addCase(signIn.rejected, () => {
      return initialState;
    });
  },
});

export const { signOut } = authSlice.actions;
export { signIn };
export default authSlice.reducer;
