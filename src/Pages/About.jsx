import React, { useState, useEffect } from "react";
import "../Style-pages/Contact.css";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Menu from "../Components/Menu";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useLanguage } from "../context/LanguageContext";
import { getTranslation } from "../utils/translations";

const About = () => {
  const { currentLanguage } = useLanguage();
  const testimonials = [
    {
      name: getTranslation("about.testimonial1.name", currentLanguage) || "Maha Ahmad",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      text:
        getTranslation("about.testimonial1.text", currentLanguage) ||
        "TAWASUL gave my child a voice we thought we’d never hear. It’s more than an app — it’s a lifeline for communication.",
    },
    {
      name: getTranslation("about.testimonial2.name", currentLanguage) || "Omar Khaled",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      text:
        getTranslation("about.testimonial2.text", currentLanguage) ||
        "Thanks to TAWASUL, my son can finally express his needs and feelings. It’s made a world of difference for our family.",
    },
  ];

  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [animation, setAnimation] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

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

  const teamMembers = [
    {
      name: getTranslation("about.team6", currentLanguage) || "Yousef Abdelati",
      img: "/joe.png",
    },
    {
      name: getTranslation("about.team5", currentLanguage) || "Youmna Khalil",
      img: "/youmna.jpeg",
    },
    {
      name: getTranslation("about.team4", currentLanguage) || "Youssef Shaaban",
      img: "/youssef.jpg",
    },
    {
      name: getTranslation("about.team3", currentLanguage) || "Mohamed ElKorany",
      img: "/megahd.jpg",
    },
    {
      name: getTranslation("about.team2", currentLanguage) || "Mohamed Fawzy",
      img: "/fawzy.jpeg",
    },
    {
      name: getTranslation("about.team1", currentLanguage) || "Mohsen Thabet",
      img: "/mohsan.png",
    },
  ];

  return (
    <>
      <div id="root" className="profile-container bg-light min-vh-100">
        {/* Header Section */}
        <Navbar
          onMenuClick={() => setShowSidebar(true)}
          onEditProfile={() => setShowEditModal(true)}
        />

        {showSidebar && (
          <Menu setShowSidebar={setShowSidebar} onEditProfile={() => setShowEditModal(true)} />
        )}

        <div className="main-content">
          {/* About Title */}
          <div className="contact-hero d-flex justify-content-center align-items-center">
            <h2 className="fw-bold color">
              {getTranslation("about.title", currentLanguage) || "About Us"}
            </h2>
          </div>

          {/* Introduction Section */}
          <section className="container py-5 d-flex flex-column flex-md-row align-items-center gap-4">
            <div className="col-md-6">
              <h2 className="fw-bold">
                {getTranslation("about.brand", currentLanguage) || "TawasuL"}
              </h2>
              <p className="text-secondary" style={{ fontSize: "1.25rem", fontWeight: 500 }}>
                {getTranslation("about.intro1", currentLanguage) ||
                  "TawasuL is a visual communication platform designed to support non-speaking children, especially those with autism. It uses PECS-based tools to help them express needs, feelings, and thoughts with ease and confidence."}
              </p>
              <p className="text-secondary" style={{ fontSize: "1.25rem", fontWeight: 500 }}>
                {getTranslation("about.intro2", currentLanguage) ||
                  "Empowering every child to connect, communicate, and thrive."}
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
                {getTranslation("about.intro3", currentLanguage) ||
                  "It’s simple, child-friendly, and designed with real therapeutic needs in mind."}
              </p>
              <p className="text-secondary" style={{ fontSize: "1.25rem", fontWeight: 500 }}>
                {getTranslation("about.intro4", currentLanguage) ||
                  "Parents and educators can easily customize boards to fit each child’s journey."}
              </p>
              <p
                className="fw-semibold text-primary"
                style={{ fontSize: "1.25rem", fontWeight: 500 }}
              >
                {getTranslation("about.intro5", currentLanguage) ||
                  "With TawasuL, communication becomes a right—not a challenge."}
              </p>
            </div>
          </section>

          {/* Mission & Vision Section */}
          <section className="container py-4">
            <div className="row g-5">
              <div className="col-md-6">
                <div className="p-4 border rounded-4 shadow-sm h-100">
                  <h3 className="fw-bold mb-3">
                    {getTranslation("about.mission", currentLanguage)}
                  </h3>
                  <p className="text-muted">
                    {getTranslation("about.missionText", currentLanguage)}
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-4 border rounded-4 shadow-sm h-100">
                  <h3 className="fw-bold mb-3">
                    {getTranslation("about.vision", currentLanguage)}
                  </h3>
                  <p className="text-muted">
                    {getTranslation("about.visionText", currentLanguage)}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="container py-4">
            <div className="row">
              <div className="col">
                <h2 className="text-center mb-4">
                  {getTranslation("about.values", currentLanguage)}
                </h2>
              </div>
            </div>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="p-4 border rounded-4 shadow-sm h-100 text-center">
                  <div className="mb-3">
                    <i className="bi bi-heart-fill text-danger" style={{ fontSize: "3rem" }}></i>
                  </div>
                  <h4 className="fw-bold mb-3">
                    {getTranslation("about.inclusivity", currentLanguage)}
                  </h4>
                  <p className="text-muted">
                    {getTranslation("about.inclusivityText", currentLanguage)}
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-4 border rounded-4 shadow-sm h-100 text-center">
                  <div className="mb-3">
                    <i
                      className="bi bi-lightbulb-fill text-warning"
                      style={{ fontSize: "3rem" }}
                    ></i>
                  </div>
                  <h4 className="fw-bold mb-3">
                    {getTranslation("about.innovation", currentLanguage)}
                  </h4>
                  <p className="text-muted">
                    {getTranslation("about.innovationText", currentLanguage)}
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-4 border rounded-4 shadow-sm h-100 text-center">
                  <div className="mb-3">
                    <i
                      className="bi bi-emoji-heart-eyes-fill text-success"
                      style={{ fontSize: "3rem" }}
                    ></i>
                  </div>
                  <h4 className="fw-bold mb-3">
                    {getTranslation("about.compassion", currentLanguage)}
                  </h4>
                  <p className="text-muted">
                    {getTranslation("about.compassionText", currentLanguage)}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Our Team Section */}
          <section className="bg-light py-5">
            <div className="container text-center">
              <h3 className="fw-bold mb-4">
                {getTranslation("about.team", currentLanguage) || "Our Team"}
              </h3>
              <div className="row g-4">
                {teamMembers.map((member, i) => (
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
              <span
                className="home-testimonials-icon"
                style={{ fontSize: "2rem", color: "#23305e" }}
              >
                <i className="bi bi-chat-left-quote-fill"></i>
              </span>
              <span
                className="home-testimonials-heading"
                style={{ fontWeight: 700, fontSize: "2rem", color: "#23305e" }}
              >
                {getTranslation("about.testimonialsHeader", currentLanguage) || "Testimonial"}
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
                    <div className="home-testimonial-text">
                      {testimonials[testimonialIndex].text}
                    </div>
                  </div>
                </div>
              </div>

              <button className="home-testimonials-arrow right" onClick={handleNext}>
                <i className="bi bi-arrow-right-circle"></i>
              </button>
            </div>
          </section>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default About;
