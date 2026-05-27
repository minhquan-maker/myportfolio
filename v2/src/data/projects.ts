import type { Project } from '../types'

// Using images from web-V1 img/ directory for real projects
const imgBase = '/img/'

export const projects: Project[] = [
  {
    id: '01',
    number: '01',
    name: 'AquaGuard',
    category: 'Mobile App / Research',
    type: 'Client',
    col1Image1: `${imgBase}img-01-portrait.jpg`,
    col1Image2: `${imgBase}img-05-gallery-1.jpg`,
    col2Image: `${imgBase}img-02-uts.jpg`,
    link: 'https://github.com/minhquan-maker/aquaguard',
  },
  {
    id: '02',
    number: '02',
    name: 'Green Rise',
    category: 'Environmental Tech',
    type: 'Personal',
    col1Image1: `${imgBase}img-04-mekong.jpg`,
    col1Image2: `${imgBase}img-03-water-puppetry.jpg`,
    col2Image: `${imgBase}img-09-gallery-5.jpg`,
    link: '#',
  },
  {
    id: '03',
    number: '03',
    name: 'Carbon Footprint Tracker',
    category: 'UI/UX Design',
    type: 'Client',
    col1Image1: `${imgBase}img-06-gallery-2.jpg`,
    col1Image2: `${imgBase}img-07-gallery-3.jpg`,
    col2Image: `${imgBase}img-08-gallery-4.jpg`,
    link: '#',
  },
]
