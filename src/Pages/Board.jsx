import React, { useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../Style-pages/Board.css";
import { Link } from "react-router-dom";
import Menu from "../Components/Menu";


const categories = {
  feelings: [
    { emoji: "😍", label: "Happy" },
    { emoji: "😡", label: "Angry" },
    { emoji: "😭", label: "Sad" },
    { emoji: "😊", label: "Smile" },
  ],
  toys: [
    { emoji: "🧸", label: "Teddy Bear" },
    { emoji: "🧩", label: "Puzzle" },
    { emoji: "🪀", label: "Yoyo" },
  ],
  food: [
    { emoji: "🍎", label: "Apple" },
    { emoji: "🍌", label: "Banana" },
    { emoji: "🥝", label: "Kiwi" },
  ],
  needs: [
    { emoji: "👐", label: "Help" },
    { emoji: "🚽", label: "Toilet" },
    { emoji: "💤", label: "Sleep" },
  ],
  reading: [
    { emoji: "📘", label: "Book" },
    { emoji: "📝", label: "Write" },
    { emoji: "📖", label: "Read" },
  ],
  tools: [
    { emoji: "🔧", label: "Wrench" },
    { emoji: "🔨", label: "Hammer" },
    { emoji: "🪛", label: "Screwdriver" },
  ],
};

const Board = () => {
  const [sentenceWords, setSentenceWords] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [recentCards, setRecentCards] = useState([]);
  const [showPasswordCard, setShowPasswordCard] = useState(false);
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleCardClick = (label) => {
    setSentenceWords((prev) => [...prev, label]);
    setRecentCards((prev) => {
      const updated = [label, ...prev.filter((item) => item !== label)];
      return updated.slice(0, 12);
    });
  };

  const speakText = () => {
    const sentence = sentenceWords.join(" ");
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(sentence);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser doesn't support speech synthesis.");
    }
  };

  const clearSentence = () => {
    setSentenceWords([]);
  };

  const getCardsToDisplay = () => {
    if (activeCategory) return categories[activeCategory];

    return recentCards.map((label) => {
      const found = Object.values(categories)
        .flat()
        .find((item) => item.label === label);
      return found || { emoji: "❓", label };
    });
  };

  return (
    <div className="board-page d-flex flex-column min-vh-100 position-relative">
      {/* Sentence Box */}
      <Container className="d-flex align-items-center gap-3 mb-4 mt-3">
        <div className="d-flex align-items-center gap-2 flex-grow-1 p-3 rounded-3 shadow-sm bg-white border-dashed">
          <i
            className="bi bi-x-circle text-danger fs-5"
            onClick={clearSentence}
            style={{ cursor: "pointer" }}
          ></i>
          <div
            className="flex-grow-1 form-control bg-white"
            style={{ Height: "44px" }}
          >
            {sentenceWords.join(" ")}
          </div>
          <i
            className="bi bi-volume-up-fill text-primary fs-5"
            onClick={speakText}
            style={{ cursor: "pointer" }}
          ></i>
        </div>

        <i
          className="bi bi-box-arrow-right text-danger fs-5"
          onClick={() => setShowPasswordCard(true)}
          style={{ cursor: "pointer" }}
          title="Logout"
        />
      </Container>

      {/* Cards Area */}
      <div className="flex-grow-1 overflow-auto px-3 py-2">
        <Container>
          <Row className="g-2">
            {getCardsToDisplay().map((item, idx) => (
              <Col
                key={idx}
                className="text-center"
                style={{ width: "10%", maxWidth: "10%" }}
              >
                <Card
                  className="emoji-card shadow-sm mx-auto"
                  onClick={() => handleCardClick(item.label)}
                >
                  <Card.Body className="d-flex align-items-center justify-content-center p-3">
                    <span style={{ fontSize: "2rem" }}>{item.emoji}</span>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Categories Bar */}
      <div className="category-bar bg-white py-2 border-top shadow-sm">
        <div className="container">
          <div
            className="d-flex gap-2"
            style={{ overflowX: "auto", whiteSpace: "nowrap" }}
          >
            <Button
              variant={activeCategory === "" ? "primary" : "outline-primary"}
              onClick={() => setActiveCategory("")}
              className="flex-shrink-0 text-center"
              style={{ width: "150px", borderRadius: "10px" }}
            >
              <span style={{ fontSize: "1.3rem" }}>🕘</span>
            </Button>

            {Object.keys(categories).map((key) => (
              <Button
                key={key}
                variant={activeCategory === key ? "primary" : "outline-primary"}
                onClick={() => setActiveCategory(key)}
                className="flex-shrink-0 text-center"
                style={{ width: "150px", borderRadius: "10px" }}
              >
                <span style={{ fontSize: "1.3rem" }}>
                  {categories[key][0].emoji}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Password Card Overlay */}
      {showPasswordCard && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center"
          style={{ zIndex: 9999 }}
        >
          <Card
            className="p-4"
            style={{ width: "350px", borderRadius: "20px" }}
          >
            <div className="text-center mb-3">
              <img
                src="/image-2.png"
                alt="Profile"
                className="rounded-circle"
                width="80"
                height="80"
              />
            </div>

            <div className="mb-3 position-relative">
              <i
                className="bi bi-lock-fill position-absolute top-50 start-0 translate-middle-y color"
                style={{ marginLeft: "10px" }}
              ></i>
              <input
                type={showPass ? "text" : "password"}
                className="form-control ps-5 rounded-pill"
                placeholder="Enter Password"
                style={{ border: "1px solid #173067", height: "40px" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                className={`bi ${
                  showPass ? "bi-eye-slash" : "bi-eye"
                } position-absolute top-50 end-0 translate-middle-y color`}
                style={{ marginRight: "10px", cursor: "pointer" }}
                onClick={() => setShowPass((prev) => !prev)}
              ></i>
            </div>

            <Button
              variant="primary"
              className="w-100"
              onClick={() => {
                if (password === "123") {
                  setShowSidebar(true);
                  setShowPasswordCard(false);
                  setPassword("");
                } else {
                  alert("Wrong password!");
                }
              }}
            >
              🔓 Un_lock
            </Button>

            <Button
              variant="outline-secondary"
              className="w-100 mt-2"
              onClick={() => setShowPasswordCard(false)}
            >
              Cancel
            </Button>
          </Card>
        </div>
      )}

      {/* Sidebar Menu */}
      {showSidebar && <Menu setShowSidebar={setShowSidebar} />}
    </div>
  );
};

export default Board;
