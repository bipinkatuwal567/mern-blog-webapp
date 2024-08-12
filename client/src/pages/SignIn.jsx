import React, { useState } from "react";
import Logo from "../assets/forest.png";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import GoogleOAuth from "../components/GoogleOAuth";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading: isLoading, error: errorMessage } = useSelector(
    (state) => state.user
  );
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill up all the fields"));
    }

    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(
          signInFailure(
            data.code === 11000 ? "User already exist!" : data.message
          )
        );
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to={"/"} className="flex gap-2 items-center">
            <img src={Logo} className="flex-none w-14" />
            <h2 className="text-4xl font-semibold uppercase">Forest's Blog</h2>
          </Link>
          <p className="mt-5 text-sm">
            This is a blog website. You can sign in with your email and password
            or with Google.
          </p>
        </div>

        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Email"></Label>
              <TextInput
                type="email"
                placeholder="Example@example.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Password"></Label>
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              type="submit"
              gradientDuoTone={"cyanToBlue"}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner size={"sm"} />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <GoogleOAuth />
          </form>

          <div className="mt-5 flex gap-1 text-sm">
            <span>Don't have an account?</span>
            <Link to={"/sign-up"} className=" text-cyan-500">
              Sign Up
            </Link>
          </div>

          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
