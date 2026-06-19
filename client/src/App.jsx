import { useState, useEffect, useRef } from "react";
import "./App.css";

// 📌 API URL - على Vercel يكون /api، محلياً localhost:5000
const API = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  ? "http://localhost:5000"
  : "/api";

const lessons = [
  { id: "intro", title: "🌐 مقدمة", sub: "ما هو API؟" },
  { id: "methods", title: "📡 Methods", sub: "GET, POST, PUT, DELETE" },
  { id: "request", title: "📦 الطلب", sub: "Params, Body, Headers" },
  { id: "status", title: "📊 الحالات", sub: "Status Codes" },
  { id: "crud", title: "📝 CRUD", sub: "تطبيق عملي" },
  { id: "middleware", title: "🔌 Middleware", sub: "الوسيط" },
  { id: "auth", title: "🔐 مصادقة", sub: "تسجيل + دخول" },
  { id: "passwords", title: "🔑 كلمات السر", sub: "توليد + تشفير" },
  { id: "database", title: "🗄️ قاعدة بيانات", sub: "بحث وفلترة" },
  { id: "file", title: "📎 رفع ملفات", sub: "File Upload" },
  { id: "pagination", title: "📄 ترقيم", sub: "Pagination + Sorting" },
  { id: "search", title: "🔍 بحث", sub: "Search + Filter" },
  { id: "ratelimit", title: "⏳ تحديد", sub: "Rate Limiting" },
  { id: "validation", title: "✅ تحقق", sub: "Validation" },
  { id: "caching", title: "💾 تخبئة", sub: "ETag + Cache" },
  { id: "versioning", title: "📌 إصدارات", sub: "API Versioning" },
  { id: "webhooks", title: "🔔 Webhooks", sub: "إشعارات" },
  { id: "jobs", title: "⚙️ مهام", sub: "Background Jobs" },
  { id: "graphql", title: "📊 GraphQL", sub: "استعلامات" },
  { id: "websocket", title: "🔴 WebSocket", sub: "Real-time" },
  { id: "rest", title: "🏗️ RESTful", sub: "تصميم API" },
  { id: "env", title: "🔐 المتغيرات", sub: "Environment" },
  { id: "errors", title: "⚠️ الأخطاء", sub: "Error Handling" },
  { id: "deploy", title: "🚀 نشر", sub: "Deployment" },
  { id: "practice-methods", title: "🎯 تدريب Methods", sub: "تمرن على الـ 5 Methods" },
  { id: "practice-crud", title: "🎯 تدريب CRUD", sub: "تمرن على CRUD كامل" },
  { id: "practice-auth", title: "🎯 تدريب Auth", sub: "تمرن على المصادقة" },
  { id: "practice-validation", title: "🎯 تدريب Validation", sub: "تمرن على التحقق" },
];

export default function App() {
  const [lesson, setLesson] = useState("intro");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="app">
      <header>
        <button className="header-toggle" onClick={() => setSidebarOpen(!sidebarOpen)} title={sidebarOpen ? "إخفاء القائمة" : "إظهار القائمة"}>
          <span className="toggle-bar"></span>
          <span className="toggle-bar"></span>
          <span className="toggle-bar"></span>
        </button>
        <h1>🚀 بناء APIs — الدليل الشامل</h1>
        <p>{lessons.length} درس تفاعلي • اشرح + جرب + اتقن</p>
        <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>{sidebarOpen ? "✕" : "☰"}</button>
      </header>

      <div className={`layout ${sidebarOpen ? "" : "sidebar-hidden"}`}>
        <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
          <div className="sidebar-top">
            <span className="progress">{lessons.findIndex(l => l.id === lesson) + 1} / {lessons.length}</span>
            <button className="sidebar-toggle" onClick={() => setSidebarOpen(false)} title="إخفاء القائمة">◀</button>
          </div>
          <nav>{lessons.map(l => (
            <button key={l.id} className={lesson === l.id ? "active" : ""}
              onClick={() => { setLesson(l.id); }}>
              <span className="nav-icon">{l.title.split(" ")[0]}</span>
              <span className="nav-text">{l.title.split(" ").slice(1).join(" ")}</span>
              <span className="nav-sub">{l.sub}</span>
            </button>
          ))}</nav>
        </aside>
        {!sidebarOpen && (
          <button className="sidebar-reopen" onClick={() => setSidebarOpen(true)} title="إظهار القائمة">
            ▶ القائمة
          </button>
        )}

        <main key={lesson}>
          {lesson === "intro" && <Intro />}
          {lesson === "methods" && <Methods onNavigate={setLesson} />}
          {lesson === "request" && <Request />}
          {lesson === "status" && <Status />}
          {lesson === "crud" && <Crud onNavigate={setLesson} />}
          {lesson === "middleware" && <Middleware />}
          {lesson === "auth" && <Auth onNavigate={setLesson} />}
          {lesson === "passwords" && <Passwords />}
          {lesson === "database" && <Database />}
          {lesson === "file" && <FileUpload />}
          {lesson === "pagination" && <Pagination />}
          {lesson === "search" && <Search />}
          {lesson === "ratelimit" && <RateLimit />}
          {lesson === "validation" && <Validation onNavigate={setLesson} />}
          {lesson === "caching" && <Caching />}
          {lesson === "versioning" && <Versioning />}
          {lesson === "webhooks" && <Webhooks />}
          {lesson === "jobs" && <Jobs />}
          {lesson === "graphql" && <GraphQL />}
          {lesson === "websocket" && <WebSocket />}
          {lesson === "rest" && <REST />}
          {lesson === "env" && <Env />}
          {lesson === "errors" && <Errors />}
          {lesson === "deploy" && <Deploy />}
          {lesson === "practice-methods" && <PracticeMethods />}
          {lesson === "practice-crud" && <PracticeCrud />}
          {lesson === "practice-auth" && <PracticeAuth />}
          {lesson === "practice-validation" && <PracticeValidation />}
        </main>
      </div>
    </div>
  );
}

// ===== Helper Components =====
function Page({ title, sub, children }) {
  return <div className="page"><h2>{title}</h2><p className="page-sub">{sub}</p><div className="page-content">{children}</div></div>;
}
function Box({ title, children }) {
  return <div className="box"><h3>{title}</h3>{children}</div>;
}
function Code({ code }) {
  const [copied, setCopied] = useState(false);
  return <div className="code-wrap"><button className="copy-btn" onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>{copied ? "✅" : "📋"}</button><pre><code>{code}</code></pre></div>;
}
function CodeDual({ clean, explained }) {
  const [showExplained, setShowExplained] = useState(true);
  const [copied, setCopied] = useState(false);
  const code = showExplained ? explained : clean;
  return <div className="code-dual">
    <div className="code-dual-tabs">
      <button className={`code-tab ${showExplained ? "active" : ""}`} onClick={() => setShowExplained(true)}>📖 مع الشرح</button>
      <button className={`code-tab ${!showExplained ? "active" : ""}`} onClick={() => setShowExplained(false)}>📋 نسخة نظيفة</button>
    </div>
    <div className="code-wrap" style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
      <button className="copy-btn" onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>{copied ? "✅" : "📋"}</button>
      <pre><code>{code}</code></pre>
    </div>
  </div>;
}
function Terminal({ method, url, body }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputUrl, setInputUrl] = useState(url);
  const [inputBody, setInputBody] = useState(body || "");
  const [inputMethod, setInputMethod] = useState(method);

  const color = { GET: "#6366f1", POST: "#22c55e", PUT: "#eab308", PATCH: "#f97316", DELETE: "#ef4444" };

  const send = async () => {
    setLoading(true);
    const start = performance.now();
    try {
      const opts = { method: inputMethod, headers: { "Content-Type": "application/json" } };
      if (inputBody && inputMethod !== "GET") opts.body = inputBody;
      const r = await fetch(inputUrl, opts);
      const text = await r.text();
      let data;
      try { data = JSON.parse(text); } catch { data = text; }
      const time = Math.round(performance.now() - start);
      setRequests(prev => [{
        id: Date.now(), method: inputMethod, url: inputUrl, body: inputBody,
        status: r.status, statusText: r.statusText, time,
        resHeaders: Object.fromEntries(r.headers.entries()),
        data, timestamp: new Date().toLocaleTimeString()
      }, ...prev.slice(0, 19)]);
    } catch (e) {
      setRequests(prev => [{
        id: Date.now(), method: inputMethod, url: inputUrl,
        error: e.message, timestamp: new Date().toLocaleTimeString()
      }, ...prev.slice(0, 19)]);
    }
    setLoading(false);
  };

  const latest = requests[0];

  return <div className="terminal">
    <div className="terminal-top">
      <span className="terminal-title">📟 Terminal</span>
      {latest && !latest.error && <span className="terminal-badge" style={{background: latest.status < 400 ? "var(--success)" : "var(--danger)"}}>{latest.status}</span>}
      {latest && <span className="terminal-time">{latest.time}ms</span>}
      <button className="terminal-clear" onClick={() => setRequests([])} title="مسح">🗑️</button>
    </div>

    <div className="terminal-log">
      {requests.length === 0 ? <div className="terminal-empty">
        <span className="term-prompt">$</span> انقر 🚀 لإرسال الطلب
      </div> : requests.map((r, i) => <div key={r.id} className={`term-entry ${i === 0 ? "latest" : "history"}`}>
        <div className="term-curl"><span className="term-prompt">$</span> curl -X {r.method} <span className="term-url">"{r.url}"</span></div>
        {r.body && <div className="term-line"><span className="term-label">-d</span> {r.body}</div>}
        {r.error ? <>
          <div className="term-sep">⛔ Error</div>
          <div className="term-line" style={{color:"var(--danger)"}}>{r.error}</div>
        </> : <>
          <div className="term-sep" style={{color: r.status < 400 ? "var(--success)" : "var(--danger)"}}>
            ◀ {r.status} {r.statusText} <span className="term-muted">({r.time}ms)</span>
          </div>
          <pre className="term-json">{JSON.stringify(r.data, null, 2)}</pre>
        </>}
        {i > 0 && <div className="term-history-time">{r.timestamp}</div>}
      </div>)}
    </div>

    <div className="terminal-inputs">
      <div className="term-method-row">
        <select value={inputMethod} onChange={e => setInputMethod(e.target.value)} className="term-select" style={{borderColor: color[inputMethod]}}>
          {["GET","POST","PUT","PATCH","DELETE"].map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <input value={inputUrl} onChange={e => setInputUrl(e.target.value)} className="term-url-input" placeholder="https://..." />
        <button onClick={send} disabled={loading} className="term-send" style={{background: color[inputMethod]}}>
          {loading ? "⏳" : "🚀"}
        </button>
      </div>
      {inputMethod !== "GET" && <textarea value={inputBody} onChange={e => setInputBody(e.target.value)}
        rows={2} placeholder='{"key": "value"}' className="term-body-input" />}
    </div>
  </div>;
}
function Tag({ label, desc, code }) {
  return <div className="tag-box"><span className="badge" style={{ background: "#6366f1" }}>{label}</span><strong>{desc}</strong><code>{code}</code></div>;
}
function TrainingLink({ onClick, label }) {
  return <button className="training-link" onClick={onClick}>{label} ←</button>;
}

