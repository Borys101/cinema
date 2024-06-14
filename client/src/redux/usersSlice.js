import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        user: null
    },
    reducers: {
        SetUser: (state, action) => {
            state.user = action.payload;
        },
        AddPoints: (state, action) => {
            state.user.points += action.payload;
        },
        RemovePoints: (state, action) => {
            state.user.points -= action.payload;
        }
    }
})

export const { SetUser, AddPoints, RemovePoints } = usersSlice.actions;

export default usersSlice.reducer;