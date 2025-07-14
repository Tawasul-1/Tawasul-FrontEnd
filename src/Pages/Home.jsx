import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import "bootstrap-icons/font/bootstrap-icons.css";
import board from "../assets/tab.png";
import { Link } from "react-router-dom";

function HomePage() {
  const testimonials = [
    {
      name: "Maha Ahmad",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      text: "TAWASUL gave my child a voice we thought we'd never hear. It's more than an app — it's a lifeline for communication.",
    },
    {
      name: "Omar Khaled",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "Thanks to TAWASUL, my son can finally express his needs and feelings. It's made a world of difference for our family.",
    },
  ];

  const categories = [
    { label: "Feelings", icon: "bi bi-emoji-smile", bg: "#fce4ec" },
    { label: "Toys", icon: "bi bi-controller", bg: "#e8f5e9" },
    { label: "Food", icon: "bi bi-egg-fried", bg: "#fff3e0" },
    { label: "Actions", icon: "bi bi-activity", bg: "#e3f2fd" },
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
      <Header />

      {/* Hero Section */}
      <main
        className="home-main-section d-flex align-items-center"
        style={{
          backgroundImage: `url('/src/assets/home.svg')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          minHeight: "80vh",
        }}
      >
        <Container>
          <Row className="justify-content-end">
            <Col
              xs={12}
              lg={6}
              className="d-flex align-items-center justify-content-center text-center"
            >
              <div className="p-4" style={{ maxWidth: "500px" }}>
                <h1 className="home-title">
                  Welcome To <br /> <span>TAWASUL</span>
                </h1>
                <p className="home-description">
                  TAWASUL is an inclusive communication platform that empowers non-speaking
                  individuals, especially children with autism, through visual tools like PECS.
                </p>
                <Link to="/about">
                  <button className="home-read-more-btn text-white">Read More</button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </main>

      {/* num */}
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

      {/* Discover */}
      <section className="home-wow-highlight py-5 bg-white text-center">
        <Container>
          <h2 className="fw-bold mb-4 display-6">🌟 Discover More with TAWASUL</h2>
          <p className="lead mb-4">
            Every interaction opens a new door to connection and discovery. Here's what makes us{" "}
            <strong>stand out</strong>:
          </p>
          <Row className="g-4">
            <Col md={4}>
              <div className="p-4 border rounded-4 shadow-sm h-100">
                <i className="bi bi-magic text-success fs-1 mb-3"></i>
                <h5 className="fw-bold">Visual Magic</h5>
                <p>Engaging visuals that resonate with kids and spark joyful learning.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-4 border rounded-4 shadow-sm h-100">
                <i className="bi bi-cloud-upload text-info fs-1 mb-3"></i>
                <h5 className="fw-bold">Seamless Access</h5>
                <p>Access your personalized board anywhere — on any device, at any time.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-4 border rounded-4 shadow-sm h-100">
                <i className="bi bi-emoji-smile text-warning fs-1 mb-3"></i>
                <h5 className="fw-bold">Joyful UX</h5>
                <p>Kid-friendly design that brings smiles while empowering communication.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* how use  */}
      <section className="how-it-works-section py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold" style={{ color: "#23305e" }}>
              How It Works
            </h2>
            <p className="text-muted">Just 3 simple steps to get started</p>
          </div>
          <Row className="g-4 text-center">
            <Col md={4}>
              <div className="p-4 border rounded-4 shadow-sm h-100 bg-white">
                <i className="bi bi-person-check fs-1 text-primary mb-3"></i>
                <h5 className="fw-bold">1. Create Account</h5>
                <p>Sign up and set up your profile quickly and easily.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-4 border rounded-4 shadow-sm h-100 bg-white">
                <i className="bi bi-kanban fs-1 text-success mb-3"></i>
                <h5 className="fw-bold">2. Build Your Board</h5>
                <p>Choose the PECS cards that suit your child's needs.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-4 border rounded-4 shadow-sm h-100 bg-white">
                <i className="bi bi-chat-dots fs-1 text-warning mb-3"></i>
                <h5 className="fw-bold">3. Start Communicating</h5>
                <p>Empower your child to express themselves visually.</p>
              </div>
            </Col>
          </Row>
          {/* Button under cards */}
          <div className="text-center mt-4">
            <Link
              to="/how-use"
              className="btn btn-primary px-4 py-2 rounded-pill shadow-sm"
              style={{
                backgroundColor: "#173067",
                border: "none",
                width: "300px",
              }}
            >
              Learn More
              <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </div>
        </Container>
      </section>

      {/* Categories Section */}
      <section className="home-categories-section py-5">
        <Container className="home-categories-container">
          <div className="text-center mb-5">
            <div className="d-flex justify-content-center align-items-center mb-2">
              <i
                className="bi bi-grid-3x3-gap-fill"
                style={{ fontSize: "2.2rem", color: "#23305e", marginRight: "0.5rem" }}
              ></i>
              <h2 className="fw-bold m-0" style={{ color: "#23305e" }}>
                Categories
              </h2>
            </div>
            <p className="text-muted">Explore by interest</p>
          </div>

          <div className="row g-4 justify-content-center">
            {categories.map((cat, idx) => (
              <div key={idx} className="col-6 col-md-3">
                <div
                  className="p-4 text-center rounded-4 shadow-sm category-card h-100"
                  style={{
                    backgroundColor: cat.bg,
                    transition: "all 0.3s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                  }}
                >
                  <div style={{ fontSize: "2.5rem", color: "#23305e" }}>
                    <i className={cat.icon}></i>
                  </div>
                  <h5 className="mt-3 fw-semibold">{cat.label}</h5>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <a
              href="/selection"
              className="btn btn-primary px-4 py-2 rounded-pill"
              style={{ backgroundColor: "#173067", border: "none", width: "300px" }}
            >
              View All Categories
            </a>
          </div>
        </Container>
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

      <Footer />
    </>
  );
}

export default HomePage;
