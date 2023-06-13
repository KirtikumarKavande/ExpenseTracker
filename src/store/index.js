import { configureStore } from "@reduxjs/toolkit";
import authSLice from './AuthReducer'


const store=configureStore({reducer:{auth:authSLice}})
export default store