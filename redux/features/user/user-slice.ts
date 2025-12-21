import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import apiInstance from "../../../utils/axios-instance";

interface User {
  id: string;
  email: string;
  name?: string;
  isOnboarded?: boolean;
  [key: string]: any; // for other user properties
}

interface UserState {
  entities: {
    user?: User;
  };
  loading: boolean;
  errors: string[] | Record<string, any>;
}

interface GoogleLoginPayload {
  auth_code: string;
}

interface OnboardUserPayload {
  name: string;
  [key: string]: any; // for other onboarding fields
}

interface ApiResponse<T> {
  data: T;
  message?: string;
}

export const googleUserLogin = createAsyncThunk<
  ApiResponse<User>,
  GoogleLoginPayload,
  { rejectValue: string[] }
>("user/googleLogin", async (data, thunkAPI) => {
  try {
    const response = await apiInstance.post<ApiResponse<User>>("/auth/google", {
      auth_code: data.auth_code,
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ errors: string[] }>;
    return thunkAPI.rejectWithValue(
      err.response?.data?.errors || [err.message]
    );
  }
});

export const logoutUser = createAsyncThunk<
  ApiResponse<null>,
  void,
  { rejectValue: string[] }
>("user/logout", async (_, thunkAPI) => {
  try {
    const response = await apiInstance.post<ApiResponse<null>>("/auth/logout");
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ errors: string[] }>;
    console.log("[Error | user/logoutUser]: ", err);
    return thunkAPI.rejectWithValue(
      err.response?.data?.errors || [err.message]
    );
  }
});

export const fetchUser = createAsyncThunk<
  ApiResponse<User>,
  void,
  { rejectValue: string[] }
>("user/fetchUser", async (_, thunkAPI) => {
  try {
    const response = await apiInstance.get<ApiResponse<User>>("/user/me");
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ errors: { message: string }[] }>;
    console.log("[Error | user/fetchUser]: ", err);
    const compiledErrors = err.response?.data?.errors.map((e) => e.message) || [
      err.message,
    ];
    console.log("Compiled Errors: ", compiledErrors);
    return thunkAPI.rejectWithValue(compiledErrors);
  }
});

export const onboardUser = createAsyncThunk<
  ApiResponse<User>,
  OnboardUserPayload,
  { rejectValue: string[] }
>("user/onboardUser", async (data, thunkAPI) => {
  try {
    const response = await apiInstance.patch<ApiResponse<User>>(
      "/user/onboard",
      data
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ errors: string[] }>;
    console.log("[Error | user/onboardUser]: ", err);
    return thunkAPI.rejectWithValue(
      err.response?.data?.errors || [err.message]
    );
  }
});

const initialState: UserState = {
  entities: {},
  loading: false,
  errors: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GOOGLE LOGIN
    builder
      .addCase(googleUserLogin.pending, (state) => {
        state.loading = true;
        state.errors = [];
      })
      .addCase(googleUserLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.entities.user = action.payload.data;
        state.errors = [];
      })
      .addCase(googleUserLogin.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload || ["An unknown error occurred"];
      });

    // LOGOUT USER
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.errors = [];
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.entities = {};
        state.errors = [];
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload || ["An unknown error occurred"];
      });

    // FETCH USER
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.errors = [];
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.entities.user = action.payload.data;
        state.errors = [];
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload || ["An unknown error occurred"];
      });

    // ONBOARD USER
    builder
      .addCase(onboardUser.pending, (state) => {
        state.loading = true;
        state.errors = [];
      })
      .addCase(onboardUser.fulfilled, (state, action) => {
        state.loading = false;
        state.entities.user = action.payload.data;
        state.errors = [];
      })
      .addCase(onboardUser.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload || ["An unknown error occurred"];
      });
  },
});

export default userSlice.reducer;

// Type-safe selector
export const selectUser = (state: { user: UserState }) =>
  state.user.entities.user;
export const selectUserLoading = (state: { user: UserState }) =>
  state.user.loading;
export const selectUserErrors = (state: { user: UserState }) =>
  state.user.errors;
