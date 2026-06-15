import { useState, useEffect, useRef } from "react";

const useInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const Reveal = ({ children, delay = 0, className = "", style = {} }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 1.1s cubic-bezier(.16,1,.3,1) ${delay}s, transform 1.1s cubic-bezier(.16,1,.3,1) ${delay}s`,
      ...style
    }}>
      {children}
    </div>
  );
};

// SVG backgrounds drawn in code — no external image deps
const RootPattern = () => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.07, pointerEvents: "none" }} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
    <g stroke="#7ec8a0" strokeWidth="0.8" fill="none">
      <path d="M400,600 C400,500 380,450 350,380 C320,310 280,290 240,220 C200,150 210,80 200,0" />
      <path d="M400,600 C400,500 420,440 460,360 C500,280 540,260 560,190 C580,120 560,60 580,0" />
      <path d="M400,600 C390,520 360,490 320,430 C280,370 250,340 230,280 C210,220 220,160 210,100" />
      <path d="M400,600 C410,510 440,470 480,400 C520,330 550,300 570,240 C590,180 575,120 590,60" />
      <path d="M350,380 C310,370 280,350 250,320 C220,290 200,260 170,240" />
      <path d="M350,380 C330,360 300,330 270,300" />
      <path d="M460,360 C490,345 520,325 545,295 C570,265 585,235 610,215" />
      <path d="M460,360 C480,340 505,310 525,280" />
      <path d="M240,220 C210,215 185,200 160,180 C135,160 115,135 90,120" />
      <path d="M560,190 C590,180 615,165 638,145 C661,125 678,100 700,85" />
      <path d="M320,430 C290,420 265,400 240,375" />
      <path d="M480,400 C510,388 535,368 555,342" />
    </g>
    <g fill="#7ec8a0" opacity="0.4">
      <circle cx="350" cy="380" r="2.5"/>
      <circle cx="460" cy="360" r="2.5"/>
      <circle cx="240" cy="220" r="2"/>
      <circle cx="560" cy="190" r="2"/>
      <circle cx="320" cy="430" r="2"/>
      <circle cx="480" cy="400" r="2"/>
    </g>
  </svg>
);

const HexPattern = () => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04, pointerEvents: "none" }} viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
    {Array.from({length: 8}).map((_, row) =>
      Array.from({length: 10}).map((_, col) => {
        const x = col * 46 + (row % 2) * 23;
        const y = row * 40;
        const pts = [0,1,2,3,4,5].map(i => {
          const a = Math.PI / 180 * (60 * i - 30);
          return `${x + 20 * Math.cos(a)},${y + 20 * Math.sin(a)}`;
        }).join(' ');
        return <polygon key={`${row}-${col}`} points={pts} stroke="#2a9d8f" strokeWidth="0.5" fill="none" />;
      })
    )}
  </svg>
);

const WavePattern = () => (
  <svg style={{ position: "absolute", bottom: 0, left: 0, width: "100%", opacity: 0.12, pointerEvents: "none" }} viewBox="0 0 1440 120" preserveAspectRatio="none">
    <path d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z" fill="#0c1d69"/>
    <path d="M0,80 C360,40 720,100 1080,60 C1260,40 1380,80 1440,70 L1440,120 L0,120 Z" fill="#184888" opacity="0.6"/>
  </svg>
);

export default function DaseinBridge() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
const [formSent, setFormSent] = useState(false)
const [openPrinciple, setOpenPrinciple] = useState(null);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navItems = [
    { id: "mission", label: "Mission" },
    { id: "principles", label: "Principles" },
    { id: "systems", label: "Systems" },
    { id: "services", label: "Services" },
    { id: "team", label: "Team" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div style={{ background: "linear-gradient(180deg, #0a1622 0%, #0c1f2a 50%, #0a1622 100%)", color: "#e8e4dc", fontFamily: "'Georgia', serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        :root {
          --forest: #0a1410;
          --deep: #0c1f2a;
          --mid: #122821;
          --teal: #16413f;
          --bright: #2f7d9e;
          --sage: #8fb4c4;
          --moss: #5e7f8f;
          --fern: #4a7a52;
          --pine: #163d2f;
          --gold: #b87a35;
          --amber: #d9a84e;
          --bronze: #8a6a32;
          --bark: #5e4326;
          --clay: #a8623c;
          --coral: #c46a4a;
          --cream: #ece6d8;
          --muted: #9a9488;
          --blue : #2f6f9e;
          --deepblue: #1a4665;
          --ice: #7fb0c9;
          --night: #0a1622;
        }
        .cg { font-family: 'Cormorant Garamond', Georgia, serif; }
        .dm { font-family: 'DM Sans', sans-serif; }
        .gold { color: var(--gold); }
        .sage { color: var(--sage); }
        .bright { color: var(--bright); }
        .muted { color: var(--muted); }

        .btn-primary {
          display: inline-block;
          background: var(--bright);
          color: var(--forest);
          padding: 14px 36px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: all 0.35s;
          position: relative;
          overflow: hidden;
        }
        .btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--sage);
          transform: translateX(-100%);
          transition: transform 0.35s;
        }
        .btn-primary:hover::after { transform: translateX(0); }
        .btn-primary span { position: relative; z-index: 1; }

        .btn-ghost {
          display: inline-block;
          border: 1px solid rgba(212,168,83,0.4);
          color: var(--gold);
          padding: 13px 35px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          background: transparent;
          cursor: pointer;
          transition: all 0.35s;
        }
        .btn-ghost:hover { background: rgba(212,168,83,0.1); border-color: var(--gold); }

        .section-wrap { max-width: 1120px; margin: 0 auto; padding: 0 40px; }
        .label { font-family: 'DM Sans', sans-serif; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: var(--sage); margin-bottom: 12px; }
        .rule { width: 48px; height: 1px; background: var(--gold); margin: 16px 0 32px; }
        .rule-center { margin: 16px auto 32px; }

        .card-dark {
          background: rgba(15,36,32,0.7);
          border: 1px solid rgba(42,157,143,0.12);
          backdrop-filter: blur(8px);
          transition: border-color 0.4s, transform 0.4s;
        }
        .card-dark:hover { border-color: rgba(42,157,143,0.4); transform: translateY(-6px); }

        input, textarea, select {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(42,157,143,0.2);
          color: var(--cream);
          padding: 14px 18px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.3s;
        }
        input:focus, textarea:focus, select:focus { border-color: var(--bright); }
        input::placeholder, textarea::placeholder { color: var(--muted); }
        select option { background: #0a1a18; }

        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 0.6; }
          100% { transform: scale(2.5); opacity: 0; }
        }
             @keyframes rootGrow {
        0% { stroke-dashoffset: 1000; }
        45% { stroke-dashoffset: 0; }
        55% { stroke-dashoffset: 0; }
        100% { stroke-dashoffset: 1000; }
      }

        @media (max-width: 768px) {
          .section-wrap { padding: 0 20px; }
          .hero-title { font-size: clamp(44px, 11vw, 80px) !important; }
          .grid-2, .grid-3, .team-grid { grid-template-columns: 1fr !important; }
          .hero-btns { flex-direction: column; align-items: center; }
          .nav-links { display: none !important; }

        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled ? "rgba(6,15,14,0.95)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(42,157,143,0.15)" : "none",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.5s", padding: "0 40px"
      }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <a href="#" className="cg" style={{ fontSize: 24, fontWeight: 600, letterSpacing: 0.5 }}>
            Dasein<span className="gold" style={{ fontStyle: "italic" }}>Bridge</span>
          </a>
          <div className="dm nav-links" style={{ display: "flex", gap: 40, alignItems: "center" }}>
            {navItems.map(n => (
              <a key={n.id} href={`#${n.id}`}
                style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "var(--muted)", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "var(--sage)"}
                onMouseLeave={e => e.target.style.color = "var(--muted)"}
              >{n.label}</a>
            ))}

          </div>
          <a href="#contact" className="btn-ghost" style={{ padding: "8px 20px", fontSize: 11}}>Get In Touch</a>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden",
        background: "radial-gradient(ellipse at 20% 80%, rgba(26,56,84,0.5) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(3, 43, 124, 0.48) 0%, transparent 50%), #060f0e"
      }}>
        <RootPattern />

        {/* Animated orb */} 
        <div style={{
          position: "absolute", right: "8%", top: "58%", transform: "translateY(-50%)",
          width: 360, height: 360, borderRadius: "50%",
          background: "radial-gradient(circle at 35% 40%, rgba(15, 88, 21, 0.38), rgba(6,15,14,0.0) 70%)",
          animation: "floatSlow 8s ease-in-out infinite",
          pointerEvents: "none"
        }}>
          <svg viewBox="0 0 360 360" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}>
  <g fill="none" stroke="rgba(42,157,143,0.55)" strokeWidth="1.4" strokeLinecap="round">
  <path d="M180,180 C195,140 185,95 180,55 C175,95 165,140 180,180" style={{ strokeDasharray: 1000, animation: "rootGrow 9s ease-in-out infinite" }} />
  <path d="M180,180 C220,160 255,130 280,95 C245,120 210,150 180,180" style={{ strokeDasharray: 1000, animation: "rootGrow 9s ease-in-out infinite 0.3s" }} />
  <path d="M180,180 C225,185 265,200 300,185 C260,200 215,200 180,180" style={{ strokeDasharray: 1000, animation: "rootGrow 9s ease-in-out infinite 0.6s" }} />
  <path d="M180,180 C215,215 245,250 255,290 C235,250 205,215 180,180" style={{ strokeDasharray: 1000, animation: "rootGrow 9s ease-in-out infinite 0.9s" }} />
  <path d="M180,180 C185,225 175,265 180,305 C175,265 165,225 180,180" style={{ strokeDasharray: 1000, animation: "rootGrow 9s ease-in-out infinite 1.2s" }} />
  <path d="M180,180 C145,215 115,250 105,290 C125,250 155,215 180,180" style={{ strokeDasharray: 1000, animation: "rootGrow 9s ease-in-out infinite 1.5s" }} />
  <path d="M180,180 C135,185 95,200 60,185 C100,200 145,200 180,180" style={{ strokeDasharray: 1000, animation: "rootGrow 9s ease-in-out infinite 1.8s" }} />
  <path d="M180,180 C140,160 105,130 80,95 C115,120 150,150 180,180" style={{ strokeDasharray: 1000, animation: "rootGrow 9s ease-in-out infinite 2.1s" }} />
  </g>
