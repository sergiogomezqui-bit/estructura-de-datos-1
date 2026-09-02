# Estructura de Datos 1

Prácticas del curso EDyA1: calculadora de cuota mensual de un préstamo, resuelta tanto en [BackEnd](#práctica-backend) (este directorio) como en [FrontEnd Dinámico](#práctica-frontend-dinámico) ([`frontend-dinamico/`](frontend-dinamico/)).

## Práctica BackEnd

Servidor web en Node.js + Express que calcula la cuota mensual de un préstamo, dado el monto, el plazo en meses y la tasa de interés — práctica de la sesión de Desarrollo BackEnd del curso.

### Fórmula

```
cuota = prestamo * ( (1+i)^n * i ) / ( (1+i)^n - 1 )
```

### Contenido

- [`index.js`](index.js) — servidor Express, rutas `GET/POST /prestamos`
- [`scripts/utils.js`](scripts/utils.js) — cálculo de la cuota, formato de salida y generación de la página HTML
- [`tests/utils.test.js`](tests/utils.test.js) — pruebas del cálculo y del formato de salida (con el runner nativo de Node)

### Uso

```bash
npm install
npm start
```

Abre `http://localhost:3000/prestamos`, completa nombre, préstamo, meses e interés (ej. `0.15` para 15%) y presiona Enviar. El resultado aparece en el textArea con el formato:

```
nombre – $ cuota -- $ préstamo -- n meses -- interés i%
```

La opción "Historial" muestra los cálculos previos hechos en la sesión.

### Pruebas

```bash
npm test
```

## Práctica FrontEnd Dinámico

Página web (HTML + JavaScript con módulos ES), en [`frontend-dinamico/`](frontend-dinamico/), que calcula la cuota mensual de un préstamo en el cliente, guarda cada cálculo en un arreglo y genera reportes sobre ese historial — práctica de la sesión de Desarrollo FrontEnd Dinámico del curso. Detalle completo en [`frontend-dinamico/README.md`](frontend-dinamico/README.md).

### Contenido

- [`frontend-dinamico/index.html`](frontend-dinamico/index.html) — formulario de entrada, textarea de salida y botones de reportes
- [`frontend-dinamico/Scripts/funciones.js`](frontend-dinamico/Scripts/funciones.js) — cálculo de la cuota y funciones de reporte (`filter`, `find`, `forEach`, `map`, `join`)
- [`frontend-dinamico/Scripts/main.js`](frontend-dinamico/Scripts/main.js) — conecta los botones del DOM con `funciones.js`
- [`frontend-dinamico/Styles/main.css`](frontend-dinamico/Styles/main.css) — estilos de la página
- [`frontend-dinamico/tests/funciones.test.js`](frontend-dinamico/tests/funciones.test.js) — pruebas de las funciones de cálculo y reporte (runner nativo de Node)

### Uso

```bash
cd frontend-dinamico
npm test
```

Abre `frontend-dinamico/index.html` con Live Server (o cualquier servidor estático) para probarlo en el navegador.
