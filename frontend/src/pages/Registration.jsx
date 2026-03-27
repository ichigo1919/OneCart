import React, { useState, useContext } from 'react'
import Logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'
import google from '../assets/google.png'
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { authDataContext } from '../context/AuthContext';
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { userDataContext } from '../context/UserContext';
import { toast } from 'react-toastify';
import Loading from '../component/Loading';

function Registration() {
  const [show, setShow] = useState(false)
  const { serverUrl } = useContext(authDataContext)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { getCurrentUser } = useContext(userDataContext)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  // 🔥 REGISTER
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        `${serverUrl}/api/auth/registration`,
        { name, email, password },
        { withCredentials: true }
      );

      await getCurrentUser();
      toast.success("User Registration Successful");
      navigate("/");

    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed";

      toast.error(msg);

    } finally {
      setLoading(false);
    }
  }

  // 🔥 GOOGLE SIGNUP
  const googleSignup = async () => {
    setLoading(true);

    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;

      await axios.post(
        `${serverUrl}/api/auth/googlelogin`,
        {
          name: user.displayName,
          email: user.email
        },
        { withCredentials: true }
      );

      await getCurrentUser();
      toast.success("User Registration Successful");
      navigate("/");

    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Google signup failed";

      toast.error(msg);

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center'>

      {/* HEADER */}
      <div className='w-full h-[80px] flex items-center px-[30px] gap-[10px] cursor-pointer'
        onClick={() => navigate("/")}>
        <img className='w-[40px]' src={Logo} alt="" />
        <h1 className='text-[22px] font-sans'>OneCart</h1>
      </div>

      {/* TITLE */}
      <div className='w-full h-[100px] flex flex-col items-center justify-center gap-[10px]'>
        <span className='text-[25px] font-semibold'>Registration Page</span>
        <span className='text-[16px]'>Welcome to OneCart, Place your order</span>
      </div>

      {/* FORM */}
      <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border border-[#96969635] rounded-lg shadow-lg flex items-center justify-center'>
        <form onSubmit={handleSignup} className='w-[90%] h-[90%] flex flex-col gap-[20px]'>

          {/* GOOGLE */}
          <div
            className='w-full h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] cursor-pointer'
            onClick={googleSignup}
          >
            <img src={google} alt="" className='w-[20px]' />
            Registration with Google
          </div>

          {/* DIVIDER */}
          <div className='flex items-center justify-center gap-[10px]'>
            <div className='w-[40%] h-[1px] bg-[#96969635]' />
            OR
            <div className='w-[40%] h-[1px] bg-[#96969635]' />
          </div>

          {/* INPUTS */}
          <div className='flex flex-col gap-[15px] relative'>
            <input
              type="text"
              placeholder='UserName'
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='input'
            />

            <input
              type="email"
              placeholder='Email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='input'
            />

            <input
              type={show ? "text" : "password"}
              placeholder='Password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='input'
            />

            {/* EYE ICON */}
            {!show && (
              <IoEyeOutline
                className='eye'
                onClick={() => setShow(true)}
              />
            )}
            {show && (
              <IoEye
                className='eye'
                onClick={() => setShow(false)}
              />
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className='w-full h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px]'
            >
              {loading ? <Loading /> : "Create Account"}
            </button>

            {/* LOGIN LINK */}
            <p className='flex gap-[10px] justify-center'>
              Already have an account?
              <span
                className='text-[#5555f6cf] cursor-pointer'
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Registration;