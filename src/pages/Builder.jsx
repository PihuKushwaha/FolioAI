import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, User, Code2, Briefcase, GraduationCap, Upload, Loader, ArrowRight, ArrowLeft, Plus, X, GitFork, Link as LinkIcon, FileText, Wand2 } from 'lucide-react';
import { generatePortfolio, extractResumeData } from '../lib/ai.js';

const STEPS = [
  { id: 1, label: 'Basics', icon: <User size={16} /> },
  { id: 2, label: 'Skills', icon: <Code2 size={16} /> },
  { id: 3, label: 'Projects', icon: <Briefcase size={16} /> },
  { id: 4, label: 'Experience', icon: <Briefcase size={16} /> },
  { id: 5, label: 'Education', icon: <GraduationCap size={16} /> },
  { id: 6, label: 'Generate', icon: <Sparkles size={16} /> },
];

export default function Builder() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [autoFilling, setAutoFilling] = useState(false);
  const [resumeText, setResumeText] = useState('');
  const [skill, setSkill] = useState('');
  const [inputMode, setInputMode] = useState('upload');
  const fileRef = useRef();

  const [form, setForm] = useState({
    name: '', title: '', email: '', location: '', github: '', linkedin: '', website: '',
    about: '', skills: [], experience: '', education: '', projects: '',
  });

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const addSkill = () => {
    if (skill.trim() && !form.skills.includes(skill.trim())) {
      set('skills', [...form.skills, skill.trim()]);
      setSkill('');
    }
  };
  const removeSkill = (s) => set('skills', form.skills.filter(x => x !== s));

  const handleFileUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setResumeText(e.target.result?.substring(0, 3000) || '');
    reader.readAsText(file);
  };

  const handleAutoFill = async () => {
    if (!resumeText.trim()) { alert('Please upload a file or paste your resume text first!'); return; }
    setAutoFilling(true);
    try {
      const extracted = await extractResumeData(resumeText);
      setForm({
        name: extracted.name || '',
        title: extracted.title || '',
        email: extracted.email || '',
        location: extracted.location || '',
        github: extracted.github || '',
        linkedin: extracted.linkedin || '',
        website: extracted.website || '',
        about: extracted.about || '',
        skills: Array.isArray(extracted.skills) ? extracted.skills : [],
        experience: extracted.experience || '',
        education: extracted.education || '',
        projects: extracted.projects || '',
      });
    } catch (e) { alert('Could not extract. Please fill manually.'); }
    setAutoFilling(false);
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generatePortfolio({ ...form });
      navigate('/preview', { state: { portfolio: result, form } });
    } catch (e) { alert('Something went wrong. Please try again.'); }
    setLoading(false);
  };

  const inputStyle = { marginBottom: 16 };
  const rowStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', position: 'relative' }}>
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px', zIndex: 0 }} />

      <nav style={{ position: 'relative', zIndex: 10, padding: '20px 48px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #6366f1, #a855f7)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Sparkles size={16} color="white" />
        </div>
        <span style={{ fontFamily: 'Clash Display', fontWeight: 700, fontSize: 18, color: 'white' }}>FolioAI</span>
        <span style={{ color: '#3f3f46', margin: '0 8px' }}>/</span>
        <span style={{ color: '#71717a', fontSize: 14 }}>Portfolio Builder</span>
      </nav>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 720, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 48, overflowX: 'auto', paddingBottom: 4 }}>
          {STEPS.map((s) => (
            <div key={s.id} onClick={() => s.id < step && setStep(s.id)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8, border: '1px solid',
                borderColor: step === s.id ? '#6366f1' : s.id < step ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.06)',
                background: step === s.id ? 'rgba(99,102,241,0.15)' : 'transparent',
                color: step === s.id ? '#818cf8' : s.id < step ? '#6366f1' : '#52525b',
                fontSize: 13, fontWeight: 500, cursor: s.id < step ? 'pointer' : 'default', whiteSpace: 'nowrap', transition: 'all 0.2s',
              }}>
              {s.icon} {s.label} {s.id < step && <span style={{ fontSize: 10 }}>✓</span>}
            </div>
          ))}
        </div>

        {/* Step 1 - Basics */}
        {step === 1 && (
          <div className="fade-up">
            <h2 style={{ fontFamily: 'Clash Display', fontSize: 28, fontWeight: 700, color: 'white', marginBottom: 8 }}>Basic Information</h2>
            <p style={{ color: '#71717a', marginBottom: 32, fontSize: 14 }}>Upload or paste your resume — AI will fill everything automatically!</p>

            {/* Toggle */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <button onClick={() => setInputMode('upload')}
                style={{ padding: '8px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: '1px solid',
                  background: inputMode === 'upload' ? 'rgba(99,102,241,0.2)' : 'transparent',
                  color: inputMode === 'upload' ? '#818cf8' : '#52525b',
                  borderColor: inputMode === 'upload' ? '#6366f1' : '#2a2a2a' }}>
                <Upload size={14} style={{ display: 'inline', marginRight: 6 }} /> Upload File
              </button>
              <button onClick={() => setInputMode('paste')}
                style={{ padding: '8px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: '1px solid',
                  background: inputMode === 'paste' ? 'rgba(99,102,241,0.2)' : 'transparent',
                  color: inputMode === 'paste' ? '#818cf8' : '#52525b',
                  borderColor: inputMode === 'paste' ? '#6366f1' : '#2a2a2a' }}>
                <FileText size={14} style={{ display: 'inline', marginRight: 6 }} /> Paste Text
              </button>
            </div>

            {/* Upload mode */}
            {inputMode === 'upload' && (
              <div onClick={() => fileRef.current?.click()}
                style={{ border: '1px dashed rgba(99,102,241,0.4)', borderRadius: 12, padding: '28px', textAlign: 'center', marginBottom: 16, cursor: 'pointer', background: 'rgba(99,102,241,0.05)' }}>
                <Upload size={28} style={{ color: '#6366f1', margin: '0 auto 10px' }} />
                <p style={{ fontSize: 14, fontWeight: 500, color: 'white', marginBottom: 4 }}>Click to upload resume</p>
                <p style={{ fontSize: 12, color: '#52525b' }}>PDF, TXT, DOC supported</p>
                <input ref={fileRef} type="file" accept=".pdf,.txt,.doc,.docx" style={{ display: 'none' }} onChange={e => handleFileUpload(e.target.files[0])} />
                {resumeText && <p style={{ marginTop: 10, fontSize: 13, color: '#6366f1', fontWeight: 600 }}>File loaded! Click Auto-fill below.</p>}
              </div>
            )}

            {/* Paste mode */}
            {inputMode === 'paste' && (
              <div style={{ marginBottom: 16 }}>
                <textarea rows={6} placeholder="Paste your full resume text here..." value={resumeText} onChange={e => setResumeText(e.target.value)}
                  style={{ marginBottom: 0 }} />
              </div>
            )}

            {/* Auto-fill button */}
            <button onClick={handleAutoFill} disabled={autoFilling || !resumeText.trim()}
              style={{ width: '100%', padding: '14px', borderRadius: 10, background: 'linear-gradient(135deg, #6366f1, #a855f7)', border: 'none', color: 'white', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 24, opacity: (!resumeText.trim()) ? 0.4 : 1 }}>
              {autoFilling ? <><Loader size={18} className="spin" /> Extracting your info...</> : <><Wand2 size={18} /> Auto-fill all fields from resume</>}
            </button>

            {form.name && (
              <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 10, padding: '12px 16px', marginBottom: 20, fontSize: 13, color: '#6ee7b7' }}>
                Fields filled! Review below and edit if needed.
              </div>
            )}

            <div style={{ borderTop: '1px solid #1f1f1f', paddingTop: 24, marginBottom: 8 }}>
              <p style={{ fontSize: 13, color: '#52525b', marginBottom: 16 }}>Or fill manually:</p>
            </div>

            <div style={rowStyle}>
              <div><label>Full Name *</label><input placeholder="John Doe" value={form.name} onChange={e => set('name', e.target.value)} /></div>
              <div><label>Professional Title *</label><input placeholder="Full Stack Developer" value={form.title} onChange={e => set('title', e.target.value)} /></div>
            </div>
            <div style={rowStyle}>
              <div><label>Email</label><input placeholder="john@example.com" value={form.email} onChange={e => set('email', e.target.value)} /></div>
              <div><label>Location</label><input placeholder="Mumbai, India" value={form.location} onChange={e => set('location', e.target.value)} /></div>
            </div>
            <div style={rowStyle}>
              <div><label>GitHub URL</label><input placeholder="github.com/username" value={form.github} onChange={e => set('github', e.target.value)} /></div>
              <div><label>LinkedIn URL</label><input placeholder="linkedin.com/in/username" value={form.linkedin} onChange={e => set('linkedin', e.target.value)} /></div>
            </div>
            <div style={inputStyle}>
              <label>About yourself</label>
              <textarea rows={4} placeholder="I'm a developer passionate about building..." value={form.about} onChange={e => set('about', e.target.value)} />
            </div>
          </div>
        )}

        {/* Step 2 - Skills */}
        {step === 2 && (
          <div className="fade-up">
            <h2 style={{ fontFamily: 'Clash Display', fontSize: 28, fontWeight: 700, color: 'white', marginBottom: 8 }}>Skills & Technologies</h2>
            <p style={{ color: '#71717a', marginBottom: 32, fontSize: 14 }}>
              {form.skills.length > 0 ? `${form.skills.length} skills auto-filled! Add more or remove any.` : 'Add your technical and soft skills.'}
            </p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <input placeholder="e.g. React, Python, Figma..." value={skill} onChange={e => setSkill(e.target.value)} onKeyDown={e => e.key === 'Enter' && addSkill()} style={{ flex: 1, marginBottom: 0 }} />
              <button onClick={addSkill} className="btn btn-primary" style={{ padding: '12px 20px', flexShrink: 0 }}><Plus size={16} /></button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24, minHeight: 60 }}>
              {form.skills.map(s => (
                <span key={s} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#a5b4fc', padding: '6px 12px', borderRadius: 999, fontSize: 13, fontWeight: 500 }}>
                  {s}<button onClick={() => removeSkill(s)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1', padding: 0, display: 'flex' }}><X size={12} /></button>
                </span>
              ))}
              {!form.skills.length && <p style={{ color: '#3f3f46', fontSize: 13, padding: '8px 0' }}>No skills added yet.</p>}
            </div>
            <div style={{ background: '#111', border: '1px solid #1f1f1f', borderRadius: 10, padding: '16px' }}>
              <p style={{ fontSize: 12, color: '#52525b', marginBottom: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quick add</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['React', 'Node.js', 'Python', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Git', 'SQL', 'MongoDB', 'AWS', 'Docker', 'Figma', 'Flutter', 'Java', 'C++'].map(s => (
                  <button key={s} onClick={() => { if (!form.skills.includes(s)) set('skills', [...form.skills, s]); }}
                    style={{ background: form.skills.includes(s) ? 'rgba(99,102,241,0.2)' : '#1a1a1a', border: `1px solid ${form.skills.includes(s) ? 'rgba(99,102,241,0.4)' : '#2a2a2a'}`, color: form.skills.includes(s) ? '#818cf8' : '#71717a', padding: '5px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontWeight: 500 }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3 - Projects */}
        {step === 3 && (
          <div className="fade-up">
            <h2 style={{ fontFamily: 'Clash Display', fontSize: 28, fontWeight: 700, color: 'white', marginBottom: 8 }}>Projects</h2>
            <p style={{ color: '#71717a', marginBottom: 32, fontSize: 14 }}>
              {form.projects ? 'Auto-filled from resume! Edit if needed.' : 'Describe your projects — AI will make them impressive.'}
            </p>
            <div style={inputStyle}>
              <label>Your Projects</label>
              <textarea rows={8} placeholder={`Project 1: MyApp — A web app for fitness tracking. React + Node.js.\n\nProject 2: ChatBot — AI customer support bot. Python + GPT API.`}
                value={form.projects} onChange={e => set('projects', e.target.value)} />
            </div>
            <div style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 10, padding: '14px 16px' }}>
              <p style={{ fontSize: 13, color: '#818cf8' }}>Include project name, what it does, and tech used. AI will write compelling descriptions.</p>
            </div>
          </div>
        )}

        {/* Step 4 - Experience */}
        {step === 4 && (
          <div className="fade-up">
            <h2 style={{ fontFamily: 'Clash Display', fontSize: 28, fontWeight: 700, color: 'white', marginBottom: 8 }}>Work Experience</h2>
            <p style={{ color: '#71717a', marginBottom: 32, fontSize: 14 }}>
              {form.experience ? 'Auto-filled from resume! Edit if needed.' : 'Add your work history — internships, jobs, freelance.'}
            </p>
            <div style={inputStyle}>
              <label>Experience</label>
              <textarea rows={8} placeholder={`Software Engineer Intern at Google (June 2024 - Aug 2024)\n- Built analytics dashboard\n- Used React and Python\n\nNo experience? Write "Fresher" or "Student"`}
                value={form.experience} onChange={e => set('experience', e.target.value)} />
            </div>
          </div>
        )}

        {/* Step 5 - Education */}
        {step === 5 && (
          <div className="fade-up">
            <h2 style={{ fontFamily: 'Clash Display', fontSize: 28, fontWeight: 700, color: 'white', marginBottom: 8 }}>Education</h2>
            <p style={{ color: '#71717a', marginBottom: 32, fontSize: 14 }}>
              {form.education ? 'Auto-filled from resume! Edit if needed.' : 'Your academic background.'}
            </p>
            <div style={inputStyle}>
              <label>Education details</label>
              <textarea rows={6} placeholder={`B.Tech Computer Science — IIT Delhi (2021-2025)\nCGPA: 8.5\n\n12th — Delhi Public School (2021)\nPercentage: 92%`}
                value={form.education} onChange={e => set('education', e.target.value)} />
            </div>
          </div>
        )}

        {/* Step 6 - Generate */}
        {step === 6 && (
          <div className="fade-up" style={{ textAlign: 'center' }}>
            <div style={{ width: 80, height: 80, background: 'linear-gradient(135deg, #6366f1, #a855f7)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <Sparkles size={36} color="white" />
            </div>
            <h2 style={{ fontFamily: 'Clash Display', fontSize: 32, fontWeight: 700, color: 'white', marginBottom: 12 }}>Ready to generate!</h2>
            <p style={{ color: '#71717a', marginBottom: 40, fontSize: 15, maxWidth: 400, margin: '0 auto 40px' }}>
              FolioAI will now create your professional portfolio.
            </p>
            <div className="card" style={{ textAlign: 'left', marginBottom: 32, borderColor: 'rgba(255,255,255,0.06)' }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>Your summary</p>
              {[
                { label: 'Name', value: form.name || 'Not set' },
                { label: 'Title', value: form.title || 'Not set' },
                { label: 'Skills', value: form.skills.length ? `${form.skills.length} skills` : 'None' },
                { label: 'Projects', value: form.projects ? 'Added' : 'Not added' },
                { label: 'Experience', value: form.experience ? 'Added' : 'Not added' },
                { label: 'Education', value: form.education ? 'Added' : 'Not added' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1f1f1f' }}>
                  <span style={{ fontSize: 13, color: '#71717a' }}>{label}</span>
                  <span style={{ fontSize: 13, color: 'white', fontWeight: 500 }}>{value}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-primary" style={{ fontSize: 16, padding: '16px 48px', width: '100%', justifyContent: 'center' }}
              onClick={handleGenerate} disabled={loading || !form.name || !form.title}>
              {loading ? <><Loader size={18} className="spin" /> Generating...</> : <><Sparkles size={18} /> Generate my portfolio</>}
            </button>
            {(!form.name || !form.title) && <p style={{ marginTop: 12, fontSize: 13, color: '#ef4444' }}>Please go back and fill in your name and title.</p>}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40 }}>
          <button onClick={() => setStep(s => s - 1)} disabled={step === 1} className="btn btn-outline" style={{ opacity: step === 1 ? 0.3 : 1 }}>
            <ArrowLeft size={16} /> Back
          </button>
          {step < 6 && (
            <button onClick={() => setStep(s => s + 1)} className="btn btn-primary">
              Next <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
