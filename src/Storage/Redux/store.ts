import { configureStore } from "@reduxjs/toolkit";
import { menuItemReducer } from "./menuItemSlice";
import { authApi, menuItemApi, orderApi, paymentApi, shoppingCartApi } from "../../Apis";
import { shoppingCartReducer } from "./shoppingCartSlice";
import { userAuthReducer } from "./userAuthSlice";
const store = configureStore({
  reducer: {
    menuItemStore: menuItemReducer,
    shoppingCartStore: shoppingCartReducer,
    userStore: userAuthReducer,
    [menuItemApi.reducerPath]: menuItemApi.reducer, // WHAT IS THIS? - MAY BE RTK QUERY TO REDUX STORE CONFIG
    [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer
  },
  middleware: (getdefaultMiddleware) =>
    getdefaultMiddleware()
    .concat(menuItemApi.middleware)
    .concat(shoppingCartApi.middleware)
    .concat(authApi.middleware) // WHAT IS THIS?
    .concat(paymentApi.middleware)
    .concat(orderApi.middleware)
});

// type of current state of slice will be exported via RootState. This is used for TypeScript purpose.
export type RootState = ReturnType<typeof store.getState>;

export default store;

