import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCartAction } from "@/redux/slices/cartSlice";

function ProductCard({ pid, name, price, image, description }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const product = {
    pid,
    name,
    price: Number(price),
    image,
    quantity: 1,
  };

  // 🔹 Handle server / public image
  const IMAGE_BASE_URL = "https://icthpupomoxfecbwsxwx.supabase.co/storage/v1/object/public/quickbazzar/products/";

  const imageURL =
    image && image.startsWith("http")
      ? image
      : image
      ? `${IMAGE_BASE_URL}${image}`
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
      {/* IMAGE */}
      <div className="product-img">
        <img
          src={imageURL}
          alt={name}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/no-image.png";
          }}
        />
      </div>

      {/* INFO */}
      <div className="product-info">
        <h6 className="product-title">{name}</h6>

        {description && (
          <p className="product-description">{description}</p>
        )}

        <div className="product-footer">
          <span className="product-price">₹ {price}</span>
          <button
            className="btn btn-warning btn-sm px-2 py-1"
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