</svg>
        </div>

        {/* Ripple rings */}
        {[1,2,3].map(i => (
          <div key={i} style={{
            position: "absolute", right: "calc(8% + 140px)", top: "61%",
            width: 20, height: 20, marginLeft: -10, marginTop: -10,
            borderRadius: "50%",
            border: "1px solid rgba(42,157,143,0.3)",
            animation: `ripple 4s ease-out infinite ${i * 1.3}s`,
            pointerEvents: "none"
          }}/>
        ))}

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1120, margin: "0 auto", padding: "120px 40px 80px", width: "100%" }}>
          <div className="dm label" style={{ animation: "heroFadeUp 1s ease 0.2s both" }}>
            Directed By Humans · Accountable Infrastructure · AI Reimagined
          </div>
          <h1 className="cg hero-title" style={{
            fontSize: "clamp(52px, 7vw, 88px)", fontWeight: 300, lineHeight: 1.1,
            color: "var(--amber)", maxWidth: 760, marginBottom: 12,
            animation: "heroFadeUp 1s ease 0.4s both"
          }}>
            Where <em style={{ color: "var(--deepblue)", fontWeight: 400 }}>untapped brilliance</em><br />
            meets established expertise.
          </h1>
          <p className="dm" style={{
            fontSize: 17, lineHeight: 1.9, color: "var(--muted)", maxWidth: 540,
            marginBottom: 48, marginTop: 24,
            animation: "heroFadeUp 1s ease 0.6s both"
          }}>
            We build AI that strengthens and lifts. Protecting dignity, supporting communities with care, clarity, and responsibility that sustains, by bringing the future to you. 
            </p>
          <p className="cg" style={{
fontSize: 22, lineHeight: 1.5, color: "var(--sage)", maxWidth: 540,
marginBottom: 48, fontStyle: "italic",
animation: "heroFadeUp 1s ease 0.7s both"
}}>
People lead. Technology follows. Humanity rises.
</p>
          <div className="hero-btns" style={{
            display: "flex", gap: 16, flexWrap: "wrap", maxWidth: 325,
            animation: "heroFadeUp 1s ease 0.8s both"
          }}>
            <a href="#systems" className="btn-primary"><span>See What We Build</span></a>
            <a href="#mission" className="btn-ghost">Our Mission</a>
          </div>

          <div style={{ marginTop: 80, display: "flex", gap: 48, flexWrap: "wrap", animation: "heroFadeUp 1s ease 1s both" }}>
            {[["Led By Us", "We carve the path, technology follows suit."], ["No Gatekeeping", "At Dasein, we believe that genius knows no economic boundary."], ["Accountability", "Trust is structural, not a feature."]].map(([t, d]) => (
              <div key={t} style={{ borderLeft: "2px solid rgba(25, 70, 139, 0.4)", paddingLeft: 16 }}>
                <div className="cg" style={{ fontSize: 17, color: "var(--cream)", marginBottom: 4 }}>{t}</div>
                <div className="dm" style={{ fontSize: 13, color: "var(--muted)" }}>{d}</div>
              </div>
            ))}
          </div>
        </div>

        <WavePattern />
      </section>
      {/* TILDE — AI belongs to humanity (hero → foundation) */}
