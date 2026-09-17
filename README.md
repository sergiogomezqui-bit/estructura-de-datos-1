# Estructura de Datos 1 — Práctica BackEnd

Servidor web en Node.js + Express que calcula la cuota mensual de un préstamo, dado el monto, el plazo en meses y la tasa de interés — práctica de la sesión de Desarrollo BackEnd del curso.

## Fórmula

```
cuota = prestamo * ( (1+i)^n * i ) / ( (1+i)^n - 1 )
```

## Contenido

- [`index.js`](index.js) — servidor Express, rutas `GET/POST /prestamos`
- [`scripts/utils.js`](scripts/utils.js) — cálculo de la cuota, formato de salida y generación de la página HTML
- [`tests/utils.test.js`](tests/utils.test.js) — pruebas del cálculo y del formato de salida (con el runner nativo de Node)

## Uso

```bash
npm install
npm start
```

Abre `http://localhost:3000/prestamos`, completa nombre, préstamo, meses e interés (ej. `0.15` para 15%) y presiona Enviar. El resultado aparece en el textArea con el formato:

```
nombre – $ cuota -- $ préstamo -- n meses -- interés i%
```

La opción "Historial" muestra los cálculos previos hechos en la sesión.

## Pruebas

```bash
npm test
```
