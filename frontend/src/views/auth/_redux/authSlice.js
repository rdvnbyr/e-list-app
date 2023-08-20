import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import authService from './authService';

// // Get user from localStorage
// const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: null,
  isAuthenticated: false,
  token: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Signup User
export const signup = createAsyncThunk('/signup', async (userData, thunkAPI) => {
  try {
    return await authService.signup(userData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// Login User
export const login = createAsyncThunk('/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// Logout User
export const logout = createAsyncThunk('/logout', async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: state => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signup.pending, state => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        const {user, token} = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = user;
        state.token = token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
      });
  },
});

export const {reset} = authSlice.actions;
export default authSlice.reducer;
