const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const multer = require("multer");
const rateLimit = require("express-rate-limit");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// تخزين مؤقت
// ============================================
let users = [{ id: 1, name: "أحمد", email: "ahmed@test.com" }, { id: 2, name: "سارة", email: "sara@test.com" }];
let nextUserId = 3;
let items = [{ id: 1, title: "تعلم JavaScript", done: false }, { id: 2, title: "تعلم Express", done: false }];
let nextItemId = 3;
let products = [{ id: 1, name: "لابتوب", price: 5000 }, { id: 2, name: "ماوس", price: 150 }];
let nextProductId = 3;
let accounts = [];
let posts = [];
let nextPostId = 1;

// ============================================
// 📘 HELLO
// ============================================
app.get("/api/hello", (req, res) => {
  res.json({ message: "مرحباً بالعالم! أول API لك يشتغل!", success: true });
});

// ============================================
// 📘 HTTP METHODS
// ============================================
app.get("/api/methods/get", (req, res) => res.json({ method: "GET", desc: "يجيب البيانات", data: users }));
app.post("/api/methods/post", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: "الاسم والإيميل مطلوبان" });
  const u = { id: nextUserId++, name, email };
  users.push(u);
  res.status(201).json({ method: "POST", msg: "تم الإنشاء", data: u });
});
app.put("/api/methods/put/:id", (req, res) => {
  const u = users.find(x => x.id === +req.params.id);
  if (!u) return res.status(404).json({ error: "غير موجود" });
  Object.assign(u, req.body);
  res.json({ method: "PUT", msg: "تم التحديث الكامل", data: u });
});
app.patch("/api/methods/patch/:id", (req, res) => {
  const u = users.find(x => x.id === +req.params.id);
  if (!u) return res.status(404).json({ error: "غير موجود" });
  Object.assign(u, req.body);
  res.json({ method: "PATCH", msg: "تم التحديث الجزئي", data: u });
});
app.delete("/api/methods/delete/:id", (req, res) => {
  const idx = users.findIndex(x => x.id === +req.params.id);
  if (idx === -1) return res.status(404).json({ error: "غير موجود" });
  const d = users.splice(idx, 1);
  res.json({ method: "DELETE", msg: "تم الحذف", data: d[0] });
});

// ============================================
// 📘 REQUEST COMPONENTS
// ============================================
app.get("/api/request/query", (req, res) => res.json({ lesson: "Query Params", received: req.query }));
app.get("/api/request/params/:cat/:id", (req, res) => res.json({ lesson: "Route Params", received: req.params }));
app.post("/api/request/body", (req, res) => res.json({ lesson: "Request Body", received: req.body }));
app.get("/api/request/headers", (req, res) => res.json({ lesson: "Headers", received: { "content-type": req.headers["content-type"], authorization: req.headers["authorization"] || "غير مرسل", "user-agent": req.headers["user-agent"] } }));

// ============================================
// 📘 STATUS CODES
// ============================================
const statusInfo = {
  200: { name: "OK", meaning: "نجح الطلب", use: "عند نجاح GET" },
  201: { name: "Created", meaning: "تم الإنشاء", use: "بعد POST ناجح" },
  204: { name: "No Content", meaning: "نجح بدون محتوى", use: "بعد DELETE" },
  301: { name: "Moved Permanently", meaning: "تم النقل", use: "تغيير رابط" },
  400: { name: "Bad Request", meaning: "خطأ في الطلب", use: "بيانات ناقصة" },
  401: { name: "Unauthorized", meaning: "غير مصرح", use: "بدون توكن" },
  403: { name: "Forbidden", meaning: "ممنوع", use: "صلاحية ناقصة" },
  404: { name: "Not Found", meaning: "غير موجود", use: "مسار/مورد خطأ" },
  405: { name: "Method Not Allowed", meaning: "طريقة غير مسموحة", use: "POST في مسار GET فقط" },
  409: { name: "Conflict", meaning: "تعارض", use: "بريد إلكتروني مكرر" },
  422: { name: "Validation", meaning: "البيانات غير صالحة", use: "إيميل خطأ" },
  429: { name: "Too Many Requests", meaning: "طلبات كثيرة", use: "تجاوز الحد المسموح" },
  500: { name: "Server Error", meaning: "خطأ في السيرفر", use: "استثناء في الكود" },
  502: { name: "Bad Gateway", meaning: "بوابة خاطئة", use: "مشكلة في وسيط" },
  503: { name: "Service Unavailable", meaning: "الخدمة غير متوفرة", use: "السيرفر تحت الصيانة" },
};
app.get("/api/status/:code", (req, res) => {
  const info = statusInfo[req.params.code];
  if (!info) return res.status(400).json({ error: "كود غير معروف" });
  res.status(+req.params.code).json({ status: +req.params.code, ...info });
});

