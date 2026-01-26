import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import config from "@/utils/config";
import { addToCartAction } from "@/redux/slices/cartSlice";

function ProductCard({ pid, name, price, image }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const product = {
    pid,
    name,
    price: Number(price),
    image,
    quantity: 1,
  };

  const imageURL = image
    ? `${config.BASE_URL}/productimages/${image}`
    : "/no-image.png";

  const handleAddToCart = () => {
    const exists = cartItems.find((p) => p.pid === pid);

    if (exists) {
      toast.info("Product already in cart 🛒");
      return;
    }

    dispatch(addToCartAction(product));
    toast.success("Product added to cart 🛒");
  };

  return (
    <div className="product-card">
      <div className="product-img">
        <img
          src={imageURL}
          alt={name}
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = "/no-image.png";
          }}
        />
      </div>

      <div className="product-info">
        <h6 className="product-title">{name}</h6>

        <div className="product-footer">
          <span className="product-price">₹ {price}</span>
          <button
            className="btn btn-warning btn-sm"
            onClick={handleAddToCart}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;


