import type { Project } from './types';

export const projects: Project[] = [
  {
    id: 'canoe',
    title: 'CANOE — Canadian Open Energy Model',
    org: 'UofT',
    role: 'Lead developer',
    years: '2026 —',
    kind: ['open-source', 'lead developer'],
    tech: ['Python', 'Pyomo', 'optimization', 'energy systems'],
    description:
      'Open-source, multi-sector energy-system model for Canada built on Temoa, for exploring pathways to net-zero by 2050. I lead the software: architecture, the data pipelines that build the model databases (electricity, transportation, residential, commercial), and the analysis tooling.',
    links: [
      { label: 'Docs', url: 'https://canoe-main.github.io/CANOE/' },
      { label: 'GitHub', url: 'https://github.com/CANOE-main' },
      { label: 'Dataset', url: 'https://zenodo.org/records/18435395' },
      { label: 'Project', url: 'https://sustainablesystems.civmin.utoronto.ca/canoe/' },
    ],
    featured: true,
    widget: 'tbd',
  },
  {
    id: 'temoa',
    title: 'Temoa & Open Energy Outlook',
    org: 'UofT',
    years: '2026 —',
    kind: ['open-source'],
    tech: ['Python', 'Pyomo'],
    description:
      'Code contributions to Temoa, the open-source energy-system optimization framework behind CANOE, and participation in the Open Energy Outlook, an open analysis of U.S. decarbonization pathways.',
    links: [
      { label: 'Temoa', url: 'https://github.com/TemoaProject/temoa' },
      { label: 'Open Energy Outlook', url: 'https://www.cmu.edu/energy/key-initiatives/open-energy-outlook/index.html' },
    ],
  },
  {
    id: 'bambam',
    title: 'BAMBAM',
    org: 'NLR',
    years: '2025',
    kind: ['open-source', 'software record'],
    tech: ['Rust', 'geospatial'],
    description:
      'Behavior and Advanced Mobility Big Access Model: large-scale multimodal access modeling built on RouteE Compass. I wrote the Rust ETL that ingests global POI and network data (~100M rows).',
    links: [
      { label: 'GitHub', url: 'https://github.com/NatLabRockies/bambam' },
      { label: 'DOI', url: 'https://doi.org/10.11578/dc.20250905.5' },
    ],
    widget: 'tbd',
  },
  {
    id: 'demos',
    title: 'DEMOS',
    org: 'NLR',
    years: '2025 – 2026',
    kind: ['open-source', 'software record'],
    tech: ['Python', 'simulation', 'CI/CD'],
    description:
      'Agent-based demographic microsimulator that evolves synthetic populations through life events. Core refactor for ~70% faster runs, CI/CD and Docker pipelines; additional modules for regional planning with SCAG.',
    links: [
      { label: 'GitHub', url: 'https://github.com/NatLabRockies/DEMOS' },
      { label: 'Docs', url: 'https://natlabrockies.github.io/DEMOS/pages/intro.html' },
      { label: 'DOI', url: 'https://doi.org/10.11578/dc.20260401.1' },
    ],
    widget: 'tbd',
  },
  {
    id: 'routee',
    title: 'RouteE Compass',
    org: 'NLR',
    years: '2025',
    kind: ['open-source'],
    tech: ['Rust'],
    description: 'Energy-aware routing engine. Feature contributions and issue work.',
    links: [{ label: 'GitHub', url: 'https://github.com/NREL/routee-compass' }],
  },
  {
    id: 'ev-access',
    title: 'EV Access During Blackouts',
    org: 'NC State',
    years: '2023 – 2025',
    kind: ['research'],
    tech: ['Python', 'GIS', 'simulation'],
    description:
      'GIS-informed transportation simulation measuring how vehicle electrification changes people’s ability to reach essential services (groceries, pharmacies, healthcare) during power outages in North Carolina.',
    links: [
      { label: 'npj SM&T', url: 'https://doi.org/10.1038/s44333-024-00007-3' },
      { label: 'IEEE Access', url: 'https://doi.org/10.1109/ACCESS.2025.3629567' },
    ],
    widget: 'tbd',
  },
  {
    id: 'outage-leakage',
    title: 'Power Outage Prediction & Data Leakage',
    org: 'NC State',
    years: '2024 – 2026',
    kind: ['research'],
    tech: ['ML', 'GeoAI', 'PyTorch'],
    description:
      'Random train/test splits inflate outage-model skill through spatial and temporal autocorrelation. Under leave-one-state-out and leave-one-event-out splits, models often fail to beat a null baseline, even with Prithvi WxC embeddings.',
    links: [{ label: 'arXiv', url: 'https://arxiv.org/abs/2608.24665' }],
    widget: 'tbd',
  },
  {
    id: 'u-prithvi',
    title: 'U-Prithvi Flood Mapping',
    org: 'NC State',
    years: '2025',
    kind: ['research'],
    tech: ['PyTorch', 'remote sensing'],
    description:
      'Combines the Prithvi geospatial foundation model with a U-Net for better flood-inundation segmentation from satellite imagery.',
    links: [
      { label: 'GitHub', url: 'https://github.com/kostejnv/prithvi_segmentation' },
      { label: 'Paper', url: 'https://doi.org/10.4230/LIPIcs.GIScience.2025.18' },
    ],
    widget: 'tbd',
  },
  {
    id: 'ems',
    title: 'Real-Time Ambulance Relocation (NYC)',
    org: 'UdeC',
    years: '2020 – 2024',
    kind: ['research'],
    tech: ['Python', 'optimization', 'simulation'],
    description:
      'Discrete-event simulation of New York City EMS with embedded real-time optimization for relocation and dispatch, workload balancing, and ride-hailing outsourcing.',
    links: [
      { label: 'GitHub', url: 'https://github.com/yamilbknsu/ems-ny-simopt' },
      { label: 'Paper', url: 'https://doi.org/10.1016/j.cie.2023.109823' },
    ],
    widget: 'tbd',
  },
  {
    id: 'eco-resilience',
    title: 'Ecological Resilience for Infrastructure',
    org: 'NC State',
    years: '2024 – 2026',
    kind: ['research'],
    tech: ['risk analysis'],
    description:
      'A framework for putting ecological-resilience concepts to work in infrastructure decision-making. SRA 2025 Best Student Paper (Foundations of Risk).',
    links: [{ label: 'Risk Analysis', url: 'https://doi.org/10.1111/risa.70316' }],
  },
  {
    id: 'valencell',
    title: 'ML Training Infrastructure',
    org: 'Valencell',
    years: '2023 – 2024',
    kind: ['industry'],
    tech: ['GCP', 'Kubernetes', 'Docker'],
    description:
      'Model-agnostic training pipeline on Vertex AI and a GKE processing cluster with a 27× speedup. Proprietary work, so no links.',
    links: [],
  },
];
