export interface Place {
  id: string;
  name: string;
  shortDesc: string;
  description: string;
  image: string;
  latitude: number;
  longitude: number;
  radius: number;
  color: string;
  icon: string;
}

export const PLACES: Place[] = [
  {
    id: '1',
    name: 'Capilla La Salle',
    shortDesc: 'Lugar de reflexión espiritual del campus',
    description: 'La Capilla de La Salle es el corazón espiritual del campus. Aquí los estudiantes y docentes se reúnen para la misa, retiros espirituales y momentos de reflexión. Fundada bajo los valores lasallistas de fe, servicio y comunidad.',
    image: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?w=800',
    latitude: 17.022111,
    longitude: -96.720750,
    radius: 10,
    color: '#1a3a5c',
    icon: '⛪',
  },
  {
    id: '2',
    name: 'Biblioteca Central',
    shortDesc: 'Centro de conocimiento e investigación',
    description: 'La Biblioteca Central de La Salle Oaxaca cuenta con más de 30,000 volúmenes, acceso a bases de datos digitales, salas de estudio y cubículos para investigación.',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800',
    latitude: 17.022200,
    longitude: -96.720800,
    radius: 10,
    color: '#8B1A1A',
    icon: '📚',
  },
  {
    id: '3',
    name: 'Rectoría',
    shortDesc: 'Centro administrativo de la universidad',
    description: 'La Rectoría es el edificio central de gobierno de la Universidad La Salle Oaxaca. Desde aquí se dirigen los programas académicos y la misión educativa.',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800',
    latitude: 17.022050,
    longitude: -96.720900,
    radius: 10,
    color: '#2d6a4f',
    icon: '🏛️',
  },
  {
    id: '4',
    name: 'Cancha Deportiva',
    shortDesc: 'Zona de deporte y convivencia estudiantil',
    description: 'Las canchas deportivas de La Salle Oaxaca son el punto de encuentro estudiantil. Aquí se practican fútbol, basquetbol y voleibol, fomentando el compañerismo.',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
    latitude: 17.022300,
    longitude: -96.720600,
    radius: 10,
    color: '#e07b39',
    icon: '⚽',
  },
  {
    id: '5',
    name: 'Laboratorio de Cómputo',
    shortDesc: 'Innovación y tecnología lasallista',
    description: 'El Laboratorio de Cómputo está equipado con estaciones de trabajo de última generación. Aquí los estudiantes desarrollan proyectos de software, diseño y programación.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
    latitude: 17.021950,
    longitude: -96.720700,
    radius: 10,
    color: '#6c3483',
    icon: '💻',
  },
];