import { createSlice } from "@reduxjs/toolkit";


const expenseIntialState={expenseFromDb:[]}
const expenseSlice= createSlice({
    name:"expense",
    initialState:expenseIntialState,
    reducers:{
        getExpense(state,action){
         state.expenseFromDb=action.payload
        }
    }
})

export const expenseAction= expenseSlice.actions
export default expenseSlice.reducer