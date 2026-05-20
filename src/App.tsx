import { useEffect, useMemo, useState } from 'react';
import {
  CalendarCheck,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  CreditCard,
  FileText,
  Filter,
  Globe2,
  HeartPulse,
  Languages,
  MapPin,
  Moon,
  Search,
  ShieldCheck,
  Star,
  Stethoscope,
  Sun,
  ThumbsUp,
  UserRound,
  Users,
  WalletCards,
  X,
} from 'lucide-react';
import {
  AppShell,
  Badge,
  Button,
  IconButton,
  InlineLabel,
  PageFrame,
  Panel,
  SectionTitle,
  SelectField,
  StepMarker,
  TextareaField,
  TextField,
} from './components/ui';
import caringDoctor from './assets/caring-doctor.png';
import femaleDoctor from './assets/female-doctor-stethoscope.png';
import mapLocation from './assets/map-location.png';
import professionalDoctor from './assets/professional-female-doctor.png';

type Locale = 'ja' | 'en';
type ThemePreference = 'light' | 'dark' | 'system';
type View = 'home' | 'doctor' | 'appointments' | 'payment' | 'confirmation' | 'login';
type DoctorCategory = 'primary' | 'specialist' | 'dentist';
type BookingStep = 1 | 2;

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  category: DoctorCategory;
  rating: number;
  location: string;
  availability: string;
  price: number;
  image: string;
  languages: string[];
}

