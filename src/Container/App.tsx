import React, { useEffect } from 'react';
import { Footer, Header } from '../Components/Layout';
import { Home, MenuItemDetails, NotFound, ShoppingCart } from '../Pages';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetShoppingCartsQuery } from '../Apis/shoppingCartApi';
import { setShoppingCart } from '../Storage/Redux/shoppingCartSlice';




function App() {

  const dispatch = useDispatch();

  const {data, isLoading} = useGetShoppingCartsQuery("f1fe7e53-18c7-4d04-b21a-8b08c6189a6d");

  useEffect(() => {
    if(!isLoading){
      dispatch(setShoppingCart(data.result?.cartItems))
    }
  }, [data]) // when we update the shoppingCart, it will toggle the useEffect and sets the new shoppingCart.

  return (
    <div>
      <Header />
      <div className='pd-5'>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/menuItemDetails/:menuItemId" element={<MenuItemDetails />}></Route>
          <Route path="/shoppingCart" element={<ShoppingCart />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
