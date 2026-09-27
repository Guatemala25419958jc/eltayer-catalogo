# ELTAYER | Muebles de autor

Catálogo de una página, HTML/CSS/JavaScript sin dependencias ni base de datos. 4 colecciones y 40 productos conceptuales editables.

## Vista local

Con Node.js instalado: `npm run dev` y abrir http://localhost:3000. También se puede abrir index.html directamente.

## Publicar en Vercel mediante GitHub

1. Subir el contenido de esta carpeta a un repositorio de GitHub.
2. Importar el repositorio desde Vercel → Add New → Project.
3. Seleccionar el preset **Other**, comando de construcción `npm run build` y directorio de salida `dist` (ya definidos en vercel.json).
4. Pulsar Deploy. No se requieren variables de entorno.

Alternativa con la CLI autenticada de Vercel: `vercel --prod` desde esta carpeta.

## Editar contenido

- `catalog.js`: número de WhatsApp, categorías, nombres, descripciones y materiales.
- `app.js`: mensajes de WhatsApp e interacciones.
- `index.html`: contenido editorial y enlaces sociales. Instagram y Facebook apuntan a las páginas principales de las plataformas hasta disponer de los perfiles oficiales.
- `styles.css`: colores, tipografías, tamaños y responsive.
- `assets/`: fotografía generada para este concepto. Cada imagen de colección contiene 10 fotografías en una cuadrícula de 2 columnas por 5 filas; el índice de cada producto determina su fotografía mediante CSS.

**Antes de usar comercialmente:** sustituir `521XXXXXXXXXX` por el número real. El placeholder no corresponde a una cuenta operativa. Los nombres, materiales e imágenes son una propuesta de catálogo; reemplazarlos o validarlos con las piezas reales de ELTAYER.

Google Fonts proporciona DM Sans y Libre Caslon Display; hay fuentes de respaldo locales. Las fotografías se sirven desde el propio sitio.

## Comprobaciones

`npm test` comprueba las cuatro colecciones, 40 nombres únicos, 10 productos por categoría y los archivos de publicación. `npm run build` genera la carpeta estática dist.
