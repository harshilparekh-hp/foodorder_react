import React from 'react'
import  { useState, useEffect } from 'react';
import { menuItemModel } from '../../../Interfaces/index';
import MenuItemCard from './MenuItemCard';
import { useGetMenuItemsQuery } from '../../../Apis/menuItemApi';
import { useDispatch } from 'react-redux';
import { setMenuItem } from '../../../Storage/Redux/menuItemSlice';
import { MainLoader } from '../../../Pages/Common';

// to retrieve from api, we need 2 hooks - when component is loaded, we need useEffect and to store locally, useState.


function MenuItemList() {

    //const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);
    const dispatch = useDispatch();
    const {data, isLoading} = useGetMenuItemsQuery(null);

    console.log(data);
    useEffect(() => {
     if(!isLoading){
        dispatch(setMenuItem(data.result));
     }
    }, [isLoading]); // only want to execute useEffect() when the isLoading is updated.


    if(isLoading){
      return <MainLoader />
    }
  
  return (
    <div className="container row">
      {data.result.length > 0 &&
        data.result.map((menuItem: menuItemModel, index: number) => (
          <MenuItemCard menuItem={menuItem} key={index} />
        ))}
      
    </div>
  );
}

export default MenuItemList