import { Link } from 'react-router-dom';
import { Sparkles, Code2, Zap, Globe, ArrowRight, GitFork, ExternalLink, FileText, Star } from 'lucide-react';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', overflow: 'hidden', position: 'relative' }}>
      {/* Animated grid background */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.07) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)'
      }} />

      {/* Glowing orbs */}
      <div style={{ position: 'fixed', top: '10%', left: '10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)', borderRadius: '50%', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '10%', right: '10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(168,85,247,0.1), transparent 70%)', borderRadius: '50%', zIndex: 0, pointerEvents: 'none' }} />

      {/* Nav */}
      <nav style={{ position: 'relative', zIndex: 10, padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #6366f1, #a855f7)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={18} color="white" />
          </div>
          <span style={{ fontFamily: 'Clash Display', fontWeight: 700, fontSize: 20, color: 'white' }}>FolioAI</span>
          <span style={{ background: 'rgba(99,102,241,0.2)', color: '#818cf8', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600 }}>BETA</span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <a href="#features" style={{ color: '#71717a', fontSize: 14, textDecoration: 'none', fontWeight: 500 }}>Features</a>
          <a href="#how" style={{ color: '#71717a', fontSize: 14, textDecoration: 'none', fontWeight: 500 }}>How it works</a>
          <Link to="/build" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: 13 }}>
            <Sparkles size={14} /> Build my portfolio
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 900, margin: '0 auto', padding: '100px 24px 80px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 999, padding: '6px 16px', marginBottom: 32, fontSize: 13, color: '#a5b4fc' }}>
          <Zap size={13} /> AI-powered portfolio builder — free, instant, beautiful
        </div>

        <h1 style={{ fontFamily: 'Clash Display', fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 700, lineHeight: 1.05, marginBottom: 24, color: 'white' }}>
          Your portfolio,<br />
          <span style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            built by AI.
          </span>
        </h1>

        <p style={{ fontSize: 18, color: '#71717a', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 48px', fontWeight: 400 }}>
          Upload your resume, add your details — FolioAI generates a stunning, professional portfolio in seconds. No design skills needed.
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/build" className="btn btn-primary" style={{ fontSize: 16, padding: '16px 36px' }}>
            <Sparkles size={18} /> Build my portfolio free
          </Link>
          <a href="#how" className="btn btn-outline" style={{ fontSize: 16, padding: '16px 36px' }}>
            See how it works <ArrowRight size={16} />
          </a>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 48, justifyContent: 'center', marginTop: 72, flexWrap: 'wrap' }}>
          {[
            { value: '30 sec', label: 'to generate' },
            { value: '100%', label: 'free forever' },
            { value: '5+', label: 'portfolio themes' },
            { value: 'AI', label: 'powered writing' },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'Clash Display', fontSize: 28, fontWeight: 700, color: 'white', marginBottom: 4 }}>{s.value}</p>
              <p style={{ fontSize: 13, color: '#52525b' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div id="features" style={{ position: 'relative', zIndex: 10, maxWidth: 1100, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p style={{ color: '#6366f1', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Features</p>
          <h2 style={{ fontFamily: 'Clash Display', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white', fontWeight: 700 }}>Everything you need</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {[
            { icon: <FileText size={24} />, title: 'Resume Parser', desc: 'Upload your PDF resume and AI extracts all your experience, skills and education automatically.' },
            { icon: <Sparkles size={24} />, title: 'AI Bio Writer', desc: 'FolioAI writes a compelling professional bio that sounds human, not robotic.' },
            { icon: <Code2 size={24} />, title: 'GitHub Integration', desc: 'Connect your GitHub to showcase your best projects with auto-generated descriptions.' },
            { icon: <Link size={24} />, title: 'LinkedIn Import', desc: 'Pull your work experience directly from your LinkedIn profile URL.' },
            { icon: <Globe size={24} />, title: 'Live Portfolio', desc: 'Get a shareable link to your portfolio instantly. No hosting setup needed.' },
            { icon: <Star size={24} />, title: 'Multiple Themes', desc: 'Choose from 5 stunning portfolio themes — dark, light, minimal, creative, and pro.' },
          ].map((f, i) => (
            <div key={f.title} className="card fade-up" style={{ animationDelay: `${i * 0.1}s`, borderColor: 'rgba(255,255,255,0.06)' }}>
              <div style={{ width: 48, height: 48, background: 'rgba(99,102,241,0.15)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#818cf8', marginBottom: 16 }}>
                {f.icon}
              </div>
              <p style={{ fontFamily: 'Clash Display', fontWeight: 600, fontSize: 17, color: 'white', marginBottom: 8 }}>{f.title}</p>
              <p style={{ fontSize: 14, color: '#71717a', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div id="how" style={{ position: 'relative', zIndex: 10, maxWidth: 800, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p style={{ color: '#6366f1', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Process</p>
          <h2 style={{ fontFamily: 'Clash Display', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white', fontWeight: 700 }}>3 steps, 30 seconds</h2>
        </div>
        {[
          { num: '01', title: 'Fill your details', desc: 'Enter your name, role, skills, and projects. Upload your resume PDF for auto-fill.' },
          { num: '02', title: 'AI generates everything', desc: 'FolioAI writes your bio, polishes your project descriptions, and structures your portfolio.' },
          { num: '03', title: 'Share your portfolio', desc: 'Get a live link instantly. Download as HTML or copy the link to share anywhere.' },
        ].map((s, i) => (
          <div key={s.num} style={{ display: 'flex', gap: 24, marginBottom: 40, alignItems: 'flex-start' }}>
            <div style={{ fontFamily: 'Clash Display', fontSize: 48, fontWeight: 700, background: 'linear-gradient(135deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1, flexShrink: 0, width: 80 }}>{s.num}</div>
            <div style={{ paddingTop: 8 }}>
              <p style={{ fontFamily: 'Clash Display', fontSize: 20, fontWeight: 600, color: 'white', marginBottom: 8 }}>{s.title}</p>
              <p style={{ fontSize: 15, color: '#71717a', lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          </div>
        ))}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Link to="/build" className="btn btn-primary" style={{ fontSize: 16, padding: '16px 48px' }}>
            <Sparkles size={18} /> Start building free
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ position: 'relative', zIndex: 10, borderTop: '1px solid rgba(255,255,255,0.05)', padding: '32px 48px', textAlign: 'center' }}>
        <p style={{ color: '#3f3f46', fontSize: 13 }}>Built with AI • FolioAI 2026 • Free forever</p>
      </footer>
    </div>
  );
}
