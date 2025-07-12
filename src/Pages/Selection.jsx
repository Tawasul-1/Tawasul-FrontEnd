import React, { useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
// import "../Style-pages/selection.css";

const Selection = () => {
  return (
    <div className="bg-light min-vh-100">
      {/* Navbar */}
      <Header />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Selection;
