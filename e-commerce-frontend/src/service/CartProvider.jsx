import { createContext, useState } from "react"; // Ensure this is lowercase too
export const CartContext = createContext(); // Fixed!

const CartProvider = ({children}) => {
    const [items,setItems] =useState([]);
    const addToCart=(products)=>{
        const cartProducts = items.some((item)=> item.id ==products.id);
        if(!carProducts) {
            setItems([...items, product]);
        }
    };
    const removeToCart=(product)=>{
        const afterRemoveProducts=items.filter((item)=>item.title!=product.title);
        setItems(afterRemoveProducts);
    }

  return (
    <CartContext.Provider value={{items, addToCart , removeToCart}}>
        {children}
    </CartContext.Provider>
  );
};

export default CartProvider;