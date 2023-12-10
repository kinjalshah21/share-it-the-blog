import{createSlice} from '@reduxjs/toolkit'

const initialState = {
    status : false,
    userData : null
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
      logIn : (state,action) => {
        state.status = true;
        state.userData = action.payload;
      },
      logOut : (state)=> {
         state.status = false;
         state.userData = null;
      }
    }
})

export default authSlice.reducer;

export const {logIn,logOut}  = authSlice.actions;