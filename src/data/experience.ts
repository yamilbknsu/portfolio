import type { Role } from './types';

export const experience: Role[] = [
  {
    title: 'Postdoctoral Fellow / Research Software Engineer',
    org: 'University of Toronto',
    unit: 'Dept. of Civil & Mineral Engineering',
    place: 'Toronto, ON',
    start: 'May 2026',
    current: true,
    bullets: [
      'Lead developer of the Canadian Open Energy Model (CANOE): software design, architecture, and maintenance of the codebase used to build the model and run analyses, overseeing the code across the whole project.',
      'Research on new representations of energy systems and operations-research optimization in the model, with a focus on publications, impact, and computational performance.',
      'Contributor to Temoa and to the Open Energy Outlook.',
    ],
  },
  {
    title: 'Software Development Intern',
    org: 'National Laboratory of the Rockies (formerly NREL)',
    unit: 'Behavior and Advanced Mobility Group · Center for Integrated Mobility Sciences',
    place: 'Golden, CO (remote)',
    start: 'Jan 2025',
    end: 'May 2026',
    bullets: [
      'Built a Rust ETL pipeline for real-time processing of global georeferenced POI and network datasets (~100M rows) for the open-source access model BAMBAM.',
      'Refactored the Python socio-demographic simulator DEMOS; added CI/CD and Docker image pipelines.',
      'Built a scalable AWS data-ingestion pipeline (Glue, Lambda) for a full-stack interactive executive dashboard.',
      'Contributed features and issue work to the energy-aware Rust routing engine RouteE Compass.',
    ],
  },
  {
    title: 'Research Assistant',
    org: 'North Carolina State University',
    unit: 'Sustainable and Resilient Systems Lab · Dr. Benjamin Rachunok',
    place: 'Raleigh, NC',
    start: '2022',
    end: 'Feb 2026',
  },
  {
    title: 'Data Science Intern',
    org: 'Valencell, Inc.',
    unit: 'R&D · biomedical wearables',
    place: 'Raleigh, NC',
    start: 'Jun 2023',
    end: 'Aug 2024',
    bullets: [
      'ML models (XGBoost, LightGBM, CNNs, LSTMs) for physiological signal-to-number regression.',
      'Led a model-agnostic training pipeline integrated with automated data ingestion and deployment, using GPU containers on GCP Vertex AI.',
      'Maintained a GKE / Pub/Sub Kubernetes cluster for data processing: 27× faster execution at lower cost.',
      'Data-acquisition reporting (Fairlearn, SHAP, data-support matrices).',
    ],
  },
  {
    title: 'International Exchange Student',
    org: 'Università di Modena e Reggio Emilia',
    unit: "Dr. Manuel Iori's research group",
    place: 'Reggio Emilia, Italy',
    start: 'Feb 2019',
    end: 'Jun 2019',
  },
];
