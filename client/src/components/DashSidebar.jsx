import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiArrowSmRight,
  HiUser,
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { signOutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export function DashSidebar() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [tab, setTab] = useState("");

  const handleSignout = async () => {
    try {
      const res = await fetch("api/auth/signout", { method: "POST" })
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

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <Sidebar aria-label="Default sidebar example" className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to={"/dashboard?tab=profile"}>
            <Sidebar.Item
              href="#"
              icon={HiUser}
              label="User"
              labelColor="dark"
              active={tab === "profile"}
              as={"div"}
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Sidebar.Item onClick={handleSignout} href="#" icon={HiArrowSmRight}>
            Sign out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashSidebar;
