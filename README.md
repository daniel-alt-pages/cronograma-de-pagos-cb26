# Cronograma de Pagos - Sistema de Gestión de Nómina

Una aplicación web moderna y elegante para gestionar el cronograma de pagos de profesores, desarrollada con React y Vite.

## 🚀 Características

- **Gestión de Nómina Semanal**: Visualiza y gestiona el cronograma de pagos por semanas
- **Dashboard Financiero**: Vista global de todas las semanas y totales acumulados
- **Integración con Nequi**: 
  - Botón flotante para abrir la app de Nequi directamente
  - Modal de pago con información de cuenta
  - Copiar número de cuenta o datos completos
- **Reportes Flexibles**: 
  - Modo Oficial: Formato detallado completo
  - Modo WhatsApp: Formato compacto para mensajería
- **Responsive Design**: Interfaz adaptada para dispositivos móviles y desktop
- **Animaciones Suaves**: Transiciones y efectos visuales modernos

## 🎯 Funcionalidades Principales

### Vista de Nómina
- Selección de semana (Semana 1-4)
- Tarjetas de resumen: Horas totales, total a pagar, número de docentes
- Lista expandible de profesores con:
  - Desglose detallado de sesiones
  - Vista previa de reportes
  - Botón de pago rápido
  - Copiar reportes en diferentes formatos

### Dashboard Financiero
- Total acumulado de todas las semanas
- Tabla resumen por semana
- Estadísticas globales

### Sistema de Pagos
- Base de datos unificada de cuentas Nequi
- Modal de pago con información completa del profesor
- Botón para abrir directamente la app de Nequi
- Copiar datos de cuenta con un clic

## 🛠️ Tecnologías

- **React** 19.2.0
- **Vite** 7.2.4 (Build tool)
- **CSS Moderno**: Tailwind-style utilities
- **GitHub Pages**: Hosting

## 📦 Instalación y Desarrollo

```bash
# Clonar el repositorio
git clone https://github.com/daniel-alt-pages/cronograma-de-pagos-cb26.git

# Navegar al directorio
cd cronograma-de-pagos-cb26

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

## 🚀 Despliegue

El proyecto está configurado para desplegar automáticamente en GitHub Pages:

```bash
# Desplegar a GitHub Pages
npm run deploy
```

## 🌐 Demo en Vivo

La aplicación está desplegada en: [https://daniel-alt-pages.github.io/cronograma-de-pagos-cb26/](https://daniel-alt-pages.github.io/cronograma-de-pagos-cb26/)

## 📊 Estructura de Datos

### Semanas
Cada semana contiene:
- ID único
- Nombre (Semana 1-4)
- Rango de fechas
- Lista de profesores

### Profesores
Cada profesor tiene:
- Nombre completo
- Total de horas
- Sesiones individuales con:
  - Fecha
  - Horario
  - Tipo (Teórica/Práctica)
  - Tema
  - Horas

### Cuentas Nequi
Base de datos con:
- Nombre del profesor
- Número de cuenta
- Área de enseñanza

## 💰 Cálculo de Pagos

El sistema calcula automáticamente:
- Total de horas por profesor
- Costo total (horas × tarifa por hora)
- Totales por semana
- Total acumulado general

La tarifa por hora es configurable desde el header de la aplicación.

## 🎨 Diseño

- **Paleta de Colores**: Slate, Indigo, Emerald
- **Tipografía**: Sistema de fuentes nativas
- **Iconos**: SVG personalizados
- **Animaciones**: Transiciones suaves y efectos hover
- **Layout**: Sidebar compacto + área principal responsiva

## 📱 Compatibilidad

- ✅ Navegadores modernos (Chrome, Firefox, Safari, Edge)
- ✅ Dispositivos móviles (iOS, Android)
- ✅ Tablets
- ✅ Desktop

## 🔧 Configuración

Para cambiar el valor por hora predeterminado, edita la constante en `src/App.jsx`:

```javascript
const [rate, setRate] = useState(20000); // Valor por defecto en COP
```

## 📄 Licencia

Este proyecto es de uso privado.

## 👥 Autores

Daniel - Desarrollo inicial

---

Desarrollado con ❤️ usando React y Vite
