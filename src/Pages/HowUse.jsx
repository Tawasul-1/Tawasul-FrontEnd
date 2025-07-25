import React from "react";
import "../Style-pages/HowUse.css";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { useLanguage } from "../context/LanguageContext";

const HowUse = () => {
  const { currentLanguage, isRTL } = useLanguage();

  // Complete translations object
  const content = {
    en: {
      title: "🧩 Teaching a Child to Use the PECS System on a Screen",
      intro: [
        "PECS (Picture Exchange Communication System) is a visual tool to help children express their needs using pictures. In the electronic version, pictures are displayed on a screen (tablet/mobile/interactive device), and the child learns to press the right picture to ask or communicate.",
        "The training is divided into clear, step-by-step stages to suit the child's abilities and support steady progress."
      ],
      stages: [
        {
          title: "Stage 1: Pressing the Picture to Ask for Something",
          goal: "Goal: The child learns that pressing the picture of something they want = they get it immediately.",
          steps: [
            "Show one picture on the screen of something the child really likes (e.g., juice, toy, biscuit).",
            "When the child reaches for the real item, guide them to press the picture on the screen instead.",
            "As soon as they press the correct picture → give them the item.",
            "Repeat until the child starts pressing the picture independently."
          ],
          images: ["/14.png", "/13.png", "/17.png"]
        },
        {
          title: "Stage 2: Moving Towards the Screen",
          goal: "Goal: The child learns to go to the screen on their own when they want something.",
          steps: [
            "Place the device near the child.",
            "Help them walk to the screen and press the picture when they want something.",
            "Gradually increase the distance to encourage independent movement."
          ]
        },
        {
          title: "Stage 3: Choosing Between Pictures",
          goal: "Goal: The child learns to pick the correct picture from multiple options.",
          description: "This stage has 3 levels in the program:",
          levels: [
            "Level 1: Choose from 2 pictures (one correct, one distractor)",
            "Level 2: Choose from 3 similar pictures",
            "Level 3: Choose from 4 pictures (order changes each time)"
          ],
          notes: [
            "If the child picks the wrong picture, gently guide them and try again.",
            "Move to the next level only when the child is ready.",
            "Goal: Develop strong visual discrimination and focus."
          ],
          images: ["/16.png", "/15.png", "/12.png"]
        },
        {
          title: "Stage 4: Building a Simple Sentence",
          goal: "Goal: The child learns to build a sentence using two pictures (e.g., 'I want + item').",
          steps: [
            "Add a button or picture that says 'I want' on the screen.",
            "Help the child press 'I want' first, then the picture of the item.",
            "If the sentence is correct → give the item immediately."
          ]
        },
        {
          title: "Stage 5: Answering a Question",
          goal: "Goal: The child can answer the question 'What do you want?' using the screen.",
          steps: [
            "Ask clearly: 'What do you want?'",
            "The child uses the screen to press 'I want + item'.",
            "If correct → give the item.",
            "If they need help, support them with gentle physical or verbal guidance."
          ]
        },
        {
          title: "Stage 6: Commenting or Describing",
          goal: "Goal: The child learns to use the screen not only to ask for things, but also to comment on what they see.",
          steps: [
            "Add options like 'I see' or 'Look' with pictures of things around them (e.g., cat, car, balloon).",
            "When the child sees something interesting, help them choose 'I see + item'.",
            "Praise them with kind words and smiles, even if no item is given."
          ],
          images: ["/10.png"]
        }
      ],
      readyText: "Are you ready to start?",
      startButton: "Start Learning"
    },
    ar: {
      title: "تعليم الطفل استخدام نظام بيكس على الشاشة",
      intro: [
        "بيكس (نظام التواصل بتبادل الصور) هو أداة بصرية لمساعدة الأطفال على التعبير عن احتياجاتهم باستخدام الصور. في النسخة الإلكترونية، تُعرض الصور على شاشة (جهاز لوحي/هاتف محمول/جهاز تفاعلي)، ويتعلم الطفل الضغط على الصورة الصحيحة للسؤال أو التواصل.",
        "يُقسّم التدريب إلى مراحل واضحة ومتدرجة لتناسب قدرات الطفل وتدعم تقدمه المستمر."
      ],
      stages: [
        {
          title: "المرحلة ١: الضغط على الصورة لطلب شيء",
          goal: "الهدف: يتعلم الطفل أن الضغط على صورة الشيء الذي يريده يعني الحصول عليه فورًا.",
          steps: [
            "اعرض صورة واحدة على الشاشة لشيء يحبه الطفل حقًا (مثل: عصير، لعبة، بسكويت).",
            "عندما يمد الطفل يده إلى الشيء الحقيقي، وجّهه للضغط على الصورة على الشاشة.",
            "بمجرد الضغط على الصورة الصحيحة، أعطه الشيء.",
            "كرر العملية حتى يبدأ الطفل بالضغط على الصورة بشكل مستقل."
          ],
          images: ["/14.png", "/13.png", "/17.png"]
        },
        {
          title: "المرحلة الثانية: التحرك نحو الشاشة",
          goal: "الهدف: يتعلم الطفل التوجه إلى الشاشة بمفرده عندما يرغب في شيء ما.",
          steps: [
            "ضع الجهاز بالقرب من الطفل.",
            "ساعده على المشي نحو الشاشة والضغط على الصورة عندما يرغب في شيء ما.",
            "زد المسافة تدريجيًا لتشجيعه على الحركة المستقلة."
          ]
        },
        {
          title: "المرحلة الثالثة: الاختيار بين الصور",
          goal: "الهدف: يتعلم الطفل اختيار الصورة الصحيحة من بين خيارات متعددة.",
          description: "تتكون هذه المرحلة من ثلاثة مستويات في البرنامج:",
          levels: [
            "المستوى 1: اختر من بين صورتين (واحدة صحيحة والأخرى مشتتة)",
            "المستوى 2: اختر من بين 3 صور متشابهة",
            "المستوى 3: اختر من بين 4 صور (يتغير الترتيب في كل مرة)"
          ],
          notes: [
            "إذا اختار الطفل صورة خاطئة، أرشده بلطف وحاول مرة أخرى.",
            "انتقل إلى المستوى التالي فقط عندما يكون الطفل مستعدًا.",
            "الهدف: تنمية التمييز البصري والقدرة على التركيز."
          ],
          images: ["/16.png", "/15.png", "/12.png"]
        },
        {
          title: "المرحلة الرابعة: بناء جملة بسيطة",
          goal: "الهدف: يتعلم الطفل بناء جملة باستخدام صورتين (مثال: 'أريد + شيء ما').",
          steps: [
            "أضف زرًا أو صورةً مكتوبًا عليها 'أريد' على الشاشة.",
            "ساعد الطفل على الضغط على 'أريد' أولًا، ثم على صورة العنصر.",
            "إذا كانت الجملة صحيحة، فأعطِه العنصر فورًا."
          ]
        },
        {
          title: "المرحلة الخامسة: الإجابة على سؤال",
          goal: "الهدف: أن يجيب الطفل على سؤال 'ماذا تريد؟' باستخدام الشاشة.",
          steps: [
            "اسأل: 'ماذا تريد؟' بوضوح.",
            "يستخدم الطفل الشاشة للضغط على 'أريد + عنصر'.",
            "أعطِ العنصر إذا كان صحيحًا. ساعده برفق إذا لزم الأمر."
          ]
        },
        {
          title: "المرحلة السادسة: التعليق أو الوصف",
          goal: "الهدف: يتعلم الطفل استخدام الشاشة ليس فقط لطلب الأشياء، بل للتعليق عليها أيضًا.",
          steps: [
            "أضف خيارات مثل 'أرى' أو 'أنظر' مع صور لأشياء من البيئة (قطة، سيارة، بالونة...).",
            "عندما يرى شيئًا مثيرًا للاهتمام، ساعده على اختيار 'أرى + عنصر'.",
            "امدحه بكلمات لطيفة وابتسامات، حتى لو لم يُعطَ أي عنصر."
          ],
          images: ["/10.png"]
        }
      ],
      readyText: "هل أنت مستعد للبدء؟",
      startButton: "ابدأ التعلم"
    }
  };

  const langContent = content[currentLanguage] || content.en;

  return (
    <div id="root" dir={isRTL ? "rtl" : "ltr"}>
      <Header />

      <div className="main-content">
        <div className="howuse-wrapper" style={{ backgroundColor: "#f9fbff", marginBottom: "100px" }}>
          <div className="text-center">
            <div className="howuse-header-section">
              <h2 className="howuse-title mb-5" style={{ fontWeight: "700", color: "#173067" }}>
                {langContent.title}
              </h2>

              <div className="howuse-section text-center mb-4">
                {langContent.intro?.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="howuse-stages container mt-5">
              {langContent.stages?.map((stage, index) => (
                <div className="stage mb-5" data-step={index + 1} key={index}>
                  <h4 className="text-primary fw-bold">{stage.title}</h4>
                  <p><strong>{stage.goal}</strong></p>
                  
                  {stage.description && <p>{stage.description}</p>}
                  
                  {stage.steps?.length > 0 && (
                    <ul>
                      {stage.steps.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ul>
                  )}

                  {stage.levels?.length > 0 && (
                    <>
                      <ul>
                        {stage.levels.map((level, i) => (
                          <li key={i}><strong>{level}</strong></li>
                        ))}
                      </ul>
                    </>
                  )}

                  {stage.notes?.length > 0 && (
                    <>
                      <p><strong>{currentLanguage === 'en' ? 'Important Notes:' : 'ملاحظات مهمة:'}</strong></p>
                      <ul>
                        {stage.notes.map((note, i) => (
                          <li key={i}>{note}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  {stage.images?.length > 0 && (
                    <div className="row">
                      {stage.images.map((img, i) => (
                        <img 
                          src={img} 
                          alt={`Stage ${index + 1}`} 
                          className="stage-image mb-3" 
                          key={i}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="start-learning text-center mt-4">
                <p className="mb-3 fw-bold" style={{ color: "#173067", fontSize: "1.2rem" }}>
                  {langContent.readyText}
                </p>
                <a 
                  href="/how-to-use/categories" 
                  className="btn btn-primary start-learning-btn"
                  style={{ 
                    backgroundColor: "#173067",
                    border: "none",
                    padding: "0.5rem 1.5rem",
                    borderRadius: "20px"
                  }}
                >
                  {langContent.startButton}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HowUse;
