// Single source of truth for all site content. Edit here.

export const profile = {
  name: 'Akshitha',
  fullName: 'Akshitha Kulal',
  role: 'AI/ML Engineer',
  tagline: 'Building intelligent systems that listen, see and understand.',
  summary:
    'Final-year AI/ML student with hands-on experience building a RAG chatbot, a sign-language recognition system and a deep-learning speech emotion recognizer. Skilled in Python, ML model integration and vector-based semantic search, with working knowledge of DevOps and cloud infrastructure.',
  location: 'Mangalore, India',
  email: 'akshithakulal297@gmail.com',
  github: 'https://github.com/AkshithaKulal',
  linkedin: 'https://linkedin.com/in/akshitha-kulal05/',
  photo: '/akshitha.jpg',
  resume: '/resume.pdf',
  chips: ['Python', 'RAG', 'Deep Learning', 'MediaPipe', 'FastAPI', 'React'],
}

export type Project = {
  id: string
  title: string
  tagline: string
  year: string
  genre: string
  description: string
  highlights: string[]
  stack: string[]
  live?: string
  repo?: string
  gradient: string
}

export const projects: Project[] = [
  {
    id: 'silenttalk',
    title: 'SilentTalk',
    tagline: 'Two-way communication through Indian Sign Language',
    year: '2025',
    genre: 'Computer Vision',
    description:
      'A team project at Canara Engineering College: a real-time communication system that recognizes Indian Sign Language (ISL) gestures from a webcam, speaks them in Tulu, and lets hearing users reply by voice.',
    highlights: [
      'MediaPipe hand landmarks feeding Random Forest and CNN-LSTM gesture classifiers',
      'Trained on ISL video data across 45 signs: greetings, people, pronouns, days and time',
      'English-to-Tulu translation with IndicTrans2 and Tulu speech output with gTTS',
      'Speech-to-text with OpenAI Whisper for the reverse direction',
      'Web frontend (HTML, CSS, JavaScript) backed by a Python server',
    ],
    stack: ['Python', 'MediaPipe', 'scikit-learn', 'TensorFlow/Keras', 'IndicTrans2', 'Whisper', 'gTTS', 'JavaScript', 'HTML', 'CSS'],
    repo: 'https://github.com/AkshithaKulal/silent-talk',
    gradient: 'from-[#b4532a] via-[#8a3b1e] to-[#3a1d12]',
  },
  {
    id: 'knowledge-bot',
    title: 'AI Knowledge Bot',
    tagline: 'Chat with your documents, grounded in sources',
    year: '2025',
    genre: 'Generative AI',
    description:
      'A full-stack Retrieval-Augmented Generation chatbot. Upload documents, ask questions in natural language and get answers grounded in your content.',
    highlights: [
      'Vector-based semantic search over document embeddings',
      'Real-time streaming responses',
      'Session-based conversation memory',
      'Local LLM served through Ollama',
    ],
    stack: ['React.js', 'FastAPI', 'Ollama', 'MongoDB Atlas', 'LangChain', 'Python'],
    repo: 'https://github.com/AkshithaKulal/Ai-chatbot',
    gradient: 'from-[#c9953c] via-[#8f6a22] to-[#3b2c10]',
  },
  {
    id: 'listenly',
    title: 'Listenly',
    tagline: 'Speech emotion recognition, in the browser',
    year: '2025',
    genre: 'Deep Learning',
    description:
      'A deep-learning system that classifies human emotion from speech into 8 categories: happy, sad, angry, calm, fear, disgust, surprise and neutral.',
    highlights: [
      'Compared CNN, LSTM and hybrid CNN-LSTM architectures on RAVDESS',
      'Audio pipeline with MFCC, Mel spectrogram and chroma features',
      'Rebuilt from a Streamlit prototype into a production web app',
      'Deployed on Vercel',
    ],
    stack: ['Python', 'TensorFlow/Keras', 'Librosa', 'scikit-learn', 'React + Vite', 'Matplotlib', 'Seaborn', 'Vercel'],
    live: 'https://listenly-ten.vercel.app/',
    repo: 'https://github.com/AkshithaKulal/listenly',
    gradient: 'from-[#6b7a4f] via-[#4a5636] to-[#222a17]',
  },
]

export const seasons = [
  {
    season: 'Season 3',
    title: 'Canara Engineering College, Mangalore',
    period: 'Dec 2023 — Present',
    detail: 'Bachelor of Engineering in AI/ML · CGPA 8.39',
    episodes: ['Built SilentTalk, AI Knowledge Bot and Listenly', 'Hackathons and national tech fests'],
  },
  {
    season: 'Season 2',
    title: 'Sri Mahaveera PU College, Moodbidri',
    period: 'March 2023',
    detail: 'Pre-University (PCMC) · 89.17% — Distinction',
    episodes: ['Physics, Chemistry, Maths, Computer Science'],
  },
  {
    season: 'Season 1',
    title: 'Govt Junior College, Siddakatte, Bantwal',
    period: 'July 2021',
    detail: 'SSLC · 92.32%',
    episodes: ['Where it all began'],
  },
]

export const skillGenres = [
  { genre: 'Machine Learning', skills: ['Python', 'TensorFlow/Keras', 'scikit-learn', 'CNN / LSTM', 'Librosa', 'MediaPipe', 'OpenCV'] },
  { genre: 'Generative AI', skills: ['RAG', 'LangChain', 'Ollama', 'Vector Search', 'Embeddings'] },
  { genre: 'Web & Backend', skills: ['React', 'FastAPI', 'JavaScript', 'HTML', 'CSS', 'Vite'] },
  { genre: 'Data & Tools', skills: ['MongoDB', 'SQL', 'Git', 'GitHub', 'DevOps', 'Vercel', 'C'] },
]

export const topPicks = ['Python', 'Deep Learning', 'RAG & LLMs', 'Computer Vision', 'FastAPI', 'React', 'MongoDB', 'Git & DevOps', 'SQL', 'C']

export const achievements = [
  { title: 'Solve-A-Thon 1.0', detail: 'National Level 24-hour Hackathon · Srinivas Institute of Technology' },
  { title: 'Udbhava 2025', detail: 'National Level Tech Fest · Nitte Institute of Professional Education' },
]

export const certifications = [
  'C Training — IIT Bombay (Spoken Tutorial)',
  'Python for Beginners — Simplilearn',
  'Introduction to HTML — Infosys Springboard',
  'Basics of Python — Infosys Springboard',
  'Machine Learning for Beginners — Simplilearn',
]

export const continueWatching = [
  { title: 'AI Knowledge Bot', progress: 80, id: 'knowledge-bot' },
  { title: 'SilentTalk', progress: 65, id: 'silenttalk' },
  { title: 'Listenly', progress: 92, id: 'listenly' },
]

export type ProfileKind = 'Recruiter' | 'Developer' | 'Creative'
export const profileOrder: Record<ProfileKind, string[]> = {
  Recruiter: ['about', 'journey', 'originals', 'skills', 'achievements', 'resume'],
  Developer: ['originals', 'skills', 'about', 'journey', 'achievements', 'resume'],
  Creative: ['originals', 'about', 'skills', 'journey', 'achievements', 'resume'],
}
