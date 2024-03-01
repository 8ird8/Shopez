import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

interface CardProps {
  Name: string;
  productId: string;
  imageUrl: string[];
  price: number;
  category: string;
  isIncart: boolean;
}

const Card: React.FC<CardProps> = ({
  Name,
  imageUrl,
  price,
  productId,
  category,
  isIncart,
}) => {
  const [Incart, setIncart] = useState(isIncart);

  const toggleLike = async () => {
    try {
      const res = await axios.post(
        `https://shopez-q69l.onrender.com/api/product/${productId}/cart`,
        {},
        { withCredentials: true }
      );

      if (res.status === 200) {
        if (!Incart) {
          setIncart(true);
        } else {
          setIncart(false);
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };
  return (
    <div>
      <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <Link to={`/product/${productId}`}>
          <img
            src={imageUrl[0]}
            alt="Product"
            className="h-80 w-72 rounded-xl object-cover rounded-t-xl"
          />
        </Link>
        <div className="px-4 py-3 w-72">
          <span className="text-gray-400 mr-3 uppercase text-xs">
            {category}
          </span>
          <p className="text-lg font-bold text-black truncate block capitalize">
            {Name}
          </p>

          <div className="flex items-center">
            <p className="text-lg font-semibold text-black cursor-auto my-3">
              {price} <span className="text-slate-500">$</span>
            </p>
            <div className="flex items-center justify-between"></div>
            <button onClick={toggleLike} className="ml-auto">
              {!Incart ? (
                <img src="cart-add.png" alt="" className="w-6 h-6" />
              ) : (
                <img src="cart-check.png" alt="" className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