// ===== Question Banks for Quizzes =====
const introQuestions = [
  { q: "ما معنى API؟", options: ["واجهة برمجة التطبيقات", "تطبيق ويب", "قاعدة بيانات", "لغة برمجة"], correct: 0 },
  { q: "أي من هذه مكونات API؟", options: ["Endpoint, Method, Headers, Body", "HTML, CSS, JS", "Table, Row, Column", "GET, POST, PUT"], correct: 0 },
  { q: "ماذا يفعل Express.json()؟", options: ["يحول JSON لنص", "يقرأ JSON من الطلب", "يرسل رد JSON", "يحذف JSON"], correct: 1 },
  { q: "أي دالة تشغل السيرفر؟", options: ["app.run()", "app.start()", "app.listen()", "app.serve()"], correct: 2 },
  { q: "ما المنفذ الافتراضي في الأمثلة؟", options: ["3000", "5000", "8080", "8000"], correct: 1 },
];
const methodsQuestions = [
  { q: "أي Method يجيب البيانات من السيرفر؟", options: ["GET", "POST", "PUT", "DELETE"], correct: 0 },
  { q: "أي Method ينشئ مورداً جديداً؟", options: ["GET", "POST", "PUT", "PATCH"], correct: 1 },
  { q: "ماذا يعني 201 Created؟", options: ["تم الحذف", "تم الإنشاء", "غير موجود", "خطأ"], correct: 1 },
  { q: "أي Method يستبدل المورد بالكامل؟", options: ["PATCH", "POST", "PUT", "DELETE"], correct: 2 },
  { q: "الفرق بين PUT و PATCH؟", options: ["PUT أسرع", "PUT يستبدل الكل، PATCH يحدث جزءاً", "PATCH أقوى", "ما في فرق"], correct: 1 },
];
const requestQuestions = [
  { q: "أي قناة ترسل بها رقم المستخدم في الرابط؟", options: ["Body", "Query", "Params", "Headers"], correct: 2 },
  { q: "أين تكتب بيانات الفلترة مثل page=2؟", options: ["Params", "Query", "Body", "Headers"], correct: 1 },
  { q: "أين يرسل العميل التوكن؟", options: ["Body", "Query", "Params", "Headers"], correct: 3 },
  { q: "أي Middleware ضروري لقراءة JSON؟", options: ["express.urlencoded()", "express.json()", "express.static()", "cors()"], correct: 1 },
  { q: "ماذا يحتوي req.body؟", options: ["بيانات الرابط", "بيانات JSON المرسلة", "عنوان IP", "التاريخ"], correct: 1 },
];
const statusQuestions = [
  { q: "200 OK يعني؟", options: ["تم إنشاء المورد", "الطلب نجح", "غير موجود", "خطأ"], correct: 1 },
  { q: "أي رقم يدل على خطأ في السيرفر؟", options: ["400", "401", "500", "302"], correct: 2 },
  { q: "404 يعني؟", options: ["تم الحذف", "غير موجود", "ممنوع", "خطأ في السيرفر"], correct: 1 },
  { q: "أي Status Code يعود عند عدم التصريح (Unauthorized)؟", options: ["400", "401", "403", "405"], correct: 1 },
  { q: "ماذا تعرف عن Status Code 201؟", options: ["OK", "Created", "No Content", "Moved"], correct: 1 },
];
const crudQuestions = [
  { q: "CRUD اختصار لـ:", options: ["Create, Run, Update, Delete", "Create, Read, Update, Delete", "Copy, Run, Upload, Drop", "Create, Read, Upload, Drop"], correct: 1 },
  { q: "أي عملية في CRUD يقابلها GET؟", options: ["Create", "Read", "Update", "Delete"], correct: 1 },
  { q: "أي Status Code يعود عند إنشاء مهمة جديدة؟", options: ["200", "201", "204", "301"], correct: 1 },
  { q: "ماذا يفعل PATCH في تطبيق المهام؟", options: ["يمسح المهمة", "يغير حالة الإنجاز", "يضيف مهمة", "يجيب المهام"], correct: 1 },
  { q: "أي Method يقابل Delete في CRUD؟", options: ["GET", "POST", "PUT", "DELETE"], correct: 3 },
];
const middlewareQuestions = [
  { q: "ماذا يفعل Middleware؟", options: ["ينهي الطلب فوراً", "ينفذ قبل الـ Route ويمرر الطلب", "يرسل الرد", "يتصل بقاعدة البيانات"], correct: 1 },
  { q: "أي دالة تمرر الطلب للـ Middleware التالي؟", options: ["pass()", "next()", "continue()", "forward()"], correct: 1 },
  { q: "ماذا يحدث إذا لم ينادِ Middleware دالة next()؟", options: ["يتابع تلقائياً", "يتعلق الطلب (ما يرجع رد)", "يرجع خطأ 500", "يتجاوز الـ Route"], correct: 1 },
  { q: "أي دالة تضيف Middleware لكل المسارات؟", options: ["app.get()", "app.use()", "app.post()", "app.route()"], correct: 1 },
  { q: "أي Middleware في المثال يحمي مسار /api/admin؟", options: ["logging", "protect", "errorHandler", "express.json"], correct: 1 },
];
const authQuestions = [
  { q: "لماذا نشفر كلمة السر قبل تخزينها؟", options: ["عشان نخليها أسرع", "عشان لو تسربت قاعدة البيانات ما يعرفوها", "عشان تقل مساحتها", "هذا غير ضروري"], correct: 1 },
  { q: "ماذا تخزن في قاعدة البيانات بدلاً من كلمة السر؟", options: ["نص كلمة السر", "Hash", "ID", "Token"], correct: 1 },
  { q: "ماذا تستخدم لتوليد التوكن؟", options: ["bcrypt", "express.json", "crypto.randomBytes", "Math.random"], correct: 2 },
  { q: "أي Status Code عند فشل المصادقة؟", options: ["400", "401", "403", "404"], correct: 1 },
  { q: "كيف يرسل العميل التوكن؟", options: ["في Body", "في URL", "في Header Authorization", "في Query"], correct: 2 },
];
const validationQuestions = [
  { q: "لماذا نتحقق من البيانات؟", options: ["عشان نحسن الأداء", "لأن المستخدم قد يرسل بيانات خاطئة", "هذا اختياري", "عشان نزود التعقيد"], correct: 1 },
  { q: "أي Status Code عند فشل التحقق؟", options: ["400", "401", "422", "500"], correct: 2 },
  { q: "ماذا يعني التحقق من الطول؟", options: ["نتأكد أن الطول بين حدين", "نقيس وقت الاستجابة", "نتأكد من وجود البيانات", "لا شيء"], correct: 0 },
  { q: "أفضل مكان للتحقق من البيانات؟", options: ["في قاعدة البيانات", "في السيرفر قبل المعالجة", "في العميل فقط", "ما يحتاج تحقق"], correct: 1 },
  { q: "422 Unprocessable Entity يعني؟", options: ["تم بنجاح", "البيانات مفهومة لكن غير صالحة", "غير مصرح", "غير موجود"], correct: 1 },
];

// ===== Reusable Quiz & Challenge Components =====
function Quiz({ questions }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const next = () => {
    if (current < questions.length - 1) { setCurrent(current + 1); setSelected(null); }
    else setShowResult(true);
  };
  const restart = () => { setCurrent(0); setAnswers({}); setSelected(null); setShowResult(false); };
  if (showResult) {
    const score = questions.filter((q, i) => answers[i] === q.correct).length;
    return <div className="result-box"><h4 style={{textAlign:"center",marginBottom:"8px"}}>📊 النتيجة: {score}/{questions.length}</h4>{questions.map((q,i) => <div key={i} style={{fontSize:13,padding:"4px 0",borderBottom:"1px solid var(--border)"}}><strong>{q.q}</strong> <span>{answers[i]===q.correct?"✅":"❌"}</span> <span className="muted">(الإجابة: {q.options[q.correct]})</span></div>)}<button onClick={restart} className="btn-p" style={{marginTop:"8px",width:"100%"}}>🔄 إعادة الاختبار</button></div>;
  }
  const q = questions[current];
  return <div>
    <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"10px"}}>
      <span style={{fontSize:"13px",color:"var(--accent2)",fontWeight:600}}>{current+1}/{questions.length}</span>
      <div style={{flex:1,height:"4px",background:"var(--border)",borderRadius:"2px",overflow:"hidden"}}>
        <div style={{height:"100%",width:`${((current+1)/questions.length)*100}%`,background:"var(--accent)",transition:"0.3s"}} />
      </div>
    </div>
    <p style={{fontSize:"15px",fontWeight:500,marginBottom:"10px",color:"var(--heading)"}}>{q.q}</p>
    <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
      {q.options.map((opt,i) => <button key={i} onClick={()=>{setSelected(i);setAnswers({...answers,[current]:i})}} disabled={answers[current]!==undefined}
        style={{padding:"10px 14px",borderRadius:"var(--radius-sm)",border:"1px solid",textAlign:"right",fontSize:"14px",cursor:answers[current]===undefined?"pointer":"default",fontFamily:"inherit",transition:"0.2s",
          background:answers[current]!==undefined?(i===q.correct?"rgba(0,210,160,0.12)":(selected===i?"rgba(255,107,107,0.12)":"rgba(3,3,8,0.5)")):(selected===i?"rgba(108,92,231,0.12)":"rgba(3,3,8,0.5)"),
          borderColor:answers[current]!==undefined?(i===q.correct?"var(--success)":(selected===i?"var(--danger)":"var(--border)")):(selected===i?"var(--accent)":"var(--border)"),
          color:answers[current]!==undefined?(i===q.correct?"var(--success)":(selected===i?"var(--danger)":"var(--text)")):"var(--text)"}}>
        {opt}
      </button>)}
    </div>
    {answers[current]!==undefined && <div style={{textAlign:"center",marginTop:"8px"}}>
      <p style={{color:selected===q.correct?"var(--success)":"var(--danger)",fontWeight:600,fontSize:"14px",marginBottom:"6px"}}>{selected===q.correct?"✅ إجابة صحيحة!":"❌ إجابة خاطئة"}</p>
      <button onClick={next} className="btn-p" style={{width:"100%"}}>{current<questions.length-1?"⬅️ السؤال التالي":"📊 النتيجة"}</button>
    </div>}
  </div>;
}
function Challenge({ task, hint, solution }) {
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  return <div className="challenge-box">
    <h4 style={{color:"var(--warning)",marginBottom:"6px"}}>⚡ التحدي</h4>
    <p style={{fontSize:"14px",marginBottom:"8px"}}>{task}</p>
    <div className="dual-btn"><button onClick={()=>setShowHint(!showHint)}>💡 {showHint?"إخفاء":"إظهار"} تلميح</button><button onClick={()=>setShowSolution(!showSolution)}>👀 {showSolution?"إخفاء":"إظهار"} الحل</button></div>
    {showHint && <div className="result-box" style={{marginTop:"6px",fontSize:"13px"}}><strong>💡 تلميح:</strong> {hint}</div>}
    {showSolution && <div className="result-box" style={{marginTop:"6px"}}><strong>👀 الحل:</strong><Code code={solution} /></div>}
  </div>;
}

// ============================================
// 🌐 1. INTRO - أساسيات API
// ============================================
function Intro() {
  return <Page title="🌐 ما هو API؟" sub="✦ أساس تفهم منه كل اللي جاي ✦">
    
    {/* ----- المبدأ الأساسي ----- */}
    <Box title="🎯 المبدأ: API = وسيط">
      <p><strong>API</strong> هو وسيط بين تطبيقين. يشبه النادل في المطعم:</p>
      <p style={{textAlign:"center",fontSize:"15px",background:"rgba(108,92,231,0.06)",padding:"12px",borderRadius:"8px",margin:"8px 0"}}>
        🧑 أنت (Client) ← ← ← 🧑‍🍳 النادل (API) ← ← ← 🍳 المطبخ (Server)
      </p>
      <p><strong>الزبون</strong> يطلب من <strong>النادل</strong> ← النادل يبلغ <strong>المطبخ</strong> ← المطبخ يطبخ ويرجع ← النادل يجيبلك الطلب</p>
      <p>بالضبط نفس فكرة API: <strong>Client</strong> يرسل طلب ← <strong>Server</strong> يعالجه ← يرجع رد</p>
    </Box>

    {/* ----- مكونات API ----- */}
    <Box title="📦 مكونات أي API">
      <p>أي API يتكون من 4 أشياء أساسية:</p>
      <div className="grid-4">
        <Tag label="📍 Endpoint" desc="مسار الرابط" code="/api/users" />
        <Tag label="📡 Method" desc="نوع العملية" code="GET / POST / PUT..." />
        <Tag label="🧾 Headers" desc="معلومات إضافية" code="Authorization: Bearer..." />
        <Tag label="📄 Body" desc="البيانات" code='{"name":"أحمد"}' />
      </div>
    </Box>

    {/* ----- أول API - مع شرح كل سطر ----- */}
    <Box title="💻 أول API — شرح كل كود">
      <p style={{marginBottom:8,color:"var(--accent2)",fontSize:13}}>اختر "مع الشرح" لفهم كل سطر، أو "نسخة نظيفة" للنسخ المباشر</p>
      <CodeDual clean={`const express = require('express');
const app = express();
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'مرحبا بالعالم!' });
});

app.listen(5000, () => {
  console.log('🚀 السيرفر شغال على http://localhost:5000');
});`}
        explained={`// ============================================
// هذا أول API لك! نبنيه سطر سطر
// ============================================

// 📌 1. نجيب مكتبة Express
//    Express هي أشهر مكتبة لبناء APIs في Node.js
//    require() تجيب المكتبة وتحطها في متغير
const express = require('express');

// 📌 2. نشغل Express
//    نستدعي الدالة ()express عشان ننشئ التطبيق
//    app هو كائن يمثل السيرفر كامل
const app = express();

// 📌 3. Middleware يقرأ JSON
//    app.use() يضيف وسيط (Middleware)
//    express.json() يترجم JSON اللي يرسله العميل
//    لو ما حطينا هذا السطر، req.body يكون undefined
app.use(express.json());

// 📌 4. أول Route (مسار)
//    app.get() = نستقبل طلبات GET
//    '/api/hello' = المسار
//    (req, res) => {} = دالة تستقبل الطلب وترسل الرد
//    req = request (فيه بيانات الطلب)
//    res = response (فيه دوال الرد)
app.get('/api/hello', (req, res) => {
  // res.json() يرسل رد بصيغة JSON
  // السيرفر يرد برسالة ترحيب
  res.json({ message: 'مرحبا بالعالم!' });
});

// 📌 5. نشغل السيرفر
//    app.listen(5000) = يشغل السيرفر على منفذ 5000
//    المنفذ (PORT) = رقم باب السيرفر
//    callback ينفذ لما السيرفر يشتغل
app.listen(5000, () => {
  console.log('🚀 السيرفر شغال على http://localhost:5000');
});`} />
      <p className="hint" style={{marginTop:8}}>👇 جرب تضغط على زر الإرسال — أول API لك يشتغل!</p>
      <Terminal method="GET" url={`${API}/api/hello`} />
    </Box>
    <Box title="📝 اختبار المقدمة"><Quiz questions={introQuestions} /></Box>
  </Page>;
  }