interface Appointment {
  id: string;
  doctorId: string;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

const themeKey = 'melius-official-app-doctor-appointment-theme';
const localeKey = 'melius-official-app-doctor-appointment-locale';

const departments = [
  'Family Medicine',
  'Cardiology',
  'Pediatrics',
  'Dentistry',
  'Dermatology',
  'Orthopedics',
  'Neurology',
  'Ophthalmology',
  'Gynecology',
];

const timeSlots = [
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '3:30 PM',
];

const doctors: Doctor[] = [
  {
    id: 'sarah-johnson',
    name: 'Dr. Sarah Johnson',
    specialty: 'Family Medicine',
    category: 'primary',
    rating: 4.9,
    location: 'Downtown Medical Center',
    availability: 'Available today',
    price: 120,
    image: femaleDoctor,
    languages: ['English', 'Spanish'],
  },
  {
    id: 'michael-chen',
    name: 'Dr. Michael Chen',
    specialty: 'Cardiology',
    category: 'specialist',
    rating: 4.8,
    location: 'Heart & Vascular Institute',
    availability: 'Next available: Tomorrow',
    price: 200,
    image: professionalDoctor,
    languages: ['English', 'Mandarin'],
  },
  {
    id: 'emily-rodriguez',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    category: 'primary',
    rating: 4.9,
    location: "Children's Wellness Center",
    availability: 'Available today',
    price: 150,
    image: caringDoctor,
    languages: ['English', 'Spanish'],
  },
  {
    id: 'james-wilson',
    name: 'Dr. James Wilson',
    specialty: 'Dentistry',
    category: 'dentist',
    rating: 4.7,
    location: 'Bright Smile Dental Care',
    availability: 'Next available: Friday',
    price: 180,
    image: professionalDoctor,
    languages: ['English'],
  },
  {
    id: 'lisa-thompson',
    name: 'Dr. Lisa Thompson',
    specialty: 'Dermatology',
    category: 'specialist',
    rating: 4.8,
    location: 'Clear Skin Dermatology',
    availability: 'Next available: Monday',
    price: 190,
    image: caringDoctor,
    languages: ['English', 'French'],
  },
  {
    id: 'robert-davis',
    name: 'Dr. Robert Davis',
    specialty: 'Orthopedics',
    category: 'specialist',
    rating: 4.9,
    location: 'Advanced Orthopedic Center',
    availability: 'Next available: Wednesday',
    price: 250,
    image: femaleDoctor,
    languages: ['English'],
  },
];

const appointments: Appointment[] = [
  {
    id: 'apt-001',
    doctorId: 'sarah-johnson',
    date: 'May 23, 2026',
    time: '10:00 AM',
    location: 'Downtown Medical Center',
    status: 'upcoming',
  },
  {
    id: 'apt-002',
    doctorId: 'emily-rodriguez',
    date: 'May 9, 2026',
    time: '2:30 PM',
    location: "Children's Wellness Center",
    status: 'completed',
  },
];

const copy = {
  ja: {
    product: 'MediBook',
    description: '信頼できる医師を探して、診療予約をすばやく完了できます。',
    nav: {
      doctors: '医師を探す',
      appointments: '予約一覧',
      signIn: 'サインイン',
    },
    hero: {
      title: 'あなたに合う医師を、今日予約。',
      body: '専門科、場所、空き時間をまとめて比較し、海外患者向けの追加サポートまで一画面で確認できます。',
      search: '専門科、医師名などで検索',
      location: '場所',
      cta: '検索',
      statDoctors: '登録医師',
      statToday: '本日予約可',
      statSupport: '国際患者サポート',
    },
    doctors: {
      title: '予約可能な医師',
      all: 'すべて',
      primary: 'プライマリケア',
      specialist: '専門医',
      dentist: '歯科',
      filter: '診療科で絞り込み',
      active: '選択中',
      clear: '解除',
      perVisit: '診療ごと',
      book: '予約する',
      noResults: '条件に合う医師が見つかりません',
    },
    detail: {
      back: '医師一覧へ',
      experience: '10年以上の診療経験',
      patients: '2,000人以上を診療',
      reviews: '患者レビュー',
      about: '概要',
      reviewTab: 'レビュー',
      locationTab: '場所',
      education: '教育・研修',
      specialties: '専門領域',
      booking: '予約',
      fee: '診療費',
      insurance: '保険で一部または全額が補償される場合があります',
      bookNow: '予約手続きへ',
      minutes: '30分の診療枠',
      positive: '98%の高評価',
    },
    booking: {
      step1: 'ステップ1: 日時選択',
      step2: 'ステップ2: 患者情報',
      selectDate: '日付',
      selectTime: '時間',
      currency: '通貨',
      consultationFee: '診療費',
      next: '次へ',
      back: '戻る',
      cancel: 'キャンセル',
      firstName: '名',
      lastName: '姓',
      email: 'メール',
      phone: '電話番号',
      country: '国',
      passport: 'パスポート番号',
      reason: '受診理由',
      checkup: '健康診断',
      illness: '体調不良',
      followup: '再診',
      surgery: '手術相談',
      services: '追加サービス',
      translator: '医療通訳',
      visa: '医療ビザ支援',
      flight: '航空券手配',
      hotel: '宿泊手配',
      notes: '相談メモ',
      total: '合計',
      proceed: '支払いへ進む',
    },
    appointments: {
      title: 'My Appointments',
      body: '今後の予約と過去の受診を管理します。',
      new: '新しく予約',
      upcoming: '予定',
      completed: '完了',
      cancelled: 'キャンセル',
      view: '医師を見る',
      cancel: 'キャンセル',
      again: '再予約',
      date: '日付',
      time: '時間',
      location: '場所',
    },
    payment: {
      back: '予約へ戻る',
      title: 'Payment',
      method: '支払い方法',
      select: '希望する支払い方法を選択してください。',
      card: 'クレジット / デビットカード',
      paypal: 'PayPal',
      cardNumber: 'カード番号',
      cardHolder: 'カード名義',
      expiry: '有効期限',
      cvv: 'CVV',
      summary: '注文概要',
      amount: '金額',
      tax: '税',
      total: '合計',
      pay: '支払う',
    },
    login: {
      signIn: 'Sign in',
      register: 'Register',
      title: 'アカウントへサインイン',
      body: '予約内容を保存し、支払いへ進みます。',
      create: 'アカウント作成',
      email: 'メール',
      password: 'パスワード',
      name: '氏名',
      confirm: '確認用パスワード',
      submit: 'サインイン',
    },
    confirmation: {
      title: '予約が確定しました',
      body: '予約内容が正常に登録されました。',
      summary: '予約概要',
      important: '来院前の確認',
      item1: '予約時間の15分前に到着してください。',
      item2: '保険証または身分証をご持参ください。',
      item3: '変更やキャンセルは24時間前までに行ってください。',
      view: '予約一覧を見る',
      another: '別の予約をする',
    },
  },
  en: {
    product: 'MediBook',
    description: 'Find trusted doctors and complete appointment booking quickly.',
    nav: {
      doctors: 'Find doctors',
      appointments: 'My Appointments',
      signIn: 'Sign In',
    },
    hero: {
      title: 'Book the right doctor today.',
      body: 'Compare specialties, locations, and availability, then add international patient support from one clean workflow.',
      search: 'Search by specialty, doctor name, etc.',
      location: 'Location',
      cta: 'Search',
      statDoctors: 'listed doctors',
      statToday: 'available today',
      statSupport: 'international support',
    },
    doctors: {
      title: 'Available Doctors',
      all: 'All',
      primary: 'Primary Care',
      specialist: 'Specialists',
      dentist: 'Dentists',
      filter: 'Filter by Department',
      active: 'Active',
      clear: 'Clear',
      perVisit: 'per visit',
      book: 'Book Now',
      noResults: 'No doctors found',
    },
    detail: {
      back: 'Back to doctors',
      experience: '10+ years experience',
      patients: '2,000+ patients',
      reviews: 'patient reviews',
      about: 'About',
      reviewTab: 'Reviews',
      locationTab: 'Location',
      education: 'Education & Training',
      specialties: 'Specialties',
      booking: 'Book an Appointment',
      fee: 'Consultation Fee',
      insurance: 'Insurance may cover part or all of this cost',
      bookNow: 'Book Appointment',
      minutes: '30 minute appointment',
      positive: '98% positive reviews',
    },
    booking: {
      step1: 'Step 1: Select Date & Time',
      step2: 'Step 2: Patient Information',
      selectDate: 'Date',
      selectTime: 'Time',
      currency: 'Currency',
      consultationFee: 'Consultation Fee',
      next: 'Next',
      back: 'Back',
      cancel: 'Cancel',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone Number',
      country: 'Country',
      passport: 'Passport Number',
      reason: 'Reason for Visit',
      checkup: 'Checkup',
      illness: 'Illness',
      followup: 'Follow-up',
      surgery: 'Surgery',
      services: 'Additional Services',
      translator: 'Translator Service',
      visa: 'Visa Processing',
      flight: 'Flight Booking',
      hotel: 'Hotel Booking',
      notes: 'Notes',
      total: 'Total Cost',
      proceed: 'Proceed to Payment',
    },
    appointments: {
      title: 'My Appointments',
      body: 'Manage your upcoming and past appointments.',
      new: 'Book New Appointment',
      upcoming: 'Upcoming',
      completed: 'Completed',
      cancelled: 'Cancelled',
      view: 'View Doctor',
      cancel: 'Cancel',
      again: 'Book Again',
      date: 'Date',
      time: 'Time',
      location: 'Location',
    },
    payment: {
      back: 'Back to booking',
      title: 'Payment',
      method: 'Payment Method',
      select: 'Select your preferred payment method.',
      card: 'Credit / Debit Card',
      paypal: 'PayPal',
      cardNumber: 'Card Number',
      cardHolder: 'Cardholder Name',
      expiry: 'Expiry Date',
      cvv: 'CVV',
      summary: 'Order Summary',
      amount: 'Amount',
      tax: 'Tax',
      total: 'Total',
      pay: 'Pay Now',
    },
    login: {
      signIn: 'Sign in',
      register: 'Register',
      title: 'Sign in to your account',
      body: 'Save appointment details and continue to payment.',
      create: 'Create an account',
      email: 'Email',
      password: 'Password',
      name: 'Full Name',
      confirm: 'Confirm Password',
      submit: 'Sign in',
    },
    confirmation: {
      title: 'Appointment Confirmed!',
      body: 'Your appointment has been successfully scheduled.',
      summary: 'Booking Summary',
      important: 'Important Information',
      item1: 'Please arrive 15 minutes before your appointment time.',
      item2: 'Bring your insurance card and ID.',
      item3: 'Cancel or reschedule at least 24 hours in advance.',
      view: 'View My Appointments',
      another: 'Book Another Appointment',
    },
  },
};

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'ja';
  }

  const params = new URLSearchParams(window.location.search);
  const requested = params.get('locale') || params.get('lang') || params.get('language') || params.get('melius_locale');

  if (requested === 'ja' || requested === 'en') {
    return requested;
  }

  try {
    const stored = window.localStorage.getItem(localeKey);
    if (stored === 'ja' || stored === 'en') {
      return stored;
    }
  } catch {
    return 'ja';
  }

  return 'ja';
}

