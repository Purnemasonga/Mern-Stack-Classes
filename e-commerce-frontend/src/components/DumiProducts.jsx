import { Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";


function DumiProducts() {
let products = [
    {
      imageSrc:
        "https://m.media-amazon.com/images/I/610ub5kytVL.jpg",
      title: "Head Phones",
    },
     {
      imageSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTguBbqhsYQ2-ItJoAWAg4_cuCZ3b7YEUunYw&s",
      title: "Water Bottles",
    },
    
     {
      imageSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFa_dn5H8CisPpDmFK7wX8-QD36ea21hzZkA&s",
      title: "PS-5",
    },
     {
      imageSrc:
        "https://www.artsty.com/cdn/shop/files/WhatsAppImage2023-10-04at22.24.55.jpg?v=1697620486",
      title: "Corchet Flowers",
    },
     {
      imageSrc:
        "https://images.moneycontrol.com/static-mcnews/2022/12/pexels-melike-benli-10252336.jpg",
      title: "Fridge Magnets",
    },
    {
      imageSrc:
        "https://welcometonanas.com/wp-content/uploads/2022/05/Welcome-to-Nanas-Tiny-Canvas-Painting-Ideas-9.jpg",
      title: "Canvas Paintings",
    },
    {
      imageSrc:
        "https://m.media-amazon.com/images/I/616fdRSET7L._AC_UF1000,1000_QL80_.jpg",
      title: "Gaming Keyboard",
    },
    {
      imageSrc:
        "https://cdns3.thecosmicbyte.com/wp-content/uploads/White-BG-01-2.jpg.webp",
      title: "Joy Stick",
    },


]; 

return(
  <Row xs={1} md={4} className="g-4">
    {products.map((item, idx)=>(
      <Col key={idx}>
        <Card>
          <Card.Img variant="top" src={item.imageSrc} height="290px" width="190px" />
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>
              This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
            </Card.Text>
            <button className="btn btn-warning"> Add to Cart</button>
            <button className="btn btn-success mx-2"> Buy</button>
          </Card.Body>
          </Card>
      </Col>
    ))}
  </Row>
);
}

export default DumiProducts;
