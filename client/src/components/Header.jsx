import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/forest.png";
import { AiOutlineMoon, AiOutlineSearch, AiOutlineSun } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";

const Header = () => {
  const { theme } = useSelector((state) => state.theme);

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  

  const path = useLocation().pathname;
  return (
    <Navbar className="shadow border-b">
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
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? (
            <AiOutlineMoon className="text-lg" />
          ) : (
            <AiOutlineSun className="text-lg" />
          )}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar img={currentUser.profilePicture} alt="user" rounded />
            }
          >
            <Dropdown.Header className="flex flex-col gap-3">
              <span className="block text-sm">{currentUser.username}</span>
              <span className="block text-sm font-semibold truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Button gradientDuoTone={"cyanToBlue"} outline>
            <Link to={"sign-in"}>Sign in</Link>
          </Button>
        )}
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
