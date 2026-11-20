import type { Publication } from './types';

/** Author name as it appears in author lists; it gets highlighted. */
export const SELF = 'Y. Essus';

export const publications: Publication[] = [
  {
    kind: 'journal',
    year: 2026,
    title: 'Towards Operationalizing Ecological Resilience for Infrastructure Decision-Making',
    authors: ['Y. Essus', 'B. Rachunok', 'T. Logan', 'K. Hardaway', 'D. Bristow'],
    venue: 'Risk Analysis',
    details: '46(8), e70316',
    links: [{ label: 'DOI', url: 'https://doi.org/10.1111/risa.70316' }],
  },
  {
    kind: 'preprint',
    year: 2026,
    title: 'Data Leakage Inflates Generalizability of Power Outage Prediction Models',
    authors: ['Y. Essus', 'R. R. Vatsavai', 'B. Rachunok'],
    venue: 'arXiv',
    details: '2608.24665',
    links: [{ label: 'arXiv', url: 'https://arxiv.org/abs/2608.24665' }],
  },
  {
    kind: 'thesis',
    year: 2026,
    title: 'Computational Methods for Enhancing Community Resilience',
    authors: ['Y. Essus'],
    venue: 'Ph.D. dissertation, North Carolina State University',
    links: [{ label: 'Repository', url: 'https://www.lib.ncsu.edu/resolver/1840.20/46586' }],
  },
  {
    kind: 'software',
    year: 2026,
    title: 'DEMOS Additional Modules for Regional Planning Applications [SWR-26-076]',
    authors: ['S. Sharda', 'G. Zhao', 'J. Li', 'J. Hoshiko', 'B. Sun', 'V. Garikapati', 'Y. Essus'],
    venue: 'U.S. DOE CODE',
    links: [{ label: 'DOI', url: 'https://doi.org/10.11578/dc.20260923.6' }],
  },
  {
    kind: 'journal',
    year: 2025,
    title:
      'A Computational Framework for Modeling Access to Services and the Resilience Impacts of Electric Vehicles During Blackouts',
    authors: ['Y. Essus', 'B. Rachunok'],
    venue: 'IEEE Access',
    details: '13',
    links: [{ label: 'DOI', url: 'https://doi.org/10.1109/ACCESS.2025.3629567' }],
  },
  {
    kind: 'conference',
    year: 2025,
    title: 'U-Prithvi: Integrating a Foundation Model and U-Net for Enhanced Flood Inundation Mapping',
    authors: ['V. Kostejn', 'Y. Essus', 'J. Abrahamson', 'R. R. Vatsavai'],
    venue: 'GIScience 2025 (LIPIcs)',
    links: [
      { label: 'DOI', url: 'https://doi.org/10.4230/LIPIcs.GIScience.2025.18' },
      { label: 'Code', url: 'https://github.com/kostejnv/prithvi_segmentation' },
    ],
  },
  {
    kind: 'software',
    year: 2025,
    title: 'BAMBAM (The Behavior and Advanced Mobility Big Access Model) [SWR-25-123]',
    authors: ['R. Fitzgerald', 'Y. Essus', 'B. Irving', 'E. Geierstanger'],
    venue: 'U.S. DOE CODE',
    links: [
      { label: 'DOI', url: 'https://doi.org/10.11578/dc.20250905.5' },
      { label: 'Code', url: 'https://github.com/NatLabRockies/bambam' },
    ],
  },
  {
    kind: 'software',
    year: 2025,
    title: 'DEMOS (Demographic Microsimulator Tool for Longitudinal Synthetic Population) [SWR-25-135]',
    authors: ['B. Sun', 'G. Zhao', 'V. Garikapati', 'Y. Essus', 'J. Hoshiko', 'J. Li', 'Z. Li', 'S. Sharda', 'F. Siddiq'],
    venue: 'U.S. DOE CODE',
    links: [
      { label: 'DOI', url: 'https://doi.org/10.11578/dc.20260401.1' },
      { label: 'Code', url: 'https://github.com/NatLabRockies/DEMOS' },
    ],
  },
  {
    kind: 'journal',
    year: 2024,
    title: 'Electric Vehicles Limit Equitable Access to Essential Services During Blackouts',
    authors: ['Y. Essus', 'B. Rachunok'],
    venue: 'npj Sustainable Mobility and Transport',
    details: '1, 9',
    links: [
      { label: 'DOI', url: 'https://doi.org/10.1038/s44333-024-00007-3' },
      { label: 'arXiv', url: 'https://arxiv.org/abs/2404.09998' },
    ],
  },
  {
    kind: 'journal',
    year: 2024,
    title:
      'Real-time optimization for relocation and dispatching of Emergency Medical Services with balanced workload and outsourced ride-hailing services',
    authors: ['Y. Essus', 'R. De La Fuente', 'A. Venkitasubramanian'],
    venue: 'Computers & Industrial Engineering',
    details: '187, 109823',
    links: [
      { label: 'DOI', url: 'https://doi.org/10.1016/j.cie.2023.109823' },
      { label: 'Code', url: 'https://github.com/yamilbknsu/ems-ny-simopt' },
    ],
  },
];
