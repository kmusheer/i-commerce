import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { checkUser, createUser, signOut } from '../utils/authApi';
import { updateUser } from '../utils/userApi';


const initialState = {
    loggedInUser: null,
    status: 'idle',
    error : null,
}

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
)
export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (userData) => {
    const response = await checkUser(userData);
    return response.data;
  }
)
export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update) => {
    const response = await updateUser(update);
    return response.data;
  }
)
export const signOutAsync = createAsyncThunk(
  'user/signOut',
  async (update) => {
    const response = await signOut(update);
    return response.data;
  }
)


export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    clearError: (state) => {
        state.error = null;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle",
          state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle",
          state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "idle",
          state.error = action.error;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle",
        state.loggedInUser = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle",
        state.loggedInUser = null;
      })
  },
})

// Action creators are generated for each case reducer function
export const { increment } = authSlice.actions

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state)=>state.auth.error;


export default authSlice.reducer