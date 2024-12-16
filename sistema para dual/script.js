let entrevistas = [];

const estudiantes = [
    { nombre: "Ariatna Janette Flores Morales", correo: "ariatna_1321124212@uptecamac.edu.mx", matricula: "1321124212", grupo: "21024IS", carrera: "Ingeniería en Software", cuatrimestre: 10, foto: "ruta/a/la/foto/pedro.jpg" },
    { nombre: "Alondra Marin Sanchez", correo: "alondra_1322134048@uptecamac.edu.mx", matricula: "1322134048", grupo: "1724IS", carrera: "Ingeniería en Software", cuatrimestre: 7, foto: "ruta/a/la/foto/sofia.jpg" },
    { nombre: "Carlos Marina Vaquier", correo: "carlos_1324568452@uptecamac.edu.mx", matricula: "1324568452", grupo: "1423IF", carrera: "Ingeniería Financiera", cuatrimestre: 4, foto: "ruta/a/la/foto/carlos.jpg" },
    { nombre: "Ana Gómez Martinez", correo: "ana_1356487512@uptecamac.edu.mx", matricula: "1356487512", grupo: "3523IF", carrera: "Ingeniería Financiera", cuatrimestre: 5, foto: "ruta/a/la/foto/ana.jpg" },
    { nombre: "María Pérez Lopez", correo: "maria_1356782496@uptecamac.edu.mx", matricula: "1356782496", grupo: "2824ITM", carrera: "Ingeniería en Tecnologías de Manufactura", cuatrimestre: 8, foto: "ruta/a/la/foto/maria_p.jpg" },
    { nombre: "Roberto Mercado Marin", correo: "roberto_1322152127@uptecamac.edu.mx", matricula: "1322152127", grupo: "1724ITM", carrera: "Ingeniería en Tecnologías de Manufactura", cuatrimestre: 7, foto: "ruta/a/la/foto/roberto.jpg" },
    { nombre: "Andrés Rezendiz Torres", correo: "andres_1321124169@uptecamac.edu.mx", matricula: "1321124169", grupo: "11024IMA", carrera: "Ingeniería en Mecánica Automotriz", cuatrimestre: 10, foto: "ruta/a/la/foto/andres.jpg" },
    { nombre: "Gabriela López Molina", correo: "gabriela_1320133037@uptecamac.edu.mx", matricula: "1320133037", grupo: "2424IMA", carrera: "Ingeniería en Mecánica Automotriz", cuatrimestre: 4, foto: "ruta/a/la/foto/gabriela.jpg" },
    
];

function crearEntrevista(event) {
    event.preventDefault();

    const entrevista = {
        fecha: document.getElementById('fecha').value,
        hora: document.getElementById('hora').value,
        nombrePostulante: document.getElementById('nombrePostulante').value,
        grupo: document.getElementById('grupo').value,
        respuestas: {
            esperasDar: document.getElementById('esperasDar').value,
            constelacionFamiliar: document.getElementById('constelacionFamiliar').value,
            capacidadRespuesta: document.getElementById('capacidadRespuesta').value,
            estrategiasDesempenoAcademico: document.getElementById('estrategiasDesempenoAcademico').value,
            estrategiasDesempenoDestacado: document.getElementById('estrategiasDesempenoDestacado').value,
            nivelAdaptacion: document.getElementById('nivelAdaptacion').value
        },
        comentariosFinales: document.getElementById('comentariosFinales').value,
        resultadoApreciacion: document.getElementById('resultadoApreciacion').value
    };

    entrevistas.push(entrevista);
    console.log("Nueva entrevista agregada.");
    document.getElementById('entrevistaForm').reset();
    mostrarEntrevistasGuardadas();
    closeModal();
}

function mostrarEntrevistasGuardadas() {
    const entrevistasGuardadasDiv = document.getElementById('entrevistasGuardadas');
    entrevistasGuardadasDiv.innerHTML = '<h2>Entrevistas Guardadas:</h2>';

    entrevistas.forEach((entrevista, index) => {
        entrevistasGuardadasDiv.innerHTML += `
            <div>
                <h3>Entrevista ${index + 1}</h3>
                <p><strong>Fecha:</strong> ${entrevista.fecha}</p>
                <p><strong>Hora:</strong> ${entrevista.hora}</p>
                <p><strong>Nombre del Postulante:</strong> ${entrevista.nombrePostulante}</p>
                <p><strong>Grupo:</strong> ${entrevista.grupo}</p>
            </div>
        `;
    });
}

