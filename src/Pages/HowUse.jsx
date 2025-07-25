import React from "react";
import "../Style-pages/HowUse.css";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

const HowUse = () => {
  return (
    <>
      <div id="root">
        <Header />

        <div className="main-content">
          <div
            className="howuse-wrapper"
            style={{ backgroundColor: "#f9fbff", marginBottom: "100px" }}
          >
            <div className=" text-center">
              <div className="howuse-header-section">
                <h2 className="howuse-title mb-5" style={{ fontWeight: "700", color: "#173067" }}>
                  تعليم الطفل استخدام نظام بيكس على الشاشة
                </h2>

                <div className="howuse-section text-center mb-4">
                  <p>
                    بيكس (نظام التواصل بتبادل الصور) هو أداة بصرية لمساعدة الأطفال على التعبير عن
                    احتياجاتهم باستخدام الصور. في النسخة الإلكترونية، تُعرض الصور على شاشة (جهاز
                    لوحي/هاتف محمول/جهاز تفاعلي)، ويتعلم الطفل الضغط على الصورة الصحيحة للسؤال أو
                    التواصل.
                  </p>
                  <p>
                    يُقسّم التدريب إلى مراحل واضحة ومتدرجة لتناسب قدرات الطفل وتدعم تقدمه المستمر.
                  </p>
                </div>
              </div>

              {/* Stages */}
              <div className="howuse-stages container mt-5">
                {/* Stage 1 */}
                <div className="stage mb-5" data-step="1">
                  <h4 className="text-primary fw-bold">المرحلة ١: الضغط على الصورة لطلب شيء</h4>
                  <p>
                    <strong>الهدف:</strong> يتعلم الطفل أن الضغط على صورة الشيء الذي يريده يعني
                    الحصول عليه فورًا.
                  </p>
                  <ul>
                    <li>
                      اعرض صورة واحدة على الشاشة لشيء يحبه الطفل حقًا (مثل: عصير، لعبة، بسكويت).
                    </li>
                    <li>
                      عندما يمد الطفل يده إلى الشيء الحقيقي، وجّهه للضغط على الصورة على الشاشة.
                    </li>
                    <li>بمجرد الضغط على الصورة الصحيحة، أعطه الشيء.</li>
                    <li>كرر العملية حتى يبدأ الطفل بالضغط على الصورة بشكل مستقل.</li>
                  </ul>
                  <div className="row">
                    <img src="/14.png" alt="Stage 1" className="stage-image mb-3" />
                    <img src="/13.png" alt="Stage 1" className="stage-image mb-3" />
                    <img src="/17.png" alt="Stage 1" className="stage-image mb-3" />
                  </div>
                </div>

                {/* Stage 2 */}
                <div className="stage mb-5" data-step="2">
                  <h4 className="text-primary fw-bold">المرحلة الثانية: التحرك نحو الشاشة</h4>
                  <p>
                    <strong>الهدف:</strong> يتعلم الطفل التوجه إلى الشاشة بمفرده عندما يرغب في شيء
                    ما.
                  </p>
                  <ul>
                    <li>ضع الجهاز بالقرب من الطفل.</li>
                    <li>ساعده على المشي نحو الشاشة والضغط على الصورة عندما يرغب في شيء ما.</li>
                    <li>زد المسافة تدريجيًا لتشجيعه على الحركة المستقلة.</li>
                  </ul>
                </div>

                {/* Stage 3 */}
                <div className="stage mb-5" data-step="3">
                  <h4 className="text-primary fw-bold">المرحلة الثالثة: الاختيار بين الصور</h4>
                  <p>
                    <strong>الهدف:</strong> يتعلم الطفل اختيار الصورة الصحيحة من بين خيارات متعددة.
                  </p>
                  <p>تتكون هذه المرحلة من ثلاثة مستويات:</p>
                  <ul>
                    <li>
                      <strong>المستوى 1:</strong> اختر من بين صورتين
                    </li>
                    <li>
                      <strong>المستوى 2:</strong> اختر من بين 3 صور
                    </li>
                    <li>
                      <strong>المستوى 3:</strong> اختر من بين 3 صور (الترتيب يختلف كل مرة)
                    </li>
                  </ul>
                  <p>
                    <strong>ملاحظات مهمة:</strong>
                  </p>
                  <ul>
                    <li>إذا اختار الطفل صورة خاطئة، أرشده بلطف وحاول مرة أخرى.</li>
                    <li>انتقل إلى المستوى التالي فقط عندما يكون الطفل مستعدًا.</li>
                  </ul>
                  <div className="row">
                    <img src="/16.png" alt="Stage 1" className="stage-image mb-3" />
                    <img src="/15.png" alt="Stage 1" className="stage-image mb-3" />
                    <img src="/12.png" alt="Stage 1" className="stage-image mb-3" />
                  </div>
                </div>

                {/* Stage 4 */}
                <div className="stage mb-5" data-step="4">
                  <h4 className="text-primary fw-bold">المرحلة الرابعة: بناء جملة بسيطة</h4>
                  <p>
                    <strong>الهدف:</strong> يتعلم الطفل بناء جملة باستخدام صورتين (مثال: "أريد + شيء
                    ما").
                  </p>
                  <ul>
                    <li>أضف زرًا أو صورةً مكتوبًا عليها "أريد" على الشاشة.</li>
                    <li>ساعد الطفل على الضغط على "أريد" أولًا، ثم على صورة العنصر.</li>
                    <li>إذا كانت الجملة صحيحة، فأعطِه العنصر فورًا.</li>
                  </ul>
                </div>

                {/* Stage 5 */}
                <div className="stage mb-5" data-step="5">
                  <h4 className="text-primary fw-bold">المرحلة الخامسة: الإجابة على سؤال</h4>
                  <p>
                    <strong>الهدف:</strong> أن يجيب الطفل على سؤال "ماذا تريد؟" باستخدام الشاشة.
                  </p>
                  <ul>
                    <li>اسأل: "ماذا تريد؟" بوضوح.</li>
                    <li>يستخدم الطفل الشاشة للضغط على "أريد + عنصر".</li>
                    <li>أعطِ العنصر إذا كان صحيحًا. ساعده برفق إذا لزم الأمر.</li>
                  </ul>
                </div>

                {/* Stage 6 */}
                <div className="stage mb-5" data-step="6">
                  <h4 className="text-primary fw-bold">المرحلة السادسة: التعليق أو الوصف</h4>
                  <p>
                    <strong>الهدف:</strong> يتعلم الطفل استخدام الشاشة ليس فقط لطلب الأشياء، بل للتعليق عليها أيضًا.
                  </p>
                  <ul>
                    <li>أضف خيارات مثل "أرى" أو "أنظر" مع صور للأشياء.</li>
                    <li>عندما يرى شيئًا مثيرًا للاهتمام، ساعده على اختيار "أرى + عنصر".</li>
                    <li>امدحه بكلمات لطيفة وابتسامات، حتى لو لم يُعطَ أي عنصر.</li>
                  </ul>
                  <img src="/10.png" alt="Stage 1" className="stage-image mb-3" />
                </div>
                <div className="start-learning text-center mt-4">
                  <p className="mb-3 fw-bold" style={{ color: "#173067", fontSize: "1.2rem" }}>
                    هل أنت مستعد للبدء؟
                  </p>
                  <a href="/how-to-use/categories" className="btn btn-primary start-learning-btn">
                    ابدأ التعلم
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