// ===== Methods Inline Playground =====
function MPMethods() {
  const [active, setActive] = useState(null);
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(null);
  const [resetting, setResetting] = useState(false);
  const color = { GET: "#6366f1", POST: "#22c55e", PUT: "#eab308", PATCH: "#f97316", DELETE: "#ef4444" };
  const methods = [
    { m: "GET", url: `${API}/api/methods/get`, desc: "يجيب المستخدمين" },
    { m: "POST", url: `${API}/api/methods/post`, desc: "يضيف مستخدم", body: { name: "جديد", email: "x@y.com" } },
    { m: "PUT", url: `${API}/api/methods/put/1`, desc: "يستبدل", body: { name: "محدث" } },
    { m: "PATCH", url: `${API}/api/methods/patch/1`, desc: "يحدث جزء", body: { name: "محدث جزئي" } },
    { m: "DELETE", url: `${API}/api/methods/delete/1`, desc: "يمسح" }
  ];
  const reset = async () => { setResetting(true); await fetch(`${API}/api/reset`, { method: "POST" }); setResetting(false); setRes({ method: "RESET", status: 200, data: { msg: "تمت إعادة التعيين" } }); };
  const send = async (m) => {
    if (m.m === "DELETE" || m.m === "PUT" || m.m === "PATCH") await fetch(`${API}/api/reset`, { method: "POST" });
    setActive(m.m); setLoading(m.m); setRes(null);
    try {
      const opts = { method: m.m, headers: { "Content-Type": "application/json" } };
      if (m.body) opts.body = JSON.stringify(m.body);
      const r = await fetch(m.url, opts);
      setRes({ method: m.m, status: r.status, data: await r.json() });
    } catch (e) { setRes({ method: m.m, error: e.message }); }
    setLoading(null);
  };
  return <div>
    <div className="methods-play">
      {methods.map(m => <button key={m.m} className={`mp-btn ${active === m.m ? "active" : ""}`}
        style={{borderColor: active === m.m ? color[m.m] : "var(--border)"}}
        onClick={() => send(m)} disabled={loading !== null}>
        <span className="badge" style={{background: color[m.m]}}>{m.m}</span>
        <span className="mp-desc">{m.desc}</span>
        {loading === m.m ? <span className="mp-load">⏳</span> : <span className="mp-icon">▶</span>}
      </button>)}
    </div>
    {res && <div className="mp-result">
      <div className="mp-result-header" style={{color: res.status < 400 ? "var(--success)" : "var(--danger)"}}>
        {res.method} → {res.status} {res.status < 400 ? "✅" : "❌"}
      </div>
      <pre className="mp-json">{JSON.stringify(res.data || res.error, null, 2)}</pre>
      <button className="mp-close" onClick={() => setRes(null)}>✕</button>
    </div>}
    <button onClick={reset} disabled={resetting} className="btn-ghost" style={{marginTop:6,width:"100%",padding:"8px",border:"1px solid var(--border)",borderRadius:"var(--radius-sm)",background:"transparent",color:"var(--text)",cursor:"pointer",fontSize:13}}>
      {resetting ? "🔄..." : "🔄 إعادة تعيين البيانات"}
    </button>
  </div>;
}

// ============================================
// 📡 2. METHODS - أساليب الطلب الخمسة
// ============================================
function Methods({ onNavigate }) {
  return <Page title="📡 HTTP Methods" sub="✦ 5 طرق تتحدث بها مع السيرفر ✦">
    
    {/* ----- المبدأ ----- */}
    <Box title="🎯 المبدأ: كل طلب له غرض">
      <p>HTTP Methods = <strong>فعل</strong> تطلبه من السيرفر. كل Method له معنى واضح:</p>
      <div className="methods-grid">
        <div className="method-card"><span className="badge" style={{background:"#6366f1"}}>GET</span><strong>يجيب بيانات</strong><code>/api/users</code></div>
        <div className="method-card"><span className="badge" style={{background:"#22c55e"}}>POST</span><strong>يضيف جديد</strong><code>/api/users</code></div>
        <div className="method-card"><span className="badge" style={{background:"#eab308"}}>PUT</span><strong>يستبدل كامل</strong><code>/api/users/1</code></div>
        <div className="method-card"><span className="badge" style={{background:"#f97316"}}>PATCH</span><strong>يحدث جزء</strong><code>/api/users/1</code></div>
        <div className="method-card"><span className="badge" style={{background:"#ef4444"}}>DELETE</span><strong>يمسح</strong><code>/api/users/1</code></div>
      </div>
    </Box>

    {/* ----- لماذا؟ ----- */}
    <Box title="🤔 لماذا 5 أنواع؟">
      <p>لأن كل نوع يعبر عن <strong>نية</strong> مختلفة. لما تقرأ <code>GET /api/users</code> تعرف فوراً: هذا يجيب بيانات، ما يغيّر شيئاً.</p>
      <p><strong>GET</strong> = آمن (ما يعدل بيانات) • <strong>POST</strong> = ينشئ • <strong>PUT</strong> = يستبدل كامل • <strong>PATCH</strong> = يحدث جزئي • <strong>DELETE</strong> = يحذف</p>
    </Box>

    {/* ----- الكود مع الشرح ----- */}
    <Box title="💻 الكود — شرح كل سطر">
      <CodeDual clean={`let users = [
  { id: 1, name: 'أحمد', email: 'a@b.com' },
  { id: 2, name: 'سارة', email: 's@b.com' }
];
let nextId = 3;

// GET - يجيب كل المستخدمين
app.get('/api/users', (req, res) => {
  res.json(users);
});

// POST - يضيف مستخدم جديد
app.post('/api/users', (req, res) => {
  const newUser = { id: nextId++, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT - يستبدل مستخدم كامل
app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === +req.params.id);
  Object.assign(user, req.body);
  res.json(user);
});

// PATCH - يحدث جزء من المستخدم
app.patch('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === +req.params.id);
  if (req.body.name) user.name = req.body.name;
  if (req.body.email) user.email = req.body.email;
  res.json(user);
});

// DELETE - يحذف مستخدم
app.delete('/api/users/:id', (req, res) => {
  users = users.filter(u => u.id !== +req.params.id);
  res.json({ message: 'تم الحذف بنجاح' });
});`}
        explained={`// ============================================
// 5 Methods => 5 دوال في Express
// ============================================

// 📌 array users يحاكي قاعدة بيانات
//    في الواقع ستستخدم MongoDB أو PostgreSQL
let users = [
  { id: 1, name: 'أحمد', email: 'a@b.com' },
  { id: 2, name: 'سارة', email: 's@b.com' }
];
let nextId = 3;

// ========== GET ==========
// 📌 app.get(المسار, الدالة)
//    GET = يجيب بيانات، ما يغير شيئاً
//    /api/users = المسار
//    (req, res) => {} = callback
app.get('/api/users', (req, res) => {
  // res.json() يحول المصفوفة إلى JSON ويرسلها
  res.json(users);
});

// ========== POST ==========
// 📌 app.post() = يضيف مورد جديد
//    البيانات تأتي في req.body
//    (لازم express.json() عشان يقرأ JSON)
app.post('/api/users', (req, res) => {
  // 📌 req.body = الـ JSON اللي أرسله العميل
  //    نضيف id جديد مع البيانات
  const newUser = { id: nextId++, ...req.body };
  // 📌 نضيف المستخدم للمصفوفة
  users.push(newUser);
  // 📌 res.status(201) = Created
  //    201 = تم الإنشاء بنجاح
  //    res.json() يرسل المستخدم الجديد
  res.status(201).json(newUser);
});

// ========== PUT ==========
// 📌 PUT = يستبدل المورد بالكامل
//    :id = Route Param (رقم المستخدم)
app.put('/api/users/:id', (req, res) => {
  // 📌 req.params.id = الرقم من الرابط
  //    +req.params.id = نحوله من نص إلى رقم
  //    .find() = نبحث عن المستخدم في المصفوفة
  const user = users.find(u => u.id === +req.params.id);
  // 📌 Object.assign() = ندمج البيانات الجديدة
  //    في الكائن الموجود (نستبدل كل شيء)
  Object.assign(user, req.body);
  // 📌 نرسل المستخدم بعد التحديث
  res.json(user);
});

// ========== PATCH ==========
// 📌 PATCH = يحدث جزء فقط من المورد
//    الفرق عن PUT: PUT يستبدل الكل، PATCH يحدث بعض الحقول
app.patch('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === +req.params.id);
  // 📌 نحدث فقط الحقول الموجودة في req.body
  if (req.body.name) user.name = req.body.name;
  if (req.body.email) user.email = req.body.email;
  res.json(user);
});

// ========== DELETE ==========
// 📌 DELETE = يحذف المورد
app.delete('/api/users/:id', (req, res) => {
  // 📌 .filter() = نرجع كل المستخدمين إلا اللي رقمه كذا
  //    يعني نحذف المستخدم من المصفوفة
  users = users.filter(u => u.id !== +req.params.id);
  res.json({ message: 'تم الحذف بنجاح' });
});`} />
    </Box>

    {/* ----- جرب كل Method ----- */}
    <Box title="🧪 جرب كل Method — شوف الفرق بنفسك">
      <p style={{marginBottom:8,fontSize:13,color:"var(--accent2)"}}>اضغط على أي Method وشوف النتيجة في التيرمنل👇</p>
      <MPMethods />
    </Box>
    <TrainingLink onClick={() => onNavigate("practice-methods")} label="🎯 اذهب إلى تدريب Methods" />
    <Box title="📝 اختبار Methods"><Quiz questions={methodsQuestions} /></Box>
  </Page>;
  }

// ============================================
// 📦 3. REQUEST - كيف ترسل البيانات للسيرفر
// ============================================
function Request() {
  return <Page title="📦 مكونات الطلب" sub="✦ 4 طرق ترسل بها البيانات للسيرفر ✦">
    
    {/* ----- المبدأ ----- */}
    <Box title="🎯 المبدأ: 4 قنوات للبيانات">
      <p>الـ Client يرسل 4 أنواع من البيانات في الطلب. كل نوع له غرض:</p>
      <div className="grid-4">
        <Tag label="📍 Params" desc="جزء من الرابط" code="/users/:id" />
        <Tag label="❓ Query" desc="بعد ?" code="?page=2" />
        <Tag label="📄 Body" desc="JSON داخل الطلب" code='{"name":"أحمد"}' />
        <Tag label="🧾 Headers" desc="معلومات تعريفية" code="Authorization" />
      </div>
    </Box>

    {/* ----- Route Params ----- */}
    <Box title="📍 1. Route Params — جزء من الرابط">
      <p><strong>المبدأ:</strong> تحدد <strong>مورد معين</strong> في الرابط نفسه.</p>
      <p><strong>مثال:</strong> <code>/api/users/42</code> — الـ 42 هو <strong>رقم المستخدم</strong></p>
      <p><strong>في الكود:</strong> تكتب <code>:id</code> في المسار ويصير <code>req.params.id</code></p>
      <p><strong>لما تستخدمه:</strong> جلب مستخدم معين، تحديث مستخدم، حذف مستخدم</p>
      <CodeDual clean={`app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ userId, message: 'مستخدم رقم ' + userId });
});`}
        explained={`// 📌 في Express، أي جزء من المسار يبدأ بـ : يصير Route Param
//    العميل يزور: /api/users/42
//    السيرفر يستقبل: req.params.id = "42"
app.get('/api/users/:id', (req, res) => {
  // 📌 req.params.id هو نص (string)
  //    نحوله لرقم بـ +req.params.id
  const userId = req.params.id; // "42"
  res.json({ userId, message: 'مستخدم رقم ' + userId });
});`} />
      <p className="hint">👆 الرابط فيه <code>/42</code> في آخره — هذا هو الـ Param</p>
      <Terminal method="GET" url={`${API}/api/request/params/users/42`} />
    </Box>

    {/* ----- Query Params ----- */}
    <Box title="❓ 2. Query Params — فلترة وترتيب">
      <p><strong>المبدأ:</strong> بيانات <strong>اختيارية</strong> بعد علامة <code>?</code> للفلترة والترتيب.</p>
      <p><strong>مثال:</strong> <code>/api/users?page=2&limit=10&search=أحمد</code></p>
      <p><strong>في الكود:</strong> <code>req.query.page</code>, <code>req.query.limit</code></p>
      <p><strong>لما تستخدمه:</strong> بحث، ترقيم صفحات، فلترة حسب التاريخ</p>
      <CodeDual clean={`app.get('/api/users', (req, res) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const start = (page - 1) * limit;
  const end = page * limit;
  res.json({
    page, limit,
    data: users.slice(start, end)
  });
});`}
        explained={`// 📌 Query Params = key=value بعد علامة ?
//    الرابط: /api/users?page=2&limit=5&search=test
//    Express يفسرهم كا object في req.query تلقائياً
//    req.query = { page: "2", limit: "5", search: "test" }

// 📌 استخدام شائع: فلترة المصفوفة حسب Query Params
app.get('/api/users', (req, res) => {
  // 📌 req.query.page يجيب قيمة page من الرابط
  //    || 1 = لو ما في page، استخدم 1
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  // 📌 نحسب البداية والنهاية
  const start = (page - 1) * limit;
  const end = page * limit;
  res.json({
    page, limit,
    // 📌 .slice() = نأخذ جزء من المصفوفة
    data: users.slice(start, end)
  });
});`} />
      <Terminal method="GET" url={`${API}/api/request/query?page=2&limit=5&search=test`} />
    </Box>

    {/* ----- Body ----- */}
    <Box title="📄 3. Request Body — البيانات الأساسية">
      <p><strong>المبدأ:</strong> البيانات اللي ترسلها مع POST/PUT/PATCH.</p>
      <p><strong>مثال:</strong> عند تسجيل مستخدم جديد، ترسل اسمه وإيميله في الـ Body</p>
      <p><strong>في الكود:</strong> <code>req.body.name</code>, <code>req.body.email</code></p>
      <p><strong>⚠️ مهم:</strong> لازم تحط <code>app.use(express.json())</code> عشان Express يقرأ JSON</p>
      <CodeDual clean={`app.post('/api/users', (req, res) => {
  if (!req.body.name || !req.body.email) {
    return res.status(400).json({ error: 'الاسم والإيميل مطلوب' });
  }
  const newUser = { id: nextId++, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});`}
        explained={`// 📌 Request Body = البيانات اللي في الطلب نفسه
//    العميل يرسل JSON في body الطلب
//    السيرفر يستقبلها في req.body

// 📌 مثال: تسجيل مستخدم جديد
//    العميل يرسل: { "name": "أحمد", "email": "a@b.com" }
app.post('/api/users', (req, res) => {
  // 📌 req.body = { name: 'أحمد', email: 'a@b.com' }
  //    نتحقق من وجود البيانات
  if (!req.body.name || !req.body.email) {
    return res.status(400).json({ error: 'الاسم والإيميل مطلوب' });
  }
  // 📌 ننشئ المستخدم الجديد
  const newUser = { id: nextId++, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});`} />
      <Terminal method="POST" url={`${API}/api/request/body`} body='{"name":"أحمد","age":25}' />
    </Box>

    {/* ----- Headers ----- */}
    <Box title="🧾 4. Headers — بطاقة تعريف الطلب">
      <p><strong>المبدأ:</strong> معلومات <strong>وصفية</strong> عن الطلب نفسه (وليس عن البيانات).</p>
      <p><strong>أمثلة:</strong> التوكن (<code>Authorization</code>)، نوع البيانات (<code>Content-Type</code>)، المتصفح (<code>User-Agent</code>)</p>
      <p><strong>في الكود:</strong> <code>req.headers.authorization</code></p>
      <CodeDual clean={`app.get('/api/admin', (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'ممنوع - لا يوجد توكن' });
  }
  res.json({ secret: 'بيانات سرية 🔒' });
});`}
        explained={`// 📌 Headers = معلومات عن الطلب نفسه
//    مثل: من هو المستخدم؟ ما نوع البيانات؟

// 📌 مثال: تحقق من التوكن
//    العميل يرسل: Authorization: Bearer eyJhbGci...
app.get('/api/admin', (req, res) => {
  // 📌 req.headers يحتوي على كل الـ Headers
  const token = req.headers.authorization;
  // 📌 تحقق من وجود التوكن
  if (!token) {
    return res.status(401).json({ error: 'ممنوع - لا يوجد توكن' });
  }
  res.json({ secret: 'بيانات سرية 🔒' });
});

// 📌 Headers الشائعة:
//    Content-Type: application/json (نوع البيانات)
//    Authorization: Bearer <token> (التوكن)
//    Accept: application/json (نوع البيانات المقبولة)
//    User-Agent: Mozilla/5.0... (المتصفح)`} />
      <Terminal method="GET" url={`${API}/api/request/headers`} />
    </Box>
    <Box title="📝 اختبار الطلب"><Quiz questions={requestQuestions} /></Box>
  </Page>;
  }

