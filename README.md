# Estructuras de Datos y Algoritmos 1 — Práctica FrontEnd Dinámico

Página web (HTML + JavaScript con módulos ES) que calcula la cuota mensual de un préstamo en el cliente, guarda cada cálculo en un arreglo y genera reportes sobre ese historial — práctica de la sesión de Desarrollo FrontEnd Dinámico del curso.

## Fórmula

```
cuota = prestamo * ( (1+i)^n * i ) / ( (1+i)^n - 1 )
```

## Contenido

- `index.html` — formulario de entrada, textarea de salida y botones de reportes
- `Scripts/funciones.js` — cálculo de la cuota y funciones de reporte (`filter`, `find`, `forEach`, `map`, `join`)
- `Scripts/main.js` — conecta los botones del DOM con `funciones.js`
- `Styles/main.css` — estilos de la página
- `tests/funciones.test.js` — pruebas de las funciones de cálculo y reporte (runner nativo de Node)

## Uso

Abre `index.html` con Live Server (o cualquier servidor estático). Completa nombre, préstamo, meses e interés (ej. `0.15` para 15%) y presiona **Calcular**. El resultado aparece en el textarea con el formato:

```
nombre debe pagar $ cuota cada mes por el préstamo de $ préstamo a n meses con el interés del i%
```

Cada cálculo se guarda en un arreglo en memoria. Los botones de reportes operan sobre ese historial:

- **Ver historial** — despliega todos los préstamos calculados
- **Sumatoria de cuotas** — suma el valor de todas las cuotas
- **Cuotas > $300000** — préstamos cuya cuota supera $300.000
- **Pagan en < 1 año** — préstamos a menos de 12 meses
- **1er préstamo > $5000000** — primer préstamo que supera $5.000.000
- **1er interés < 2%** — primer préstamo con interés inferior al 2%
- **Incrementar cuotas +$90000** — muestra las cuotas incrementadas en $90.000 (sin modificar el historial)
- **Decrementar préstamos -$90000** — muestra los préstamos decrementados en $90.000 (sin modificar el historial)
- **Solo cuotas** — arreglo con únicamente los valores de cuota

## Pruebas

```
npm test
```
