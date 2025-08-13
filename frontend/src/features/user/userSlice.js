import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {loginAPI, logoutAPI, signupAPI} from './userAPI';

const initialState = {
  user: null,
  status: {
    login: 'idle',
    signup: 'idle',
  },
  message: {
    login: null,
    signup: null,
  },
};

export const login = createAsyncThunk('user/login', async ({email, password}) => {
  return await loginAPI({email, password});
});

export const logout = createAsyncThunk('user/logout', async () => {
  return await logoutAPI();
});

export const signup = createAsyncThunk('user/signup', async (args) => {
  return await signupAPI(args);
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetLoginState: (state) => {
      state.status.login = 'idle';
      state.message.login = null;
    },
    resetSignupState: (state) => {
      state.status.signup = 'idle';
      state.message.signup = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status.login = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status.login = 'succeeded';
        console.log(action);
        state.user = action.payload?.userPayload;
        state.message.login = action.error?.message || 'Login successful';
      })
      .addCase(login.rejected, (state, action) => {
        state.status.login = 'failed';
        state.message.login = action.payload?.message || 'Login failed';
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(signup.pending, (state) => {
        state.status.signup = 'loading';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status.signup = 'succeeded';
        state.message.signup = action.payload?.message || 'Signup successful';
      })
      .addCase(signup.rejected, (state, action) => {
        state.status.signup = 'failed';
        state.message.signup = action.error?.message || 'Signup failed';
      });
  },
});

export const {resetLoginState, resetSignupState} = userSlice.actions;

export default userSlice.reducer;