function getInitialTheme(): ThemePreference {
  if (typeof window === 'undefined') {
    return 'system';
  }

  const params = new URLSearchParams(window.location.search);
  const requested = params.get('theme') || params.get('themeMode') || params.get('colorScheme') || params.get('melius_theme');

  if (requested === 'light' || requested === 'dark' || requested === 'system') {
    return requested;
  }

  try {
    const stored = window.localStorage.getItem(themeKey);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
  } catch {
    return 'system';
  }

  return 'system';
}

function resolveTheme(preference: ThemePreference) {
  if (preference === 'system') {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  return preference;
}

function App() {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);
  const [themePreference, setThemePreference] = useState<ThemePreference>(getInitialTheme);
  const [view, setView] = useState<View>('home');
  const [selectedDoctorId, setSelectedDoctorId] = useState(doctors[0].id);
  const [selectedCategory, setSelectedCategory] = useState<'all' | DoctorCategory>('all');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingStep, setBookingStep] = useState<BookingStep>(1);
  const [selectedDate, setSelectedDate] = useState('May 24, 2026');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [currency, setCurrency] = useState('USD');
  const [reason, setReason] = useState('Checkup');
  const [appointmentTab, setAppointmentTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [authTab, setAuthTab] = useState<'sign-in' | 'register'>('sign-in');
  const [services, setServices] = useState({
    translator: true,
    visa: false,
    flight: false,
    hotel: true,
  });

  const c = copy[locale];
  const selectedDoctor = doctors.find((doctor) => doctor.id === selectedDoctorId) ?? doctors[0];
  const resolvedTheme = typeof window === 'undefined' ? 'light' : resolveTheme(themePreference);

  useEffect(() => {
    const root = document.documentElement;
    const resolved = resolveTheme(themePreference);
    root.lang = locale;
    root.dataset.theme = resolved;
    root.dataset.themePreference = themePreference;
    root.classList.toggle('dark', resolved === 'dark');
    root.style.colorScheme = resolved === 'dark' ? 'dark' : 'light';

    try {
      window.localStorage.setItem(localeKey, locale);
      window.localStorage.setItem(themeKey, themePreference);
    } catch {
      // Storage is optional in iframe previews.
    }
  }, [locale, themePreference]);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesCategory = selectedCategory === 'all' || doctor.category === selectedCategory;
      const matchesDepartment = selectedDepartments.length === 0 || selectedDepartments.includes(doctor.specialty);
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        query.length === 0 ||
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialty.toLowerCase().includes(query) ||
        doctor.location.toLowerCase().includes(query);

      return matchesCategory && matchesDepartment && matchesQuery;
    });
  }, [searchQuery, selectedCategory, selectedDepartments]);

  const totalCost =
    selectedDoctor.price +
    (services.translator ? 50 : 0) +
    (services.visa ? 100 : 0) +
    (services.flight ? 500 : 0) +
    (services.hotel ? 200 : 0);

  const convertedTotal = currency === 'JPY' ? `¥${Math.round(totalCost * 150.14).toLocaleString()}` : `$${totalCost}`;

  function openDoctor(doctorId: string) {
    setSelectedDoctorId(doctorId);
    setBookingStep(1);
    setView('doctor');
  }

  function toggleDepartment(department: string) {
    setSelectedDepartments((previous) =>
      previous.includes(department) ? previous.filter((item) => item !== department) : [...previous, department],
    );
  }

  function toggleService(service: keyof typeof services) {
    setServices((previous) => ({
      ...previous,
      [service]: !previous[service],
    }));
  }

  return (
    <AppShell>
      <PageFrame>
        <Header
          locale={locale}
          theme={resolvedTheme}
          c={c}
          currentView={view}
          setView={setView}
          setLocale={setLocale}
          setThemePreference={() => setThemePreference(resolvedTheme === 'dark' ? 'light' : 'dark')}
        />

        {view === 'home' ? (
          <HomeView
            c={c}
            filteredDoctors={filteredDoctors}
            selectedCategory={selectedCategory}
            selectedDepartments={selectedDepartments}
            searchQuery={searchQuery}
            setSelectedCategory={setSelectedCategory}
            setSearchQuery={setSearchQuery}
            toggleDepartment={toggleDepartment}
            clearDepartments={() => setSelectedDepartments([])}
            openDoctor={openDoctor}
          />
        ) : null}

        {view === 'doctor' ? (
          <DoctorView
            c={c}
            doctor={selectedDoctor}
            bookingStep={bookingStep}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            currency={currency}
            reason={reason}
            services={services}
            totalCost={convertedTotal}
            setBookingStep={setBookingStep}
            setSelectedDate={setSelectedDate}
            setSelectedTime={setSelectedTime}
            setCurrency={setCurrency}
            setReason={setReason}
            toggleService={toggleService}
            goBack={() => setView('home')}
            goPayment={() => setView('payment')}
          />
        ) : null}

        {view === 'appointments' ? (
          <AppointmentsView
            c={c}
            tab={appointmentTab}
            setTab={setAppointmentTab}
            openDoctor={openDoctor}
            goHome={() => setView('home')}
          />
        ) : null}

        {view === 'payment' ? (
          <PaymentView
            c={c}
            doctor={selectedDoctor}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            paymentMethod={paymentMethod}
            totalCost={totalCost}
            setPaymentMethod={setPaymentMethod}
            goDoctor={() => setView('doctor')}
            goConfirmation={() => setView('confirmation')}
          />
        ) : null}

        {view === 'confirmation' ? (
          <ConfirmationView
            c={c}
            doctor={selectedDoctor}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            totalCost={totalCost}
            goAppointments={() => setView('appointments')}
            goHome={() => setView('home')}
          />
        ) : null}

        {view === 'login' ? (
          <LoginView c={c} activeTab={authTab} setActiveTab={setAuthTab} goHome={() => setView('home')} />
        ) : null}
      </PageFrame>
    </AppShell>
  );
}

