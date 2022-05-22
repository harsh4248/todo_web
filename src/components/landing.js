import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Landing = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(() => {
    if (auth.currentUser === null) {
      navigate("/");
    }
  });

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        //signout successfull
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
        //signout not successfull
      });
  };
  return (
    <div>
        {auth.currentUser !== null ?<div>{auth.currentUser.email}</div>:<div></div>}
      
      <button
        className="uppercase m-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleSignOut}
      >
        Sign out
      </button>
    </div>
  );
};

export default Landing;
