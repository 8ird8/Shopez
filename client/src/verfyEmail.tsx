import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const VerfyEmail = () => {
  const { userId, token } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.get(
          `https://shopez-q69l.onrender.com/api/users/${userId}/verify/${token}`,
          {
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          navigate("/login");
        } else {
          console.error(
            "An error occurred while verifiying your email address"
          );
        }
      } catch (error) {
        console.error("Error verifiying your email address:", error);
      }
    };
    verifyEmail();
  }, [userId, token]);
  return (
    <div className="flex justify-center items-center h-screen">
      {" "}
      verifiying in procces...
    </div>
  );
};

export default VerfyEmail;
