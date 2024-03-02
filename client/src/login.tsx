import { Link, useNavigate } from "react-router-dom";
import "./assets/output.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./userContext";

const Login = () => {
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const {  fetchCurrentUser, fetchTokenInfo } = useContext(UserContext);
  const icon = visible ? (
    <VisibilityOffIcon fontSize="small" />
  ) : (
    <VisibilityIcon fontSize="small" />
  );

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://shopez-q69l.onrender.com/api/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      // Check the response status and handle accordingly
      if (res.status === 200) {
        console.log(res.data.token);
        localStorage.setItem("token", res.data.token || null);
        await fetchTokenInfo();
        await fetchCurrentUser();
       
        navigate("/home");
      } else {
        setErrorMessage(res.data.message || "An error occurred");
      }
    } catch (error: any) {
      console.error("Error during sign-up:", error);
      setErrorMessage(error.response?.data.message || "An error occurred");
    }
  };

  const togglePass = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div >
        <div className="py-4 m-auto h-screen">
          <div className="flex items-center justify-center   lg:w-1/3  bg-white rounded-xl shadow-lg overflow-hidden m-auto  ">
           
            <div className="w-full p-8 ">
              <h2 className="text-2xl font-semibold text-gray-700 text-center">
                Welcome back!
              </h2>
              <p className="text-xl text-gray-600 text-center">
                Login to your account here
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-1/5 lg:w-1/4"></span>
                <h2 className="text-xs text-center text-gray-500 uppercase">
                  login
                </h2>
                <span className="border-b w-1/5 lg:w-1/4"></span>
              </div>
              {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mt-4">
                  <strong>{errorMessage}</strong>
                </div>
              )}
              <form onSubmit={handleSumbit}>
                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email Address
                  </label>
                  <input
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mt-4">
                  <div className="flex justify-between">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Password
                    </label>
                    <a href="#" className="text-xs text-gray-500">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none pr-10"
                      type={visible ? "text" : "password"}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePass}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    >
                      {icon}
                    </button>
                  </div>
                </div>
                <div className="mt-8">
                  <button className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
                    Login
                  </button>
                </div>
              </form>
              <div className="mt-8 mb-8 flex items-center justify-between">
                <span className="border-b w-1/5 md:w-1/4"></span>
                <a
                  href="signup.html"
                  className="text-xs text-gray-500 uppercase"
                >
                  OR
                </a>

                <span className="border-b w-1/5 md:w-1/4"></span>
              </div>
              <a
                href="#"
                className="flex items-center border-b border-[#002D74] mb-2 justify-center mt- text-white rounded-lg shadow-md hover:bg-gray-100"
              >
                <div className="px-4 py-3">
                  <svg className="h-6 w-6" viewBox="0 0 40 40">
                    <path
                      d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                      fill="#FFC107"
                    />
                    <path
                      d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                      fill="#FF3D00"
                    />
                    <path
                      d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                      fill="#4CAF50"
                    />
                    <path
                      d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                      fill="#1976D2"
                    />
                  </svg>
                </div>
                <h1 className="px-4 py-3 w-5/6    text-center text-gray-600 font-bold">
                  Sign in with Google
                </h1>
              </a>
              <hr className="mt-12 mb-8 " />
              <div className="  text-xs flex justify-between items-center text-[#002D74]">
                <p>Don't have an account?</p>
                <Link
                  to="/register"
                  className="py-2 px-5 bg-white border border-gray-400 rounded-xl hover:scale-110 duration-300"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
