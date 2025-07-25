import React, { useState, useEffect } from "react";
import { Container, Button, Card } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../Style-pages/Board.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Menu from "../Components/Menu";
import BoardService from "../api/services/BoardService";
import { getCategoryName, getUserLanguage, isRTL } from "../utils/languageUtils";

const Board = () => {
  const [sentenceWords, setSentenceWords] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showPasswordCard, setShowPasswordCard] = useState(false);
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [boardData, setBoardData] = useState({
    cards: [],
    categories: [],
    hour_used: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);

  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const currentLanguage = getUserLanguage();
  const isRTLMode = isRTL();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await BoardService.getBoardWithCategories();
        setBoardData(data);
      } catch (error) {
        console.error("Error fetching board data:", error);
        setError("Failed to load board data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const verifyPin = async () => {
    try {
      const response = await BoardService.verifyPin(password);
      if (response.status) {
        setShowSidebar(true);
        setShowPasswordCard(false);
        setPassword("");
      } else {
        alert(currentLanguage === "ar" ? "كلمة مرور خاطئة!" : "Wrong password!");
      }
    } catch (error) {
      console.error("PIN verification error:", error);
      alert(
        currentLanguage === "ar" ? "حدث خطأ أثناء التحقق من الرمز السري" : "Error verifying PIN"
      );
    }
  };

  const getCardsToDisplay = () => {
    if (!activeCategory || activeCategory === "all") {
      return boardData.cards;
    }
    return boardData.cards.filter(
      (card) => card.category === activeCategory.id || card.category?.id === activeCategory.id
    );
  };

  const getCardTitle = (card) => {
    if (currentLanguage === "ar" && card.title_ar) {
      return card.title_ar;
    }
    return card.title_en || card.title_ar || "Unknown";
  };

  const getCardAudio = (card) => {
    if (currentLanguage === "ar" && card.audio_ar) {
      return `http://localhost:8000${card.audio_ar}`;
    }
    return `http://localhost:8000${card.audio_en}`;
  };

  const getGeneratedStatement = () => {
    const sentence = sentenceWords.join(" ");
    if (!sentence.trim()) return null;
    const statementWords = sentenceWords.map((word) => {
      const card = boardData.cards.find((card) => getCardTitle(card) === word);
      return card ? card.statement : word;
    });
    return statementWords.join(" ");
  };

  const getStatementArray = () => {
    if (sentenceWords.length === 0) return [];
    return sentenceWords.map((word) => {
      const card = boardData.cards.find((card) => getCardTitle(card) === word);
      return {
        word: word,
        statement: card ? card.statement : word,
        audio: card ? getCardAudio(card) : null,
      };
    });
  };

  const handleCardClick = async (card) => {
    const cardLabel = getCardTitle(card);
    setSentenceWords((prev) => [...prev, cardLabel]);

    try {
      await BoardService.logCardInteraction(card.id, 1);
    } catch (error) {
      console.error("Failed to log card interaction:", error);
    }

    // Get the appropriate audio URL based on current language
    const audioUrl = currentLanguage === "ar" ? card.audio_ar : card.audio_en;

    if (audioUrl) {
      try {
        const fullAudioUrl = `http://localhost:8000${audioUrl}`;
        const audio = new Audio(fullAudioUrl);

        // Handle audio playback
        audio.oncanplay = () => {
          audio.play().catch((error) => {
            console.error("Audio play failed:", error);
            fallbackToSpeechSynthesis(cardLabel);
          });
        };

        audio.onerror = () => {
          console.error("Error loading audio file");
          fallbackToSpeechSynthesis(cardLabel);
        };
      } catch (error) {
        console.error("Error setting up audio:", error);
        fallbackToSpeechSynthesis(cardLabel);
      }
    } else {
      // Fallback to speech synthesis if no audio file
      fallbackToSpeechSynthesis(cardLabel);
    }
  };

  const playStatementAudio = async () => {
    const statementArray = getStatementArray();
    if (statementArray.length === 0) return;

    try {
      setIsPlayingAudio(true);
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
      await playAudiosSequentially(statementArray);
    } catch (error) {
      console.error("Error playing statement audio:", error);
      setIsPlayingAudio(false);
      const fullStatement = getGeneratedStatement();
      fallbackToSpeechSynthesis(fullStatement);
    }
  };

  const playAudiosSequentially = async (statementArray) => {
    for (let i = 0; i < statementArray.length; i++) {
      const item = statementArray[i];
      if (!item.audio) continue;

      try {
        const audio = new Audio();
        audio.oncanplay = () => audio.play();
        audio.onended = () => {
          setCurrentAudio(null);
          if (i === statementArray.length - 1) setIsPlayingAudio(false);
        };
        audio.onerror = (error) => {
          console.error(`Error playing audio for ${item.word}:`, error);
          setCurrentAudio(null);
          if (i === statementArray.length - 1) setIsPlayingAudio(false);
        };
        audio.src = item.audio;
        setCurrentAudio(audio);
        await new Promise((resolve) => {
          audio.onended = () => {
            setCurrentAudio(null);
            resolve();
          };
          audio.onerror = (error) => {
            console.error(`Error playing audio for ${item.word}:`, error);
            setCurrentAudio(null);
            resolve();
          };
        });
        await new Promise((resolve) => setTimeout(resolve, 300));
      } catch (error) {
        console.error(`Error setting up audio for ${item.word}:`, error);
      }
    }
    setIsPlayingAudio(false);
  };

  const fallbackToSpeechSynthesis = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLanguage === "ar" ? "ar-SA" : "en-US";
      window.speechSynthesis.speak(utterance);
    } else {
      alert(
        currentLanguage === "ar"
          ? "عذراً، متصفحك لا يدعم النطق"
          : "Sorry, your browser doesn't support speech synthesis."
      );
    }
  };

  const speakText = () => playStatementAudio();
  const clearSentence = () => setSentenceWords([]);
  const removeWordFromSentence = (index) =>
    setSentenceWords((prev) => prev.filter((_, i) => i !== index));

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
      <Container className="d-flex align-items-center gap-3 mb-2 mt-3">
        <div className="d-flex align-items-center gap-2 flex-grow-1 p-1 rounded-3 shadow-sm bg-white border-dashed">
          <i
            className="bi bi-x-circle text-danger fs-5"
            onClick={clearSentence}
            style={{ cursor: "pointer" }}
            title={currentLanguage === "ar" ? "مسح الجملة" : "Clear sentence"}
          ></i>
          <div
            className="flex-grow-1"
            style={{
              minHeight: "60px",
              textAlign: isRTLMode ? "right" : "left",
              direction: isRTLMode ? "rtl" : "ltr",
            }}
          >
            {sentenceWords.length > 0 ? (
              <div className="d-flex flex-wrap gap-2 align-items-center">
                {sentenceWords.map((word, index) => {
                  const card = boardData.cards.find((card) => getCardTitle(card) === word);
                  return (
                    <div
                      key={index}
                      className="d-flex flex-column align-items-center position-relative"
                      style={{ minWidth: "60px", maxWidth: "80px" }}
                    >
                      <div
                        className="bg-light rounded-2 p-2 d-flex align-items-center justify-content-center"
                        style={{ width: "40px", height: "40px", cursor: "pointer" }}
                        onClick={() => removeWordFromSentence(index)}
                        title={currentLanguage === "ar" ? "حذف الكلمة" : "Delete word"}
                      >
                        {card?.image ? (
                          <img
                            src={`http://localhost:8000${card.image}`}
                            alt={word}
                            style={{
                              width: "32px",
                              height: "32px",
                              objectFit: "cover",
                              borderRadius: "50%",
                              border: "1px solid #ccc",
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
              <div className="text-muted mt-3">
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

      <div className="cards-wrapper p-3 marg">
        {getCardsToDisplay().map((card, idx) => (
          <div key={card.id || idx} className="card-item" onClick={() => handleCardClick(card)}>
            <div className="emoji-image-wrapper">
              {card.image ? (
                <img
                  src={`http://localhost:8000/${card.image}`}
                  alt={getCardTitle(card)}
                  className="img-fluid"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              ) : (
                <span className="fallback-icon">📄</span>
              )}
            </div>
            <small className="emoji-title">{getCardTitle(card)}</small>
          </div>
        ))}
      </div>

      <div
        className="category-bar bg-white py-2 border-top shadow-sm fixed-bottom"
        style={{ zIndex: 1050 }}
      >
        <div className="container">
          <div
            className="d-flex gap-2 justify-content-center"
            style={{ overflowX: "auto", whiteSpace: "nowrap" }}
          >
            <div
              className={`category-btn ${activeCategory === null ? "active" : ""}`}
              onClick={() => setActiveCategory(null)}
              title={currentLanguage === "ar" ? "الكل" : "All"}
            >
              <div className="category-img">📁</div>
              <div style={{ fontSize: "0.85rem" }}>All</div>
            </div>

            {boardData.categories.map((category) => (
              <div
                key={category.id}
                className={`category-btn ${activeCategory?.id === category.id ? "active" : ""}`}
                onClick={() => setActiveCategory(category)}
                title={getCategoryName(category)}
              >
                <div className="category-img">
                  {category.image ? (
                    <img
                      src={`http://localhost:8000/${category.image}`}
                      alt={getCategoryName(category)}
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    "📁"
                  )}
                </div>
                <div className="text-truncate" style={{ fontSize: "0.85rem", maxWidth: "80px" }}>
                  {getCategoryName(category)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
                  padding: "10px 30px",
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
              onClick={verifyPin}
              disabled={!password.trim()}
            >
              🔓 {currentLanguage === "ar" ? "فتح" : "Unlock"}
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

      {showSidebar && <Menu setShowSidebar={setShowSidebar} />}
    </div>
  );
};

export default Board;