function volver() {
    document.getElementById('students-view').style.display = 'none';
    document.getElementById('home-view').style.display = 'block';
}

function showDocument(studentName, documentType) {
    if (documentType === 'Entrevista director') {
        document.getElementById('nombrePostulante').value = studentName;
        document.getElementById('entrevistaModal').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
    } else {
        alert(`Mostrando documento: ${documentType} para ${studentName}`);
    }
}

function gob() {
    document.getElementById('entrevistaModal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('home-view').style.display = 'block';
}

function closeModal() {
    document.getElementById('entrevistaModal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function showCheckList(studentName) {
    document.getElementById('candidateName').value = studentName;
    document.getElementById('checkListModal').style.display = 'block';
}

function closeCheckListModal() {
    document.getElementById('checkListModal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    const startButtons = document.querySelectorAll('.get-started-button');
    const homeView = document.getElementById('home-view');
    const studentsView = document.getElementById('students-view');
    const programTitle = document.getElementById('program-title');
    const studentList = document.getElementById('student-list');
    const studentFilters = document.querySelectorAll('.filter-button');

    startButtons.forEach(button => {
        button.addEventListener('click', function() {
            const program = this.getAttribute('data-program');
            programTitle.textContent = program;
            homeView.style.display = 'none';
            studentsView.style.display = 'block';
            displayStudents(program, 'all');
        });
    });

    studentFilters.forEach(button => {
        button.addEventListener('click', function() {
            studentFilters.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');
            const program = programTitle.textContent;
            displayStudents(program, filter);
        });
    });

    function displayStudents(carrera, filter) {
        studentList.innerHTML = '';
        const filteredStudents = estudiantes.filter(est => est.carrera === carrera);
        const finalFilteredStudents = filter === 'all' ? filteredStudents : filteredStudents.filter(est => est.cuatrimestre == filter);

        finalFilteredStudents.forEach(est => {
            const studentItem = document.createElement('div');
            studentItem.classList.add('student-item');
            studentItem.innerHTML = `
                <div class="student-item">
                <img src="${est.foto}" alt="${est.nombre}" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 10px;">
                <div>
                    <strong>${est.nombre}</strong><br>
                    <span>Correo: ${est.correo}</span><br>
                    <span>Matrícula: ${est.matricula}</span><br>
                    <span>Grupo: ${est.grupo}</span><br>
                    <span>Carrera: ${est.carrera}</span><br>
                    <button class="button doc-button" onclick="showDocument('${est.nombre}', 'Entrevista director')">Entrevista director</button>
                    <button class="button doc-button" onclick="window.location.href='check_list.html?nombre=${est.nombre}'">Check list</button>
                    <button class="button doc-button" onclick="showDocument('${est.nombre}', 'Evaluación dual')">Evaluación dual</button>
                    <button class="button doc-button" onclick="showDocument('${est.nombre}', 'Proceso de selección')">Proceso de selección</button>
                </div>
            </div>
            `;
            studentList.appendChild(studentItem);
        });
    }

    document.getElementById('entrevistaForm').addEventListener('submit', crearEntrevista);

    document.getElementById('downloadPdfButton').addEventListener('click', function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.text("Entrevista Guardada", 10, 10);
        doc.text("Fecha: " + document.getElementById('fecha').value, 10, 20);
        doc.text("Hora: " + document.getElementById('hora').value, 10, 30);
        doc.text("Nombre del Postulante: " + document.getElementById('nombrePostulante').value, 10, 40);

        doc.save('entrevista_guardada.pdf');
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('selectionForm');
    const sumatoriaTotal = document.getElementById('sumatoriaTotal');

    form.addEventListener('input', updateSums);
    form.addEventListener('submit', handleSubmit);

    function updateSums() {
        let total = 0;
        for (let i = 1; i <= 5; i++) {
            let sum = 0;
            for (let j = 1; j <= 9; j++) {
                const value = parseInt(form[`eval${i}_${j}`].value) || 0;
                sum += value;
            }
            document.getElementById(`sum${i}`).textContent = sum;
            total += sum;
        }
        sumatoriaTotal.textContent = `Sumatoria Total: ${total}`;
    }

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        console.log('Form data:', data);

        alert('Formulario enviado con éxito!');
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('entrevistaForm');
    const sumatoriaTotal = document.getElementById('sumatoriaTotal');
    const promedio = document.getElementById('promedio');

    form.addEventListener('input', updateSums);
    form.addEventListener('submit', handleSubmit);

    function updateSums() {
        let total = 0;
        for (let i = 1; i <= 9; i++) {
            const value = parseInt(form[`eval${i}`].value) || 0;
            total += value;
        }
        const avgValue = total / 9;
        sumatoriaTotal.textContent = `Sumatoria Total: ${total}`;
        promedio.textContent = `Promedio: ${avgValue.toFixed(2)}`;
    }

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        console.log('Form data:', data);

        alert('Formulario enviado con éxito!');
    }

    const now = new Date();
    document.getElementById('fecha').value = now.toISOString().split('T')[0];
    document.getElementById('hora').value = now.toTimeString().split(' ')[0].slice(0, 5);
});
function showDocument(studentName, documentType) {
    if (documentType === 'Entrevista director') {
        document.getElementById('nombrePostulante').value = studentName;
        document.getElementById('entrevistaModal').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
    } else if (documentType === 'Evaluación dual') {
        window.location.href = `evaluacion_dual.html?student=${encodeURIComponent(studentName)}`;
    } else {
        alert(`Mostrando documento: ${documentType} para ${studentName}`);
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('evaluacionForm');
    const sumatoria = document.getElementById('sumatoria');

    form.addEventListener('input', updateSum);
    form.addEventListener('submit', handleSubmit);

    function updateSum() {
        let total = 0;
        for (let i = 1; i <= 5; i++) {
            const value = parseInt(form[`eval${i}`].value) || 0;
            total += value;
        }
        sumatoria.textContent = `Sumatoria: ${total}`;
    }

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        console.log('Form data:', data);

        alert('Formulario enviado con éxito!');
    }

    const now = new Date();
    document.getElementById('fecha').value = now.toISOString().split('T')[0];

    const urlParams = new URLSearchParams(window.location.search);
    const studentName = urlParams.get('student');
    if (studentName) {
        document.getElementById('candidato').value = decodeURIComponent(studentName);
    }

    function showDocument(studentName, documentType) {
        if (documentType === 'Entrevista director') {
            document.getElementById('nombrePostulante').value = studentName;
            document.getElementById('entrevistaModal').style.display = 'block';
            document.getElementById('overlay').style.display = 'block';
        } else if (documentType === 'Evaluación dual') {
            window.location.href = `evaluacion_dual.html?student=${encodeURIComponent(studentName)}`;
        } else if (documentType === 'Proceso de selección') {
            window.location.href = `proceso_seleccion.html?student=${encodeURIComponent(studentName)}`;
        } else {
            alert(`Mostrando documento: ${documentType} para ${studentName}`);
        }
    }
});
function showDocument(studentName, documentType) {
    if (documentType === 'Entrevista director') {
        document.getElementById('nombrePostulante').value = studentName;
        document.getElementById('entrevistaModal').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
    } else if (documentType === 'Evaluación dual') {
        window.location.href = `evaluacion_dual.html?student=${encodeURIComponent(studentName)}`;
    } else if (documentType === 'Proceso de selección') {
        window.location.href = `proceso_seleccion.html?student=${encodeURIComponent(studentName)}`;
    } else {
        alert(`Mostrando documento: ${documentType} para ${studentName}`);
    }
}

function displayStudents(carrera, filter) {
    studentList.innerHTML = '';
    const filteredStudents = estudiantes.filter(est => est.carrera === carrera);
    const finalFilteredStudents = filter === 'all' ? filteredStudents : filteredStudents.filter(est => est.cuatrimestre == filter);

    finalFilteredStudents.forEach(est => {
        const studentItem = document.createElement('div');
        studentItem.classList.add('student-item');
        studentItem.innerHTML = `
            <div class="student-item">
            <img src="${est.foto}" alt="${est.nombre}" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 10px;">
            <div>
                <strong>${est.nombre}</strong><br>
                <span>Correo: ${est.correo}</span><br>
                <span>Matrícula: ${est.matricula}</span><br>
                <span>Grupo: ${est.grupo}</span><br>
                <span>Carrera: ${est.carrera}</span><br>
                <button class="button doc-button" onclick="showDocument('${est.nombre}', 'Entrevista director')">Entrevista director</button>
                <button class="button doc-button" onclick="showDocument('${est.nombre}', 'Check list')">Check list</button>
                <button class="button doc-button" onclick="showDocument('${est.nombre}', 'Evaluación dual')">Evaluación dual</button>
                <button class="button doc-button" onclick="showDocument('${est.nombre}', 'Proceso de selección')">Proceso de selección</button>
            </div>
        </div>
        `;
        studentList.appendChild(studentItem);
    });
}
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('entrevistaForm');

    form.addEventListener('submit', handleSubmit);

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        console.log('Form data:', data);

        alert('Formulario enviado con éxito!');
    }

    const now = new Date();
    document.getElementById('fecha').value = now.toISOString().split('T')[0];
    document.getElementById('hora').value = now.toTimeString().split(' ')[0].slice(0, 5);

    const urlParams = new URLSearchParams(window.location.search);
    const studentName = urlParams.get('student');
    if (studentName) {
        document.getElementById('nombrePostulante').value = decodeURIComponent(studentName);
    }
});
function showDocument(studentName, documentType) {
    if (documentType === 'Entrevista director') {
        window.location.href = `entrevista_director.html?student=${encodeURIComponent(studentName)}`;
    } else if (documentType === 'Evaluación dual') {
        window.location.href = `evaluacion_dual.html?student=${encodeURIComponent(studentName)}`;
    } else if (documentType === 'Proceso de selección') {
        window.location.href = `proceso_seleccion.html?student=${encodeURIComponent(studentName)}`;
    } else {
        alert(`Mostrando documento: ${documentType} para ${studentName}`);
    }
}

