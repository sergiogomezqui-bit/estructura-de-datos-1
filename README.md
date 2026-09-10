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

## Cómo ejecutarlo

Abre `index.html` en el navegador (o sírvelo con un servidor estático, ya que usa módulos
de JavaScript con `import`/`export`).
