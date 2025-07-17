import React from "react";
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section text-center">
      <div className="container heromain">
        <h2 className="title">Nova Innovative Compskey</h2>
        <p className="subtitle">
          Fostering a vibrant community of tech enthusiasts at MVJ College of Engineering.
        </p>

        <div className="row justify-content-center mt-5 gx-4 gy-4">
          <div className="col-md-3 col-sm-10 cardbox p-4 mx-2">
            <span className="material-symbols-outlined icon">rocket_launch</span>
            <h5>Innovation</h5>
            <p>Exploring cutting-edge technologies and pushing boundaries of what's possible.</p>
          </div>

          <div className="col-md-3 col-sm-10 cardbox p-4 mx-2">
            <span className="material-symbols-outlined icon">groups</span>
            <h5>Collaboration</h5>
            <p>Work with like-minded individuals to create impactful solutions.</p>
          </div>

          <div className="col-md-3 col-sm-10 cardbox p-4 mx-2">
            <span className="material-symbols-outlined icon">lightbulb</span>
            <h5>Learning</h5>
            <p>Continuous growth through workshops, hackathons, and mentorship.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