<section style={{ background: "linear-gradient(180deg, rgba(12,31,42,0.95) 0%, rgba(94,67,38,0.25) 50%, rgba(12,31,42,0.95) 100%)", padding: "100px 40px" }}>
  <Reveal>
    <p className="cg" style={{ fontSize: "clamp(18px, 2.5vw, 28px)", color: "var(--cream)", maxWidth: 860, margin: "0 auto", textAlign: "center", lineHeight: 1.6, fontWeight: 400 }}>
      "AI belongs to humanity. It must uplift people, strengthen communities, and create new paths for dignity and possibility &mdash; from the most unexpected corners of the world."
    </p>
  </Reveal>
</section>

      {/* ═══ MISSION ═══ */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 20% 80%, rgba(11,73,29,0.28) 0%, transparent 50%)", pointerEvents: "none"}} />
      <section id="mission" style={{ background: "linear-gradient(180deg, rgba(12,31,42,0.95) 0%, rgba(11,40,45,0.92) 45%, rgba(9,52,38,0.92) 72%, rgba(6,58,30,0.95) 100%)", position: "relative", overflow: "hidden", padding: "120px 0" }}>
        <div className="section-wrap">
          <Reveal>
            <div className="label">Our Foundation</div>
            <div className="rule" />
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }} className="grid-2">
            <Reveal delay={0.1}>
              <h2 className="cg" style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 300, lineHeight: 1.2, color: "var(--cream)", marginBottom: 32 }}>
                Intelligence shaped<br /><em className="gold">by people,</em><br />for humanity.
              </h2>
              <p className="dm" style={{ fontSize: 15, lineHeight: 1.9, color: "var(--muted)", marginBottom: 24 }}>
                Our systems follow the direction of the communities we serve, carving paths that belong to the members themselves.
              </p>
              <div className="dm" style={{ fontSize: 13, letterSpacing: 1, color: "var(--sage)", textTransform: "uppercase" }}>
                Context → Structure → Outcome
              </div>
              {/* FOUNDER CARD (Pam) — moved up from Team */}
