# GHT Estudio Legal - Sitio Web Corporativo

Sitio web oficial de GHT Estudio Legal, desarrollado con React, TypeScript y Vite.

## Tecnologías

- **React 18** + **TypeScript**
- **Vite** como bundler y servidor de desarrollo
- **React Router DOM** para navegación
- **react-markdown** para renderizado de entradas del blog
- **GitHub Pages** para el despliegue

## Estructura del proyecto

```
gtlegal.github.io/
├── public/               # Archivos estáticos (imágenes, favicon, CNAME)
├── src/
│   ├── components/       # Componentes reutilizables (Navbar, Hero, Services, etc.)
│   ├── pages/            # Páginas de React Router (BlogListPage, BlogPostPage)
│   ├── posts/            # Entradas del blog en TypeScript
│   ├── App.tsx           # Componente raíz y rutas
│   ├── App.css           # Estilos globales
│   └── main.tsx          # Punto de entrada
├── index.html
├── vite.config.js
└── package.json
```

## Desarrollo local

```bash
npm install
npm run dev
```

El servidor de desarrollo estará disponible en `http://localhost:5173`.

## Otros comandos

```bash
npm run build       # Genera la build de producción en /dist
npm run preview     # Previsualiza la build de producción localmente
npm run typecheck   # Verifica tipos sin emitir archivos
```

## Despliegue

El sitio se despliega automáticamente en GitHub Pages desde la rama `main`. Para publicar manualmente:

```bash
npm run build
# Copiar el contenido de /dist a la rama gh-pages o usar gh-pages CLI
```

## Secciones del sitio

1. **Hero** — Presentación principal
2. **Servicios** — Áreas legales especializadas
3. **Equipo** — Perfiles del equipo profesional
4. **Experiencia** — Historia y logros de la firma
5. **Blog** — Artículos y análisis jurídicos
6. **Contacto** — Información de contacto
7. **Footer** — Enlaces y redes sociales

## Política de contribuciones

**Este repositorio no acepta contribuciones externas.** Es el sitio oficial de GHT Estudio Legal y está mantenido exclusivamente por el equipo interno.

Para consultas sobre servicios legales, contactar directamente a través del sitio web.

---

*GHT Estudio Legal — Experiencia Legal de Confianza*
