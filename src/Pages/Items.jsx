import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Style-pages/Items.css";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Menu from "../Components/Menu";

const items = [
  { emoji: "🍎", label: "Apple" },
  { emoji: "🍌", label: "Banana" },
  { emoji: "🍇", label: "Grapes" },
  { emoji: "🍓", label: "Strawberry" },
  { emoji: "🍍", label: "Pineapple" },
  { emoji: "🥭", label: "Mango" },
  { emoji: "🍉", label: "Watermelon" },
  { emoji: "🍒", label: "Cherry" },
  { emoji: "🥝", label: "Kiwi" },
  { emoji: "🍑", label: "Peach" },
  { emoji: "🍋", label: "Lemon" },
  { emoji: "🍊", label: "Orange" },
  { emoji: "🥥", label: "Coconut" },
  { emoji: "🫐", label: "Blueberry" },
  { emoji: "🍐", label: "Pear" },
  { emoji: "🌽", label: "Corn" },
  { emoji: "🥕", label: "Carrot" },
  { emoji: "🍅", label: "Tomato" },
];

const Items = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      {/* nav  */}
      <Navbar onMenuClick={() => setShowSidebar(true)} />
      {showSidebar && <Menu setShowSidebar={setShowSidebar} />}
      <section className="items-section mb-5 marg">
        <Container>
          <div className="items-header text-center">
            <h2 className="category-title text-white">Food</h2>
          </div>
          <Row className="justify-content-center">
            {items.map((item, index) => (
              <Col xs={4} sm={3} md={2} className="d-flex justify-content-center mb-4" key={index}>
                <Link to={`/item`} className="text-decoration-none">
                  <div className="item-card text-center">
                    <div className="item-emoji">{item.emoji}</div>
                    <div className="item-label text-white">{item.label}</div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* footer  */}
      <Footer />
    </>
  );
};

export default Items;
