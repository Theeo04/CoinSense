import React, { useEffect, useState } from "react";
import { GoHome } from "react-icons/go";
import {
  MdAttachMoney,
  MdCurrencyExchange,
  MdOutlineForum,
  MdOutlineContactSupport,
  MdOutlineMenu,
} from "react-icons/md";
import { BsGraphUpArrow, BsNewspaper } from "react-icons/bs";
import Home from "./Home";
import BestAssets from "./BestAssets";

function Menu() {
  const [activeComponent, setActiveComponent] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const checkScreenWidth = () => {
    setIsMobile(window.innerWidth < 1000); // Adjust the breakpoint as needed
  };

  useEffect(() => {
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  const handleMenuItemClick = (menuItem) => {
    setActiveComponent(menuItem);
    setIsMenuOpen(false); // Close the menu after clicking a menu item
  };

  return (
    <div className="user_actions">
      {isMobile ? (
        <div
          className={`w-full bg-white text-white flex justify-between items-center p-2`}
        >
          <div className="flex__menubar">
            <div
              className="text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <MdOutlineMenu className="menu_btn" />
            </div>
            <img src="logo.jpg" alt="logo" className="logo__menu" />
          </div>

          {isMenuOpen && (
            <div className="mobile-menu">
              {/* Mobile menu content */}
              <ul className="menu-list">
                <li
                  className="menu-list__item"
                  onClick={() => {
                    setActiveComponent("Home");
                    setIsMenuOpen(false);
                  }}
                >
                  <GoHome className="menu-icon" />
                  <p>Home</p>
                </li>
                <li
                  className="menu-list__item"
                  onClick={() => {
                    setActiveComponent("BestAssets");
                    setIsMenuOpen(false);
                  }}
                >
                  <MdAttachMoney className="menu-icon" />
                  <p>Best Assets</p>
                </li>
                <li
                  className="menu-list__item "
                  onClick={() => {
                    setActiveComponent("LiveTrade");
                    setIsMenuOpen(false);
                  }}
                >
                  <MdCurrencyExchange className="menu-icon" />
                  <p>Live Trade</p>
                </li>
                <li
                  className="menu-list__item"
                  onClick={() => {
                    setActiveComponent("FutureInvestor");
                    setIsMenuOpen(false);
                  }}
                >
                  <BsGraphUpArrow className="menu-icon" />
                  <p>Future Investor</p>
                </li>
                <li
                  className="menu-list__item"
                  onClick={() => {
                    setActiveComponent("News");
                    setIsMenuOpen(false);
                  }}
                >
                  <BsNewspaper className="menu-icon" />
                  <p>News</p>
                </li>
                <li
                  className="menu-list__item"
                  onClick={() => {
                    setActiveComponent("Forum");
                    setIsMenuOpen(false);
                  }}
                >
                  <MdOutlineForum className="menu-icon" />
                  <p>Forum</p>
                </li>
                <li
                  className="menu-list__item"
                  onClick={() => {
                    setActiveComponent("ContactUs");
                    setIsMenuOpen(false);
                  }}
                >
                  <MdOutlineContactSupport className="menu-icon" />
                  <p>Contact Us</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="menu">
          <img className="logo" src="logo.jpg" alt="logo" />
          <ul className="menu-list">
            <li
              className="menu-list__item"
              onClick={() => {
                setActiveComponent("Home");
                setIsMenuOpen(false);
              }}
            >
              <GoHome className="menu-icon" />
              <p>Home</p>
            </li>
            <li
              className="menu-list__item"
              onClick={() => {
                setActiveComponent("BestAssets");
                setIsMenuOpen(false);
              }}
            >
              <MdAttachMoney className="menu-icon" />
              <p>Best Assets</p>
            </li>
            <li
              className="menu-list__item "
              onClick={() => {
                setActiveComponent("LiveTrade");
                setIsMenuOpen(false);
              }}
            >
              <MdCurrencyExchange className="menu-icon" />
              <p>Live Trade</p>
            </li>
            <li
              className="menu-list__item"
              onClick={() => {
                setActiveComponent("FutureInvestor");
                setIsMenuOpen(false);
              }}
            >
              <BsGraphUpArrow className="menu-icon" />
              <p>Future Investor</p>
            </li>
            <li
              className="menu-list__item"
              onClick={() => {
                setActiveComponent("News");
                setIsMenuOpen(false);
              }}
            >
              <BsNewspaper className="menu-icon" />
              <p>News</p>
            </li>
            <li
              className="menu-list__item"
              onClick={() => {
                setActiveComponent("Forum");
                setIsMenuOpen(false);
              }}
            >
              <MdOutlineForum className="menu-icon" />
              <p>Forum</p>
            </li>
            <li
              className="menu-list__item"
              onClick={() => {
                setActiveComponent("ContactUs");
                setIsMenuOpen(false);
              }}
            >
              <MdOutlineContactSupport className="menu-icon" />
              <p>Contact Us</p>
            </li>
          </ul>
        </div>
      )}

      {/* Render component based on activeComponent */}
      <div>
        {activeComponent === "Home" && !isMenuOpen && <Home />}
        {activeComponent === "BestAssets" && !isMenuOpen && <BestAssets />}
        {/* {activeComponent === "LiveTrade" && !isMenuOpen && <LiveTrade />}
        {activeComponent === "FutureInvestor" && !isMenuOpen && (
          <FutureInvestor />
        )}
        {activeComponent === "News" && !isMenuOpen && <News />}
        {activeComponent === "Forum" && !isMenuOpen && <Forum />}
        {activeComponent === "ContactUs" && !isMenuOpen && <ContactUs />} */}
      </div>
    </div>
  );
}

export default Menu;