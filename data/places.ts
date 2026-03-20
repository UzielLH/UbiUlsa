export interface Place {
  id: string;
  name: string;
  shortDesc: string;
  description: string;
  image: string | number;
  video: string;
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
    video: "https://youtu.be/gPqxf6FjLH8",
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
    video: "https://youtu.be/j5O4OnIpTm4",
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
    image: require("../assets/images/San Juan.jpg"),
    video: "https://youtu.be/9wHaGJXaTl0",
    latitude: 17.020625,
    longitude: -96.721047,
    radius: 15,
    color: "#ff242b",
    icon: "🙏",
  },
  {
    id: "4",
    name: "Auditorio de las Estelas",
    shortDesc: "Tecnología y artesanía al servicio de la cultura",
    description:
      "Construido entre 2005 y 2007, el Auditorio de la Universidad La Salle Oaxaca destaca por su fachada de texturas triangulares de ladrillo aparente, resultado de combinar diseño paramétrico con materiales tradicionales y mano de obra artesanal. En su interior se cuidó especialmente la acústica, poniendo la tecnología al servicio de la cultura educativa.",
    image: require("../assets/images/Estelas.jpg"),
    video: "https://youtu.be/rqibe36014I",
    latitude: 17.020941,
    longitude: -96.721042,
    radius: 10,
    color: "#e0541c",
    icon: "🎭",
  },

  {
    id: "5",
    name: "Observatorio",
    shortDesc: "Un ojo que contiene el mundo",
    description:
      "Construido entre 2005 y 2007 junto a los Talleres de Ingeniería y Arquitectura, este pequeño observatorio astronómico rinde homenaje a las enseñanzas mesoamericanas, particularmente de los mixtecos. Inspirado en las antiguas cámaras oscuras prehispánicas con las que se registraban los movimientos del Sol, la Luna y las estrellas, su arquitectura representa el encuentro de dos volúmenes —uno de ladrillo blanco y otro rojo— donde convergen la luz y la sombra. A través de un pequeño agujero en su parte superior, la imagen se invierte y se proyecta: un ojo que contiene el mundo.",
    image: require("../assets/images/Observatorio.jpg"),
    video: "https://youtu.be/U2pfswTKBKw",
    latitude: 17.022189885203545,
    longitude: -96.720637257845,
    radius: 10,
    color: "#2472e7",
    icon: "🔭",
  },

  {
    id: "6",
    name: "Edificio de Danza",
    shortDesc: "Arte, movimiento y saberes ancestrales",
    description:
      'Este edificio, concebido como una caja de escenario alta y cerrada, alberga obras de teatro, danza y proyecciones de cine. Su ventilación se logra mediante un muro desfasado del cuerpo principal que permite la circulación de aire a través de celosías y persianas horizontales, otorgando flexibilidad para controlar la iluminación y el ambiente. En su muro exterior se empleó el sistema constructivo tradicional de la Sierra Sur: el "blaa", aplicando el conocimiento regional ancestral al diseño universitario.',
    image: require("../assets/images/danza.jpg"),
    video: "https://youtu.be/wZBcFtO_N60",
    latitude: 17.022941342347146,
    longitude: -96.72150092915622,
    radius: 10,
    color: "#ff62ae",
    icon: "💃",
  },

  {
    id: "7",
    name: "Edificio de Talleres",
    shortDesc: "Flexibilidad y tradición en un solo espacio",
    description:
      'Este edificio alberga los talleres de las ingenierías y arquitectura. Su diseño es altamente flexible: puede funcionar como un gran espacio único o dividirse en varios mediante puertas plegables de madera. Sus muros de concreto armado integran textura y color de piedra volcánica, concreto sandblastado y ladrillo. Como remate, ambos edificios de talleres están coronados por una celosía de ladrillo conocida como "los danzantes", fusionando funcionalidad con identidad cultural oaxaqueña.',
    image: require("../assets/images/ingenieria.jpg"),
    video: "https://youtu.be/jTblwlUfCI4",
    latitude: 17.022510473093476,
    longitude: -96.72069090201141,
    radius: 20,
    color: "#eae749",
    icon: "🏗️",
  },

  {
    id: "8",
    name: "Edificio de Rectoría",
    shortDesc: "Innovación sostenible con alma oaxaqueña",
    description:
      "El Edificio de Rectoría utiliza una red curva de color amarillo/dorado como segunda piel, logrando iluminación natural constante en todo su interior y un consumo reducido de energía eléctrica. Esta solución nació también de una preocupación ambiental: tras notar que los pájaros chocaban con el gran ventanal de la biblioteca, se tomó la decisión de evitar grandes superficies acristaladas. El tejido no solo resuelve esto, sino que se convirtió en refugio para las aves, cuyo canto festivo acompaña la vida universitaria.",
    image: require("../assets/images/Rectoria.jpg"),
    video: "https://youtu.be/qm0XeuIW6Ac",
    latitude: 17.022638708094085,
    longitude: -96.7215572555471,
    radius: 10,
    color: "#7b4bff",
    icon: "🏛️",
  },

  {
    id: "9",
    name: "Gimnasio Auditorio",
    shortDesc: "El juego de pelota: la dualidad eterna de la vida",
    description:
      "Hogar de las canchas de basquetbol y voleibol, este edificio evoca el ancestral juego de pelota mesoamericano. Inspirado en los códices donde el juego se representaba en azul y rojo —el cielo y la tierra, la dualidad eterna— sus muros se dividen en esos dos colores, que coinciden también con los colores oficiales de La Salle. En la zona roja se imprimió la huella digital de una mujer; en la azul, la de un hombre. En su interior, las canchas se transforman en un auditorio de grandes dimensiones con tratamiento acústico especializado.",
    image: require("../assets/images/gimnasio.jpg"),
    video: "https://youtu.be/KqPr9P3amf8",
    latitude: 17.020784421411033,
    longitude: -96.72160821751366,
    radius: 30,
    color: "#ff4747",
    icon: "🏀",
  },

  {
    id: "10",
    name: "Edificio de Fisioterapia",
    shortDesc: "Una analogía arquitectónica del cuerpo humano",
    description:
      "Todo el edificio de Fisioterapia es una analogía del cuerpo humano. Su muro exterior está articulado como ligamentos y músculos, con un tejido homogéneo que le da unidad y fuerza. En el pasillo central, la cubierta representa el esqueleto, y el uso del bambú demuestra las posibilidades de la construcción con materiales alternativos. Su organización interior fue definida por las normas técnicas de la propia actividad fisioterapéutica.",
    image: require("../assets/images/Fisioterapia.jpg"),
    video: "https://youtu.be/Pfp-fW1Im4Q",
    latitude: 17.022479696681053,
    longitude: -96.72416704491722,
    radius: 20,
    color: "#002f80",
    icon: "🦴",
  },
];