function Header({
  locale,
  theme,
  c,
  currentView,
  setView,
  setLocale,
  setThemePreference,
}: {
  locale: Locale;
  theme: 'light' | 'dark';
  c: (typeof copy)[Locale];
  currentView: View;
  setView: (view: View) => void;
  setLocale: (locale: Locale) => void;
  setThemePreference: () => void;
}) {
  return (
    <header data-melius-ui-id="site-header" data-melius-ui-role="navigation" className="site-header">
      <button
        type="button"
        data-melius-ui-id="brand-home-button"
        className="brand"
        onClick={() => setView('home')}
      >
        <span>
          <HeartPulse size={20} />
        </span>
        <strong>{c.product}</strong>
      </button>
      <nav className="nav-tabs" aria-label="Primary">
        <button
          type="button"
          data-melius-ui-id="nav-doctors"
          data-active={currentView === 'home' || currentView === 'doctor' ? 'true' : 'false'}
          onClick={() => setView('home')}
        >
          {c.nav.doctors}
        </button>
        <button
          type="button"
          data-melius-ui-id="nav-appointments"
          data-active={currentView === 'appointments' ? 'true' : 'false'}
          onClick={() => setView('appointments')}
        >
          {c.nav.appointments}
        </button>
      </nav>
      <div className="header-actions">
        <IconButton
          dataId="language-toggle"
          label="Switch language"
          onClick={() => setLocale(locale === 'ja' ? 'en' : 'ja')}
          variant="ghost"
        >
          <Languages size={18} />
        </IconButton>
        <IconButton dataId="theme-toggle" label="Switch theme" onClick={setThemePreference} variant="ghost">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </IconButton>
        <Button dataId="header-sign-in-button" variant="secondary" onClick={() => setView('login')}>
          {c.nav.signIn}
        </Button>
      </div>
    </header>
  );
}

