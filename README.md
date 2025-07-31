# GT Legal Solutions - Sitio Web Corporativo

Un sitio web moderno y profesional para la firma de abogados GT Legal Solutions, desarrollado con HTML5, CSS3 y JavaScript vanilla.

## 🏛️ Descripción

GT Legal Solutions es una firma de abogados especializada en múltiples áreas del derecho con más de 20 años de experiencia. Este sitio web presenta sus servicios, equipo profesional y facilita el contacto con potenciales clientes.

## 🚀 Características

- **Diseño Responsivo**: Optimizado para dispositivos móviles, tablets y desktop
- **Navegación Suave**: Scroll suave entre secciones con efectos visuales
- **Formulario de Contacto**: Sistema de validación en tiempo real
- **Animaciones**: Efectos de scroll y transiciones suaves
- **SEO Optimizado**: Meta tags y estructura semántica
- **Rendimiento**: Código optimizado y carga rápida

## 📁 Estructura del Proyecto

```
gtlegal.github.io/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Funcionalidades JavaScript
└── README.md           # Este archivo
```

## 🎨 Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Variables CSS, Grid, Flexbox, animaciones
- **JavaScript ES6+**: Funcionalidades interactivas
- **Font Awesome**: Iconografía profesional
- **Google Fonts**: Tipografías Playfair Display y Open Sans

## 📱 Secciones del Sitio

1. **Header/Navegación**: Menú fijo con navegación suave
2. **Hero**: Presentación principal con estadísticas destacadas
3. **Servicios**: Cuatro áreas legales especializadas
4. **Equipo**: Perfiles de los abogados principales
5. **Experiencia**: Historia y logros de la firma
6. **Contacto**: Información de contacto y formulario
7. **Footer**: Enlaces adicionales y redes sociales

## 🛠️ Instalación y Uso

1. **Clonar o descargar** el repositorio:
```bash
git clone https://github.com/usuario/gtlegal.github.io.git
```

2. **Abrir** el archivo `index.html` en un navegador web

3. **Para desarrollo local**, usar un servidor local:
```bash
# Con Python
python -m http.server 8000

# Con Node.js (http-server)
npx http-server

# Con Live Server (VS Code)
# Instalar extensión Live Server y hacer clic derecho > "Open with Live Server"
```

## ⚙️ Funcionalidades JavaScript

### Navegación
- Menú hamburguesa para móviles
- Scroll suave entre secciones
- Destacado de sección activa

### Formulario de Contacto
- Validación en tiempo real
- Mensajes de error personalizados
- Sistema de notificaciones
- Validación de email y teléfono

### Efectos Visuales
- Animaciones de scroll
- Contador animado en estadísticas
- Efectos hover en tarjetas
- Botón "volver arriba"

### Optimización
- Lazy loading para imágenes
- Observadores de intersección
- Debounce en eventos de scroll

## 🎨 Personalización

### Colores
Las variables CSS están definidas en `:root` para fácil personalización:

```css
:root {
    --primary-color: #1a365d;    /* Azul corporativo */
    --secondary-color: #2c5282;  /* Azul secundario */
    --accent-color: #3182ce;     /* Azul de acento */
    --gold-color: #d69e2e;       /* Dorado */
    /* ... más variables */
}
```

### Contenido
Para personalizar el contenido:

1. **Información de la empresa**: Editar textos en `index.html`
2. **Servicios**: Modificar las tarjetas en la sección `#servicios`
3. **Equipo**: Actualizar perfiles en la sección `#equipo`
4. **Contacto**: Cambiar información en la sección `#contacto`

### Imágenes
Reemplazar las imágenes placeholder:
- Fotos del equipo: `https://via.placeholder.com/300x300`
- Imagen de experiencia: `https://via.placeholder.com/600x400`

## 📱 Responsive Design

El sitio está optimizado para:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

Breakpoints principales:
```css
@media (max-width: 768px) { /* Tablet y móvil */ }
@media (max-width: 480px) { /* Móvil pequeño */ }
```

## 🔧 Configuración del Formulario

Para activar el formulario de contacto en producción:

1. **Backend**: Configurar un endpoint para recibir los datos
2. **JavaScript**: Modificar la función `simulateFormSubmission()` en `script.js`
3. **Validación**: Ajustar reglas de validación según necesidades

Ejemplo de integración con Formspree:
```javascript
async function handleFormSubmit(e) {
    e.preventDefault();
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: new FormData(contactForm)
    });
    // Manejar respuesta...
}
```

## 🚀 Deploy

### GitHub Pages
1. Subir archivos al repositorio
2. Ir a Settings > Pages
3. Seleccionar rama main
4. El sitio estará disponible en `https://usuario.github.io/gtlegal.github.io`

### Netlify
1. Conectar repositorio en Netlify
2. Deploy automático con cada push
3. Dominio personalizado disponible

### Vercel
1. Importar proyecto desde GitHub
2. Deploy automático configurado
3. Preview deployments en pull requests

## 📊 SEO y Performance

### Meta Tags Incluidos
- Title y description optimizados
- Viewport para responsive
- Charset UTF-8
- Open Graph para redes sociales (expandible)

### Optimizaciones de Performance
- CSS y JS minificables para producción
- Imágenes con lazy loading
- Fuentes web optimizadas
- Animaciones con `transform` para mejor rendimiento

## 🛡️ Navegadores Compatibles

- **Chrome**: 60+
- **Firefox**: 60+
- **Safari**: 12+
- **Edge**: 79+
- **iOS Safari**: 12+
- **Android Chrome**: 60+

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🤝 Contribuir

1. Fork del proyecto
2. Crear rama para feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📞 Contacto

**GT Legal Solutions**
- 📧 Email: info@gtlegalsolutions.com
- 📱 Teléfono: +502 2234-5678
- 📍 Dirección: Av. Reforma 123, Ciudad de Guatemala

---

⚖️ **GT Legal Solutions** - Experiencia Legal de Confianza

*Desarrollado con ❤️ para brindar la mejor experiencia digital*
