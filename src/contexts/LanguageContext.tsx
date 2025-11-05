import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'ar';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Navbar
    'nav.home': 'الرئيسية',
    'nav.marketplace': 'المتجر',
    'nav.sell': 'بيع',
    'nav.orders': 'الطلبات',
    'nav.wallet': 'المحفظة',
    'nav.profile': 'الملف الشخصي',
    'nav.admin': 'لوحة التحكم',
    'nav.members': 'الأعضاء',
    'nav.leaderboard': 'المتصدرين',
    'nav.help': 'المساعدة',
    'nav.disputes': 'النزاعات',
    'nav.myListings': 'إعلاناتي',
    'nav.kyc': 'التحقق من الهوية',
    'nav.notifications': 'الإشعارات',
    'nav.settings': 'الإعدادات',
    'nav.logout': 'تسجيل الخروج',
    'nav.login': 'تسجيل الدخول',
    
    // Home
    'home.hero.title': 'أفضل منصة لبيع وشراء حسابات الألعاب',
    'home.hero.subtitle': 'اشتر وبع حسابات ألعابك المفضلة بأمان وسرعة',
    'home.hero.browseAccounts': 'تصفح الحسابات',
    'home.hero.learnMore': 'اعرف المزيد',
    'home.features.security': '🔒 آمن',
    'home.features.fast': '⚡ سريع',
    'home.features.support': '💬 دعم 24/7',
    'home.whyChoose': 'لماذا تختار نكسولاند؟',
    'home.feature1.title': 'معاملات آمنة',
    'home.feature1.desc': 'نظام دفع آمن مع حماية المشتري والبائع',
    'home.feature2.title': 'دعم على مدار الساعة',
    'home.feature2.desc': 'فريق دعم متاح 24/7 لمساعدتك',
    'home.feature3.title': 'أسعار تنافسية',
    'home.feature3.desc': 'احصل على أفضل سعر لحساباتك',
    'home.feature4.title': 'تحويل فوري',
    'home.feature4.desc': 'احصل على أموالك فوراً بعد البيع',
    'home.howItWorks': 'كيف يعمل؟',
    'home.step1.title': 'اختر حساب',
    'home.step1.desc': 'تصفح آلاف الحسابات المعروضة',
    'home.step2.title': 'ادفع بأمان',
    'home.step2.desc': 'استخدم نظام الدفع الآمن الخاص بنا',
    'home.step3.title': 'احصل على حسابك',
    'home.step3.desc': 'استلم حسابك فوراً بعد التأكيد',
    'home.cta.title': 'ابدأ التداول الآن',
    'home.cta.subtitle': 'انضم إلى آلاف المستخدمين الذين يثقون بنا',
    'home.cta.getStarted': 'ابدأ الآن',
    'home.footer.rights': 'جميع الحقوق محفوظة',
    'home.footer.terms': 'الشروط والأحكام',
    'home.footer.privacy': 'سياسة الخصوصية',
    'home.footer.support': 'الدعم',
    
    // Sell
    'sell.title': 'اختر اللعبة',
    'sell.subtitle': 'بيع حساباتك في ألعابك المفضلة',
    'sell.comingSoon': 'المزيد من الألعاب قريباً...',
    'sell.selectCategory': 'اختر الفئة',
    'sell.categorySubtitle': 'اختر نوع الحساب الذي تريد بيعه',
    'sell.explore': 'استكشف',
    'sell.price': 'السعر',
    'sell.description': 'الوصف',
    'sell.gaming.title': 'حسابات الألعاب',
    'sell.gaming.description': 'بيع حسابات ألعابك',
    'sell.social.title': 'حسابات التواصل الاجتماعي',
    'sell.social.description': 'بيع حسابات وسائل التواصل',
    'sell.social.followers': 'المتابعين',
    'sell.social.likes': 'الإعجابات',
    'sell.social.views': 'المشاهدات',
    'sell.social.posts': 'المنشورات',
    'sell.social.engagement': 'معدل التفاعل',
    'sell.social.verification': 'حالة التوثيق',
    'sell.social.verified': 'موثق',
    'sell.social.unverified': 'غير موثق',
    'sell.social.tiktok.title': 'بيع حساب تيك توك',
    'sell.social.tiktok.subtitle': 'أدخل تفاصيل حساب تيك توك الخاص بك',
    'sell.social.tiktok.description': 'بيع حسابات تيك توك',
    'sell.social.tiktok.username': 'اسم المستخدم',
    'sell.social.tiktok.descriptionPlaceholder': 'صف حسابك، النيش، نوع المحتوى، إلخ...',
    'sell.social.instagram.title': 'بيع حساب إنستغرام',
    'sell.social.instagram.subtitle': 'أدخل تفاصيل حساب إنستغرام الخاص بك',
    'sell.social.instagram.description': 'بيع حسابات إنستغرام',
    'sell.social.instagram.username': 'اسم المستخدم',
    'sell.social.instagram.descriptionPlaceholder': 'صف حسابك، النيش، نوع المحتوى، إلخ...',
    'sell.social.accountDescription': 'وصف الحساب',
    'sell.social.descriptionPlaceholder': 'صف حسابك، النيش، نوع المحتوى، إلخ...',
    'sell.social.accountWithPrimaryEmail': 'الحساب مع البريد الإلكتروني الأساسي',
    'sell.social.accountLinkedToPhone': 'الحساب مرتبط برقم هاتف',
    'sell.social.confirmOwnership.title': 'تأكيد الملكية ومعلومات التسليم',
    'sell.social.confirmOwnership.description': 'لضمان بيئة آمنة لبيع وشراء الحسابات، يجب عليك إكمال الخطوات أدناه لإضافة حسابك.',
    'sell.social.confirmOwnership.instruction': 'اضغط على زر "ضع الكلمة أدناه في السيرة الذاتية لحسابك" للمتابعة',
    'sell.social.confirmOwnership.theWord': 'الكلمة',
    'sell.social.confirmOwnership.copy': 'نسخ',
    'sell.social.confirmOwnership.confirm': 'تأكيد الملكية',
    
    // Listing
    'listing.success': 'تم إنشاء الإعلان بنجاح!',
    'listing.successDescription': 'سيتم مراجعة إعلانك ونشره قريباً.',
    'listing.creating': 'جاري الإنشاء...',
    'listing.create': 'إنشاء إعلان',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.search': 'بحث',
    'common.filter': 'تصفية',
    'common.sort': 'ترتيب',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.delete': 'حذف',
    'common.edit': 'تعديل',
    'common.view': 'عرض',
    'common.back': 'رجوع',
  },
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.marketplace': 'Marketplace',
    'nav.sell': 'Sell',
    'nav.orders': 'Orders',
    'nav.wallet': 'Wallet',
    'nav.profile': 'Profile',
    'nav.admin': 'Admin Panel',
    'nav.members': 'Members',
    'nav.leaderboard': 'Leaderboard',
    'nav.help': 'Help',
    'nav.disputes': 'Disputes',
    'nav.myListings': 'My Listings',
    'nav.kyc': 'KYC Verification',
    'nav.notifications': 'Notifications',
    'nav.settings': 'Settings',
    'nav.logout': 'Logout',
    'nav.login': 'Login',
    
    // Home
    'home.hero.title': 'Best Platform for Buying and Selling Game Accounts',
    'home.hero.subtitle': 'Buy and sell your favorite game accounts safely and quickly',
    'home.hero.browseAccounts': 'Browse Accounts',
    'home.hero.learnMore': 'Learn More',
    'home.features.security': '🔒 Secure',
    'home.features.fast': '⚡ Fast',
    'home.features.support': '💬 24/7 Support',
    'home.whyChoose': 'Why Choose NXOLand?',
    'home.feature1.title': 'Secure Transactions',
    'home.feature1.desc': 'Secure payment system with buyer and seller protection',
    'home.feature2.title': '24/7 Support',
    'home.feature2.desc': 'Support team available 24/7 to help you',
    'home.feature3.title': 'Competitive Prices',
    'home.feature3.desc': 'Get the best price for your accounts',
    'home.feature4.title': 'Instant Transfer',
    'home.feature4.desc': 'Get your money instantly after sale',
    'home.howItWorks': 'How It Works?',
    'home.step1.title': 'Choose Account',
    'home.step1.desc': 'Browse thousands of listed accounts',
    'home.step2.title': 'Pay Safely',
    'home.step2.desc': 'Use our secure payment system',
    'home.step3.title': 'Get Your Account',
    'home.step3.desc': 'Receive your account instantly after confirmation',
    'home.cta.title': 'Start Trading Now',
    'home.cta.subtitle': 'Join thousands of users who trust us',
    'home.cta.getStarted': 'Get Started',
    'home.footer.rights': 'All Rights Reserved',
    'home.footer.terms': 'Terms & Conditions',
    'home.footer.privacy': 'Privacy Policy',
    'home.footer.support': 'Support',
    
    // Sell
    'sell.title': 'Choose Game',
    'sell.subtitle': 'Sell your gaming accounts',
    'sell.comingSoon': 'More games coming soon...',
    'sell.selectCategory': 'Select Category',
    'sell.categorySubtitle': 'Choose the type of account you want to sell',
    'sell.explore': 'Explore',
    'sell.price': 'Price',
    'sell.description': 'Description',
    'sell.gaming.title': 'Gaming Accounts',
    'sell.gaming.description': 'Sell your gaming accounts',
    'sell.social.title': 'Social Media Accounts',
    'sell.social.description': 'Sell your social media accounts',
    'sell.social.followers': 'Followers',
    'sell.social.likes': 'Likes',
    'sell.social.views': 'Views',
    'sell.social.posts': 'Posts',
    'sell.social.engagement': 'Engagement Rate',
    'sell.social.verification': 'Verification Status',
    'sell.social.verified': 'Verified',
    'sell.social.unverified': 'Unverified',
    'sell.social.tiktok.title': 'Sell TikTok Account',
    'sell.social.tiktok.subtitle': 'Enter your TikTok account details',
    'sell.social.tiktok.description': 'Sell TikTok accounts',
    'sell.social.tiktok.username': 'Username',
    'sell.social.tiktok.descriptionPlaceholder': 'Describe your account, niche, content type, etc...',
    'sell.social.instagram.title': 'Sell Instagram Account',
    'sell.social.instagram.subtitle': 'Enter your Instagram account details',
    'sell.social.instagram.description': 'Sell Instagram accounts',
    'sell.social.instagram.username': 'Username',
    'sell.social.instagram.descriptionPlaceholder': 'Describe your account, niche, content type, etc...',
    'sell.social.accountDescription': 'Account Description',
    'sell.social.descriptionPlaceholder': 'Describe your account, niche, content type, etc...',
    'sell.social.accountWithPrimaryEmail': 'Account with primary email',
    'sell.social.accountLinkedToPhone': 'The account is linked to a phone number',
    'sell.social.confirmOwnership.title': 'Confirmation of ownership and delivery information',
    'sell.social.confirmOwnership.description': 'To ensure a secure environment for buying and selling accounts, you must complete the steps below to add your account.',
    'sell.social.confirmOwnership.instruction': 'Press the Put the word below in your account bio confirmation button to proceed',
    'sell.social.confirmOwnership.theWord': 'The word',
    'sell.social.confirmOwnership.copy': 'copies',
    'sell.social.confirmOwnership.confirm': 'CONFIRMATION OF OWNERSHIP',
    
    // Listing
    'listing.success': 'Listing created successfully!',
    'listing.successDescription': 'Your listing will be reviewed and published soon.',
    'listing.creating': 'Creating...',
    'listing.create': 'Create Listing',
    
    // Common
    'common.loading': 'Loading...',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.back': 'Back',
  }
};
