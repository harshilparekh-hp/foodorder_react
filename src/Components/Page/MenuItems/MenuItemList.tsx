import React from 'react'
import  { useState, useEffect } from 'react';
import { menuItemModel } from '../../../Interfaces/index';
import MenuItemCard from './MenuItemCard';

// to retrieve from api, we need 2 hooks - when component is loaded, we need useEffect and to store locally, useState.


function MenuItemList() {

    const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);

    useEffect(() => {
      fetch("https://localhost:7089/api/menuitems")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setMenuItems(data.result);
        });
    }, []);

  return (
    <div className="container row">
      {menuItems.length > 0 &&
        menuItems.map((menuItem, index) => (
          <MenuItemCard menuItem={menuItem} key={index} />
        ))}
      
    </div>
  );
}

export default MenuItemList