export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  url: string;
  techTags: string[];
  screenshot?: string;
  screenshotMaxWidth?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Signal Flow Diagram App",
    category: "Sound Education",
    description:
      "An interactive web application for visualising and exploring audio signal flow. Designed for sound production students, it provides a hands-on way to understand how audio signals route through hardware and software systems — from microphone to monitor. Built as a teaching aid for HNC Sound Production curriculum.",
    url: "https://signal-flow2025.vercel.app/",
    techTags: ["React", "Educational Tool", "Audio Engineering"],
    screenshot: "/screenshots/SignalFlow.png",
  },
  {
    id: 2,
    title: "Teacher PromptGen",
    category: "AI Tool for Educators",
    description:
      "An AI-powered prompt generator designed to help educators craft effective, pedagogically-grounded prompts for use with large language models in teaching contexts. Reduces the barrier to AI adoption for non-technical staff by providing structured, curriculum-aware prompt templates.",
    url: "https://teacher-prompt-genv2.vercel.app/",
    techTags: ["Next.js", "AI", "Prompt Engineering"],
    screenshot: "/screenshots/TeacherPromptGen.png",
  },
  {
    id: 3,
    title: "NCL Viva Voce Transcriber",
    category: "AI Assessment Tool",
    description:
      "A prototype transcription tool built for New College Lanarkshire that automates the transcription of viva voce assessments. Supports multi-speaker audio with speaker diarisation, assessment context input, and accepts common audio formats. Powered by Google Gemini 2.5 Flash — designed to reduce assessor workload and improve accessibility of spoken assessment records.",
    url: "https://viva-transcriber.vercel.app/",
    techTags: ["Next.js", "Google Gemini", "Audio AI", "Speaker Diarisation"],
    screenshot: "/screenshots/vivatranscriber.png",
  },
  {
    id: 4,
    title: "Tone Game",
    category: "Audio Training",
    description:
      "A browser-based frequency ear-training game for audio students. The app plays sine waves at specific frequencies and challenges users to identify the correct frequency by ear — building the critical listening skills essential for mixing, EQ, and sound design. A practical, engaging supplement to formal sound production teaching.",
    url: "https://tonegame-andreas-projects-a5c9d705.vercel.app/login",
    techTags: ["React", "Web Audio API", "Ear Training"],
    screenshot: "/screenshots/tonegym1.png",
    screenshotMaxWidth: "40%",
  },
  {
    id: 5,
    title: "Pickleball Stats Tracker",
    category: "Community App",
    description:
      "A full-featured stats and game tracking application for a local pickleball community. Players can log games, browse player profiles, view rankings and analytics, and manage upcoming events and tournament sessions. A community-driven project that applies web development skills in a real-world sports context.",
    url: "https://drill-babies-pb.vercel.app/",
    techTags: ["Next.js", "Sports Analytics", "Data Visualisation"],
  },
  {
    id: 6,
    title: "Lighting Simulator",
    category: "Education — Lighting",
    description:
      "An interactive browser-based lighting simulator for students learning stage and architectural lighting design. Allows users to place and configure light sources, adjust colour temperature, intensity, and beam angle, and observe real-time results — providing a practical, visual learning environment without requiring physical equipment.",
    url: "https://lighting-simulator.vercel.app/",
    techTags: ["React", "Canvas API", "Lighting Design"],
    screenshot: "/screenshots/Lightatron.png",
  },
];