// ============================================
// 📘 CRUD + RESET
// ============================================
app.get("/api/crud/items", (req, res) => res.json({ count: items.length, data: items }));
app.get("/api/crud/items/:id", (req, res) => { const i = items.find(x => x.id === +req.params.id); if (!i) return res.status(404).json({ error: "غير موجود" }); res.json({ data: i }); });
app.post("/api/crud/items", (req, res) => {
  if (!req.body.title) return res.status(400).json({ error: "العنوان مطلوب" });
  const i = { id: nextItemId++, title: req.body.title, done: false };
  items.push(i);
  res.status(201).json({ data: i });
});
app.put("/api/crud/items/:id", (req, res) => {
  const i = items.find(x => x.id === +req.params.id);
  if (!i) return res.status(404).json({ error: "غير موجود" });
  if (req.body.title === undefined) return res.status(400).json({ error: "العنوان مطلوب" });
  i.title = req.body.title;
  if (req.body.done !== undefined) i.done = req.body.done;
  res.json({ data: i });
});
app.patch("/api/crud/items/:id", (req, res) => {
  const i = items.find(x => x.id === +req.params.id);
  if (!i) return res.status(404).json({ error: "غير موجود" });
  if (req.body.title !== undefined) i.title = req.body.title;
  if (req.body.done !== undefined) i.done = req.body.done;
  res.json({ data: i });
});
app.delete("/api/crud/items/:id", (req, res) => {
  const idx = items.findIndex(x => x.id === +req.params.id);
  if (idx === -1) return res.status(404).json({ error: "غير موجود" });
  res.json({ data: items.splice(idx, 1)[0] });
});
app.post("/api/reset", (req, res) => {
  users = [{ id: 1, name: "أحمد", email: "ahmed@test.com" }, { id: 2, name: "سارة", email: "sara@test.com" }];
  nextUserId = 3;
  items = [{ id: 1, title: "تعلم JavaScript", done: false }, { id: 2, title: "تعلم Express", done: false }];
  nextItemId = 3;
  products = [{ id: 1, name: "لابتوب", price: 5000 }, { id: 2, name: "ماوس", price: 150 }];
  nextProductId = 3;
  accounts = [];
  posts = []; nextPostId = 1;
  res.json({ msg: "تمت إعادة التعيين" });
});

// ============================================
// 📘 MIDDLEWARE
// ============================================
app.get("/api/middleware/auth", (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "Unauthorized - أرسل Authorization header" });
  res.json({ msg: "مصرح بالدخول", token, user: { id: 1, name: "مستخدم", role: "admin" } });
});

// ============================================
// 📘 AUTH
// ============================================
app.post("/api/auth/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "مطلوب اسم وكلمة سر" });
  if (accounts.find(a => a.username === username)) return res.status(409).json({ error: "المستخدم موجود" });
  accounts.push({ id: accounts.length + 1, username, hash: bcrypt.hashSync(password, 10) });
  res.status(201).json({ msg: "تم التسجيل", username });
});
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;
  const a = accounts.find(x => x.username === username);
  if (!a || !bcrypt.compareSync(password, a.hash)) return res.status(401).json({ error: "بيانات خطأ" });
  res.json({ msg: "تم الدخول", token: crypto.randomBytes(20).toString("hex"), username });
});

// ============================================
// 📘 PASSWORDS
// ============================================
app.post("/api/password/generate", (req, res) => {
  const { length = 12, numbers = true, symbols = true, uppercase = true } = req.body;
  let c = "abcdefghijklmnopqrstuvwxyz";
  if (uppercase) c += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (numbers) c += "0123456789";
  if (symbols) c += "!@#%^&*()_+-=[]{}|;:,.<>?";
  let p = "";
  for (let i = 0; i < length; i++) p += c[crypto.randomInt(0, c.length)];
  res.json({ password: p });
});
app.post("/api/password/check", (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: "مطلوب" });
  let s = 0, fb = [];
  if (password.length >= 8) s += 25; else fb.push("8 أحرف فأكثر");
  if (password.length >= 12) s += 15;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) s += 20; else fb.push("حروف كبيرة وصغيرة");
  if (/\d/.test(password)) s += 20; else fb.push("أرقام");
  if (/[^a-zA-Z0-9]/.test(password)) s += 20; else fb.push("رموز خاصة");
  res.json({ score: s, strength: s >= 80 ? "قوية جداً" : s >= 60 ? "قوية" : s >= 40 ? "متوسطة" : "ضعيفة", feedback: fb });
});
app.post("/api/password/hash", async (req, res) => {
  if (!req.body.password) return res.status(400).json({ error: "مطلوب" });
  res.json({ hash: await bcrypt.hash(req.body.password, 10) });
});
app.post("/api/password/verify", async (req, res) => {
  if (!req.body.password || !req.body.hash) return res.status(400).json({ error: "مطلوب كلمة وتشفير" });
  res.json({ match: await bcrypt.compare(req.body.password, req.body.hash) });
});

