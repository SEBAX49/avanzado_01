# 🃏 Sistema de Colección de Cartas (EduCAPI)

El siguiente documento presenta los requerimientos formales implementados para este proyecto y detalla exhaustivamente su funcionamiento para poder defenderlo sin inconvenientes.

## 📙 Entregable 1: Documento Formal

### Historias de Usuario
1. **Como coleccionista**, deseo ver todas las cartas disponibles en mi posesión inmediatamente al entrar a la página, para poder observar mis héroes de un vistazo rápido.
2. **Como jugador**, deseo poder hacer clic en una carta de mi colección para que aparezca un detalle a pantalla completa (modal) con estadísticas mejor visualizadas e información ampliada.
3. **Como creador**, deseo registrar una nueva carta incluyendo su foto (URL), estadísticas como "ataque", "defensa", su "tipo" y "descripción", para fortalecer mi mazo con estrategias nuevas.
4. **Como jugador estratégico**, deseo editar las propiedades de mis cartas (su ataque, defensa u otros detalles) una vez que evolucionen, para mantenerlas adaptadas a las partidas actuales.
5. **Como coleccionista estricto**, deseo poder borrar cartas permanentemente en caso de considerarlas inútiles o repetidas en mi baraja.

### Modelo de Datos
La aplicación se comunica con EduCAPI mediante el siguiente esquema `Card`, que es mapeado desde nuestra interfaz propia unificada en `src/types/card.ts`, coincidiendo 1 a 1 con la base de datos distribuida en Render.

- `idCard`: `number` (Identificador único asignado automáticamente por el servidor).
- `name`: `string` (Nombre explícito del personaje).
- `description`: `string` (Detalles de Lore o efectos especiales).
- `attack`: `number` (Nivel de ataque de 1 a 350).
- `defense`: `number` (Nivel de defensa de 1 a 350).
- `lifePoints`: `number` (Puntos de vida).
- `pictureUrl`: `string` (Enlace de la imagen externa).
- `attributes`: `object`
  - `tipo`: (Agua, Fuego, Eléctrico, "CULEAO", etc.).
  - `numero`: (Número pokedex o de catálogo del personaje).
- `userSecret`: `string` (Firma exclusiva que valida ser dueño y gestor de dicha carta, inyectada invisiblemente desde los headers).

### Flujos de la Página (Rutas)
La arquitectura implementa React Router (`BrowserRouter`) con múltiples caminos:
- **Vista Principal (`/`)**: (`Home.tsx`) Contiene el Dashboard principal que extrae la lista de las cartas creadas.
- **Detalle de Carta (Modal)**: Un sub-flujo que abre el componente visual `Modal.tsx` sin salir de la página principal (flujo contextual).
- **Creación (`/create`)**: (`CreateCard.tsx`) Formulario encargado de transformar los datos iniciales y mandarlos por método POST.
- **Edición (`/edit/:id`)**: (`EditCard.tsx`) Despacha el llenado proactivo del formulario mediante el identificador en la URL y envía modificaciones al servidor vía método PATCH.


## 💻 Entregables 2 y 3: Implementación Estética CRUD

El código entero se encuentra respaldado por:
- Tailwind CSS a través de todo el proyecto, inyectando Microinteracciones, hover effects, blur modals y degradados estéticos consistentes utilizando `CardDetail.tsx`.
- Refactorización de hooks como `useEffect` (en la primera carga y control del scroll) y `useState` (control del form, cargando modals y manejando data array).

---

## 🛡️ Entregable 4: Preparación para Defensa y Flujo de Datos

A continuación, la disección exacta de **dónde** y **cómo** interactúa React con cada solicitud y render. Podrás usar esto para tu defensa oral del proyecto en el curso:

### 1. ¿Donde se consultan las cartas?
**Todo ocurre en `src/hooks/useCards.ts`**.
Allí, se extrajo toda la comunicación backend. Existe una función principal llamada `fetchCards`:
- Usamos el hook nativo de React `useEffect`, que se dispara solo una vez al cargar la app porque tiene este array de dependencias vacío en su invocación inicial (a través de `fetchCards` cacheado por `useCallback`). 
- Dentro del efecto, hacemos la petición: `fetch('https://educapi-v2.onrender.com/card', { headers: HEADERS })`.
- Cuando el backend de EduCAPI responde el JSON con los datos, se toma el listado interno y llamamos la magia reactiva con `setCards(data.data)`. Esto detona actualización a todos los contextos que llamen este Custom Hook.

### 2. ¿Donde se reenderizan (pintan visualmente) las cartas?
**Ocurre en `src/pages/Home.tsx`** y su hijo **`src/components/CardDetail.tsx`**:
- En `Home.tsx` recibimos el array `cards` en las variables recibidas (Props).
- Usamos una función nativa de JavaScript llamada `.map()` en la sección central así: `{cards.map((p, index) => (...))}`
- Por cada iteración en el map, se instancia e inyectan los atributos directamente al componente `<CardDetail />`
- Adentro de **CardDetail**, hay tags html div dedicados y el componente `<StatBar>` con Tailwind que interpreta y dibuja porciones matemáticas para las barras de progreso usando fórmulas de porcentajes.

