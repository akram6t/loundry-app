import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ProgressBar from "../../components/Other/ProgressBar";
import { toast } from "react-toastify";
import { Collections, HEADER_API, URL_ADMIN_LOGIN, URL_FORGOT_PASSWORD, URL_GET_LIST, URL_RESET_PASSWORD, routes } from "../../utils/Constant";
import AppIndicator from "../../components/Other/AppIndicator";
import axios from "axios";
import { SetTitle } from '../../utils/SetTitle';
import GetRandomToken from "../../utils/GetRandomToken";
import GetIp from "../../utils/GetIp";
import { useLocation } from "react-router-dom";



function ResetPasswordPage() {
     const navigate = useNavigate();
     const location = useLocation();

     const token = new URLSearchParams(location.search).get('token');
     
     useEffect(() => {
          if(!token){
               navigate(routes.LOGIN);
            }
     }, [token]);

  const [passwords, setPasswords] = useState({
     password: '',
     confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  SetTitle('Reset Password');


  const resetPassword = async () => {
     setError(null);
     setLoading(true);
      try {
        const response = await axios.post(URL_RESET_PASSWORD, {
          newPassword: passwords.password,
          token: token
        }, HEADER_API);

        if (response.status === 200) {
          // console.log(response.data);
          setLoading(false);
          const { status, message } = response.data;
          if (status) {
            toast.success(`password created successfully.`);

            setTimeout(() => {navigate(routes.LOGIN)}, 2000);
          //   setToken(true);
          //   localStorage.setItem('authToken', genrateToken);
            
          //   localStorage.setItem('authToken', genrateToken);
          }else{
            toast.error('something went wrong');
          }
        } else {
          console.error(`Error reset password`, response.statusText);
        }
      } catch (error) {
        setLoading(false);
        toast.error('Token expired please genrate a new Token', error);
        navigate(routes.LOGIN);
        console.error(`Error crud: reset password`, error);
      }

  }


  const handleSubmit = (event) => {
    event.preventDefault();
    
    if(passwords.password.length < 6 || passwords.confirmPassword < 6){
      setError('password must be at least 6 characters');
      return;
    }

    if(passwords.password !== passwords.confirmPassword){
     setError('password and confirm password not matching!');
     return;
    }

    resetPassword();

  };

  const handleChangeValue = (name, value) => {
    setError(null);

    setPasswords({
     ...passwords,
     [name]: value
    });

  }


  const LoginImage = "https://edp.raincode.my.id/static/media/login.cc0578413db10119a7ff.png";
  return (
    <>
      <div className="flex min-h-screen">
        <div className="flex w-full flex-col md:flex-row">
          {/* Image */}
          <div className="md:bg-emerald-500 md:min-h-screen flex flex-wrap md:w-1/2">
            <div className="items-center text-center flex flex-col relative justify-center mx-auto">
              <img
                src={LoginImage}
                alt="Logo Login"
                className="md:w-72 w-48 mx-auto"
              />
              <div className="md:block hidden text-slate-100">
                <h1 className="font-semibold text-2xl pb-2">
                  Reset password
                </h1>
                <span className="text-sm">

                </span>
              </div>
            </div>
          </div>
          {/* Login Section */}
          <div className="flex flex-col md:flex-1 items-center justify-center">
            <div className="loginWrapper flex flex-col w-full lg:px-36 md:px-8 px-8 md:py-8">
              {/* Login Header Text */}
              <div className="hidden md:block font-medium self-center text-xl sm:text-3xl text-gray-800">
                Reset Your Password
              </div>

              {/* Sparator */}
              <div className="hidden md:block relative mt-10 h-px bg-gray-300">
                <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
                  <span className="bg-white px-4 text-xs text-gray-500 uppercase">
                    Enter new password to Reset Your Password.
                  </span>
                </div>
              </div>

              <div className="md:hidden block my-4">
                <h1 className="text-2xl font-semibold">Reset</h1>
              </div>

              {/* Login Form */}
              <div className="md:mt-10 mt-4">
                <form onSubmit={handleSubmit}>
                  {/* Password */}
                  <div className="flex flex-col mb-6">
                    <div className="relative">
                      <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                        <FontAwesomeIcon icon={faLock} />
                      </div>

                      <input
                        id="password"
                        type="password"
                        name="password"
                        value={passwords.password}
                        onChange={(e) => handleChangeValue('password', e.target.value)}
                        className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400"
                        placeholder="Enter new password"
                      />
                    </div>
                  </div>

                   {/* confirm Password */}
                   <div className="flex flex-col mb-6">
                    <div className="relative">
                      <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                        <FontAwesomeIcon icon={faLock} />
                      </div>

                      <input
                        id="confirmPassword"
                        type="password"
                        value={passwords.confirmPassword}
                        name="confirmPassword"
                        onChange={(e) => handleChangeValue('confirmPassword', e.target.value)}
                        className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400"
                        placeholder="Confirm new password"
                      />
                    </div>
                    {error && (
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {error}
                      </span>
                    )}
                  </div>

                  {/* Button Login */}
                  <div className="flex w-full">
                    <button
                      disabled={loading}
                      type="submit"
                      className="flex items-center justify-center focus:outline-none text-white text-sm bg-emerald-500 hover:bg-emerald-700 rounded-lg md:rounded md:py-2 py-3 w-full transition duration-150 ease-in"
                    >
                      <span className="mr-2 md:uppercase">
                        {loading ? <ProgressBar /> : "Reset Password"}
                      </span>
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPasswordPage;
