import React, { useState, useMemo, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import PerfumeCard from '../components/PerfumeCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cart from '../components/Cart';
import { toast } from 'sonner';

interface Perfume {
  nombre: string;
  precio: number;
  descripcion: string;
  url_imagen: string;
  descuento: number;
  notas: string[];
  url: string;
}

interface PerfumeWithMatches extends Perfume {
  coincidencias: number;
}

const perfumesData = 
    {
    "perfumes":[
        [{
          "nombre": "Toro - Perfume Hombre",
          "precio": 25.29,
          "descripcion": "Disfruta de la esencia del lujo con Maison Alhambra Toro Pour Homme Eau De Parfum Spray. Diseñado para hombres, su cautivador aroma con notas de especias cítricas y maderas irradia confianza y sofisticación . Fabricado con exquisitez y atención al detalle, este perfume atemporal es ideal para el hombre seguro de sí mismo . Formato 100 ml",
          "url_imagen": "http://lasalhajasdetoledoymas.com/cdn/shop/files/LASALHAJASDETOLEDOYMAS.COM_68.png?v=1738338712",
          "descuento": 0,
          "notas": [
              "especias cítricas",
              "maderas irradia confianza",
              "sofisticación"
          ],
          "url": "https://lasalhajasdetoledoymas.com/products/toro-perfume-hombre"
      },
      {
          "nombre": "Musaman White Intense - Perfume Mujer",
          "precio": 58.62,
          "descripcion": "Descubre la exquisita esencia de Musamam White Intense: un perfume de intensidad moderada que combina notas aromáticas de alta calidad para crear una fragancia única y cautivadora. Con toques de frescura, elegancia y seducción, es ideal para el día o para ocasiones especiales. Presentación en un elegante frasco con atomizador preciso. Formato 100 ml",
          "url_imagen": "http://lasalhajasdetoledoymas.com/cdn/shop/files/Diseno_sin_titulo_-_2025-01-30T223817.778.png?v=1738311862",
          "descuento": 0,
          "notas": [],
          "url": "https://lasalhajasdetoledoymas.com/products/musaman-white-intense-perfume-mujer#judgeme_product_reviews"
      },
      {
          "nombre": "Aceite Intimo Lovers of Night",
          "precio": 3.03,
          "descripcion": "Aceite intimo perfumado, unisex, envase de roll-on de 3ml. De la casa AYAT. SIN ALCOHOL . Aceite original extraído naturalmente. Fórmula de perfume a aceite con extractos naturales  que suaviza y refresca tu piel durante todo el día para una experiencia aromática duradera, para una sensación agradable durante todo el día. Notas de Salida: Naranja, rosa, notas verdes y mango. Notas Corazón: Jazmín, ylang-ylang y frutas. Notas Fondo: Almizcle, vainilla, ámbar y cedro.",
          "url_imagen": "http://lasalhajasdetoledoymas.com/cdn/shop/files/Disenosintitulo-2025-02-01T231110.595.png?v=1738449927",
          "descuento": 0,
          "notas": [],
          "url": "https://lasalhajasdetoledoymas.com/products/aceite-intimo-lovers-of-night"
      },
      {
          "nombre": "Liquid Brun - Perfume Hombre",
          "precio": 67.98,
          "descripcion": "Deléitate con la sensación única de Liquid Brun, el perfume para hombres. Con su composición amaderada y especiada , esta fragancia promete cautivar y seducir. Descubre su toque cítrico de bergamota, una introducción fresca y cautivadora que te envolverá en una experiencia olfativa inolvidable. Liquid Brun es ideal para ocasiones especiales en las que desee destacar con una fragancia única y memorable. Ya sea una cena elegante, un evento social importante o una cita, esta fragancia aportará un toque sofisticado y llamativo a su presencia. Formato 100ml",
          "url_imagen": "http://lasalhajasdetoledoymas.com/cdn/shop/files/Disenosintitulo-2025-02-05T204709.043.png?v=1738785274",
          "descuento": 0,
          "notas": [],
          "url": "https://lasalhajasdetoledoymas.com/products/liquid-brun-perfume-hombre"
      },
      {
          "nombre": "Victorioso Nero - Perfume Hombre",
          "precio": 28.44,
          "descripcion": "Descubre la fragancia emocionante y cálida de Victorioso Victory para hombres de Maison Alhambra. Con un aroma a pimienta rosa y limón siciliano, notas de lavanda y olíbano en el centro y un toque de ámbar y haba tonka en la base. Para iusar en cualquier momento del día. Formato 100 ml",
          "url_imagen": "http://lasalhajasdetoledoymas.com/cdn/shop/files/LASALHAJASDETOLEDOYMAS.COM_79.png?v=1738343957",
          "descuento": 0,
          "notas": [],
          "url": "https://lasalhajasdetoledoymas.com/products/victorioso-victory-perfume-hombre"
      },
      {
          "nombre": "Musaman White Intense - Perfume Mujer",
          "precio": 58.62,
          "descripcion": "Descubre la exquisita esencia de Musamam White Intense: un perfume de intensidad moderada que combina notas aromáticas de alta calidad para crear una fragancia única y cautivadora. Con toques de frescura, elegancia y seducción, es ideal para el día o para ocasiones especiales. Presentación en un elegante frasco con atomizador preciso. Formato 100 ml",
          "url_imagen": "http://lasalhajasdetoledoymas.com/cdn/shop/files/Diseno_sin_titulo_-_2025-01-30T223817.778.png?v=1738311862",
          "descuento": 0,
          "notas": [],
          "url": "https://lasalhajasdetoledoymas.com/products/musaman-white-intense-perfume-mujer"
      },
      {
          "nombre": "Victoria Flower - Perfume Mujer",
          "precio": 25.95,
          "descripcion": "Descubre la verdadera sensualidad y placer con Victoria Flower - Perfume Mujer. Una auténtica bomba aromática que conquistará a todos con sus acordes. Inspirado por perfumistas para satisfacer los deseos más acariciados, encarna la magia de hacer tus sueños realidad. Frescura y brillo únicos que hacen de este perfume afrutado-floral tu \"favorito\" absoluto. Formato 100 ml",
          "url_imagen": "http://lasalhajasdetoledoymas.com/cdn/shop/files/LASALHAJASDETOLEDOYMAS.COM_75.png?v=1738342956",
          "descuento": 0,
          "notas": [],
          "url": "https://lasalhajasdetoledoymas.com/products/victoria-flower-perfume-mujer"
      },
      {
          "nombre": "Wajood - Perfume Unisex",
          "precio": 51.43,
          "descripcion": "Wajood de Lattafa Perfumes es una fragancia de la familia olfativa Aromática Acuática para Hombres y Mujeres. Esta fragrancia combina notas marinas y pimienta rosa con vetiver, pachulí, sándalo y ámbar, creando un aroma fresco y elegante. Perfecto para cualquier ocasión, dando la sensación de lujo y distinción. Formato 100 ml",
          "url_imagen": "http://lasalhajasdetoledoymas.com/cdn/shop/files/LASALHAJASDETOLEDOYMAS.COM_82.png?v=1738344907",
          "descuento": 0,
          "notas": [],
          "url": "https://lasalhajasdetoledoymas.com/products/wajood-perfume-unisex"
      },
      {
          "nombre": "Washwasha - Perfume Mujer",
          "precio": 25.29,
          "descripcion": "Disfruta de la seductora fragancia de Washwasha de Lattafa Perfumes, diseñada para mujeres que buscan un aroma único . Con notas de frambuesa, nardos y haba tonka, este perfume Ámbar Floral te envolverá en una combinación irresistible de aromas. Descubre la sensualidad de su mezcla de almizcle, vainilla y ámbar en cada aplicación. Dos formatos: Perfume 100 ml + Deo 50 ml Perfume 50 ml",
          "url_imagen": "http://lasalhajasdetoledoymas.com/cdn/shop/files/LASALHAJASDETOLEDOYMAS.COM_89.png?v=1738346258",
          "descuento": 0,
          "notas": [
              "frambuesa",
              "nardos",
              "haba tonka",
              "este perfume Ámbar Floral te envolverá en una combinación irresistible de aromas"
          ],
          "url": "https://lasalhajasdetoledoymas.com/products/washwasha-perfume-mujer"
      },
      {
          "nombre": "The Artist Nº 1 -Perfume Hombre",
          "precio": 47.73,
          "descripcion": "Descubre la esencia de la creatividad con The Artist N°1 de Maison Alhambra. Esta fragancia intrigante y artística combina notas cítricas, florales y amaderadas, brindando una experiencia olfativa única y duradera . Su envase refleja su enfoque en el arte y su pasión por la originalidad. ¡Déjate cautivar por una fragancia verdaderamente única! Formato 100 ml",
          "url_imagen": "http://lasalhajasdetoledoymas.com/cdn/shop/files/LASALHAJASDETOLEDOYMAS.COM_63.png?v=1738337345",
          "descuento": 0,
          "notas": [],
          "url": "https://lasalhajasdetoledoymas.com/products/the-artist-n%C2%BA-1-perfume-hombre"
      },
      {
          "nombre": "Teriaq Intense - Perfume Unisex",
          "precio": 59.29,
          "descripcion": "Descubre la intensidad de Teriaq Intense de Lattafa, una fragancia unisex creada por Quentin Bisch en 2024. Con una mezcla de notas lujosas, esta esencia cautiva con su apertura vibrante de azafrán y bergamota, evolucionando hacia un corazón cálido de licor de ciruela y canela, y un fondo envolvente de ámbar, haba tonka y benjuí. Atrévete a destacar con Teriaq Intense. Formato 100 ml",
          "url_imagen": "http://lasalhajasdetoledoymas.com/cdn/shop/files/Disenosintitulo-2025-02-03T131951.961.png?v=1738585235",
          "descuento": 0,
          "notas": [],
          "url": "https://lasalhajasdetoledoymas.com/products/teriaq-intense-perfume-unisex"
      },
      {
          "nombre": "ATLAS Perfume - Hombre",
          "precio": 45.11,
          "descripcion": "Atlas de Lattafa. Perfume NICHO Esta fragancia es un perfume Nicho, que se ha lanzado este 2024. Notas de Salida : sal, notas marinas y limón (lima ácida). Notas de Corazón: Davana y iris. Notas de Fondo: ámbar gris, musgo de roble y sándalo. Formato de 55ml UNA FRAGANCIA QUE NO PASA DESAPERCIBIDA",
          "url_imagen": "http://lasalhajasdetoledoymas.com/cdn/shop/files/Diseno_sin_titulo_-_2024-12-08T170424.484.png?v=1733673936",
          "descuento": 0,
          "notas": [],
          "url": "https://lasalhajasdetoledoymas.com/products/perfume-atlas"
      },
      {
          "nombre": "Hayana - Perfume Mujer",
          "precio": 57.23,
          "descripcion": "Únase a un viaje sensorial con nuestro Hayana - Perfume Mujer. Con una mezcla exquisita de heliotropo, mandarina, orquídea, frutas tropicales, flor blanca, peonía, vainilla, almizcle y ámbar, esta fragancia cautivadora te envolverá en una sensación acogedora y reconfortante. Experimenta la elegancia y la feminidad en cada aplicación. Formato 100ml",
          "url_imagen": "http://lasalhajasdetoledoymas.com/cdn/shop/files/Disenosintitulo-2025-02-05T210552.309.png?v=1738786007",
          "descuento": 0,
          "notas": [],
          "url": "https://lasalhajasdetoledoymas.com/products/hayana-perfume-mujer"
      },
      {
          "nombre": "Creamy Biscuit - Perfume Unisex",
          "precio": 63.4,
          "descripcion": "Enamórate de Creamy Biscuit , la fragancia que te transportará a un mundo indulgente de galletas mantecosas, coco cremoso y dulces notas de vainilla, azúcar y haba tonka. Esta deliciosa combinación es perfecta para satisfacer tus antojos dulces, convirtiéndose en tu postre favorito en una botella. Experimenta la indulgencia con Creamy Biscuit. Formato 100ml",
          "url_imagen": "http://lasalhajasdetoledoymas.com/cdn/shop/files/Disenosintitulo-2025-02-05T201811.755.png?v=1738783165",
          "descuento": 0,
          "notas": [],
          "url": "https://lasalhajasdetoledoymas.com/products/creamy-biscuit-perfume-unisex"
      },
      {
          "nombre": "The Kingdom - Perfume Hombre",
          "precio": 47.73,
          "descripcion": "Disfruta de un momento de tranquilidad y confianza con el eau de parfum Lattafa The Kingdom para hombres. Notas herbales de salvia y lavanda se mezclan con un toque de frescura de menta, mientras que el tabaco y vainilla agregan un toque especiado y oriental. Con una fragancia almizclada, este perfume es perfecto para quienes siguen sus instintos. Formato 100 ml",
          "url_imagen": "http://lasalhajasdetoledoymas.com/cdn/shop/files/LASALHAJASDETOLEDOYMAS.COM_64.png?v=1738337911",
          "descuento": 0,
          "notas": [],
          "url": "https://lasalhajasdetoledoymas.com/products/the-kingdom-perfume-hombre"
      },
      {
          "nombre": "SET 9 AM POUR FEMME",
          "precio": 78.77,
          "descripcion": "Con SET 9 AM POUR FEMME, despertarás tus sentidos con su frescura y luminosidad de la mañana. Experimenta las notas bibrantes de mandarina, pomelo y bergamota, y disfruta de su corazón jugoso y dulce de frambuesa y grosellas negras. Las notas de fondo de almizcle, ámbar y naranja le dan profundidad y longevidad a esta fragancia. Set formado de cuatro piezas: Perfume 100ml+Spaçray corporal100ml+Gel de ducha 100ml+Loción corporal 100ml.",
          "url_imagen": "http://lasalhajasdetoledoymas.com/cdn/shop/files/preview_images/6fe4ad25b20c4901a1ce73cacf530601.thumbnail.0000000000.jpg?v=1730020871",
          "descuento": 0,
          "notas": [],
          "url": "https://lasalhajasdetoledoymas.com/products/set-9-am-pour-femme"
      },
      {
          "nombre": "Velvet Rose - Perfume Unisex",
          "precio": 35.7,
          "descripcion": "Disfruta de una experiencia de fragancia duradera con el eau de parfum Velvet Rose de Lattafa. Su fórmula altamente concentrada de aceite de perfume , te brinda una mayor duración. Combínalo con tus productos de cuidado favoritos para potenciar su aroma a rosas y pachulí con un toque de almizcle y ámbar. Formato 100 ml",
          "url_imagen": "http://lasalhajasdetoledoymas.com/cdn/shop/files/LASALHAJASDETOLEDOYMAS.COM_73.png?v=1738341920",
          "descuento": 0,
          "notas": [],
          "url": "https://lasalhajasdetoledoymas.com/products/velvet-rose-perfume-unisex"
      },
      {
          "nombre": "Taskeen Lacteá Divina - Perfume Unisex",
          "precio": 54.45,
          "descripcion": "Experimenta la seductora fragancia de Taskeen Lacteá Divina. Con notas altas de cacao e incienso, y notas de corazón de jazmín y nardo , este perfume unisex envolverá tus sentidos. Y para un final dulce y encantador, cuenta con notas de fondo de vainilla, haba tonka y un suave toque de leche. Su dulzura cremosa y delicados aromas florales te envolverán en una experiencia refinada y gourmand . Ideal para ocasiones especiales , su profundidad y calidez te cautivarán al instante. Formato 100ml",
          "url_imagen": "http://lasalhajasdetoledoymas.com/cdn/shop/files/Disenosintitulo-2025-02-03T123008.273.png?v=1738584678",
          "descuento": 0,
          "notas": [
              "fondo de vainilla",
              "haba tonka",
              "un suave toque de leche"
          ],
          "url": "https://lasalhajasdetoledoymas.com/products/taskeen-lactea-divina-perfume-unisex"
      },
      {
          "nombre": "Banana Bliss - Perfume Unisex",
          "precio": 67.22,
          "descripcion": "Adéntrate en un sueño de placer con Banana Bliss . La dulzura del plátano se combina con el cremoso coco y la nata, para dar paso a una deliciosa mezcla de vainilla, azúcar y haba tonka . Una fragancia juguetona, acogedora y adictiva que te transportará a la nostalgia de un delicioso pudín de plátano . Formato 100ml",
          "url_imagen": "http://lasalhajasdetoledoymas.com/cdn/shop/files/Disenosintitulo-2025-02-05T193651.522.png?v=1738780773",
          "descuento": 0,
          "notas": [],
          "url": "https://lasalhajasdetoledoymas.com/products/banana-bliss-perfume-unisex"
      },
      {
          "nombre": "Sceptre Malachite - Perfume Unisex",
          "precio": 62.92,
          "descripcion": "Sceptre Malachite es Un Perfume de Maison Alhambra. Esta fragancia es una obra maestra de la perfumería, que cautivara tus sentidos. Notas frutales y frescas en la salida que van dando paso a un corazón balsámico, especiado y floral, que hipnotizaran tus sentidos, terminando esta obra maestra con notas amaderadas de ámbar  y almizcle. Este perfume te transporta a un mundo donde el arte y la fragancia crean un aroma sofisticado y seductor, todo un arte de la perfumería. Formato 100 ml",
          "url_imagen": "http://lasalhajasdetoledoymas.com/cdn/shop/files/LASALHAJASDETOLEDOYMAS.COM_92.png?v=1738347498",
          "descuento": 0,
          "notas": [],
          "url": "https://lasalhajasdetoledoymas.com/products/sceptre-malachite-perfume-unisex"
      },
      {
          "nombre": "Aceite Intimo SAHARA",
          "precio": 3.03,
          "descripcion": "Aceite intimo perfumado, unisex, envase de roll-on de 3ml. De la casa AYAT. SIN ALCOHOL . Aceite original extraído naturalmente. Fórmula de perfume a aceite con extractos naturales  que suaviza y refresca tu piel durante todo el día para una experiencia aromática duradera, para una sensación agradable durante todo el día. Notas de Salida: Limón, salvia, rosas, y notas florales. Notas Corazón: Praliné, canela, bálsamo, de tolú, cardamomo negro y nuez moscada. Notas Fondo: Palo de rosa de Brasil, pachulí, ámbar negro, almizcles y madera de agar.",
          "url_imagen": "http://lasalhajasdetoledoymas.com/cdn/shop/files/Disenosintitulo-2025-02-01T230939.245.png?v=1738450211",
          "descuento": 0,
          "notas": [],
          "url": "https://lasalhajasdetoledoymas.com/products/aceite-intimo-sahara"
      },
      {
          "nombre": "Aceite Intimo QISSATI",
          "precio": 3.03,
          "descripcion": "Aceite intimo perfumado, unisex, envase de roll-on de 3ml. De la casa AYAT. SIN ALCOHOL . Aceite original extraído naturalmente. Fórmula de perfume a aceite con extractos naturales  que suaviza y refresca tu piel durante todo el día para una experiencia aromática duradera, para una sensación agradable durante todo el día. Notas de salida: Uvas y Grosellas negras. Notas Corazón: Nardo, Heliotropo y Jazmín. Notas Base: Almizcle, Pachuli y Cedro.",
          "url_imagen": "http://lasalhajasdetoledoymas.com/cdn/shop/files/Diseno_sin_titulo_-_2025-02-01T230624.731.png?v=1738448977",
          "descuento": 0,
          "notas": [],
          "url": "https://lasalhajasdetoledoymas.com/products/aceite-intimo-qissati"
      },
      {
          "nombre": "Bolso Rondas clásico",
          "precio": 45.98,
          "descripcion": "Bolso en piel de cabra . Bolso de  hombre para pierna en color marrón, en la parte frontal hay tres bolsillos de diferentes tamaños y en la parte posterior un bolsillo de cremallera de 18 x 14cm , medida de la correa superior con hebilla 1,60cm , correa pierna con  cierre mosquetón 0,87cm . Diseñado para una mayor comodidad y libertad de movimiento. La piel de cabra es conocida por su delgadez y resistencia lo que la hace ideal para todo tipo de piezas de marroquinería. **Los artículos de marroquinería pueden tener marcas y arrugas propias del cuero**",
          "url_imagen": "http://lasalhajasdetoledoymas.com/cdn/shop/files/diseno-sin-titulo-_25__optimized.jpg?v=1702136851",
          "descuento": 0,
          "notas": [],
          "url": "https://lasalhajasdetoledoymas.com/products/bolso-rondas-clasico#judgeme_product_reviews"
      },
      {
          "nombre": "SET CLUB DE NUIT ICONIC",
          "precio": 104.18,
          "descripcion": "Disfrute del aroma fresco y estimulante de SET CLUB DE NUIT ICONIC para hombre. Esta fragancia limpia combina notas florales, cítricas y amaderadas para una experiencia olfativa única. Siéntase renovado y confiado con esta elegante opción de perfume. Set de tres piezas Perfume de 105ml+ desodorante 75 gr+ Gel 100ml.",
          "url_imagen": "http://lasalhajasdetoledoymas.com/cdn/shop/files/Disenosintitulo-2024-10-26T225314.110.png?v=1730016798",
          "descuento": 0,
          "notas": [],
          "url": "https://lasalhajasdetoledoymas.com/products/set-club-de-nuit-iconic"
      },
      {
          "nombre": "Aceite íntimo PRIDE OF AYAT",
          "precio": 3.03,
          "descripcion": "Aceite intimo perfumado, unisex, envase de roll-on de 3ml. De la casa AYAT. SIN ALCOHOL . Aceite original extraído naturalmente. Fórmula de perfume a aceite con extractos naturales  que suaviza y refresca tu piel durante todo el día para una experiencia aromática duradera, para una sensación agradable durante todo el día. Notas de salida: bálsamo egipcio, rosa de Damasco, pomelo Notas medias: vainilla, madreselva, sándalo Notas de fondo: almizcle negro, resinas, ámbar, madera de agar",
          "url_imagen": "http://lasalhajasdetoledoymas.com/cdn/shop/files/Diseno_sin_titulo_-_2025-02-01T230154.329.png?v=1738448233",
          "descuento": 0,
          "notas": [],
          "url": "https://lasalhajasdetoledoymas.com/products/aceite-intimo-pride-of-ayat"
      },
      {
          "nombre": "Modern Musk - Perfume Unisex",
          "precio": 25.29,
          "descripcion": "Con un toque moderno y floral, Modern Musk de Maison Alhambra se ha creado para hombres y mujeres que buscan una fragancia versátil . Con notas frutales y florales, esta fragancia es perfecta para usar durante las mañanas y tardes de primavera, verano y otoño. Disfruta de su delicioso aroma de toronja, rosa y almizcle durante todo el día. Formato 100 ml",
          "url_imagen": "http://lasalhajasdetoledoymas.com/cdn/shop/files/Notasdesalida_45.png?v=1738238608",
          "descuento": 0,
          "notas": [],
          "url": "https://lasalhajasdetoledoymas.com/products/moder-musk-perfume-unisex"
      },
      {
          "nombre": "BADEE HONOR Y GLORIA- Unisex",
          "precio": 42.06,
          "descripcion": "Experimenta el lujo y la elegancia con Bade'e Al Oud Honor & Glory. Más que un perfume, es una declaración de carácter . Sus notas de piña, canela y vainilla te transportarán a un mundo de sofisticación y refinamiento. Deja una impresión cautivadora con cada aplicación. Sumérgete en esta experiencia olfativa y eleva tu estilo a nuevas alturas. Formato 100ml.",
          "url_imagen": "http://lasalhajasdetoledoymas.com/cdn/shop/files/o_y_rojo_19.png?v=1729441642",
          "descuento": 0,
          "notas": [],
          "url": "https://lasalhajasdetoledoymas.com/products/badee-honor-y-gloria-unisex"
      },
      {
        "nombre": "24 Carat Pure Gold",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Azafrán",
          "Rosa",
          "Notas amaderadas",
          "Incienso",
          "Ámbar",
          "Benjuí",
          "Almizcle"
        ],
        "url": ""
      },
      {
        "nombre": "9 AM Blanco",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Bergamota",
          "Limón",
          "Lavanda",
          "Pimienta Rosa",
          "Cardamomo",
          "Menta",
          "Geranio",
          "Cedro",
          "Vetiver",
          "Ládano",
          "Pachulí"
        ],
        "url": ""
      },
      {
        "nombre": "9 AM Dive",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Sin datos disponibles"
        ],
        "url": ""
      },
      {
        "nombre": "9 AM Femme",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos",
          "Frutos rojos",
          "Jazmín",
          "Flor de azahar",
          "Rosa",
          "Almizcle",
          "Ámbar",
          "Vainilla"
        ],
        "url": ""
      },
      {
        "nombre": "9 AM rosa Set 4 pzs",
        "precio": 0,
        "descripcion": "Presentación especial; fórmula similar a 9 AM Femme",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos",
          "Frutos rojos",
          "Jazmín",
          "Flor de azahar",
          "Rosa",
          "Almizcle",
          "Ámbar",
          "Vainilla"
        ],
        "url": ""
      },
      {
        "nombre": "9-PM",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Manzana",
          "Canela",
          "Lavanda",
          "Bergamota",
          "Azahar",
          "Lirio de los valles",
          "Vainilla",
          "Haba tonka",
          "Ámbar",
          "Pachulí",
          "Almizcle"
        ],
        "url": ""
      },
      {
        "nombre": "Aaliya",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Sin datos disponibles"
        ],
        "url": ""
      },
      {
        "nombre": "Adeeb (libro)",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Sin datos disponibles"
        ],
        "url": ""
      },
      {
        "nombre": "Afeef",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Sin datos disponibles"
        ],
        "url": ""
      },
      {
        "nombre": "Ajeeb",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Sin datos disponibles"
        ],
        "url": ""
      },
      {
        "nombre": "Ajwaa (palmera)",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Sin datos disponibles"
        ],
        "url": ""
      },
      {
        "nombre": "Ajwad 60ml",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Frutas rojas",
          "Pera",
          "Notas cítricas",
          "Rosa",
          "Peonía",
          "Acordes florales",
          "Almizcle",
          "Vainilla",
          "Madera de cachemira"
        ],
        "url": ""
      },
      {
        "nombre": "Al Fakhar Wasam (libro)",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Al Ameed Silver",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Al Dirham",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos",
          "Bergamota",
          "Cardamomo",
          "Jazmín",
          "Rosa",
          "Lavanda",
          "Almizcle",
          "Sándalo",
          "Pachulí"
        ],
        "url": ""
      },
      {
        "nombre": "Al Haramain",
        "precio": 0,
        "descripcion": "Nombre de casa perfumera, no un perfume específico",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Al Nashama Caprice",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Al Noble Ameer",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Al Noble Safeer",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Al Noble Wazeer",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Ameeerat Al Arab Crema corporal",
        "precio": 0,
        "descripcion": "Versión crema corporal; aroma aproximado del perfume correspondiente",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos",
          "Frutas",
          "Florales ligeras",
          "Rosa",
          "Jazmín",
          "Almizcle",
          "Ámbar",
          "Maderas suaves"
        ],
        "url": ""
      },
      {
        "nombre": "Ameer Al Arab Hombre",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos",
          "Notas frescas",
          "Especias suaves",
          "Acordes amaderados",
          "Ámbar",
          "Almizcle",
          "Vainilla"
        ],
        "url": ""
      },
      {
        "nombre": "Ameer Al Arab Imperium",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Ameerat Al Arab",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Frutas",
          "Cítricos",
          "Florales ligeros",
          "Jazmín",
          "Rosa",
          "Flores blancas",
          "Ámbar",
          "Almizcle",
          "Maderas suaves"
        ],
        "url": ""
      },
      {
        "nombre": "Ameerat Al Arab P. Rose",
        "precio": 0,
        "descripcion": "Variante enfocada en la rosa",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Rosa predominante",
          "Ámbar",
          "Almizcle"
        ],
        "url": ""
      },
      {
        "nombre": "Andaleeb Azul *50ml",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Andaleeb Flora",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Arabian lady AZHA",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Asad Bourbon",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Pimienta negra",
          "Piña",
          "Lavanda",
          "Café",
          "Patchouli",
          "Ámbar",
          "Vainilla",
          "Sándalo",
          "Benjuí"
        ],
        "url": ""
      },
      {
        "nombre": "Asad Negro",
        "precio": 0,
        "descripcion": "Versión negra, misma composición que Asad Bourbon",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Pimienta negra",
          "Piña",
          "Lavanda",
          "Café",
          "Patchouli",
          "Ámbar",
          "Vainilla",
          "Sándalo",
          "Benjuí"
        ],
        "url": ""
      },
      {
        "nombre": "Asad Zanzibar",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Atlas *55ml",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Avant",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Awaan",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Azafrán",
          "Pimienta Rosa",
          "Flor de azahar",
          "Rosa",
          "Jazmín",
          "Ámbar",
          "Pachulí",
          "Almizcle",
          "Maderas"
        ],
        "url": ""
      },
      {
        "nombre": "Bade",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "BadeeHonor & Gloria",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Bade´e Al Oud For Glory",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Azafrán",
          "Lavanda",
          "Nuez moscada",
          "Pachulí",
          "Oud",
          "Almizcle"
        ],
        "url": ""
      },
      {
        "nombre": "Bade´e Al Oud Sublime",
        "precio": 0,
        "descripcion": "Sin descripción disponible; fórmula similar a For Glory",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Lavanda",
          "Azafrán",
          "Nuez moscada",
          "Pachulí",
          "Oud",
          "Almizcle"
        ],
        "url": ""
      },
      {
        "nombre": "Badee Al Oud Noble Blush",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Rosa",
          "Azafrán",
          "Violeta",
          "Madera de oud",
          "Ámbar",
          "Vainilla",
          "Benjuí",
          "Maderas dulces"
        ],
        "url": ""
      },
      {
        "nombre": "Badee al Oud Amethyst",
        "precio": 0,
        "descripcion": "Sin descripción disponible; inspirado en Atomic Rose",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Pimienta rosa",
          "Bergamota",
          "Rosa",
          "Jazmín",
          "Vainilla",
          "Ámbar",
          "Oud",
          "Maderas"
        ],
        "url": ""
      },
      {
        "nombre": "Baroque rouge extrait",
        "precio": 0,
        "descripcion": "Inspirado en Baccarat Rouge 540 Extrait",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Almendra amarga",
          "Azafrán",
          "Rosa egipcia",
          "Cedro",
          "Ámbar gris",
          "Maderas",
          "Almizcle"
        ],
        "url": ""
      },
      {
        "nombre": "Bint Hooran",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Azafrán",
          "Rosa",
          "Especias",
          "Caramelo",
          "Pachulí",
          "Notas dulces",
          "Ámbar",
          "Vainilla",
          "Almizcle",
          "Oud"
        ],
        "url": ""
      },
      {
        "nombre": "Black Safront",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Pomelo",
          "Azafrán",
          "Bayas de enebro",
          "Violeta negra",
          "Acorde de cuero",
          "Cashmeran",
          "Vetiver",
          "Frambuesa"
        ],
        "url": ""
      },
      {
        "nombre": "Breeze",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Bucephalus XI",
        "precio": 0,
        "descripcion": "Según ficha oficial de Armaf",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Toronja",
          "Bergamota",
          "Pimienta rosa",
          "Azafrán",
          "Lavanda",
          "Geranio",
          "Vetiver",
          "Pachulí",
          "Cedro",
          "Ládano"
        ],
        "url": ""
      },
      {
        "nombre": "Club de Nuit Iconic Blue",
        "precio": 0,
        "descripcion": "Sin descripción oficial completa",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos",
          "Jengibre",
          "Lavanda",
          "Maderas",
          "Incienso",
          "Vetiver",
          "Pachulí"
        ],
        "url": ""
      },
      {
        "nombre": "Club de Nuit Iconic Blue Set",
        "precio": 0,
        "descripcion": "Set, mismas notas que Iconic Blue",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos",
          "Jengibre",
          "Lavanda",
          "Maderas",
          "Incienso",
          "Vetiver",
          "Pachulí"
        ],
        "url": ""
      },
      {
        "nombre": "Club de Nuit Untold",
        "precio": 0,
        "descripcion": "Clon de Baccarat Rouge 540 Extrait (aproximado)",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Azafrán",
          "Almendra amarga",
          "Cedro",
          "Jazmín",
          "Almizcle",
          "Maderas",
          "Ámbar gris"
        ],
        "url": ""
      },
      {
        "nombre": "Club de Nuit Untoldt Set",
        "precio": 0,
        "descripcion": "Set, mismas notas que Untold",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Azafrán",
          "Almendra amarga",
          "Cedro",
          "Jazmín",
          "Almizcle",
          "Maderas",
          "Ámbar gris"
        ],
        "url": ""
      },
      {
        "nombre": "Club de Nuit Urban Man Elixir",
        "precio": 0,
        "descripcion": "Sin descripción oficial completa",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Bergamota",
          "Pimienta rosa",
          "Jazmín",
          "Azahar",
          "Lavanda",
          "Geranio",
          "Elemi",
          "Tagetes",
          "Vetiver",
          "Azafrán",
          "Pachulí",
          "Ámbar",
          "Ambroxan",
          "Cedro",
          "Ládano"
        ],
        "url": ""
      },
      {
        "nombre": "Club de Nuit Woman Set 4 pzas",
        "precio": 0,
        "descripcion": "Set para la versión femenina",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Naranja",
          "Toronja",
          "Durazno",
          "Bergamota",
          "Rosa",
          "Jazmín",
          "Lichi",
          "Geranio",
          "Pachulí",
          "Vainilla",
          "Almizcle",
          "Vetiver"
        ],
        "url": ""
      },
      {
        "nombre": "Como moiselle",
        "precio": 0,
        "descripcion": "Inspirado en Coco Mademoiselle (aproximado)",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Naranja",
          "Bergamota",
          "Pomelo",
          "Rosa",
          "Jazmín",
          "Lichi",
          "Pachulí",
          "Vainilla",
          "Vetiver",
          "Almizcle"
        ],
        "url": ""
      },
      {
        "nombre": "Confidencial Gold",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Sin datos disponibles"
        ],
        "url": ""
      },
      {
        "nombre": "Confidencial Platinum",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Sin datos disponibles"
        ],
        "url": ""
      },
      {
        "nombre": "Coral Blush",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Sin datos disponibles"
        ],
        "url": ""
      },
      {
        "nombre": "Crow",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Sin datos disponibles"
        ],
        "url": ""
      },
      {
        "nombre": "Dar Al Shabaab",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Sin datos disponibles"
        ],
        "url": ""
      },
      {
        "nombre": "Dark Aoud",
        "precio": 0,
        "descripcion": "Inspirado en fragancias estilo Montale",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Maderas oscuras",
          "Oud",
          "Toques especiados"
        ],
        "url": ""
      },
      {
        "nombre": "Dirham *10ml Hombre",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos",
          "Bergamota",
          "Cardamomo",
          "Jazmín",
          "Rosa",
          "Lavanda",
          "Almizcle",
          "Sándalo",
          "Pachulí"
        ],
        "url": ""
      },
      {
        "nombre": "Dirham Gold *Hombre",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Manzana",
          "Bergamota",
          "Lichi",
          "Jazmín",
          "Rosa",
          "Violeta",
          "Almizcle",
          "Sándalo",
          "Vainilla"
        ],
        "url": ""
      },
      {
        "nombre": "Dirham Rosa Mujer",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Acordes florales",
          "Rosa predominante"
        ],
        "url": ""
      },
      {
        "nombre": "Eclaire",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Sin datos disponibles"
        ],
        "url": ""
      },
      {
        "nombre": "Eclat de Lune",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Sin datos disponibles"
        ],
        "url": ""
      },
      {
        "nombre": "Ejaazi",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos",
          "Frescos",
          "Especias suaves",
          "Maderas",
          "Ámbar",
          "Almizcle",
          "Cedro"
        ],
        "url": ""
      },
      {
        "nombre": "Emaan",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Sin datos disponibles"
        ],
        "url": ""
      },
      {
        "nombre": "Eternal Oud",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Oud",
          "Azafrán",
          "Rosa",
          "Ámbar",
          "Vainilla"
        ],
        "url": ""
      },
      {
        "nombre": "Eternal Touch",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Sin datos disponibles"
        ],
        "url": ""
      },
      {
        "nombre": "Fakhar Black",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Bergamota",
          "Manzana",
          "Jengibre",
          "Lavanda",
          "Salvia",
          "Geranio",
          "Ámbar",
          "Madera",
          "Tonka",
          "Vetiver"
        ],
        "url": ""
      },
      {
        "nombre": "Fakhar Extrait",
        "precio": 0,
        "descripcion": "Versión más concentrada de Fakhar Black",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Bergamota",
          "Manzana",
          "Jengibre",
          "Lavanda",
          "Salvia",
          "Geranio",
          "Ámbar",
          "Madera",
          "Tonka",
          "Vetiver"
        ],
        "url": ""
      },
      {
        "nombre": "Fakhar Rose",
        "precio": 0,
        "descripcion": "Versión femenina de Fakhar",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Manzana",
          "Fresa",
          "Pera",
          "Rosa",
          "Peonía",
          "Magnolia",
          "Almizcle",
          "Sándalo",
          "Vainilla"
        ],
        "url": ""
      },
      {
        "nombre": "Flaming Elixir",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Sin datos disponibles"
        ],
        "url": ""
      },
      {
        "nombre": "Florence",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Sin datos disponibles"
        ],
        "url": ""
      },
      {
        "nombre": "Forbidden Love",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Sin datos disponibles"
        ],
        "url": ""
      },
      {
        "nombre": "Fusion Intense",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Sin datos disponibles"
        ],
        "url": ""
      },
      {
        "nombre": "Glacier",
        "precio": 0,
        "descripcion": "Inspirado en fragancias frescas",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Limón",
          "Menta",
          "Notas verdes",
          "Geranio",
          "Lavanda",
          "Romero",
          "Vetiver",
          "Musgo",
          "Maderas suaves"
        ],
        "url": ""
      },
      {
        "nombre": "Haayati Al Maleky",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Habeebat QalbI (NO)",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Hala",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Hareem Al Sultan Gold *35ml",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Haya",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Hayaati Florence",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Hayaati Gold Elixir",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Hayaati (Negro)",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Hayaatim",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Iam The Queen",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Inciense Ebony",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Infantil Happy Brush",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Infantil Sing",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Infantil Stop White Go",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Infini Oud",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Jazzab Negro",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Jazzab Oro",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Jean Lowe Inmortal",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Kair Fusión",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Kair Pistachio",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Khair Confecction",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Khajanr",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Khamrah",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Khamrah Qagwa",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Khamrah Set 3 pzs",
        "precio": 0,
        "descripcion": "Set, sin datos adicionales",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Kings & Queens Pure Aruba",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Kings & Queens Pure Blosson",
        "precio": 0,
        "descripcion": "Aproximación floral",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Frutales",
          "Cítricos",
          "Rosa",
          "Jazmín",
          "Almizcle",
          "Maderas"
        ],
        "url": ""
      },
      {
        "nombre": "Kingsman",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "La Collection d´antiquites 1910",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Lail Maleki",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Le Parffait",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Leen",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Liam",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Love Spark",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Luxury Amber Roug Orientica",
        "precio": 0,
        "descripcion": "Aproximación oriental",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos",
          "Especias suaves",
          "Ámbar",
          "Canela/Clavo",
          "Maderas",
          "Almizcle",
          "Ámbar intenso"
        ],
        "url": ""
      },
      {
        "nombre": "Luxury Royal Amber Orientica",
        "precio": 0,
        "descripcion": "Aproximación opulenta",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos",
          "Especias",
          "Ámbar real",
          "Incienso",
          "Oud",
          "Maderas",
          "Almizcle"
        ],
        "url": ""
      },
      {
        "nombre": "Luxury Velvet Gold",
        "precio": 0,
        "descripcion": "Aproximación con notas dulces y ambarinas",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Frutal",
          "Cítrica",
          "Florales",
          "Especias",
          "Ámbar",
          "Vainilla",
          "Almizcle"
        ],
        "url": ""
      },
      {
        "nombre": "Maahir Black",
        "precio": 0,
        "descripcion": "Aproximación masculina intensa",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Especiadas",
          "Cítricas",
          "Amaderados (posible oud)",
          "Ámbar",
          "Almizcle",
          "Maderas"
        ],
        "url": ""
      },
      {
        "nombre": "Maahir Silver (caballo plata)",
        "precio": 0,
        "descripcion": "Variante de Maahir Black, más fresca o metálica",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Variante de Maahir Black, con apertura más fresca o metálica"
        ],
        "url": ""
      },
      {
        "nombre": "Maharjan",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Malik Al Tyoor",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Malika Verde 20ml",
        "precio": 0,
        "descripcion": "Aproximación fresca y verde",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Verdes",
          "Frescas",
          "Florales ligeros",
          "Almizcle",
          "Maderas suaves"
        ],
        "url": ""
      },
      {
        "nombre": "Mayar Cherry",
        "precio": 0,
        "descripcion": "Aproximación gourmand con nota de cereza",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Frutas rojas (cereza)",
          "Rosa",
          "Jazmín",
          "Vainilla",
          "Almizcle"
        ],
        "url": ""
      },
      {
        "nombre": "Mayar Natural",
        "precio": 0,
        "descripcion": "Aproximación sutil y natural",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos frescos",
          "Florales ligeros",
          "Almizcle"
        ],
        "url": ""
      },
      {
        "nombre": "Mayar Rosa",
        "precio": 0,
        "descripcion": "Enfatiza el acorde de rosa",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos suaves",
          "Rosa predominante",
          "Jazmín",
          "Almizcle",
          "Ámbar"
        ],
        "url": ""
      },
      {
        "nombre": "Mazaaji",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Megara 50ml",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Moder Musk",
        "precio": 0,
        "descripcion": "Aproximación moderna centrada en almizcle",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Almizcle",
          "Ámbar",
          "Maderas"
        ],
        "url": ""
      },
      {
        "nombre": "Mousuf Ramadi",
        "precio": 0,
        "descripcion": "Aproximación especiada y amaderada",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos",
          "Especias sutiles",
          "Especiado",
          "Amaderado",
          "Resinoso",
          "Ámbar",
          "Oud"
        ],
        "url": ""
      },
      {
        "nombre": "Mousuf Wardi Rosa",
        "precio": 0,
        "descripcion": "Variante que resalta la rosa",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos ligeros",
          "Rosa intensa",
          "Almizcle",
          "Maderas suaves"
        ],
        "url": ""
      },
      {
        "nombre": "Musk Al Tahara *12ml",
        "precio": 0,
        "descripcion": "Aroma centrado en almizcle puro",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Almizcle puro",
          "Matices florales",
          "Toques ambarinos"
        ],
        "url": ""
      },
      {
        "nombre": "Najdia",
        "precio": 0,
        "descripcion": "Aproximación oriental con oud",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Especias",
          "Cítricos",
          "Oud",
          "Incienso",
          "Ámbar",
          "Almizcle"
        ],
        "url": ""
      },
      {
        "nombre": "Nebras",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Now Rave",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Now Rouge Rouge",
        "precio": 0,
        "descripcion": "Aproximación intensa",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Frutas rojas",
          "Especias suaves",
          "Rosa",
          "Florales",
          "Ámbar",
          "Almizcle"
        ],
        "url": ""
      },
      {
        "nombre": "Now Rouge Rve",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Opulent & Leather",
        "precio": 0,
        "descripcion": "Aproximación robusta con cuero",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Especias",
          "Frutales",
          "Cuero",
          "Maderas",
          "Ámbar",
          "Almizcle"
        ],
        "url": ""
      },
      {
        "nombre": "Oud Najdia",
        "precio": 0,
        "descripcion": "Enfocado en el oud",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Especias",
          "Cítricos",
          "Oud",
          "Ámbar",
          "Almizcle"
        ],
        "url": ""
      },
      {
        "nombre": "Oxana",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Pacific Blue",
        "precio": 0,
        "descripcion": "Aproximación fresca y veraniega",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos",
          "Manzana verde",
          "Acuáticos",
          "Florales ligeros",
          "Almizcle",
          "Maderas suaves"
        ],
        "url": ""
      },
      {
        "nombre": "Philos Centro",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "Pink Shimmer Secret",
        "precio": 0,
        "descripcion": "Aproximación luminosa",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Bergamota",
          "Pomelo",
          "Frutales",
          "Rosa",
          "Jazmín",
          "Lichi",
          "Almizcle",
          "Ámbar",
          "Vainilla"
        ],
        "url": ""
      },
      {
        "nombre": "Pink Shimmer Secret Intense",
        "precio": 0,
        "descripcion": "Versión intensa con mayor presencia floral",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Mayor presencia floral",
          "Base ámbar y almizcle"
        ],
        "url": ""
      },
      {
        "nombre": "Pink Velvet",
        "precio": 0,
        "descripcion": "Aproximación elegante y aterciopelada",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Notas frutales o cítricas suaves",
          "Rosa con toque de violeta",
          "Almizcle",
          "Ámbar",
          "Maderas suaves"
        ],
        "url": ""
      },
      {
        "nombre": "Pisa",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [ "Sin datos disponibles" ],
        "url": ""
      },
      {
        "nombre": "KHALIS OUDI Pure oudi",
        "precio": 0,
        "descripcion": "Aproximación pura de oud",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Especias",
          "Cítricos ligeros",
          "Oud puro",
          "Ámbar",
          "Almizcle",
          "Maderas"
        ],
        "url": ""
      },
      {
        "nombre": "Pure Oudi *50ml",
        "precio": 0,
        "descripcion": "Muy similar a KHALIS OUDI",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Oud",
          "Ámbar",
          "Almizcle"
        ],
        "url": ""
      },
      {
        "nombre": "Qaed Al Fursan",
        "precio": 0,
        "descripcion": "Aproximación regio",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos",
          "Especias sutiles",
          "Florales",
          "Amaderados",
          "Ámbar",
          "Oud",
          "Almizcle"
        ],
        "url": ""
      },
      {
        "nombre": "Qasaed Al Sultan",
        "precio": 0,
        "descripcion": "Inspirado en la majestuosidad de un sultán",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Bergamota",
          "Especias",
          "Oud",
          "Rosa",
          "Jazmín",
          "Ámbar",
          "Almizcle",
          "Maderas"
        ],
        "url": ""
      },
      {
        "nombre": "Qimmah Hombre",
        "precio": 0,
        "descripcion": "Aproximación masculina enérgica",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos",
          "Pimienta",
          "Especias",
          "Acordes amaderados",
          "Almizcle",
          "Ámbar"
        ],
        "url": ""
      },
      {
        "nombre": "Qimmah Mujer",
        "precio": 0,
        "descripcion": "Versión femenina, más suave",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos suaves",
          "Frutales",
          "Rosa",
          "Jazmín",
          "Almizcle",
          "Ámbar"
        ],
        "url": ""
      },
      {
        "nombre": "Ra´ed Luxe",
        "precio": 0,
        "descripcion": "Aproximación lujosa",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos",
          "Especias",
          "Jazmín",
          "Rosa",
          "Oud",
          "Ámbar",
          "Almizcle"
        ],
        "url": ""
      },
      {
        "nombre": "Raghba set duo",
        "precio": 0,
        "descripcion": "Estilo gourmand",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Frutas",
          "Especias suaves",
          "Canela",
          "Caramelo",
          "Ámbar",
          "Almizcle",
          "Vainilla"
        ],
        "url": ""
      },
      {
        "nombre": "Ramaad Al Oud",
        "precio": 0,
        "descripcion": "Homenaje al oud",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Especias",
          "Cítricos",
          "Oud intenso",
          "Ámbar",
          "Almizcle",
          "Maderas"
        ],
        "url": ""
      },
      {
        "nombre": "Ramz Genuine",
        "precio": 0,
        "descripcion": "Intenta reflejar autenticidad oriental",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Especias",
          "Cítricos",
          "Amaderados",
          "Florales sutiles",
          "Oud",
          "Ámbar",
          "Almizcle"
        ],
        "url": ""
      },
      {
        "nombre": "Rawaée",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Sin datos disponibles"
        ],
        "url": ""
      },
      {
        "nombre": "Reyna Pour Femme",
        "precio": 0,
        "descripcion": "Aproximación femenina elegante",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos",
          "Frutas rojas",
          "Rosa",
          "Jazmín",
          "Flor de azahar",
          "Almizcle",
          "Vainilla",
          "Ámbar"
        ],
        "url": ""
      },
      {
        "nombre": "Rouat Al Oud (NO)",
        "precio": 0,
        "descripcion": "Indicador de no registro oficial",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Sin datos disponibles"
        ],
        "url": ""
      },
      {
        "nombre": "Salvo Intense",
        "precio": 0,
        "descripcion": "Versión intensa",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos",
          "Especias",
          "Florales",
          "Ámbar",
          "Almizcle",
          "Maderas (intenso)"
        ],
        "url": ""
      },
      {
        "nombre": "Sceptre Malachite",
        "precio": 0,
        "descripcion": "Aproximación con acordes verdes y especiados",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos",
          "Acordes verdes",
          "Especias suaves",
          "Leve toque floral",
          "Ámbar",
          "Almizcle",
          "Maderas"
        ],
        "url": ""
      },
      {
        "nombre": "Sehr",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Sin datos disponibles"
        ],
        "url": ""
      },
      {
        "nombre": "Shaheen Gold",
        "precio": 0,
        "descripcion": "Aproximación opulenta para hombres",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos",
          "Especias",
          "Jazmín",
          "Rosa",
          "Oud",
          "Ámbar",
          "Almizcle",
          "Maderas"
        ],
        "url": ""
      },
      {
        "nombre": "Sheikh Al Shuyukh Luxe",
        "precio": 0,
        "descripcion": "Aproximación regio y lujosa",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos",
          "Especias",
          "Oud",
          "Incienso",
          "Ámbar",
          "Almizcle",
          "Maderas"
        ],
        "url": ""
      },
      {
        "nombre": "Smoky Touch",
        "precio": 0,
        "descripcion": "Toque ahumado moderno",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Notas ahumadas",
          "Cítricos",
          "Especias",
          "Acorde floral tenue",
          "Maderas",
          "Almizcle"
        ],
        "url": ""
      },
      {
        "nombre": "So Candid *85ml",
        "precio": 0,
        "descripcion": "Fresco y juvenil",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos",
          "Frutas",
          "Florales ligeros",
          "Almizcle",
          "Ámbar"
        ],
        "url": ""
      },
      {
        "nombre": "Space Age",
        "precio": 0,
        "descripcion": "Sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Sin datos disponibles"
        ],
        "url": ""
      },
      {
        "nombre": "Taj Al Malik The King Crown",
        "precio": 0,
        "descripcion": "Aproximación regio majestuosa",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos",
          "Especias",
          "Oud",
          "Rosa",
          "Jazmín",
          "Ámbar",
          "Almizcle",
          "Maderas"
        ],
        "url": ""
      },
      {
        "nombre": "Taj Al Malik The King Crown 10ml",
        "precio": 0,
        "descripcion": "Versión 10ml del King Crown",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos",
          "Especias",
          "Oud",
          "Rosa",
          "Jazmín",
          "Ámbar",
          "Almizcle",
          "Maderas"
        ],
        "url": ""
      },
      {
        "nombre": "The Artist nº1 VS (Portrait of a Lady-Frederic Malle)",
        "precio": 0,
        "descripcion": "Inspirado en Portrait of a Lady",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Frutales",
          "Especiados",
          "Rosa",
          "Pachulí",
          "Canela",
          "Ámbar",
          "Incienso",
          "Maderas"
        ],
        "url": ""
      },
      {
        "nombre": "The Kingdom",
        "precio": 0,
        "descripcion": "Aproximación majestuosa",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos",
          "Especias",
          "Florales",
          "Oud",
          "Ámbar",
          "Almizcle",
          "Maderas"
        ],
        "url": ""
      },
      {
        "nombre": "Toro",
        "precio": 0,
        "descripcion": "Aproximación masculina robusta",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos",
          "Pimienta",
          "Especias",
          "Acordes amaderados intensos",
          "Almizcle",
          "Ámbar",
          "Cuero"
        ],
        "url": ""
      },
      {
        "nombre": "Turaya",
        "precio": 0,
        "descripcion": "Aproximación suave y elegante",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos",
          "Frutas frescas",
          "Florales (rosa, jazmín, lirio)",
          "Almizcle",
          "Ámbar"
        ],
        "url": ""
      },
      {
        "nombre": "Velvet Rose",
        "precio": 0,
        "descripcion": "Aproximación aterciopelada",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos",
          "Leves frutos rojos",
          "Rosa intensificada",
          "Violeta (posible)",
          "Ámbar",
          "Almizcle",
          "Maderas suaves"
        ],
        "url": ""
      },
      {
        "nombre": "Victoria Flower",
        "precio": 0,
        "descripcion": "Aproximación floral elegante",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos",
          "Notas verdes",
          "Florales elegantes (rosa, jazmín, peonía)",
          "Almizcle",
          "Maderas suaves"
        ],
        "url": ""
      },
      {
        "nombre": "Victorioso Victory",
        "precio": 0,
        "descripcion": "Aproximación triunfal",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos",
          "Especias",
          "Florales intensos (rosa, jazmín)",
          "Ámbar",
          "Oud",
          "Almizcle"
        ],
        "url": ""
      },
      {
        "nombre": "Wajood (nebras plata)",
        "precio": 0,
        "descripcion": "Versión 'plata' de Nebras",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Sin datos disponibles"
        ],
        "url": ""
      },
      {
        "nombre": "Washwashah set duo",
        "precio": 0,
        "descripcion": "Set, sin descripción disponible",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Sin datos disponibles"
        ],
        "url": ""
      },
      {
        "nombre": "Yara 50ml",
        "precio": 0,
        "descripcion": "Aproximación femenina moderna",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos",
          "Frutas",
          "Rosa",
          "Jazmín",
          "Orquídea",
          "Almizcle",
          "Ámbar"
        ],
        "url": ""
      },
      {
        "nombre": "Yara Candy",
        "precio": 0,
        "descripcion": "Aproximación gourmand",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Frutales con toques de caramelo",
          "Florales sutiles",
          "Vainilla",
          "Almizcle"
        ],
        "url": ""
      },
      {
        "nombre": "Yara Moi",
        "precio": 0,
        "descripcion": "Aproximación moderna y personal",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos",
          "Ligeros acordes frutales",
          "Florales (jazmín, rosa)",
          "Almizcle",
          "Ámbar"
        ],
        "url": ""
      },
      {
        "nombre": "Yara Rosa",
        "precio": 0,
        "descripcion": "Variante enfatizando la rosa",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos suaves",
          "Rosa predominante",
          "Jazmín",
          "Almizcle",
          "Ámbar"
        ],
        "url": ""
      },
      {
        "nombre": "Yara Rosa *10ml",
        "precio": 0,
        "descripcion": "Misma fórmula que Yara Rosa en formato 10ml",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos suaves",
          "Rosa predominante",
          "Jazmín",
          "Almizcle",
          "Ámbar"
        ],
        "url": ""
      },
      {
        "nombre": "Yara Tous",
        "precio": 0,
        "descripcion": "Aproximación universal para uso diario",
        "url_imagen": "",
        "descuento": 0,
        "notas": [
          "Cítricos",
          "Frutas frescas",
          "Florales (rosa, jazmín, toque exótico)",
          "Almizcle",
          "Ámbar",
          "Maderas suaves"
        ],
        "url": ""
      }
    ]
  ]
};

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState<{
    nombre: string;
    precio: number;
    descuento: number;
    cantidad: number;
  }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const flattenedPerfumes = useMemo(() => {
    // Flatten the nested array structure
    return perfumesData.perfumes[0] as Perfume[];
  }, []);

  const filteredPerfumes = useMemo(() => {
    try {
      console.log('Filtering perfumes with search term:', searchTerm);
      const searchTerms = searchTerm
        .toLowerCase()
        .split(',')
        .map(term => term.trim())
        .filter(Boolean)
        .slice(0, 5);
      
      if (searchTerms.length === 0) return flattenedPerfumes;
      
      const perfumesWithMatches: PerfumeWithMatches[] = flattenedPerfumes.map(perfume => {
        let coincidencias = 0;
        
        searchTerms.forEach(term => {
          if (
            perfume.nombre.toLowerCase().includes(term) ||
            perfume.notas.some(nota => nota.toLowerCase().includes(term))
          ) {
            coincidencias++;
          }
        });
        
        return {
          ...perfume,
          coincidencias
        };
      });
      
      console.log('Filtered perfumes:', perfumesWithMatches);
      return perfumesWithMatches
        .filter(perfume => perfume.coincidencias > 0)
        .sort((a, b) => b.coincidencias - a.coincidencias);
    } catch (err) {
      console.error('Error in filteredPerfumes:', err);
      setError(err instanceof Error ? err : new Error('An error occurred'));
      return [];
    }
  }, [searchTerm, flattenedPerfumes]);

  const handleAddToCart = (perfumeName: string) => {
    try {
      console.log('Adding to cart:', perfumeName);
      const perfume = flattenedPerfumes.find(p => p.nombre === perfumeName);
      if (!perfume) {
        console.error('Perfume not found:', perfumeName);
        return;
      }

      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.nombre === perfumeName);
        if (existingItem) {
          return prevItems.map(item =>
            item.nombre === perfumeName
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          );
        }
        return [...prevItems, {
          nombre: perfume.nombre,
          precio: perfume.precio,
          descuento: perfume.descuento,
          cantidad: 1
        }];
      });
      
      toast.success(`Added ${perfumeName} to cart`);
    } catch (err) {
      console.error('Error in handleAddToCart:', err);
      toast.error('Failed to add item to cart');
    }
  };

  const handleRemoveFromCart = (nombre: string) => {
    try {
      console.log('Removing from cart:', nombre);
      setCartItems(prevItems => prevItems.filter(item => item.nombre !== nombre));
      toast.success(`Removed ${nombre} from cart`);
    } catch (err) {
      console.error('Error in handleRemoveFromCart:', err);
      toast.error('Failed to remove item from cart');
    }
  };

  const handleUpdateQuantity = (nombre: string, cantidad: number) => {
    try {
      console.log('Updating quantity:', { nombre, cantidad });
      if (cantidad === 0) {
        handleRemoveFromCart(nombre);
        return;
      }
      
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.nombre === nombre ? { ...item, cantidad } : item
        )
      );
    } catch (err) {
      console.error('Error in handleUpdateQuantity:', err);
      toast.error('Failed to update quantity');
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Something went wrong</h2>
          <p className="mt-2 text-gray-600">{error.message}</p>
          <button 
            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/20">
      <Header 
        cartItemCount={cartItems.reduce((sum, item) => sum + item.cantidad, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <main className="flex-1 container py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Luxury Fragrances</h1>
          <p className="text-muted-foreground">
            Discover your perfect scent through our curated collection
          </p>
        </div>

        <SearchBar 
          value={searchTerm} 
          onChange={setSearchTerm} 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPerfumes.map((perfume, index) => (
            <PerfumeCard
              key={index}
              perfume={perfume}
              onAddToCart={() => handleAddToCart(perfume.nombre)}
            />
          ))}
        </div>

        {filteredPerfumes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No perfumes found matching your search.</p>
          </div>
        )}
      </main>

      <Footer />

      <AnimatePresence>
        {isCartOpen && (
          <Cart
            items={cartItems}
            onClose={() => setIsCartOpen(false)}
            onRemoveItem={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
