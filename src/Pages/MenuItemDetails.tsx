import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMenuItemByIdQuery } from '../Apis/menuItemApi';
import { menuItemModel, userModel } from '../Interfaces';
import { setMenuItem } from '../Storage/Redux/menuItemSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateShoppingCartMutation } from '../Apis/shoppingCartApi';
import { MainLoader, MiniLoader } from './Common';
import { RootState } from '../Storage/Redux/store';
// USER ID - f1fe7e53-18c7-4d04-b21a-8b08c6189a6d


function MenuItemDetails() {

  // this menuItemId const must match with the route 
  // <Route path="/menuItemDetails/:menuItemId" element={<MenuItemDetails />}></Route>
  const userData: userModel = useSelector((state: RootState) => state.userStore);
  const { menuItemId }  = useParams(); 
  const {data, error, isLoading} = useGetMenuItemByIdQuery(menuItemId);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);

  const [updateShoppingCart] = useUpdateShoppingCartMutation();

  const handleQuantity = (counter: number) => {

    if(!userData.id){
      navigate("/login");
      return;
    }

    let newQuantity = quantity + counter;

    if(newQuantity <= 0){
      newQuantity = 1;
    }
    
    setQuantity(newQuantity);
    return;
  }

  const handleAddToCart = async (menuItemId: number) => {
    setIsAddingToCart(true);

    const response = await updateShoppingCart({
      menuItemId,
      updateQuantityBy: quantity,
      userId: userData.id,
    });

    setIsAddingToCart(false);
  }

  return (
    <div className="container pt-4 pt-md-5">
      {/* conditional rendering */}
      {!isLoading ? (
        <div className="row">
          <div className="col-7">
            <h2 className="text-success">{data.result.name}</h2>
            <span>
              <span
                className="badge text-bg-dark pt-2"
                style={{ height: "40px", fontSize: "20px" }}
              >
                {data.result.category}
              </span>
            </span>
            <span>
              <span
                className="badge text-bg-light pt-2"
                style={{ height: "40px", fontSize: "20px" }}
              >
                {data.result.specialTag}
              </span>
            </span>
            <p style={{ fontSize: "20px" }} className="pt-2">
              {data.result.description}
            </p>
            <span className="h3">${data.result.price}</span> &nbsp;&nbsp;&nbsp;
            <span
              className="pb-2  p-3"
              style={{ border: "1px solid #333", borderRadius: "30px" }}
            >
              <i
                onClick={() => handleQuantity(-1)}
                className="bi bi-dash p-1"
                style={{ fontSize: "25px", cursor: "pointer" }}
              ></i>
              <span className="h3 mt-3 px-3"> {quantity} </span>
              <i
                onClick={() => handleQuantity(+1)}
                className="bi bi-plus p-1"
                style={{ fontSize: "25px", cursor: "pointer" }}
              ></i>
            </span>
            <div className="row pt-4">
              <div className="col-5">
                {isAddingToCart ? (
                  <button disabled className="btn btn-success form-control">
                    <MiniLoader />
                  </button>
                ) : (
                  <button
                    className="btn btn-success form-control"
                    onClick={() => handleAddToCart(data.result.id)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>

              <div className="col-5 ">
                <button
                  className="btn btn-secondary form-control"
                  onClick={() => navigate(-1)}
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
          <div className="col-5">
            <img
              src={data.result.image}
              width="100%"
              style={{ borderRadius: "50%" }}
              alt="No content"
            ></img>
          </div>
        </div>
      ) : (
        <div
          className="d-flex justify-content-center"
          style={{ width: "100%" }}
        >
          <MainLoader />
        </div>
      )}
    </div>
  );
}

export default MenuItemDetails