// ============================================
// 📊 4. STATUS
// ============================================
function Status() {
  const [statusRes, setStatusRes] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(null);
  return <Page title="📊 حالات الاستجابة Status Codes" sub="تخبرك بنتيجة الطلب">
    <Box title="المجموعات"><div className="status-grid">
      {[
        { c: 200, n: "OK", g: "#22c55e", m: "نجح" }, { c: 201, n: "Created", g: "#22c55e", m: "تم الإنشاء" },
        { c: 301, n: "Moved", g: "#eab308", m: "تم النقل" }, { c: 400, n: "Bad Request", g: "#f97316", m: "خطأ في الإدخال" },
        { c: 401, n: "Unauthorized", g: "#f97316", m: "بدون توكن" }, { c: 403, n: "Forbidden", g: "#ef4444", m: "ممنوع" },
        { c: 404, n: "Not Found", g: "#ef4444", m: "غير موجود" }, { c: 405, n: "Method Not Allowed", g: "#ef4444", m: "طريقة خطأ" },
        { c: 409, n: "Conflict", g: "#ef4444", m: "تعارض" }, { c: 422, n: "Validation", g: "#eab308", m: "بيانات غير صالحة" },
        { c: 429, n: "Too Many", g: "#f97316", m: "طلبات كثيرة" }, { c: 500, n: "Server Error", g: "#ef4444", m: "خطأ بالسيرفر" },
        { c: 502, n: "Bad Gateway", g: "#ef4444", m: "بوابة خاطئة" }, { c: 503, n: "Service Unavailable", g: "#ef4444", m: "غير متوفر" },
      ].map(x => <button key={x.c} className="status-card" style={{ borderColor: x.g }} onClick={async () => { setLoadingStatus(x.c); const r = await fetch(`${API}/api/status/${x.c}`); setStatusRes({ code: x.c, data: await r.json() }); setLoadingStatus(null); }}>
        <span className="status-code" style={{ background: x.g }}>{x.c}</span><strong>{x.n}</strong><small>{x.m}</small></button>)}
    </div>
    {loadingStatus && <p className="hint" style={{marginTop:8}}>🔄 جاري...</p>}
    {statusRes && <div className="result-box"><pre style={{fontSize:13}}>{JSON.stringify(statusRes.data, null, 2)}</pre><button className="mp-close" onClick={() => setStatusRes(null)}>✕</button></div>}
    </Box>
    <Box title="القاعدة"><p>الـ Client يتأكد من <code>res.ok</code> (false لـ 4xx و 5xx):</p><Code code={`fetch('/api/data')\n  .then(async r => {\n    const data = await r.json();\n    if (!r.ok) {\n      console.error('خطأ:', data.error);\n      return;\n    }\n    console.log('نجاح:', data);\n  });`} /></Box>
    <Box title="📝 اختبار حالات الاستجابة"><Quiz questions={statusQuestions} /></Box>
  </Page>;
  }

// ============================================
// 📝 5. CRUD - تطبيق المهام الكامل
// ============================================
function Crud({ onNavigate }) {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const load = async () => { const r = await fetch(`${API}/api/crud/items`); setList((await r.json()).data || []); };
  const add = async () => { if (!title.trim()) return; await fetch(`${API}/api/crud/items`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: title.trim() }) }); setTitle(""); load(); };
  const toggle = async (id, done) => { await fetch(`${API}/api/crud/items/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ done: !done }) }); load(); };
  const remove = async (id) => { await fetch(`${API}/api/crud/items/${id}`, { method: "DELETE" }); load(); };
  const reset = async () => { await fetch(`${API}/api/reset`, { method: "POST" }); load(); };
  useEffect(() => { load(); }, []);
  return <Page title="📝 CRUD كامل" sub="✦ Create - Read - Update - Delete ✦">
    <Box title="🎯 المبدأ: 4 عمليات = API متكامل">
      <p><strong>CRUD</strong> = اختصار لأربع عمليات أساسية في أي API:</p>
      <div className="methods-grid">
        <div className="method-card"><span className="badge" style={{background:"#22c55e"}}>C</span><strong>Create — POST</strong><code>ينشئ مورد جديد</code></div>
        <div className="method-card"><span className="badge" style={{background:"#6366f1"}}>R</span><strong>Read — GET</strong><code>يجيب البيانات</code></div>
        <div className="method-card"><span className="badge" style={{background:"#f97316"}}>U</span><strong>Update — PATCH</strong><code>يحدث مورد</code></div>
        <div className="method-card"><span className="badge" style={{background:"#ef4444"}}>D</span><strong>Delete — DELETE</strong><code>يمسح مورد</code></div>
      </div>
      <p style={{marginTop:8}}>مع أي API حقيقي، انت بتطبق CRUD. هذا تطبيق مهام كامل يطبق العمليات الأربع.</p>
    </Box>
    <Box title="💻 الكود — شرح كل سطر">
      <CodeDual clean={`// GET - يجيب جميع المهام
app.get('/api/items', (req, res) => {
  res.json({ data: items });
});

// POST - يضيف مهمة جديدة
app.post('/api/items', (req, res) => {
  const item = { id: nextId++, title: req.body.title, done: false };
  items.push(item);
  res.status(201).json({ data: item });
});

// PATCH - يبدل حالة الإنجاز
app.patch('/api/items/:id', (req, res) => {
  Object.assign(items.find(i => i.id === +req.params.id), req.body);
  res.json({ msg: 'تم' });
});

// DELETE - يحذف مهمة
app.delete('/api/items/:id', (req, res) => {
  items = items.filter(i => i.id !== +req.params.id);
  res.json({ msg: 'تم الحذف' });
});`}
        explained={`// ============================================
// CRUD = 4 عمليات على المهام
// ============================================

// 📌 items = مصفوفة تحاكي قاعدة بيانات
//    في الواقع ستستخدم MongoDB / SQL
let items = [];
let nextId = 1;

// ========== READ (GET) ==========
// 📌 GET = يجيب البيانات بدون تغيير
//    /api/items = المسار
app.get('/api/items', (req, res) => {
  // 📌 نرسل المهام كلها في data
  res.json({ data: items });
});

// ========== CREATE (POST) ==========
// 📌 POST = ينشئ مورد جديد
app.post('/api/items', (req, res) => {
  // 📌 req.body.title = العنوان من العميل
  //    ننشئ كائن المهمة
  const item = {
    id: nextId++,     // رقم فريد
    title: req.body.title, // العنوان
    done: false       // غير مكتمل
  };
  // 📌 نضيف المهمة للمصفوفة
  items.push(item);
  // 📌 201 = Created (تم الإنشاء)
  res.status(201).json({ data: item });
});

// ========== UPDATE (PATCH) ==========
// 📌 PATCH = يحدث جزء من المورد
//    :id = رقم المهمة
app.patch('/api/items/:id', (req, res) => {
  // 📌 نبحث عن المهمة بالرقم
  //    Object.assign = يدمج البيانات
  Object.assign(
    items.find(i => i.id === +req.params.id),
    req.body
  );
  res.json({ msg: 'تم التحديث' });
});

// ========== DELETE ==========
// 📌 DELETE = يحذف المورد
app.delete('/api/items/:id', (req, res) => {
  // 📌 filter = نأخذ كل المهمات إلا المطلوب حذفها
  items = items.filter(i => i.id !== +req.params.id);
  res.json({ msg: 'تم الحذف' });
});`} />
    </Box>
    <Box title="🧪 جرب التطبيق">
      <div className="todo-add"><input value={title} onChange={e => setTitle(e.target.value)} placeholder="مهمة جديدة..." onKeyDown={e => e.key === "Enter" && add()} /><button onClick={add}>➕ إضافة</button><button onClick={reset} className="btn-ghost">🔄 إعادة</button></div>
      <div className="todo-list">{list.map(i => <div key={i.id} className={`todo-item ${i.done ? "done" : ""}`}><span onClick={() => toggle(i.id, i.done)}>{i.done ? "✅" : "⬜"} {i.title}</span><button onClick={() => remove(i.id)} className="btn-del">🗑️</button></div>)}{list.length === 0 && <p className="muted">لا توجد مهام</p>}</div>
    </Box>
    <TrainingLink onClick={() => onNavigate("practice-crud")} label="🎯 اذهب إلى تدريب CRUD" />
    <Box title="📝 اختبار CRUD"><Quiz questions={crudQuestions} /></Box>
  </Page>;
  }

// ===== Middleware Inline Playground =====
function MPMiddleware() {
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(null);
  const [withToken, setWithToken] = useState(false);
  const send = async (wToken) => {
    setWithToken(wToken); setLoading(true); setRes(null);
    try {
      const opts = { headers: { "Content-Type": "application/json" } };
      if (wToken) opts.headers["Authorization"] = "Bearer secret-token-123";
      const r = await fetch(`${API}/api/middleware/auth`, opts);
      const data = await r.json();
      setRes({ status: r.status, ok: r.ok, data, token: wToken });
    } catch (e) { setRes({ error: e.message, token: wToken }); }
    setLoading(null);
  };
  return <div>
    <div className="dual-btn" style={{marginBottom:8}}>
      <button onClick={() => send(false)} disabled={loading}
        style={{borderColor: res && !res.token ? "var(--danger)" : undefined}}>
        🔓 بدون توكن
      </button>
      <button onClick={() => send(true)} disabled={loading}
        style={{borderColor: res && res.token && res.ok ? "var(--success)" : undefined}}>
        🔐 مع توكن
      </button>
    </div>
    {loading && <div className="mp-result"><div className="mp-load" style={{textAlign:"center"}}>🔄 جاري...</div></div>}
    {res && <div className="mp-result">
      <div className="mp-result-header" style={{color: res.ok ? "var(--success)" : "var(--danger)"}}>
        {res.token ? "🔐 مع توكن" : "🔓 بدون توكن"} → {res.status} {res.ok ? "✅ مسموح" : "❌ ممنوع"}
      </div>
      <pre className="mp-json">{JSON.stringify(res.data || res.error, null, 2)}</pre>
      <button className="mp-close" onClick={() => setRes(null)}>✕</button>
    </div>}
    {res && <div className="mw-flow">
      <div className="mw-step" style={{borderColor: res.token ? "var(--success)" : "var(--danger)"}}>
        <span className="mw-num">1</span> Middleware (protect)
        <span className="mw-check">{res.token ? "✅ مرر" : "⛔ رفض"}</span>
      </div>
      <div className="mw-arrow">↓</div>
      <div className="mw-step" style={{borderColor: res.ok ? "var(--success)" : "var(--border)"}}>
        <span className="mw-num">2</span> Route Handler
        <span className="mw-check">{res.ok ? "✅ نفذ" : "— ما وصل"}</span>
      </div>
    </div>}
  </div>;
}

// ============================================
// 🔌 6. MIDDLEWARE - الوسيط بين الطلب والاستجابة
// ============================================
function Middleware() {
  return <Page title="🔌 Middleware" sub="✦ دالة تتوسط بين الطلب والمعالجة ✦">
    <Box title="🎯 المبدأ: سلسلة دوال">
      <p><strong>Middleware</strong> = دالة تنفذ <strong>قبل</strong> الـ Route. كل طلب يمر عبر سلسلة Middleware.</p>
      <p style={{textAlign:"center",fontSize:"15px",background:"rgba(108,92,231,0.06)",padding:"12px",borderRadius:"8px",margin:"8px 0"}}>
        📡 طلب ← 🔌 Middleware 1 ← 🔌 Middleware 2 ← 🎯 Route ← 📨 رد
      </p>
      <p>تستخدم لـ: <strong>تسجيل</strong> (Logging) • <strong>توثيق</strong> (Auth) • <strong>تحقق</strong> (Validation) • <strong>تعديل</strong> (Modify Request)</p>
      <p><strong>المفتاح:</strong> كل Middleware ينادي <code>next()</code> عشان يمرر الطلب للـ Middleware التالي. لو ما نادى <code>next()</code>، الطلب يتوقف.</p>
    </Box>
    <Box title="💻 الكود — 3 أمثلة عملية">
      <CodeDual clean={`// 1. Middleware يسجل كل طلب
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// 2. Middleware يحمي مسار
const protect = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'ممنوع' });
  req.user = { id: 1 };
  next();
};

// 3. استخدم الحماية
app.get('/api/admin', protect, (req, res) => {
  res.json({ secret: 'بيانات سرية', user: req.user });
});`}
        explained={`// ============================================
// Middleware: 3 أمثلة من الأسهل للأصعب
// ============================================

