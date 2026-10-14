export const profile = {
  name: 'Utpanna Pradhan',
  roles: ['Frontend Engineer', 'React Developer', 'Next.js Developer', 'Full-Stack Developer', 'AI Engineer', 'Creative Technologist'],
  tagline: 'Crafting experiences, not just interfaces.',
  location: 'Bargarh, Odisha, India',
  email: 'Utpanna828@gmail.com',
  phone: '7008306746',
  whatsapp: '7008306746',
  github: 'https://github.com/utpanna-pradhan',
  linkedin: 'https://www.linkedin.com/in/utpanna-pradhan-/',
  medium: 'https://medium.com/@utpanna828',
  resumeUrl: 'https://utpanna-pradhan.github.io/Resume_pdf/',
};

export const stats = [
  { label: 'Years Learning', value: 1, suffix: '+' },
  { label: 'Projects Built', value: 12, suffix: '+' },
  { label: 'Internships', value: 5, suffix: '' },
  { label: 'Technologies', value: 10, suffix: '+' },
];

export const techStack = [
  { category: 'Frontend', items: [ "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Bootstrap",
      "Responsive Design"] },
  { category: 'Backend', items: [  "Node.js",
      "Express.js",
      "MongoDB",
      "MySQL",
      "REST APIs",
      "Firebase"] },
  { category: 'Tools', items: [  "Git",
      "GitHub",
      "Postman",
      "Figma",
      "Vite",
      "VS Code",
      "Vercel",
      "Netlify"] },
];

export type Project = {
  id: string;
  title: string;
  tagline: string;
  category: 'Web App' | 'Full Stack' | 'Tool' | 'Automation';
  overview: string;
  problem: string;
  solution: string;
  tech: string[];
  challenges: string;
  results: string;
  accent: string;
  liveUrl?: string;
  githubUrl?: string;
};

export const projects: Project[] = [
  {
  id: 'webnest',
  title: 'WEBNEST',
  tagline: 'Premium websites. Ready to launch.',
  category: 'Web App',

  overview:
    'WEBNEST is a modern digital platform for discovering and purchasing premium, ready-to-use website templates for restaurants, gyms, salons, portfolios, businesses, and more.',

  problem:
    'Building a professional website from scratch can be time-consuming and expensive, especially for small businesses and individuals who need a website quickly.',

  solution:
    'Built WEBNEST as a modern template marketplace where users can explore professionally designed website templates, preview live demos, and choose a website that fits their needs.',

  tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion'],

  challenges:
    'Creating a premium and responsive browsing experience while making it easy for users to discover templates, preview designs, understand what is included, and contact WEBNEST for customization.',

  results:
    'Created a responsive digital platform that showcases premium website templates with live previews, clear product information, WhatsApp integration, and an easy path for customers to request or purchase a website.',

  accent: '#22d3ee',

  githubUrl: 'https://github.com/utpanna-pradhan/WebNest',

  liveUrl: 'https://web-nest-phi.vercel.app/',
},
{
  id: 'experience-bargarh',
  title: 'Experience Bargarh',
  tagline: 'Discover the culture, heritage, and attractions of Bargarh',
  category: 'Web App',
  overview: 'A modern tourism website that helps visitors explore Bargarh through its attractions, culture, food, festivals, and local experiences.',
  problem: 'Information about Bargarh is scattered across different sources, making it difficult for visitors to discover everything the district has to offer.',
  solution: 'Built a responsive tourism platform with categorized attractions, cultural highlights, local recommendations, and an intuitive browsing experience.',
  tech: ['React', 'JavaScript', 'Tailwind CSS', 'Vite'],
  challenges: 'Organizing local content into an engaging user experience while keeping the website fast, responsive, and easy to navigate.',
  results: 'Created a digital platform that promotes Bargarh as a tourist destination and makes exploring the region simple for visitors.',
  accent: '#22d3ee',
  githubUrl: 'https://github.com/utpanna-pradhan/Explore_Bargarh',
  liveUrl: 'https://explore-bargarh.vercel.app/',
},
  {
  id: 'interior-design',
  title: 'Interior Design Website',
  tagline: 'A modern portfolio website for an interior design studio',
  category: 'Web App',
  overview: 'A visually engaging website that showcases the studio’s projects, services, and design expertise.',
  problem: 'The client needed a professional online presence to present their portfolio and make it easier for potential customers to explore their work.',
  solution: 'Designed and developed a responsive website featuring project galleries, service sections, client testimonials, and a contact/inquiry form.',
  tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
  challenges: 'Creating a visually appealing gallery while maintaining fast loading times and a responsive experience across devices.',
  results: 'Delivered a modern portfolio website that effectively showcases the studio’s work and provides an easy way for potential clients to connect.',
  accent: '#38bdf8',
  githubUrl:"https://github.com/nitink3006/Architectural-Studio-Lab",
  liveUrl:"https://architectural-studio-lab.vercel.app/"
},
{
  id: 'heart-it-out',
  title: 'Heart It Out',
  tagline: 'Helping users find the right therapist with confidence',
  category: 'Full Stack',
  overview: 'A therapist recommendation platform that helps users discover suitable mental health professionals based on their preferences and needs.',
  problem: 'Finding the right therapist can be overwhelming due to the number of available professionals and limited personalized guidance.',
  solution: 'Developed features including therapist recommendations, searchable profiles, informative blogs, and a user-friendly browsing experience.',
  tech: ['Vue.js', 'JavaScript', 'Tailwind CSS', 'WordPress'],
  challenges: 'Building intuitive search and recommendation flows while maintaining a clean, accessible user interface.',
  results: 'Created an engaging platform that simplifies therapist discovery and provides educational mental health content through the integrated blog section.',
  accent: '#8b5cf6',
  liveUrl:"https://happyminds.in/therapist-recommendation/",
}
  
  
];

