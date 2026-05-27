export interface Project {
  id: string
  number: string
  name: string
  category: string
  type: 'Client' | 'Personal'
  col1Image1: string
  col1Image2: string
  col2Image: string
  link?: string
}

export interface Service {
  number: string
  name: string
  description: string
}

export interface DecorativeImage {
  src: string
  width: string
  position: 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right'
}
