import  { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  state: {
    isFetching: false,
  },
  user: {
    name: '',
    isAuthenticated: false,
    accessToken: ''
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsFetching: (state) => {
      state.state.isFetching = true;
    },
    setUserSession: (state, action: PayloadAction<typeof initialState.user>) => {
      state.user = action.payload;
    },
    setLogOut: (state) => {
      state.user = initialState.user
    }
  }
});

export const {
  setIsFetching, setUserSession, setLogOut
} = userSlice.actions;

export default userSlice.reducer;
