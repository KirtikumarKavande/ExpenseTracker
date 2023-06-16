import { configureStore } from "@reduxjs/toolkit";
import authSLice from './AuthReducer'
import expenseSlice from './ExpenseReducer'
import themeSlice from './themeReducer'
import editDataSlice from './EditDataReducer'


const store=configureStore({reducer:{auth:authSLice,expense:expenseSlice,theme:themeSlice,edit:editDataSlice}})
export default store