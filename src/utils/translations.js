/**
 * Translations for the TAWASUL app
 * Contains all text content in both English and Arabic
 */

import { getUserLanguage } from "./languageUtils";

export const translations = {
  // Navigation
  nav: {
    brand: { en: "Tawasul", ar: "تواصل" },
    home: { en: "Home", ar: "الرئيسية" },
    about: { en: "About", ar: "حول" },
    contact: { en: "Contact", ar: "اتصل بنا" },
    login: { en: "Login", ar: "تسجيل الدخول" },
    signup: { en: "Sign Up", ar: "إنشاء حساب" },
    logout: { en: "Sign Out", ar: "تسجيل الخروج" },
    profile: { en: "Profile", ar: "الملف الشخصي" },
    viewProfile: { en: "View Profile", ar: "عرض الملف الشخصي" },
    board: { en: "Board", ar: "اللوحة" },
    categories: { en: "Categories", ar: "الفئات" },
    settings: { en: "Settings", ar: "الإعدادات" },
    notifications: { en: "Notifications", ar: "الإشعارات" },
    noNotifications: { en: "No notifications", ar: "لا توجد إشعارات" },
    english: { en: "English", ar: "الإنجليزية" },
    arabic: { en: "Arabic", ar: "العربية" },
  },

  // Home Page
  home: {
    title: { en: "Welcome To TAWASUL", ar: "مرحباً بك في تواصل" },
    description: {
      en: "TAWASUL is an inclusive communication platform that empowers non-speaking individuals, especially children with autism, through visual tools like PECS.",
      ar: "تواصل هو منصة تواصل شاملة تمكن الأفراد غير الناطقين، خاصة الأطفال المصابين بالتوحد، من خلال الأدوات البصرية مثل PECS.",
    },
    readMore: { en: "Read More", ar: "اقرأ المزيد" },
    discoverTitle: { en: "🌟 Discover More with TAWASUL", ar: "🌟 اكتشف المزيد مع تواصل" },
    discoverSubtitle: {
      en: "Every interaction opens a new door to connection and discovery. Here's what makes us stand out:",
      ar: "كل تفاعل يفتح باباً جديداً للتواصل والاكتشاف. إليك ما يميزنا:",
    },
    visualMagic: { en: "Visual Magic", ar: "السحر البصري" },
    visualMagicDesc: {
      en: "Engaging visuals that resonate with kids and spark joyful learning.",
      ar: "صور جذابة تتناغم مع الأطفال وتشعل التعلم المبهج.",
    },
    seamlessAccess: { en: "Seamless Access", ar: "وصول سلس" },
    seamlessAccessDesc: {
      en: "Access your personalized board anywhere — on any device, at any time.",
      ar: "احصل على لوحتك المخصصة في أي مكان — على أي جهاز، في أي وقت.",
    },
    joyfulUX: { en: "Joyful UX", ar: "تجربة مستخدم مبهجة" },
    joyfulUXDesc: {
      en: "Kid-friendly design that brings smiles while empowering communication.",
      ar: "تصميم صديق للأطفال يجلب الابتسامات مع تمكين التواصل.",
    },
    howItWorks: { en: "How It Works", ar: "كيف يعمل" },
    howItWorksSubtitle: { en: "Just 3 simple steps to get started", ar: "3 خطوات بسيطة فقط للبدء" },
    createAccount: { en: "1. Create Account", ar: "1. إنشاء حساب" },
    createAccountDesc: {
      en: "Sign up and set up your profile quickly and easily.",
      ar: "سجل واعد ملفك الشخصي بسرعة وسهولة.",
    },
    buildBoard: { en: "2. Build Your Board", ar: "2. بناء لوحتك" },
    buildBoardDesc: {
      en: "Choose the PECS cards that suit your child's needs.",
      ar: "اختر بطاقات PECS التي تناسب احتياجات طفلك.",
    },
    startCommunicating: { en: "3. Start Communicating", ar: "3. ابدأ التواصل" },
    startCommunicatingDesc: {
      en: "Empower your child to express themselves visually.",
      ar: "مكن طفلك من التعبير عن نفسه بصرياً.",
    },
    learnMore: { en: "Learn More", ar: "اعرف المزيد" },
    categoriesTitle: { en: "Categories", ar: "الفئات" },
    categoriesSubtitle: { en: "Explore by interest", ar: "استكشف حسب الاهتمام" },
    viewAllCategories: { en: "View All Categories", ar: "عرض جميع الفئات" },
    boardTitle: { en: "Board", ar: "اللوحة" },
    boardSubtitle: { en: "Your smart communication panel", ar: "لوحة التواصل الذكية الخاصة بك" },
    tryNow: { en: "Try Now", ar: "جرب الآن" },
    whoBenefits: { en: "Who Benefits from TAWASUL?", ar: "من يستفيد من تواصل؟" },
    whoBenefitsDesc: {
      en: "TAWASUL is designed to support a wide range of people who work with non-speaking individuals.",
      ar: "تم تصميم تواصل لدعم مجموعة واسعة من الأشخاص الذين يعملون مع الأفراد غير الناطقين.",
    },
    parents: { en: "Parents", ar: "الآباء" },
    parentsDesc: {
      en: "Helping them understand their child's needs and communicate more easily.",
      ar: "مساعدتهم في فهم احتياجات طفلهم والتواصل بسهولة أكبر.",
    },
    psychologists: { en: "Psychologists", ar: "علماء النفس" },
    psychologistsDesc: {
      en: "Offering insights into behavior and aiding in emotional analysis.",
      ar: "تقديم رؤى حول السلوك والمساعدة في التحليل العاطفي.",
    },
    therapists: { en: "Therapists", ar: "المعالجون" },
    therapistsDesc: {
      en: "Supporting therapy sessions with engaging and personalized tools.",
      ar: "دعم جلسات العلاج بأدوات جذابة ومخصصة.",
    },
    nonSpeakingChildren: { en: "Non-speaking Children", ar: "الأطفال غير الناطقين" },
    nonSpeakingChildrenDesc: {
      en: "Empowering them to express themselves and connect with the world.",
      ar: "تمكينهم من التعبير عن أنفسهم والتواصل مع العالم.",
    },
    readyToUnlock: { en: "Ready to Unlock More?", ar: "هل أنت مستعد لفتح المزيد؟" },
    readyToUnlockDesc: {
      en: "Upgrade your experience with TAWASUL by exploring our flexible subscription plans designed to fit your needs — whether you're a parent, therapist, or educator.",
      ar: "ارتق بتجربتك مع تواصل من خلال استكشاف خطط الاشتراك المرنة المصممة لتناسب احتياجاتك — سواء كنت أحد الوالدين أو معالج أو معلم.",
    },
    viewPlans: { en: "View Plans", ar: "عرض الخطط" },
    testimonials: { en: "Testimonials", ar: "شهادات" },
    testimonialsHeader: { en: "What Parents Say", ar: "ماذا يقول الأهالي" },
    testimonialDetails: {
      maha: {
        en: "TAWASUL gave my child a voice we thought we'd never hear. It's more than an app — it's a lifeline for communication.",
        ar: "أعطى تواصل لطفلي صوتاً لم نعتقد أننا سنسمعه أبداً. إنه أكثر من تطبيق — إنه شريان الحياة للتواصل.",
      },
      omar: {
        en: "Thanks to TAWASUL, my son can finally express his needs and feelings. It's made a world of difference for our family.",
        ar: "بفضل تواصل، يمكن لابني أخيراً التعبير عن احتياجاته ومشاعره. لقد أحدث فرقاً كبيراً لعائلتنا.",
      },
    },
    stats: {
      sentences: { en: "Sentences", ar: "جمل" },
      users: { en: "Users", ar: "مستخدمين" },
      pecsCards: { en: "PECS Cards", ar: "بطاقات PECS" },
    },
  },

  // Authentication
  auth: {
    loginTitle: { en: "Login to your account", ar: "تسجيل الدخول إلى حسابك" },
    email: { en: "Email", ar: "البريد الإلكتروني" },
    password: { en: "Password", ar: "كلمة المرور" },
    login: { en: "Log In", ar: "تسجيل الدخول" },
    loggingIn: { en: "Logging In...", ar: "جاري تسجيل الدخول..." },
    noAccount: { en: "Don't have an account?", ar: "ليس لديك حساب؟" },
    signUp: { en: "Sign Up", ar: "إنشاء حساب" },
    signupTitle: { en: "Welcome to Tawasul", ar: "مرحباً بك في تواصل" },
    confirmPassword: { en: "Confirm Password", ar: "تأكيد كلمة المرور" },
    signingUp: { en: "Creating Account...", ar: "جاري إنشاء الحساب..." },
    haveAccount: { en: "Already have an account?", ar: "لديك حساب بالفعل؟" },
    signIn: { en: "Sign In", ar: "تسجيل الدخول" },
    forgotPassword: { en: "Forgot Password?", ar: "نسيت كلمة المرور؟" },
    resetPassword: { en: "Reset Password", ar: "إعادة تعيين كلمة المرور" },
    newPassword: { en: "New Password", ar: "كلمة مرور جديدة" },
    confirmNewPassword: { en: "Confirm New Password", ar: "تأكيد كلمة المرور الجديدة" },
    changePassword: { en: "Change Password", ar: "تغيير كلمة المرور" },
    emailVerification: { en: "Email Verification", ar: "التحقق من البريد الإلكتروني" },
    verifyEmail: { en: "Verify Email", ar: "التحقق من البريد الإلكتروني" },
    resendCode: { en: "Resend Code", ar: "إعادة إرسال الرمز" },
    pleaseLogin: {
      en: "Please log in to access the requested page.",
      ar: "يرجى تسجيل الدخول للوصول إلى الصفحة المطلوبة.",
    },
    firstName: { en: "Enter first name", ar: "أدخل الاسم الأول" },
    lastName: { en: "Enter last name", ar: "أدخل اسم العائلة" },
    phone: { en: "Enter phone number", ar: "أدخل رقم الهاتف" },
    birthdate: { en: "Enter birthdate", ar: "أدخل تاريخ الميلاد" },
    sendResetEmail: { en: "Send Reset Email", ar: "إرسال بريد إعادة التعيين" },
    sending: { en: "Sending...", ar: "جاري الإرسال..." },
    resetting: { en: "Resetting...", ar: "جاري إعادة التعيين..." },
    newPasswordDesc: {
      en: "Please enter your new password below.",
      ar: "يرجى إدخال كلمة المرور الجديدة أدناه.",
    },
    backToLogin: { en: "Back to Login", ar: "العودة لتسجيل الدخول" },
  },

  // Form Validation
  validation: {
    emailRequired: { en: "Email is required", ar: "البريد الإلكتروني مطلوب" },
    invalidEmail: { en: "Invalid email format", ar: "صيغة البريد الإلكتروني غير صحيحة" },
    passwordRequired: { en: "Password is required", ar: "كلمة المرور مطلوبة" },
    confirmPasswordRequired: { en: "Please confirm your password", ar: "يرجى تأكيد كلمة المرور" },
    passwordsDoNotMatch: { en: "Passwords do not match", ar: "كلمات المرور غير متطابقة" },
    passwordTooShort: {
      en: "Password must be at least 6 characters",
      ar: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
    },
    nameRequired: { en: "Name is required", ar: "الاسم مطلوب" },
    phoneRequired: { en: "Phone number is required", ar: "رقم الهاتف مطلوب" },
    invalidPhone: { en: "Invalid phone number format", ar: "صيغة رقم الهاتف غير صحيحة" },
    firstNameRequired: { en: "First name is required", ar: "الاسم الأول مطلوب" },
    firstNameTooShort: {
      en: "First name must be at least 2 characters",
      ar: "الاسم الأول يجب أن يكون حرفين على الأقل",
    },
    lastNameRequired: { en: "Last name is required", ar: "اسم العائلة مطلوب" },
    lastNameTooShort: {
      en: "Last name must be at least 2 characters",
      ar: "اسم العائلة يجب أن يكون حرفين على الأقل",
    },
    birthdateRequired: { en: "Birthdate is required", ar: "تاريخ الميلاد مطلوب" },
    invalidAge: {
      en: "Age must be between 1 and 120 years",
      ar: "العمر يجب أن يكون بين 1 و 120 سنة",
    },
    profileImageRequired: { en: "Profile image is required", ar: "صورة الملف الشخصي مطلوبة" },
    imageSizeTooLarge: {
      en: "Image size must be less than 5MB",
      ar: "حجم الصورة يجب أن يكون أقل من 5 ميجابايت",
    },
  },

  // Common Actions
  actions: {
    save: { en: "Save", ar: "حفظ" },
    cancel: { en: "Cancel", ar: "إلغاء" },
    edit: { en: "Edit", ar: "تعديل" },
    delete: { en: "Delete", ar: "حذف" },
    add: { en: "Add", ar: "إضافة" },
    remove: { en: "Remove", ar: "إزالة" },
    update: { en: "Update", ar: "تحديث" },
    submit: { en: "Submit", ar: "إرسال" },
    back: { en: "Back", ar: "رجوع" },
    next: { en: "Next", ar: "التالي" },
    previous: { en: "Previous", ar: "السابق" },
    close: { en: "Close", ar: "إغلاق" },
    open: { en: "Open", ar: "فتح" },
    search: { en: "Search", ar: "بحث" },
    filter: { en: "Filter", ar: "تصفية" },
    sort: { en: "Sort", ar: "ترتيب" },
    view: { en: "View", ar: "عرض" },
    download: { en: "Download", ar: "تحميل" },
    upload: { en: "Upload", ar: "رفع" },
    share: { en: "Share", ar: "مشاركة" },
    print: { en: "Print", ar: "طباعة" },
    export: { en: "Export", ar: "تصدير" },
    import: { en: "Import", ar: "استيراد" },
    refresh: { en: "Refresh", ar: "تحديث" },
    loading: { en: "Loading...", ar: "جاري التحميل..." },
    tryAgain: { en: "Try Again", ar: "حاول مرة أخرى" },
    error: { en: "Error", ar: "خطأ" },
    success: { en: "Success", ar: "نجح" },
    warning: { en: "Warning", ar: "تحذير" },
    info: { en: "Information", ar: "معلومات" },
  },

  // Categories
  categories: {
    feelings: { en: "Feelings", ar: "المشاعر" },
    toys: { en: "Toys", ar: "الألعاب" },
    food: { en: "Food", ar: "الطعام" },
    actions: { en: "Actions", ar: "الأفعال" },
    people: { en: "People", ar: "الأشخاص" },
    animals: { en: "Animals", ar: "الحيوانات" },
    places: { en: "Places", ar: "الأماكن" },
    objects: { en: "Objects", ar: "الأشياء" },
    colors: { en: "Colors", ar: "الألوان" },
    numbers: { en: "Numbers", ar: "الأرقام" },
    letters: { en: "Letters", ar: "الحروف" },
    body: { en: "Body Parts", ar: "أجزاء الجسم" },
    clothing: { en: "Clothing", ar: "الملابس" },
    transportation: { en: "Transportation", ar: "المواصلات" },
    weather: { en: "Weather", ar: "الطقس" },
    time: { en: "Time", ar: "الوقت" },
    family: { en: "Family", ar: "العائلة" },
    school: { en: "School", ar: "المدرسة" },
    home: { en: "Home", ar: "المنزل" },
    work: { en: "Work", ar: "العمل" },
    hobbies: { en: "Hobbies", ar: "الهوايات" },
    sports: { en: "Sports", ar: "الرياضة" },
    music: { en: "Music", ar: "الموسيقى" },
    art: { en: "Art", ar: "الفن" },
    books: { en: "Books", ar: "الكتب" },
    technology: { en: "Technology", ar: "التكنولوجيا" },
    nature: { en: "Nature", ar: "الطبيعة" },
    emotions: { en: "Emotions", ar: "العواطف" },
    social: { en: "Social", ar: "الاجتماعي" },
    health: { en: "Health", ar: "الصحة" },
    safety: { en: "Safety", ar: "الأمان" },
    emergency: { en: "Emergency", ar: "الطوارئ" },
  },

  // Board
  board: {
    title: { en: "Communication Board", ar: "لوحة التواصل" },
    emptyBoard: { en: "Your board is empty", ar: "لوحتك فارغة" },
    addCards: { en: "Add some cards to get started", ar: "أضف بعض البطاقات للبدء" },
    addCard: { en: "Add Card", ar: "إضافة بطاقة" },
    removeCard: { en: "Remove Card", ar: "إزالة البطاقة" },
    clearBoard: { en: "Clear Board", ar: "مسح اللوحة" },
    saveBoard: { en: "Save Board", ar: "حفظ اللوحة" },
    loadBoard: { en: "Load Board", ar: "تحميل اللوحة" },
    boardName: { en: "Board Name", ar: "اسم اللوحة" },
    createBoard: { en: "Create Board", ar: "إنشاء لوحة" },
    editBoard: { en: "Edit Board", ar: "تعديل اللوحة" },
    deleteBoard: { en: "Delete Board", ar: "حذف اللوحة" },
    shareBoard: { en: "Share Board", ar: "مشاركة اللوحة" },
    exportBoard: { en: "Export Board", ar: "تصدير اللوحة" },
    importBoard: { en: "Import Board", ar: "استيراد اللوحة" },
    boardSettings: { en: "Board Settings", ar: "إعدادات اللوحة" },
    cardSize: { en: "Card Size", ar: "حجم البطاقة" },
    gridSize: { en: "Grid Size", ar: "حجم الشبكة" },
    backgroundColor: { en: "Background Color", ar: "لون الخلفية" },
    textColor: { en: "Text Color", ar: "لون النص" },
    fontSize: { en: "Font Size", ar: "حجم الخط" },
    showLabels: { en: "Show Labels", ar: "إظهار التسميات" },
    hideLabels: { en: "Hide Labels", ar: "إخفاء التسميات" },
    autoSave: { en: "Auto Save", ar: "حفظ تلقائي" },
    speechEnabled: { en: "Speech Enabled", ar: "تفعيل الكلام" },
    speechRate: { en: "Speech Rate", ar: "سرعة الكلام" },
    speechVolume: { en: "Speech Volume", ar: "مستوى الصوت" },
    speechVoice: { en: "Speech Voice", ar: "صوت الكلام" },
  },

  // Cards
  cards: {
    title: { en: "Cards", ar: "البطاقات" },
    addNewCard: { en: "Add New Card", ar: "إضافة بطاقة جديدة" },
    editCard: { en: "Edit Card", ar: "تعديل البطاقة" },
    deleteCard: { en: "Delete Card", ar: "حذف البطاقة" },
    cardName: { en: "Card Name", ar: "اسم البطاقة" },
    cardImage: { en: "Card Image", ar: "صورة البطاقة" },
    cardCategory: { en: "Card Category", ar: "فئة البطاقة" },
    cardText: { en: "Card Text", ar: "نص البطاقة" },
    cardAudio: { en: "Card Audio", ar: "صوت البطاقة" },
    uploadImage: { en: "Upload Image", ar: "رفع صورة" },
    uploadAudio: { en: "Upload Audio", ar: "رفع صوت" },
    recordAudio: { en: "Record Audio", ar: "تسجيل صوت" },
    playAudio: { en: "Play Audio", ar: "تشغيل الصوت" },
    stopAudio: { en: "Stop Audio", ar: "إيقاف الصوت" },
    cardSettings: { en: "Card Settings", ar: "إعدادات البطاقة" },
    cardSize: { en: "Card Size", ar: "حجم البطاقة" },
    cardColor: { en: "Card Color", ar: "لون البطاقة" },
    cardBorder: { en: "Card Border", ar: "حدود البطاقة" },
    cardShadow: { en: "Card Shadow", ar: "ظل البطاقة" },
    cardAnimation: { en: "Card Animation", ar: "حركة البطاقة" },
    cardSound: { en: "Card Sound", ar: "صوت البطاقة" },
    cardVibration: { en: "Card Vibration", ar: "اهتزاز البطاقة" },
    cardHighlight: { en: "Card Highlight", ar: "تمييز البطاقة" },
    cardGlow: { en: "Card Glow", ar: "توهج البطاقة" },
  },

  // Profile
  profile: {
    title: { en: "Profile", ar: "الملف الشخصي" },
    editProfile: { en: "Edit Profile", ar: "تعديل الملف الشخصي" },
    myCategories: { en: "My Categories", ar: "فئاتي" },
    cards: { en: "cards", ar: "بطاقات" },
    loadingCards: { en: "Loading cards...", ar: "جاري تحميل البطاقات..." },
    noCardsInCategory: {
      en: "No cards in this category yet.",
      ar: "لا توجد بطاقات في هذه الفئة بعد.",
    },
    user: { en: "User", ar: "مستخدم" },
    noPhone: { en: "No phone number", ar: "لا يوجد رقم هاتف" },
    noEmail: { en: "No email", ar: "لا يوجد بريد إلكتروني" },
    age: { en: "Age", ar: "العمر" },
    notSpecified: { en: "Not specified", ar: "غير محدد" },
    personalInfo: { en: "Personal Information", ar: "المعلومات الشخصية" },
    accountSettings: { en: "Account Settings", ar: "إعدادات الحساب" },
    preferences: { en: "Preferences", ar: "التفضيلات" },
    language: { en: "Language", ar: "اللغة" },
    theme: { en: "Theme", ar: "المظهر" },
    notifications: { en: "Notifications", ar: "الإشعارات" },
    privacy: { en: "Privacy", ar: "الخصوصية" },
    security: { en: "Security", ar: "الأمان" },
    help: { en: "Help", ar: "المساعدة" },
    about: { en: "About", ar: "حول" },
    logout: { en: "Logout", ar: "تسجيل الخروج" },
    firstName: { en: "First Name", ar: "الاسم الأول" },
    lastName: { en: "Last Name", ar: "اسم العائلة" },
    fullName: { en: "Full Name", ar: "الاسم الكامل" },
    email: { en: "Email", ar: "البريد الإلكتروني" },
    phone: { en: "Phone", ar: "الهاتف" },
    age: { en: "Age", ar: "العمر" },
    email: { en: "Email", ar: "البريد الإلكتروني" },
    address: { en: "Address", ar: "العنوان" },
    city: { en: "City", ar: "المدينة" },
    country: { en: "Country", ar: "البلد" },
    dateOfBirth: { en: "Date of Birth", ar: "تاريخ الميلاد" },
    gender: { en: "Gender", ar: "الجنس" },
    male: { en: "Male", ar: "ذكر" },
    female: { en: "Female", ar: "أنثى" },
    other: { en: "Other", ar: "آخر" },
    avatar: { en: "Avatar", ar: "الصورة الشخصية" },
    changeAvatar: { en: "Change Avatar", ar: "تغيير الصورة الشخصية" },
    uploadAvatar: { en: "Upload Avatar", ar: "رفع صورة شخصية" },
    removeAvatar: { en: "Remove Avatar", ar: "إزالة الصورة الشخصية" },
    // Subscription-related
    subscribed: { en: "You are subscribed.", ar: "أنت مشترك." },
    notSubscribed: { en: "You are not subscribed.", ar: "أنت غير مشترك." },
    upgrade: { en: "Upgrade / Subscribe", ar: "ترقية / اشتراك" },
    cancelSubscription: { en: "Cancel Subscription", ar: "إلغاء الاشتراك" },
    cancelSuccess: { en: "Subscription cancelled successfully.", ar: "تم إلغاء الاشتراك بنجاح." },
  },

  // About Page
  about: {
    title: { en: "About TAWASUL", ar: "حول تواصل" },
    header: { en: "About Us", ar: "من نحن" },
    mission: { en: "Our Mission", ar: "مهمتنا" },
    missionText: {
      en: "To empower non-speaking individuals, especially children with autism, by providing innovative communication tools that bridge the gap between expression and understanding.",
      ar: "تمكين الأفراد غير الناطقين، خاصة الأطفال المصابين بالتوحد، من خلال توفير أدوات تواصل مبتكرة تجسر الفجوة بين التعبير والفهم.",
    },
    vision: { en: "Our Vision", ar: "رؤيتنا" },
    visionText: {
      en: "A world where every individual has the tools and support they need to communicate effectively and be understood.",
      ar: "عالم حيث كل فرد لديه الأدوات والدعم الذي يحتاجه للتواصل بفعالية وأن يُفهم.",
    },
    values: { en: "Our Values", ar: "قيمنا" },
    inclusivity: { en: "Inclusivity", ar: "الشمولية" },
    inclusivityText: {
      en: "We believe in creating solutions that work for everyone, regardless of their communication abilities.",
      ar: "نؤمن بإنشاء حلول تعمل للجميع، بغض النظر عن قدراتهم التواصلية.",
    },
    innovation: { en: "Innovation", ar: "الابتكار" },
    innovationText: {
      en: "We continuously strive to develop cutting-edge technology that makes communication more accessible and effective.",
      ar: "نحن نسعى باستمرار لتطوير تقنية متطورة تجعل التواصل أكثر سهولة وفعالية.",
    },
    compassion: { en: "Compassion", ar: "الرحمة" },
    compassionText: {
      en: "We approach every challenge with empathy and understanding, putting the needs of our users first.",
      ar: "نحن نتعامل مع كل تحد بالتعاطف والفهم، ونضع احتياجات مستخدمينا في المقام الأول.",
    },
    team: { en: "Our Team", ar: "فريقنا" },
    teamText: {
      en: "Our diverse team of experts includes speech therapists, software developers, educators, and parents who understand the challenges of non-verbal communication.",
      ar: "فريقنا المتنوع من الخبراء يشمل معالجي النطق ومطوري البرمجيات والمعلمين والآباء الذين يفهمون تحديات التواصل غير اللفظي.",
    },
    brand: { en: "TawasuL", ar: "تواصل" },
    intro1: {
      en: "TawasuL is a visual communication platform designed to support non-speaking children, especially those with autism. It uses PECS-based tools to help them express needs, feelings, and thoughts with ease and confidence.",
      ar: "تواصل هو منصة تواصل بصرية تدعم الأطفال غير الناطقين، خاصة المصابين بالتوحد، باستخدام أدوات PECS لمساعدتهم على التعبير عن احتياجاتهم ومشاعرهم وأفكارهم بسهولة وثقة.",
    },
    intro2: {
      en: "Empowering every child to connect, communicate, and thrive.",
      ar: "تمكين كل طفل من التواصل والتعبير والازدهار.",
    },
    intro3: {
      en: "It’s simple, child-friendly, and designed with real therapeutic needs in mind.",
      ar: "إنه بسيط، صديق للأطفال، ومصمم وفق احتياجات علاجية حقيقية.",
    },
    intro4: {
      en: "Parents and educators can easily customize boards to fit each child’s journey.",
      ar: "يمكن للآباء والمعلمين تخصيص اللوحات بسهولة لتناسب رحلة كل طفل.",
    },
    intro5: {
      en: "With TawasuL, communication becomes a right—not a challenge.",
      ar: "مع تواصل، يصبح التواصل حقاً وليس تحدياً.",
    },
    testimonialsHeader: { en: "What Parents Say", ar: "ماذا يقول الأهالي" },
    testimonial1: {
      name: { en: "Maha Ahmad", ar: "مها أحمد" },
      text: {
        en: "TAWASUL gave my child a voice we thought we’d never hear. It’s more than an app — it’s a lifeline for communication.",
        ar: "تواصل أعطى طفلي صوتاً لم نكن نعتقد أننا سنسمعه أبداً. إنه أكثر من تطبيق — إنه شريان حياة للتواصل.",
      },
    },
    testimonial2: {
      name: { en: "Omar Khaled", ar: "عمر خالد" },
      text: {
        en: "Thanks to TAWASUL, my son can finally express his needs and feelings. It’s made a world of difference for our family.",
        ar: "بفضل تواصل، أصبح ابني قادراً أخيراً على التعبير عن احتياجاته ومشاعره. لقد أحدث فرقاً كبيراً لعائلتنا.",
      },
    },
    team1: { en: "Mohsen Thabet", ar: "محسن ثابت" },
    team2: { en: "Mohamed Fawzy", ar: "محمد فوزي" },
    team3: { en: "Mohamed ElKorany", ar: "محمد القرني" },
    team4: { en: "Youssef Shaaban", ar: "يوسف شعبان" },
    team5: { en: "Youmna Khalil", ar: "يمنى خليل" },
    team6: { en: "Yousef Abdelati", ar: "يوسف عبد العاطي" },
  },

  // Contact Page
  contact: {
    title: { en: "Contact Us", ar: "اتصل بنا" },
    subtitle: { en: "Get in touch with our team", ar: "تواصل مع فريقنا" },
    name: { en: "Name", ar: "الاسم" },
    email: { en: "Email", ar: "البريد الإلكتروني" },
    subject: { en: "Subject", ar: "الموضوع" },
    message: { en: "Message", ar: "الرسالة" },
    sendMessage: { en: "Send Message", ar: "إرسال الرسالة" },
    sending: { en: "Sending...", ar: "جاري الإرسال..." },
    contactInfo: { en: "Contact Information", ar: "معلومات الاتصال" },
    address: { en: "Address", ar: "العنوان" },
    phone: { en: "Phone", ar: "الهاتف" },
    workingHours: { en: "Working Hours", ar: "ساعات العمل" },
    monday: { en: "Monday", ar: "الاثنين" },
    tuesday: { en: "Tuesday", ar: "الثلاثاء" },
    wednesday: { en: "Wednesday", ar: "الأربعاء" },
    thursday: { en: "Thursday", ar: "الخميس" },
    friday: { en: "Friday", ar: "الجمعة" },
    saturday: { en: "Saturday", ar: "السبت" },
    sunday: { en: "Sunday", ar: "الأحد" },
    closed: { en: "Closed", ar: "مغلق" },
  },

  // Notifications
  notifications: {
    newMessage: { en: "You have a new message", ar: "لديك رسالة جديدة" },
    newCardAdded: { en: "New card added", ar: "تم إضافة بطاقة جديدة" },
    profileUpdated: { en: "Profile updated", ar: "تم تحديث الملف الشخصي" },
  },

  // Footer
  footer: {
    copyright: {
      en: "© 2025 TAWASUL. All rights reserved.",
      ar: "© 2025 تواصل. جميع الحقوق محفوظة.",
    },
    newsletter: { en: "News Letters", ar: "النشرة الإخبارية" },
    subscribe: { en: "Subscribe", ar: "اشتراك" },
    privacyPolicy: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
    termsOfService: { en: "Terms of Service", ar: "شروط الخدمة" },
    cookiePolicy: { en: "Cookie Policy", ar: "سياسة ملفات تعريف الارتباط" },
    accessibility: { en: "Accessibility", ar: "إمكانية الوصول" },
    support: { en: "Support", ar: "الدعم" },
    feedback: { en: "Feedback", ar: "التعليقات" },
    reportBug: { en: "Report a Bug", ar: "الإبلاغ عن خطأ" },
    featureRequest: { en: "Feature Request", ar: "طلب ميزة" },
  },

  // Error Messages
  errors: {
    general: {
      en: "Something went wrong. Please try again.",
      ar: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
    },
    networkError: {
      en: "Network error. Please check your connection.",
      ar: "خطأ في الشبكة. يرجى التحقق من اتصالك.",
    },
    serverError: {
      en: "Server error. Please try again later.",
      ar: "خطأ في الخادم. يرجى المحاولة لاحقاً.",
    },
    unauthorized: {
      en: "You are not authorized to access this resource.",
      ar: "غير مصرح لك بالوصول إلى هذا المورد.",
    },
    forbidden: { en: "Access forbidden.", ar: "الوصول ممنوع." },
    notFound: {
      en: "The requested resource was not found.",
      ar: "لم يتم العثور على المورد المطلوب.",
    },
    validationError: {
      en: "Please check your input and try again.",
      ar: "يرجى التحقق من إدخالك والمحاولة مرة أخرى.",
    },
    loginFailed: {
      en: "Login failed. Please check your credentials.",
      ar: "فشل تسجيل الدخول. يرجى التحقق من بياناتك.",
    },
    signupFailed: {
      en: "Sign up failed. Please try again.",
      ar: "فشل إنشاء الحساب. يرجى المحاولة مرة أخرى.",
    },
    passwordResetFailed: {
      en: "Password reset failed. Please try again.",
      ar: "فشل إعادة تعيين كلمة المرور. يرجى المحاولة مرة أخرى.",
    },
    emailVerificationFailed: {
      en: "Email verification failed. Please try again.",
      ar: "فشل التحقق من البريد الإلكتروني. يرجى المحاولة مرة أخرى.",
    },
    invalidResetToken: {
      en: "Invalid or missing reset token. Please request a new password reset.",
      ar: "رمز إعادة التعيين غير صحيح أو مفقود. يرجى طلب إعادة تعيين كلمة مرور جديدة.",
    },
  },

  // Success Messages
  success: {
    loginSuccess: { en: "Login successful!", ar: "تم تسجيل الدخول بنجاح!" },
    signupSuccess: { en: "Account created successfully!", ar: "تم إنشاء الحساب بنجاح!" },
    passwordResetSuccess: {
      en: "Password reset email sent!",
      ar: "تم إرسال بريد إعادة تعيين كلمة المرور!",
    },
    emailVerificationSuccess: {
      en: "Email verified successfully!",
      ar: "تم التحقق من البريد الإلكتروني بنجاح!",
    },
    profileUpdated: { en: "Profile updated successfully!", ar: "تم تحديث الملف الشخصي بنجاح!" },
    boardSaved: { en: "Board saved successfully!", ar: "تم حفظ اللوحة بنجاح!" },
    cardAdded: { en: "Card added successfully!", ar: "تم إضافة البطاقة بنجاح!" },
    cardUpdated: { en: "Card updated successfully!", ar: "تم تحديث البطاقة بنجاح!" },
    cardDeleted: { en: "Card deleted successfully!", ar: "تم حذف البطاقة بنجاح!" },
    messageSent: { en: "Message sent successfully!", ar: "تم إرسال الرسالة بنجاح!" },
  },

  plans: {
    feature: { en: "Feature", ar: "الميزة" },
    free: { en: "Free Plan", ar: "الخطة المجانية (Free)" },
    premium: { en: "Premium Plan", ar: "الخطة المميزة (Premium)" },
    trial: { en: "Free trial on signup", ar: "تجربة مجانية عند التسجيل 🎁" },
    trial_value: { en: "30 days Premium free on signup", ar: "30 يوم Premium مجانًا عند التسجيل" },
    trial_premium_value: {
      en: "First 30 days free, then monthly subscription",
      ar: "أول 30 يوم مجانًا، بعدها باشتراك شهري",
    },
    access_all: { en: "Access to all educational cards", ar: "الوصول لكل البطاقات التعليمية" },
    ai_assist: { en: "AI Assistance", ar: "المساعدة بالذكاء الاصطناعي (AI)" },
    learning_tests: { en: "Learning confirmation tests", ar: "اختبارات للتأكد من التعلم" },
    basic_set: { en: "Basic card set on board", ar: "مجموعة بطاقات أساسية في البورد" },
    basic_set_value: {
      en: "Gets only a basic set (cannot be modified)",
      ar: "يحصل على مجموعة أساسية فقط (لا يمكن تعديلها)",
    },
    basic_set_premium_value: {
      en: "Can add, remove, and customize as needed",
      ar: "ويمكن إضافة وإزالة وتخصيص كما يجب",
    },
    add_cards: { en: "Add new cards to board", ar: "إضافة بطاقات جديدة للبورد" },
    remove_cards: { en: "Remove cards from board", ar: "إزالة بطاقات من البورد" },
    allowed: { en: "Allowed", ar: "مسموح" },
    not_allowed: { en: "Not allowed", ar: "غير مسموح" },
    available: { en: "Available", ar: "متاح" },
    premium_summary: {
      en: "All features unlocked, fully customizable board, AI, and more.",
      ar: "جميع الميزات متاحة، تخصيص كامل للبورد، ذكاء اصطناعي والمزيد."
    },
    free_summary: {
      en: "Basic features only, limited customization.",
      ar: "ميزات أساسية فقط، تخصيص محدود."
    },
  },
};

/**
 * Get translated text based on current language
 * @param {string} key - Translation key (e.g., 'nav.home')
 * @param {string} language - Language code ('en' or 'ar')
 * @returns {string} Translated text
 */
export const getTranslation = (key, language = null) => {
  if (!language) {
    language = getUserLanguage();
  }

  const keys = key.split(".");
  let current = translations;

  for (const k of keys) {
    if (current && current[k]) {
      current = current[k];
    } else {
      console.warn(`Translation key not found: ${key}`);
      return key; // Return the key if translation not found
    }
  }

  if (current && typeof current === "object" && (current.en || current.ar)) {
    return current[language] || current.en || key;
  }

  return key;
};

/**
 * Get all translations for a specific key
 * @param {string} key - Translation key
 * @returns {Object} Object with 'en' and 'ar' translations
 */
export const getTranslations = (key) => {
  const keys = key.split(".");
  let current = translations;

  for (const k of keys) {
    if (current && current[k]) {
      current = current[k];
    } else {
      return { en: key, ar: key };
    }
  }

  return current || { en: key, ar: key };
};