// ========== 1. Logging Middleware ==========
// 📌 app.use() = يضيف Middlewave لجميع المسارات
//    كل طلب يمر هنا أول شيء
app.use((req, res, next) => {
  // 📌 نسجل نوع الطلب والمسار
  console.log(\`📡 \${req.method} \${req.path}\`);
  // 📌 next() = خلصت شغلي، مرر الطلب للتالي
  //    ⚠️ لازم تنادي next() وإلا الطلب يتعلق!
  next();
});

// ========== 2. Auth Middleware ==========
// 📌 Middleware يحمي مسارات معينة
//    نعرفه كمتغير عادي (ليس app.use)
const protect = (req, res, next) => {
  // 📌 req.headers.authorization = التوكن
  const token = req.headers.authorization;
  // 📌 لو ما في توكن => نرد خطأ ونوقف
  if (!token) {
    return res.status(401).json({ error: 'ممنوع' });
  }
  // 📌 نضيف بيانات المستخدم للطلب
  //    الـ Route يقدر يوصلها عبر req.user
  req.user = { id: 1, name: 'أحمد' };
  // 📌 نكمل للـ Route
  next();
};

// ========== 3. استخدام Middleware ==========
// 📌 نمرر protect كوسيط قبل Route
//    الترتيب: الطلب ← protect ← الدالة
app.get('/api/admin', protect, (req, res) => {
  // 📌 req.user جاهز (من protect)
  res.json({
    secret: 'بيانات سرية 🔒',
    user: req.user
  });
});

// 📌 ملخص: app.use() = كل المسارات
//    protect = مسارات محددة فقط`} />
    </Box>
    <Box title="🧪 جرب — بدون توكن vs مع توكن">
      <MPMiddleware />
    </Box>
    <Box title="📝 اختبار Middleware"><Quiz questions={middlewareQuestions} /></Box>
  </Page>;
  }

// ============================================
// 🔐 7. AUTH - المصادقة (تسجيل + دخول)
// ============================================
function Auth({ onNavigate }) {
  const [u, setU] = useState(""); const [p, setP] = useState(""); const [msg, setMsg] = useState("");
  const reg = async () => { const r = await fetch(`${API}/api/auth/register`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: u, password: p }) }); setMsg(JSON.stringify(await r.json(), null, 2)); };
  const login = async () => { const r = await fetch(`${API}/api/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: u, password: p }) }); setMsg(JSON.stringify(await r.json(), null, 2)); };
  return <Page title="🔐 المصادقة" sub="✦ Authentication - التحقق من الهوية ✦">
    <Box title="🎯 المبدأ: 3 خطوات">
      <p><strong>المصادقة (Authentication)</strong> = التحقق من أن المستخدم هو من يدّعي.</p>
      <p style={{textAlign:"center",fontSize:"15px",background:"rgba(108,92,231,0.06)",padding:"12px",borderRadius:"8px",margin:"8px 0"}}>
        📝 تسجيل ← تشفير كلمة السر ← 🔑 دخول ← إعطاء توكن ← 🧾 التوكن مع كل طلب
      </p>
      <ol style={{textAlign:"right",display:"inline-block",paddingRight:"18px"}}>
        <li><strong>تسجيل:</strong> تخزين كلمة السر مشفرة بـ bcrypt (ما نخزنها نص!)</li>
        <li><strong>دخول:</strong> مقارنة كلمة السر مع التشفير ← لو صحيح، نعطي توكن</li>
        <li><strong>توكن:</strong> يُرسل مع كل طلب في Header <code>Authorization: Bearer &lt;token&gt;</code></li>
      </ol>
    </Box>
    <Box title="💻 الكود — شرح كل سطر">
      <CodeDual clean={`// تسجيل مستخدم جديد
app.post('/api/auth/register', async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  users.push({ username: req.body.username, hash });
  res.status(201).json({ msg: 'تم التسجيل بنجاح' });
});

// دخول المستخدم
app.post('/api/auth/login', async (req, res) => {
  const user = users.find(u => u.username === req.body.username);
  if (!user || !(await bcrypt.compare(req.body.password, user.hash)))
    return res.status(401).json({ error: 'اسم مستخدم أو كلمة سر خطأ' });
  const token = crypto.randomBytes(20).toString('hex');
  res.json({ token });
});`}
        explained={`// ============================================
// المصادقة: تسجيل + دخول + توكن
// ============================================

// 📌 bcrypt = مكتبة لتشفير كلمات السر
//    npm install bcrypt
// 📌 crypto = مكتبة مدمجة في Node.js
//    تستخدم لتوليد Tokens عشوائية

// ========== تسجيل مستخدم جديد ==========
// 📌 POST /api/auth/register = تسجيل
app.post('/api/auth/register', async (req, res) => {
  // 📌 bcrypt.hash() = تشفير كلمة السر
  //    المعامل 10 = مدى التعقيد (كلما زاد، أبطأ)
  //    async = العملية تحتاج وقت
  const hash = await bcrypt.hash(req.body.password, 10);
  // 📌 نخزن اسم المستخدم + كلمة السر المشفرة
  //    ⚠️ ما نخزن كلمة السر أبداً بشكل نص!
  users.push({
    username: req.body.username,
    hash: hash
  });
  res.status(201).json({ msg: 'تم التسجيل بنجاح' });
});

// ========== دخول المستخدم ==========
// 📌 POST /api/auth/login = دخول
app.post('/api/auth/login', async (req, res) => {
  // 📌 نبحث عن المستخدم بالاسم
  const user = users.find(
    u => u.username === req.body.username
  );
  // 📌 bcrypt.compare() = يقارن كلمة السر مع التشفير
  //    لو المستخدم غير موجود أو كلمة السر خطأ
  if (!user || !(await bcrypt.compare(req.body.password, user.hash))) {
    // 📌 401 = Unauthorized (غير مصرح)
    return res.status(401).json({ error: 'اسم مستخدم أو كلمة سر خطأ' });
  }
  // 📌 crypto.randomBytes(20) = 20 بايت عشوائي = توكن
  //    toString('hex') = نحوله لنص سداسي عشري
  const token = crypto.randomBytes(20).toString('hex');
  // 📌 نرسل التوكن للعميل
  //    العميل يخزنه ويرسله مع كل طلب
  res.json({ token });
});

// 📌 بعد الدخول، العميل يرسل التوكن في:
//    Authorization: Bearer <token>
//    السيرفر يتحقق منه في Middleware`} />
    </Box>
    <Box title="🧪 جرب التسجيل والدخول">
      <input value={u} onChange={e => setU(e.target.value)} placeholder="اسم المستخدم" />
      <input value={p} onChange={e => setP(e.target.value)} type="password" placeholder="كلمة السر" />
      <div className="dual-btn"><button onClick={reg}>📝 تسجيل</button><button onClick={login}>🔑 دخول</button></div>
      {msg && <pre className="result-box">{msg}</pre>}
    </Box>
    <TrainingLink onClick={() => onNavigate("practice-auth")} label="🎯 اذهب إلى تدريب Auth" />
    <Box title="📝 اختبار المصادقة"><Quiz questions={authQuestions} /></Box>
  </Page>;
  }

// ============================================
// 🔑 8. PASSWORDS
// ============================================
function Passwords() {
  const [len, setLen] = useState(12);
  const [genPw, setGenPw] = useState("");
  const [cpw, setCpw] = useState(""); const [cr, setCr] = useState(null);
  const [hpw, setHpw] = useState(""); const [hr, setHr] = useState("");
  const [vPw, setVPw] = useState(""); const [vHash, setVHash] = useState(""); const [vr, setVr] = useState(null);
  const gen = async () => { const r = await fetch(`${API}/api/password/generate`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ length: len }) }); setGenPw((await r.json()).password); };
  const check = async () => { const r = await fetch(`${API}/api/password/check`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: cpw }) }); setCr(await r.json()); };
  const hash = async () => { const r = await fetch(`${API}/api/password/hash`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: hpw }) }); setHr((await r.json()).hash); };
  const verify = async () => { const r = await fetch(`${API}/api/password/verify`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: vPw, hash: vHash }) }); setVr(await r.json()); };
  return <Page title="🔑 كلمات السر" sub="أدخل كلمة سر يدوي + توليد + تحقق + تشفير">
    <Box title="✍️ كلمة سر يدوية — تشفير">
      <input value={hpw} onChange={e => setHpw(e.target.value)} placeholder="اكتب كلمة سر من عندك" />
      <button onClick={hash} className="btn-p">🔏 تشفير</button>
      {hr && <div className="result-box" style={{ wordBreak: "break-all" }}>التشفير: {hr}</div>}
    </Box>
    <Box title="🔐 تحقق من كلمة سر — هل تطابق التشفير؟">
      <input value={vPw} onChange={e => setVPw(e.target.value)} placeholder="كلمة السر" />
      <input value={vHash} onChange={e => setVHash(e.target.value)} placeholder="التشفير (hash)" style={{ direction: "ltr", textAlign: "left", fontFamily: "monospace" }} />
      <button onClick={verify} className="btn-p">🔍 قارن</button>
      {vr && <div className="result-box"><strong>{vr.match ? "✅ تطابق" : "❌ لا تطابق"}</strong></div>}
    </Box>
    <Box title="⚡ توليد كلمة سر عشوائية">
      <div className="range-row"><span>الطول: {len}</span><input type="range" min={4} max={32} value={len} onChange={e => setLen(+e.target.value)} /></div>
      <button onClick={gen} className="btn-p">🔐 توليد</button>
      {genPw && <div className="result-box">{genPw}</div>}
    </Box>
    <Box title="🔍 تحقق من القوة">
      <input value={cpw} onChange={e => setCpw(e.target.value)} placeholder="اكتب كلمة سر" />
      <button onClick={check} className="btn-p">🔍 تحقق</button>
      {cr && <div className="result-box"><strong>{cr.strength}</strong> ({cr.score}/100){cr.feedback?.length > 0 && <ul>{cr.feedback.map((f, i) => <li key={i}>{f}</li>)}</ul>}</div>}
    </Box>
    <Box title="الكود"><Code code={`// توليد\napp.post('/api/password/generate', (req, res) => {\n  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#%^&*";\n  let p = "";\n  for (let i = 0; i < (req.body.length||12); i++)\n    p += chars[crypto.randomInt(chars.length)];\n  res.json({ password: p });\n});\n\n// تشفير\nconst hash = await bcrypt.hash(password, 10);\n\n// مقارنة\nconst match = await bcrypt.compare(password, hash);`} /></Box>
  </Page>;
}

// ============================================
// 🗄️ 9. DATABASE
// ============================================
function Database() {
  const [prods, setProds] = useState([]); const [name, setName] = useState(""); const [price, setPrice] = useState(""); const [filter, setFilter] = useState("");
  const load = async (f = "") => { const r = await fetch(`${API}/api/db/products${f ? `?name=${f}` : ""}`); setProds((await r.json()).data || []); };
  const add = async () => { if (!name || !price) return; await fetch(`${API}/api/db/products`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, price: +price }) }); setName(""); setPrice(""); load(); };
  useEffect(() => { load(); }, []);
  return <Page title="🗄️ قاعدة بيانات" sub="تخزين واستعلام وفلترة">
    <Box title="الكود"><Code code={`// مع فلترة Query Params\napp.get('/api/products', (req, res) => {\n  let result = [...products];\n  if (req.query.name)\n    result = result.filter(p => p.name.includes(req.query.name));\n  if (req.query.min)\n    result = result.filter(p => p.price >= +req.query.min);\n  if (req.query.max)\n    result = result.filter(p => p.price <= +req.query.max);\n  res.json({ count: result.length, data: result });\n});`} /></Box>
    <Box title="إدارة المنتجات"><div className="todo-add"><input value={name} onChange={e => setName(e.target.value)} placeholder="اسم المنتج" /><input value={price} onChange={e => setPrice(e.target.value)} type="number" placeholder="السعر" /><button onClick={add}>➕ إضافة</button></div><div className="todo-add" style={{ marginTop: 8 }}><input value={filter} onChange={e => setFilter(e.target.value)} placeholder="بحث..." onKeyDown={e => e.key === "Enter" && load(filter)} /><button onClick={() => load(filter)}>🔍 بحث</button><button onClick={() => { setFilter(""); load(); }} className="btn-ghost">مسح</button></div><div className="todo-list">{prods.map(p => <div key={p.id} className="todo-item"><span><strong>{p.name}</strong> — {p.price} ريال</span></div>)}{prods.length === 0 && <p className="muted">لا توجد منتجات</p>}</div></Box>
    <Box title="SQL vs NoSQL"><p><strong>SQL:</strong> PostgreSQL, MySQL — جداول وعلاقات.</p><p><strong>NoSQL:</strong> MongoDB — وثائق مرنة.</p><p><strong>ORM:</strong> Prisma, Sequelize — مكتبات تسهل التعامل.</p></Box>
  </Page>;
}

// ============================================
// 📎 10. FILE UPLOAD
// ============================================
function FileUpload() {
  const [file, setFile] = useState(null); const [res, setRes] = useState(null);
  const upload = async () => {
    if (!file) return;
    const fd = new FormData(); fd.append("file", file);
    const r = await fetch(`${API}/api/file/upload`, { method: "POST", body: fd });
    setRes(await r.json());
  };
  return <Page title="📎 رفع الملفات" sub="File Upload مع multer">
    <Box title="الكود"><Code code={`// تثبيت: npm install multer\nconst multer = require('multer');\n\nconst upload = multer({\n  dest: 'uploads/',\n  limits: { fileSize: 5 * 1024 * 1024 } // 5MB\n});\n\napp.post('/api/upload', upload.single('file'), (req, res) => {\n  res.json({\n    name: req.file.originalname,\n    size: req.file.size,\n    type: req.file.mimetype\n  });\n});`} /></Box>
    <Box title="جرب الرفع">
      <input type="file" onChange={e => setFile(e.target.files[0])} style={{ marginBottom: 8, color: "#fff", fontSize: 14 }} />
      <button onClick={upload} className="btn-p" disabled={!file}>📤 رفع</button>
      {res && <div className="result-box">{JSON.stringify(res, null, 2)}</div>}
    </Box>
  </Page>;
}

