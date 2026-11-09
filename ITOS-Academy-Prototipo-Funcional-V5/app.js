(() => {
  'use strict';

  const DATA_KEY = 'itos_academy_demo_v5';
  const SESSION_KEY = 'itos_academy_demo_session_v5';
  const CURRENT_YEAR = new Date().getFullYear();

  const ui = {
    view: 'dashboard',
    selectedCourseId: 1,
    courseTab: 'resumen',
    courseSearch: '',
    courseArea: 'all',
    courseStatus: 'all',
    showUserForm: false,
  };

  function seedData() {
    const today = todayISO();
    const dueMain = addBusinessDays(8);
    const dueProgress = addBusinessDays(6);
    return {
      meta: { version: 5, resetAt: new Date().toISOString() },
      users: [
        { id: 1, nombre: 'Super Admin', correo: 'superadmin@itosacademy.com', password: 'Admin123', rol: 'Super Admin', area: 'IT', cargo: 'Administrador de plataforma', pais: 'Colombia', estado: 'Activo', fecha_ingreso: '2026-01-15' },
        { id: 2, nombre: 'Supervisor Demo', correo: 'supervisor@itosacademy.com', password: 'Admin123', rol: 'Supervisor', area: 'BPO', cargo: 'Supervisor de capacitación', pais: 'Colombia', estado: 'Activo', fecha_ingreso: '2026-02-01' },
        { id: 3, nombre: 'Empleado Demo', correo: 'empleado@itosacademy.com', password: 'Admin123', rol: 'Empleado', area: 'BPO', cargo: 'Analista BPO', pais: 'Colombia', estado: 'Activo', fecha_ingreso: '2026-03-01' },
        { id: 4, nombre: 'Empleado Implementación', correo: 'empleado.implementacion@itosacademy.com', password: 'Admin123', rol: 'Empleado', area: 'Implementacion', cargo: 'Analista de implementación', pais: 'Colombia', estado: 'Activo', fecha_ingreso: '2026-03-15' }
      ],
      courses: [
        {
          id: 1,
          titulo: 'Inducción a ITOS Academy',
          descripcion: 'Curso introductorio para conocer cómo consultar capacitaciones, completar materiales, presentar evaluaciones y hacer seguimiento al avance dentro de ITOS Academy.',
          area: 'BPO', duracion_horas: 1.5, dias_para_finalizar: 8, responsable_id: 2, estado: 'Disponible',
          materiales: [
            { id: 101, titulo: 'Guía rápida de ITOS Academy', descripcion: 'Guía breve sobre el flujo de capacitación, estados y certificado.', tipo: 'PDF', archivo: 'assets/materiales/01_Guia_rapida_ITOS_Academy.pdf', contenido: 'Guía introductoria del uso de ITOS Academy.' },
            { id: 102, titulo: 'Ruta básica de aprendizaje', descripcion: 'Resumen de los pasos que sigue un colaborador durante una capacitación.', tipo: 'PDF', archivo: 'assets/materiales/02_Ruta_basica_de_aprendizaje.pdf', contenido: 'Ruta resumida del proceso de aprendizaje.' }
          ],
          evaluacion: {
            id: 201, titulo: 'Evaluación de inducción a ITOS Academy', puntaje_minimo: 70,
            preguntas: [
              { id: 1, texto: '¿Cuál es el objetivo principal de ITOS Academy?', opciones: ['Gestionar procesos de capacitación y seguimiento', 'Crear cuentas de correo', 'Administrar nómina', 'Reemplazar al supervisor'], correcta: 0 },
              { id: 2, texto: '¿Dónde consulta un empleado las capacitaciones que tiene asignadas?', opciones: ['En Usuarios', 'En Cursos', 'En Configuración', 'En Inicio de sesión'], correcta: 1 },
              { id: 3, texto: '¿Qué debe hacer el colaborador antes de presentar la evaluación?', opciones: ['Completar los materiales obligatorios', 'Crear otro usuario', 'Cambiar de rol', 'Cerrar la sesión'], correcta: 0 },
              { id: 4, texto: '¿Qué ocurre si una evaluación no alcanza el puntaje mínimo?', opciones: ['El curso se elimina', 'El usuario se inactiva', 'El intento queda no aprobado y requiere habilitación para reintentar', 'Se genera el certificado'], correcta: 2 },
              { id: 5, texto: '¿Qué se habilita cuando un curso se completa satisfactoriamente?', opciones: ['Un nuevo correo', 'Un certificado de finalización', 'Un cambio de área', 'Una cuenta de administrador'], correcta: 1 }
            ]
          }
        },
        {
          id: 2,
          titulo: 'Seguridad de la información',
          descripcion: 'Capacitación general sobre buenas prácticas para proteger información, accesos y datos de la organización.',
          area: 'IT', duracion_horas: 2, dias_para_finalizar: 10, responsable_id: 1, estado: 'Disponible',
          materiales: [
            { id: 201, titulo: 'Buenas prácticas de seguridad', descripcion: 'Principios básicos de protección de información.', tipo: 'PDF', archivo: 'assets/materiales/03_Buenas_practicas_de_seguridad.pdf', contenido: 'Buenas prácticas de seguridad de la información.' },
            { id: 202, titulo: 'Manejo responsable de accesos', descripcion: 'Recomendaciones para el uso seguro de credenciales.', tipo: 'PDF', archivo: 'assets/materiales/04_Manejo_responsable_de_accesos.pdf', contenido: 'Recomendaciones para el manejo responsable de accesos.' }
          ],
          evaluacion: {
            id: 202, titulo: 'Evaluación de seguridad de la información', puntaje_minimo: 70,
            preguntas: [
              { id: 1, texto: '¿Las credenciales de acceso deben compartirse?', opciones: ['Sí', 'No', 'Solo por chat', 'Solo los viernes'], correcta: 1 },
              { id: 2, texto: '¿Qué se recomienda hacer ante un acceso sospechoso?', opciones: ['Ignorarlo', 'Reportarlo', 'Compartir la contraseña', 'Eliminar el curso'], correcta: 1 },
              { id: 3, texto: '¿Cuál es una buena práctica?', opciones: ['Usar contraseñas seguras', 'Compartir datos sensibles', 'Dejar sesiones abiertas', 'Reutilizar accesos ajenos'], correcta: 0 },
              { id: 4, texto: '¿Qué debes hacer en un equipo compartido al terminar?', opciones: ['Cerrar sesión', 'Dejarlo abierto', 'Compartir el acceso', 'Cambiar de área'], correcta: 0 },
              { id: 5, texto: '¿La información sensible debe protegerse?', opciones: ['No', 'Sí', 'Solo a veces', 'Solo en vacaciones'], correcta: 1 }
            ]
          }
        },
        {
          id: 3,
          titulo: 'Comunicación efectiva en equipos de trabajo',
          descripcion: 'Curso general para fortalecer la comunicación clara, la escucha activa y la coordinación entre colaboradores.',
          area: 'RRHH', duracion_horas: 2, dias_para_finalizar: 7, responsable_id: 2, estado: 'Disponible',
          materiales: [
            { id: 301, titulo: 'Comunicación clara', descripcion: 'Principios para transmitir información de forma sencilla.', tipo: 'PDF', archivo: 'assets/materiales/05_Comunicacion_clara.pdf', contenido: 'Principios para una comunicación clara.' },
            { id: 302, titulo: 'Escucha activa', descripcion: 'Buenas prácticas para escuchar y validar la información recibida.', tipo: 'PDF', archivo: 'assets/materiales/06_Escucha_activa.pdf', contenido: 'Buenas prácticas de escucha activa.' }
          ],
          evaluacion: {
            id: 203, titulo: 'Evaluación de comunicación efectiva', puntaje_minimo: 70,
            preguntas: [
              { id: 1, texto: '¿Qué favorece una comunicación efectiva?', opciones: ['Mensajes claros', 'Información incompleta', 'No escuchar', 'Evitar preguntas'], correcta: 0 },
              { id: 2, texto: '¿Qué significa escucha activa?', opciones: ['Ignorar', 'Escuchar, preguntar y confirmar', 'Interrumpir', 'Cambiar de tema'], correcta: 1 },
              { id: 3, texto: '¿Qué ayuda a evitar malentendidos?', opciones: ['Confirmar acuerdos', 'No responder', 'Usar mensajes ambiguos', 'Evitar contexto'], correcta: 0 },
              { id: 4, texto: '¿Las preguntas pueden ayudar a aclarar información?', opciones: ['Sí', 'No', 'Nunca', 'Solo por correo'], correcta: 0 },
              { id: 5, texto: '¿Cuál es una práctica adecuada en equipo?', opciones: ['Escuchar a los demás', 'Interrumpir siempre', 'Ocultar acuerdos', 'No confirmar tareas'], correcta: 0 }
            ]
          }
        }
      ],
      assignments: [
        {
          id: 1, usuario_id: 3, curso_id: 2, porcentaje: 0, estado: 'Pendiente',
          materiales_completados: [], evaluacion_estado: 'Pendiente', reintento_habilitado: false,
          fecha_limite: addBusinessDays(10), fecha_asignacion: today, fecha_finalizacion: null, ultimo_puntaje: null,
          attempts: [], certificado_codigo: null
        },
        {
          id: 2, usuario_id: 3, curso_id: 3, porcentaje: 50, estado: 'En progreso',
          materiales_completados: [301,302], evaluacion_estado: 'Pendiente', reintento_habilitado: false,
          fecha_limite: dueProgress, fecha_asignacion: today, fecha_finalizacion: null, ultimo_puntaje: null,
          attempts: [], certificado_codigo: null
        }
      ]
    };
  }

  function loadData() {
    try {
      const raw = localStorage.getItem(DATA_KEY);
      if (!raw) {
        const data = seedData();
        saveData(data);
        return data;
      }
      return JSON.parse(raw);
    } catch (e) {
      const data = seedData();
      saveData(data);
      return data;
    }
  }

  function saveData(data) { localStorage.setItem(DATA_KEY, JSON.stringify(data)); }
  function getSessionId() { return Number(localStorage.getItem(SESSION_KEY) || 0); }
  function setSessionId(id) { localStorage.setItem(SESSION_KEY, String(id)); }
  function clearSession() { localStorage.removeItem(SESSION_KEY); }
  function currentUser(data = loadData()) { return data.users.find(u => u.id === getSessionId()) || null; }
  function isAdmin(user) { return user && (user.rol === 'Super Admin' || user.rol === 'Admin'); }
  function canCreateCourse(user) { return !!user && (isAdmin(user) || user.rol === 'Supervisor'); }
  function canManageCourse(user, course) { return isAdmin(user) || (user?.rol === 'Supervisor' && user.area === course.area); }
  function esc(v) { return String(v ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
  function fmtDate(value) { if (!value) return '—'; const d = new Date(value + (String(value).length === 10 ? 'T12:00:00' : '')); return Number.isNaN(d.getTime()) ? esc(value) : d.toLocaleDateString('es-CO', { year:'numeric', month:'short', day:'2-digit' }); }
  function todayISO() { return new Date().toISOString().slice(0,10); }
  function addBusinessDays(days) { const d = new Date(); let added=0; while(added<days){d.setDate(d.getDate()+1); const day=d.getDay(); if(day!==0&&day!==6) added++;} return d.toISOString().slice(0,10); }
  function assignmentFor(userId, courseId, data = loadData()) { return data.assignments.find(a => a.usuario_id === Number(userId) && a.curso_id === Number(courseId)); }
  function courseById(id, data = loadData()) { return data.courses.find(c => c.id === Number(id)); }
  function userById(id, data = loadData()) { return data.users.find(u => u.id === Number(id)); }
  function statusBadge(status) {
    const s = status || 'Pendiente';
    let cls='badge-gray';
    if (['Completado','Aprobada','Activo','Disponible','Vigente'].includes(s)) cls='badge-green';
    else if (['Evaluación no aprobada','No aprobada','Bloqueado','Inactivo','Vencido'].includes(s)) cls='badge-red';
    else if (['En progreso','Pendiente','Próximo a vencer','Habilitado'].includes(s)) cls='badge-orange';
    else if (s==='Super Admin') cls='badge-purple'; else if(s==='Admin') cls='badge-blue';
    return `<span class="badge ${cls}">${esc(s)}</span>`;
  }
  function dueStatus(a){ if(!a?.fecha_limite) return 'Sin fecha límite'; if(a.estado==='Completado') return 'Completado'; const today=new Date(todayISO()+'T12:00:00'); const due=new Date(a.fecha_limite+'T12:00:00'); const diff=Math.ceil((due-today)/86400000); if(diff<0) return 'Vencido'; if(diff<=2) return 'Próximo a vencer'; return 'Vigente'; }
  function toast(message, type='success') { const root=document.getElementById('toast-root'); if(!root) return; const el=document.createElement('div'); el.className=`toast ${type}`; el.textContent=message; root.appendChild(el); setTimeout(()=>el.remove(),3500); }
  function closeModal(){ document.getElementById('modal-root').innerHTML=''; }
  function modal(html, large=false){ document.getElementById('modal-root').innerHTML=`<div class="modal-backdrop" onclick="if(event.target===this) closeModal()"><section class="modal ${large?'large':''}">${html}</section></div>`; }

  function render() {
    const data = loadData();
    const user = currentUser(data);
    const app = document.getElementById('app');
    if (!user) { app.innerHTML = renderLogin(); bindLogin(); return; }
    if (user.estado !== 'Activo') { clearSession(); app.innerHTML = renderLogin(); bindLogin(); return; }
    const admin = isAdmin(user);
    const links = user.rol === 'Empleado'
      ? [['cursos','Cursos'],['avances','Avances'],['perfil','Mi perfil']]
      : [['dashboard','Dashboard'],['cursos','Cursos'],['avances','Avances'],['perfil','Mi perfil'], ...(admin ? [['usuarios','Usuarios']] : [])];
    app.innerHTML = `
      <div class="prototype-strip">Prototipo funcional académico · datos simulados guardados en este navegador</div>
      <header class="navbar">
        <div class="brand"><img src="assets/logo-empresa.png" alt="ITOS" onerror="this.style.display='none'"> ITOS Academy</div>
        <nav class="nav-links">${links.map(([v,l])=>`<button class="nav-link ${ui.view===v?'active':''}" onclick="navigate('${v}')">${l}</button>`).join('')}</nav>
        <div class="user-info">
          ${user.rol==='Super Admin'?`<button class="reset-demo" onclick="resetDemo()">Restablecer demo</button>`:''}
          <div class="user-session"><strong>${esc(user.nombre)}</strong><small>${esc(user.rol)} · ${esc(user.area)}</small></div>
          <button class="logout" onclick="logout()">Cerrar sesión</button>
        </div>
      </header>
      <div id="view">${renderView(ui.view, data, user)}</div>`;
  }

  function renderLogin(){
    return `<main class="login-page"><div class="login-wrap">
      <section class="login-card">
        <div class="login-brand"><img src="assets/logo-empresa.png" alt="ITOS"><div><h1>ITOS Academy</h1><small>Capacitación y reentrenamiento</small></div></div>
        <p class="label">Acceso corporativo</p><h2>Iniciar sesión</h2><p class="muted">Ingresa con tu correo corporativo para acceder a las funcionalidades autorizadas según tu rol.</p>
        <div id="login-error"></div>
        <form id="login-form">
          <div class="form-field"><label>Correo electrónico</label><input id="login-email" type="email" autocomplete="email" placeholder="correo@itosacademy.com" required></div>
          <div class="form-field"><label>Contraseña</label><input id="login-password" type="password" autocomplete="current-password" placeholder="Contraseña" required></div>
          <button type="submit" style="width:100%;margin-top:5px">Ingresar</button>
        </form>
      </section>
      <aside class="demo-card"><p class="label">Acceso para evaluación</p><h3>Credenciales del prototipo</h3><p class="muted">La docente puede usar cualquiera de estos perfiles. La contraseña inicial de todos es <strong>Admin123</strong>.</p>
        <div class="credential"><strong>Super Admin</strong><code>superadmin@itosacademy.com</code></div>
        <div class="credential"><strong>Empleado Demo</strong><code>empleado@itosacademy.com</code></div>
        <div class="credential"><strong>Supervisor Demo</strong><code>supervisor@itosacademy.com</code></div>
        <div class="demo-note"><strong>Flujo sugerido:</strong> Super Admin o Supervisor asigna el curso → Empleado completa materiales y evalúa → se habilita reintento si falla → Empleado aprueba y consulta el certificado.</div>
      </aside>
    </div></main>`;
  }

  function bindLogin(){
    const form=document.getElementById('login-form'); if(!form) return;
    form.addEventListener('submit', e=>{
      e.preventDefault(); const email=document.getElementById('login-email').value.trim().toLowerCase(); const pwd=document.getElementById('login-password').value; const data=loadData();
      const u=data.users.find(x=>x.correo.toLowerCase()===email && x.password===pwd && x.estado==='Activo');
      if(!u){document.getElementById('login-error').innerHTML='<div class="alert alert-error">Correo o contraseña incorrectos.</div>';return;}
      setSessionId(u.id); ui.view = u.rol==='Empleado' ? 'cursos' : 'dashboard'; render(); toast(`Bienvenido, ${u.nombre}.`);
    });
  }

  function renderView(view,data,user){
    if(user.rol==='Empleado' && view==='dashboard') return renderCourses(data,user);
    if(view==='cursos') return renderCourses(data,user);
    if(view==='avances') return renderProgress(data,user);
    if(view==='usuarios' && isAdmin(user)) return renderUsers(data,user);
    if(view==='perfil') return renderProfile(data,user);
    return renderDashboard(data,user);
  }

  const CHART_COLORS=['#2563eb','#14b8a6','#f97316','#7c3aed','#22c55e','#ef4444'];

  function donutMarkup(items,centerLabel='Total'){
    const filtered=items.filter(x=>Number(x[1])>0); const total=filtered.reduce((sum,x)=>sum+Number(x[1]),0);
    let cursor=0; const segments=[];
    filtered.forEach((item,i)=>{const pct=total?(Number(item[1])/total*100):0;segments.push(`${CHART_COLORS[i%CHART_COLORS.length]} ${cursor}% ${cursor+pct}%`);cursor+=pct;});
    const bg=segments.length?`conic-gradient(${segments.join(',')})`:'#e5e7eb';
    return `<div class="donut-layout"><div class="donut-chart" style="background:${bg}"><div class="donut-hole"><strong>${total}</strong><span>${esc(centerLabel)}</span></div></div><div class="chart-legend">${filtered.length?filtered.map((item,i)=>`<div class="legend-item"><span class="legend-dot" style="background:${CHART_COLORS[i%CHART_COLORS.length]}"></span><span>${esc(item[0])}</span><strong>${item[1]}</strong></div>`).join(''):'<div class="muted">Sin datos.</div>'}</div></div>`;
  }

  function renderDashboard(data,user){
    const visible = user.rol==='Empleado'
      ? data.assignments.filter(a=>a.usuario_id===user.id)
      : user.rol==='Supervisor'
        ? data.assignments.filter(a=>{const u=userById(a.usuario_id,data); return a.usuario_id===user.id || (u?.rol==='Empleado'&&u.area===user.area);})
        : data.assignments;
    const completed=visible.filter(a=>a.estado==='Completado').length;
    const failed=visible.filter(a=>a.estado==='Evaluación no aprobada').length;
    const pending=visible.filter(a=>a.estado==='Pendiente').length;
    const inProgress=visible.filter(a=>a.estado==='En progreso').length;
    const avg=visible.length?Math.round(visible.reduce((sum,a)=>sum+a.porcentaje,0)/visible.length):0;
    const stateCounts=[['Completados',completed],['En progreso',inProgress],['Pendientes',pending],['No aprobados',failed]];

    if(user.rol==='Empleado'){
      return renderCourses(data,user);
    }

    const supervisor=user.rol==='Supervisor';
    const visibleUsers=supervisor?data.users.filter(u=>u.estado==='Activo'&&(u.id===user.id||(u.rol==='Empleado'&&u.area===user.area))):data.users.filter(u=>u.estado==='Activo');
    const visibleCourseSet=supervisor?data.courses.filter(c=>c.area===user.area):data.courses;
    const roleCounts=['Super Admin','Admin','Supervisor','Empleado'].map(r=>[r,visibleUsers.filter(u=>u.rol===r).length]).filter(x=>x[1]>0);
    const areas=[...new Set(visibleCourseSet.map(c=>c.area))].map(area=>[area,visibleCourseSet.filter(c=>c.area===area).length]);
    const maxArea=Math.max(1,...areas.map(x=>x[1]));
    const courseAverages=visibleCourseSet.map(c=>{const aa=visible.filter(a=>a.curso_id===c.id);const value=aa.length?Math.round(aa.reduce((sum,a)=>sum+a.porcentaje,0)/aa.length):0;return [c.titulo,value];});
    return `<main class="page"><div class="section-title"><div><p class="label">${supervisor?'Seguimiento del área':'Vista administrativa'}</p><h2>Dashboard</h2><p>${supervisor?`Indicadores de capacitación visibles para el área ${esc(user.area)}.`:'Indicadores generales de capacitación y seguimiento.'}</p></div></div>
    <div class="cards-grid"><div class="card"><span class="caption">Usuarios visibles</span><div class="number">${visibleUsers.length}</div></div><div class="card"><span class="caption">Cursos visibles</span><div class="number">${visibleCourseSet.length}</div></div><div class="card"><span class="caption">Materiales</span><div class="number">${visibleCourseSet.reduce((sum,c)=>sum+c.materiales.length,0)}</div></div><div class="card"><span class="caption">Promedio avance</span><div class="number">${avg}%</div></div><div class="card"><span class="caption">Completados</span><div class="number">${completed}</div></div><div class="card"><span class="caption">No aprobados</span><div class="number">${failed}</div></div><div class="card"><span class="caption">Pendientes</span><div class="number">${pending}</div></div><div class="card"><span class="caption">En progreso</span><div class="number">${inProgress}</div></div></div>
    <div class="dashboard-grid">
      <section class="panel"><div class="panel-heading"><div><h3>Usuarios por rol</h3><p>Distribución de usuarios visibles.</p></div></div>${donutMarkup(roleCounts,'Usuarios')}</section>
      <section class="panel"><div class="panel-heading"><div><h3>Cursos por área</h3><p>Cantidad de cursos disponibles por área.</p></div></div><div class="chart-list">${areas.length?areas.map(([r,n])=>`<div class="chart-row"><span>${esc(r)}</span><div class="bar"><span style="width:${n/maxArea*100}%"></span></div><strong>${n}</strong></div>`).join(''):'<div class="empty">Sin datos.</div>'}</div></section>
      <section class="panel"><div class="panel-heading"><div><h3>Estado de capacitaciones</h3><p>Distribución de los registros de avance.</p></div></div>${donutMarkup(stateCounts,'Registros')}</section>
      <section class="panel"><div class="panel-heading"><div><h3>Avance promedio por curso</h3><p>Promedio de avance de los usuarios asignados.</p></div></div><div class="chart-list">${courseAverages.length?courseAverages.map(([name,pct])=>`<div class="progress-chart-row"><div class="progress-chart-label"><span>${esc(name)}</span><strong>${pct}%</strong></div><div class="bar bar-lg"><span style="width:${pct}%"></span></div></div>`).join(''):'<div class="empty">Sin datos.</div>'}</div></section>
    </div></main>`;
  }

  function visibleCourses(data,user){
    if(user.rol==='Empleado') return data.courses.filter(c=>assignmentFor(user.id,c.id,data));
    if(user.rol==='Supervisor') return data.courses.filter(c=>c.area===user.area);
    return data.courses;
  }

  function renderCourses(data,user){
    const all=visibleCourses(data,user); const q=ui.courseSearch.toLowerCase();
    const courses=all.filter(c=>(!q||c.titulo.toLowerCase().includes(q)||c.descripcion.toLowerCase().includes(q))&&(ui.courseArea==='all'||c.area===ui.courseArea)&&(ui.courseStatus==='all'||c.estado===ui.courseStatus));
    const areas=[...new Set(all.map(c=>c.area))];
    return `<main class="page"><div class="section-title"><div><p class="label">Capacitación</p><h2>Cursos disponibles</h2><p>${user.rol==='Empleado'?'En esta sección se muestran únicamente los cursos asignados a tu usuario.':'Administra cursos, contenidos, asignaciones y resultados.'}</p></div>${canCreateCourse(user)?`<button onclick="openCreateCourse()">Crear curso</button>`:''}</div>
    <div class="filterbar"><input id="course-search" value="${esc(ui.courseSearch)}" oninput="uiSet('courseSearch',this.value)" placeholder="Buscar curso..." autocomplete="off"><select onchange="uiSet('courseArea',this.value)"><option value="all">Todas las áreas</option>${areas.map(a=>`<option ${ui.courseArea===a?'selected':''}>${esc(a)}</option>`).join('')}</select><select onchange="uiSet('courseStatus',this.value)"><option value="all">Todos los estados</option><option ${ui.courseStatus==='Disponible'?'selected':''}>Disponible</option><option ${ui.courseStatus==='Inactivo'?'selected':''}>Inactivo</option></select></div>
    ${courses.length?`<div class="courses-grid">${courses.map(c=>{const a=assignmentFor(user.id,c.id,data);const assigned=data.assignments.filter(x=>x.curso_id===c.id);const resp=userById(c.responsable_id,data);return `<article class="course-card"><div class="actions">${statusBadge(c.estado)}<span class="badge badge-blue">${esc(c.area)}</span></div><h3>${esc(c.titulo)}</h3><p>${esc(c.descripcion)}</p><div class="course-meta"><span><strong>${c.duracion_horas} h</strong><br>Duración</span><span><strong>${c.dias_para_finalizar} días</strong><br>Plazo</span><span><strong>${esc(resp?.nombre||'Sin responsable')}</strong><br>Responsable</span><span><strong>${user.rol==='Empleado'?(a?.porcentaje||0)+'%':assigned.length}</strong><br>${user.rol==='Empleado'?'Mi avance':'Asignados'}</span></div>${user.rol==='Empleado'?`<div class="progress-line"><span style="width:${a?.porcentaje||0}%"></span></div>`:''}<div class="course-actions"><button onclick="openCourse(${c.id})">Ver detalle</button>${canManageCourse(user,c)?`<button class="btn-secondary" onclick="openAssign(${c.id})">Asignar usuario</button>`:''}</div></article>`}).join('')}</div>`:'<div class="empty">No se encontraron cursos con los filtros seleccionados.</div>'}</main>`;
  }

  function openCourse(id){ ui.selectedCourseId=Number(id); ui.courseTab='resumen'; ui.view='cursoDetalle'; renderCourseStandalone(); }
  function renderCourseStandalone(){
    const data=loadData(), user=currentUser(data), course=courseById(ui.selectedCourseId,data); if(!user||!course){ui.view='cursos';render();return;}
    const root=document.getElementById('view');
    root.innerHTML=`<main class="page"><div class="section-title"><div><p class="label">Detalle del curso</p><h2>${esc(course.titulo)}</h2><p>${esc(course.descripcion)}</p></div><button class="btn-secondary" onclick="navigate('cursos')">← Volver a cursos</button></div>${renderCourseDetail(course,data,user)}</main>`;
  }

  function renderCourseDetail(course,data,user){
    const own=assignmentFor(user.id,course.id,data); const resp=userById(course.responsable_id,data);
    const tabs=['resumen','materiales','evaluacion'];
    let body='';
    if(ui.courseTab==='resumen'){
      body=`<div class="detail-grid"><div class="detail-item"><span>Área</span><strong>${esc(course.area)}</strong></div><div class="detail-item"><span>Duración</span><strong>${course.duracion_horas} horas</strong></div><div class="detail-item"><span>Responsable</span><strong>${esc(resp?.nombre||'—')}</strong></div><div class="detail-item"><span>Estado</span><strong>${statusBadge(course.estado)}</strong></div><div class="detail-item"><span>Fecha límite</span><strong>${fmtDate(own?.fecha_limite)}</strong></div><div class="detail-item"><span>Mi avance</span><strong>${own?own.porcentaje+'%':'Sin asignación para este usuario'}</strong></div></div>`;
      if(canManageCourse(user,course)) body+=renderAssignedTable(course,data,user);
      else if(own) body+=`<section class="panel" style="margin-top:18px"><h3>Mi estado</h3><div class="progress-line"><span style="width:${own.porcentaje}%"></span></div><p>${own.porcentaje}% · ${statusBadge(own.estado)} · Fecha: ${statusBadge(dueStatus(own))}</p></section>`;
    } else if(ui.courseTab==='materiales') body=renderMaterials(course,data,user,own);
    else body=renderEvaluation(course,data,user,own);
    return `<div class="tabs">${tabs.map(t=>`<button class="tab ${ui.courseTab===t?'active':''}" onclick="setCourseTab('${t}')">${t==='resumen'?'Resumen':t==='materiales'?'Materiales':'Evaluación'}</button>`).join('')}</div>${body}`;
  }

  function renderAssignedTable(course,data,user){
    const rows=data.assignments.filter(a=>a.curso_id===course.id).filter(a=>user.rol!=='Supervisor'||a.usuario_id===user.id||(userById(a.usuario_id,data)?.rol==='Empleado'&&userById(a.usuario_id,data)?.area===user.area));
    return `<section class="panel" style="margin-top:20px"><div class="section-title" style="margin-bottom:12px"><div><h3>Usuarios asignados</h3><p>Seguimiento de avance, resultados y reintentos.</p></div><button class="btn-secondary" onclick="openAssign(${course.id})">Asignar usuario</button></div>${rows.length?`<div class="table-container" style="box-shadow:none"><table><thead><tr><th>Usuario</th><th>Área</th><th>Avance</th><th>Estado</th><th>Evaluación</th><th>Intentos</th><th>Reintento</th><th>Acción</th></tr></thead><tbody>${rows.map(a=>{const u=userById(a.usuario_id,data);const failed=a.attempts.filter(x=>x.estado==='No aprobada').length;return `<tr><td><strong>${esc(u?.nombre)}</strong><br><small>${esc(u?.correo)}</small></td><td>${esc(u?.area)}</td><td>${a.porcentaje}%</td><td>${statusBadge(a.estado)}</td><td>${statusBadge(a.evaluacion_estado)}</td><td>${a.attempts.length}<br><small>${failed} fallidos</small></td><td>${a.reintento_habilitado?statusBadge('Habilitado'):statusBadge(a.estado==='Evaluación no aprobada'?'Bloqueado':'—')}</td><td>${a.estado==='Evaluación no aprobada'&&!a.reintento_habilitado?`<button class="btn-warning btn-small" onclick="enableRetryConfirm(${a.id})">Habilitar reintento</button>`:'—'}</td></tr>`}).join('')}</tbody></table></div>`:'<div class="empty">Todavía no hay usuarios asignados a este curso.</div>'}</section>`;
  }

  function renderMaterials(course,data,user,own){
    const isLearner=user.rol==='Empleado';
    if(isLearner&&!own) return '<div class="alert alert-warning">Este curso no está asignado a tu usuario.</div>';
    return `<section class="panel"><h3>Materiales de aprendizaje</h3><p class="muted">Revisa los contenidos obligatorios antes de presentar la evaluación.</p>${course.materiales.map(m=>{const completed=own?.materiales_completados.includes(m.id);return `<div class="material"><div><h4>${esc(m.titulo)}</h4><p>${esc(m.descripcion)} · ${esc(m.tipo)}</p></div><div class="material-actions">${completed?statusBadge('Completado'):statusBadge('Pendiente')}<button class="btn-secondary btn-small" onclick="viewMaterial(${m.id})">Abrir</button>${isLearner&&!completed?`<button class="btn-small" onclick="completeMaterial(${m.id})">Marcar como completado</button>`:''}</div></div>`}).join('')}${own?`<div class="alert alert-info"><strong>Avance:</strong> ${own.materiales_completados.length} de ${course.materiales.length} materiales completados.</div>`:''}</section>`;
  }

  function renderEvaluation(course,data,user,own){
    if(user.rol!=='Empleado') return `<section class="panel"><h3>${esc(course.evaluacion.titulo)}</h3><p class="muted">Puntaje mínimo: ${course.evaluacion.puntaje_minimo}% · ${course.evaluacion.preguntas.length} preguntas activas.</p><div class="alert alert-info">Los perfiles administrativos configuran y supervisan la evaluación; la presentación corresponde al colaborador asignado.</div></section>`;
    if(!own) return '<div class="alert alert-warning">Este curso no está asignado a tu usuario.</div>';
    const ready=own.materiales_completados.length===course.materiales.length;
    if(!ready) return `<section class="panel"><h3>${esc(course.evaluacion.titulo)}</h3><div class="alert alert-warning">Debes completar todos los materiales obligatorios antes de presentar la evaluación.</div></section>`;
    if(own.estado==='Completado') return `<section class="panel"><h3>Evaluación aprobada</h3><div class="alert alert-success">Has aprobado el curso con ${own.ultimo_puntaje}% y tu avance llegó al 100 %.</div><div class="actions"><button class="btn-success" onclick="viewCertificate(${own.id})">Ver certificado</button></div>${renderAttemptHistory(own)}</section>`;
    const failed=own.attempts.length>0 && own.attempts[own.attempts.length-1].estado==='No aprobada';
    if(failed&&!own.reintento_habilitado) return `<section class="panel"><h3>Evaluación no aprobada</h3><div class="alert alert-error"><strong>Reintento bloqueado.</strong> Tu último puntaje fue ${own.ultimo_puntaje}%. Debes solicitar a un administrador que habilite un nuevo intento.</div>${renderAttemptHistory(own)}</section>`;
    return `<section class="panel"><div class="section-title"><div><h3>${failed?'Reintentar evaluación':esc(course.evaluacion.titulo)}</h3><p>Puntaje mínimo de aprobación: ${course.evaluacion.puntaje_minimo}%.</p></div>${failed?statusBadge('Habilitado'):''}</div><form id="evaluation-form">${course.evaluacion.preguntas.map((q,i)=>`<div class="question"><h4>${i+1}. ${esc(q.texto)}</h4>${q.opciones.map((op,j)=>`<label class="option"><input type="radio" name="q_${q.id}" value="${j}"> <span>${String.fromCharCode(65+j)}. ${esc(op)}</span></label>`).join('')}</div>`).join('')}<button type="submit">Enviar evaluación</button></form>${renderAttemptHistory(own)}</section>`;
  }

  function renderAttemptHistory(a){ if(!a.attempts.length)return''; return `<div style="margin-top:20px"><h4>Historial de intentos</h4><div class="table-container" style="box-shadow:none"><table style="min-width:500px"><thead><tr><th>Intento</th><th>Puntaje</th><th>Estado</th><th>Fecha</th></tr></thead><tbody>${a.attempts.map((x,i)=>`<tr><td>${i+1}</td><td>${x.puntaje}%</td><td>${statusBadge(x.estado)}</td><td>${fmtDate(x.fecha)}</td></tr>`).join('')}</tbody></table></div></div>`; }

  function bindEvaluation(){
    const f=document.getElementById('evaluation-form'); if(!f) return;
    f.addEventListener('submit', e=>{e.preventDefault();submitEvaluation(new FormData(f));});
  }

  function renderProgress(data,user){
    let rows=data.assignments;
    if(user.rol==='Empleado') rows=rows.filter(a=>a.usuario_id===user.id);
    if(user.rol==='Supervisor') rows=rows.filter(a=>a.usuario_id===user.id||(userById(a.usuario_id,data)?.rol==='Empleado'&&userById(a.usuario_id,data)?.area===user.area));
    const metrics={total:rows.length,completados:rows.filter(a=>a.estado==='Completado').length,enprogreso:rows.filter(a=>a.estado==='En progreso').length,noaprobados:rows.filter(a=>a.estado==='Evaluación no aprobada').length,pendientes:rows.filter(a=>a.estado==='Pendiente').length,vencidos:rows.filter(a=>dueStatus(a)==='Vencido').length,avg:rows.length?Math.round(rows.reduce((s,a)=>s+a.porcentaje,0)/rows.length):0};
    return `<main class="page"><div class="section-title"><div><p class="label">Seguimiento</p><h2>Avances</h2><p>${user.rol==='Empleado'?'Consulta tu progreso de capacitación.':'Seguimiento consolidado de las asignaciones visibles para tu rol.'}</p></div></div><div class="cards-grid"><div class="card"><span class="caption">Total registros</span><div class="number">${metrics.total}</div></div><div class="card"><span class="caption">Completados</span><div class="number">${metrics.completados}</div></div><div class="card"><span class="caption">En progreso</span><div class="number">${metrics.enprogreso}</div></div><div class="card"><span class="caption">No aprobados</span><div class="number">${metrics.noaprobados}</div></div><div class="card"><span class="caption">Pendientes</span><div class="number">${metrics.pendientes}</div></div><div class="card"><span class="caption">Vencidos</span><div class="number">${metrics.vencidos}</div></div><div class="card"><span class="caption">Promedio avance</span><div class="number">${metrics.avg}%</div></div></div>${rows.length?`<div class="table-container"><table><thead><tr><th>Usuario</th><th>Curso</th><th>Área</th><th>Estado</th><th>Avance</th><th>Materiales</th><th>Evaluación</th><th>Fecha límite</th><th>Plazo</th></tr></thead><tbody>${rows.map(a=>{const u=userById(a.usuario_id,data),c=courseById(a.curso_id,data);return `<tr><td>${esc(u?.nombre)}</td><td>${esc(c?.titulo)}</td><td>${esc(c?.area)}</td><td>${statusBadge(a.estado)}</td><td>${a.porcentaje}%</td><td>${a.materiales_completados.length}/${c?.materiales.length||0}</td><td>${statusBadge(a.evaluacion_estado)}</td><td>${fmtDate(a.fecha_limite)}</td><td>${statusBadge(dueStatus(a))}</td></tr>`}).join('')}</tbody></table></div>`:'<div class="empty">No existen registros de avance todavía.</div>'}</main>`;
  }

  function renderUsers(data,user){
    return `<main class="page"><div class="section-title"><div><p class="label">Administración</p><h2>Usuarios</h2><p>Gestiona los perfiles autorizados para acceder a ITOS Academy.</p></div><button onclick="toggleUserForm()">${ui.showUserForm?'Cerrar formulario':'Crear usuario'}</button></div>${ui.showUserForm?renderUserCreateForm():''}<div class="table-container"><table><thead><tr><th>Nombre</th><th>Correo</th><th>Rol</th><th>Área</th><th>Cargo</th><th>País</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>${data.users.map(u=>`<tr><td><strong>${esc(u.nombre)}</strong></td><td>${esc(u.correo)}</td><td>${statusBadge(u.rol)}</td><td>${esc(u.area)}</td><td>${esc(u.cargo||'—')}</td><td>${esc(u.pais)}</td><td>${statusBadge(u.estado)}</td><td><div class="actions"><button class="btn-secondary btn-small" onclick="editUser(${u.id})">Editar</button>${u.id!==user.id?`<button class="${u.estado==='Activo'?'btn-danger':'btn-success'} btn-small" onclick="toggleUserStatus(${u.id})">${u.estado==='Activo'?'Inactivar':'Activar'}</button>`:''}</div></td></tr>`).join('')}</tbody></table></div></main>`;
  }

  function renderUserCreateForm(){ return `<section class="panel"><h3>Crear usuario</h3><form id="user-create-form" class="form-grid"><div class="form-field"><label>Nombre</label><input name="nombre" required></div><div class="form-field"><label>Correo</label><input name="correo" type="email" required></div><div class="form-field"><label>Contraseña</label><input name="password" type="password" value="Admin123" required></div><div class="form-field"><label>Rol</label><select name="rol"><option>Empleado</option><option>Supervisor</option><option>Admin</option></select></div><div class="form-field"><label>Área</label><select name="area"><option>BPO</option><option>Implementacion</option><option>IT</option></select></div><div class="form-field"><label>Cargo</label><input name="cargo"></div><div class="form-field"><label>País</label><input name="pais" value="Colombia"></div><div class="form-field"><label>Fecha ingreso</label><input name="fecha_ingreso" type="date" value="${todayISO()}"></div><div class="full"><button type="submit">Guardar usuario</button></div></form></section>`; }

  function bindUserForm(){ const f=document.getElementById('user-create-form'); if(!f)return; f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f),data=loadData();const correo=String(fd.get('correo')).trim().toLowerCase();if(data.users.some(u=>u.correo.toLowerCase()===correo)){toast('Ya existe un usuario con ese correo.','error');return;}data.users.push({id:Math.max(...data.users.map(u=>u.id))+1,nombre:String(fd.get('nombre')).trim(),correo,password:String(fd.get('password')),rol:String(fd.get('rol')),area:String(fd.get('area')),cargo:String(fd.get('cargo')).trim(),pais:String(fd.get('pais')).trim()||'Colombia',estado:'Activo',fecha_ingreso:String(fd.get('fecha_ingreso'))});saveData(data);ui.showUserForm=false;render();toast('Usuario creado correctamente.');}); }

  function renderProfile(data,user){
    return `<main class="page"><div class="section-title"><div><p class="label">Cuenta personal</p><h2>Mi perfil</h2><p>Consulta tu información y actualiza los datos permitidos.</p></div></div><div class="profile-grid"><section class="panel"><h3>Información de la cuenta</h3><div class="profile-list">${[['Nombre',user.nombre],['Correo',user.correo],['Rol',user.rol],['Área',user.area],['Cargo',user.cargo],['Estado',user.estado]].map(([l,v])=>`<div class="profile-item"><span>${l}</span><strong>${esc(v||'—')}</strong></div>`).join('')}</div></section><section class="panel"><h3>Actualizar país</h3><form id="profile-country"><div class="form-field"><label>País</label><input name="pais" value="${esc(user.pais)}" required></div><button type="submit">Guardar cambios</button></form></section><section class="panel" style="grid-column:1/-1"><h3>Cambiar contraseña</h3><form id="profile-password" class="form-grid"><div class="form-field"><label>Contraseña actual</label><input type="password" name="actual" required></div><div class="form-field"><label>Nueva contraseña</label><input type="password" name="nueva" minlength="6" required></div><div class="form-field"><label>Confirmar nueva contraseña</label><input type="password" name="confirmar" minlength="6" required></div><div class="full"><button type="submit">Cambiar contraseña</button></div></form></section></div></main>`;
  }

  function bindProfile(){
    const f1=document.getElementById('profile-country'); if(f1)f1.addEventListener('submit',e=>{e.preventDefault();const data=loadData(),u=userById(getSessionId(),data);u.pais=new FormData(f1).get('pais').trim();saveData(data);render();toast('Perfil actualizado correctamente.');});
    const f2=document.getElementById('profile-password'); if(f2)f2.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f2),data=loadData(),u=userById(getSessionId(),data);if(fd.get('actual')!==u.password){toast('La contraseña actual no es correcta.','error');return;}if(fd.get('nueva')!==fd.get('confirmar')){toast('La nueva contraseña y la confirmación no coinciden.','error');return;}u.password=String(fd.get('nueva'));saveData(data);f2.reset();toast('Contraseña actualizada correctamente.');});
  }

  window.navigate=function(view){ui.view=view;render();afterRender();};
  window.uiSet=function(k,v){
    ui[k]=v;
    render();
    afterRender();
    // El buscador de cursos se vuelve a dibujar al filtrar. Restauramos
    // el foco y el cursor para permitir escribir palabras completas sin interrupción.
    if(k==='courseSearch'){
      const input=document.getElementById('course-search');
      if(input){
        input.focus();
        const pos=input.value.length;
        try{ input.setSelectionRange(pos,pos); }catch(e){}
      }
    }
  };
  window.logout=function(){clearSession();ui.view='dashboard';render();};
  window.closeModal=closeModal;
  window.setCourseTab=function(tab){ui.courseTab=tab;renderCourseStandalone();bindEvaluation();};
  window.toggleUserForm=function(){ui.showUserForm=!ui.showUserForm;render();afterRender();};

  window.resetDemo=function(){
    if(!confirm('¿Restablecer la demo? Se restaurarán los cursos de ejemplo y el curso de prueba a su estado inicial.'))return;
    const session=getSessionId();saveData(seedData());if(session===1)setSessionId(1);else clearSession();ui.view='dashboard';closeModal();render();afterRender();toast('Datos restaurados al estado inicial.');
  };

  window.openCreateCourse=function(){
    const data=loadData(), current=currentUser(data); if(!canCreateCourse(current)) return;
    const areaControl=current.rol==='Supervisor'
      ? `<input name="area" value="${esc(current.area)}" readonly>`
      : `<select name="area"><option>BPO</option><option>Implementacion</option><option>IT</option><option>RRHH</option></select>`;
    modal(`<div class="modal-head"><div><p class="label">Gestión de cursos</p><h3>Crear curso</h3><p class="muted">${current.rol==='Supervisor'?'El Supervisor puede crear cursos únicamente para su propia área.':'Registra un nuevo curso para la demo.'}</p></div><button class="modal-close" onclick="closeModal()">✕</button></div>
      <form id="course-create-form" class="form-grid">
        <div class="form-field full"><label>Título del curso</label><input name="titulo" required placeholder="Nombre del curso"></div>
        <div class="form-field full"><label>Descripción</label><textarea name="descripcion" required placeholder="Descripción breve del curso"></textarea></div>
        <div class="form-field"><label>Área</label>${areaControl}</div>
        <div class="form-field"><label>Duración estimada (horas)</label><input name="duracion" type="number" min="0.5" step="0.5" value="2" required></div>
        <div class="form-field"><label>Días hábiles para finalizar</label><input name="dias" type="number" min="1" value="5" required></div>
        <div class="form-field"><label>Estado</label><select name="estado"><option>Disponible</option><option>Inactivo</option></select></div>
        <div class="modal-actions full"><button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button><button type="submit">Crear curso</button></div>
      </form>`);
    const f=document.getElementById('course-create-form');
    f.addEventListener('submit',e=>{
      e.preventDefault(); const fd=new FormData(f),d=loadData(),u=currentUser(d); if(!canCreateCourse(u)) return;
      const area=u.rol==='Supervisor'?u.area:String(fd.get('area'));
      const nextId=d.courses.length?Math.max(...d.courses.map(c=>c.id))+1:1;
      d.courses.push({
        id:nextId,
        titulo:String(fd.get('titulo')).trim(),
        descripcion:String(fd.get('descripcion')).trim(),
        area,
        duracion_horas:Number(fd.get('duracion'))||2,
        dias_para_finalizar:Number(fd.get('dias'))||5,
        responsable_id:u.id,
        estado:String(fd.get('estado')),
        materiales:[
          {id:nextId*1000+1,titulo:'Material introductorio',descripcion:'Material inicial del curso creado en la demo.',tipo:'Guía digital',contenido:'Contenido demostrativo del material introductorio. Revisa este contenido y márcalo como completado.'},
          {id:nextId*1000+2,titulo:'Procedimiento del curso',descripcion:'Pasos principales asociados al curso.',tipo:'Procedimiento',contenido:'Contenido demostrativo del procedimiento. Este material permite validar el flujo de aprendizaje del prototipo.'}
        ],
        evaluacion:{id:nextId*1000+100,titulo:`Evaluación ${String(fd.get('titulo')).trim()}`,puntaje_minimo:70,preguntas:[
          {id:1,texto:'¿Cuál es el propósito principal de esta capacitación?',opciones:['Aplicar correctamente el procedimiento aprendido','Eliminar controles del proceso','Cambiar permisos de usuario','Crear otra cuenta'],correcta:0},
          {id:2,texto:'¿Qué debe hacerse antes de finalizar una actividad?',opciones:['Ignorar los datos','Validar la información registrada','Cerrar la cuenta','Eliminar el curso'],correcta:1},
          {id:3,texto:'¿Qué evidencia permite confirmar el aprendizaje?',opciones:['La evaluación del curso','El color de la pantalla','El navegador utilizado','El nombre del equipo'],correcta:0},
          {id:4,texto:'¿Qué acción corresponde ante una inconsistencia?',opciones:['Continuar sin revisar','Corregir y validar la información','Crear un usuario nuevo','Cambiar el área'],correcta:1},
          {id:5,texto:'¿Cuándo se considera completado el proceso?',opciones:['Al ingresar al sistema','Al cumplir materiales y aprobar la evaluación','Al abrir el curso','Al cerrar sesión'],correcta:1}
        ]}
      });
      saveData(d); closeModal(); render(); afterRender(); toast('Curso creado correctamente.');
    });
  };

  window.openAssign=function(courseId){
    const data=loadData(),course=courseById(courseId,data),current=currentUser(data); if(!course||!canManageCourse(current,course))return;
    const eligible=data.users.filter(u=>u.estado==='Activo'&&u.id!==current.id&&u.rol!=='Super Admin'&&!assignmentFor(u.id,course.id,data)&&(current.rol!=='Supervisor'||(u.rol==='Empleado'&&u.area===current.area)));
    modal(`<div class="modal-head"><div><p class="label">Asignación</p><h3>Asignar curso</h3><p class="muted">${esc(course.titulo)}</p></div><button class="modal-close" onclick="closeModal()">✕</button></div>${eligible.length?`<form id="assign-form"><div class="form-field"><label>Colaborador</label><select name="usuario_id">${eligible.map(u=>`<option value="${u.id}">${esc(u.nombre)} · ${esc(u.rol)} · ${esc(u.area)}</option>`).join('')}</select></div><div class="modal-actions"><button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button><button type="submit">Asignar curso</button></div></form>`:'<div class="alert alert-info">No hay usuarios elegibles sin asignación para este curso.</div>'}`);
    const f=document.getElementById('assign-form');if(f)f.addEventListener('submit',e=>{e.preventDefault();const uid=Number(new FormData(f).get('usuario_id'));const d=loadData();d.assignments.push({id:d.assignments.length?Math.max(...d.assignments.map(a=>a.id))+1:1,usuario_id:uid,curso_id:course.id,porcentaje:0,estado:'Pendiente',materiales_completados:[],evaluacion_estado:'Pendiente',reintento_habilitado:false,fecha_limite:addBusinessDays(course.dias_para_finalizar),fecha_asignacion:todayISO(),fecha_finalizacion:null,ultimo_puntaje:null,attempts:[],certificado_codigo:null});saveData(d);closeModal();render();afterRender();toast('Curso asignado correctamente.');});
  };

  window.viewMaterial=function(materialId){const data=loadData(),course=courseById(ui.selectedCourseId,data),m=course?.materiales.find(x=>x.id===Number(materialId));if(!m)return;if(m.archivo){modal(`<div class="modal-head"><div><p class="label">Material de aprendizaje · PDF</p><h3>${esc(m.titulo)}</h3></div><button class="modal-close" onclick="closeModal()">✕</button></div><p class="muted">${esc(m.descripcion)}</p><div class="pdf-viewer"><iframe src="${esc(m.archivo)}#toolbar=1&navpanes=0" title="${esc(m.titulo)}"></iframe></div><div class="modal-actions"><a class="btn-secondary btn-link" href="${esc(m.archivo)}" target="_blank" rel="noopener">Abrir PDF en otra pestaña</a><button onclick="closeModal()">Cerrar</button></div>`,true);return;}modal(`<div class="modal-head"><div><p class="label">Material de aprendizaje</p><h3>${esc(m.titulo)}</h3></div><button class="modal-close" onclick="closeModal()">✕</button></div><p class="muted">${esc(m.descripcion)}</p><div class="alert alert-info" style="white-space:pre-line">${esc(m.contenido)}</div><div class="modal-actions"><button onclick="closeModal()">Cerrar</button></div>`);};

  window.completeMaterial=function(materialId){const data=loadData(),u=currentUser(data),a=assignmentFor(u.id,ui.selectedCourseId,data),course=courseById(ui.selectedCourseId,data);if(!a||!course)return;if(!a.materiales_completados.includes(Number(materialId)))a.materiales_completados.push(Number(materialId));const count=a.materiales_completados.length,total=course.materiales.length;a.porcentaje=Math.round((count/total)*50);a.estado=count===total?'En progreso':'En progreso';saveData(data);renderCourseStandalone();bindEvaluation();toast('Material completado. El avance fue actualizado.');};

  window.enableRetryConfirm=function(aid){const data=loadData(),a=data.assignments.find(x=>x.id===Number(aid)),u=userById(a?.usuario_id,data),c=courseById(a?.curso_id,data);if(!a)return;const failed=a.attempts.filter(x=>x.estado==='No aprobada').length;modal(`<div class="modal-head"><div><p class="label">Control de evaluación</p><h3>Habilitar nuevo intento</h3></div><button class="modal-close" onclick="closeModal()">✕</button></div><div class="detail-grid"><div class="detail-item"><span>Empleado</span><strong>${esc(u?.nombre)}</strong></div><div class="detail-item"><span>Curso</span><strong>${esc(c?.titulo)}</strong></div><div class="detail-item"><span>Área</span><strong>${esc(u?.area)}</strong></div><div class="detail-item"><span>Estado</span><strong>${esc(a.estado)}</strong></div><div class="detail-item"><span>Intentos fallidos</span><strong>${failed}</strong></div></div><div class="alert alert-warning">El historial anterior se conservará. El colaborador podrá volver a presentar la evaluación.</div><div class="modal-actions"><button class="btn-secondary" onclick="closeModal()">Cancelar</button><button class="btn-warning" onclick="enableRetry(${a.id})">Habilitar reintento</button></div>`);};
  window.enableRetry=function(aid){const data=loadData(),a=data.assignments.find(x=>x.id===Number(aid));if(!a)return;a.reintento_habilitado=true;saveData(data);closeModal();if(ui.view==='cursoDetalle')renderCourseStandalone();else render();afterRender();toast('Reintento habilitado correctamente.');};

  function submitEvaluation(fd){
    const data=loadData(),u=currentUser(data),course=courseById(ui.selectedCourseId,data),a=assignmentFor(u.id,course.id,data);if(!a)return;
    const answers=[];for(const q of course.evaluacion.preguntas){const v=fd.get(`q_${q.id}`);if(v===null){toast('Debes responder todas las preguntas antes de enviar.','error');return;}answers.push(Number(v));}
    const correct=course.evaluacion.preguntas.reduce((s,q,i)=>s+(answers[i]===q.correcta?1:0),0);const score=Math.round(correct/course.evaluacion.preguntas.length*100);const passed=score>=course.evaluacion.puntaje_minimo;
    const attempt={numero:a.attempts.length+1,puntaje:score,estado:passed?'Aprobada':'No aprobada',fecha:todayISO()};a.attempts.push(attempt);a.ultimo_puntaje=score;a.reintento_habilitado=false;
    if(passed){a.evaluacion_estado='Aprobada';a.estado='Completado';a.porcentaje=100;a.fecha_finalizacion=todayISO();a.certificado_codigo=`ITOS-${CURRENT_YEAR}-${String(a.usuario_id).padStart(3,'0')}-${String(a.curso_id).padStart(3,'0')}-${String(a.id).padStart(4,'0')}`;}else{a.evaluacion_estado='No aprobada';a.estado='Evaluación no aprobada';a.porcentaje=Math.max(50,a.porcentaje);}
    saveData(data);renderCourseStandalone();bindEvaluation();toast(passed?`Evaluación aprobada con ${score}%. Curso completado.`:`Evaluación no aprobada: ${score}%. El reintento quedó bloqueado.`,passed?'success':'warning');
  }
  window.submitEvaluation=submitEvaluation;

  window.viewCertificate=function(aid){const data=loadData(),a=data.assignments.find(x=>x.id===Number(aid));if(!a||a.estado!=='Completado')return;const u=userById(a.usuario_id,data),c=courseById(a.curso_id,data),admin=data.users.find(x=>x.rol==='Super Admin');modal(`<div class="modal-head"><div><p class="label">Evidencia de finalización</p><h3>Certificado</h3></div><button class="modal-close" onclick="closeModal()">✕</button></div><div id="certificate-content" class="certificate"><img class="cert-logo" src="assets/logo-empresa.png" alt="ITOS"><p class="label">ITOS Academy</p><h2>Certificado de finalización</h2><p>Certifica que</p><div class="cert-name">${esc(u?.nombre)}</div><p>completó satisfactoriamente el curso</p><div class="cert-course">${esc(c?.titulo)}</div><div class="certificate-grid"><div><strong>Área</strong><br>${esc(c?.area)}</div><div><strong>Duración</strong><br>${c?.duracion_horas} horas</div><div><strong>Fecha de finalización</strong><br>${fmtDate(a.fecha_finalizacion)}</div><div><strong>Estado</strong><br>Curso completado</div></div><p style="margin-top:28px"><strong>${esc(admin?.nombre)}</strong><br>Administrador de plataforma · Firma digital demo</p><p class="cert-code">Código único: ${esc(a.certificado_codigo)}</p></div><div class="modal-actions"><button class="btn-secondary" onclick="closeModal()">Cerrar</button><button onclick="printCertificate(${a.id})">Imprimir certificado</button></div>`,true);};

  window.printCertificate=function(aid){const data=loadData(),a=data.assignments.find(x=>x.id===Number(aid));if(!a)return;const u=userById(a.usuario_id,data),c=courseById(a.curso_id,data),admin=data.users.find(x=>x.rol==='Super Admin');const w=window.open('','_blank','width=900,height=700');if(!w){toast('El navegador bloqueó la ventana de impresión.','error');return;}w.document.write(`<!doctype html><html><head><title>Certificado ITOS Academy</title><style>body{font-family:Arial;padding:35px;color:#1f2937}.cert{border:8px double #1e3a8a;padding:45px;text-align:center}.name{font-size:30px;font-weight:bold;color:#1d4ed8;margin:18px}.course{font-size:22px;font-weight:bold}.grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:25px}.grid div{border-top:1px solid #ccc;padding:10px}.code{font-family:monospace;color:#64748b;font-size:12px}</style></head><body><div class="cert"><h3>ITOS Academy</h3><h1>Certificado de finalización</h1><p>Certifica que</p><div class="name">${esc(u?.nombre)}</div><p>completó satisfactoriamente el curso</p><div class="course">${esc(c?.titulo)}</div><div class="grid"><div><b>Área</b><br>${esc(c?.area)}</div><div><b>Duración</b><br>${c?.duracion_horas} horas</div><div><b>Fecha</b><br>${fmtDate(a.fecha_finalizacion)}</div><div><b>Estado</b><br>Curso completado</div></div><p><b>${esc(admin?.nombre)}</b><br>Administrador de plataforma</p><p class="code">Código único: ${esc(a.certificado_codigo)}</p></div><script>window.onload=()=>window.print()<\/script></body></html>`);w.document.close();};

  window.toggleUserStatus=function(uid){const data=loadData(),u=userById(uid,data);if(!u)return;const next=u.estado==='Activo'?'Inactivo':'Activo';if(!confirm(`¿Deseas cambiar el estado de ${u.nombre} a ${next}?`))return;u.estado=next;saveData(data);render();afterRender();toast(`Usuario ${next.toLowerCase()} correctamente.`);};
  window.editUser=function(uid){const data=loadData(),u=userById(uid,data);if(!u)return;modal(`<div class="modal-head"><div><p class="label">Usuario</p><h3>Editar usuario</h3></div><button class="modal-close" onclick="closeModal()">✕</button></div><form id="edit-user-form" class="form-grid"><div class="form-field"><label>Nombre</label><input name="nombre" value="${esc(u.nombre)}" required></div><div class="form-field"><label>Correo</label><input name="correo" type="email" value="${esc(u.correo)}" required></div><div class="form-field"><label>Rol</label><select name="rol">${['Super Admin','Admin','Supervisor','Empleado'].map(r=>`<option ${r===u.rol?'selected':''}>${r}</option>`).join('')}</select></div><div class="form-field"><label>Área</label><select name="area">${['BPO','Implementacion','IT'].map(a=>`<option ${a===u.area?'selected':''}>${a}</option>`).join('')}</select></div><div class="form-field"><label>Cargo</label><input name="cargo" value="${esc(u.cargo||'')}"></div><div class="form-field"><label>País</label><input name="pais" value="${esc(u.pais||'Colombia')}"></div><div class="modal-actions full"><button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button><button type="submit">Guardar cambios</button></div></form>`);const f=document.getElementById('edit-user-form');f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f),d=loadData(),x=userById(uid,d);x.nombre=String(fd.get('nombre')).trim();x.correo=String(fd.get('correo')).trim();x.rol=String(fd.get('rol'));x.area=String(fd.get('area'));x.cargo=String(fd.get('cargo')).trim();x.pais=String(fd.get('pais')).trim();saveData(d);closeModal();render();afterRender();toast('Usuario actualizado correctamente.');});};

  function afterRender(){bindEvaluation();bindUserForm();bindProfile();}

  window.uiSet=window.uiSet;
  window.openCourse=openCourse;

  render(); afterRender();
})();
