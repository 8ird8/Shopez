import { Avatar } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "./userContext";
import Contact from "./contact";

interface ProductType {
  product_Name: string;
  product_Price: string;
  product_Description: string;
  product_Images: string[];
  product_City: string;
  creator: {
    avatar: string;
    username: string;
    _id: string;
    phone : string;
    
  };
  incart : string;
  // include other product properties as needed
}

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductType | undefined>(undefined);
  const [mainImage, setMainImage] = useState<string>("");
  const { TokenInfo,  fetchTokenInfo, fetchCurrentUser } =
    useContext(UserContext);
  const AssetsUrl = import.meta.env.VITE_ASSETS_URL;
  const navigate = useNavigate();
  const [Open, setOpen] = useState(false);
  const [call, setCall] = useState(false);

 
  useEffect(() => {
    fetchCurrentUser();
    fetchTokenInfo();
  }, [fetchTokenInfo, fetchCurrentUser]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://shopez-q69l.onrender.com/api/product/${productId}`,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200 && response.data.product) {
          setProduct(response.data.product);
          if (
            response.data.product.product_Images &&
            response.data.product.product_Images.length > 0
          ) {
            setMainImage(response.data.product.product_Images[0]);
            console.log("Token" + TokenInfo.userId);
            console.log("prod" + product?.creator._id);
          }
        } else {
          console.error("Error fetching product");
        }
      } catch (error) {
        console.error("Error during product fetch:", error);
      }
    };

    fetchProduct();
   
  }, [productId,TokenInfo]);

  

  const checkAuth = product?.creator._id === TokenInfo.userId;
  
  const [Incart, setIncart] = useState(false);

  useEffect(() => {
    // Ensure product data is available and TokenInfo is not undefined
    if (product && TokenInfo.userId) {
      const isIncart = product.incart.includes(TokenInfo.userId);
      setIncart(isIncart);
    }
  }, [product, TokenInfo.userId]);

  const toggleLike = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/product/${productId}/cart`,
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
        console.log(Incart)
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/delete/${productId}`,
        {
          withCredentials: true,
        }
      );
      if (res.status === 403) {
        console.error("You are not allowed");
      } else {
        console.log("delleted successfully");
        navigate("/home");
      }
    } catch (error) {
      console.log(" u D'ONT HAVE THE ACCES :", error);
      // Handle error or show a notification to the user
    }
  };

  return (
    <div>
      {call && (
        <>
          <div
            className="bg-slate-200 bg-opacity-50 z-20 overlay fixed top-0 right-0 left-0 bottom-0 "
            onClick={() => setCall(false)}
          ></div>
          <div className="fixed right-1/3 z-30">
            <div className="fixed hidden lg:block  right-1/3   top-16">
              <button onClick={() => setCall(false)}>
                <img
                  src={`${AssetsUrl}/cross.png`}
                  alt=""
                  className="w-6 h-6  rounded-lg bg-slate-600"
                />
              </button>
            </div>
            <Contact phone = {product?.creator.phone} username={product?.creator.username}  />
          </div>
        </>
      )}
      <section className="py-10 font-poppins">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="lg:flex md:flex  mb-24 -mx-4">
            <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
              <div className="sticky top-0 overflow-hidden ">
                <div className="relative mb-6 lg:mb-10 lg:h-96">
                  <img
                    className="object-contain w-full lg:h-full"
                    src={`http://localhost:3000/public/${mainImage}`}
                    alt="Product"
                  />
                </div>
                <div className="flex -mx-2 md:flex">
                  {product?.product_Images.map((image, index) => (
                    <div className="w-1/2  object-contain p-2 sm:w-1/4" key={index}>
                      <button
                        className="block border border-gray-200 hover:border-indigo-400"
                        onClick={() => setMainImage(image)}
                      >
                        <img
                          className="object-contain w-full h-28"
                          src={`http://localhost:3000/public/${image}`}
                          alt="Product thumbnail"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full shadow ml-4 relative py-4 h-full px-4 md:w-1/2">
              <div className="lg:pl-16">
                {Open && (
                  <>
                    <div
                      className="overlay  fixed top-0 right-0 left-0 bottom-0 "
                      onClick={() => setOpen(false)}
                    ></div>
                    <div className="relative bg-white   grid gap-2 ">
                      <div className="absolute top-6 right-0 w-1/2">
                        <div className="bg-white border border-gray-200 rounded-md shadow p-2 ">
                          <div className="  mb-2   bg-white border border-gray-200 rounded-md shadow px-4 py-2 text-center text-gray-700 hover:bg-gray-50">
                            <Link
                              to={`/update/${productId}`}
                              className="flex justify-between"
                            >
                              Edit
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="bi bi-pencil-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.647a.5.5 0 0 0 0-.707l-2-2a.5.5 0 0 0-.707-.707l-.293.293ZM10 2.207 2 10.207v.586l-.5.5v2.5h2.5l.5-.5h.586L13.793 6l-3.793-3.793ZM1 13.5V11l.5-.5h2.5l.5.5v2.5H2l-.5-.5v-2.086l-.5.5v.586Z" />
                              </svg>
                            </Link>
                          </div>

                          <button
                            className="flex text-red-500 justify-between w-full bg-white border border-gray-200 rounded-md shadow px-4 py-2 text-center  hover:bg-gray-50"
                            onClick={handleDelete}
                          >
                            Delete
                            <img
                              src={`${AssetsUrl}/trash.png`}
                              alt="trash"
                              className="w-6 h-6 "
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <div className="mb-6 ">
                  <h2 className="max-w-xl mt-6 mb-6 text-4xl font-bold capitalize leading-loose tracking-wide text-gray-700 md:text-4xl">
                    {product?.product_Name}
                  </h2>
                  {checkAuth && (
                    <div className="flex absolute top-0 right-1">
                      <button onClick={() => setOpen(true)}>
                        <img
                          src={`${AssetsUrl}/dots.png`}
                          alt="d"
                          className="w-6 h-6"
                        />
                      </button>
                    </div>
                  )}

                  <p className="inline-block text-2xl font-semibold text-gray-700">
                    <span>{product?.product_Price} $</span>
                  </p>
                </div>
                <div className="mb-6">
                  <h2 className="mb-2 text-md text-2xl capitalize font-bold text-gray-700">
                    Details :
                  </h2>
                  <div className="bg-gray-100 rounded-xl">
                    <div className="p-3 lg:p-5 ">
                      <div className="p-2 rounded-xl lg:p-6 bg-gray-50">
                        <div className="flex flex-wrap  gap-x-10 gap-y-4">
                          <div>
                            <p className="whitespace-pre-wrap">
                              {product?.product_Description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <h2 className="mb-2 text-md text-2xl font-bold text-gray-700">
                    City :
                  </h2>

                  <p className="inline-block capitalize  text-xl font-semibold ml-6 text-gray-500">
                    <span>{product?.product_City}</span>
                  </p>
                </div>
                <div className="mb-6 "></div>
                <div className="flex justify-between flex-wrap items-center mb-6">
                  <div className="mb-4 lg:mb-0">
                    <button className="flex items-center justify-center  h-10 p-2 mr-4 text-gray-700 border border-gray-300 lg:w-11 hover:text-gray-50 hover:bg-red-600 hover:border-red-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className=" bi bi-heart"
                        viewBox="0 0 16 16"
                      >
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="flex  w-36">
                    {!Incart && <button
                      onClick={toggleLike}
                      className="w-full px-4 py-3 text-center text-gray-100 bg-indigo-600 border border-transparent hover:border-indigo-500 hover:text-indigo-700 hover:bg-indigo-100 rounded-xl"
                    >
                      Add to Cart
                    </button> }
                  </div>
                </div>
                <div>
                  <h2 className="mb-2 text-md text-2xl font-bold text-gray-700">
                    Seller information :
                  </h2>
                  <div className="flex">
                    <Avatar
                      alt={product?.creator.username}
                      src={`http://localhost:3000/public/${product?.creator.avatar}`}
                      sx={{
                        width: 65,
                        height: 65,
                        margin: { xs: 1, sm: 1, md: 1 },
                        textTransform: "uppercase",
                      }}
                    />
                    <h2 className="text-lg font-semibold text-gray-700 m-auto capitalize ml-4 ">
                      {product?.creator.username}
                    </h2>
                    <div className="flex h-1/2 my-auto">
                      <button
                        onClick={() => setCall(true)}
                        className="w-full px-4 w- py-3 text-center text-gray-100 bg-indigo-600 border border-transparent hover:border-indigo-500 hover:text-indigo-700 hover:bg-indigo-100 rounded-xl"
                      >
                        Contact seller
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;
