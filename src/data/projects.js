const projects = [
  {
    id: 'rag-chatbot',
    title: 'RAG-based Chatbot',
    shortDescription: 'Enterprise knowledge retrieval system using Langchain, OpenAI, Azure, and Pinecone.',
    description: `Architected and deployed a sophisticated chatbot system that enhances cross-departmental information retrieval. The system leverages Retrieval-Augmented Generation (RAG) to provide accurate and contextually relevant responses based on company documentation and knowledge bases.`,
    impact: 'Enhanced cross-departmental information retrieval by 85%',
    technologies: ['Langchain', 'OpenAI', 'Azure', 'Pinecone', 'Python'],
    stats: [
      { value: '85%', label: 'Improvement in Information Retrieval' },
      { value: '60%', label: 'Reduction in Support Queries' }
    ],
    type: 'work',
    imageUrl: '/assets/images/project-placeholders/rag-chatbot.jpg',
  },
  {
    id: 'session-memory-chatbot',
    title: 'Session-Memory Training Chatbot',
    shortDescription: 'Intelligent chatbot for technical training with memory capabilities.',
    description: `Engineered an intelligent chatbot specifically designed for technical training purposes. The system maintains conversation context across sessions, enabling continuous learning experiences for engineers during onboarding.`,
    impact: 'Improved engineering onboarding efficiency by 75% and reduced training time',
    technologies: ['LLMs', 'Python', 'FastAPI', 'Azure AI'],
    stats: [
      { value: '75%', label: 'Improvement in Onboarding Efficiency' },
      { value: '40%', label: 'Reduction in Training Time' }
    ],
    type: 'work',
    imageUrl: '/assets/images/project-placeholders/session-memory-chatbot.jpg',
  },
  {
    id: 'archshift',
    title: 'ArchShift Code Converter',
    shortDescription: 'LLM-powered tool for transforming ARM platform C++ code to RISC-V platform C code.',
    description: `Pioneered a tool leveraging proprietary LLM techniques to transform ARM platform C++ code to RISC-V platform C code. The system can also generate new RISC-V code based on specifications, dramatically reducing development and migration time.`,
    impact: 'Achieved 95% code accuracy and reduced migration time by 90%',
    technologies: ['LLMs', 'Python', 'C++', 'RISC-V'],
    stats: [
      { value: '95%', label: 'Code Accuracy' },
      { value: '90%', label: 'Reduction in Migration Time' },
      { value: '75%', label: 'Reduction in Development Time' }
    ],
    type: 'work',
    imageUrl: '/assets/images/project-placeholders/archshift.jpg',
  },
  {
    id: 'assertify',
    title: 'Assertify',
    shortDescription: 'LLM-powered tool that automates conversion between English and SystemVerilog Assertions.',
    description: `Developed an innovative LLM-powered tool that automates the conversion between English and SystemVerilog Assertions. This tool significantly reduces manual verification effort and improves overall code quality by ensuring consistent assertion implementation.`,
    impact: 'Reduced manual verification effort by 40% and improved code quality',
    technologies: ['GenAI', 'Python', 'SystemVerilog'],
    stats: [
      { value: '40%', label: 'Reduction in Manual Verification Effort' },
      { value: '35%', label: 'Improvement in Code Quality' }
    ],
    type: 'work',
    imageUrl: '/assets/images/project-placeholders/assertify.jpg',
  },
  {
    id: 'adas-system',
    title: 'ADAS for Low Visibility Conditions',
    shortDescription: 'Advanced machine learning system that enhances rider safety during poor visibility conditions.',
    description: `Developed an advanced machine learning system that enhances rider safety during poor visibility conditions using real-time object detection and tracking algorithms optimized for low-light environments.`,
    technologies: ['Computer Vision', 'Object Detection', 'ML', 'Python'],
    type: 'personal',
    githubUrl: 'https://github.com/aman-haris/adas-project',
    imageUrl: '/assets/images/project-placeholders/adas.jpg',
  },
  {
    id: 'web-scraping',
    title: 'Web Scraping Automation System',
    shortDescription: 'Enterprise-grade RPA solution for automated data extraction from websites.',
    description: `Engineered an enterprise-grade RPA solution using Blueprint RPA for automated data extraction from websites with robust error handling and data validation mechanisms.`,
    technologies: ['RPA', 'Python', 'Data Extraction', 'BluePrism'],
    type: 'personal',
    githubUrl: 'https://github.com/aman-haris/web-scraping-automation',
    imageUrl: '/assets/images/project-placeholders/web-scraping.jpg',
  },
  {
    id: 'offensive-language',
    title: 'Offensive Language Detection API',
    shortDescription: 'Production-ready NLP service that identifies potentially offensive content in user-generated text.',
    description: `Developed a production-ready NLP service that identifies potentially offensive content in user-generated text with a RESTful API endpoint and sophisticated classification model.`,
    technologies: ['NLP', 'FastAPI', 'ML', 'Python'],
    type: 'personal',
    githubUrl: 'https://github.com/aman-haris/offensive-language-api',
    imageUrl: '/assets/images/project-placeholders/offensive-language.jpg',
  },
];

export default projects;