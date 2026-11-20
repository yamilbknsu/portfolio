import type { Link } from './types';

export const reviewing: { journal: string; publisher?: string; years: string; count: number }[] = [
  { journal: 'Journal of Biomedical Informatics', publisher: 'Elsevier', years: '2024–2026', count: 9 },
  { journal: 'Int. J. of Computer Information Systems and Industrial Management Applications', publisher: 'IJCISIM', years: '2024–2025', count: 5 },
  { journal: 'Risk Analysis', publisher: 'Wiley', years: '2025', count: 1 },
  { journal: 'Frontiers in Future Transportation', publisher: 'Frontiers', years: '2025', count: 1 },
  { journal: 'The Journal of Supercomputing', publisher: 'Springer', years: '2026', count: 1 },
];

export const otherService: { what: string; where: string; years: string }[] = [
  { what: 'Session chair, “Emerging Topics for Electric Vehicles”', where: 'INFORMS Annual Meeting', years: '2024' },
  { what: 'Vice-President, ISE Graduate Student Association', where: 'NC State', years: '2023–2024' },
  { what: 'Industrial Engineering Undergraduate Student Body', where: 'Universidad de Concepción', years: '2017–2019' },
];

export const teaching: { role: string; where: string; what: string; years: string }[] = [
  { role: 'Mentor', where: 'NC State', what: 'Master’s graduation project: SQL database design and analysis for a power-outage research database', years: '2023' },
  { role: 'Teaching Assistant', where: 'NC State', what: 'Inventory Control; Supply Chain Analytics', years: '2021–2022' },
  { role: 'Teaching Assistant', where: 'Universidad de Concepción', what: 'Machine Learning for Business Intelligence, Computer Simulation, Thermodynamics, Fluid Mechanics', years: '2017–2020' },
];

export const awards: { title: string; detail: string; year: string }[] = [
  { title: 'Best Student Paper', detail: 'Society for Risk Analysis, Foundations of Risk Specialty Group', year: '2025' },
  { title: 'SRA Student Merit Travel Award', detail: 'Society for Risk Analysis Annual Meeting, Washington, DC', year: '2025' },
  { title: 'NSF GIScience Scholarship', detail: 'Travel to GIScience 2025, Christchurch, NZ', year: '2025' },
  { title: 'Edward P. Fitts Fellowship', detail: 'NC State Industrial & Systems Engineering', year: '2022–2023' },
];

export const education: { degree: string; school: string; place: string; years: string; notes?: string; link?: Link }[] = [
  {
    degree: 'Ph.D. Industrial & Systems Engineering',
    school: 'North Carolina State University',
    place: 'Raleigh, NC',
    years: '2021 – 2026',
    notes: 'Advisor: Dr. Benjamin Rachunok · GPA 4.0',
    link: { label: 'Computational Methods for Enhancing Community Resilience', url: 'https://www.lib.ncsu.edu/resolver/1840.20/46586' },
  },
  { degree: 'M.E. Industrial Engineering', school: 'North Carolina State University', place: 'Raleigh, NC', years: '2021 – 2023', notes: 'GPA 4.0' },
  {
    degree: 'B.Sc. Industrial Engineering',
    school: 'Universidad de Concepción',
    place: 'Concepción, Chile',
    years: '2015 – 2020',
    notes: 'Exchange semester at Università di Modena e Reggio Emilia, Italy (2019)',
  },
];

/** Early visualization work, kept for history. YouTube IDs. */
export const archive: { id: string; title: string; year: string; caption: string }[] = [
  { id: '0eghEN_Ek94', title: 'Tsunami evacuation simulation visualizer', year: '2020', caption: 'Census-based households walking the shortest path to the nearest safe zone in a Chilean coastal city.' },
  { id: 'Zyzn6IV36i4', title: 'Food delivery alternatives during an emergency', year: '2020', caption: 'COVID-19 school-meal delivery strategies in Concepción and Chillán (JUNAEB).' },
  { id: '5k4MoqMpZtE', title: 'Real-time EMS relocation: simulation replay', year: '2021', caption: 'Ambulances relocating across New York City in the simulation.' },
  { id: '5YkY2ZEYvwQ', title: 'Real-time EMS relocation: research presentation', year: '2021', caption: 'Talk on the survival-based relocation and dispatch framework.' },
];
export const archiveCredit = 'Universidad de Concepción, with Sebastián Cancino and Rodrigo De La Fuente.';

export const personal: { title: string; years: string; description: string; tech: string[]; links: Link[] }[] = [
  {
    title: 'Arctic keyboard',
    years: '2026',
    description: 'Wireless split keyboard: 64 hot-swap keys, designed in Ergogen and KiCad, 3D-printed case, ZMK firmware.',
    tech: ['Ergogen', 'KiCad', 'ZMK', '3D printing'],
    links: [
      { label: 'GitHub', url: 'https://github.com/yamilbknsu/arctic-keyboard' },
      { label: 'ZMK config', url: 'https://github.com/yamilbknsu/zmk-config-nomad' },
    ],
  },
  {
    title: 'ERP system (freelance)',
    years: '2021',
    description: 'Angular + Electron desktop app with a Node/Express backend for a real-estate broker’s office: leases, monthly balance freeze, PDF reports.',
    tech: ['Angular', 'Electron', 'Node.js'],
    links: [
      { label: 'Frontend', url: 'https://github.com/yamilbknsu/abrace_erp_frontend' },
      { label: 'Backend', url: 'https://github.com/yamilbknsu/abrace_erp_backend' },
    ],
  },
];