// ============================================
// 📘 DATABASE (Products with filtering)
// ============================================
app.get("/api/db/products", (req, res) => {
  let r = [...products];
  if (req.query.name) r = r.filter(p => p.name.includes(req.query.name));
  if (req.query.min) r = r.filter(p => p.price >= +req.query.min);
  if (req.query.max) r = r.filter(p => p.price <= +req.query.max);
  res.json({ count: r.length, data: r });
});
app.post("/api/db/products", (req, res) => {
  if (!req.body.name || !req.body.price) return res.status(400).json({ error: "الاسم والسعر مطلوبان" });
  const p = { id: nextProductId++, name: req.body.name, price: +req.body.price };
  products.push(p);
  res.status(201).json({ data: p });
});
app.put("/api/db/products/:id", (req, res) => {
  const p = products.find(x => x.id === +req.params.id);
  if (!p) return res.status(404).json({ error: "غير موجود" });
  Object.assign(p, req.body);
  res.json({ data: p });
});
app.delete("/api/db/products/:id", (req, res) => {
  const idx = products.findIndex(x => x.id === +req.params.id);
  if (idx === -1) return res.status(404).json({ error: "غير موجود" });
  res.json({ data: products.splice(idx, 1)[0] });
});

// ============================================
// 📘 ERROR HANDLING
// ============================================
app.get("/api/errors/simulate", (req, res) => {
  const t = req.query.type;
  const codes = { 400: "Bad Request - تحقق من البيانات", 401: "Unauthorized - أضف توكن", 403: "Forbidden - ليس لديك صلاحية", 404: "Not Found - تحقق من الرابط", 500: "Internal Server Error - خطأ في الكود" };
  if (codes[t]) return res.status(+t).json({ error: codes[t], type: t });
  if (t === "crash") throw new Error("انفجار متعمد في السيرفر!");
  res.json({ msg: "لا يوجد خطأ", hint: 'جرب ?type=400,401,403,404,500,crash' });
});
app.use((err, req, res, next) => { console.error(err); res.status(500).json({ error: "Internal Server Error", message: err.message }); });

// ============================================
// 📘 جديد: FILE UPLOAD
// ============================================
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
const storage = multer.diskStorage({
  destination: (r, f, cb) => cb(null, uploadDir),
  filename: (r, f, cb) => cb(null, Date.now() + "-" + f.originalname)
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

app.post("/api/file/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "اختر ملف" });
  res.status(201).json({ msg: "تم رفع الملف", file: { name: req.file.originalname, size: req.file.size, type: req.file.mimetype, url: `/uploads/${req.file.filename}` } });
});
app.get("/api/file/info", (req, res) => {
  const files = fs.readdirSync(uploadDir).map(f => {
    const s = fs.statSync(path.join(uploadDir, f));
    return { name: f, size: s.size, date: s.birthtime };
  });
  res.json({ count: files.length, files });
});

// ============================================
// 📘 جديد: PAGINATION & SORTING
// ============================================
const allPosts = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1, title: `مقال رقم ${i + 1}`, content: "محتوى المقال...", author: ["أحمد", "سارة", "خالد"][i % 3],
  date: new Date(2025, 0, i + 1).toISOString(), views: Math.floor(Math.random() * 1000)
}));

app.get("/api/pagination/posts", (req, res) => {
  let { page = 1, limit = 10, sort = "id", order = "asc", author } = req.query;
  page = +page; limit = +limit;
  let result = [...allPosts];

  if (author) result = result.filter(p => p.author === author);

  if (sort === "views") result.sort((a, b) => order === "desc" ? b.views - a.views : a.views - b.views);
  else if (sort === "date") result.sort((a, b) => order === "desc" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date));
  else result.sort((a, b) => order === "desc" ? b.id - a.id : a.id - b.id);

  const total = result.length;
  const totalPages = Math.ceil(total / limit);
  const data = result.slice((page - 1) * limit, page * limit);

  res.json({ page, limit, total, totalPages, hasNext: page < totalPages, hasPrev: page > 1, data });
});

