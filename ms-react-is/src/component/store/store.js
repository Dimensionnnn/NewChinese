import { configureStore } from "@reduxjs/toolkit";
import homeSet from "./display/homeSet";
import loginState from "./user/loginState";

export default configureStore({
  reducer: {
    homeSet: homeSet,
    loginState: loginState,
  },
});
