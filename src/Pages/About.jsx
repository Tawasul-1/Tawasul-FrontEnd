import React, { useState, useEffect } from "react";
import "../Style-pages/Contact.css";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Menu from "../Components/Menu";
import "bootstrap-icons/font/bootstrap-icons.css";

const About = () => {
  const testimonials = [
    {
      name: "Maha Ahmad",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      text: "TAWASUL gave my child a voice we thought we’d never hear. It’s more than an app — it’s a lifeline for communication.",
    },
    {
      name: "Omar Khaled",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "Thanks to TAWASUL, my son can finally express his needs and feelings. It’s made a world of difference for our family.",
    },
  ];

  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [animation, setAnimation] = useState("");

  const handlePrev = () => {
    setAnimation("slide-right");
    setTimeout(() => {
      setTestimonialIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
      setAnimation("");
    }, 350);
  };

  const handleNext = () => {
    setAnimation("slide-left");
    setTimeout(() => {
      setTestimonialIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
      setAnimation("");
    }, 350);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimation("slide-left");
      setTestimonialIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
      setTimeout(() => setAnimation(""), 350);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <>
      {/* Header Section */}
      <Navbar onMenuClick={() => setShowSidebar(true)} />
      {showSidebar && <Menu setShowSidebar={setShowSidebar} />}

      {/* About Title */}
      <div className="contact-hero d-flex justify-content-center align-items-center">
        <h2 className="fw-bold color">About Us</h2>
      </div>

      {/* Introduction Section */}
      <section className="container py-5 d-flex flex-column flex-md-row align-items-center gap-4">
        <div className="col-md-6">
          <h2 className="fw-bold">TawasuL</h2>
          <p className="text-secondary" style={{ fontSize: "1.25rem", fontWeight: 500 }}>
            TawasuL is a visual communication platform designed to support non-speaking children,
            especially those with autism. It uses PECS-based tools to help them express needs,
            feelings, and thoughts with ease and confidence.
          </p>
          <p className="text-secondary" style={{ fontSize: "1.25rem", fontWeight: 500 }}>
            Empowering every child to connect, communicate, and thrive.
          </p>
          <div className="text-center">
            <img
              src="/2.jpg"
              alt="autism day"
              className="img-fluid"
              style={{ height: "auto", width: "50%" }}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="text-center">
            <img
              src="/1.jpg"
              alt="autism child"
              className="img-fluid mb-3"
              style={{ height: "auto", width: "60%" }}
            />
          </div>
          <p className="text-secondary" style={{ fontSize: "1.25rem", fontWeight: 500 }}>
            It’s simple, child-friendly, and designed with real therapeutic needs in mind.
          </p>
          <p className="text-secondary" style={{ fontSize: "1.25rem", fontWeight: 500 }}>
            Parents and educators can easily customize boards to fit each child’s journey.
          </p>
          <p className="fw-semibold text-primary" style={{ fontSize: "1.25rem", fontWeight: 500 }}>
            With TawasuL, communication becomes a right—not a challenge.
          </p>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h3 className="fw-bold mb-4">Our Team</h3>
          <div className="row g-4">
            {[
              { name: "Mohsen Thabet", img: "/mohsan.png" },
              { name: "Mohamed Fawzy", img: "/fawzy.jpeg" },
              { name: "mohamed ElKorany", img: "/megahd.jpg" },
              { name: "Youssef Shaaban", img: "/youssef.jpg" },
              { name: "Youmna Khalil", img: "/youmna.jpeg" },
              { name: "Yousef Abdelati", img: "/joe.png" },
            ].map((member, i) => (
              <div className="col-6 col-md-4 col-lg-2" key={i}>
                <div className="card shadow-sm border-0">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="card-img-top rounded"
                    style={{ height: "300px", width: "auto", objectFit: "cover" }}
                  />
                  <div className="card-body p-2">
                    <p className="card-text fw-semibold">{member.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="home-testimonials-section">
        <div className="home-testimonials-title text-center mb-4">
          <span className="home-testimonials-icon" style={{ fontSize: "2rem", color: "#23305e" }}>
            <i className="bi bi-chat-left-quote-fill"></i>
          </span>
          <span
            className="home-testimonials-heading"
            style={{ fontWeight: 700, fontSize: "2rem", color: "#23305e" }}
          >
            Testimonial
          </span>
        </div>

        <div className="home-testimonials-wrapper">
          <button className="home-testimonials-arrow left" onClick={handlePrev}>
            <i className="bi bi-arrow-left-circle"></i>
          </button>

          <div className={`home-testimonial-card ${animation}`}>
            <div className="home-testimonial-quote-icon">
              <i className="bi bi-quote" style={{ fontSize: "3rem", color: "#23305e" }}></i>
            </div>
            <div className="home-testimonial-content">
              <img
                src={testimonials[testimonialIndex].avatar}
                alt={testimonials[testimonialIndex].name}
                className="home-testimonial-avatar"
              />
              <div>
                <p className="home-testimonial-name">{testimonials[testimonialIndex].name}</p>
                <div className="home-testimonial-text">{testimonials[testimonialIndex].text}</div>
              </div>
            </div>
          </div>

          <button className="home-testimonials-arrow right" onClick={handleNext}>
            <i className="bi bi-arrow-right-circle"></i>
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default About;