function HomeView({
  c,
  filteredDoctors,
  selectedCategory,
  selectedDepartments,
  searchQuery,
  setSelectedCategory,
  setSearchQuery,
  toggleDepartment,
  clearDepartments,
  openDoctor,
}: {
  c: (typeof copy)[Locale];
  filteredDoctors: Doctor[];
  selectedCategory: 'all' | DoctorCategory;
  selectedDepartments: string[];
  searchQuery: string;
  setSelectedCategory: (category: 'all' | DoctorCategory) => void;
  setSearchQuery: (value: string) => void;
  toggleDepartment: (department: string) => void;
  clearDepartments: () => void;
  openDoctor: (doctorId: string) => void;
}) {
  return (
    <main className="home-grid">
      <Panel dataId="hero-search-panel" roleName="hero" tone="hero">
        <div className="hero-copy">
          <Badge tone="teal">
            <Globe2 size={14} />
            {c.hero.statSupport}
          </Badge>
          <h1 data-melius-ui-id="hero-title">{c.hero.title}</h1>
          <p data-melius-ui-id="hero-description">{c.hero.body}</p>
          <div data-melius-ui-id="hero-search-controls" data-melius-ui-role="search" className="hero-search">
            <TextField
              dataId="doctor-search-input"
              label={c.hero.search}
              value={searchQuery}
              placeholder={c.hero.search}
              icon={<Search size={17} />}
              onChange={(event) => setSearchQuery(event.currentTarget.value)}
            />
            <TextField
              dataId="location-search-input"
              label={c.hero.location}
              defaultValue="New York, NY"
              icon={<MapPin size={17} />}
            />
            <Button dataId="hero-search-button">{c.hero.cta}</Button>
          </div>
          <div className="hero-stats" data-melius-ui-id="hero-stats">
            <span>
              <strong>120+</strong>
              {c.hero.statDoctors}
            </span>
            <span>
              <strong>18</strong>
              {c.hero.statToday}
            </span>
            <span>
              <strong>24/7</strong>
              {c.hero.statSupport}
            </span>
          </div>
        </div>
        <div data-melius-ui-id="hero-doctor-image" data-melius-ui-role="image" className="hero-image-wrap">
          <img src={professionalDoctor} alt="Medical professional" />
        </div>
      </Panel>

      <section data-melius-ui-id="doctor-directory-section" data-melius-ui-role="list" className="directory">
        <SectionTitle
          dataId="doctor-directory-header"
          title={c.doctors.title}
          action={
            <div className="filter-actions" data-melius-ui-id="department-filter-actions">
              <Button dataId="department-filter-button" variant="secondary" size="sm">
                <Filter size={15} />
                {c.doctors.filter}
                {selectedDepartments.length > 0 ? <span>{selectedDepartments.length}</span> : null}
              </Button>
              {selectedDepartments.length > 0 ? (
                <Button dataId="clear-filter-button" variant="ghost" size="sm" onClick={clearDepartments}>
                  {c.doctors.clear}
                </Button>
              ) : null}
            </div>
          }
        >
          {filteredDoctors.length} doctors
        </SectionTitle>

        <div className="department-list" data-melius-ui-id="department-filter-list">
          {departments.map((department) => (
            <button
              key={department}
              type="button"
              data-melius-ui-id={`department-${department.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              data-active={selectedDepartments.includes(department) ? 'true' : 'false'}
              onClick={() => toggleDepartment(department)}
            >
              {department}
            </button>
          ))}
        </div>

        <div className="category-tabs" data-melius-ui-id="doctor-category-tabs" data-melius-ui-role="tabs">
          {[
            ['all', c.doctors.all],
            ['primary', c.doctors.primary],
            ['specialist', c.doctors.specialist],
            ['dentist', c.doctors.dentist],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              data-melius-ui-id={`category-tab-${value}`}
              data-active={selectedCategory === value ? 'true' : 'false'}
              onClick={() => setSelectedCategory(value as 'all' | DoctorCategory)}
            >
              {label}
            </button>
          ))}
        </div>

        {filteredDoctors.length > 0 ? (
          <div className="doctor-grid">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} c={c} onOpen={() => openDoctor(doctor.id)} />
            ))}
          </div>
        ) : (
          <Panel dataId="doctor-empty-state" tone="soft">
            <h3>{c.doctors.noResults}</h3>
          </Panel>
        )}
      </section>
    </main>
  );
}

function DoctorCard({ doctor, c, onOpen }: { doctor: Doctor; c: (typeof copy)[Locale]; onOpen: () => void }) {
  return (
    <button
      type="button"
      data-melius-ui-id={`doctor-card-${doctor.id}`}
      data-melius-ui-role="card"
      className="doctor-card"
      onClick={onOpen}
    >
      <span className="doctor-card__image">
        <img src={doctor.image} alt={doctor.name} />
      </span>
      <span className="doctor-card__body">
        <span className="doctor-card__top">
          <span>
            <strong>{doctor.name}</strong>
            <small>{doctor.specialty}</small>
          </span>
          <span className="rating-pill">{doctor.rating}★</span>
        </span>
        <span className="doctor-meta">
          <MapPin size={14} />
          {doctor.location}
        </span>
        <span className="doctor-meta">
          <Clock size={14} />
          {doctor.availability}
        </span>
        <span className="doctor-card__footer">
          <span>
            ${doctor.price} <small>{c.doctors.perVisit}</small>
          </span>
          <span>{c.doctors.book}</span>
        </span>
      </span>
    </button>
  );
}

function DoctorView({
  c,
  doctor,
  bookingStep,
  selectedDate,
  selectedTime,
  currency,
  reason,
  services,
  totalCost,
  setBookingStep,
  setSelectedDate,
  setSelectedTime,
  setCurrency,
  setReason,
  toggleService,
  goBack,
  goPayment,
}: {
  c: (typeof copy)[Locale];
  doctor: Doctor;
  bookingStep: BookingStep;
  selectedDate: string;
  selectedTime: string;
  currency: string;
  reason: string;
  services: { translator: boolean; visa: boolean; flight: boolean; hotel: boolean };
  totalCost: string;
  setBookingStep: (step: BookingStep) => void;
  setSelectedDate: (value: string) => void;
  setSelectedTime: (value: string) => void;
  setCurrency: (value: string) => void;
  setReason: (value: string) => void;
  toggleService: (service: keyof typeof services) => void;
  goBack: () => void;
  goPayment: () => void;
}) {
  return (
    <main className="detail-layout">
      <button type="button" data-melius-ui-id="back-to-doctors-button" className="back-link" onClick={goBack}>
        <ChevronLeft size={16} />
        {c.detail.back}
      </button>
      <section data-melius-ui-id="doctor-detail-section" className="doctor-detail">
        <div className="doctor-profile">
          <div data-melius-ui-id="doctor-profile-image" className="doctor-profile__image">
            <img src={doctor.image} alt={doctor.name} />
          </div>
          <div data-melius-ui-id="doctor-profile-summary" className="doctor-profile__summary">
            <h1>{doctor.name}</h1>
            <p>{doctor.specialty}</p>
            <div className="star-row" data-melius-ui-id="doctor-rating-row">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} size={17} fill={index < Math.floor(doctor.rating) ? 'currentColor' : 'none'} />
              ))}
              <strong>{doctor.rating}</strong>
              <span>120+ {c.detail.reviews}</span>
            </div>
            <div className="profile-facts">
              <span>
                <MapPin size={16} />
                {doctor.location}
              </span>
              <span>
                <Stethoscope size={16} />
                {c.detail.experience}
              </span>
              <span>
                <Users size={16} />
                {c.detail.patients}
              </span>
            </div>
            <div className="language-badges">
              {doctor.languages.map((language) => (
                <Badge key={language} tone="slate">
                  {language}
                </Badge>
              ))}
              <Badge tone="teal">In-person visits</Badge>
              <Badge tone="blue">Video consultations</Badge>
            </div>
          </div>
        </div>

        <Panel dataId="doctor-about-panel" roleName="tabs">
          <div className="category-tabs detail-tabs">
            <button type="button" data-melius-ui-id="doctor-tab-about" data-active="true">
              {c.detail.about}
            </button>
            <button type="button" data-melius-ui-id="doctor-tab-reviews">
              {c.detail.reviewTab}
            </button>
            <button type="button" data-melius-ui-id="doctor-tab-location">
              {c.detail.locationTab}
            </button>
          </div>
          <div className="about-grid">
            <div>
              <h2>
                {c.detail.about} {doctor.name}
              </h2>
              <p>
                {doctor.name} is a board-certified {doctor.specialty.toLowerCase()} with over 10 years of experience.
                The practice focuses on preventive care, clear explanations, and practical follow-up plans.
              </p>
              <h3>{c.detail.education}</h3>
              <ul>
                <li>Medical Degree - Northstar Medical School</li>
                <li>Residency - Metropolitan General Hospital</li>
                <li>Board Certification - Medical Specialty Board</li>
              </ul>
            </div>
            <div>
              <h3>{c.detail.specialties}</h3>
              <ul>
                <li>Preventive care</li>
                <li>Chronic disease management</li>
                <li>International patient intake</li>
                <li>Medication review</li>
              </ul>
              <div className="map-card" data-melius-ui-id="doctor-location-map">
                <img src={mapLocation} alt="Clinic location map" />
              </div>
            </div>
          </div>
        </Panel>
      </section>
      <aside className="booking-sidebar">
        <Panel dataId="booking-panel" roleName="form">
          <h2>{c.detail.booking}</h2>
          <div className="fee-box" data-melius-ui-id="consultation-fee-box">
            <span>{c.detail.fee}</span>
            <strong>${doctor.price}</strong>
            <small>{c.detail.insurance}</small>
          </div>
          <div className="booking-facts">
            <span>
              <Clock size={15} />
              {doctor.availability}
            </span>
            <span>
              <CalendarDays size={15} />
              {c.detail.minutes}
            </span>
            <span>
              <ThumbsUp size={15} />
              {c.detail.positive}
            </span>
          </div>
          <BookingForm
            c={c}
            step={bookingStep}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            currency={currency}
            reason={reason}
            services={services}
            totalCost={totalCost}
            setStep={setBookingStep}
            setSelectedDate={setSelectedDate}
            setSelectedTime={setSelectedTime}
            setCurrency={setCurrency}
            setReason={setReason}
            toggleService={toggleService}
            goPayment={goPayment}
          />
        </Panel>
      </aside>
    </main>
  );
}

function BookingForm({
  c,
  step,
  selectedDate,
  selectedTime,
  currency,
  reason,
  services,
  totalCost,
  setStep,
  setSelectedDate,
  setSelectedTime,
  setCurrency,
  setReason,
  toggleService,
  goPayment,
}: {
  c: (typeof copy)[Locale];
  step: BookingStep;
  selectedDate: string;
  selectedTime: string;
  currency: string;
  reason: string;
  services: { translator: boolean; visa: boolean; flight: boolean; hotel: boolean };
  totalCost: string;
  setStep: (step: BookingStep) => void;
  setSelectedDate: (value: string) => void;
  setSelectedTime: (value: string) => void;
  setCurrency: (value: string) => void;
  setReason: (value: string) => void;
  toggleService: (service: keyof typeof services) => void;
  goPayment: () => void;
}) {
  return (
    <div data-melius-ui-id="booking-form" className="booking-form">
      <div className="step-row">
        <StepMarker step={1} active={step === 1} />
        <span />
        <StepMarker step={2} active={step === 2} />
      </div>
      <h3>{step === 1 ? c.booking.step1 : c.booking.step2}</h3>
      {step === 1 ? (
        <>
          <SelectField
            dataId="booking-date-select"
            label={c.booking.selectDate}
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.currentTarget.value)}
          >
            <option>May 24, 2026</option>
            <option>May 25, 2026</option>
            <option>May 26, 2026</option>
          </SelectField>
          <div data-melius-ui-id="booking-time-slots" className="time-grid">
            {timeSlots.map((time) => (
              <button
                key={time}
                type="button"
                data-melius-ui-id={`time-slot-${time.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                data-active={selectedTime === time ? 'true' : 'false'}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
          <SelectField
            dataId="booking-currency-select"
            label={c.booking.currency}
            value={currency}
            onChange={(event) => setCurrency(event.currentTarget.value)}
          >
            <option>USD</option>
            <option>JPY</option>
            <option>EUR</option>
            <option>GBP</option>
          </SelectField>
          <Button dataId="booking-next-step-button" onClick={() => setStep(2)}>
            {c.booking.next}
            <ChevronRight size={16} />
          </Button>
        </>
      ) : (
        <>
          <div className="two-fields">
            <TextField dataId="patient-first-name-field" label={c.booking.firstName} defaultValue="Avery" />
            <TextField dataId="patient-last-name-field" label={c.booking.lastName} defaultValue="Stone" />
          </div>
          <TextField dataId="patient-email-field" label={c.booking.email} defaultValue="avery@example.com" />
          <TextField dataId="patient-phone-field" label={c.booking.phone} defaultValue="+1 (555) 123-4567" />
          <div className="two-fields">
            <SelectField dataId="patient-country-select" label={c.booking.country} defaultValue="United States">
              <option>United States</option>
              <option>Japan</option>
              <option>Singapore</option>
              <option>Germany</option>
            </SelectField>
            <TextField dataId="patient-passport-field" label={c.booking.passport} defaultValue="AB1234567" />
          </div>
          <SelectField
            dataId="booking-reason-select"
            label={c.booking.reason}
            value={reason}
            onChange={(event) => setReason(event.currentTarget.value)}
          >
            <option value="Checkup">{c.booking.checkup}</option>
            <option value="Illness">{c.booking.illness}</option>
            <option value="Follow-up">{c.booking.followup}</option>
            <option value="Surgery">{c.booking.surgery}</option>
          </SelectField>
          <div className="service-list" data-melius-ui-id="additional-services-list">
            <span>{c.booking.services}</span>
            {[
              ['translator', c.booking.translator, '$50'],
              ['visa', c.booking.visa, '$100'],
              ['flight', c.booking.flight, '$500'],
              ['hotel', c.booking.hotel, '$200'],
            ].map(([key, label, price]) => (
              <button
                key={key}
                type="button"
                data-melius-ui-id={`service-${key}`}
                data-active={services[key as keyof typeof services] ? 'true' : 'false'}
                onClick={() => toggleService(key as keyof typeof services)}
              >
                <span>{label}</span>
                <strong>{price}</strong>
              </button>
            ))}
          </div>
          <TextareaField dataId="patient-notes-field" label={c.booking.notes} defaultValue="First visit consultation." />
          <div className="total-row" data-melius-ui-id="booking-total-row">
            <span>{c.booking.total}</span>
            <strong>{totalCost}</strong>
          </div>
          <div className="form-actions">
            <Button dataId="booking-back-step-button" variant="secondary" onClick={() => setStep(1)}>
              <ChevronLeft size={16} />
              {c.booking.back}
            </Button>
            <Button dataId="booking-proceed-payment-button" onClick={goPayment}>
              {c.booking.proceed}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

function AppointmentsView({
  c,
  tab,
  setTab,
  openDoctor,
  goHome,
}: {
  c: (typeof copy)[Locale];
  tab: 'upcoming' | 'completed' | 'cancelled';
  setTab: (tab: 'upcoming' | 'completed' | 'cancelled') => void;
  openDoctor: (doctorId: string) => void;
  goHome: () => void;
}) {
  const visibleAppointments = appointments.filter((appointment) => appointment.status === tab);

  return (
    <main className="appointments-page">
      <SectionTitle
        dataId="appointments-header"
        title={c.appointments.title}
        action={
          <Button dataId="new-appointment-button" onClick={goHome}>
            {c.appointments.new}
          </Button>
        }
      >
        {c.appointments.body}
      </SectionTitle>
      <div className="category-tabs wide-tabs" data-melius-ui-id="appointment-status-tabs">
        {[
          ['upcoming', c.appointments.upcoming],
          ['completed', c.appointments.completed],
          ['cancelled', c.appointments.cancelled],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            data-melius-ui-id={`appointment-tab-${value}`}
            data-active={tab === value ? 'true' : 'false'}
            onClick={() => setTab(value as 'upcoming' | 'completed' | 'cancelled')}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="appointment-list" data-melius-ui-id="appointment-list">
        {visibleAppointments.map((appointment) => {
          const doctor = doctors.find((item) => item.id === appointment.doctorId) ?? doctors[0];
          return (
            <Panel key={appointment.id} dataId={`appointment-card-${appointment.id}`} roleName="card">
              <div className="appointment-card">
                <img src={doctor.image} alt={doctor.name} />
                <div>
                  <div className="appointment-card__head">
                    <span>
                      <strong>{doctor.name}</strong>
                      <small>{doctor.specialty}</small>
                    </span>
                    <div>
                      <Button dataId={`appointment-view-${appointment.id}`} variant="secondary" onClick={() => openDoctor(doctor.id)}>
                        {c.appointments.view}
                      </Button>
                      <Button dataId={`appointment-action-${appointment.id}`} variant={appointment.status === 'upcoming' ? 'danger' : 'primary'}>
                        {appointment.status === 'upcoming' ? c.appointments.cancel : c.appointments.again}
                      </Button>
                    </div>
                  </div>
                  <div className="appointment-facts">
                    <span>
                      <CalendarDays size={17} />
                      <small>{c.appointments.date}</small>
                      {appointment.date}
                    </span>
                    <span>
                      <Clock size={17} />
                      <small>{c.appointments.time}</small>
                      {appointment.time}
                    </span>
                    <span>
                      <MapPin size={17} />
                      <small>{c.appointments.location}</small>
                      {appointment.location}
                    </span>
                  </div>
                </div>
              </div>
            </Panel>
          );
        })}
      </div>
    </main>
  );
}

function PaymentView({
  c,
  doctor,
  selectedDate,
  selectedTime,
  paymentMethod,
  totalCost,
  setPaymentMethod,
  goDoctor,
  goConfirmation,
}: {
  c: (typeof copy)[Locale];
  doctor: Doctor;
  selectedDate: string;
  selectedTime: string;
  paymentMethod: 'card' | 'paypal';
  totalCost: number;
  setPaymentMethod: (method: 'card' | 'paypal') => void;
  goDoctor: () => void;
  goConfirmation: () => void;
}) {
  const tax = Math.round(totalCost * 0.05);

  return (
    <main className="payment-page">
      <button type="button" data-melius-ui-id="payment-back-button" className="back-link" onClick={goDoctor}>
        <ChevronLeft size={16} />
        {c.payment.back}
      </button>
      <div className="payment-grid">
        <Panel dataId="payment-method-panel" roleName="form">
          <h1>{c.payment.title}</h1>
          <p>{c.payment.select}</p>
          <div className="payment-methods" data-melius-ui-id="payment-method-options">
            <button
              type="button"
              data-melius-ui-id="payment-credit-card-option"
              data-active={paymentMethod === 'card' ? 'true' : 'false'}
              onClick={() => setPaymentMethod('card')}
            >
              <CreditCard size={20} />
              {c.payment.card}
              {paymentMethod === 'card' ? <Check size={17} /> : null}
            </button>
            <button
              type="button"
              data-melius-ui-id="payment-paypal-option"
              data-active={paymentMethod === 'paypal' ? 'true' : 'false'}
              onClick={() => setPaymentMethod('paypal')}
            >
              <WalletCards size={20} />
              {c.payment.paypal}
              {paymentMethod === 'paypal' ? <Check size={17} /> : null}
            </button>
          </div>
          {paymentMethod === 'card' ? (
            <div className="payment-fields">
              <TextField dataId="payment-card-number-field" label={c.payment.cardNumber} defaultValue="4242 4242 4242 4242" />
              <TextField dataId="payment-card-holder-field" label={c.payment.cardHolder} defaultValue="Avery Stone" />
              <div className="two-fields">
                <TextField dataId="payment-expiry-field" label={c.payment.expiry} defaultValue="05/29" />
                <TextField dataId="payment-cvv-field" label={c.payment.cvv} defaultValue="123" />
              </div>
            </div>
          ) : (
            <Panel dataId="paypal-redirect-panel" tone="soft">
              <WalletCards size={26} />
              <p>PayPal checkout preview</p>
            </Panel>
          )}
        </Panel>
        <Panel dataId="payment-summary-panel" roleName="summary">
          <h2>{c.payment.summary}</h2>
          <div className="summary-doctor">
            <img src={doctor.image} alt={doctor.name} />
            <span>
              <strong>{doctor.name}</strong>
              <small>
                {selectedDate} · {selectedTime}
              </small>
            </span>
          </div>
          <div className="summary-lines">
            <span>
              {c.payment.amount}
              <strong>${totalCost}</strong>
            </span>
            <span>
              {c.payment.tax} (5%)
              <strong>${tax}</strong>
            </span>
            <span>
              {c.payment.total}
              <strong>${totalCost + tax}</strong>
            </span>
          </div>
          <Button dataId="payment-submit-button" onClick={goConfirmation}>
            {c.payment.pay}
          </Button>
        </Panel>
      </div>
    </main>
  );
}

function ConfirmationView({
  c,
  doctor,
  selectedDate,
  selectedTime,
  totalCost,
  goAppointments,
  goHome,
}: {
  c: (typeof copy)[Locale];
  doctor: Doctor;
  selectedDate: string;
  selectedTime: string;
  totalCost: number;
  goAppointments: () => void;
  goHome: () => void;
}) {
  return (
    <main className="confirmation-page">
      <div data-melius-ui-id="confirmation-header" className="confirmation-header">
        <span>
          <CheckCircle2 size={34} />
        </span>
        <h1>{c.confirmation.title}</h1>
        <p>{c.confirmation.body}</p>
      </div>
      <Panel dataId="confirmation-card" roleName="summary">
        <div className="confirmation-card">
          <img src={doctor.image} alt={doctor.name} />
          <div>
            <h2>{doctor.name}</h2>
            <p>{doctor.specialty}</p>
            <div className="appointment-facts compact">
              <span>
                <CalendarCheck size={17} />
                {selectedDate}
              </span>
              <span>
                <Clock size={17} />
                {selectedTime}
              </span>
              <span>
                <MapPin size={17} />
                {doctor.location}
              </span>
            </div>
          </div>
        </div>
        <div className="confirmation-summary">
          <h3>{c.confirmation.summary}</h3>
          <div className="summary-lines">
            <span>
              {c.booking.consultationFee}
              <strong>${doctor.price}</strong>
            </span>
            <span>
              {c.booking.translator}
              <strong>$50</strong>
            </span>
            <span>
              {c.booking.hotel}
              <strong>$200</strong>
            </span>
            <span>
              {c.booking.total}
              <strong>${totalCost}</strong>
            </span>
          </div>
        </div>
        <div className="important-box" data-melius-ui-id="confirmation-important-box">
          <h3>{c.confirmation.important}</h3>
          <ul>
            <li>{c.confirmation.item1}</li>
            <li>{c.confirmation.item2}</li>
            <li>{c.confirmation.item3}</li>
          </ul>
        </div>
        <div className="form-actions">
          <Button dataId="confirmation-view-appointments-button" onClick={goAppointments}>
            {c.confirmation.view}
          </Button>
          <Button dataId="confirmation-book-another-button" variant="secondary" onClick={goHome}>
            {c.confirmation.another}
          </Button>
        </div>
      </Panel>
    </main>
  );
}

function LoginView({
  c,
  activeTab,
  setActiveTab,
  goHome,
}: {
  c: (typeof copy)[Locale];
  activeTab: 'sign-in' | 'register';
  setActiveTab: (tab: 'sign-in' | 'register') => void;
  goHome: () => void;
}) {
  return (
    <main className="login-page">
      <Panel dataId="login-card" roleName="form">
        <button type="button" data-melius-ui-id="login-back-button" className="back-link" onClick={goHome}>
          <ChevronLeft size={16} />
          {copy.en.detail.back}
        </button>
        <div className="category-tabs wide-tabs" data-melius-ui-id="auth-tabs">
          <button
            type="button"
            data-melius-ui-id="auth-tab-sign-in"
            data-active={activeTab === 'sign-in' ? 'true' : 'false'}
            onClick={() => setActiveTab('sign-in')}
          >
            {c.login.signIn}
          </button>
          <button
            type="button"
            data-melius-ui-id="auth-tab-register"
            data-active={activeTab === 'register' ? 'true' : 'false'}
            onClick={() => setActiveTab('register')}
          >
            {c.login.register}
          </button>
        </div>
        <h1>{activeTab === 'sign-in' ? c.login.title : c.login.create}</h1>
        <p>{c.login.body}</p>
        {activeTab === 'register' ? <TextField dataId="register-name-field" label={c.login.name} defaultValue="Avery Stone" /> : null}
        <TextField dataId="login-email-field" label={c.login.email} defaultValue="avery@example.com" />
        <TextField dataId="login-password-field" label={c.login.password} type="password" defaultValue="password" />
        {activeTab === 'register' ? (
          <TextField dataId="register-confirm-password-field" label={c.login.confirm} type="password" defaultValue="password" />
        ) : null}
        <Button dataId="login-submit-button" onClick={goHome}>
          {activeTab === 'sign-in' ? c.login.submit : c.login.create}
        </Button>
      </Panel>
    </main>
  );
}

export default App;