function displayStudents(carrera, filter) {
    studentList.innerHTML = '';
    const filteredStudents = estudiantes.filter(est => est.carrera === carrera);
    const finalFilteredStudents = filter === 'all' ? filteredStudents : filteredStudents.filter(est => est.cuatrimestre == filter);

    finalFilteredStudents.forEach(est => {
        const studentItem = document.createElement('div');
        studentItem.classList.add('student-item');
        studentItem.innerHTML = `
            <div class="student-item">
            <img src="${est.foto}" alt="${est.nombre}" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 10px;">
            <div>
                <strong>${est.nombre}</strong><br>
                <span>Correo: ${est.correo}</span><br>
                <span>Matrícula: ${est.matricula}</span><br>
                <span>Grupo: ${est.grupo}</span><br>
                <span>Carrera: ${est.carrera}</span><br>
                <button class="button doc-button" onclick="showDocument('${est.nombre}', 'Entrevista director')">Entrevista director</button>
                <button class="button doc-button" onclick="showDocument('${est.nombre}', 'Check list')">Check list</button>
                <button class="button doc-button" onclick="showDocument('${est.nombre}', 'Evaluación dual')">Evaluación dual</button>
                <button class="button doc-button" onclick="showDocument('${est.nombre}', 'Proceso de selección')">Proceso de selección</button>
            </div>
        </div>
        `;
        studentList.appendChild(studentItem);
    });
}
function downloadPDF(formId, fileName) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const form = document.getElementById(formId);

    if (!form) {
        console.error(`Form with id ${formId} not found`);
        return;
    }

    doc.setFontSize(18);
    doc.text(form.querySelector('h2').textContent, 10, 10);

    let yPosition = 30;
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        const label = form.querySelector(`label[for="${input.id}"]`);
        if (label) {
            doc.setFontSize(12);
            doc.text(`${label.textContent} ${input.value}`, 10, yPosition);
            yPosition += 10;
        }
    });

    const table = form.querySelector('table');
    if (table) {
        const headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent);
        const data = Array.from(table.querySelectorAll('tbody tr')).map(row => 
            Array.from(row.querySelectorAll('td')).map(td => td.textContent || td.querySelector('input')?.value || '')
        );

        doc.autoTable({
            head: [headers],
            body: data,
            startY: yPosition
        });
    }

    doc.save(fileName);
}

