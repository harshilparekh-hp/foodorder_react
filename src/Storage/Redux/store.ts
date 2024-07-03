import { configureStore } from "@reduxjs/toolkit";
import { menuItemReducer } from "./menuItemSlice";
import { menuItemApi, shoppingCartApi } from "../../Apis";
import { shoppingCartReducer } from "./shoppingCartSlice";
const store = configureStore({
  reducer: {
    menuItemStore: menuItemReducer,
    shoppingCartStore: shoppingCartReducer,
    [menuItemApi.reducerPath]: menuItemApi.reducer, // WHAT IS THIS? - MAY BE RTK QUERY TO REDUX STORE CONFIG
    [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
  },
  middleware: (getdefaultMiddleware) =>
    getdefaultMiddleware()
    .concat(menuItemApi.middleware)
    .concat(shoppingCartApi.middleware), // WHAT IS THIS?
});

// type of current state of slice will be exported via RootState. This is used for TypeScript purpose.
export type RootState = ReturnType<typeof store.getState>;

export default store;

