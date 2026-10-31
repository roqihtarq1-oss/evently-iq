import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Calendar, Calculator, CheckSquare, Store, MapPin, 
  Users, DollarSign, Star, Plus, Check, Trash2, ArrowLeftRight, 
  Clock, ShieldCheck, Heart, Share2, Filter, Search, ChevronRight, 
  X, AlertCircle, Award, Sliders, Music, Camera, Gift, Utensils,
  Eye, CheckCircle2, Phone, Mail, FileText
} from 'lucide-react';

// --- MOCK DATA ---
const IRAQI_CITIES = ['بغداد', 'البصرة', 'أربيل', 'النجف الأشرف', 'الموصل', 'كربلاء المقدسة', 'السليمانية', 'بابل'];

const EVENT_TYPES = ['حفلة تخرج', 'حفلة زفاف', 'خطوبة', 'عيد ميلاد', 'مناسبة عائلية'];

const CATEGORIES = [
  { id: 'all', name: 'الكل', icon: Sparkles },
  { id: 'hall', name: 'قاعات ومواقع', icon: Store },
  { id: 'photography', name: 'تصوير وفيديو', icon: Camera },
  { id: 'decor', name: 'ديكورات وورد', icon: Gift },
  { id: 'catering', name: 'كيك وضيافة', icon: Utensils },
  { id: 'sound', name: 'صوت وإضاءة', icon: Music },
];

const INITIAL_VENDORS = [
  {
    id: 'v1',
    title: 'قاعة دجلة الملكية للمناسبات',
    category: 'hall',
    city: 'بغداد',
    price: 3500000,
    rating: 4.9,
    reviewsCount: 42,
    capacity: 'حتى 350 شخص',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&auto=format&fit=crop&q=60',
    description: 'قاعة فاخرة مزودة بأحدث أنظمة الصوت والإضاءة مع كادر خدمة متكامل وجناح خاص للعروسين.',
    featured: true,
    features: ['تكييف مركزي', 'شاشات عملاقة', 'موقف سيارات واسع', 'ضيافةVIP']
  },
  {
    id: 'v2',
    title: 'استوديو البصرة للإنتاج والتصوير',
    category: 'photography',
    city: 'البصرة',
    price: 850000,
    rating: 4.8,
    reviewsCount: 29,
    capacity: 'فريق من 4 مصورين',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&auto=format&fit=crop&q=60',
    description: 'تغطية فيديو سينمائية 4K مع تصوير درون وألبوم حراري فاخر مع المونتاج.',
    featured: true,
    features: ['تصوير درون', 'ألبوم حراري', 'فيديو سينمائي', 'جلسة تصوير خارجية']
  },
  {
    id: 'v3',
    title: 'متجر الورد والديكورات العصرية',
    category: 'decor',
    city: 'بغداد',
    price: 1200000,
    rating: 4.7,
    reviewsCount: 18,
    capacity: 'تجهيز قاعات كاملة',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&auto=format&fit=crop&q=60',
    description: 'تصميم ومسار ورود طبيعي كامل للعروسين مع كوشة فاخرة وإضاءات خافتة مخصصة.',
    featured: false,
    features: ['ورود طبيعية', 'كوشة خشبية/مذهبة', 'إضاءات رومانسية', 'مدخل استقبال']
  },
  {
    id: 'v4',
    title: 'مطبخ وحلويات بابل الفاخرة',
    category: 'catering',
    city: 'أربيل',
    price: 950000,
    rating: 4.9,
    reviewsCount: 35,
    capacity: 'بوفيه مفتوح لـ 200 شخص',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=600&auto=format&fit=crop&q=60',
    description: 'كيك طبقات مخصص للمناسبة + بوفيه حلويات ومقبلات شرقية وغربية متنوعة.',
    featured: true,
    features: ['كيك 4 طبقات', 'بوفيه مقبلات', 'عصائر طبيعية', 'مشروبات ساخنة']
  },
  {
    id: 'v5',
    title: 'مركز الموصل للصوتيات والإضاءة',
    category: 'sound',
    city: 'الموصل',
    price: 600000,
    rating: 4.6,
    reviewsCount: 15,
    capacity: 'مسرح كامل',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=60',
    description: 'أجهزة صوتية احترافية مع دي جي مخصص ومؤثرات دخان وشلالات نارية آمنة.',
    featured: false,
    features: ['دي جي محترف', 'شلالات نارية آمنة', 'مؤثرات دخان', 'إضاءة متحركة']
  }
];

