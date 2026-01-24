import { useDispatch } from "react-redux";
import config from "../utils/config";
import { addToCartAction } from "../slices/cartSlice";

function ProductCard({ pid, name, description, price, image }) {
  const dispatch = useDispatch();

  const product = {
    pid,
    name,
    description,
    price: Number(price), // ensure price is a number
    image,
    quantity: 1,
  };

  console.log(product.image);
  
  const imageURL = config.BASE_URL + "/productimages/" + product.image;

  return (
    <div className="col">
      <div className="card mt-3" style={{ width: "15rem" }}>
        <img src={imageURL} className="card-img-top" alt={name} />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text" style={{ height: "4rem" }}>
            {description}
          </p>
          <div className="d-flex justify-content-between">
            <h6>₹ {price}</h6>
            <button
              className="btn btn-warning btn-sm"
              onClick={() => dispatch(addToCartAction(product))}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