<div style={{ background: "rgba(15,36,32,0.5)", border: "1px solid rgba(42,157,143,0.15)", padding: "40px 36px", marginTop: 48 }}>
  <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28 }}>
    <div style={{ width: 60, height: 60, borderRadius: "50%", background: "linear-gradient(135deg, var(--teal), var(--bright))", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(212,168,83,0.3)" }}>
      <span className="cg" style={{ fontSize: 24, fontWeight: 600, color: "var(--cream)" }}>P</span>
    </div>
    <div>
      <div className="cg" style={{ fontSize: 22, color: "var(--cream)" }}>Pamela Cuce</div>
      <div className="dm" style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage)" }}>Founder &amp; CEO</div>
    </div>
  </div>
<p className="dm" style={{ fontSize: 14, lineHeight: 1.9, color: "var(--muted)", marginBottom: 28 }}> Established Biomimetics Systems Engineer. Cuce uses biology to engineer intelligence. She is the creator of SPL, and the author of its founding, published paper (link just below). Her work fuses embodied cognitive science with <em>full-stack</em> systems engineering: agentic design. Drawn from how living systems actually adapt, not how software conventionally behaves. Seventeen years building in the space within human-centered AI; from robotic integrations and AI-powered medical devices, to agentic systems, XR, and edge.
  </p>
  <p className="dm" style={{ fontSize: 14, lineHeight: 1.9, color: "var(--muted)", marginBottom: 28 }}> At Vassar College, she created Mind &amp; Embodiment: a self-directed, cognitive science <em>major</em>, formulating the common principles of intelligent behavior across biology, language, and philosophy, and testing theories of mind through biomimetic agents. Her work traces the enactivist lineage of Arkin, Brooks, Pfeifer, Varela, Maturana, Heidegger, and Wittgenstein, and the evolutionary-biorobotics research of John Long, in whose Vassar Robotics lab she served as a Visiting Scientist. That foundation, found here, runs straight through SPL. </p>
  
  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
    {["SPL Creator", "Visiting Scientist: Vassar Biology & Robotics Lab", "NSF Bioengineering Fellow", "MIT Summer Session Instructor", "NYU Medical College: AI Medical Devices", "MS Human-AI Interaction, Tufts"].map(t => (
      <span key={t} className="dm" style={{ fontSize: 11, padding: "4px 12px", border: "1px solid rgba(42,157,143,0.25)", color: "var(--sage)", letterSpacing: 0.5 }}>{t}</span>
    ))}
    <a href="https://share.google/aqnB25OHsBHkEAejM" target="_blank" rel="noopener noreferrer" className="dm" style={{ fontSize: 11, padding: "4px 12px", border: "1px solid rgba(212,168,83,0.5)", color: "var(--gold)", letterSpacing:0.5, textDecoration: "none" }}>📄 Read the SPL Paper →</a>
  </div>
  <blockquote className="cg" style={{ fontStyle: "italic", fontSize: 16, color: "var(--gold)", borderLeft: "2px solid rgba(212,168,83,0.3)", paddingLeft: 16 }}>
    "Human-in-the-loop is structural. Transparency is the foundation."
  </blockquote>
</div>
            </Reveal>
            <Reveal delay={0.25}>
       <blockquote style={{ borderLeft: "2px solid var(--gold)", paddingLeft: 32 }}>
  <p className="cg" style={{ fontSize: "clamp(18px, 2vw, 24px)", fontStyle: "italic", lineHeight: 1.7, color: "var(--cream)", marginBottom: 24 }}>
    Leveraging cutting-edge AI, Dasein builds tools that democratize access to valuable, once-exclusive resources and services &mdash; unlocking opportunity and empowering the underserved.
  </p>
  <p className="cg" style={{ fontSize: "clamp(18px, 2vw, 24px)", fontStyle: "italic", lineHeight: 1.7, color: "var(--cream)", marginBottom: 24 }}>
    We exist to put capability in the hands of the people who&rsquo;ve been priced out of it. Every system we build is designed to lower a barrier, extend a pathway, or return power to the person who needs it &mdash; and to keep doing so at scale, reaching further with each deployment. This is technology built to serve human direction, not replace it: accountable, transparent, and aimed squarely at lifting communities that existing structures overlook.
  </p>
  <p className="cg" style={{ fontSize: "clamp(18px, 2vw, 24px)", fontStyle: "italic", lineHeight: 1.7, color: "var(--cream)", marginBottom: 24 }}>
    Built for the long game. Measured not by what it automates, but by who it reaches.
  </p>
</blockquote>
              <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  { n: "People First~", d: "Always." },
                  { n: "~No Barriers", d: "To brilliance." },
                  { n: "Real Trust~", d: "Not a feature." },
                  { n: "~Long Game", d: "Since Day One." }
                ].map(item => (
                  <div key={item.n} style={{ padding: "20px", background: "rgba(42,157,143,0.06)", borderTop: "1px solid rgba(42,157,143,0.2)" }}>
                    <div className="cg" style={{ fontSize: 17, color: "var(--cream)", fontWeight: 600 }}>{item.n}</div>
                    <div className="dm" style={{ fontSize: 13, color: "var(--muted)" }}>{item.d}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
{/* ═══ PRINCIPLES ═══ */}
<section id="principles" style={{ position: "relative", overflow: "hidden", padding: "120px 0" }}>
<div className="section-wrap">
<Reveal>
<div className="label">What Guides Us</div>
<div className="rule" />
<h2 className="cg" style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 300, color: "var(--cream)", marginBottom: 16 }}>The Principles</h2>
<p className="dm" style={{ fontSize: 15, color: "var(--muted)", maxWidth: 560, margin: "0 auto 64px", lineHeight: 1.8, textAlign: "center" }}>
The commitments every system we build operates inside &mdash; the rubric the work is measured against.
</p>
</Reveal>
<div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }} className="grid-2">
{[
{ slug: "human-leadership", num: "01", title: "Human Leadership", tagline: "Every system begins with human intention.", punch: "People lead. Technology follows.", preview: "Direction, judgment, and values come from people, not from the model. AI operates as support and an extension of human capability, never a replacement for the person holding the decision." },
{ slug: "shared-uplift", num: "02", title: "Shared Uplift", tagline: "Intelligence exists to raise the quality of life for every community.", punch: "Growth for all, with every group rising together.", preview: "A tool that concentrates advantage in the hands that already hold it isn't progress. We build for the opposite: systems where the benefit lands wide and people gain ground together." },
{ slug: "care-for-people-and-data", num: "03", title: "Care for People & Data", tagline: "Information is treated with respect.", punch: "", preview: "Data about a person is a piece of that person, and we handle it that way. Collection stays minimal, protection stays constant, and control stays with the individual it belongs to." },
{ slug: "responsible-intelligence", num: "04", title: "Responsible Intelligence for the Future", tagline: "AI should move humanity forward with stability and purpose.", punch: "Built for the long game, since day one.", preview: "Capability without reliability is a liability. We build systems that behave predictably and hold up under real-world conditions, including the low-resource, high-pressure cases where most systems quietly fail." },
{ slug: "equity-and-fairness", num: "05", title: "Equity & Fairness", tagline: "Designed with attention to every community, not just the default one.", punch: "", preview: "Systems trained on a narrow slice of the world behave well for that slice and poorly for everyone else. We design against that, measuring behavior across conditions, environments, and people." },
{ slug: "transparency", num: "06", title: "Transparency", tagline: "When a system acts, people should see how, and know when AI is involved.", punch: "", preview: "When intelligence operates in the dark, trust becomes a leap of faith. We don't ask for that leap. Every person can see when AI is present, what it does, and the boundaries that constrain it." },
{ slug: "accountability", num: "07", title: "Accountability", tagline: "We hold responsibility for what our systems do.", punch: "", preview: "A system that no one answers for is designed to escape consequences. We reject that. Every layer of our process carries accountability, with clear response plans when something needs correcting." },
{ slug: "open-access", num: "08", title: "Open Access & Public Benefit", tagline: "Technology should elevate people and bridge gaps, not widen them.", punch: "No barriers to brilliance.", preview: "Talent is everywhere; the structures that recognize it are not. Faced with a closed advantage or a shared one, we build the shared one. Every obstacle we take down opens a path for someone already good enough." },
{ slug: "global-ethics", num: "09", title: "Global Ethics & International Respect", tagline: "Systems must serve humanity across borders, languages, and conditions.", punch: "", preview: "The people we serve reach across cultures and continents, and a tool that only works for one context isn't finished. We honor diverse values and build for the languages, infrastructures, and norms real deployment meets." },
{ slug: "people-first", num: "10", title: "People First", tagline: "Always.", punch: "People first. Always.", preview: "Before the architecture, before the model, before the deployment, the person. Every decision runs through one filter first: does this serve the people on the other end of it? When that competes with speed or cost, the person wins." }
].map((p, i) => {
const isOpen = openPrinciple === i;
return (
<Reveal key={p.slug} delay={0.05 * (i % 2)}>
<div
onClick={() => setOpenPrinciple(isOpen ? null : i)}
className="card-dark"
style={{ padding: "32px 28px", height: "100%", cursor: "pointer" }}
>
<div className="cg" style={{ fontSize: 36, color: "rgba(42,157,143,0.18)", fontWeight: 700, lineHeight: 1, marginBottom: 12 }}>{p.num}</div>
<h3 className="cg" style={{ fontSize: 22, fontWeight: 400, color: "var(--cream)", marginBottom: 10 }}>{p.title}</h3>
<p className="cg" style={{ fontSize: 16, fontStyle: "italic", color: "var(--sage)", lineHeight: 1.5, marginBottom: p.punch ? 12 : 0 }}>{p.tagline}</p>
{p.punch && (
<p className="dm" style={{ fontSize: 13, letterSpacing: 0.5, color: "var(--gold)", marginBottom: 0 }}>{p.punch}</p>
)}
<div style={{ maxHeight: isOpen ? 240 : 0, overflow: "hidden", transition: "max-height 0.45s cubic-bezier(.16,1,.3,1)" }}>
<p className="dm" style={{ fontSize: 14, lineHeight: 1.8, color: "var(--muted)", marginTop: 20 }}>{p.preview}&hellip;</p>
<a href={`/principles/${p.slug}`} onClick={(e) => e.stopPropagation()} className="dm" style={{ display: "inline-block", fontSize: 12, letterSpacing: 1, color: "var(--bright)", marginTop: 12, textDecoration: "none" }}>Read more &rarr;</a>
</div>
</div>
</Reveal>
);
})}
</div>
</div>
</section>
      {/* ═══ SYSTEMS ═══ */}
      <section id="systems" style={{ background: "linear-gradient(180deg, rgba(4,42,22,0.96) 100%, rgba(8,46,34,0.93) 40%, rgba(6,58,30,0.95) 100%", position: "relative", overflow: "hidden", padding: "120px 0" }}>
        <HexPattern />
        <div className="section-wrap" style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <div className="label">What We Build</div>
            <div className="rule" />
            <h2 className="cg" style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 300, color: "var(--cream)", marginBottom: 16 }}>Systems That Compound</h2>
            <p className="dm" style={{ fontSize: 15, color: "var(--muted)", maxWidth: 560, marginBottom: 64, lineHeight: 1.8 }}>
              Every tool we build removes a barrier, extends a pathway, or hands power back to the person who needs it.
            </p>
          </Reveal>
  
          {/* SPL Feature Card */}
          <Reveal delay={0.1}>
            <div style={{
              background: "linear-gradient(135deg, rgba(11, 73, 29, 0.66) 8%, rgba(11, 27, 60, 0.8) 92%)",
              border: "1px solid rgba(28, 101, 189, 0.38)",
              padding: "56px 48px", marginBottom: 24, position: "relative", overflow: "hidden"
            }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: 300, height: 300, background: "radial-gradient(circle at center, rgba(42,157,143,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "start" }} className="grid-2">
                <div>
                  <div className="dm label" style={{ marginBottom: 16 }}>Flagship Framework</div>
                  <h3 className="cg" style={{ fontSize: "clamp(28px, 3vw, 44px)", fontWeight: 400, color: "var(--cream)", marginBottom: 20 }}>
                    Subsumption Pattern Learning
                  </h3>
                  <p className="dm" style={{ fontSize: 15, lineHeight: 1.9, color: "var(--muted)", marginBottom: 32, maxWidth: 520 }}>
                    A self-distilling swarm intelligence — inspired by termite colonies and honeybee waggle dances — that converts expensive LLM deliberation into rapid, cheap reflexes. Gets smarter and cheaper with every deployment. Documented 10–50x cost reduction.
                  </p>
                  <div style={{ display: "flex", gap: 40, flexWrap: "wrap", marginBottom: 32 }}>
                    {[["13.9x", "Cost Reduction"], ["5.5%", "Reach Layer 2"], ["<5-15ms", "Layer 1 Response"]].map(([n, l]) => (
                      <div key={l}>
                        <div className="cg" style={{ fontSize: 36, fontWeight: 600, color: "var(--sage)" , marginBottom: 10}}>{n}</div>
                        <div className="dm" style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--muted)" }}>{l}</div>
                      </div>
                    ))}
                  </div>
                  <a href="#contact" className="btn-primary"><span>Deploy SPL</span></a>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="cg" style={{ fontSize: 120, color: "rgba(42,157,143,0.08)", fontWeight: 700, lineHeight: 1, userSelect: "none" }}>SPL</div>
                </div>
              </div>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="grid-3">
            {[
              { tag: "Coming Soon", title: "WeeksWorth", desc: "Enter any job title. Get a complete learning roadmap — modules, free resources, capstone project. No gatekeeping. No sign-up." },
              { tag: "In Development", title: "Couria", desc: "Coordinate across every timezone without the mental math. Couria knows each contact's hours, drafts your message, and releases it when it'll land right - so no one ever gets pinged at 3 AM." },
              { tag: "In Development", title: "eDrop", desc: "Audits how your software is built and surfaces the hidden waste — the energy-hungry patterns most teams never see. Lighter code, faster loads, a smaller carbon footprint at range and scale." }
            ].map((item, i) => (
              <Reveal key={i} delay={0.1 * (i + 1)}>
                <div className="card-dark" style={{ padding: "36px 28px", height: "100%" }}>
                  <div className="label" style={{ marginBottom: 16 }}>{item.tag}</div>
                  <h3 className="cg" style={{ fontSize: 22, fontWeight: 400, color: "var(--cream)", marginBottom: 16 }}>{item.title}</h3>
                  <p className="dm" style={{ fontSize: 14, lineHeight: 1.8, color: "var(--muted)" }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MANIFESTO BREAK ═══ */}
      <section style={{
        background: "linear-gradient(180deg, var(--forest) 0%, var(--teal) 50%, var(--mid) 100%)",
        padding: "100px 40px", textAlign: "center", position: "relative", overflow: "hidden"
      }}>
        <RootPattern />
        <Reveal>
          <div className="cg" style={{ fontSize: "clamp(22px, 3.5vw, 40px)", fontStyle: "italic", color: "var(--cream)", maxWidth: 800, margin: "0 auto", lineHeight: 1.6, fontWeight: 300 }}>
            "The colony that encodes its solutions into the environment<br />
            <span className="gold">never pays the same discovery cost twice.</span>"
          </div>
          <div className="dm" style={{ fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: "var(--muted)", marginTop: 32 }}>
            The principle behind SPL — and behind everything we build
          </div>
        </Reveal>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" style={{ background: "transparent", padding: "120px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 30% 70%, rgba(212,168,83,0.04) 0%, transparent 50%)", pointerEvents: "none" }} />
        <div className="section-wrap">
          <Reveal>
            <div className="label">How We Work With You</div>
            <div className="rule" />
            <h2 className="cg" style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 300, color: "var(--cream)", marginBottom: 64 }}>Services</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }} className="grid-2">
            {[
{ num: "01", title: "Human-Aligned System Design", desc: "Intelligence that follows human direction by design, not by patch. We help teams build systems that stay accountable to the person directing them, behave consistently under pressure, and earn trust because it was built into the architecture from the start — shaping where the human stays in the loop, where the system defers, and how accountability is enforced rather than promised." },
{ num: "02", title: "Community-Focused Digital Tools", desc: "Tools built for the people existing structures overlook. We support initiatives serving social programs, public needs, and learning ecosystems — meeting an organization where it actually is: lean, resource-conscious, and answerable to the people it serves. We design tools that lower a barrier, extend a pathway, or return capability to the people who need it, and keep doing so as the work scales." },
{ num: "03", title: "Learning & Skill Growth Pathways", desc: "Meet people where they are. Carry them further. We build learning systems that hold the whole route — from \"doesn't know yet\" to \"does\" — structured around where a person actually begins. This is the principle behind tools like WeeksWorth: free for the learners and communities who use it, paced to the person, meeting the early steps that usually go unsupported and staying with the learner the whole way up." },
{ num: "04", title: "Ethical Review & Alignment", desc: "Commitment-driven evaluation for teams shaping responsible AI. We provide structured review for teams deploying AI into the real world — surfacing where a system's behavior drifts from its stated commitments, where transparency breaks down, and where accountability needs enforcing before deployment, not after harm. The standard is simple: human-in-the-loop is structural, not optional." },
            ].map((s, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <div style={{
                  padding: "48px 40px", background: "rgba(10,26,24,0.6)",
                  borderBottom: "1px solid rgba(42,157,143,0.1)",
                  borderRight: i % 2 === 0 ? "1px solid rgba(42,157,143,0.1)" : "none",
                  transition: "background 0.4s"
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(26,74,64,0.4)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(10,26,24,0.6)"}
                >
                  <div className="cg" style={{ fontSize: 48, color: "rgba(42,157,143,0.15)", fontWeight: 700, lineHeight: 1, marginBottom: 16 }}>{s.num}</div>
                  <h3 className="cg" style={{ fontSize: 22, fontWeight: 400, color: "var(--cream)", marginBottom: 16 }}>{s.title}</h3>
                  <p className="dm" style={{ fontSize: 14, lineHeight: 1.8, color: "var(--muted)" }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TEAM ═══ */}
      <section id="team" style={{ background: "var(--deep)", padding: "120px 0", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 60% 40%, rgba(42,157,143,0.06) 0%, transparent 55%)", pointerEvents: "none" }} />
        <div className="section-wrap">
          <Reveal>
            <div className="label">Co-Founder</div>
            <div className="rule" />
            <h2 className="cg" style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 300, color: "var(--cream)", marginBottom: 64 }}>
              Built by people<br /><em className="gold">who believe it.</em>
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="team-grid">
            {[
              {
                initial: "N", name: "Nickolas Smith", role: "Co-Founder & COO",
                bio: "Theorist and systems architect. For fifteen years, Smith has built interconnected frameworks from first principles — deriving the structural logic beneath intelligence from biology, cognition, and physics, without institutional scaffolding. In 2020, working factory shifts, he documented the grounding problem, the limbic gap, and the architecture of latent concept-space in AI — years before the field's leading labs converged, independently, on the same questions. The convergence is the credential.", bio2: "He is the creator of CRDL, a falsifiable framework for detecting AI failure modes, built to measure the moment coherence begins to masquerade as authority. Where Dasein's engine learns when to stop thinking, his work maps the layer one cross-section over: grounding, consequence, and the conditions that keep compounded intelligence honest as it scales. Published continuously at Synthosphere, his research treats a non-institutional path not as a disadvantage, but as a method — perception reconstructed from the ground up, without shortcuts.",
                tags: ["synthosphere Research", "CRDL Framework", "Symbolic Compression", "Rate Variable Dependency"],
                quote: "The credential is a proxy. The work is the proof."
              }
            ].map((p, i) => (
              <Reveal key={i} delay={0.15 * i}>
                <div style={{ background: "rgba(15,36,32,0.5)", border: "1px solid rgba(42,157,143,0.15)", padding: "48px 40px", height: "100%" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32 }}>
                    <div style={{
                      width: 60, height: 60, borderRadius: "50%",
                      background: "linear-gradient(135deg, var(--teal), var(--bright))",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      border: "1px solid rgba(212,168,83,0.3)"
                    }}>
                      <span className="cg" style={{ fontSize: 24, fontWeight: 600, color: "var(--cream)" }}>{p.initial}</span>
                    </div>
                    <div>
                      <div className="cg" style={{ fontSize: 22, color: "var(--cream)" }}>{p.name}</div>
                      <div className="dm" style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--sage)" }}>{p.role}</div>
                    </div>
                  </div>
                  <p className="dm" style={{ fontSize: 14, lineHeight: 1.9, color: "var(--muted)", marginBottom: 28 }}>{p.bio}</p>
                  <p className="dm" style={{ fontSize: 14, lineHeight: 1.9, color: "var(--muted)", marginBottom: 28 }}>{p.bio2}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
                    {p.tags.map(t => (
                      <span key={t} className="dm" style={{ fontSize: 11, padding: "4px 12px", border: "1px solid rgba(42,157,143,0.25)", color: "var(--sage)", letterSpacing: 0.5 }}>{t}</span>
                    ))}
                  </div>
                  <blockquote className="cg" style={{ fontStyle: "italic", fontSize: 16, color: "var(--gold)", borderLeft: "2px solid rgba(212,168,83,0.3)", paddingLeft: 16 }}>
                    "{p.quote}"
                  </blockquote>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GOLD STRIP ═══ */}
      <section style={{ background: "linear-gradient(180deg, rgba(12,31,42,0.95) 0%, rgba(94,67,38,0.25) 50%, rgba(12,31,42,0.95) 100%)", padding: "100px 40px" }}>
        <Reveal>
          <p className="cg" style={{ fontSize: "clamp(18px, 2.5vw, 28px)", color: "var(--cream)", maxWidth: 860, margin: "0 auto", textAlign: "center", lineHeight: 1.6, fontWeight: 400 }}>
            "At Dasein, this means forging a transformative bridge between untapped brilliance and established expertise: a boundless nexus where visionaries, regardless of resources, converge with seasoned professionals and companies. Committed to innovation, sustainability, and inclusion, we envision a world where the pursuit of groundbreaking ideas transcends barriers, by connecting people through a complex and tailored network found in the heart of Dasein. Rooted in the belief that genius knows no economic boundary, we work to cultivate a landscape where the relentless drive for progress lightens the burdens of labor and moves humanity toward a more harmonious existence; drawing inspiration from the extraordinary minds that can be found emerging from the most unexpected corners of the world."
          </p>
        </Reveal>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" style={{ background: "transparent", padding: "120px 0" }}>
        <div className="section-wrap">
          <Reveal>
            <div className="label">Get In Touch</div>
            <div className="rule" />
            <h2 className="cg" style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 300, color: "var(--cream)", marginBottom: 16 }}>
              Let's build something<br /><em className="sage">that matters.</em>
            </h2>
            <p className="dm" style={{ fontSize: 15, color: "var(--muted)", maxWidth: 500, marginBottom: 64, lineHeight: 1.8 }}>
              Ideal for civic teams, public institutions, social impact organizations, and responsible AI builders. We respond within 2 business days.
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 80 }} className="grid-2">
            <Reveal>
     {formSent ? (
  <div style={{ padding: "48px 0", textAlign: "center" }}>
    <div className="cg" style={{ fontSize: 28, color: "var(--sage)", marginBottom: 12 }}>Thank you.</div>
    <p className="dm" style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.8 }}>
      Your message reached us. We respond within 2 business days.
    </p>
  </div>
) : (
  <form
    action="https://formspree.io/f/maqzaqka"
    method="POST"
    onSubmit={async (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      await fetch("https://formspree.io/f/maqzaqka", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      setFormSent(true);
    }}
    style={{ display: "flex", flexDirection: "column", gap: 16 }}
  >
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <input name="name" placeholder="Name" required />
      <input type="email" name="email" placeholder="Email" required />
    </div>
    <select name="topic">
      <option value="">Topic</option>
      <option>General Inquiry</option>
      <option>SPL Deployment</option>
      <option>Partnership</option>
      <option>Ethics Review</option>
      <option>Learning Tools</option>
    </select>
    <textarea name="message" placeholder="Tell us about your project, timeline, and what success looks like..." rows={6} style={{ resize: "vertical" }} required />
    <div>
      <button type="submit" className="btn-primary"><span>Send Message</span></button>
    </div>
  </form>
)}
            </Reveal>
            <Reveal delay={0.2}>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { label: "General", email: "general@dasein.works" },
                  { label: "Founder", email: "Pamela@dasein.works" },
                  { label: "Co-Founder", email: "NickSmith@dasein.works" }
                ].map((c, i) => (
                  <div key={c.label} style={{ padding: "24px 0", borderBottom: "1px solid rgba(42,157,143,0.12)" }}>
                    <div className="label" style={{ marginBottom: 4 }}>{c.label}</div>
                    <div className="cg" style={{ fontSize: 18, color: "var(--cream)" }}>{c.email}</div>
                  </div>
                ))}
                <div style={{ marginTop: 40 }}>
                  <div className="label" style={{ marginBottom: 16 }}>Join the Waitlist</div>
                  <p className="dm" style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7, marginBottom: 20 }}>
                    Pilot invites, architecture briefs, and rollout checklists before public release.
                  </p>
                  <div style={{ display: "flex" }}>
                    <input placeholder="Your email" style={{ flex: 1 }} />
                    <button className="btn-primary" style={{ whiteSpace: "nowrap", padding: "14px 24px" }}><span>Notify Me</span></button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "var(--forest)", borderTop: "1px solid rgba(42,157,143,0.1)", padding: "48px 40px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <div className="cg" style={{ fontSize: 22 }}>Dasein<span className="gold" style={{ fontStyle: "italic" }}>Bridge</span></div>
          <div className="dm" style={{ fontSize: 12, color: "var(--muted)", letterSpacing: 1, textAlign: "center" }}>
            Making accountable automation standard for civic, public, and responsible builders.
          </div>
          <div className="dm" style={{ fontSize: 12, color: "var(--muted)" }}>© 2026 DaseinBridge</div>
        </div>
      </footer>
    </div>
  );
}
