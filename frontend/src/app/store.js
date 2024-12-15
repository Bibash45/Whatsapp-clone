import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import storage from "redux-persist/lib/storage";
import createFilter from "redux-persist-transform-filter";

//slices
import { persistReducer, persistStore } from "redux-persist";

// saveUsersOnlyFilter
const saveUsersOnlyFilter = createFilter("user", ["user"]);

// persist config
const persistConfig = {
  key: "user",
  storage,
  whitelist: ["user"],
  transforms: [saveUsersOnlyFilter],
};

const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export const persistor = persistStore(store);
