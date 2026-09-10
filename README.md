# Calculadora de Cotización de Envío

Práctica de Estructuras de Datos y Algoritmos 1 (EDyA1) — Universidad Autónoma de Occidente.

Página web con un formulario que calcula el costo total de un envío (costo por peso, costo
por distancia, subtotal, impuesto del 8% y total final) y muestra el resultado en la misma
página.

## Estructura

- `index.html` — formulario de entrada y sección de resultado.
- `main.js` — validación de datos y manejo del DOM.
- `scripts/calculos.js` — reglas de cálculo puras (sin DOM), reutilizables y testeables.
- `styles.css` — estilos de la página.

## Reglas de cálculo

Implementadas exactamente como las define el enunciado, respetando los nombres de variable
que usa:

- `costoPeso = pesoKg * 2.0`
- `costoDistancia = distanciaKm * 0.05`
- `subtotal = costoPeso + costoDistancia`
- `impuesto = totalConDescuento * 0.08`
- `total = totalConDescuento + impuesto`

### Sobre el "Código de descuento" y `totalConDescuento`

El formulario pide capturar un código de descuento (texto, opcional), y el paso de impuesto
usa una variable `totalConDescuento` — pero en ningún punto del enunciado se especifica una
fórmula, porcentaje o regla de negocio que conecte el código ingresado con un descuento
concreto sobre el subtotal.

Ante esa ambigüedad, se optó por la interpretación más fiel a lo que sí está definido: como
no existe una regla de descuento especificada, `totalConDescuento` es equivalente al
`subtotal` (`aplicarDescuento()` en `scripts/calculos.js`). El campo se captura y queda
disponible para una futura regla de negocio, pero no se inventó un porcentaje arbitrario que
el enunciado no pidió, para no desviarse de los cálculos tal como fueron especificados.

## Validaciones

- No se permite calcular si falta el nombre, el peso o la distancia.
- El peso debe ser un número válido mayor que 0.
- La distancia debe ser un número **entero** válido mayor que 0.

## Salida (Resultado)

Al presionar "Calcular", se muestra en la misma página una sección "Resultado" con:

- Nombre del cliente
- Costo por peso
- Costo por distancia
- Subtotal
- Impuesto
- Total final

## Cómo ejecutarlo

**Importante:** este proyecto usa módulos de JavaScript (`import`/`export` en `main.js` y
`scripts/calculos.js`), así que **no funciona si se abre `index.html` con doble clic**
(el navegador bloquea los módulos en el protocolo `file://` por seguridad). Hay que
servirlo con un servidor local. Dos formas igual de válidas:

**Opción A — Live Server en Visual Studio Code (la más simple):**

1. Abre esta carpeta en VS Code (`Archivo → Abrir carpeta...`).
2. Si no tienes la extensión, instala **"Live Server"** (de Ritwick Dey) desde el panel de
   Extensiones.
3. Abre `index.html`, clic derecho → **"Open with Live Server"** (o el botón "Go Live" abajo
   a la derecha).
4. Se abre solo en el navegador, normalmente en `http://127.0.0.1:5500`.

**Opción B — servidor de Python (si no usas VS Code):**

```bash
cd CotizacionEnvio
python -m http.server 8000
```

y abre `http://localhost:8000` en el navegador.

## Cómo probarlo

1. Llena los 4 campos del formulario (el código de descuento es opcional) y presiona
   **"Calcular"**. Debe aparecer la sección "Resultado" con los 6 valores calculados.
2. Para ver las validaciones en acción: deja algún campo obligatorio vacío, o pon un peso o
   distancia en 0/negativo, o una distancia con decimales — en cualquiera de esos casos debe
   aparecer un mensaje de error y no debe calcular nada.

### Ejemplo de verificación rápida

Con **peso = 3 kg**, **distancia = 100 km**, sin código de descuento:

| Campo | Valor esperado |
|---|---|
| Costo por peso | $6.00 |
| Costo por distancia | $5.00 |
| Subtotal | $11.00 |
| Impuesto (8%) | $0.88 |
| Total final | $11.88 |
