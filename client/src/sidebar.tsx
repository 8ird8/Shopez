import axios from "axios";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const AssetsUrl = import.meta.env.VITE_ASSETS_URL;

  const navigate = useNavigate();

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const res = await axios.get("https://shopez-q69l.onrender.com/api/logout", {
        withCredentials: true,
      });

      if (res.status === 200) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        console.error("An error occurred during logout");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  const handleClick = () => {
    if (open){
      setOpen(false)
    }else{
        setOpen(true)
    }
  }

  return (
    <>
    <div className="absolute top-4 left-4"
      onClick={ handleClick}>
      <img src={`${AssetsUrl}/bars.png`} alt="menu"  className=""/>

      </div>
      <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <aside className={ `sidebar w-64 md:shadow  ${open ? "transform transition-transform  bg-slate-600 duration-150 ease-in  hidden lg:flex md:flex" : "flex"}     `}>
          <div className="sidebar-content   px-4 py-6">
            <ul className="flex flex-col w-full">
              <li className="my-px">
                <Link
                  to="/home"
                  className={`flex flex-row items-center w-full h-10 px-3 rounded-lg text-gray-300 ${
                    location.pathname === "/home"
                      ? "text-gray-700  bg-slate-300"
                      : ""
                  } `}
                >
                  <span className="flex items-center justify-center text-lg text-gray-400">
                    <svg
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </span>
                  <span className="ml-3">Home</span>
                </Link>
              </li>
              <li className="my-px">
                <span className="flex font-medium text-sm text-gray-300 px-4 my-4 uppercase">
                  Projects
                </span>
              </li>

              <li className="my-px">
                <Link
                  to="/Mycart"
                  className={`flex flex-row items-center w-full h-10 px-3 rounded-lg text-gray-300 ${
                    location.pathname === "/Mycart"
                      ? "text-gray-700  bg-slate-300"
                      : ""
                  } `}
                >
                  <span className="flex items-center justify-center text-lg text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-cart-check h-6 w-6"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
                      <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg>
                  </span>
                  <span className="ml-3">My Cart</span>
                </Link>
              </li>
              <li className="my-px">
                <Link
                  to="/add"
                  className={`flex flex-row items-center w-full h-10 px-3 rounded-lg text-gray-300 ${
                    location.pathname === "/add"
                      ? "text-gray-700  bg-slate-300"
                      : ""
                  } `}
                >
                  <span className="flex items-center justify-center text-lg text-green-400">
                    <svg
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <span className="ml-3">Add new listing</span>
                </Link>
              </li>
              <li className="my-px">
                <Link
                  to="/myListings"
                  className={`flex flex-row items-center w-full h-10 px-3 rounded-lg text-gray-300 ${
                    location.pathname === "/myListings" 
                      ? "text-gray-700  bg-slate-300"
                      : ""
                  } `}
                >
                  <span className="flex items-center justify-center text-lg text-gray-400">
                    <svg
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </span>
                  <span className="ml-3">My listings</span>
                </Link>
              </li>
              <li className="my-px">
                <span className="flex font-medium text-sm text-gray-300 px-4 my-4 uppercase">
                  Account
                </span>
              </li>
              <li className="my-px">
                <Link
                  to="/profile"
                  className={`flex flex-row items-center w-full h-10 px-3 rounded-lg text-gray-300 ${
                    location.pathname === "/profile"
                      ? "text-gray-700  bg-slate-300"
                      : ""
                  } `}
                >
                  <span className="flex items-center justify-center text-lg text-gray-400">
                    <svg
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <span className="ml-3">Profile</span>
                </Link>
              </li>
              <li className="my-px">
                <Link
                  to="/settings"
                  className={`flex flex-row items-center w-full h-10 px-3 rounded-lg text-gray-300 ${
                    location.pathname === "/settings" 
                      ? "text-gray-700  bg-slate-300"
                      : ""
                  } `}
                >
                  <span className="flex items-center justify-center text-lg text-gray-400">
                    <svg
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  <span className="ml-3">Settings</span>
                </Link>
              </li>
              <li className="my-px">
                <button
                  onClick={handleLogout}
                  className="flex w-full flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >
                  <span className="flex items-center justify-center text-lg text-red-400">
                    <svg
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <span className="ml-3">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
