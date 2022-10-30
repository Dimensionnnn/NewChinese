import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import homeSet from "./display/homeSet";
import loginState from "./user/loginState";
import userInfo from "./user/userInfo";
import articleSet from "./article/articleSet";
import docpageSet from "./setting/docpageSet";

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
  articleSet: articleSet,
  docpageSet: docpageSet,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export const persistor = persistStore(store);