// ============================================
// 📄 11. PAGINATION
// ============================================
function Pagination() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const load = async (p) => { const r = await fetch(`${API}/api/pagination/posts?page=${p}&limit=5&sort=id&order=desc`); setData(await r.json()); };
  useEffect(() => { load(page); }, [page]);
  return <Page title="📄 Pagination & Sorting" sub="تقسيم النتائج وترتيبها">
    <Box title="الكود"><Code code={`app.get('/api/posts', (req, res) => {\n  let { page=1, limit=10, sort='id', order='asc' } = req.query;\n  page = +page; limit = +limit;\n  let result = [...allPosts];\n\n  // ترتيب\n  if (sort === 'date') result.sort((a,b) =>\n    order==='desc' ? new Date(b.date)-new Date(a.date) : new Date(a.date)-new Date(b.date));\n\n  // تقسيم\n  const total = result.length;\n  const data = result.slice((page-1)*limit, page*limit);\n\n  res.json({ page, limit, total, totalPages: Math.ceil(total/limit), hasNext: page < Math.ceil(total/limit), data });\n});`} /></Box>
    <Box title="جرب"><div className="dual-btn"><button onClick={() => setPage(p => Math.max(1, p - 1))}>⬅️ السابق</button><span style={{ padding: "8px 16px" }}>صفحة {page}</span><button onClick={() => setPage(p => p + 1)}>التالي ➡️</button></div>
      {data && <div className="result-box"><p>إجمالي: {data.total} | الصفحة: {data.page}/{data.totalPages}</p>{data.data.map(p => <div key={p.id} style={{ padding: "4px 0", borderBottom: "1px solid var(--border)" }}><strong>{p.title}</strong> <span className="muted">— {p.author} | {p.views} 👁️</span></div>)}</div>}</Box>
  </Page>;
}

// ============================================
// 🔍 12. SEARCH
// ============================================
function Search() {
  const [q, setQ] = useState(""); const [res, setRes] = useState(null);
  const search = async () => { const r = await fetch(`${API}/api/search${q ? `?q=${q}` : ""}`); setRes(await r.json()); };
  return <Page title="🔍 بحث وتصفية" sub="Search + Filter + Tags">
    <Box title="الكود"><Code code={`app.get('/api/search', (req, res) => {\n  const { q, category, level, tag } = req.query;\n  let result = [...data];\n  if (q) result = result.filter(x =>\n    x.title.includes(q) || x.tags.some(t => t.includes(q)));\n  if (category) result = result.filter(x => x.category === category);\n  if (level) result = result.filter(x => x.level === level);\n  res.json({ count: result.length, data: result });\n});`} /></Box>
    <Box title="جرب"><div className="todo-add"><input value={q} onChange={e => setQ(e.target.value)} placeholder="ابحث..." onKeyDown={e => e.key === "Enter" && search()} /><button onClick={search}>🔍 بحث</button></div>
      {res && <div className="result-box"><p>نتائج: {res.count}</p>{res.data.map(d => <div key={d.id} style={{ padding: "4px 0", borderBottom: "1px solid var(--border)" }}><strong>{d.title}</strong> <span className="muted">— {d.category} | {d.level}</span></div>)}</div>}</Box>
  </Page>;
}

// ============================================
// ⏳ 13. RATE LIMIT
// ============================================
function RateLimit() {
  const [msgs, setMsgs] = useState([]);
  const send = async () => {
    try { const r = await fetch(`${API}/api/ratelimit/test`); const d = await r.json(); setMsgs(prev => [...prev.slice(-9), `${d.msg || d.error}`]); }
    catch (e) { setMsgs(prev => [...prev.slice(-9), `❌ ${e.message}`]); }
  };
  return <Page title="⏳ Rate Limiting" sub="تحديد عدد الطلبات">
    <Box title="الكود"><Code code={`const rateLimit = require('express-rate-limit');\n\nconst limiter = rateLimit({\n  windowMs: 15 * 1000, // 15 ثانية\n  max: 5, // أقصى 5 طلبات\n  message: { error: 'طلبات كثيرة! انتظر 15 ثانية' }\n});\n\napp.get('/api/protected', limiter, (req, res) => {\n  res.json({ msg: 'تم القبول' });\n});`} /></Box>
    <Box title="جرب (5 طلبات فقط كل 15 ثانية)"><button onClick={send}>🚀 أرسل طلب</button><div className="result-box" style={{ marginTop: 8 }}>{msgs.map((m, i) => <div key={i} style={{ padding: 2 }}>{m}</div>)}</div></Box>
  </Page>;
}

// ============================================
// ✅ 14. VALIDATION - التحقق من صحة البيانات
// ============================================
function Validation({ onNavigate }) {
  const [form, setForm] = useState({ name: "", email: "", age: "", password: "" });
  const [res, setRes] = useState(null);
  const submit = async () => {
    const r = await fetch(`${API}/api/validation/register`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setRes(await r.json());
  };
  return <Page title="✅ Validation" sub="✦ التحقق من البيانات قبل استخدامها ✦">
    <Box title="🎯 المبدأ: لا تثق بالمستخدم أبداً">
      <p><strong>Validation</strong> = تتأكد أن البيانات اللي وصلتك <strong>صحيحة وكاملة</strong> قبل تستخدمها.</p>
      <p>المستخدم يرسل أي شيء — لازم <strong>تتحقق</strong> من كل حقل:</p>
      <div className="methods-grid">
        <div className="method-card"><span className="badge" style={{background:"#6366f1"}}>✅</span><strong>الموجود</strong><code>if (!name) → خطأ</code></div>
        <div className="method-card"><span className="badge" style={{background:"#22c55e"}}>📏</span><strong>الطول</strong><code>name.length {"<"} 2 → خطأ</code></div>
        <div className="method-card"><span className="badge" style={{background:"#eab308"}}>🔢</span><strong>النوع</strong><code>age {"<"} 13 → خطأ</code></div>
        <div className="method-card"><span className="badge" style={{background:"#ef4444"}}>🔑</span><strong>القوة</strong><code>password.length {"<"} 6 → خطأ</code></div>
      </div>
    </Box>
    <Box title="💻 الكود — شرح كل سطر">
      <CodeDual clean={`app.post('/api/register', (req, res) => {
  const errors = [];
  const { name, email, age, password } = req.body;

  if (!name || name.length < 2)
    errors.push('الاسم: يجب أن يكون 2 أحرف على الأقل');

  if (!email || !email.includes('@'))
    errors.push('الإيميل: غير صالح');

  if (age && (age < 13 || age > 120))
    errors.push('العمر: يجب أن يكون بين 13 و 120');

  if (!password || password.length < 6)
    errors.push('كلمة السر: 6 أحرف على الأقل');

  if (errors.length)
    return res.status(422).json({ error: 'فشل التحقق', details: errors });

  res.status(201).json({ msg: 'تم', user: { name, email } });
});`}
        explained={`// ============================================
// Validation: تحقق من كل حقل قبل الاستخدام
// ============================================

// 📌 POST /api/register = تسجيل مع تحقق
app.post('/api/register', (req, res) => {
  // 📌 مصفوفة تجمع كل الأخطاء
  const errors = [];

  // 📌 req.body = البيانات من العميل
  //    استخراج الحقول كلها في سطر واحد
  const { name, email, age, password } = req.body;

  // ========== تحقق الاسم ==========
  // 📌 !name = هل الاسم موجود أصلاً؟
  //    name.length < 2 = هل طوله أقل من 2؟
  if (!name || name.length < 2) {
    errors.push('الاسم: يجب أن يكون 2 أحرف على الأقل');
  }

  // ========== تحقق الإيميل ==========
  // 📌 .includes('@') = هل يحتوي على @ ؟
  //    (تحقق بسيط — في الواقع استخدم regex)
  if (!email || !email.includes('@')) {
    errors.push('الإيميل: غير صالح');
  }

  // ========== تحقق العمر ==========
  // 📌 age && = لو العمر مدخل (اختياري)
  //    age < 13 = أصغر من 13 سنة؟
  //    age > 120 = أكبر من 120 سنة؟
  if (age && (age < 13 || age > 120)) {
    errors.push('العمر: يجب أن يكون بين 13 و 120');
  }

  // ========== تحقق كلمة السر ==========
  if (!password || password.length < 6) {
    errors.push('كلمة السر: 6 أحرف على الأقل');
  }

  // ========== النتيجة ==========
  // 📌 لو فيه أخطاء => نردهم كلهم مرة وحدة
  if (errors.length) {
    // 📌 422 = Unprocessable Entity
    //    (البيانات مفهومة لكن غير صالحة)
    return res.status(422).json({
      error: 'فشل التحقق من البيانات',
      details: errors // كل الأخطاء
    });
  }

  // 📌 كل شيء تمام => ننشئ المستخدم
  res.status(201).json({
    msg: 'تم التسجيل بنجاح',
    user: { name, email }
  });
});

// 📌 القاعدة الذهبية:
//    تحقق أولاً، ثم استخدم البيانات`} />
    </Box>
    <Box title="🧪 جرب — اكتب بيانات صحيحة وخاطئة">
      <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="الاسم" />
      <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="الإيميل" />
      <input value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} type="number" placeholder="العمر" />
      <input value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} type="password" placeholder="كلمة السر" />
      <button onClick={submit} className="btn-p">✅ تحقق وسجل</button>
      {res && <div className="result-box">{JSON.stringify(res, null, 2)}</div>}
    </Box>
    <TrainingLink onClick={() => onNavigate("practice-validation")} label="🎯 اذهب إلى تدريب Validation" />
    <Box title="📝 اختبار Validation"><Quiz questions={validationQuestions} /></Box>
  </Page>;
  }

// ============================================
// 💾 15. CACHING
// ============================================
function Caching() {
  const [res, setRes] = useState(null); const [etag, setEtag] = useState(""); const [loadTime, setLoadTime] = useState(0);
  const load = async () => {
    const start = performance.now();
    const headers = {};
    if (etag) headers["If-None-Match"] = etag;
    const r = await fetch(`${API}/api/caching/data`, { headers });
    const data = r.status === 304 ? "304 Not Modified (من الـ Cache)" : await r.json();
    const newEtag = r.headers.get("ETag") || "";
    if (newEtag) setEtag(newEtag);
    setRes(data);
    setLoadTime(Math.round(performance.now() - start));
  };
  return <Page title="💾 Caching (التخبئة)" sub="ETag + Cache-Control">
    <Box title="الفكرة"><p>بدل ما تجيب البيانات من السيرفر كل مرة، خزنها عند العميل. السيرفر يرسل <strong>ETag</strong> والعميل يرسله في الطلب التالي — إذا نفس القيمة، السيرفر يرد <strong>304</strong> بدون بيانات.</p></Box>
    <Box title="الكود"><Code code={`// السيرفر\nlet cache = { timestamp: Date.now(), data: {...} };\n\napp.get('/api/data', (req, res) => {\n  const etag = \`"\${cache.timestamp}"\`;\n  if (req.headers['if-none-match'] === etag)\n    return res.status(304).end(); // لا ترسل بيانات\n  res.set('ETag', etag);\n  res.set('Cache-Control', 'public, max-age=30');\n  res.json(cache.data);\n});`} /></Box>
    <Box title="جرب"><button onClick={load} className="btn-p">📦 جلب البيانات</button>
      {res && <div className="result-box"><p>زمن: {loadTime}ms | ETag: {etag.slice(0, 20)}...</p><pre>{JSON.stringify(res, null, 2)}</pre></div>}</Box>
  </Page>;
}

// ============================================
// 📌 16. VERSIONING
// ============================================
function Versioning() {
  const [vRes, setVRes] = useState(null);
  const [vLoading, setVLoading] = useState(null);
  return <Page title="📌 API Versioning (إصدارات)" sub="تطوير API بدون كسر التطبيقات القديمة">
    <Box title="الفكرة"><p>لما تطور API، التطبيقات القديمة ممكن تنكسر. الحل: <strong>الإصدارات</strong> (<code>/api/v1/</code>, <code>/api/v2/</code>).</p></Box>
    <Box title="الكود"><Code code={`// الإصدار الأول\napp.get('/api/v1/users', (req, res) => {\n  res.json({ version: 'v1', data: users });\n});\n\n// الإصدار الثاني (محدث)\napp.get('/api/v2/users', (req, res) => {\n  res.json({\n    version: 'v2',\n    meta: { total: users.length },\n    data: users.map(u => ({\n      ...u,\n      profile: \`/users/\${u.id}\`\n    }))\n  });\n});\n\n// التطبيقات القديمة تستمر تشتغل على v1`} /></Box>
    <Box title="جرب"><div className="dual-btn"><button onClick={async () => { setVLoading("v1"); const r = await fetch(`${API}/api/v1/users`); setVRes({ v: "v1 (قديم)", data: await r.json() }); setVLoading(null); }}>📡 v1 (قديم)</button><button onClick={async () => { setVLoading("v2"); const r = await fetch(`${API}/api/v2/users`); setVRes({ v: "v2 (جديد)", data: await r.json() }); setVLoading(null); }}>📡 v2 (جديد)</button></div>
      {vLoading && <p className="hint">🔄 جاري...</p>}
      {vRes && <div className="result-box"><strong style={{color:"var(--accent2)"}}>{vRes.v}</strong><pre style={{fontSize:13,marginTop:6}}>{JSON.stringify(vRes.data, null, 2)}</pre><button className="mp-close" onClick={() => setVRes(null)}>✕</button></div>}
    </Box>
  </Page>;
}

