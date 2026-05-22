import ProductCard from "./ProductCard";

const Products=()=>{
    let products=[
        {name:"mobile", 
        price:50000, 
        description:"Innovative", 
        ratings: "⭐⭐⭐", 
        imageSrc: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Mobile_Phone_Evolution_1992_-_2014.jpg"},
        {name:"pendrive", 
        price:5000, 
        description:"Required", 
        ratings: "⭐⭐⭐⭐", 
        imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5_56kwGdMaSnc26RF_IRRc0vGxBMJuPjHxg&s"},
        {name:"T.V", 
        price:50000, 
        description:"Creative", 
        ratings: "⭐⭐⭐⭐", 
        imageSrc: "https://electronicparadise.in/cdn/shop/files/SAMled.jpg?v=1701762179&width=1406"},
    
    ];
    // looping can be doen through map, loops.
    return(
        <div>
            {products.map(()=>(
                <div>
                    <ProductCard details={product}/>
                </div>
            ))}
        </div>
    );
}
export default Products;