// ============================================
// 📘 جديد: SEARCH
// ============================================
const searchable = [
  { id: 1, title: "تعلم JavaScript", category: "برمجة", tags: ["js", "web"], level: "مبتدئ" },
  { id: 2, title: "تعلم React", category: "برمجة", tags: ["react", "frontend"], level: "متوسط" },
  { id: 3, title: "تعلم Node.js", category: "برمجة", tags: ["node", "backend"], level: "متوسط" },
  { id: 4, title: "تصميم UI/UX", category: "تصميم", tags: ["ui", "figma"], level: "مبتدئ" },
  { id: 5, title: "تسويق إلكتروني", category: "تسويق", tags: ["marketing", "seo"], level: "متقدم" },
  { id: 6, title: "تحليل البيانات", category: "بيانات", tags: ["python", "sql"], level: "متقدم" },
  { id: 7, title: "أمن سيبراني", category: "أمن", tags: ["security", "hacking"], level: "متقدم" },
  { id: 8, title: "تطوير تطبيقات الجوال", category: "برمجة", tags: ["mobile", "flutter"], level: "متوسط" },
];

app.get("/api/search", (req, res) => {
  const { q, category, level, tag } = req.query;
  let r = [...searchable];

  if (q) {
    const s = q.toLowerCase();
    r = r.filter(x => x.title.toLowerCase().includes(s) || x.tags.some(t => t.includes(s)) || x.category.includes(s));
  }
  if (category) r = r.filter(x => x.category === category);
  if (level) r = r.filter(x => x.level === level);
  if (tag) r = r.filter(x => x.tags.includes(tag));

  res.json({ count: r.length, query: req.query, data: r });
});

// ============================================
// 📘 جديد: RATE LIMITING
// ============================================
const apiLimiter = rateLimit({ windowMs: 15 * 1000, max: 5, message: { error: "طلبات كثيرة! انتظر 15 ثانية", retryAfter: "15s" }, standardHeaders: true, legacyHeaders: false });
app.get("/api/ratelimit/test", apiLimiter, (req, res) => {
  res.json({ msg: "تم قبول الطلب", remaining: req.rateLimit?.remaining || "غير معروف" });
});

// ============================================
// 📘 جديد: API VERSIONING
// ============================================
app.get("/api/v1/users", (req, res) => res.json({ version: "v1", data: users.map(u => ({ id: u.id, name: u.name, email: u.email })) }));
app.get("/api/v2/users", (req, res) => res.json({
  version: "v2", meta: { total: users.length, format: "مبسط" },
  data: users.map(u => ({ id: u.id, name: u.name, email: u.email, profile: `/users/${u.id}` }))
}));

// ============================================
// 📘 جديد: REQUEST VALIDATION (Joi-style)
// ============================================
app.post("/api/validation/register", (req, res) => {
  const errors = [];
  const { name, email, age, password } = req.body;
  if (!name || name.length < 2) errors.push("الاسم: 2 أحرف على الأقل");
  if (!email || !email.includes("@")) errors.push("الإيميل: غير صالح");
  if (age && (age < 13 || age > 120)) errors.push("العمر: بين 13 و 120");
  if (!password || password.length < 6) errors.push("كلمة السر: 6 أحرف على الأقل");
  if (errors.length) return res.status(422).json({ error: "فشل التحقق", details: errors });
  res.status(201).json({ msg: "تم التسجيل", user: { name, email, age: age || null } });
});

// ============================================
// 📘 جديد: CACHING (ETag)
// ============================================
let cachedData = { timestamp: Date.now(), data: { msg: "هذه البيانات مخبأة", version: 2, items: [1, 2, 3] } };
app.get("/api/caching/data", (req, res) => {
  const etag = `"${cachedData.timestamp}"`;
  if (req.headers["if-none-match"] === etag) return res.status(304).end();
  res.set("ETag", etag);
  res.set("Cache-Control", "public, max-age=30");
  res.json(cachedData.data);
});
app.post("/api/caching/update", (req, res) => {
  cachedData = { timestamp: Date.now(), data: req.body || { msg: "محدث", version: 3, items: [4, 5, 6] } };
  res.json({ msg: "تم التحديث", data: cachedData.data });
});

