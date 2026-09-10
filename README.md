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

- `costoPeso = pesoKg * 2.0`
- `costoDistancia = distanciaKm * 0.05`
- `subtotal = costoPeso + costoDistancia`
- `impuesto = subtotal * 0.08`
- `total = subtotal + impuesto`

El campo "Código de descuento" es opcional y se captura, pero el enunciado no define ninguna
regla de descuento concreta, así que no afecta el cálculo.

## Validaciones

- No se permite calcular si falta el nombre, el peso o la distancia.
- El peso debe ser un número válido mayor que 0.
- La distancia debe ser un número **entero** válido mayor que 0.

## Cómo ejecutarlo

Abre `index.html` en el navegador (o sírvelo con un servidor estático, ya que usa módulos
de JavaScript con `import`/`export`).