export type Experience = {
  company: string;
  role: string;
  duration: string;
  location: string;
  responsibilities: string[];
  achievements: string[];
};

export const experiences: Experience[] = [
  {
    company: 'Heart It Out',
    role: 'Frontend Developer',
    duration: '2024 — 2025',
    location: 'Remote',
    responsibilities: [
     'Developed and maintained frontend features using Vue.js, Tailwind CSS, and JavaScript.',
      'Built responsive pages and reusable UI components from Figma designs.',
      'Worked with WordPress CMS to update and manage website content.',
      'Collaborated with designers and developers to improve user experience and maintain design consistency.'
    ],
    achievements: ['Vue.js', 'JavaScript', 'Tailwind CSS', 'WordPress', 'HTML', 'CSS'],
  },
  {
    company: 'Unified Mentor',
    role: 'Full Stack Developer Intern',
    duration: '2024 (3 Months)',
    location: 'Remote',
    responsibilities: [
      'Developed full-stack web applications using React, Node.js, Express.js, and Firebase.',
      'Built responsive user interfaces and integrated backend APIs.',
      'Implemented authentication, CRUD operations, and database functionality.',
      'Worked on projects including the E-Gram Panchayat system and a Virtual Pet Simulator.'
    ],
    achievements: ['React', 'Node.js', 'Express.js', 'Firebase', 'JavaScript', 'Bootstrap']
  },
   {
    company: 'SalesQueen',
    role: 'Frontend Developer ',
    duration: '2023 (4 Months)',
    location: 'Remote',
    responsibilities: [
      'Developed responsive websites using HTML, CSS, JavaScript, Bootstrap, and jQuery.',
      'Converted UI designs into responsive web pages.',
      'Collaborated with the development team to build and maintain client websites.',
      'Optimized layouts for cross-browser compatibility and mobile responsiveness.'
    ],
    achievements: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'jQuery']
  }
];

export type Education = {
  degree: string;
  field: string;
  institution: string;
  detail: string;
  extra?: string;
};

