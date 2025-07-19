import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../Style-pages/Board.css";
import { Link } from "react-router-dom";
import Menu from "../Components/Menu";
import CategoryService from "../api/services/CategoryService";
import CardService from "../api/services/CardService";
import { getCategoryName, getUserLanguage, isRTL } from "../utils/languageUtils";

const Board = () => {
  const [sentenceWords, setSentenceWords] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [recentCards, setRecentCards] = useState([]);
  const [showPasswordCard, setShowPasswordCard] = useState(false);
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  // API data states
  const [categories, setCategories] = useState([]);
  const [userCards, setUserCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);

  // Get current language
  const currentLanguage = getUserLanguage();
  const isRTLMode = isRTL();

  // Fetch categories and cards on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch categories
        const categoriesResponse = await CategoryService.getAllCategories();
        let categoriesData = [];
        if (categoriesResponse && categoriesResponse.data) {
          if (Array.isArray(categoriesResponse.data)) {
            categoriesData = categoriesResponse.data;
          } else if (
            categoriesResponse.data.results &&
            Array.isArray(categoriesResponse.data.results)
          ) {
            categoriesData = categoriesResponse.data.results;
          } else if (categoriesResponse.data.data && Array.isArray(categoriesResponse.data.data)) {
            categoriesData = categoriesResponse.data.data;
          }
        }
        setCategories(categoriesData);

        // Fetch user cards
        const cardsResponse = await CardService.getUserCards();
        let cardsData = [];
        if (cardsResponse && cardsResponse.data) {
          if (Array.isArray(cardsResponse.data)) {
            cardsData = cardsResponse.data;
          } else if (cardsResponse.data.results && Array.isArray(cardsResponse.data.results)) {
            cardsData = cardsResponse.data.results;
          } else if (cardsResponse.data.data && Array.isArray(cardsResponse.data.data)) {
            cardsData = cardsResponse.data.data;
          }
        }
        setUserCards(cardsData);

        console.log("Loaded categories:", categoriesData);
        console.log("Loaded user cards:", cardsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get cards for a specific category
  const getCardsForCategory = (categoryId) => {
    if (!Array.isArray(userCards)) {
      return [];
    }
    return userCards.filter((card) => card.category.id === categoryId);
  };

  // Get cards to display based on active category
  const getCardsToDisplay = () => {
    if (activeCategory) {
      return getCardsForCategory(activeCategory.id);
    }

    // Return recent cards or default cards
    return recentCards.map((cardLabel) => {
      // Find the card in userCards by label
      const foundCard = userCards.find(
        (card) => card.title_en === cardLabel || card.title_ar === cardLabel
      );
      return (
        foundCard || {
          id: Math.random(),
          title_en: cardLabel,
          title_ar: cardLabel,
          image: null,
        }
      );
    });
  };

  // Get localized card title
  const getCardTitle = (card) => {
    if (currentLanguage === "ar" && card.title_ar) {
      return card.title_ar;
    }
    return card.title_en || card.title_ar || card.label || "Unknown";
  };

  // Get audio URL for a card
  const getCardAudio = (card) => {
    if (currentLanguage === "ar" && card.audio_ar) {
      return card.audio_ar;
    }
    return card.audio_en || card.audio_ar;
  };

  // Get the full generated statement for the sentence
  const getGeneratedStatement = () => {
    const sentence = sentenceWords.join(" ");
    if (!sentence.trim()) return null;

    // Find the corresponding card for each word to get the full statement
    const statementWords = sentenceWords.map((word) => {
      const card = userCards.find((card) => getCardTitle(card) === word);
      return card ? card.statement : word;
    });

    return statementWords.join(" ");
  };

  // Get statement array for displaying
  const getStatementArray = () => {
    if (sentenceWords.length === 0) return [];

    return sentenceWords.map((word) => {
      const card = userCards.find((card) => getCardTitle(card) === word);
      return {
        word: word,
        statement: card ? card.statement : word,
        audio: card ? getCardAudio(card) : null,
      };
    });
  };

  const handleCardClick = (card) => {
    const cardLabel = getCardTitle(card);
    setSentenceWords((prev) => [...prev, cardLabel]);
    setRecentCards((prev) => {
      const updated = [cardLabel, ...prev.filter((item) => item !== cardLabel)];
      return updated.slice(0, 12);
    });
  };

  // Play the full generated statement audio
  const playStatementAudio = async () => {
    const statementArray = getStatementArray();
    if (statementArray.length === 0) return;

    try {
      setIsPlayingAudio(true);

      // Stop any currently playing audio
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      // Play audios one after another
      await playAudiosSequentially(statementArray);
    } catch (error) {
      console.error("Error playing statement audio:", error);
      setIsPlayingAudio(false);
      // Fallback to browser speech synthesis
      const fullStatement = getGeneratedStatement();
      fallbackToSpeechSynthesis(fullStatement);
    }
  };

  // Play audios sequentially
  const playAudiosSequentially = async (statementArray) => {
    for (let i = 0; i < statementArray.length; i++) {
      const item = statementArray[i];

      if (!item.audio) {
        console.log(`No audio available for: ${item.word}`);
        continue;
      }

      try {
        console.log(`Playing audio for: ${item.word}`);

        // Create new audio element for this item
        const audio = new Audio();

        // Set up audio event listeners
        audio.onloadstart = () => {
          console.log(`Loading audio for: ${item.word}`);
        };

        audio.oncanplay = () => {
          console.log(`Can play audio for: ${item.word}`);
          audio.play();
        };

        audio.onended = () => {
          console.log(`Finished playing audio for: ${item.word}`);
          setCurrentAudio(null);

          // If this is the last item, stop playing
          if (i === statementArray.length - 1) {
            console.log("Finished playing all audios");
            setIsPlayingAudio(false);
          }
        };

        audio.onerror = (error) => {
          console.error(`Error playing audio for ${item.word}:`, error);
          setCurrentAudio(null);

          // Continue with next item even if this one fails
          if (i === statementArray.length - 1) {
            setIsPlayingAudio(false);
          }
        };

        // Set the audio source and play
        audio.src = item.audio;
        setCurrentAudio(audio);

        // Wait for this audio to finish before playing the next one
        await new Promise((resolve) => {
          audio.onended = () => {
            console.log(`Finished playing audio for: ${item.word}`);
            setCurrentAudio(null);
            resolve();
          };

          audio.onerror = (error) => {
            console.error(`Error playing audio for ${item.word}:`, error);
            setCurrentAudio(null);
            resolve(); // Continue to next item even if this one fails
          };
        });

        // Add a small pause between audios
        await new Promise((resolve) => setTimeout(resolve, 300));
      } catch (error) {
        console.error(`Error setting up audio for ${item.word}:`, error);
        // Continue with next item even if this one fails
      }
    }

    // Ensure playing state is reset
    setIsPlayingAudio(false);
  };

  // Fallback to browser speech synthesis
  const fallbackToSpeechSynthesis = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      if (currentLanguage === "ar") {
        utterance.lang = "ar-SA";
      } else {
        utterance.lang = "en-US";
      }
      window.speechSynthesis.speak(utterance);
    } else {
      alert(
        currentLanguage === "ar"
          ? "عذراً، متصفحك لا يدعم النطق"
          : "Sorry, your browser doesn't support speech synthesis."
      );
    }
  };

  const speakText = () => {
    playStatementAudio();
  };

  const clearSentence = () => {
    setSentenceWords([]);
  };

  const removeWordFromSentence = (index) => {
    setSentenceWords((prev) => prev.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="board-page d-flex flex-column min-vh-100 position-relative">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "400px" }}
        >
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">
              {currentLanguage === "ar" ? "جاري التحميل..." : "Loading board..."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="board-page d-flex flex-column min-vh-100 position-relative">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "400px" }}
        >
          <div className="text-center">
            <div className="alert alert-danger" role="alert">
              <h5>{currentLanguage === "ar" ? "خطأ في تحميل اللوحة" : "Error Loading Board"}</h5>
              <p>{error}</p>
              <button className="btn btn-primary" onClick={() => window.location.reload()}>
                {currentLanguage === "ar" ? "حاول مرة أخرى" : "Try Again"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="board-page d-flex flex-column min-vh-100 position-relative"
      dir={isRTLMode ? "rtl" : "ltr"}
    >
      {/* Sentence Box */}
      <Container className="d-flex align-items-center gap-3 mb-4 mt-3">
        <div className="d-flex align-items-center gap-2 flex-grow-1 p-3 rounded-3 shadow-sm bg-white border-dashed">
          <i
            className="bi bi-x-circle text-danger fs-5"
            onClick={clearSentence}
            style={{ cursor: "pointer" }}
            title={currentLanguage === "ar" ? "مسح الجملة" : "Clear sentence"}
          ></i>
          <div
            className="flex-grow-1"
            style={{
              minHeight: "44px",
              textAlign: isRTLMode ? "right" : "left",
              direction: isRTLMode ? "rtl" : "ltr",
            }}
          >
            {sentenceWords.length > 0 ? (
              <div className="d-flex flex-wrap gap-2 align-items-center">
                {sentenceWords.map((word, index) => {
                  const card = userCards.find((card) => getCardTitle(card) === word);
                  return (
                    <div
                      key={index}
                      className="d-flex flex-column align-items-center position-relative"
                      style={{ minWidth: "60px", maxWidth: "80px" }}
                    >
                      <div
                        className="bg-light rounded-2 p-2 d-flex align-items-center justify-content-center"
                        style={{
                          width: "32px",
                          height: "32px",
                          cursor: "pointer",
                        }}
                        onClick={() => removeWordFromSentence(index)}
                        title={currentLanguage === "ar" ? "حذف الكلمة" : "Delete word"}
                      >
                        {card?.image ? (
                          <img
                            src={card.image}
                            alt={word}
                            style={{
                              width: "24px",
                              height: "24px",
                              objectFit: "contain",
                            }}
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        ) : (
                          <span style={{ fontSize: "1.2rem" }}>📄</span>
                        )}
                      </div>
                      <div
                        className="text-center mt-1"
                        style={{
                          fontSize: "0.6rem",
                          lineHeight: "1.1",
                          wordBreak: "break-word",
                          color: "#6c757d",
                          maxWidth: "100%",
                        }}
                      >
                        {word}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-muted">
                {currentLanguage === "ar"
                  ? "اضغط على البطاقات لبناء جملة"
                  : "Click cards to build a sentence"}
              </div>
            )}
          </div>
          <i
            className={`bi ${
              isPlayingAudio ? "bi-volume-mute" : "bi-volume-up-fill"
            } text-primary fs-5`}
            onClick={speakText}
            style={{ cursor: isPlayingAudio ? "not-allowed" : "pointer" }}
            title={currentLanguage === "ar" ? "نطق الجملة" : "Speak sentence"}
          ></i>
        </div>

        <i
          className="bi bi-box-arrow-right text-danger fs-5"
          onClick={() => setShowPasswordCard(true)}
          style={{ cursor: "pointer" }}
          title={currentLanguage === "ar" ? "تسجيل الخروج" : "Logout"}
        />
      </Container>

      {/* Cards Area */}
      <div className="flex-grow-1 overflow-auto px-3 py-2">
        <Container>
          <Row className="g-2">
            {getCardsToDisplay().map((card, idx) => (
              <Col
                key={card.id || idx}
                className="text-center"
                style={{ width: "10%", maxWidth: "10%" }}
              >
                <Card
                  className="emoji-card shadow-sm mx-auto"
                  onClick={() => handleCardClick(card)}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center p-3">
                    {card.image ? (
                      <img
                        src={card.image}
                        alt={getCardTitle(card)}
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "contain",
                          marginBottom: "8px",
                        }}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      <span style={{ fontSize: "2rem", marginBottom: "8px" }}>📄</span>
                    )}
                    <small
                      className="text-muted text-center"
                      style={{
                        fontSize: "0.75rem",
                        lineHeight: "1.2",
                        wordBreak: "break-word",
                      }}
                    >
                      {getCardTitle(card)}
                    </small>
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
          <div className="d-flex gap-2" style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
            <Button
              variant={activeCategory === null ? "primary" : "outline-primary"}
              onClick={() => setActiveCategory(null)}
              className="flex-shrink-0 text-center"
              style={{ width: "150px", borderRadius: "10px" }}
              title={currentLanguage === "ar" ? "الكل" : "All"}
            >
              <span style={{ fontSize: "1.3rem" }}>🕘</span>
            </Button>

            {Array.isArray(categories) &&
              categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory?.id === category.id ? "primary" : "outline-primary"}
                  onClick={() => setActiveCategory(category)}
                  className="flex-shrink-0 text-center"
                  style={{ width: "150px", borderRadius: "10px" }}
                  title={getCategoryName(category)}
                >
                  <span style={{ fontSize: "1.3rem" }}>
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={getCategoryName(category)}
                        style={{
                          width: "24px",
                          height: "24px",
                          objectFit: "contain",
                        }}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      "📁"
                    )}
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
            dir={isRTLMode ? "rtl" : "ltr"}
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
                placeholder={currentLanguage === "ar" ? "أدخل كلمة المرور" : "Enter Password"}
                style={{
                  border: "1px solid #173067",
                  height: "40px",
                  textAlign: isRTLMode ? "right" : "left",
                }}
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
                  alert(currentLanguage === "ar" ? "كلمة مرور خاطئة!" : "Wrong password!");
                }
              }}
            >
              🔓 {currentLanguage === "ar" ? "فتح" : "Un_lock"}
            </Button>

            <Button
              variant="outline-secondary"
              className="w-100 mt-2"
              onClick={() => setShowPasswordCard(false)}
            >
              {currentLanguage === "ar" ? "إلغاء" : "Cancel"}
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
