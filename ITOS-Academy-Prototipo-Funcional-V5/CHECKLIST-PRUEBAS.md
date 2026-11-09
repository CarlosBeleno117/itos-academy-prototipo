# Checklist de prueba – V5

Antes de empezar: iniciar como Super Admin y pulsar **Restablecer demo**.

| # | Comprobación | Resultado esperado |
|---|---|---|
| 1 | Login válido Super Admin | Accede a Dashboard global |
| 2 | Login inválido | No permite acceso |
| 3 | Login Empleado | Entra directamente a Cursos; no existe Dashboard en el menú |
| 4 | Cursos iniciales Empleado | Seguridad 0 %, Comunicación 50 %, Inducción todavía no asignada |
| 5 | Supervisor | Dashboard solo de su área; sin Usuarios |
| 6 | Asignar Inducción | Super Admin o Supervisor BPO puede asignarla al Empleado Demo |
| 7 | Ver detalle | Muestra fecha límite, estado y avance |
| 8 | Abrir materiales | Cada material abre su PDF |
| 9 | Completar materiales | Se actualiza avance y se habilita evaluación |
| 10 | Evaluación incompleta | No permite enviar preguntas sin respuesta |
| 11 | Reprobar | Calcula puntaje, registra intento y bloquea reintento |
| 12 | Habilitar reintento | Super Admin/Supervisor puede habilitarlo |
| 13 | Segundo intento | Empleado puede presentar de nuevo |
| 14 | Aprobar | Curso llega a 100 % |
| 15 | Certificado | Se habilita y muestra datos del curso/empleado |

## Restricciones esperadas
- Empleado: Cursos, Avances y Mi perfil únicamente.
- Supervisor: Dashboard/Cursos/Avances/Mi perfil, limitado a su área.
- Super Admin: acceso global y módulo Usuarios.
