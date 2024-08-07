import React, { ReactNode } from "react";
import Navbar from "../Navbar/index";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
};

export default Layout;
