(function () {
  "use strict";
  var root = document.documentElement;
  var TITLES = {
    en: "LIORA Life Science · Shine Strong, Live Well",
    zh: "LIORA Life Science · 闪耀坚韧，活得美好"
  };

  /* ---------- language ---------- */
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function setLang(lang) {
    lang = lang === "zh" ? "zh" : "en";
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang === "zh" ? "zh-Hans" : "en");
    document.title = TITLES[lang];
    document.querySelectorAll("[data-ph-en]").forEach(function (el) {
      el.setAttribute("placeholder", el.getAttribute(lang === "zh" ? "data-ph-zh" : "data-ph-en"));
    });
    document.querySelectorAll("[data-alt-en]").forEach(function (el) {
      el.setAttribute("alt", el.getAttribute(lang === "zh" ? "data-alt-zh" : "data-alt-en") || "");
    });
    var btn = document.getElementById("langBtn");
    if (btn) {
      btn.textContent = lang === "zh" ? "EN" : "中文";
      btn.setAttribute("aria-label", lang === "zh" ? "Switch to English" : "切换到中文");
    }
    store("liora-lang", lang);
    updateCalc();
  }
  var params = new URLSearchParams(location.search);
  setLang(params.get("lang") || store("liora-lang") || "en");
  document.getElementById("langBtn").addEventListener("click", function () {
    setLang(root.getAttribute("data-lang") === "zh" ? "en" : "zh");
  });

  /* ---------- router (hash views) ---------- */
  var views = Array.prototype.slice.call(document.querySelectorAll(".view"));
  var nav = document.getElementById("nav");
  function route() {
    var id = (location.hash || "#home").slice(1) || "home";
    var view = document.getElementById(id);
    var target = null;
    if (!view || !view.classList.contains("view")) {
      target = view;
      view = target ? target.closest(".view") : null;
    }
    if (!view) { view = document.getElementById("home"); target = null; }
    views.forEach(function (v) { v.classList.toggle("is-active", v === view); });
    document.querySelectorAll(".nav a").forEach(function (a) {
      if (a.getAttribute("href") === "#" + view.id) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    nav.classList.remove("open");
    if (target) { setTimeout(function () { target.scrollIntoView({ behavior: "smooth", block: "start" }); }, 30); }
    else window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", route);
  route();

  document.querySelector(".menu-btn").addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    this.setAttribute("aria-expanded", open ? "true" : "false");
  });

  /* ---------- image fallback ---------- */
  document.querySelectorAll(".ph img").forEach(function (img) {
    function fail() { img.parentNode.classList.add("ph--empty"); }
    img.addEventListener("error", fail);
    if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) fail();
  });

  /* ---------- rewards calculator ---------- */
  var range = document.getElementById("spend");
  function fmt(n) { return n.toLocaleString("en-MY"); }
  function updateCalc() {
    if (!range) return;
    var rm = +range.value;
    document.getElementById("spendOut").textContent = "RM " + fmt(rm);
    document.getElementById("lpOut").textContent = fmt(rm) + " LP";
    document.getElementById("creditOut").textContent = "RM " + (rm / 100).toFixed(2);
  }
  if (range) range.addEventListener("input", updateCalc);
  updateCalc();

  /* ---------- contact form -> WhatsApp ---------- */
  var form = document.getElementById("contactForm");
  if (form) form.addEventListener("submit", function (e) {
    e.preventDefault();
    var zh = root.getAttribute("data-lang") === "zh";
    var name = form.cname.value.trim(), reach = form.creach.value.trim(), topic = form.ctopic.value, msg = form.cmsg.value.trim();
    var err = document.getElementById("formErr");
    if (!name || !msg) { err.hidden = false; return; }
    err.hidden = true;
    var text = (zh ? "您好 LIORA，我是 " : "Hi LIORA, this is ") + name +
      (reach ? (zh ? "（联系方式：" + reach + "）" : " (" + reach + ")") : "") +
      (zh ? "。\n主题：" : ".\nTopic: ") + topic + "\n\n" + msg;
    var link = document.getElementById("waLink");
    link.href = "https://wa.me/60174073963?text=" + encodeURIComponent(text);
    document.getElementById("formDone").hidden = false;
    link.focus();
  });

  /* ---------- year ---------- */
  var y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear();

  /* ---------- hero vesicle field ---------- */
  var cv = document.getElementById("cells");
  if (!cv || !cv.getContext) return;
  var ctx = cv.getContext("2d");
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var dots = [], W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  function css(v) { return getComputedStyle(root).getPropertyValue(v).trim(); }
  function size() {
    var r = cv.getBoundingClientRect(); W = r.width; H = r.height;
    cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = Math.round(Math.min(46, Math.max(18, W * H / 26000)));
    dots = [];
    for (var i = 0; i < n; i++) {
      dots.push({ x: Math.random() * W, y: Math.random() * H, r: 6 + Math.random() * 30, vx: (Math.random() - .5) * .18, vy: (Math.random() - .5) * .18, p: Math.random() * 6.28, c: i % 3 });
    }
  }
  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    var cols = [css("--glow-a"), css("--glow-b"), css("--glow-c")], stroke = css("--accent");
    for (var i = 0; i < dots.length; i++) {
      var d = dots[i];
      if (!reduce) { d.x += d.vx; d.y += d.vy; if (d.x < -40) d.x = W + 40; if (d.x > W + 40) d.x = -40; if (d.y < -40) d.y = H + 40; if (d.y > H + 40) d.y = -40; }
      var r = d.r * (1 + Math.sin((t || 0) / 1400 + d.p) * .05);
      var g = ctx.createRadialGradient(d.x - r * .3, d.y - r * .3, r * .1, d.x, d.y, r);
      g.addColorStop(0, "rgba(255,255,255,.55)"); g.addColorStop(1, cols[d.c]);
      ctx.globalAlpha = .55; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(d.x, d.y, r, 0, 6.283); ctx.fill();
      ctx.globalAlpha = .28; ctx.strokeStyle = stroke; ctx.lineWidth = 1; ctx.stroke();
      ctx.beginPath(); ctx.arc(d.x, d.y, r * .72, 0, 6.283); ctx.globalAlpha = .12; ctx.stroke();
    }
    ctx.globalAlpha = 1;
    if (!reduce) requestAnimationFrame(draw);
  }
  size(); draw(0);
  window.addEventListener("resize", size);
})();
