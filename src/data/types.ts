export interface Link {
  label: string;
  url: string;
}

/** Institutions get a consistent colour marker across the page. */
export type Org = 'UofT' | 'NLR' | 'NC State' | 'Valencell' | 'UdeC' | 'Personal';

export interface Role {
  title: string;
  org: string;
  unit?: string;
  place: string;
  start: string;
  end?: string; // omitted = present
  current?: boolean;
  bullets?: string[];
}

export interface Project {
  id: string;
  title: string;
  org: Org;
  role?: string;
  years: string;
  kind: ('open-source' | 'research' | 'software record' | 'industry' | 'lead developer')[];
  tech: string[];
  description: string;
  links: Link[];
  featured?: boolean;
  /** Reserved for the interactive widgets we design later. */
  widget?: string;
}

export type PubKind = 'journal' | 'conference' | 'preprint' | 'thesis' | 'software';

export interface Publication {
  kind: PubKind;
  year: number;
  title: string;
  authors: string[];
  venue: string;
  details?: string;
  links: Link[];
}

export interface Talk {
  date: string; // e.g. "Jun 2026"
  year: number;
  event: string;
  place: string;
  title: string;
  note?: string;
}
