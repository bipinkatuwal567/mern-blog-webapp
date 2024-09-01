import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiArrowSmRight,
  HiUser,
} from "react-icons/hi";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { signOutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { IoDocumentText } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";

export function DashSidebar() {
  const { currentUser } = useSelector(state => state.user)
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
        <Sidebar.ItemGroup className="flex flex-col gap-1">

          {currentUser.isAdmin && (
            <Link to={"/dashboard?tab=dash"}>
              <Sidebar.Item
                href="#"
                icon={TbLayoutDashboardFilled}
                active={tab === "dash"}
                as={"div"}
              >
                Dashboard
              </Sidebar.Item>
            </Link>

          )}

          <Link to={"/dashboard?tab=profile"}>
            <Sidebar.Item
              href="#"
              icon={HiUser}
              label={currentUser.isAdmin ? "Admin" : "User"}
              labelColor="dark"
              active={tab === "profile"}
              as={"div"}
            >
              Profile
            </Sidebar.Item>
          </Link>

          {currentUser.isAdmin && (
            <>
              <Link to={"/dashboard?tab=post"}>
                <Sidebar.Item
                  href="#"
                  icon={IoDocumentText}
                  labelColor="dark"
                  active={tab === "post"}
                  as={"div"}
                >
                  Post
                </Sidebar.Item>
              </Link>
              <Link to={"/dashboard?tab=users"}>
                <Sidebar.Item
                  href="#"
                  icon={FaUsers}
                  labelColor="dark"
                  active={tab === "users"}
                  as={"div"}
                >
                  Users
                </Sidebar.Item>
              </Link>
            </>
          )}

          <Sidebar.Item onClick={handleSignout} href="#" icon={HiArrowSmRight}>
            Sign out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashSidebar;