// ============================================
// 📘 جديد: WEBHOOKS (محاكاة)
// ============================================
const webhookLogs = [];
app.post("/api/webhooks/send", async (req, res) => {
  const { event, url, data } = req.body;
  if (!event || !url) return res.status(400).json({ error: "مطلوب event و url" });
  const log = { id: webhookLogs.length + 1, event, url, data: data || {}, status: "pending", timestamp: new Date().toISOString() };
  webhookLogs.push(log);
  setTimeout(() => { log.status = Math.random() > 0.2 ? "success" : "failed"; }, 1000);
  res.status(202).json({ msg: "تم إرسال webhook", log });
});
app.get("/api/webhooks/logs", (req, res) => res.json({ count: webhookLogs.length, data: webhookLogs }));

// ============================================
// 📘 جديد: ENVIRONMENT VARIABLES
// ============================================
app.get("/api/env/demo", (req, res) => {
  res.json({
    lesson: "Environment Variables",
    importance: "لا تكتب التوكنات في الكود! استخدم ملف .env",
    example: ".env file:\nPORT=5000\nDB_URL=mongodb://...\nJWT_SECRET=mysecret\nAPI_KEY=xyz123",
    usage: "const port = process.env.PORT || 5000;",
    current: { NODE_ENV: process.env.NODE_ENV || "development", PORT: process.env.PORT || 5000 }
  });
});

// ============================================
// 📘 جديد: HATEOAS & RESTful Design
// ============================================
app.get("/api/restful/products", (req, res) => {
  res.json({
    _links: { self: { href: "/api/restful/products" }, create: { href: "/api/restful/products", method: "POST" } },
    count: products.length,
    data: products.map(p => ({
      ...p, _links: { self: { href: `/api/restful/products/${p.id}` }, update: { href: `/api/restful/products/${p.id}`, method: "PUT" }, delete: { href: `/api/restful/products/${p.id}`, method: "DELETE" } }
    }))
  });
});

// ============================================
// 📘 جديد: BACKGROUND JOBS
// ============================================
const jobQueue = [];
app.post("/api/jobs/create", (req, res) => {
  const { type, data } = req.body;
  if (!type) return res.status(400).json({ error: "نوع المهمة مطلوب" });
  const job = { id: jobQueue.length + 1, type, data: data || {}, status: "queued", createdAt: new Date().toISOString() };
  jobQueue.push(job);
  setTimeout(() => { job.status = "completed"; job.completedAt = new Date().toISOString(); }, 2000);
  res.status(202).json({ msg: "المهمة في الانتظار", job });
});
app.get("/api/jobs", (req, res) => res.json({ count: jobQueue.length, data: jobQueue }));
app.get("/api/jobs/:id", (req, res) => {
  const j = jobQueue.find(x => x.id === +req.params.id);
  if (!j) return res.status(404).json({ error: "غير موجود" });
  res.json({ data: j });
});

// ============================================
// 📘 جديد: GRAPHQL-style endpoint
// ============================================
app.post("/api/graphql", (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ error: "مطلوب query" });

  // محاكاة بسيطة لـ GraphQL
  if (query.includes("users")) return res.json({ data: { users } });
  if (query.includes("products")) return res.json({ data: { products } });
  if (query.includes("items")) return res.json({ data: { items } });
  if (query.includes("stats")) return res.json({ data: { stats: { users: users.length, products: products.length, items: items.length } } });

  res.json({ data: { msg: "اكتب query يحتوي على users, products, items, أو stats" } });
});

// ============================================
// 📘 جديد: WEBSOCKET (socket.io)
// ============================================
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });

app.set("io", io);

io.on("connection", (socket) => {
  console.log("عميل متصل:", socket.id);

  socket.on("message", (data) => {
    io.emit("message", { from: socket.id, text: data.text, time: new Date().toISOString() });
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", { user: socket.id, typing: data.typing });
  });

  socket.on("disconnect", () => {
    console.log("عميل مفصول:", socket.id);
  });
});

// WebSocket info endpoint
app.get("/api/websocket/info", (req, res) => {
  const count = io.engine?.clientsCount || 0;
  res.json({
    lesson: "WebSockets",
    description: "اتصال ثنائي الاتجاه في الوقت الحقيقي",
    clients: count,
    examples: ["chat", "notifications", "live updates", "collaboration"],
    code: `// Client (Browser)\nconst socket = io("http://localhost:5000");\nsocket.on("message", (data) => console.log(data));\nsocket.emit("message", { text: "مرحبا" });`
  });
});

// ============================================
// ميناء الاستماع (للتشغيل المحلي فقط)
// ============================================
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log(`🚀 شغال على http://localhost:${PORT}`));
}

// تصدير التطبيق لـ Vercel
module.exports = app;
