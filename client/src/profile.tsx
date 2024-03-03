import { useContext, useEffect } from "react";
import Sidebar from "./sidebar";
import { UserContext } from "./userContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { currentUserInfo, fetchTokenInfo, fetchCurrentUser } =
    useContext(UserContext);

  useEffect(() => {
    fetchCurrentUser();
    fetchTokenInfo();
  }, [fetchCurrentUser]);

  return (
    <div className="flex justify-between">
      <div className="  md:block lg:block">
        <Sidebar />
      </div>
      <div className="bg-white m-auto w-full  flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
        <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
          <div className="p-2 md:p-4">
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
              <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                <div className="grid max-w-2xl mx-auto mt-8">
                  <div className="flex-row  items-center  sm:flex-row ">
                    <div className="mb-16">
                      <img
                        className="object-cover m-auto w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                        src={`http://localhost:3000/public/${currentUserInfo.avatar}`}
                        alt="Bordered avatar"
                      />
                      <h2 className="pl-6 text-3xl text-center capitalize mt-4  font-bold sm:text-2xl">
                        {currentUserInfo.username}
                      </h2>
                    </div>

                    {/* <div className="flex mt-16 flex-col space-y-5 sm:ml-8">
                      <button
                        type="button"
                        className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 "
                      >
                        Change picture
                      </button>
                      <button
                        type="button"
                        className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 "
                      >
                        Delete picture
                      </button>
                    </div> */}

                    {/* <h2 className="mb-2 text-md text-xl capitalize font-bold text-gray-700">
                      Username :
                    </h2>
                    <div className="bg-indigo-50 border mt-2  border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 ">
                      <p className="capitalize">{currentUserInfo.username}</p>
                    </div> */}

                    <h2 className="mb-2 mt-4 text-md text-xl capitalize font-bold text-gray-700">
                      Email :
                    </h2>
                    <div className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 ">
                      <p>{currentUserInfo.email}</p>
                    </div>
                  </div>
                  <h2 className="mb-2  mt-4 text-md text-xl capitalize font-bold text-gray-700">
                    Adresse :
                  </h2>
                  <div className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 ">
                    <p>{currentUserInfo.adresse}</p>
                  </div>
                  <h2 className="mb-2 mt-4 text-md text-xl capitalize font-bold text-gray-700">
                    Phone :
                  </h2>
                  <div className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 ">
                    <p>{currentUserInfo.phone}</p>
                  </div>

                  <Link to='/settings' className="flex justify-end">
                    <button
                      type="button"
                      className="py-2 mt-6 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 "
                    >
                      Edit
                    </button>
                    
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
