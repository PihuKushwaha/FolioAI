import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { Sparkles, Download, Share2, GitFork, Link as LinkIcon, Mail, MapPin, ExternalLink, ArrowLeft, RefreshCw, Globe } from 'lucide-react';

const THEMES = {
  dark: {
    bg: '#0a0a0a', card: '#111', border: '#1f1f1f', text: '#fafafa', muted: '#71717a',
    accent: '#6366f1', accentBg: 'rgba(99,102,241,0.15)', tag: 'rgba(99,102,241,0.2)', tagText: '#a5b4fc',
  },
  light: {
    bg: '#f8fafc', card: '#ffffff', border: '#e2e8f0', text: '#0f172a', muted: '#64748b',
    accent: '#6366f1', accentBg: 'rgba(99,102,241,0.08)', tag: '#e0e7ff', tagText: '#4338ca',
  },
  green: {
    bg: '#0a1a0a', card: '#0f1f0f', border: '#1a2f1a', text: '#ecfdf5', muted: '#6ee7b7',
    accent: '#10b981', accentBg: 'rgba(16,185,129,0.15)', tag: 'rgba(16,185,129,0.2)', tagText: '#6ee7b7',
  },
  rose: {
    bg: '#0f0a0a', card: '#1a0f0f', border: '#2f1a1a', text: '#fff1f2', muted: '#fda4af',
    accent: '#f43f5e', accentBg: 'rgba(244,63,94,0.15)', tag: 'rgba(244,63,94,0.2)', tagText: '#fda4af',
  },
  minimal: {
    bg: '#ffffff', card: '#fafafa', border: '#e5e7eb', text: '#111827', muted: '#9ca3af',
    accent: '#111827', accentBg: '#f3f4f6', tag: '#f3f4f6', tagText: '#374151',
  },
};

