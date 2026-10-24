/**
 * ask-aman-data.js
 * Canned Q&A topics for the scripted Ask-Aman chat card. No live LLM calls —
 * simple keyword matching against user input, first match wins.
 */

export const TOPICS = [
  {
    id: 'skills',
    keywords: ['skill', 'stack', 'tech', 'tools', 'language', 'framework'],
    chip: 'What are your skills?',
    response: "GenAI/RAG/LLMs, Python, FastAPI, React, SQL — and both Azure and AWS (Bedrock, SQS, Lambda, Comprehend). Full breakdown's in the Skills card.",
  },
  {
    id: 'role',
    keywords: ['role', 'job', 'work', 'current', 'company', 'title'],
    chip: 'What do you do now?',
    response: "Software Engineer 2 at Tessolve Semiconductors, building and maintaining production AI tools — mostly GenAI and automation.",
  },
  {
    id: 'projects',
    keywords: ['project', 'built', 'build', 'shipped', 'portfolio'],
    chip: "What's your flagship project?",
    response: "Probably the Resume Analysis Tool — an ATS platform that's analyzed 70k+ resumes. SchematicIQ and the Tessa Embedded Bot are close behind. See the Projects cards for details.",
  },
  {
    id: 'contact',
    keywords: ['contact', 'email', 'reach', 'hire', 'linkedin', 'phone'],
    chip: 'How can I reach you?',
    response: 'amanharisofficial@protonmail.com, or find me on LinkedIn — linkedin.com/in/aman-haris. The Contact card has a form too.',
  },
  {
    id: 'fun-fact',
    keywords: ['fun', 'hobby', 'hobbies', 'fact', 'outside', 'cricket', 'f1'],
    chip: 'Fun fact?',
    response: "Outside work I follow cricket and F1, and cook whenever I get the chance. No, I have not automated my cooking. Yet.",
  },
  {
    id: 'fallback',
    keywords: [],
    chip: null,
    response: "That's outside my training data. Try asking about my skills, current role, projects, or how to reach me.",
  },
];

export function matchTopic(input) {
  const normalized = input.trim().toLowerCase();
  if (!normalized) return TOPICS.find(t => t.id === 'fallback');

  for (const topic of TOPICS) {
    if (topic.keywords.some(keyword => normalized.includes(keyword))) {
      return topic;
    }
  }
  return TOPICS.find(t => t.id === 'fallback');
}
