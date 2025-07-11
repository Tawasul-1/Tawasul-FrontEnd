import "../Style-pages/Board.css";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Board() {
  return (
    <>
      <header className="header-bar">
        <h2 className="m-0">Tawasul</h2>
        <div className="menu-icon">
          <Link to="/board-password">
            <button
              className="menu-icon"
              type="button"
              aria-label="Toggle menu"
              onClick={() => console.log("Menu clicked")}
            >
              ☰
            </button>
          </Link>
        </div>
      </header>

      <Container className="py-4">
        <div className="sentence-container mb-4">
          <div className="sentence-box-wrapper">
            <div
              className="sentence-box"
              contentEditable
              data-placeholder="Type your sentence here..."
            ></div>
            <span className="speaker-icon-inside">🔊</span>
          </div>
        </div>
      </Container>

      <Container className="my-4">
        <h4 className="section-title">😊 Feeling</h4>
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
          <div className="col">
            <div className="card pecs-card text-center">
              <div className="card-icon pt-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  fill="currentColor"
                  className="bi bi-emoji-heart-eyes"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M11.315 10.014a.5.5 0 0 1 .548.736A4.498 4.498 0 0 1 7.965 13a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .548-.736h.005l.017.005c.215.046.515.108.857.169.693.124 1.522.242 2.152.242.63 0 1.46-.118 2.152-.242a26.58 26.58 0 0 0 1.109-.224l.067-.015.017-.004.005-.002zM4.756 4.566c.763-1.424 4.02-.12.952 3.434-4.496-1.596-2.35-4.298-.952-3.434zm6.488 0c1.398-.864 3.544 1.838-.952 3.434-3.067-3.554.19-4.858.952-3.434z" />
                </svg>
              </div>
              <div className="card-body">
                <strong className="card-label">Love</strong>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Board;
