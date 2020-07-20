import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postRequest } from "../../api/postRequest";
import { apiKey, apiUrl } from "../../config";

interface AuthState {
  auth: boolean;
  token: string;
  error: boolean;
  loading: boolean;
}

const authState: AuthState = {
  auth: false,
  token: "",
  error: false,
  loading: false,
};

// First, create the thunk
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
        error: true,
      };
    }
  });
});

const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    signOut() {
      return authState;
    },
    updateApiKey(state, action) {
      console.log(state, action);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state, action) => {
      return { ...state, error: false, loading: true };
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      return { ...state, ...action.payload, loading: false };
    });
    builder.addCase(signIn.rejected, (state, action) => {
      return { ...state, error: true, loading: false };
    });
  },
});

export const { signOut, updateApiKey } = authSlice.actions;
export { signIn };
export default authSlice.reducer;
