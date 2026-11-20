export const profile = {
  name: 'Yamil Essus',
  headline: 'Research Software Engineer',
  position: 'Postdoctoral Fellow, University of Toronto',
  coords: '43.66°N · 79.40°W · Toronto, ON',
  mission:
    'I build high-performance, reproducible, open-source tools that speed up applied research, mostly in geospatial data science, simulation, optimization, and machine learning for infrastructure and energy systems.',
  email: 'yamil.essus@utoronto.ca',
  altEmail: 'essusyamil@gmail.com',
  links: {
    github: 'https://github.com/yamilbknsu',
    scholar: 'https://scholar.google.com/citations?user=A_osHPUAAAAJ',
    orcid: 'https://orcid.org/0000-0001-8177-4267',
    linkedin: 'https://www.linkedin.com/in/yamil-essus-pradel/',
  },
  scholarStats: '40 citations · h-index 3',
  stack: [
    ['Languages', 'Python · Rust · TypeScript'],
    ['Data & ML', 'PyTorch · XGBoost · Polars · DuckDB · Arrow · xarray · Pyomo'],
    ['Geospatial', 'GeoPandas · Shapely · H3 · GDAL · Rasterio · Overture Maps'],
    ['Infrastructure', 'Docker · AWS · GCP · GitHub Actions'],
    ['Web', 'React · FastAPI · PostgreSQL · D3'],
  ] as [string, string][],
};
