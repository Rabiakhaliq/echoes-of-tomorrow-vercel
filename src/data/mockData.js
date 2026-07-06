// Mock data layer.
// Shaped the way the real MongoDB collections + API responses will look later,
// so swapping this for real fetch() calls should require minimal rewiring.

export const currentUser = {
  name: 'Rabia',
  joinedYear: 2026,
};

export const letters = [
  {
    id: 'l1',
    title: 'Before the internship',
    excerpt: "Today I finally started learning web development. Hopefully I become a software engineer...",
    writtenDate: '2026-07-05',
    openDate: '2027-01-10',
    status: 'sealed',
    mood: 'hopeful',
    hasMedia: true,
  },
  {
    id: 'l2',
    title: 'One year of BSCS',
    excerpt: "I don't know if I'm cut out for this, but today's project actually worked and I felt something click.",
    writtenDate: '2026-05-20',
    openDate: '2026-11-20',
    status: 'sealed',
    mood: 'excited',
    hasMedia: false,
  },
  {
    id: 'l3',
    title: 'To the version of me who has a job',
    excerpt: "I hope you remember how hard the debating competition was and how proud you were anyway.",
    writtenDate: '2026-02-14',
    openDate: '2026-08-14',
    status: 'opened',
    mood: 'proud',
    hasMedia: true,
  },
];

export const nextLetter = letters
  .filter((l) => l.status === 'sealed')
  .sort((a, b) => new Date(a.openDate) - new Date(b.openDate))[0];

export const moodHistory = [
  { month: 'Feb', mood: 3, label: 'Hopeful' },
  { month: 'Mar', mood: 4, label: 'Excited' },
  { month: 'Apr', mood: 2, label: 'Stressed' },
  { month: 'May', mood: 4, label: 'Proud' },
  { month: 'Jun', mood: 3, label: 'Calm' },
  { month: 'Jul', mood: 5, label: 'Hopeful' },
];

export const moodEmojiScale = { 1: '😢', 2: '😟', 3: '😐', 4: '😊', 5: '😁' };

export const goals = [
  { id: 'g1', text: 'Learn React properly', progress: 80 },
  { id: 'g2', text: 'Finish BSCS 3rd semester strong', progress: 60 },
  { id: 'g3', text: 'Build a portfolio project I\'m proud of', progress: 45 },
  { id: 'g4', text: 'Win a debate competition', progress: 100 },
];

export const timelineEvents = [
  { id: 't1', date: '2025-09-01', title: 'Started BSCS', description: 'First day of university.' },
  { id: 't2', date: '2026-01-15', title: 'First OOP project', description: 'Built a travel agency simulator in Python.' },
  { id: 't3', date: '2026-02-14', title: 'Debate Society competition', description: 'Represented the department in the inter-departmental round.' },
  { id: 't4', date: '2026-05-20', title: 'DigiSkills 3.0', description: 'Started the UI/UX & Web Flow track.' },
  { id: 't5', date: '2026-07-05', title: 'Started Echoes of Tomorrow', description: 'Began building this project.' },
];

export const galleryMemories = [
  { id: 'm1', caption: 'Debate competition day', date: '2026-02-14', mood: 'proud', color: 'from-indigo to-void-light' },
  { id: 'm2', caption: 'First React app running', date: '2026-03-02', mood: 'excited', color: 'from-aqua to-indigo' },
  { id: 'm3', caption: 'Late night studying', date: '2026-04-18', mood: 'calm', color: 'from-void-light to-indigo' },
  { id: 'm4', caption: 'Project demo day', date: '2026-06-10', mood: 'proud', color: 'from-gold to-indigo' },
];

export const worldEventsSince = (fromDate) => ([
  'AI tools became a standard part of everyday software development.',
  'A major global sporting event brought the world together.',
  'New advances in renewable energy reshaped local headlines.',
]);
