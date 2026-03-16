export interface Place {
  id: string;
  name: string;
  shortDesc: string;
  description: string;
  image: string | number;
  latitude: number;
  longitude: number;
  radius: number;
  color: string;
  icon: string;
}

export const PLACES: Place[] = [
  {
    id: "1",
    name: "Árbol de los Deseos",
    shortDesc: "Símbolo de vida y punto de reunión del campus",
    description:
      "Detrás de la biblioteca está el único árbol que había en el terreno; es el símbolo de la vida y punto de reunión frente al área de convivencia. Este eje organiza el espacio del campus como el tronco de un árbol del que se salen sus ramas hacia el oriente y poniente.",
    image: require("../assets/images/arbolDeseos.jpg"),
    latitude: 17.021698983644605,
    longitude: -96.7213058390023,
    radius: 10,
    color: "#1a3a5c",
    icon: "🌳",
  },
  {
    id: "2",
    name: "Biblioteca",
    shortDesc: "El corazón del conocimiento en el campus",
    description:
      'La biblioteca es el punto central del campus: la semilla latente del conocimiento que da la bienvenida a todos al llegar. Inaugurada en 2010, es un edificio moderno que conjuga arquitectura contemporánea con manufactura artesanal oaxaqueña, inspirado en el humanismo lasallista y la filantropía de la Fundación Alfredo Harp Helú. En su interior destaca "Himnos de la noche", mural del artista oaxaqueño José Luis García.',
    image: require("../assets/images/biblioteca.jpg"),
    latitude: 17.021399361033954,
    longitude: -96.7213869153107,
    radius: 22,
    color: "#f97313",
    icon: "📚",
  },
  {
    id: "3",
    name: "Estátua de San Juan Bautista de La Salle",
    shortDesc: "Un lugar de reflexión y espiritualidad",
    description:
      "En un momento de incertidumbre, San Juan Bautista de La Salle se retiró a Parmenia, donde comprendió que Dios lo llamaba al servicio de los demás mediante sus Hermanos. En memoria de ese pasaje trascendental en la vida del Fundador, el campus dedica este jardín con la estatua de San Juan Bautista de La Salle como espacio de reflexión y espiritualidad.",
    image: require("../assets/images/estatuaSanJuan.jpg"),
    latitude: 17.020625,
    longitude: -96.721047,
    radius: 15,
    color: "#ff242b",
    icon: "🙏",
  },
  {
    id: "4",
    name: "Cancha Deportiva",
    shortDesc: "Zona de deporte y convivencia estudiantil",
    description:
      "Las canchas deportivas de La Salle Oaxaca son el punto de encuentro estudiantil. Aquí se practican fútbol, basquetbol y voleibol, fomentando el compañerismo.",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800",
    latitude: 17.0223,
    longitude: -96.7206,
    radius: 10,
    color: "#e07b39",
    icon: "⚽",
  },
  {
    id: "5",
    name: "Laboratorio de Cómputo",
    shortDesc: "Innovación y tecnología lasallista",
    description:
      "El Laboratorio de Cómputo está equipado con estaciones de trabajo de última generación. Aquí los estudiantes desarrollan proyectos de software, diseño y programación.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    latitude: 17.02195,
    longitude: -96.7207,
    radius: 10,
    color: "#6c3483",
    icon: "💻",
  },
];