// ============================================
// 🔔 17. WEBHOOKS
// ============================================
function Webhooks() {
  const [logs, setLogs] = useState([]); const [event, setEvent] = useState("order.created"); const [url, setUrl] = useState("https://example.com/webhook");
  const send = async () => {
    await fetch(`${API}/api/webhooks/send`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ event, url, data: { orderId: 123 } }) });
    const r = await fetch(`${API}/api/webhooks/logs`); setLogs((await r.json()).data || []);
  };
  useEffect(() => { fetch(`${API}/api/webhooks/logs`).then(r => r.json()).then(d => setLogs(d.data || [])); }, []);
  return <Page title="🔔 Webhooks" sub="API يرسل إشعارات لتطبيقات أخرى">
    <Box title="الفكرة"><p>Webhook = <strong>API يرسل طلب</strong> إلى تطبيق آخر لما يحدث حدث معين. مثال: عند شراء منتج، أرسل إشعار لنظام المحاسبة.</p></Box>
    <Box title="الكود"><Code code={`app.post('/api/webhooks/send', async (req, res) => {\n  const { event, url, data } = req.body;\n  // سجل webhook في قاعدة البيانات\n  webhooks.push({ event, url, data, status: 'pending' });\n  // أرسل الطلب إلى URL الخارجي (محاكاة)\n  setTimeout(() => {\n    // await fetch(url, { method: 'POST', body: JSON.stringify(data) });\n    webhook.status = 'sent';\n  }, 1000);\n  res.status(202).json({ msg: 'قيد الإرسال' });\n});`} /></Box>
    <Box title="جرب"><input value={event} onChange={e => setEvent(e.target.value)} placeholder="الحدث" /><input value={url} onChange={e => setUrl(e.target.value)} placeholder="الرابط" /><button onClick={send} className="btn-p">🔔 أرسل Webhook</button>
      <div className="result-box">{logs.map(l => <div key={l.id} style={{ padding: "4px 0", fontSize: 13 }}><strong>{l.event}</strong> ← {l.status} — {new Date(l.timestamp).toLocaleTimeString()}</div>)}</div></Box>
  </Page>;
}

// ============================================
// ⚙️ 18. JOBS
// ============================================
function Jobs() {
  const [jobs, setJobs] = useState([]); const [type, setType] = useState("send-email"); const [jobId, setJobId] = useState("");
  const create = async () => {
    const r = await fetch(`${API}/api/jobs/create`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type, data: { to: "user@test.com" } }) });
    const d = await r.json();
    if (d.job) setJobId(d.job.id);
    const r2 = await fetch(`${API}/api/jobs`); setJobs((await r2.json()).data || []);
  };
  const check = async () => { const r = await fetch(`${API}/api/jobs/${jobId}`); const d = await r.json(); alert(JSON.stringify(d, null, 2)); };
  useEffect(() => { fetch(`${API}/api/jobs`).then(r => r.json()).then(d => setJobs(d.data || [])); }, []);
  return <Page title="⚙️ Background Jobs (المهام الخلفية)" sub="تنفيذ مهام ثقيلة بدون تعطيل المستخدم">
    <Box title="الفكرة"><p>بعض العمليات تحتاج وقت (إرسال إيميل، معالجة صور، تقارير). بدل انتظار المستخدم، نضيفها <strong>قائمة انتظار</strong> وتشتغل في الخلفية.</p></Box>
    <Box title="الكود"><Code code={`const queue = [];\n\napp.post('/api/jobs', (req, res) => {\n  const job = { id: queue.length+1, type: req.body.type, status: 'queued', createdAt: new Date() };\n  queue.push(job);\n  // تشغيل في الخلفية\n  setTimeout(() => { job.status = 'completed'; }, 2000);\n  res.status(202).json({ job });\n});\n\napp.get('/api/jobs/:id', (req, res) => {\n  res.json(queue.find(j => j.id === +req.params.id));\n});`} /></Box>
    <Box title="جرب"><div className="todo-add"><input value={type} onChange={e => setType(e.target.value)} placeholder="نوع المهمة" /><button onClick={create} className="btn-p">⚡ أنشئ مهمة</button></div>
      {jobId && <div>آخر مهمة ID: {jobId} <button onClick={check}>🔍 تحقق</button></div>}
      <div className="result-box" style={{ marginTop: 8 }}>{jobs.map(j => <div key={j.id} style={{ padding: "4px 0", fontSize: 13 }}><strong>{j.type}</strong> — {j.status} ⏱️ {new Date(j.createdAt).toLocaleTimeString()}</div>)}</div></Box>
  </Page>;
}

// ============================================
// 📊 19. GRAPHQL
// ============================================
function GraphQL() {
  const [q, setQ] = useState("{ users { id name } }"); const [res, setRes] = useState(null);
  const send = async () => { const r = await fetch(`${API}/api/graphql`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query: q }) }); setRes(await r.json()); };
  return <Page title="📊 GraphQL" sub="استعلامات مرنة بدل REST">
    <Box title="الفكرة"><p>GraphQL: ترسل <strong>استعلام</strong> وتحدد بالضبط البيانات اللي تبغاها — لا زيادة ولا نقصان.</p></Box>
    <Box title="مقارنة"><div className="grid-2"><div className="tag-box"><strong>🔵 REST</strong><code>GET /api/users ← كل البيانات</code><small>يرجع كلشي، حتى لو تبغى الاسم بس</small></div><div className="tag-box"><strong>🟢 GraphQL</strong><code>{'{ users { name } }'} ← الاسم بس</code><small>تحدد بالضبط وش تبغى</small></div></div></Box>
    <Box title="الكود"><Code code={`// REST-style GraphQL endpoint\napp.post('/api/graphql', (req, res) => {\n  const { query } = req.body;\n  if (query.includes('users'))\n    return res.json({ data: { users } });\n  if (query.includes('products'))\n    return res.json({ data: { products } });\n  if (query.includes('stats'))\n    return res.json({ data: { stats: { users: users.length, products: products.length } } });\n  res.json({ data: { msg: 'غير معروف' } });\n});`} /></Box>
    <Box title="جرب"><input value={q} onChange={e => setQ(e.target.value)} placeholder='{ users { name } }' /><button onClick={send} className="btn-p">📊 أرسل</button>
      {res && <div className="result-box"><pre>{JSON.stringify(res, null, 2)}</pre></div>}
      <p className="muted">جرب: <code>{'{ users { id name } }'}</code> أو <code>{'{ products }'}</code> أو <code>{'{ stats }'}</code></p></Box>
  </Page>;
}

// ============================================
// 🔴 20. WEBSOCKET
// ============================================
function WebSocket() {
  const [msgs, setMsgs] = useState([]); const [text, setText] = useState(""); const [info, setInfo] = useState(null);
  const [connected, setConnected] = useState(false);
  const wsRef = useRef(null);

  useEffect(() => {
    fetch(`${API}/api/websocket/info`).then(r => r.json()).then(setInfo);
    return () => { if (wsRef.current) wsRef.current.close(); };
  }, []);

  const connect = () => {
    if (wsRef.current) wsRef.current.close();
    const socket = new WebSocket(`ws://localhost:5000/socket.io/?EIO=4&transport=polling`);
    wsRef.current = socket;
    socket.onopen = () => setConnected(true);
    socket.onclose = () => setConnected(false);
    socket.onerror = () => setConnected(false);
  };

  return <Page title="🔴 WebSockets" sub="اتصال ثنائي في الوقت الحقيقي">
    <Box title="الفكرة"><p>WebSocket = <strong>اتصال مباشر</strong> بين Client و Server. السيرفر يرسل بيانات أي وقت (دون ما تطلب). يستخدم لـ شات، إشعارات، تحديثات حية.</p></Box>
    <Box title="الكود"><Code code={`// سيرفر\nconst { Server } = require('socket.io');\nconst io = new Server(httpServer, { cors: { origin: '*' } });\n\nio.on('connection', (socket) => {\n  console.log('متصل:', socket.id);\n\n  socket.on('message', (data) => {\n    // أرسل للكل\n    io.emit('message', { from: socket.id, text: data.text });\n  });\n\n  socket.on('disconnect', () => {\n    console.log('مفصول:', socket.id);\n  });\n});`} />
    <div className="dual-btn"><button onClick={connect}>{connected ? "✅ متصل" : "🔴 اتصل"}</button><button onClick={() => { if (wsRef.current) wsRef.current.close(); }}>⛔ افصل</button></div>
    <p className="muted">حالة: {connected ? "✅ متصل" : "❌ غير متصل"} | {info?.clients ?? 0} عميل نشط</p></Box>
  </Page>;
}

// ============================================
// 🏗️ 21. REST
// ============================================
function REST() {
  return <Page title="🏗️ RESTful API Design" sub="أفضل الممارسات لتصميم API">
    <Box title="قواعد REST"><ul>
      <li><strong>استخدم الأسماء بصيغة الجمع:</strong> <code>/api/users</code> ✅ / <code>/api/user</code> ❌</li>
      <li><strong>استخدم HTTP Methods الصحيحة:</strong> GET للعرض، POST للإنشاء، PUT للتحديث، DELETE للحذف</li>
      <li><strong>HATEOAS:</strong> أضف روابط في الاستجابة عشان يعرف العميل الخطوات التالية</li>
      <li><strong>Status Codes:</strong> استخدم الرقم الصحيح (201 للإنشاء، 404 لغير موجود...)</li>
      <li><strong>Versioning:</strong> <code>/api/v1/</code>, <code>/api/v2/</code></li>
    </ul></Box>
    <Box title="مثال HATEOAS"><Code code={`app.get('/api/products', (req, res) => {\n  res.json({\n    _links: {\n      self: { href: '/api/products' },\n      create: { href: '/api/products', method: 'POST' }\n    },\n    data: products.map(p => ({\n      ...p,\n      _links: {\n        self: { href: \`/api/products/\${p.id}\` },\n        update: { href: \`/api/products/\${p.id}\`, method: 'PUT' },\n        delete: { href: \`/api/products/\${p.id}\`, method: 'DELETE' }\n      }\n    }))\n  });\n});`} /></Box>
    <Box title="جرب"><Terminal method="GET" url={`${API}/api/restful/products`} /></Box>
  </Page>;
}

// ============================================
// 🔐 22. ENV
// ============================================
function Env() {
  return <Page title="🔐 Environment Variables" sub="المتغيرات البيئية - تخزين الإعدادات الحساسة">
    <Box title="لماذا؟"><p><strong>لا تكتب التوكنات والمفاتيح في الكود!</strong> استخدم <code>.env</code> file.</p></Box>
    <Box title="الكود"><Code code={`# .env file (لا ترفعه لـ GitHub!)\nPORT=5000\nDB_URL=mongodb://localhost:27017\nJWT_SECRET=my-super-secret-key\nAPI_KEY=abc123xyz\nEMAIL_HOST=smtp.gmail.com\n\n# استخدامها في الكود\nconst port = process.env.PORT || 5000;\nconst dbUrl = process.env.DB_URL;\nconst jwtSecret = process.env.JWT_SECRET;\n\n# npm install dotenv\nrequire('dotenv').config(); // يحمل ملف .env`} /></Box>
    <Box title="جرب"><Terminal method="GET" url={`${API}/api/env/demo`} /></Box>
  </Page>;
}

// ============================================
// ⚠️ 23. ERRORS - معالجة الأخطاء
// ============================================
function Errors() {
  const [errRes, setErrRes] = useState(null);
  const [errLoading, setErrLoading] = useState(null);
  return <Page title="⚠️ معالجة الأخطاء" sub="✦ Error Handling — لا تترك API بدون حماية ✦">
    <Box title="🎯 المبدأ: 3 مستويات للمعالجة">
      <p>الأخطاء حتمية. الفرق بين API محترف وآخر هو <strong>كيف تتعامل معها</strong>.</p>
      <div className="methods-grid">
        <div className="method-card"><span className="badge" style={{background:"#6366f1"}}>1</span><strong>تحقق مسبق</strong><code>if (!data) return 400</code></div>
        <div className="method-card"><span className="badge" style={{background:"#22c55e"}}>2</span><strong>Try/Catch</strong><code>async function → try/catch</code></div>
        <div className="method-card"><span className="badge" style={{background:"#ef4444"}}>3</span><strong>Middleware</strong><code>app.use((err, req, res, next))</code></div>
      </div>
    </Box>
    <Box title="💻 الكود — 3 طرق أساسية">
      <CodeDual clean={`// 1. تحقق من المدخلات قبل المعالجة
app.post('/api/user', (req, res) => {
  if (!req.body.name)
    return res.status(400).json({ error: 'الاسم مطلوب' });
  res.json({ msg: 'تم' });
});

// 2. Try/Catch للدوال الغير متزامنة
app.get('/api/data', async (req, res) => {
  try {
    const data = await getDataFromDB();
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Middleware شامل (آخر شيء)
app.use((err, req, res, next) => {
  console.error('خطأ:', err);
  res.status(500).json({ error: 'حدث خطأ غير متوقع' });
});`}
        explained={`// ============================================
// 3 مستويات لمعالجة الأخطاء
// ============================================

// ========== 1. التحقق المسبق ==========
// 📌 أسهل طريقة: تحقق قبل المعالجة
//    لو البيانات ناقصة → رد خطأ فوري
app.post('/api/user', (req, res) => {
  // 📌 تحقق من وجود الاسم
  if (!req.body.name) {
    // 📌 400 = Bad Request (الطلب خاطئ)
    return res.status(400).json({
      error: 'الاسم مطلوب'
    });
  }
  // 📌 لو كل شيء تمام → أكمل
  res.json({ msg: 'تم' });
});

// ========== 2. Try/Catch ==========
// 📌 للدوال async (مثل قواعد البيانات)
//    try = حاول تنفيذ
//    catch = لو فشل، تعامل مع الخطأ
app.get('/api/data', async (req, res) => {
  try {
    // 📌 انتظر البيانات من قاعدة البيانات
    const data = await getDataFromDB();
    res.json({ data });
  } catch (err) {
    // 📌 لو صار أي خطأ في الـ try
    //    500 = Internal Server Error
    res.status(500).json({
      error: err.message
    });
  }
});

// ========== 3. Middleware شامل ==========
// 📌 يُنفذ لجميع الأخطاء اللي ما اشتغلت عليها
// ⚠️ مهم: لازم 4 parameters (err, req, res, next)
//    Express يعرف أنه Error Middleware من الأربع باراميتر
app.use((err, req, res, next) => {
  // 📌 سجل الخطأ في السيرفر
  console.error('❌ خطأ:', err);
  // 📌 رد على المستخدم برسالة عامة
  //    (لا ترسل تفاصيل الخطأ للمستخدم!)
  res.status(500).json({
    error: 'حدث خطأ غير متوقع'
  });
});`} />
    </Box>
    <Box title="🧪 جرب أنواع الأخطاء">
      <div className="err-grid">
        {[400, 401, 403, 404, 500].map(t => <button key={t} onClick={async () => { setErrLoading(t); try { const r = await fetch(`${API}/api/errors/simulate?type=${t}`); setErrRes({ type: t, status: r.status, data: await r.json() }); } catch(e) { setErrRes({ type: t, error: e.message }); } setErrLoading(null); }}>{t}</button>)}
        <button onClick={async () => { setErrLoading("crash"); try { const r = await fetch(`${API}/api/errors/simulate?type=crash`); setErrRes({ type: "crash", status: r.status, data: await r.json() }); } catch(e) { setErrRes({ type: "crash", error: e.message }); } setErrLoading(null); }}>💥 crash</button>
      </div>
      {errLoading && <p className="hint" style={{marginTop:8}}>🔄 جاري...</p>}
      {errRes && <div className="result-box"><pre style={{fontSize:13}}>{JSON.stringify(errRes.data || {error: errRes.error}, null, 2)}</pre><button className="mp-close" onClick={() => setErrRes(null)}>✕</button></div>}
    </Box>
  </Page>;
}

