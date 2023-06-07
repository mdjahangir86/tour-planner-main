import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface AuthSliceState {
  isLoggedIn: boolean;
  userInfo: any;
  status: 'idle' | 'loading' | 'failed';
  isUserInfoFetched: boolean;
  isAuthChecked: boolean;
}

const initialState: AuthSliceState = {
  isLoggedIn: false,
  userInfo: null,
  status: 'idle',
  isUserInfoFetched: false,
  isAuthChecked: false,
};

export const fetchUserInfo = createAsyncThunk(
  'auth/fetchUserInfo',
  async (userId: string) => {
    setTimeout(() => Promise.resolve({ userId }), 1500);
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initialAuthCheck: (state) => {
      const userInfo = localStorage.getItem('user');

      if (userInfo) {
        return {
          ...state,
          isLoggedIn: true,
          isUserInfoFetched: true,
          isAuthChecked: true,
          userInfo: JSON.parse(userInfo),
        };
      }

      return { ...state, isAuthChecked: true };
    },
    setUserInfo: (state, { payload }) => {
      localStorage.setItem('user', JSON.stringify(payload.userInfo));

      return {
        ...state,
        isLoggedIn: true,
        isUserInfoFetched: true,
        isAuthChecked: true,
        userInfo: payload.userInfo,
      };
    },

    resetAuth: () => {
      localStorage.removeItem('user');
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.pending, (state) => {
      return {
        ...state,
        status: 'loading',
      };
    });
    builder.addCase(fetchUserInfo.fulfilled, (state, { payload }) => {
      return {
        ...state,
        status: 'idle',
        userInfo: payload,
      };
    });
    builder.addCase(fetchUserInfo.rejected, (state) => {
      return {
        ...state,
        status: 'failed',
      };
    });
  },
});

export const { setUserInfo, resetAuth, initialAuthCheck } = authSlice.actions;

export default authSlice.reducer;
