import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import LimBooks from "../components/LimBooks";
import ScrollToTop from "../components/ScrollToTop";

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <LimBooks />
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Home;