// ============================================
// 🚀 24. DEPLOY
// ============================================
function Deploy() {
  return <Page title="🚀 نشر API على الإنترنت" sub="Deployment — شغل API لكل العالم">
    <Box title="الخيارات"><div className="grid-2">
      {[{ n: "☁️ Render", d: "مجاني، يربط GitHub", c: "render.com" }, { n: "🌩️ Railway", d: "سريع، Node.js", c: "railway.app" }, { n: "📦 Vercel", d: "API صغيرة", c: "vercel.com" }, { n: "🐳 Railway", d: "سحابة + Docker", c: "railway.app" }].map(x =>
        <div key={x.n} className="deploy-card"><h4>{x.n}</h4><p>{x.d}</p><code>{x.c}</code></div>
      )}
    </div></Box>
    <Box title="خطوات النشر"><Code code={`# 1. package.json\n"scripts": { "start": "node server/index.js" }\n\n# 2. استخدم PORT من البيئة\nconst PORT = process.env.PORT || 5000;\n\n# 3. ادفع لـ GitHub\n# 4. اربط مع Render/Railway\n# 5. حدد Build: npm install, Start: npm start\n# 6. 🎉 API على الإنترنت!`} /></Box>
    <Box title="نصائح"><ul>
      <li><strong>CORS:</strong> حدد المواقع المسموحة</li>
      <li><strong>Rate Limiting:</strong> احمي API من الطلبات الكثيرة</li>
      <li><strong>.env:</strong> خزن التوكنات في Environment Variables</li>
      <li><strong>Logging:</strong> سجل الأخطاء عشان تكتشفها</li>
      <li><strong>Health Check:</strong> أضف <code>GET /api/health</code> ترجع OK</li>
    </ul></Box>
  </Page>;
}

// ============================================
// 🎯 تدريب METHODS - تمرن على الـ 5 Methods
// ============================================
function PracticeMethods() {
  const [logs, setLogs] = useState([]);
  const [url, setUrl] = useState(`${API}/api/methods/get`);
  const [method, setMethod] = useState("GET");
  const [body, setBody] = useState("");
  const send = async () => {
    try {
      const opts = { method, headers: { "Content-Type": "application/json" } };
      if (body && method !== "GET") opts.body = body;
      const r = await fetch(url, opts);
      const data = await r.json();
      setLogs(prev => [{ method, url, status: r.status, data, time: new Date().toLocaleTimeString() }, ...prev.slice(0, 9)]);
    } catch (e) { setLogs(prev => [{ method, url, error: e.message, time: new Date().toLocaleTimeString() }, ...prev.slice(0, 9)]); }
  };
  return <Page title="🎯 تدريب Methods" sub="‍جرب الـ 5 Methods بنفسك">
    <Box title="🎯 التمرين"><p>أرسل طلبات GET و POST و PUT و PATCH و DELETE ولاحظ الفرق في الاستجابة.</p></Box>
    <Box title="🧪 منصة التجربة">
      <div className="term-method-row"><select value={method} onChange={e => setMethod(e.target.value)} className="term-select">
        {["GET","POST","PUT","PATCH","DELETE"].map(m => <option key={m} value={m}>{m}</option>)}
      </select><input value={url} onChange={e => setUrl(e.target.value)} className="term-url-input" /></div>
      {method !== "GET" && <textarea value={body} onChange={e => setBody(e.target.value)} rows={2} placeholder='{"key":"value"}' className="term-body-input" />}
      <button onClick={send} className="btn-p" style={{marginTop:"6px",width:"100%"}}>🚀 أرسل</button>
      {logs.length > 0 && <div className="term-log" style={{marginTop:"8px",maxHeight:"200px"}}>{logs.map((l,i) => <div key={i} className={`term-entry ${i>0?"history":""}`}>
        <div className="term-curl"><span className="term-prompt">$</span> {l.method} <span className="term-url">{l.url}</span> <span className="terminal-time">{l.time}</span></div>
        {l.error ? <div className="term-line" style={{color:"var(--danger)"}}>⛔ {l.error}</div> : <><div className="term-sep" style={{color:l.status<400?"var(--success)":"var(--danger)"}}>◀ {l.status}</div><pre className="term-json">{JSON.stringify(l.data,null,2)}</pre></>}
      </div>)}</div>}
    </Box>
    <Box title="💡 نصائح"><ul>
      <li>استخدم <strong>GET</strong> لقراءة البيانات (الرابط الأساسي)</li>
      <li>استخدم <strong>POST</strong> لإنشاء شيء جديد (أضف Body)</li>
      <li>استخدم <strong>PUT</strong> لاستبدال مورد (حدد id في الرابط)</li>
      <li>استخدم <strong>PATCH</strong> لتحديث جزء (حدد id + Body)</li>
      <li>استخدم <strong>DELETE</strong> لحذف مورد (حدد id في الرابط)</li>
    </ul></Box>
  </Page>;
}

// ============================================
// 🎯 تدريب CRUD - تمرن على CRUD كامل
// ============================================
function PracticeCrud() {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const load = async () => { const r = await fetch(`${API}/api/crud/items`); setList((await r.json()).data || []); };
  const add = async () => { if (!title.trim()) return; await fetch(`${API}/api/crud/items`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: title.trim() }) }); setTitle(""); load(); };
  const toggle = async (id, done) => { await fetch(`${API}/api/crud/items/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ done: !done }) }); load(); };
  const remove = async (id) => { await fetch(`${API}/api/crud/items/${id}`, { method: "DELETE" }); load(); };
  const startEdit = (item) => { setEditId(item.id); setEditTitle(item.title); };
  const saveEdit = async () => { if (!editTitle.trim()) return; await fetch(`${API}/api/crud/items/${editId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: editTitle.trim() }) }); setEditId(null); load(); };
  const reset = async () => { await fetch(`${API}/api/reset`, { method: "POST" }); load(); };
  useEffect(() => { load(); }, []);
  return <Page title="🎯 تدريب CRUD" sub="‍أنشئ، اقرأ، حدث، احذف">
    <Box title="🎯 التمرين"><p>طبّق عمليات CRUD الأربع بنفسك. أضف مهمة، بدّل حالتها، عدّل عنوانها، احذفها.</p></Box>
    <Box title="🧪 منصة التجربة">
      <div className="todo-add"><input value={title} onChange={e => setTitle(e.target.value)} placeholder="عنوان المهمة الجديدة" onKeyDown={e => e.key === "Enter" && add()} /><button onClick={add}>➕ إضافة</button><button onClick={reset} className="btn-ghost">🔄 إعادة</button></div>
      <div className="todo-list">{list.map(i => <div key={i.id} className={`todo-item ${i.done ? "done" : ""}`}>
        {editId === i.id ? <div style={{display:"flex",gap:"6px",flex:1}}><input value={editTitle} onChange={e => setEditTitle(e.target.value)} style={{flex:1,padding:"6px 10px",background:"rgba(3,3,8,0.5)",border:"1px solid var(--border)",borderRadius:"6px",color:"var(--text-bright)",fontSize:"13px"}} /><button onClick={saveEdit} className="btn-p" style={{padding:"6px 12px",fontSize:"12px",minHeight:"auto"}}>💾</button><button onClick={() => setEditId(null)} style={{background:"transparent",border:"1px solid var(--border)",borderRadius:"6px",color:"var(--text)",padding:"6px 10px",cursor:"pointer"}}>✕</button></div>
        : <><span onClick={() => toggle(i.id, i.done)} style={{flex:1,cursor:"pointer"}}>{i.done ? "✅" : "⬜"} {i.title}</span><button onClick={() => startEdit(i)} style={{background:"transparent",border:"none",color:"var(--accent2)",cursor:"pointer",fontSize:"13px",padding:"4px 8px"}}>✏️</button><button onClick={() => remove(i.id)} className="btn-del">🗑️</button></>}
      </div>)}{list.length === 0 && <p className="muted">لا توجد مهام</p>}</div>
    </Box>
    <Box title="💡 نصائح">
      <p><strong>C</strong>reate → POST · <strong>R</strong>ead → GET · <strong>U</strong>pdate → PATCH/PUT · <strong>D</strong>elete → DELETE</p>
    </Box>
  </Page>;
}

// ============================================
// 🎯 تدريب AUTH - تمرن على المصادقة
// ============================================
function PracticeAuth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [token, setToken] = useState("");
  const [middlewareRes, setMiddlewareRes] = useState(null);
  const reg = async () => { const r = await fetch(`${API}/api/auth/register`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password }) }); const d = await r.json(); setMsg(JSON.stringify(d, null, 2)); };
  const login = async () => { const r = await fetch(`${API}/api/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password }) }); const d = await r.json(); setMsg(JSON.stringify(d, null, 2)); if (d.token) setToken(d.token); };
  const testToken = async () => {
    if (!token) { setMiddlewareRes({ error: "لا يوجد توكن — سجل دخول أولاً" }); return; }
    const r = await fetch(`${API}/api/middleware/auth`, { headers: { "Authorization": `Bearer ${token}` } });
    setMiddlewareRes({ status: r.status, data: await r.json() });
  };
  return <Page title="🎯 تدريب Auth" sub="‍سجّل، ادخل، واستخدم التوكن">
    <Box title="🎯 التمرين"><p>1. سجّل مستخدم جديد. 2. ادخل بنفس البيانات. 3. استخدم التوكن لاختبار Middleware.</p></Box>
    <Box title="🧪 منصة التجربة">
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="اسم المستخدم" />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="كلمة السر" />
      <div className="dual-btn"><button onClick={reg}>📝 تسجيل</button><button onClick={login}>🔑 دخول</button></div>
      {msg && <pre className="result-box">{msg}</pre>}
    </Box>
    {token && <Box title="🔐 التوكن">
      <pre className="result-box" style={{wordBreak:"break-all",fontSize:"12px"}}>{token}</pre>
      <button onClick={testToken} className="btn-p" style={{width:"100%",marginTop:"6px"}}>🔐 اختبر التوكن مع Middleware</button>
      {middlewareRes && <div className="result-box" style={{marginTop:"6px"}}><strong>{middlewareRes.status === 200 ? "✅ ناجح" : "❌ فشل"}</strong><pre>{JSON.stringify(middlewareRes.data, null, 2)}</pre></div>}
    </Box>}
    <Box title="💡 نصائح"><ul>
      <li>كلمة السر تُشفر بـ <strong>bcrypt</strong> قبل التخزين — لا تخزنها نصاً أبداً</li>
      <li>التوكن يُرسل في <code>Authorization: Bearer &lt;token&gt;</code></li>
      <li>السيرفر يتحقق من التوكن في Middleware مخصص</li>
    </ul></Box>
  </Page>;
}

// ============================================
// 🎯 تدريب VALIDATION - تمرن على التحقق من البيانات
// ============================================
function PracticeValidation() {
  const [form, setForm] = useState({ name: "", email: "", age: "", password: "", confirmPassword: "" });
  const [res, setRes] = useState(null);
  const submit = async () => {
    const r = await fetch(`${API}/api/validation/register`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setRes(await r.json());
  };
  return <Page title="🎯 تدريب Validation" sub="‍تحقق من صحة البيانات">
    <Box title="🎯 التمرين"><p>املأ النموذج واشوف إن كان السيرفر سيقبل بياناتك أو يرد بأخطاء التحقق.</p></Box>
    <Box title="🧪 منصة التجربة">
      <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="الاسم (حرفين على الأقل)" />
      <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="الإيميل (يحتوي @)" />
      <input value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} type="number" placeholder="العمر (13-120)" />
      <input value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} type="password" placeholder="كلمة السر (6 أحرف على الأقل)" />
      <input value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })} type="password" placeholder="تأكيد كلمة السر" />
      <button onClick={submit} className="btn-p" style={{width:"100%"}}>✅ تحقق وسجل</button>
      {res && <div className="result-box">{JSON.stringify(res, null, 2)}</div>}
    </Box>
    <Box title="💡 نصائح"><ul>
      <li>تحقق من <strong>وجود</strong> الحقل قبل استخدامه</li>
      <li>تحقق من <strong>الطول</strong> (مثلاً الاسم ≥ حرفين)</li>
      <li>تحقق من <strong>الصيغة</strong> (مثلاً الإيميل يحتوي @)</li>
      <li>تحقق من <strong>النطاق</strong> (مثلاً العمر بين 13 و 120)</li>
    </ul></Box>
  </Page>;
}
