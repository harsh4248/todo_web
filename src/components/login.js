import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link,useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const auth = getAuth();
  const handsignIn = (e) => {
      e.preventDefault();
    signInWithEmailAndPassword(auth,email,password).then((userCredential) => {
        console.log('here');
        const user = userCredential.user;
        navigate('/landing');
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    });
  };

  return (
    <section className="h-screen w-screen flex">
      <div className="w-full max-w-xs m-auto">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handsignIn}>
          <div className="m-2">
            <h1 className="sm:text-base text-sm md:text-lg lg:text-xl font-bold text-center">LOGIN</h1>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Email id
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="email"
              placeholder="Username"
              required
              value={email}
              onChange={(val) => {setemail(val.target.value)}}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              required
              value={password}
              onChange={(val) => {setpassword(val.target.value)}}
            />
            {/* <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p> */}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
          <div className='mt-4'>
              <p className="text-gray-500">Want to register? <Link className="text-blue-500 hover:text-blue-800" to='/signup'>click here</Link></p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
