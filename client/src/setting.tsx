import axios from "axios";
import Sidebar from "./sidebar";
import { useNavigate } from "react-router-dom";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "./userContext";

const Setting = () => {
  const { fetchTokenInfo, TokenInfo, currentUserInfo, fetchCurrentUser } =
    useContext(UserContext);
  const [username, setUsername] = useState(currentUserInfo.username || "");
  const [email, setEmail] = useState(currentUserInfo.email || "");
  const [phone, setPhone] = useState(currentUserInfo.phone || "+212");
  const [adresse, setAdresse] = useState(
    currentUserInfo.adresse || "Your adresse"
  );
  const [password, setPassword] = useState("");
  const [Message, setMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const Navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("adresse", adresse);
    if (fileInputRef.current?.files) {
      formData.append("avatar", fileInputRef.current.files[0]);
    }

    try {
      const res = await axios.put(
        `https://shopez-q69l.onrender.com/api/user/update/${TokenInfo.userId}`,
        formData,
        { withCredentials: true }
      );

      if (res.status === 200) {
        setMessage("User updated successfully");

        Navigate("/home");
      } else {
        setMessage("Error updating user");
      }
    } catch (error) {
      console.error("Error during user update:", error);
      setMessage("Error during user update");
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchTokenInfo();
  }, [fetchCurrentUser, fetchTokenInfo]);

  return (
    <div className="flex justify-between">
      <div className=" md:block lg:block">
        <Sidebar />
      </div>

      <div className="bg-white mt-6 m-auto w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
        <main className="w-full m-auto min-h-screen py-1 md:w-2/3 lg:w-3/4">
          <div className="p-2 md:p-4">
            <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
              <h2 className="pl-6 text-2xl font-bold sm:text-xl">
                User Settings
              </h2>
              {Message && <p>{Message}</p>}
              <form onSubmit={handleSubmit}>
                <div className="grid max-w-2xl mx-auto mt-1">
                  <div className="items-center mt-6 sm:mt-14 text-[#202142]">
                    <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-2">
                      <div className="w-full">
                        <label className=" mb-4 text-sm font-medium text-indigo-900 ">
                          Username :
                        </label>
                        <input
                          type="text"
                          id="username"
                          className="bg-indigo-50 border border-indigo-300 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          
                        />
                      </div>
                    </div>

                    <div className="mb-2 sm:mb-2">
                      <label className="block mb-2 text-sm font-medium text-indigo-900 ">
                        Email :
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="bg-indigo-50 border border-indigo-300  text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        
                      />
                    </div>
                    <div className="mb-2 sm:mb-2">
                      <label className="block mb-2 text-sm font-medium text-indigo-900 ">
                        Phone :
                      </label>
                      <input
                        type="tel"
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                      />
                    </div>
                    <div className="mb-2 sm:mb-2">
                      <label className="block mb-2 text-sm font-medium text-indigo-900 ">
                        Adresse :
                      </label>
                      <input
                        type="adresse"
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                        onChange={(e) => setAdresse(e.target.value)}
                        value={adresse}
                      />
                    </div>

                    <div className="mb-2 sm:mb-">
                      <label className="block mb-2 text-sm font-medium text-indigo-900 ">
                        Password :
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="bg-indigo-50 border border-indigo-300  text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                        placeholder="New password"
                        onChange={(e) => setPassword(e.target.value)}
                        
                      />
                    </div>
                    <label className="flex items-center mb-6 cursor-pointer text-blue-600 hover:text-blue-800">
                      <span className="mr-2 ml-2 mt-2 text-indigo-900 font-semibold ">
                        Avatar
                      </span>
                      <img src="images.png" alt="image" className="w-8 h-8" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/jpeg, image/png, image/gif"
                        id="image"
                        name="imageUrl"
                        ref={fileInputRef}
                      />
                    </label>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Setting;
