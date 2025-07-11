import React, { useState } from "react";
import { Navbar, Nav, Container, Row, Col, Button, Card, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import board from "../assets/board.svg";

function HomePage() {
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
  return (
    <>
      <Header />
      <main
        className="home-main-section"
        style={{
          backgroundImage: `url('/src/assets/home.svg')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="home-content-wrapper">
          <div className="home-text-content text-center ms-auto">
            <h1 className="home-title">
              Welcome To <br /> <span>TAWASUL</span>
            </h1>
            <p className="home-description">
              TAWASUL is an inclusive communication platform that empowers non-speaking individuals,
              especially children with autism, through visual tools like PECS.
            </p>
            <button className="home-read-more-btn text-white">Read More</button>
          </div>
        </div>
        <div className="home-wave-effect"></div>
      </main>
      <section className="home-stats-section">
        <div className="home-stats-wrapper">
          <div className="home-stat-card home-stat-blue">
            <div className="home-stat-value">12</div>
            <div className="home-stat-label">Sentences</div>
          </div>
          <div className="home-stat-card home-stat-yellow">
            <div className="home-stat-value">500</div>
            <div className="home-stat-label">Users</div>
          </div>
          <div className="home-stat-card home-stat-pink">
            <div className="home-stat-value">200</div>
            <div className="home-stat-label">PECS Cards</div>
          </div>
        </div>
        <div className="home-bottom-waves">
          <svg
            width="1728"
            height="400"
            viewBox="0 0 1728 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M280 137.33C196 137.33 -8 68 -8 68V220H1728V68C1652 68 1557 8.93 1473 1.27C1389 -6.39 1260 62.67 1180 68C1100 73.33 1056 32 924 20.33C792 8.67 688 50.67 688 50.67C688 50.67 640 68 536 106.57C432 145.13 364 137.33 280 137.33Z"
              fill="#D1DBFE"
              fillOpacity="0.4"
              stroke="#D1DBFE"
            />
            <path
              d="M280 291.67C196 291.67 -8 346 -8 346V220H1728V346C1652 346 1557 390.67 1473 397C1389 403.33 1260 349 1180 346C1100 343 1056 374 924 382.67C792 391.33 688 360 688 360C688 360 640 346 536 316.77C432 287.53 364 291.67 280 291.67Z"
              fill="#D1DBFE"
              fillOpacity="0.4"
              stroke="#D1DBFE"
            />
            <path
              d="M-30.85 137.33C-115.77 137.33 -322 68 -322 68V220H1736V137.33C1659.17 137.33 1400.92 27.8 1316 20.33C1231.08 12.87 1024.88 84 944 89.33C863.12 94.67 753.65 32 620.2 20.33C486.76 8.67 381.62 50.67 381.62 50.67C381.62 50.67 333.09 68 227.95 106.57C122.82 145.13 54.07 137.33 -30.85 137.33Z"
              fill="#D1DBFE"
              fillOpacity="0.6"
              stroke="#D1DBFE"
            />
            <path
              d="M-361.38 279C-462.19 279 -707 326 -707 326V220H1736V279C1644.79 279 1338.23 352 1237.43 357.33C1136.62 362.67 891.84 313.67 795.84 310.33C699.83 307 569.87 347 411.46 357.33C253.05 367.67 128.25 342.33 128.25 342.33C128.25 342.33 70.64 326 -54.16 300.67C-178.97 275.33 -260.58 279 -361.38 279Z"
              fill="#D1DBFE"
              fillOpacity="0.6"
              stroke="#D1DBFE"
            />
          </svg>
        </div>
      </section>

      <section className="home-categories-section">
        <Container className="home-categories-container">
          <div className="home-categories-title text-center mb-4">
            <span
              className="home-categories-icon"
              style={{
                fontSize: "2rem",
                color: "#23305e",
                marginRight: "0.5rem",
                verticalAlign: "middle",
              }}
            >
              <i className="bi bi-grid-3x3-gap-fill"></i>
            </span>
            <span
              className="home-categories-heading"
              style={{
                fontWeight: 700,
                fontSize: "2rem",
                color: "#23305e",
                verticalAlign: "middle",
              }}
            >
              Categories
            </span>
          </div>
          <div className="home-categories-grid">
            <div className="home-category-card home-category-pink">
              <div className="home-category-icon" style={{ fontSize: "3rem" }}>
                🤖🚗
              </div>
              <div className="home-category-label">Toys</div>
            </div>
            <div className="home-category-card home-category-blue">
              <div className="home-category-icon" style={{ fontSize: "3rem" }}>
                🍷🍴
              </div>
              <div className="home-category-label">Food</div>
            </div>
            <div className="home-category-card home-category-green">
              <div className="home-category-icon" style={{ fontSize: "3rem" }}>
                🧑‍🤝‍🧑
              </div>
              <div className="home-category-label">Feeling</div>
            </div>
            <div className="home-category-card home-category-yellow">
              <div className="home-category-icon" style={{ fontSize: "3rem" }}>
                📦🙌
              </div>
              <div className="home-category-label">Things</div>
            </div>
          </div>
        </Container>
      </section>

      <section className="home-app-section">
        <Container>
          <div className="home-app-title text-center mb-4">
            <span
              className="home-app-icon"
              style={{
                fontSize: "2rem",
                color: "#23305e",
                marginRight: "0.5rem",
                verticalAlign: "middle",
              }}
            >
              <i className="bi bi-kanban-fill"></i>
            </span>
            <span
              className="home-app-heading"
              style={{
                fontWeight: 700,
                fontSize: "2rem",
                color: "#23305e",
                verticalAlign: "middle",
              }}
            >
              Board
            </span>
          </div>
          <div className="home-app-content">
            <div className="home-app-image d-flex justify-content-center">
              <img src={board} alt="App" className="w-50" />
            </div>
          </div>
        </Container>
      </section>

      <section className="home-testimonials-section">
        <div className="home-testimonials-title text-center mb-4">
          <span
            className="home-testimonials-icon"
            style={{
              fontSize: "2rem",
              color: "#23305e",
              marginRight: "0.5rem",
              verticalAlign: "middle",
            }}
          >
            <i className="bi bi-chat-left-quote-fill"></i>
          </span>
          <span
            className="home-testimonials-heading"
            style={{ fontWeight: 700, fontSize: "2rem", color: "#23305e", verticalAlign: "middle" }}
          >
            Testimonial
          </span>
        </div>
        <div className="home-testimonials-wrapper">
          <button
            className="home-testimonials-arrow left"
            aria-label="Previous testimonial"
            onClick={handlePrev}
          >
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
          <button
            className="home-testimonials-arrow right"
            aria-label="Next testimonial"
            onClick={handleNext}
          >
            <i className="bi bi-arrow-right-circle"></i>
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default HomePage;
