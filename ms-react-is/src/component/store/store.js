import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import homeSet from "./display/homeSet";
import loginState from "./user/loginState";
import userInfo from "./user/userInfo";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  homeSet: homeSet,
  loginState: loginState,
  userInfo: userInfo,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({ reducer: persistedReducer });
export const persistor = persistStore(store);
