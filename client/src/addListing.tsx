import { useRef, useState, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
// import { useNotification } from './useNotification';

const AddListing = () => {
  const [product_Name, setProduct_N] = useState("");
  const [product_Description, setProduct_D] = useState("");
  const [product_Category, setproduct_C] = useState("");
  const [product_Price, setproduct_P] = useState("");
  const [product_City, setproduct_Ci] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  //   const { setNotification } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("product_Name", product_Name);
    formData.append("product_Description", product_Description);
    formData.append("product_Category", product_Category);
    formData.append("product_Price", product_Price);
    formData.append("product_City", product_City);

    if (fileInputRef.current?.files) {
      for (let i = 0; i < fileInputRef.current.files.length; i++) {
        formData.append("product_Images", fileInputRef.current.files[i]);
      }
    }

    try {
      const res = await axios.post("https://shopez-q69l.onrender.com/api/List", formData, {
        withCredentials: true,
        // headers: {
        //   "Content-Type": "multipart/form-data ",

        // },
      });

      if (res.status === 200) {
        setProduct_N("");
        setProduct_D("");

        navigate("/home");
        // setNotification("Post added successfully");
      } else {
        console.log(res);
      }
    } catch (error) {
      console.error("Error during adding post :", error);
    }
  };

  const cities = [
    "Agadir",
    "Al Hoceïma",
    "Azrou",
    "Beni Mellal",
    "Casablanca",
    "Chefchaouen",
    "El Jadida",
    "Errachidia",
    "Essaouira",
    "Fes",
    "Figuig",
    "Guelmim",
    "Ifrane",
    "Kenitra",
    "Khenifra",
    "Khouribga",
    "Laayoune",
    "Larache",
    "Marrakech",
    "Meknes",
    "Mohammedia",
    "Nador",
    "Ouarzazate",
    "Oujda",
    "Rabat",
    "Safi",
    "Sale",
    "Settat",
    "Sidi Ifni",
    "Skhirate",
    "Tangier",
    "Tan-Tan",
    "Tetouan",
    "Tiznit",
    "Zagora",
    // Add or remove cities as needed
  ];

  return (
    <div className="flex justify-start">
      <Sidebar />
      <div className="m-auto w-full">
        <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
          List Your Product Here
        </div>
        <form onSubmit={handleSubmit}>
          <div className="editor rounded mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl mb-10">
            <input
              className="title rounded bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
              placeholder="Product name"
              type="text"
              onChange={(e) => setProduct_N(e.target.value)}
            />
            <select
              className="title rounded bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
              value={product_Category}
              onChange={(e) => setproduct_C(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="Veichule">Veichule</option>
              <option value="clothing">Clothing</option>
              <option value="Apparel">Apparel</option>
              <option value="Electronics">Electronics</option>
              <option value="Pet Supplies">Pet Supplies</option>
              <option value="Home Sales">Home Sales</option>
              <option value="Musical instruments">Musical instruments</option>
              <option value="Digital">Digital</option>
            </select>
            <select
              className="title rounded bg-gray-100 border  border-gray-300 p-2 mb-4 outline-none"
              id="city-select"
              value={product_City}
              onChange={(e) => setproduct_Ci(e.target.value)}
              required
            >
              <option value="">City</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <textarea
              className="description rounded bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
              placeholder="Describe everything about your product here"
              onChange={(e) => setProduct_D(e.target.value)}
              required
            ></textarea>

            

            <input
              className="title rounded bg-gray-100 border border-gray-300 p-2  mt-4   mb-4 outline-none"
              placeholder="Mad"
              type="text"
              onChange={(e) => setproduct_P(e.target.value)}
            />
            <div className="icons flex text-gray-700 text-md font-semibold  ">
              <span className=" mt-2 mb-1">Upload  Product images</span>
            </div>
            <div className="mb-4 mt-2 icons flex">
              <input type="file" accept="image/*" ref={fileInputRef} multiple />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                List
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListing;
