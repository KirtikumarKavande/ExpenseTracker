import { configureStore } from "@reduxjs/toolkit";
import authSLice from './AuthReducer'
import expenseSlice from './ExpenseReducer'


const store=configureStore({reducer:{auth:authSLice,expense:expenseSlice}})
export default store