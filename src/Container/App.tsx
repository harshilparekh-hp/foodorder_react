import React, { useEffect } from "react";
import { Footer, Header } from "../Components/Layout";
// import {
//   AccessDenied,
//   AuthenticationTest,
//   AuthenticationTestAdmin,
//   Home,
//   Login,
//   MenuItemDetails,
//   MyOrders,
//   NotFound,
//   OrderConfirmed,
//   Payment,
//   Register,
//   ShoppingCart,
// } from "../Pages";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userModel } from "../Interfaces";
import jwt_decode from "jwt-decode";
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import { RootState } from "../Storage/Redux/store";

function App() {
  const dispatch = useDispatch();

  const userData: userModel = useSelector(
    (state: RootState) => state.userStore
  );
  //const { data, isLoading } = useGetShoppingCartsQuery(userData.id);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const { fullName, id, email, role }: userModel = jwt_decode(localToken);
      dispatch(setLoggedInUser({ fullName, id, email, role }));
    }
  });

  // useEffect(() => {
  //   if (!isLoading) {
  //     dispatch(setShoppingCart(data.result?.cartItems));
  //   }
  // }, [data]); // when we update the shoppingCart, it will toggle the useEffect and sets the new shoppingCart.

  return (
    <div>
      <Header />
      <div className="pd-5">
        <Routes>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
