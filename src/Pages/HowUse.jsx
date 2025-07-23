import React from "react";
import "../Style-pages/HowUse.css";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

const HowUse = () => {
  return (
    <>
      <div id="root">
        {/* Header Section */}
        <Header />

        <div className="main-content">
          <div
            className="howuse-wrapper"
            style={{ backgroundColor: "#f9fbff", marginBottom: "100px" }}
          >
            <div className=" text-center">
              <div className="howuse-header-section">
                <h2 className="howuse-title mb-5" style={{ fontWeight: "700", color: "#173067" }}>
                  Teaching a Child to Use the PECS System on a Screen
                </h2>

                <div className="howuse-section text-start mb-4">
                  <p>
                    PECS (Picture Exchange Communication System) is a visual tool to help children
                    express their needs using pictures. In the electronic version, pictures are
                    displayed on a screen (tablet/mobile/interactive device), and the child learns
                    to press the right picture to ask or communicate.
                  </p>
                  <p>
                    The training is divided into clear, step-by-step stages to suit the child’s
                    abilities and support steady progress.
                  </p>
                </div>
              </div>

              {/* Stages */}
              <div className="howuse-stages container mt-5">
                {/* Stage 1 */}
                <div className="stage mb-5" data-step="1">
                  <h4 className="text-primary fw-bold">
                    Stage 1: Pressing the Picture to Ask for Something
                  </h4>
                  <p>
                    <strong>Goal:</strong> The child learns that pressing the picture of something
                    they want = they get it immediately.
                  </p>
                  <ul>
                    <li>
                      Show one picture on the screen of something the child really likes (e.g.,
                      juice, toy, biscuit).
                    </li>
                    <li>
                      When the child reaches for the real item, guide them to press the picture on
                      the screen instead.
                    </li>
                    <li>As soon as they press the correct picture → give them the item.</li>
                    <li>Repeat until the child starts pressing the picture independently.</li>
                  </ul>
                  <div className="row">
                    <img src="/14.png" alt="Stage 1" className="stage-image mb-3" />
                    <img src="/13.png" alt="Stage 1" className="stage-image mb-3" />
                    <img src="/17.png" alt="Stage 1" className="stage-image mb-3" />
                  </div>
                </div>

                {/* Stage 2 */}
                <div className="stage mb-5" data-step="2">
                  <h4 className="text-primary fw-bold">Stage 2: Moving Towards the Screen</h4>
                  <p>
                    <strong>Goal:</strong> The child learns to go to the screen on their own when
                    they want something.
                  </p>
                  <ul>
                    <li>Place the device near the child.</li>
                    <li>
                      Help them walk to the screen and press the picture when they want something.
                    </li>
                    <li>Gradually increase the distance to encourage independent movement.</li>
                  </ul>
                </div>

                {/* Stage 3 */}
                <div className="stage mb-5" data-step="3">
                  <h4 className="text-primary fw-bold">Stage 3: Choosing Between Pictures</h4>
                  <p>
                    <strong>Goal:</strong> The child learns to pick the correct picture from
                    multiple options.
                  </p>
                  <p>This stage has 3 levels:</p>
                  <ul>
                    <li>
                      <strong>Level 1:</strong> Choose from 2 pictures
                    </li>
                    <li>
                      <strong>Level 2:</strong> Choose from 3 pictures
                    </li>
                    <li>
                      <strong>Level 3:</strong> Choose from 4 pictures (change order each time)
                    </li>
                  </ul>
                  <p>
                    <strong>Important Notes:</strong>
                  </p>
                  <ul>
                    <li>If the child picks the wrong picture, gently guide and retry.</li>
                    <li>Move to the next level only when the child is ready.</li>
                  </ul>
                  <div className="row">
                    <img src="/16.png" alt="Stage 1" className="stage-image mb-3" />
                    <img src="/15.png" alt="Stage 1" className="stage-image mb-3" />
                    <img src="/12.png" alt="Stage 1" className="stage-image mb-3" />
                  </div>
                </div>

                {/* Stage 4 */}
                <div className="stage mb-5" data-step="4">
                  <h4 className="text-primary fw-bold">Stage 4: Building a Simple Sentence</h4>
                  <p>
                    <strong>Goal:</strong> The child learns to build a sentence using two pictures
                    (e.g., “I want + item”).
                  </p>
                  <ul>
                    <li>Add a button or picture that says “I want” on the screen.</li>
                    <li>Help the child press “I want” first, then the item picture.</li>
                    <li>If the sentence is correct → give the item immediately.</li>
                  </ul>
                </div>

                {/* Stage 5 */}
                <div className="stage mb-5" data-step="5">
                  <h4 className="text-primary fw-bold">Stage 5: Answering a Question</h4>
                  <p>
                    <strong>Goal:</strong> The child can answer “What do you want?” using the
                    screen.
                  </p>
                  <ul>
                    <li>Ask: “What do you want?” clearly.</li>
                    <li>Child uses screen to press “I want + item”.</li>
                    <li>Give the item if correct. Help gently if needed.</li>
                  </ul>
                </div>

                {/* Stage 6 */}
                <div className="stage mb-5" data-step="6">
                  <h4 className="text-primary fw-bold">Stage 6: Commenting or Describing</h4>
                  <p>
                    <strong>Goal:</strong> The child learns to use the screen not only to ask for
                    things, but to comment on what they see.
                  </p>
                  <ul>
                    <li>Add options like “I see” or “Look” with pictures of objects.</li>
                    <li>When they see something interesting, help them choose “I see + item”.</li>
                    <li>Praise with kind words and smiles, even if no item is given.</li>
                  </ul>
                  <img src="/10.png" alt="Stage 1" className="stage-image mb-3" />
                </div>
                <div className="start-learning text-center mt-4">
                  <p className="mb-3 fw-bold" style={{ color: "#173067", fontSize: "1.2rem" }}>
                    Ready to get started?
                  </p>
                  <a href="/cat" className="btn btn-primary start-learning-btn">
                    Start Learning
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default HowUse;
