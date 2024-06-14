import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        user: null
    },
    reducers: {
        SetUser: (state, action) => {
            state.user = action.payload;
<<<<<<< HEAD
=======
        },
        AddPoints: (state, action) => {
            state.user.points += action.payload;
        },
        RemovePoints: (state, action) => {
            state.user.points -= action.payload;
>>>>>>> my-recovered-branch
        }
    }
})

<<<<<<< HEAD
export const { SetUser } = usersSlice.actions;
=======
export const { SetUser, AddPoints, RemovePoints } = usersSlice.actions;
>>>>>>> my-recovered-branch

export default usersSlice.reducer;