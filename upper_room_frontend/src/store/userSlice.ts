import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  uid: string | null;
  email: string | null;
  displayName: string | null;
}

const initialState: UserState = {
  uid: null,
  email: null,
  displayName: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      (state.uid = action.payload.uid),
        (state.email = action.payload.email),
        (state.displayName = action.payload.displayName);
    },
    clearUser: () => {
      return initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
