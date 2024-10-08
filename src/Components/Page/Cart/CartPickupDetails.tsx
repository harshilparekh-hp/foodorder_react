import React, { useState } from "react";
import { useSelector } from "react-redux";
import { apiResponse } from "../../../Interfaces";
import { RootState } from "../../../Storage/Redux/store";
import { inputHelper } from "../../../Helper";
import { useInitiatePaymentMutation } from "../../../Apis/payment";
import { useNavigate } from "react-router-dom";

function CartPickupDetails() {
  const [loading, setLoading] = useState(false);
  // fetching shopping cart store from redux store
  // const shoppingCartFromStore: cartItemModel[] = useSelector(
  //   (state: RootState) => state.shoppingCartStore.cartItems ?? []
  // );

  const userData = useSelector((state: RootState) => state.userStore);

  let grandTotal = 0;
  let totalItems = 0;

  const initialUserData = {
    name: userData.fullName,
    email: userData.email,
    phoneNumber: "",
  };

  // shoppingCartFromStore?.map((cartItem: cartItemModel) => {
  //   totalItems += cartItem.quantity ?? 0;
  //   grandTotal += (cartItem.menuItem?.price ?? 0) * (cartItem.quantity ?? 0);
  //   return null;
  // });

  const [userInput, setUserInput] = useState(initialUserData);
  const [initiatePayment] = useInitiatePaymentMutation();
  const navigate = useNavigate();
  const handlerUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // initiate the payment
    const {data}: apiResponse = await initiatePayment(userData.id);
    const orderSummary = {grandTotal, totalItems};
    navigate("/payment", {
      state: {apiResult: data?.result, userInput, orderSummary} // passing payment component the state on navigate
    })

    // set the loading flag = false;
  };

  return (
    <div className="border pb-5 pt-3">
      <h1 style={{ fontWeight: "300" }} className="text-center text-success">
        Pickup Details
      </h1>
      <hr />
      <form className="col-10 mx-auto" onSubmit={handleSubmit}>
        <div className="form-group mt-3">
          Pickup Name
          <input
            type="text"
            className="form-control"
            value={userInput.name}
            placeholder="name..."
            onChange={handlerUserInput}
            name="name"
            required
          />
        </div>
        <div className="form-group mt-3">
          Pickup Email
          <input
            type="email"
            className="form-control"
            value={userInput.email}
            placeholder="email..."
            onChange={handlerUserInput}
            name="email"
            required
          />
        </div>

        <div className="form-group mt-3">
          Pickup Phone Number
          <input
            type="number"
            className="form-control"
            value={userInput.phoneNumber}
            placeholder="phone number..."
            onChange={handlerUserInput}
            name="phoneNumber"
            required
          />
        </div>
        <div className="form-group mt-3">
          <div className="card p-3" style={{ background: "ghostwhite" }}>
            <h5>Grand Total : $ {grandTotal.toFixed(2)}</h5>
            <h5>No of items : {totalItems}</h5>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-lg btn-success form-control mt-3"
          disabled={loading}
        >
          {/* {loading ? <MiniLoader /> : "Looks Good? Place Order!"} */}
        </button>
      </form>
    </div>
  );
}

export default CartPickupDetails;