export const education: Education[] = [
  {
    degree: 'MCA',
    field: 'Master of Computer Applications',
    institution: 'Sambalpur University Institute of Information Technology',
    detail: 'Focused on software engineering, web technologies, data structures & algorithms, database systems, operating systems, and computer networks.',
    extra: 'CGPA: 9.4'
  },
   {
    degree: 'BCA',
    field: 'Bachelor of Computer Applications',
    institution: 'Vikash School of Business Management',
    detail: 'Studied programming fundamentals, web development, database management systems, object-oriented programming, and software engineering.',
    extra: '79%'
  }
];

export const certificates = [
  'Full Stack Web Development',
  'React & Modern Frontend Engineering',
  'JavaScript Algorithms & Data Structures',
];

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  initials: string;
  accent: string;
};

export const testimonials: Testimonial[] = [
  {
    name: 'Aarav Sharma',
    role: 'Product Manager',
    company: 'Heart It Out',
    quote: 'Utpanna turns vague ideas into polished interfaces faster than anyone I have worked with. He cares about the details users feel but never see.',
    initials: 'AS',
    accent: '#38bdf8',
  },
  {
    name: 'Priya Nair',
    role: 'Design Lead',
    company: 'Unified Mentor',
    quote: 'A rare engineer who actually thinks like a designer. Hand him a Figma file and it comes back alive — animated, responsive, and accessible.',
    initials: 'PN',
    accent: '#a855f7',
  },
  {
    name: 'Rohan Verma',
    role: 'Engineering Manager',
    company: 'SalesQueen',
    quote: 'Reliable, curious, and genuinely invested in craft. Utpanna raised the bar for our entire frontend team during his internship.',
    initials: 'RV',
    accent: '#22d3ee',
  },
  {
    name: 'Sara Khan',
    role: 'Senior Developer',
    company: 'Freelance',
    quote: 'His code is clean, his animations are smooth, and his communication is clear. He is the developer you want on a launch day.',
    initials: 'SK',
    accent: '#38bdf8',
  },
];

export const blogPosts = [
  {
  title: 'Learning TypeScript from Scratch: From JavaScript Basics to React, APIs, and Generics',
  excerpt: 'A beginner-friendly guide to TypeScript, covering JavaScript fundamentals, static typing, interfaces, React props, API responses, and generics with practical examples.',
  tag: 'TypeScript',
  readingTime: '12 min',
  date: '2026',
   link:"https://medium.com/@utpanna828/learning-typescript-from-scratch-from-javascript-basics-to-react-apis-and-generics-11f2b1eb1a84"
},
{
  title: 'Debugging Made Simple: How to Find Bugs, Fix Them, and Debug AI-Generated Code',
  excerpt: 'Learn a systematic approach to debugging, finding the root cause of errors, fixing bugs without creating new ones, and troubleshooting AI-generated code with confidence.',
  tag: 'Debugging',
  readingTime: '9 min',
  date: '2026',
   link:"https://medium.com/@utpanna828/debugging-made-simple-how-to-find-bugs-fix-them-and-debug-ai-generated-code-7636dcb04a51"
},

{
  title: '🚀 React Context API: A Beginner-Friendly Deep Dive',
  excerpt: 'Understand why React Context API is useful, how it avoids prop drilling, and how to share data across components with simple, beginner-friendly examples.',
  tag: 'React',
  readingTime: '4 min',
  date: '2025',
   link:"https://medium.com/@utpanna828/react-context-api-a-beginner-friendly-deep-dive-b6bd082be78f"
},

{
  title: 'Controlled and Uncontrolled Components in React.js',
  excerpt: 'Understand the difference between controlled and uncontrolled components in React forms, with practical examples, key characteristics, and guidance on when to use each approach.',
  tag: 'React',
  readingTime: '2 min',
  date: '2025',
   link:"https://medium.com/@utpanna828/controlled-and-uncontrolled-components-in-react-js-45ed397eef8f"
},


];
