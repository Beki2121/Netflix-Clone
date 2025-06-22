import "./Header.css";
import netflixlogo from "../../assets/netflix-logo.png";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useEffect } from "react";

function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setShowMobileMenu(false);
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    if (isMobile) {
      setShowMobileMenu(!showMobileMenu);
    }
  };

  return (
    <div className={`header-outer-container ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        <div className="header-left">
          <img
            src={netflixlogo}
            alt="netflix-logo"
            width="100px"
            className="netflix-logo"
          />

          <ul
            className={`header-left-list ${
              showMobileMenu && isMobile ? "mobile-menu-open" : ""
            }`}
          >
            <li>Home</li>
            <li>TV Shows</li>
            <li>Movies</li>
            <li>Latest</li>
            <li>My List</li>
            <li className="browse-language">Browse by language</li>
          </ul>
        </div>

        <div className="header-right">
          <ul>
            <li>
              <SearchIcon />
            </li>
            <li>
              <NotificationsNoneIcon />
            </li>
            <li>
              <AccountBoxIcon />
            </li>
            <li className="dropdown-arrow">
              <ArrowDropDownIcon />
            </li>
            {isMobile && (
              <li className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                <MenuIcon />
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
