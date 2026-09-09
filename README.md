# Practica Lab 1 — BackEnd y FrontEnd como aplicaciones diferentes

Calculadora de cuota de prestamo (amortizacion francesa) — curso Estructuras de Datos y
Algoritmos 1 (EDyA1), Universidad Autonoma de Occidente.

**Grupo:** Sergio Gómez — Brandon Bonilla

El BackEnd y el FrontEnd son dos aplicaciones independientes que se comunican unicamente
por **JSON**, tal como pide la entrega.

## Estructura

- `backend/` — API REST en Node.js + Express. No genera HTML, solo responde JSON.
- `frontend/` — Aplicacion estatica (HTML/CSS/JS) que consume la API con `fetch`.

## Como ejecutarlo

**1. Backend**

```bash
cd backend
npm install
npm start
```

Queda escuchando en `http://localhost:3000`.

**2. Frontend**

Abre `frontend/index.html` directamente en el navegador (o sirvelo con cualquier
servidor estatico). Se conecta al backend en `http://localhost:3000/prestamos`.

## API

- `GET /prestamos` → `{ historial: string[] }`
- `POST /prestamos` con body JSON `{ accion, nombre, prestamo, n, i }`
  - `accion: "Calcular"` → `{ nombre, prestamo, n, i, cuota, resultadoTexto, historial }`
  - `accion: "Historial"` → `{ historial }`

## Pruebas del backend

```bash
cd backend
npm test
```

## Autores

- **Sergio Gómez** — arquitectura del backend (API JSON), integración con el frontend, pruebas.
- **Brandon Bonilla** — pruebas adicionales de casos borde (interés 0, préstamos grandes), validación de entrada en el frontend.
