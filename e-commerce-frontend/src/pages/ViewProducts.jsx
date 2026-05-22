import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { ToastContainer,toast } from 'react-toastify';
const ViewProducts = () => {

    const [allProducts, setAllProducts] = useState([])

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/products/get-allproducts');
            setAllProducts(response.data.allProducts);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])



    const handleCart = async(id) => {
        try {

            const userID = localStorage.getItem("id")
            const token = localStorage.getItem("token")
            const response = await axios.post("http://localhost:5000/cart/add-cart", {
                userId: userID,
                productId: id,
            }, {
                Authorization: {
                    Bearer: token
                }
            })
            console.log(response);
            toast.success("added to cart")
            
        } catch (error) {
            console.log(error);
            toast.error("failed to add cart")

        }
    }

    return (
        <div>

            <h1>Products</h1>


            <Row xs={1} md={4} className="g-4">
                {allProducts.map((product, idx) => (
                    <Col key={idx}>
                        <Card>
                            <Card.Img variant="top" src={product.imageSrc} height="250" />
                            <Card.Body>
                                <Card.Title>Title :{product.name}</Card.Title>
                                <Card.Text>
                                    Description:  {product.description} <br />
                                    Price:  ₹{product.price}.00 <br />
                                    Ratings: {product.ratings}
                                </Card.Text>
                                <div className="btn btn-success mx-2">Buy</div>
                                <div className="btn btn-warning " onClick={()=>handleCart(product._id)}>Cart</div>
                                <div className="btn btn-danger m-2">Delete</div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <ToastContainer/>
        </div>
    )
}

export default ViewProducts