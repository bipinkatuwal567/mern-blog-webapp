import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import Logo from "../assets/forest.png";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

const FooterComponents = () => {
  return (
    <Footer container className="border border-t-2 relative bottom-0">
      <div className="w-full max-w-7xl mx-auto">
        <div className="">
          <div className="flex justify-center items-center">
            <Link to={"/"} className="flex gap-2 items-center">
              <img src={Logo} className="flex-none w-10" />
              <h2 className="text-xl font-semibold uppercase">Forest's Blog</h2>
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link>100 JS Project</Footer.Link>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  About
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link>Github</Footer.Link>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discord
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link>Privacy Policy</Footer.Link>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>

        <Footer.Divider />
        <div>
          <div>
            <Footer.Copyright
              href="#"
              by="Forest's Blog"
              year={new Date().getFullYear()}
            />
          </div>

          <div className="flex gap-6 justify-center mt-5">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponents;
