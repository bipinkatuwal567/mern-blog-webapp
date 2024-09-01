import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/forest.png";
import { AiOutlineMoon, AiOutlineSearch, AiOutlineSun } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signOutSuccess } from "../redux/user/userSlice";

const Header = () => {

  const dispatch = useDispatch();
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");


  const handleSignout = async () => {
    try {
      const res = await fetch("/api/auth/signout", { method: "POST" })
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess())
      }
    } catch (error) {
      console.log(error.message);

    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(location.search)
    urlParams.set("searchTerm", searchTerm)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromURL = urlParams.get("searchTerm")
    if (searchTermFromURL) {
      setSearchTerm(searchTermFromURL)
    }
  }, [location.search])

  return (
    <Navbar className="shadow border-b-2">
      <Link to={"/"}>
        <img src={Logo} className="flex-none w-10" />
      </Link>

      <form onSubmit={handleSubmit}>
        <TextInput
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          type="text"
          className="hidden lg:inline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
            <Dropdown.Item className="relative p-0">
              <span className=" w-full py-2 px-4 text-left" onClick={handleSignout}>Sign Out</span>
            </Dropdown.Item>
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
