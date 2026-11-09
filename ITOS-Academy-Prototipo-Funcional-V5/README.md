# ITOS Academy – Prototipo Funcional V5

Versión académica demostrativa, sin backend ni base de datos externa. Los datos se guardan en `localStorage` del navegador.

## Credenciales

- Super Admin: `superadmin@itosacademy.com` / `Admin123`
- Supervisor: `supervisor@itosacademy.com` / `Admin123`
- Empleado: `empleado@itosacademy.com` / `Admin123`

## Navegación por rol

### Super Admin
`Dashboard | Cursos | Avances | Mi perfil | Usuarios`

Dashboard global con indicadores y gráficos de toda la demo.

### Supervisor
`Dashboard | Cursos | Avances | Mi perfil`

Dashboard restringido a su propia área. Puede crear y asignar cursos únicamente dentro de su área y gestionar reintentos de los colaboradores visibles.

### Empleado
`Cursos | Avances | Mi perfil`

No dispone de Dashboard. Al iniciar sesión entra directamente en **Cursos**. La pantalla **Avances** concentra el seguimiento detallado de sus capacitaciones.

## Estado inicial del Empleado Demo

1. **Seguridad de la información** → Pendiente, 0 %.
2. **Comunicación efectiva en equipos de trabajo** → En progreso, 50 %.
3. **Inducción a ITOS Academy** → existe en la plataforma pero NO está asignado inicialmente.

Esto permite que la docente ejecute el flujo completo sin encontrar cursos previamente finalizados.

## Curso principal de prueba

**Inducción a ITOS Academy** es el curso utilizado para validar el flujo:

Super Admin/Supervisor asigna → Empleado consulta → completa PDFs → presenta evaluación → puede reprobar → reintento bloqueado → administrador/supervisor habilita → Empleado reintenta → aprueba → 100 % → certificado.

## Materiales

Los seis materiales precargados son PDF y pueden abrirse en el visor integrado o en una pestaña aparte.

## Restablecer demo

Disponible únicamente para Super Admin. Restaura:
- Seguridad de la información a Pendiente 0 %.
- Comunicación efectiva a En progreso 50 %.
- Inducción a ITOS Academy sin asignación al Empleado Demo.
- Intentos, resultados, certificado y reintentos del curso de prueba.

## Ejecución

Abrir `index.html` en el navegador. Para publicar online, puede subirse como sitio estático a Netlify, GitHub Pages u otro hosting estático.