const INITIAL_TASKS = [
  { id: 't1', timeframe: 'قبل شهرين', text: 'تحديد ميزانية الحفلة الإجمالية وعدد الحضور', done: true },
  { id: 't2', timeframe: 'قبل شهرين', text: 'حجز القاعة أو موقع المناسبة وتأكيد التاريخ', done: true },
  { id: 't3', timeframe: 'قبل أسبوعين', text: 'الاتفاق مع فريق التصوير وتحديد قائمة اللقطات', done: false },
  { id: 't4', timeframe: 'قبل أسبوعين', text: 'تنسيق تصميم الكيك والديكورات والورد', done: false },
  { id: 't5', timeframe: 'يوم الحفلة', text: 'التأكد من أجهزة الصوت والإضاءة وجاهزية الضيافة', done: false },
  { id: 't6', timeframe: 'يوم الحفلة', text: 'الاستمتاع بالمناسبة والتقاط أجمل الذكريات! 🎉', done: false }
];

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('browse'); // 'browse' | 'planner' | 'budget' | 'checklist' | 'vendor-portal'
  const [selectedCity, setSelectedCity] = useState('الكل');
  const [selectedEventType, setSelectedEventType] = useState('الكل');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Data States
  const [vendors, setVendors] = useState(INITIAL_VENDORS);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskTimeframe, setNewTaskTimeframe] = useState('قبل أسبوعين');

  // Comparison State
  const [comparisonList, setComparisonList] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Booking Modal
  const [bookingVendor, setBookingVendor] = useState(null);
  const [bookingRequests, setBookingRequests] = useState([
    { id: 'BK-101', vendorName: 'قاعة دجلة الملكية', customerName: 'أحمد الحلي', date: '2026-11-20', status: 'مقبول', total: 3500000 },
    { id: 'BK-102', vendorName: 'استوديو البصرة', customerName: 'سارة أربيل', date: '2026-12-05', status: 'قيد الانتظار', total: 850000 }
  ]);

  // AI Planner State
  const [plannerInput, setPlannerInput] = useState({
    eventType: 'حفلة تخرج',
    budget: 5000000,
    guests: 150,
    city: 'بغداد'
  });
  const [generatedPlan, setGeneratedPlan] = useState(null);

  // Budget State
  const [totalTargetBudget, setTotalTargetBudget] = useState(6000000);
  const [customExpenses, setCustomExpenses] = useState([
    { id: 'e1', name: 'حجز القاعة والأنوار', amount: 3000000, category: 'قاعات ومواقع' },
    { id: 'e2', name: 'تصوير فيديو وفوتوغرافي', amount: 850000, category: 'تصوير' },
    { id: 'e3', name: 'كيك الحلويات والضيافة', amount: 700000, category: 'ضيافة' }
  ]);
  const [newExpenseName, setNewExpenseName] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');

  // Notification / Toast
  const [toast, setToast] = useState(null);
  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Helper Formatter
  const formatIQD = (val) => new Intl.NumberFormat('ar-IQ').format(val) + ' د.ع';

  // --- HANDLERS ---
  const toggleComparison = (vendor) => {
    if (comparisonList.some(v => v.id === vendor.id)) {
      setComparisonList(prev => prev.filter(v => v.id !== vendor.id));
      showToast(`تم إزالة ${vendor.title} من القائمة`);
    } else {
      if (comparisonList.length >= 3) {
        showToast('يمكنك مقارنة 3 خدمات كحد أقصى في نفس الوقت', 'warning');
        return;
      }
      setComparisonList(prev => [...prev, vendor]);
      showToast(`تمت إضافة ${vendor.title} للمقارنة`);
    }
  };

  const handleCreateBooking = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newBk = {
      id: `BK-${Math.floor(100 + Math.random() * 900)}`,
      vendorName: bookingVendor.title,
      customerName: formData.get('name'),
      date: formData.get('date'),
      status: 'قيد الانتظار',
      total: bookingVendor.price
    };
    setBookingRequests(prev => [newBk, ...prev]);
    setBookingVendor(null);
    showToast('تم إرسال طلب الحجز بنجاح! سيتواصل معك مقدم الخدمة لتأكيد الموعد 🎉');
  };

  // Dynamic AI Plan Generator Simulation
  const handleGenerateAIPlan = (e) => {
    e.preventDefault();
    const budget = Number(plannerInput.budget);
    
    // Percentages allocation
    const venueBudget = budget * 0.45;
    const cateringBudget = budget * 0.20;
    const photoBudget = budget * 0.15;
    const decorBudget = budget * 0.12;
    const remaining = budget * 0.08;

    // Pick recommendations
    const recHall = vendors.find(v => v.category === 'hall' && v.price <= venueBudget) || vendors.find(v => v.category === 'hall');
    const recPhoto = vendors.find(v => v.category === 'photography' && v.price <= photoBudget) || vendors.find(v => v.category === 'photography');
    const recCatering = vendors.find(v => v.category === 'catering') || vendors[3];

    setGeneratedPlan({
      totalBudget: budget,
      guests: plannerInput.guests,
      city: plannerInput.city,
      eventType: plannerInput.eventType,
      breakdown: [
        { label: 'القاعة والخدمات الأساسية (45%)', target: venueBudget, rec: recHall },
        { label: 'الضيافة والكيك (20%)', target: cateringBudget, rec: recCatering },
        { label: 'التصوير والتوثيق (15%)', target: photoBudget, rec: recPhoto },
        { label: 'الديكور والورود (12%)', target: decorBudget, rec: null },
        { label: 'احتياطي ومسلتزمات جانبية (8%)', target: remaining, rec: null }
      ]
    });

    showToast('تم توليد الخطة الذكية المخصصة لمناسبتك بنجاح!');
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    setTasks(prev => [...prev, { id: `t-${Date.now()}`, timeframe: newTaskTimeframe, text: newTaskText, done: false }]);
    setNewTaskText('');
    showToast('تمت إضافة المهمة إلى جدولك');
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newExpenseName || !newExpenseAmount) return;
    setCustomExpenses(prev => [...prev, {
      id: `e-${Date.now()}`,
      name: newExpenseName,
      amount: Number(newExpenseAmount),
      category: 'عام'
    }]);
    setNewExpenseName('');
    setNewExpenseAmount('');
    showToast('تمت إضافة المصروف إلى الميزانية');
  };

  // Filtered Vendors List
  const filteredVendors = useMemo(() => {
    return vendors.filter(v => {
      const matchesSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase()) || v.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCity = selectedCity === 'الكل' || v.city === selectedCity;
      const matchesCat = selectedCategory === 'all' || v.category === selectedCategory;
      return matchesSearch && matchesCity && matchesCat;
    });
  }, [vendors, searchQuery, selectedCity, selectedCategory]);

  const totalSpentInBudget = customExpenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans dir-rtl" dir="rtl">
      
      {/* TOAST BANNER */}
      {toast && (
        <div className={`fixed bottom-6 left-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-white font-bold transition-all animate-bounce ${
          toast.type === 'warning' ? 'bg-amber-600' : 'bg-rose-600'
        }`}>
          <Sparkles className="w-5 h-5" />
          <span>{toast.msg}</span>
        </div>
      )}

      {/* TOP HEADER */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-rose-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('browse')}>
              <div className="w-12 h-12 bg-gradient-to-tr from-rose-600 via-purple-600 to-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-rose-900/30">
                <Sparkles className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-amber-200 via-rose-200 to-purple-200 bg-clip-text text-transparent">Evently</h1>
                  <span className="bg-rose-500/20 border border-rose-500/30 text-rose-300 text-[10px] font-bold px-2 py-0.5 rounded-full">العراق 🇮🇶</span>
                </div>
                <p className="text-xs text-slate-400 font-medium">منصة تنظيم الحفلات والمناسبات الاجتماعية</p>
              </div>
            </div>

            {/* Navigation Switcher */}
            <nav className="hidden lg:flex items-center bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
              <button
                onClick={() => setActiveTab('browse')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeTab === 'browse' ? 'bg-gradient-to-r from-rose-600 to-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Store className="w-4 h-4" />
                <span>استكشاف الخدمات</span>
              </button>

              <button
                onClick={() => setActiveTab('planner')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeTab === 'planner' ? 'bg-gradient-to-r from-rose-600 to-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>المنظم الذكي (AI)</span>
              </button>

              <button
                onClick={() => setActiveTab('budget')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeTab === 'budget' ? 'bg-gradient-to-r from-rose-600 to-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Calculator className="w-4 h-4" />
                <span>إدارة الميزانية</span>
              </button>

              <button
                onClick={() => setActiveTab('checklist')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeTab === 'checklist' ? 'bg-gradient-to-r from-rose-600 to-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <CheckSquare className="w-4 h-4" />
                <span>جدول المهام</span>
              </button>

              <button
                onClick={() => setActiveTab('vendor-portal')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeTab === 'vendor-portal' ? 'bg-gradient-to-r from-amber-600 to-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>مقدمو الخدمات</span>
              </button>
            </nav>

            {/* Compare Drawer Indicator */}
            {comparisonList.length > 0 && (
              <button
                onClick={() => setIsCompareOpen(true)}
                className="bg-purple-600/30 border border-purple-500/50 hover:bg-purple-600/50 text-purple-200 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition"
              >
                <ArrowLeftRight className="w-4 h-4" />
                <span>المقارنة ({comparisonList.length})</span>
              </button>
            )}

          </div>

          {/* Mobile Bottom Navigation */}
          <div className="flex lg:hidden border-t border-slate-800/80 py-2 justify-around text-[10px]">
            <button onClick={() => setActiveTab('browse')} className={`flex flex-col items-center gap-1 font-bold ${activeTab === 'browse' ? 'text-rose-400' : 'text-slate-500'}`}>
              <Store className="w-4 h-4" /> السوق
            </button>
            <button onClick={() => setActiveTab('planner')} className={`flex flex-col items-center gap-1 font-bold ${activeTab === 'planner' ? 'text-rose-400' : 'text-slate-500'}`}>
              <Sparkles className="w-4 h-4" /> المنظم
            </button>
            <button onClick={() => setActiveTab('budget')} className={`flex flex-col items-center gap-1 font-bold ${activeTab === 'budget' ? 'text-rose-400' : 'text-slate-500'}`}>
              <Calculator className="w-4 h-4" /> الميزانية
            </button>
            <button onClick={() => setActiveTab('checklist')} className={`flex flex-col items-center gap-1 font-bold ${activeTab === 'checklist' ? 'text-rose-400' : 'text-slate-500'}`}>
              <CheckSquare className="w-4 h-4" /> المهام
            </button>
            <button onClick={() => setActiveTab('vendor-portal')} className={`flex flex-col items-center gap-1 font-bold ${activeTab === 'vendor-portal' ? 'text-rose-400' : 'text-slate-500'}`}>
              <Award className="w-4 h-4" /> مقدم الخدمة
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ======================================================== */}
        {/* TAB 1: BROWSE & FILTER SERVICES */}
        {/* ======================================================== */}
        {activeTab === 'browse' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Festive Hero Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-950 via-purple-950 to-slate-900 border border-rose-800/30 p-8 sm:p-12 shadow-2xl">
              <div className="relative z-10 max-w-2xl space-y-4">
                <span className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs px-3 py-1 rounded-full font-bold">
                  🎉 نظم حفلتك بلا قلق أو تعب
                </span>
                <h2 className="text-3xl sm:text-5xl font-black leading-tight text-white">
                  كل ما تحتاجه لمناسبتك في مكان واحد
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  تصفح أفضل القاعات، المصورين، الديكورات، والبوفيهات في بغداد وجميع المحافظات. قارن الأسعار، احجز فوراً، ونظميزانيتك بسهولة.
                </p>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 shadow-xl space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Search input */}
                <div className="relative sm:col-span-1">
                  <Search className="w-5 h-5 absolute right-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="ابحث عن اسم قاعة، استوديو، أو خدمة..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pr-11 pl-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs font-bold focus:outline-none focus:border-rose-500 text-slate-100"
                  />
                </div>

                {/* City Filter */}
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-rose-500 shrink-0" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full py-3 px-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs font-bold text-slate-200 focus:outline-none"
                  >
                    <option value="الكل">كل المحافظات العراقية</option>
                    {IRAQI_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Event Type Filter */}
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                  <select
                    value={selectedEventType}
                    onChange={(e) => setSelectedEventType(e.target.value)}
                    className="w-full py-3 px-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs font-bold text-slate-200 focus:outline-none"
                  >
                    <option value="الكل">جميع أنواع المناسبات</option>
                    {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-2 scrollbar-none">
                {CATEGORIES.map(cat => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition ${
                        selectedCategory === cat.id
                          ? 'bg-gradient-to-r from-rose-600 to-purple-600 text-white shadow-lg'
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Vendor Cards Grid */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-xl text-slate-100 flex items-center gap-2">
                  <Store className="w-5 h-5 text-rose-500" />
                  الخدمات المتاحة ({filteredVendors.length})
                </h3>
              </div>

              {filteredVendors.length === 0 ? (
                <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-slate-800 space-y-3">
                  <Store className="w-16 h-16 text-slate-600 mx-auto" />
                  <h4 className="font-bold text-slate-300">لم نجد خيارات تطابق تصفيتك</h4>
                  <p className="text-xs text-slate-500">جرب البحث بكلمات أخرى أو تغيير المحافظة</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredVendors.map(vendor => {
                    const isComparing = comparisonList.some(v => v.id === vendor.id);
                    return (
                      <div 
                        key={vendor.id} 
                        className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl hover:border-rose-500/50 transition-all group flex flex-col justify-between"
                      >
                        {/* Card Top / Image */}
                        <div>
                          <div className="relative h-52 bg-slate-950 overflow-hidden">
                            <img 
                              src={vendor.image} 
                              alt={vendor.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                            
                            <span className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-slate-200 text-xs font-bold px-3 py-1 rounded-xl border border-slate-800 flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-rose-500" /> {vendor.city}
                            </span>

                            {vendor.featured && (
                              <span className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-xl uppercase tracking-wider">
                                مُميز
                              </span>
                            )}
                          </div>

                          {/* Card Body */}
                          <div className="p-5 space-y-3">
                            <div className="flex items-center justify-between text-xs">
                              <span className="flex items-center gap-1 text-amber-400 font-bold">
                                <Star className="w-4 h-4 fill-amber-400" /> {vendor.rating} ({vendor.reviewsCount} تقييم)
                              </span>
                              <span className="text-slate-400 font-medium flex items-center gap-1">
                                <Users className="w-3.5 h-3.5 text-purple-400" /> {vendor.capacity}
                              </span>
                            </div>

                            <h4 className="font-bold text-lg text-slate-100 line-clamp-1">{vendor.title}</h4>
                            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{vendor.description}</p>

                            {/* Features Tags */}
                            <div className="flex flex-wrap gap-1.5 pt-2">
                              {vendor.features.slice(0, 3).map((f, i) => (
                                <span key={i} className="text-[10px] bg-slate-950 text-slate-300 border border-slate-800 px-2.5 py-1 rounded-lg">
                                  ✓ {f}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Card Footer */}
                        <div className="p-5 pt-0 space-y-3 border-t border-slate-800/60 mt-4">
                          <div className="flex items-baseline justify-between pt-3">
                            <div>
                              <span className="text-[10px] text-slate-400 block">السعر التقديري</span>
                              <span className="text-xl font-black text-amber-400">{formatIQD(vendor.price)}</span>
                            </div>

                            <button
                              onClick={() => toggleComparison(vendor)}
                              className={`p-2 rounded-xl border text-xs font-bold transition flex items-center gap-1 ${
                                isComparing 
                                  ? 'bg-purple-600/30 border-purple-500 text-purple-300' 
                                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                              }`}
                            >
                              <ArrowLeftRight className="w-3.5 h-3.5" />
                              <span>{isComparing ? 'مُدرج بالمقارنة' : 'قارن'}</span>
                            </button>
                          </div>

                          <button
                            onClick={() => setBookingVendor(vendor)}
                            className="w-full py-3 bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-bold text-xs rounded-2xl shadow-lg shadow-rose-950/40 transition flex items-center justify-center gap-2"
                          >
                            <Calendar className="w-4 h-4" /> طلب حجز أو استفسار مباشر
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 2: AI SMART EVENT PLANNER (المنظم الذكي) */}
        {/* ================================================================= */}
        {activeTab === 'planner' && (
          <div className="space-y-8 animate-fadeIn">
            
            <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-rose-950 p-8 rounded-3xl border border-purple-800/40 shadow-2xl relative overflow-hidden">
              <div className="relative z-10 max-w-2xl space-y-3">
                <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs px-3 py-1 rounded-full font-bold">
                  <Sparkles className="w-4 h-4 text-amber-300" /> خوارزمية التخطيط التلقائي المبتكرة
                </div>
                <h2 className="text-3xl font-black text-white">منظم الحفلات الذكي - Evently AI</h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  أدخل تفاصيل مناسبتك وميزانيتك، وسيقوم النظام فوراً بتقسيم الميزانية واقتراح الباقات والخدمات الأنسب لتضمن أفضل تجربة بأقل تكلفة.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Form Input */}
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
                <h3 className="font-bold text-lg text-slate-100 flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-rose-500" /> حدد بيانات المناسبة
                </h3>

                <form onSubmit={handleGenerateAIPlan} className="space-y-4 text-xs font-bold">
                  <div>
                    <label className="text-slate-400 block mb-1">نوع المناسبة</label>
                    <select
                      value={plannerInput.eventType}
                      onChange={(e) => setPlannerInput({...plannerInput, eventType: e.target.value})}
                      className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-slate-100 focus:outline-none"
                    >
                      {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">الميزانية الإجمالية التقديرية (د.ع)</label>
                    <input
                      type="number"
                      value={plannerInput.budget}
                      onChange={(e) => setPlannerInput({...plannerInput, budget: e.target.value})}
                      className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-amber-400 font-black focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">عدد الحضور المتوقع</label>
                    <input
                      type="number"
                      value={plannerInput.guests}
                      onChange={(e) => setPlannerInput({...plannerInput, guests: e.target.value})}
                      className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-slate-100 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">المحافظة</label>
                    <select
                      value={plannerInput.city}
                      onChange={(e) => setPlannerInput({...plannerInput, city: e.target.value})}
                      className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-slate-100 focus:outline-none"
                    >
                      {IRAQI_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-bold rounded-2xl shadow-lg transition flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" /> توليد خطة الحفلة الذكية
                  </button>
                </form>
              </div>

              {/* Generated Plan Output */}
              <div className="lg:col-span-2 space-y-6">
                {!generatedPlan ? (
                  <div className="bg-slate-900/50 p-12 rounded-3xl border border-slate-800 text-center space-y-3">
                    <Sparkles className="w-12 h-12 text-slate-600 mx-auto" />
                    <h4 className="font-bold text-slate-300">الخطة الذكية غير مولدة بعد</h4>
                    <p className="text-xs text-slate-500">اختر التفاصيل واضغط على "توليد خطة الحفلة الذكية" ليظهر لك التقسيم والمقترحات.</p>
                  </div>
                ) : (
                  <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-4 gap-2">
                      <div>
                        <h3 className="font-black text-xl text-amber-400">خطة {generatedPlan.eventType} المتكاملة</h3>
                        <p className="text-xs text-slate-400">لـ {generatedPlan.guests} شخص في محافظة {generatedPlan.city}</p>
                      </div>
                      <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1.5 rounded-2xl text-xs font-bold">
                        الميزانية: {formatIQD(generatedPlan.totalBudget)}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-bold text-xs text-slate-300">التقسيم الموصى به للميزانية وتوصيات المتاجر:</h4>
                      
                      {generatedPlan.breakdown.map((item, idx) => (
                        <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                          <div className="flex justify-between items-center text-xs font-bold">
                            <span className="text-slate-200">{item.label}</span>
                            <span className="text-amber-400">{formatIQD(item.target)}</span>
                          </div>

                          {item.rec ? (
                            <div className="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-800">
                              <div className="flex items-center gap-3">
                                <img src={item.rec.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                                <div>
                                  <span className="text-xs font-bold text-slate-100 block">{item.rec.title}</span>
                                  <span className="text-[10px] text-slate-400">{item.rec.city} • {formatIQD(item.rec.price)}</span>
                                </div>
                              </div>
                              <button
                                onClick={() => setBookingVendor(item.rec)}
                                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition"
                              >
                                احجز هذا الخيار
                              </button>
                            </div>
                          ) : (
                            <p className="text-[11px] text-slate-500 italic">مخصص للمستلزمات الثانوية والطوارئ</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 3: BUDGET MANAGER (حاسبة الميزانية وتوزيع التكاليف) */}
        {/* ================================================================= */}
        {activeTab === 'budget' && (
          <div className="space-y-8 animate-fadeIn">
            
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-black text-slate-100">إدارة ومراقبة الميزانية الحية</h2>
                <p className="text-xs text-slate-400 mt-1">سجل كل مصروفاتك وتجنب التكاليف الخفية لمناسبتك</p>
              </div>

              <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <span className="text-xs font-bold text-slate-400">الميزانية المحددة:</span>
                <input
                  type="number"
                  value={totalTargetBudget}
                  onChange={(e) => setTotalTargetBudget(Number(e.target.value))}
                  className="bg-transparent text-amber-400 font-black text-lg focus:outline-none w-36"
                />
                <span className="text-xs text-slate-500 font-bold">د.ع</span>
              </div>
            </div>

            {/* Visual Budget Progress */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center text-xs font-bold">
                <span>المبلغ المخصص حتى الآن: {formatIQD(totalSpentInBudget)}</span>
                <span className={totalSpentInBudget > totalTargetBudget ? 'text-red-400' : 'text-emerald-400'}>
                  {totalSpentInBudget > totalTargetBudget 
                    ? `تجاوزت الميزانية بـ ${formatIQD(totalSpentInBudget - totalTargetBudget)}` 
                    : `المتبقي للإنفاق: ${formatIQD(totalTargetBudget - totalSpentInBudget)}`}
                </span>
              </div>

              <div className="w-full bg-slate-950 h-4 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    totalSpentInBudget > totalTargetBudget ? 'bg-red-500' : 'bg-gradient-to-r from-rose-600 to-amber-500'
                  }`}
                  style={{ width: `${Math.min((totalSpentInBudget / totalTargetBudget) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Custom Expenses List & Add Form */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
                <div className="p-5 border-b border-slate-800">
                  <h3 className="font-bold text-slate-100 text-sm">قائمة المصاريف المسجلة</h3>
                </div>

                <div className="divide-y divide-slate-800">
                  {customExpenses.map(expense => (
                    <div key={expense.id} className="p-4 flex items-center justify-between hover:bg-slate-950/50 transition">
                      <div>
                        <span className="font-bold text-slate-200 text-sm block">{expense.name}</span>
                        <span className="text-[10px] text-slate-500">{expense.category}</span>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-black text-amber-400 text-sm">{formatIQD(expense.amount)}</span>
                        <button
                          onClick={() => {
                            setCustomExpenses(prev => prev.filter(e => e.id !== expense.id));
                            showToast('تم إزالة المصروف');
                          }}
                          className="text-slate-500 hover:text-red-400 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Expense Form */}
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Plus className="w-4 h-4 text-rose-500" /> إضافة بند جديد
                </h3>

                <form onSubmit={handleAddExpense} className="space-y-3 text-xs font-bold">
                  <div>
                    <label className="text-slate-400 block mb-1">اسم الخدمة أو البند</label>
                    <input
                      required
                      value={newExpenseName}
                      onChange={(e) => setNewExpenseName(e.target.value)}
                      placeholder="مثال: عربون المصور"
                      className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-slate-100 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">المبلغ (د.ع)</label>
                    <input
                      required
                      type="number"
                      value={newExpenseAmount}
                      onChange={(e) => setNewExpenseAmount(e.target.value)}
                      placeholder="500000"
                      className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-amber-400 font-black focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-2xl transition"
                  >
                    حفظ البند للميزانية
                  </button>
                </form>
              </div>
            </div>

          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 4: CHECKLIST & TIMELINE (جدول المهام) */}
        {/* ================================================================= */}
        {activeTab === 'checklist' && (
          <div className="space-y-8 animate-fadeIn">
            
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-100">جدول متابعة التحضيرات للحفلة</h2>
                <p className="text-xs text-slate-400 mt-1">تأكد من إنجاز كل الخطوات في موعدها المحدد لضمان حفلة مثاليه</p>
              </div>

              {/* Progress */}
              <div className="bg-slate-950 px-5 py-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-500 block font-bold">نسبة الإنجاز</span>
                <span className="text-lg font-black text-emerald-400">
                  {Math.round((tasks.filter(t => t.done).length / (tasks.length || 1)) * 100)}%
                </span>
              </div>
            </div>

            {/* Add Task Form */}
            <form onSubmit={handleAddTask} className="bg-slate-900 p-4 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center gap-3">
              <input
                required
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                placeholder="أضف مهمة جديدة (مثال: تأكيد كوشة الورد مع المصمم)..."
                className="flex-1 w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs font-bold text-slate-100 focus:outline-none"
              />

              <select
                value={newTaskTimeframe}
                onChange={(e) => setNewTaskTimeframe(e.target.value)}
                className="p-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs font-bold text-slate-300 focus:outline-none"
              >
                <option value="قبل شهرين">قبل شهرين</option>
                <option value="قبل أسبوعين">قبل أسبوعين</option>
                <option value="يوم الحفلة">يوم الحفلة</option>
              </select>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-2xl transition shrink-0"
              >
                + إضافة مهمة
              </button>
            </form>

            {/* Tasks Grouped By Timeframe */}
            <div className="space-y-6">
              {['قبل شهرين', 'قبل أسبوعين', 'يوم الحفلة'].map(tf => (
                <div key={tf} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" /> {tf}
                  </h3>

                  <div className="space-y-2">
                    {tasks.filter(t => t.timeframe === tf).map(task => (
                      <div 
                        key={task.id} 
                        onClick={() => {
                          setTasks(prev => prev.map(t => t.id === task.id ? { ...t, done: !t.done } : t));
                        }}
                        className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                          task.done 
                            ? 'bg-emerald-950/20 border-emerald-800/40 text-slate-400 line-through' 
                            : 'bg-slate-950 border-slate-800 text-slate-100 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-lg border flex items-center justify-center ${
                            task.done ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-700'
                          }`}>
                            {task.done && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span className="text-xs font-bold">{task.text}</span>
                        </div>

                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setTasks(prev => prev.filter(t => t.id !== task.id));
                          }}
                          className="text-slate-600 hover:text-red-400 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 5: VENDOR PORTAL (لوحة مقدم الخدمة) */}
        {/* ================================================================= */}
        {activeTab === 'vendor-portal' && (
          <div className="space-y-8 animate-fadeIn">
            
            <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-rose-950 p-6 rounded-3xl border border-amber-800/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-100">لوحة تحكم أصحاب الخدمات والقاعات</h2>
                <p className="text-xs text-slate-400 mt-1">اعرض خدماتك للحفلات، واستقبل طلبات الحجز المباشرة من الزبائن</p>
              </div>

              <button 
                onClick={() => showToast('سيتم فتح نموذج التسجيل كمُجهّز جديد')}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-2xl shadow-lg transition"
              >
                + إضافة خدمة جديدة للقمة
              </button>
            </div>

            {/* Vendor Incoming Bookings */}
            <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="p-5 border-b border-slate-800">
                <h3 className="font-bold text-slate-100 text-sm">طلبات الحجز والاستفسار الواردة</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                    <tr>
                      <th className="p-4">رقم الطلب</th>
                      <th className="p-4">اسم الخدمة</th>
                      <th className="p-4">الزبون</th>
                      <th className="p-4">التاريخ المطلوب</th>
                      <th className="p-4">الإجمالي</th>
                      <th className="p-4">الحالة</th>
                      <th className="p-4 text-center">إجراء</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {bookingRequests.map(req => (
                      <tr key={req.id} className="hover:bg-slate-950/50 transition">
                        <td className="p-4 font-bold text-slate-200">{req.id}</td>
                        <td className="p-4 font-bold text-rose-400">{req.vendorName}</td>
                        <td className="p-4 text-slate-300">{req.customerName}</td>
                        <td className="p-4 text-slate-400">{req.date}</td>
                        <td className="p-4 font-black text-amber-400">{formatIQD(req.total)}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            req.status === 'مقبول' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}>
                            {req.status}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          {req.status === 'قيد الانتظار' && (
                            <button
                              onClick={() => {
                                setBookingRequests(prev => prev.map(r => r.id === req.id ? { ...r, status: 'مقبول' } : r));
                                showToast(`تم تأكيد حجز الطلب ${req.id}`);
                              }}
                              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-bold transition"
                            >
                              قبول وتأكيد
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* ======================================================== */}
      {/* MODAL: DIRECT BOOKING REQUEST */}
      {/* ======================================================== */}
      {bookingVendor && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl max-w-lg w-full p-6 space-y-5 border border-slate-800 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-base">حجز / طلب استفسار مباشر</h3>
              <button onClick={() => setBookingVendor(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
              <img src={bookingVendor.image} alt="" className="w-14 h-14 rounded-xl object-cover" />
              <div>
                <h4 className="font-bold text-slate-100 text-sm">{bookingVendor.title}</h4>
                <span className="text-xs text-amber-400 font-black">{formatIQD(bookingVendor.price)}</span>
              </div>
            </div>

            <form onSubmit={handleCreateBooking} className="space-y-3 text-xs font-bold">
              <div>
                <label className="text-slate-400 block mb-1">الاسم الكامل</label>
                <input required name="name" placeholder="أحمد علي" className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-slate-100 focus:outline-none" />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">رقم الهاتف للتواصل عبر الواتساب</label>
                <input required name="phone" placeholder="07700000000" className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-slate-100 focus:outline-none" />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">تاريخ الحفلة المتوقع</label>
                <input required type="date" name="date" className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-slate-100 focus:outline-none" />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-bold rounded-2xl shadow-lg transition"
              >
                إرسال طلب الحجز لمقدم الخدمة
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* DRAWER: SIDE-BY-SIDE VENDOR COMPARISON */}
      {/* ======================================================== */}
      {isCompareOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl max-w-4xl w-full p-6 space-y-6 border border-slate-800 shadow-2xl overflow-x-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <ArrowLeftRight className="w-5 h-5 text-rose-500" />
                <h3 className="font-bold text-slate-100 text-lg">جدول مقارنة الخدمات المختارة</h3>
              </div>
              <button onClick={() => setIsCompareOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-3 gap-4 min-w-[600px]">
              {comparisonList.map(vendor => (
                <div key={vendor.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <img src={vendor.image} alt="" className="w-full h-28 object-cover rounded-xl" />
                    <h4 className="font-bold text-slate-100 text-sm line-clamp-1">{vendor.title}</h4>
                    <span className="text-xs text-amber-400 font-black block">{formatIQD(vendor.price)}</span>
                    <span className="text-[10px] text-slate-400 block">📍 {vendor.city}</span>
                    <span className="text-[10px] text-purple-300 block">👥 {vendor.capacity}</span>
                  </div>

                  <button
                    onClick={() => {
                      setBookingVendor(vendor);
                      setIsCompareOpen(false);
                    }}
                    className="w-full py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition"
                  >
                    حجز هذا الخيار
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}