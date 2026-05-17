import React, { createContext, useReducer, useState } from "react";

const CartContext = createContext(null);

const initialState = {
  cart: [],
};

// {
//     type:string,
//     payload: {
//         id:string,
//         productName:string,
//         price:number,
//         quantity:number
//     }
// }
export default function CartContextProvider() {
  const [cartDetails, dispatch] = useReducer(useReducer, initialState);
  const [cartFactory, setCartFactory] = useState([]);

  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_CART":
        setCartFactory((prev) => {
          const arr = prev.map((item) => ({ ...item }));
          const item = arr.find((item) => item.id === action.payload.id);
          if (item) {
            arr = arr.map((item) =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity + action.payload.quantity }
                : item,
            );
          } else {
            arr = [
              ...arr,
              {
                id: action.payload.id,
                name: action.payload.name,
                price: action.payload.price,
                quantity: action.payload.quantity,
              },
            ];
          }
          return arr;
        });
        state.
    }
  };
  return <div>CartContext</div>;
}
