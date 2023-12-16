// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./reducers/authReducer";

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     // ...other reducers
//   },
// });

// export default store;
// // store.js
// import { configureStore } from "@reduxjs/toolkit";
// import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import authReducer from "./reducers/authReducer";

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["auth"],
//   serialize: false,
// };

// const persistedReducer = persistReducer(persistConfig, authReducer);

// const store = configureStore({
//   reducer: {
//     auth: persistedReducer,
//     // ...other reducers
//   },
//   serialize: false,
// });

// export const persistor = persistStore(store);
// export default store;

// store.js
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
