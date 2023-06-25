import { configureStore } from "@reduxjs/toolkit";
import authSLice from './AuthReducer'
import expenseSlice from './ExpenseReducer'
import themeSlice from './themeReducer'
import editDataSlice from './EditDataReducer'
import toggleSlice from './toggleReducer'


const store=configureStore({reducer:{auth:authSLice,expense:expenseSlice,theme:themeSlice,edit:editDataSlice,toggleMenu:toggleSlice}})
export default store