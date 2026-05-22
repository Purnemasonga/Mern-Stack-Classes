import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import FooterComponent from './../components/FooterComponent';
import { toast, ToastContainer } from "react-toastify";
import NavBar from "../components/NavBar";

const CartPage = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const fetchCartProducts = async () => {
    try {
      const userId = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:5000/cart/get-cartproducts/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCartProducts(response.data.AllProducts);

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    fetchCartProducts()
  }, [])



  const handleRemove = async (productId) => {
    try {
      const id = localStorage.getItem("id");
      const token = localStorage.getItem("token")
      const response = await axios.patch("http://localhost:5000/cart/remove-product", {
        userId: id,
        productId: productId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      fetchCartProducts()
      toast.success("product removed ");

    } catch (error) {
      console.log(error);
      toast.error("Access Denied");
    }
  }

  return (<>
    <NavBar />
    <div id="cart-container">
      <div>
        <h1 className="text-center ">Cart Products </h1>
      </div>
      <Row xs={1} md={4} className="g-4">
        {cartProducts.map((p, idx) => (
          p.Products_in_cart.map((cart) => {
            return <div>
              <Col key={idx}>
                <Card>
                  <Card.Img variant="top" src={cart.imageSrc} height="250" />
                  <Card.Body>
                    <Card.Title>Title :{cart.name}</Card.Title>
                    <Card.Text>
                      Description:  {cart.description} <br />
                      Price:  ₹{cart.price}.00 <br />
                      Ratings: {cart.ratings}
                    </Card.Text>
                    <div className="btn btn-success mx-2">Buy</div>
                    <div className="btn btn-danger " onClick={() => handleRemove(cart._id)} > remove Cart</div>
                  </Card.Body>
                </Card>
              </Col>
            </div>
          })




        ))}
      </Row>

      <FooterComponent />
      <ToastContainer />
    </div>
  </>
  );
};

export default CartPage;