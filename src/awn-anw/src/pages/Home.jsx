import React, { useState, useEffect, useMemo } from 'react';
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import Container from '../components/Container';
import Modal from '../components/Modal';


const Home = () => {
  return (
    <div>
        <Header />
        <Container />
        <Footer />
    </div>
  )
}

export default Home;