document.addEventListener('DOMContentLoaded', function() {
    const downloadButtons = document.querySelectorAll('.button[onclick^="downloadPDF"]');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const formId = this.closest('form').id;
            const fileName = `${formId}_${new Date().toISOString().split('T')[0]}.pdf`;
            downloadPDF(formId, fileName);
        });
    });
});
function downloadPDF(formId, fileName) {
    // Obtener el formulario
    const form = document.getElementById(formId);
    if (!form) {
        console.error('Formulario no encontrado');
        return;
    }

    // Crear un nuevo documento PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Agregar contenido al PDF
    doc.text('Evaluación de Proyecto', 10, 10);
    
    // Recorrer los campos del formulario y agregarlos al PDF
    const formData = new FormData(form);
    let y = 20; // Posición inicial en el eje Y
    for (const [key, value] of formData.entries()) {
        doc.text(`${key}: ${value}`, 10, y);
        y += 10; // Incrementar la posición Y
    }

    // Guardar el PDF
    doc.save(fileName);
}
function downloadPDF() { // Función para descargar el formulario como PDF
    const { jsPDF } = window.jspdf; // Crea una instancia de jsPDF
    const doc = new jsPDF(); // Crea un nuevo documento PDF

    doc.text("Checklist de Evaluación", 10, 10); // Agrega un título al PDF
    doc.text(`Candidato: ${document.getElementById('candidato').value}`, 10, 20); // Agrega el nombre del candidato
    doc.text(`Carrera: ${document.getElementById('carrera').value}`, 10, 30); // Agrega la carrera del candidato
    doc.text(`Grupo: ${document.getElementById('grupo').value}`, 10, 40); // Agrega el grupo del candidato
    doc.text(` Fecha: ${document.getElementById('fecha').value}`, 10, 50); // Agrega la fecha de la evaluación

    // Agregar evaluaciones
    const evaluations = [
        "Promedio en Historial académico",
        "Proactivo",
        "Habilidad interpersonal",
        "Autodidacta",
        "Responsable",
        "Respetuoso",
        "Apegado a políticas",
        "Comprometido",
        "Trabaja en equipo"
    ];

    evaluations.forEach((evalText, index) => {
        const eval1 = document.querySelector(`input[name="eval1_${index + 1}"]`).value; // Obtiene la evaluación del primer evaluador
        const eval2 = document.querySelector(`input[name="eval2_${index + 1}"]`).value; // Obtiene la evaluación del segundo evaluador
        const eval3 = document.querySelector(`input[name="eval3_${index + 1}"]`).value; // Obtiene la evaluación del tercer evaluador
        const eval4 = document.querySelector(`input[name="eval4_${index + 1}"]`).value; // Obtiene la evaluación del cuarto evaluador
        const eval5 = document.querySelector(`input[name="eval5_${index + 1}"]`).value; // Obtiene la evaluación del quinto evaluador

        doc.text(`${index + 1}.- ${evalText}: Evaluador 1: ${eval1}, Evaluador 2: ${eval2}, Evaluador 3: ${eval3}, Evaluador 4: ${eval4}, Evaluador 5: ${eval5}`, 10, 60 + (index * 10)); // Agrega las evaluaciones al PDF
    });

    // Agregar evaluadores
    const evaluators = [
        document.getElementById('evaluador1').value,
        document.getElementById('evaluador2').value,
        document.getElementById('evaluador3').value,
        document.getElementById('evaluador4').value,
        document.getElementById('evaluador5').value
    ];

    doc.text("Evaluadores:", 10, 120); // Agrega el título de evaluadores
    evaluadores.forEach((evaluator, index) => {
        doc.text(`Evaluador ${index + 1}: ${evaluator}`, 10, 130 + (index * 10)); // Agrega los nombres de los evaluadores al PDF
    });

    // Agregar director
    doc.text(`Director de Carrera: ${document.getElementById('director').value}`, 10, 180); // Agrega el nombre del director al PDF

    // Guardar el PDF
    doc.save("checklist_evaluacion.pdf"); // Guarda el documento PDF con el nombre especificado
}