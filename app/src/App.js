import * as React from "react";

import { Routes, Route, Link } from "react-router-dom";

import Footer from "./Footer";
import Sightings from "./Sightings";

import "./App.css";

const App = () => (
  <main>
    <div className="hero-image">
      <div className="hero-text">
        <h1 className="hero-header">We Care</h1>
        <p>An app that helps scientists and endangered species.</p>
        <button className="hero">
          <a href="#endangeredAnimals">View App</a>
        </button>
      </div>
    </div>
    <nav>
      {/* <Link to="/">Home</Link> */}
      {/* <Link to="dashboard">Dashboard</Link> */}
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </main>
);

const Home = () => (
  <>
    <h1>{process.env.REACT_APP_TITLE}</h1>
    <h2>{process.env.REACT_APP_SUBTITLE}</h2>
    {/* <Tasks /> */}

    <Sightings />
    <Footer />
  </>
);

const Dashboard = () => (
  <>
    <h1>Dashboard</h1>
  </>
);

export default App;
