export async function extractResumeData(resumeText) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_GROQ_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are a resume parser. Extract information from the resume and return ONLY valid JSON, no markdown, no backticks: {"name":"","title":"","email":"","location":"","github":"","linkedin":"","about":"","skills":[""],"projects":"","experience":"","education":""}'
        },
        { role: 'user', content: `Extract all information from this resume:\n\n${resumeText}` }
      ],
    }),
  });
  const d = await res.json();
  const raw = d.choices[0].message.content;
  return JSON.parse(raw.replace(/```json|```/g, '').trim());
}

export async function generatePortfolio(data) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_GROQ_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are FolioAI. Generate a professional portfolio. Return ONLY valid JSON, no markdown, no backticks: {"bio":"3-4 sentence professional bio","tagline":"one punchy line max 10 words","skills":["skill1","skill2"],"projects":[{"name":"","description":"","tech":[""]}],"experience":[{"role":"","company":"","duration":"","description":""}],"education":[{"degree":"","institution":"","year":""}],"strengths":["","",""]}'
        },
        {
          role: 'user',
          content: `Generate portfolio for:
Name: ${data.name}
Title: ${data.title}
Email: ${data.email}
Location: ${data.location}
GitHub: ${data.github}
LinkedIn: ${data.linkedin}
Skills: ${Array.isArray(data.skills) ? data.skills.join(', ') : data.skills}
About: ${data.about}
Projects: ${data.projects}
Experience: ${data.experience}
Education: ${data.education}`
        }
      ],
    }),
  });
  const d = await res.json();
  const raw = d.choices[0].message.content;
  return JSON.parse(raw.replace(/```json|```/g, '').trim());
}
