import React from "react";
import Logo from "../assets/forest.png";
import { Link } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";

const SignUp = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to={"/"} className="flex gap-2 items-center">
            <img src={Logo} className="flex-none w-14" />
            <h2 className="text-4xl font-semibold uppercase">Forest's Blog</h2>
          </Link>
          <p className="mt-5 text-sm">
            This is a blog website. You can sign up with your email and password
            or with Google.
          </p>
        </div>

        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Your Username"></Label>
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div>
              <Label value="Your Email"></Label>
              <TextInput
                type="text"
                placeholder="Example@example.com"
                id="email"
              />
            </div>
            <div>
              <Label value="Your Password"></Label>
              <TextInput type="text" placeholder="Password" id="password" />
            </div>
            <Button type="submit" gradientDuoTone={"cyanToBlue"}>
              Sign Up
            </Button>
          </form>

          <div className="mt-5 flex gap-1 text-sm">
            <span>Have and account?</span>
            <Link to={"/sign-in"} className=" text-cyan-500">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
