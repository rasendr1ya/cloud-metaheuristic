export interface ReferenceEntry {
  id: string;
  role: string;
  authors: string;
  year: string;
  title: string;
  venue: string;
  doi: string;
  url: string;
}

export const referenceEntries: ReferenceEntry[] = [
  {
    id: 'amini2018',
    role: 'Paper tugas · DA',
    authors: 'Amini, Z., Maeen, M., &amp; Jahangir, M. R.',
    year: '2018',
    title:
      'Providing a load balancing method based on dragonfly optimization algorithm for resource allocation in cloud computing',
    venue:
      'International Journal of Networked and Distributed Computing, 6(1), 35–42.',
    doi: '10.2991/ijndc.2018.6.1.4',
    url: 'https://doi.org/10.2991/ijndc.2018.6.1.4',
  },
  {
    id: 'karim2024',
    role: 'Paper tugas · DBO',
    authors: 'Karim, F. K., Ghorashi, S., Alkhalaf, S., Hamza, S. H. A., Ben Ishak, A., &amp; Abdel-Khalek, S.',
    year: '2024',
    title:
      'Optimizing makespan and resource utilization in cloud computing environment via evolutionary scheduling approach',
    venue: 'PLOS ONE, 19(11), e0311814.',
    doi: '10.1371/journal.pone.0311814',
    url: 'https://doi.org/10.1371/journal.pone.0311814',
  },
  {
    id: 'mirjalili2015',
    role: 'Sumber asli · DA',
    authors: 'Mirjalili, S.',
    year: '2015',
    title:
      'Dragonfly algorithm: a new meta-heuristic optimization technique for solving single-objective, discrete, and multi-objective problems',
    venue:
      'Neural Computing and Applications, 27(4), 1053–1073. Online 29 May 2015.',
    doi: '10.1007/s00521-015-1920-1',
    url: 'https://doi.org/10.1007/s00521-015-1920-1',
  },
  {
    id: 'xue2022',
    role: 'Sumber asli · DBO',
    authors: 'Xue, J., &amp; Shen, B.',
    year: '2022',
    title:
      'Dung beetle optimizer: a new meta-heuristic algorithm for global optimization',
    venue:
      'The Journal of Supercomputing, 79(7), 7305–7336. Online 27 November 2022.',
    doi: '10.1007/s11227-022-04959-6',
    url: 'https://doi.org/10.1007/s11227-022-04959-6',
  },
];