export default function Preview() {
  const location = useLocation();
  const navigate = useNavigate();
  const [theme, setTheme] = useState('dark');
  const [copied, setCopied] = useState(false);

  const portfolio = location.state?.portfolio;
  const form = location.state?.form;

  if (!portfolio) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <p style={{ color: '#71717a' }}>No portfolio found.</p>
        <Link to="/build" className="btn btn-primary">Build your portfolio</Link>
      </div>
    );
  }

  const t = THEMES[theme];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const html = generateHTML(portfolio, form, t);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${form?.name?.replace(/\s/g, '_') || 'portfolio'}.html`;
    a.click();
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      {/* Control bar */}
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #1f1f1f', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={() => navigate('/build')} className="btn btn-outline" style={{ padding: '8px 16px', fontSize: 13 }}>
            <ArrowLeft size={14} /> Edit
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, color: '#52525b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Theme:</span>
            {Object.keys(THEMES).map(th => (
              <button key={th} onClick={() => setTheme(th)}
                style={{ padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: '1px solid', textTransform: 'capitalize',
                  borderColor: theme === th ? '#6366f1' : '#2a2a2a', background: theme === th ? 'rgba(99,102,241,0.2)' : '#111', color: theme === th ? '#818cf8' : '#52525b' }}>
                {th}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={handleCopyLink} className="btn btn-outline" style={{ padding: '8px 16px', fontSize: 13 }}>
            <Share2 size={14} /> {copied ? 'Copied!' : 'Share'}
          </button>
          <button onClick={handleDownload} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: 13 }}>
            <Download size={14} /> Download HTML
          </button>
        </div>
      </div>

      {/* Portfolio */}
      <div style={{ background: t.bg, minHeight: '100vh', transition: 'all 0.3s' }}>
        {/* Hero section */}
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '80px 32px 60px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 280 }}>
              <div style={{ display: 'inline-block', background: t.accentBg, border: `1px solid ${t.accent}40`, borderRadius: 999, padding: '4px 14px', fontSize: 12, fontWeight: 600, color: t.accent, marginBottom: 20 }}>
                Available for work
              </div>
              <h1 style={{ fontFamily: 'Clash Display', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, color: t.text, lineHeight: 1.1, marginBottom: 12 }}>
                {form?.name || 'Your Name'}
              </h1>
              <p style={{ fontSize: 20, fontWeight: 500, color: t.accent, marginBottom: 20 }}>{form?.title || 'Developer'}</p>
              <p style={{ fontSize: 15, color: t.muted, lineHeight: 1.7, maxWidth: 500, marginBottom: 28 }}>{portfolio.bio}</p>
              <p style={{ fontSize: 14, color: t.muted, fontStyle: 'italic', marginBottom: 28, background: t.accentBg, padding: '10px 16px', borderRadius: 8, borderLeft: `3px solid ${t.accent}` }}>
                "{portfolio.tagline}"
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {form?.email && <a href={`mailto:${form.email}`} style={{ display: 'flex', alignItems: 'center', gap: 6, color: t.muted, fontSize: 14, textDecoration: 'none' }}><Mail size={15} />{form.email}</a>}
                {form?.location && <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: t.muted, fontSize: 14 }}><MapPin size={15} />{form.location}</span>}
                {form?.github && <a href={`https://${form.github}`} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, color: t.muted, fontSize: 14, textDecoration: 'none' }}><GitFork size={15} />GitHub</a>}
                {form?.linkedin && <a href={`https://${form.linkedin}`} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, color: t.muted, fontSize: 14, textDecoration: 'none' }}><Link size={15} />LinkedIn</a>}
              </div>
            </div>

            {/* Strengths card */}
            <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: '24px', minWidth: 220 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: t.muted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>Strengths</p>
              {portfolio.strengths?.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: t.accent, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: t.text, fontWeight: 500 }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div style={{ background: t.card, borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`, padding: '48px 32px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Clash Display', fontSize: 24, fontWeight: 700, color: t.text, marginBottom: 24 }}>Skills & Technologies</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {portfolio.skills?.map((s) => (
                <span key={s} style={{ background: t.tag, color: t.tagText, padding: '8px 18px', borderRadius: 999, fontSize: 14, fontWeight: 500 }}>{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Projects */}
        {portfolio.projects?.length > 0 && (
          <div style={{ maxWidth: 900, margin: '0 auto', padding: '64px 32px' }}>
            <h2 style={{ fontFamily: 'Clash Display', fontSize: 24, fontWeight: 700, color: t.text, marginBottom: 32 }}>Projects</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
              {portfolio.projects.map((p, i) => (
                <div key={i} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: '24px', transition: 'border-color 0.2s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <h3 style={{ fontFamily: 'Clash Display', fontSize: 18, fontWeight: 600, color: t.text }}>{p.name}</h3>
                    <ExternalLink size={16} style={{ color: t.muted, flexShrink: 0 }} />
                  </div>
                  <p style={{ fontSize: 14, color: t.muted, lineHeight: 1.6, marginBottom: 16 }}>{p.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {p.tech?.map((tech) => (
                      <span key={tech} style={{ background: t.accentBg, color: t.accent, padding: '3px 10px', borderRadius: 6, fontSize: 12, fontWeight: 500 }}>{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {portfolio.experience?.length > 0 && (
          <div style={{ background: t.card, borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`, padding: '64px 32px' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              <h2 style={{ fontFamily: 'Clash Display', fontSize: 24, fontWeight: 700, color: t.text, marginBottom: 32 }}>Experience</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {portfolio.experience.map((e, i) => (
                  <div key={i} style={{ display: 'flex', gap: 20, paddingBottom: 24, borderBottom: i < portfolio.experience.length - 1 ? `1px solid ${t.border}` : 'none' }}>
                    <div style={{ width: 44, height: 44, background: t.accentBg, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: t.accent }}>
                      <Globe size={20} />
                    </div>
                    <div>
                      <p style={{ fontFamily: 'Clash Display', fontSize: 17, fontWeight: 600, color: t.text, marginBottom: 2 }}>{e.role}</p>
                      <p style={{ fontSize: 14, color: t.accent, fontWeight: 500, marginBottom: 4 }}>{e.company} • {e.duration}</p>
                      <p style={{ fontSize: 14, color: t.muted, lineHeight: 1.6 }}>{e.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Education */}
        {portfolio.education?.length > 0 && (
          <div style={{ maxWidth: 900, margin: '0 auto', padding: '64px 32px' }}>
            <h2 style={{ fontFamily: 'Clash Display', fontSize: 24, fontWeight: 700, color: t.text, marginBottom: 32 }}>Education</h2>
            {portfolio.education.map((e, i) => (
              <div key={i} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 12, padding: '20px 24px', marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <p style={{ fontFamily: 'Clash Display', fontSize: 16, fontWeight: 600, color: t.text }}>{e.degree}</p>
                  <p style={{ fontSize: 14, color: t.muted }}>{e.institution}</p>
                </div>
                <span style={{ background: t.accentBg, color: t.accent, padding: '4px 12px', borderRadius: 999, fontSize: 13, fontWeight: 500 }}>{e.year}</span>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div style={{ borderTop: `1px solid ${t.border}`, padding: '32px', textAlign: 'center' }}>
          <p style={{ fontSize: 13, color: t.muted }}>Built with FolioAI • {form?.name}</p>
        </div>
      </div>
    </div>
  );
}

function generateHTML(portfolio, form, t) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${form?.name} — Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'DM Sans',sans-serif;background:${t.bg};color:${t.text};min-height:100vh}
h1,h2,h3{font-family:'Sora',sans-serif}
.container{max-width:900px;margin:0 auto;padding:0 32px}
.hero{padding:80px 32px 60px;max-width:900px;margin:0 auto}
.badge{display:inline-block;background:${t.accentBg};color:${t.accent};padding:4px 14px;border-radius:999px;font-size:12px;font-weight:600;margin-bottom:20px}
h1{font-size:clamp(2.5rem,5vw,4rem);font-weight:700;line-height:1.1;margin-bottom:12px}
.title{font-size:20px;font-weight:500;color:${t.accent};margin-bottom:20px}
.bio{font-size:15px;color:${t.muted};line-height:1.7;max-width:500px;margin-bottom:28px}
.tagline{font-size:14px;color:${t.muted};font-style:italic;background:${t.accentBg};padding:10px 16px;border-radius:8px;border-left:3px solid ${t.accent};margin-bottom:28px}
.links{display:flex;flex-wrap:wrap;gap:16px;margin-bottom:48px}
.links a{color:${t.muted};text-decoration:none;font-size:14px}
.section{padding:48px 32px;max-width:900px;margin:0 auto}
.section-alt{background:${t.card};border-top:1px solid ${t.border};border-bottom:1px solid ${t.border};padding:48px 32px}
h2{font-size:24px;font-weight:700;margin-bottom:24px}
.skills{display:flex;flex-wrap:wrap;gap:10px}
.skill{background:${t.tag};color:${t.tagText};padding:8px 18px;border-radius:999px;font-size:14px;font-weight:500}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px}
.card{background:${t.card};border:1px solid ${t.border};border-radius:16px;padding:24px}
.card h3{font-size:18px;font-weight:600;margin-bottom:8px}
.card p{font-size:14px;color:${t.muted};line-height:1.6;margin-bottom:12px}
.tags{display:flex;flex-wrap:wrap;gap:6px}
.tag{background:${t.accentBg};color:${t.accent};padding:3px 10px;border-radius:6px;font-size:12px;font-weight:500}
footer{border-top:1px solid ${t.border};padding:32px;text-align:center;color:${t.muted};font-size:13px}
</style>
</head>
<body>
<div class="hero">
  <div class="badge">Available for work</div>
  <h1>${form?.name}</h1>
  <p class="title">${form?.title}</p>
  <p class="bio">${portfolio.bio}</p>
  <p class="tagline">"${portfolio.tagline}"</p>
  <div class="links">
    ${form?.email ? `<a href="mailto:${form.email}">📧 ${form.email}</a>` : ''}
    ${form?.github ? `<a href="https://${form.github}" target="_blank">💻 GitHub</a>` : ''}
    ${form?.linkedin ? `<a href="https://${form.linkedin}" target="_blank">💼 LinkedIn</a>` : ''}
    ${form?.location ? `<span>📍 ${form.location}</span>` : ''}
  </div>
</div>
<div class="section-alt">
  <div class="container">
    <h2>Skills</h2>
    <div class="skills">${portfolio.skills?.map(s => `<span class="skill">${s}</span>`).join('')}</div>
  </div>
</div>
${portfolio.projects?.length ? `<div class="section"><h2>Projects</h2><div class="grid">${portfolio.projects.map(p => `<div class="card"><h3>${p.name}</h3><p>${p.description}</p><div class="tags">${p.tech?.map(t => `<span class="tag">${t}</span>`).join('')}</div></div>`).join('')}</div></div>` : ''}
${portfolio.experience?.length ? `<div class="section-alt"><div class="container"><h2>Experience</h2>${portfolio.experience.map(e => `<div style="margin-bottom:24px"><h3>${e.role}</h3><p style="color:${t.accent};font-weight:500;margin:4px 0">${e.company} • ${e.duration}</p><p style="color:${t.muted};font-size:14px;line-height:1.6">${e.description}</p></div>`).join('')}</div></div>` : ''}
${portfolio.education?.length ? `<div class="section"><h2>Education</h2>${portfolio.education.map(e => `<div style="background:${t.card};border:1px solid ${t.border};border-radius:12px;padding:16px 24px;margin-bottom:12px;display:flex;justify-content:space-between;align-items:center"><div><p style="font-weight:600">${e.degree}</p><p style="color:${t.muted};font-size:14px">${e.institution}</p></div><span style="background:${t.accentBg};color:${t.accent};padding:4px 12px;border-radius:999px;font-size:13px">${e.year}</span></div>`).join('')}</div>` : ''}
<footer>Built with FolioAI • ${form?.name}</footer>
</body></html>`;
}
