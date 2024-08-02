import { Button, Navbar, TextInput } from "flowbite-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/forest.png";
import { AiOutlineMoon, AiOutlineSearch } from "react-icons/ai";

const Header = () => {
  const path = useLocation().pathname;
  return (
    <Navbar className="shadow">
      <Link to={"/"}>
        <img src={Logo} className="flex-none w-10" />
      </Link>

      <form>
        <TextInput
          placeholder="Search..."
          type="text"
          className="hidden lg:inline"
        />
      </form>
      <Button
        className="h-10 w-12 flex justify-center items-center lg:hidden"
        pill
        color={"gray"}
      >
        <AiOutlineSearch className="text-lg" />
      </Button>

      <div className="flex justify-center items-center gap-2 md:order-2">
        <Button
          className="h-10 w-12 flex justify-center items-center"
          pill
          color={"gray"}
        >
          <AiOutlineMoon className="text-lg" />
        </Button>
        <Button gradientDuoTone={"cyanToBlue"} outline>
          <Link to={"sign-in"}>Sign in</Link>
        </Button>
        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link as={"div"} active={path === "/"}>
          <Link to={"/"}>Home</Link>
        </Navbar.Link>
        <Navbar.Link as={"div"} active={path === "/projects"}>
          <Link to={"/projects"}>Projects</Link>
        </Navbar.Link>
        <Navbar.Link as={"div"} active={path === "/about"}>
          <Link to={"/about"}>About</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
