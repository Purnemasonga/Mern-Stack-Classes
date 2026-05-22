import axios from "axios";
import { useEffect, useState } from "react";

const CartPage = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const fetchCartProducts = async () => {
    try {
      const userId = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:5000/cart/get-cartproducts/${userId}`, {
        Authorization: {
          Bearer : token
        }
      });
      setCartProducts(response.data.AllProducts);
      console.log(response.data.AllProducts);

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    fetchCartProducts()
  }, [])

  return (
    <>
      {
        JSON.stringify(cartProducts)
      }
    </>
  );
};

export default CartPage;