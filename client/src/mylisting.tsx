import Sidebar from "./sidebar";
import "./assets/output.css";
import Card from "./cardProduct";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "./userContext";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";

interface Product {
  product_Name: string;
  product_Price: number;
  product_Images: string[];
  price: string;
  _id: string;
  product_Category: string;
  incart: string[];
}

const Mylistings = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { currentUserInfo, TokenInfo, fetchCurrentUser, fetchTokenInfo } =
    useContext(UserContext);
    const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `https://shopez-q69l.onrender.com/api/mylistings/${TokenInfo.userId}`,
          {
            withCredentials: true,
          }
        );

        if (res.status === 200 && res.data.products) {
          if (res.data.products.length > 0) {
            setProducts(res.data.products);
            // setLoading(false);
          }
        } else {
          console.error(
            "An error occurred while fetching posts or no posts returned"
          );
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchProducts();
  }, [products, TokenInfo]);

  useEffect(() => {
    fetchCurrentUser();
    fetchTokenInfo();
  }, [fetchCurrentUser, fetchTokenInfo]);

  return (
    <div className="flex justify-between">
      <div className="fixed top-16 hidden md:block lg:block">
        <Sidebar />
      </div>

      <div className=" m-auto lg:ml-72 md:ml-72 ">
        <main className="   w-full    fixed top-0 right-0 z-10  transition-all duration-150 ease-in">
          <header className=" bg-transparent   py-4 px-4">
            <div className=" flex justify-between  ">
              <div className="sidebar-header flex items-center justify-center ">
                <div className="inline-flex">
                  <Link
                    to="/home"
                    className="inline-flex flex-row items-center"
                  >
                    <img
                      src="cart-svgrepo-com.svg"
                      alt=""
                      className="w-10 h-10 "
                    />
                    <span className="leading-1 text-2xl font-bold ml-1 uppercase">
                      Shopez
                    </span>
                  </Link>
                </div>
              </div>
              <div className="w-1/2">
                <div className="hidden  md:flex relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>

                  <input
                    id="search"
                    type="text"
                    name="search"
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-300 w-full h-10 focus:outline-none focus:border-indigo-400"
                    placeholder="Search..."
                    onChange={(e)=> setSearch(e.target.value)}
                  />
                </div>
                <div className="flex md:hidden">
                  <Link
                    to="#"
                    className="flex items-center justify-center h-10 w-10 border-transparent"
                  >
                    <svg
                      className="h-6 w-6 text-gray-500"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </Link>
                </div>
              </div>
              <Link to="/profile">
                <div className="flex ml-">
                  <div className="flex flex-row items-center">
                    <Avatar
                      alt={currentUserInfo.username}
                      src={`http://localhost:3000/public/${currentUserInfo.avatar}`}
                      sx={{
                        width: 40,
                        height: 40,
                        // margin: { xs: 1, sm: 1, md: 1 },
                        textTransform: "uppercase",
                      }}
                    />
                    <span className="flex flex-col ml-2">
                      <span className="truncate  capitalize font-semibold tracking-wide leading-none">
                        {currentUserInfo.username}
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </header>
        </main>
        <div className="main-content flex flex-col flex-grow p-4">
          <div className="flex flex-col flex-grow  bg-white rounded mt-4">
            {/* <!-- PRODUCTS CARDS --> */}
            <section
              id="Projects"
              className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3  md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-16 mb-5"
            >
              {products
                .filter((val) => {
                  if (search == "") {
                    return val;
                  } else if (
                    val.product_Name
                      .toLocaleLowerCase()
                      .includes(search.toLocaleLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((product) => (
                  <div key={product._id} className="post-container mb-8">
                    <Card
                      Name={product.product_Name}
                      imageUrl={[
                        `http://localhost:3000/public/${product.product_Images[0]}`,
                      ]}
                      price={product.product_Price}
                      productId={product._id}
                      category={product.product_Category}
                      isIncart={product.incart.includes(TokenInfo.userId)}
                    />
                  </div>
                ))}
              {/* <!--   Ends  --> */}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mylistings;
