import React from "react";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";

const Navbar: React.FC = () => {
  return (
    <>
      <NavbarDesktop />
      <NavbarMobile />
      <div className="h-20" /> {/* Spacer so content doesn't hide under fixed navbar */}
    </>
  );
};

export default Navbar;