### 3. ¿Cómo se crean (POST) las cartas?
**Ocurre en `src/pages/CreateCard.tsx`** invocando al custom hook:
- Entramos al URL `/create`, que invoca un formulario. A medida que el usuario tipeaa, la función `handleChange` toma cada tecla y actualiza `formData` mediante `setFormData(prev => {...})` (Un estado interno para capturar en vivo).
- Al dar clic al botón final con tipo submit ("Añadir a la colección"), reacciona la función `handleSubmit`.
- Aquí se previene el recargo clásico de HTMl usando `e.preventDefault()`. Luego mapeamos el objeto para cumplir reglas del backend inyectando el valor real de los inputs y llamando a la función `addCard`.
- `addCard` vive en el hook interno. Realiza un `fetch(API_URL, { method: 'POST', body: JSON.stringify(newCard)...})`.
- Tras éxito (si el API contesta con 200 OK y la base fue afectada), mandamos de vuelta al jugador al home para ver su flamante carta usando código: `navigate('/')`. 

### 4. ¿Cómo funciona el sub-flujo para editar o ver los detalles de una carta?
- Cuando el jugador cliquea visualmente una carta ya reenderizada, se dispara su evento local `onClick`.
- Este onClick ejecuta la función local `handleOpenModal(p)` en *Home*, alimentando al estado de memoria el objeto concreto clicleado: `setSelectedPersonaje(p)` y posteriormente abre el telón diciendo visualmente al estado reactivo que es tiempo de mostrar el modal: `setIsModalOpen(true)`.
- El componente flotante `<Modal />` entra en acción detectando que `isOpen === true`. Éste pinta las métricas exactas del objeto local.
- Dentro de ese modal están los dos botones: "Editar" o "Eliminar".
- **Si doy Eliminar:** Pide confirmación al navegador (usamos `window.confirm`), ejecuta el prop `onDelete(personaje.idCard)` que va recorriendo hasta llegar a `useCards.ts` y detona un `fetch` DELETE limpio al endpoint `https://.../card/:id`. Acto seguido, la UI repinta las cartas consultando `fetchCards()`, destruyendo la visual local eliminada.
- **Si doy Editar:** Almacena mi ID actual local y le indica al enrutador saltar de página: `navigate('/edit/:id')`. En esta nueva página (`EditCard.tsx`), agarra el array, encuentra quién era su gemelo exacto mediante un bloque de rastreo con `useEffect()` y un `Array.find(c => c.idCard === ID)` , volcando los valores reales en vivo al instante en los campos de escritura para que lo actualicemos y le hagamos `PATCH` bajo las mismas lógicas del Create.

¡Todo esto convierte el frontend en un crud enérgico, mantenible y espectacular visualmente!

## 🔐 Mejoras de Seguridad y Experiencia de Usuario (Validaciones)

Se implementaron medidas arquitectónicas vitales para prevenir bugs y proteger las credenciales:

### Variables de Entorno (`.env`)
Se configuró el archivo `.env` en la raíz del proyecto para alojar la llave secreta (`VITE_USER_SECRET_PASSKEY=Seba704220AN`).
- ¿Por qué es importante? En entornos reales, tu contraseña maestra no debe "arderse" (quemarse / harcodearse) directamente en los archivos como `useCards`. Esto permite que cuando subas el código a GitHub la contraseña permanezca invisible.
- En el código `useCards.ts`, invocamos y leemos este secreto mediante `import.meta.env.VITE_USER_SECRET_PASSKEY`.

### Cabeceras Independientes en API (Separación de POST y DELETE)
Se resolvió la anomalía "*Body cannot be empty when content-type is set to application/json*" al borrar cartas.
- Ahora, las peticiones HTTP GET y DELETE se despachan **sin el Content-Type explícitamente**, ya que no están predispuestas a enviar un JSON (payload de carga físico) sino a manipular lo que ya conoce el server por la URL. Esto vuelve la comunicación más estricta y blindada a errores de Status 400.

### Validación de Tipos (Anti-caracteres en Formularios)
- En la interfaz de crear o editar cartas, el usuario humano ya no recibe inputs de texto abierto cuando se solicitan identificaciones numéricas (por ejemplo, el campo `numero`). 
- Fue migrado al estándar riguroso nativo `<input type="number" min="0" />`. El navegador detiene instantáneamente a los caracteres no numéricos o negativos (a b c ! @ -) protegiendo el CRUD de registrar strings corrompidos.
- Adicionalmente, insertamos el atributo `lifePoints` en los formularios para que también dispongas del espectro gráfico usando la estética de la barra slider (con valor máximo adaptado a 5000 puntos de vida).

---

## 🚀 Despliegue en Vercel (Guía Paso a Paso)

Para que el proyecto funcione correctamente una vez desplegado en la nube de Vercel, sigue estas instrucciones técnicas:

### 1. Configuración de Variables de Entorno
Vercel no puede leer tu archivo `.env` local por seguridad. Debes cargar manualmente las llaves en el panel del proyecto (**Settings > Environment Variables**):

| Key | Value (Ejemplo) |
| :--- | :--- |
| `VITE_API_URL` | `https://educapi-v2.onrender.com/card` |
| `VITE_USER_SECRET_PASSKEY` | `Seba704220AN` |

> [!IMPORTANT]
> Sin la variable `VITE_USER_SECRET_PASSKEY`, las peticiones de creación y borrado serán rechazadas por el servidor (Error 401/403).

### 2. Comandos de Construcción (Build Settings)
Asegúrate de que Vercel detecte automáticamente la configuración de Vite. Si no, ajústalo así:
- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### 3. Manejo de Rutas (vercel.json)
Si al recargar la página en una ruta interna (ej. `/create`) obtienes un error 404, es porque Vercel intenta buscar un archivo físico. Para solucionar esto, el proyecto incluye (o deberías verificar) que las rutas se redirijan al `index.html`.

---
*Este documento fue actualizado para garantizar que el estudiante posea todo el conocimiento técnico necesario para el despliegue y defensa del taller.*
