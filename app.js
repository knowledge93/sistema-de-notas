//OBTENIENDO IDS
let materia = document.querySelector("#materia");
let notasAlumno = document.querySelector("#notas");
let alumno = document.querySelector("#alumno");

let promediarButton = document.querySelector("#promediar");
let limpiar = document.querySelector("#limpiar");
let nuevo = document.querySelector("#nuevo");

let salida = document.querySelector("#salida");

//FUNCIONES
cursorInput = (inputMateria) => inputMateria.focus();

limpiarCampos = () => {
  materia.value = "";
  notasAlumno.value = "";
  alumno.value = "";
  salida.textContent = "";
  
};

habilitarComponentes = () => {
  materia.disabled = false;
  notasAlumno.disabled = false;
  alumno.disabled = false;
  promediarButton.disabled = false;
  limpiar.disabled = false;
  nuevo.disabled = true;
  cursorInput(materia);
};

deshabilitarComponentes = () => {
    materia.disabled = true;
    notasAlumno.disabled = true;
    alumno.disabled = true;
    promediarButton.disabled = true;
    limpiar.disabled = true;
    nuevo.disabled = false;
  };

promedioArray = (inputEntrada) => {
  let salidaInput = inputEntrada.split(",");
  let arregloEntero = [];
  for (let i = 0; i < salidaInput.length; i++) {
    arregloEntero.push(Math.floor(salidaInput[i]));
  }
  return arregloEntero;
};

promediar = (notas) => {
  let notasArreglo = promedioArray(notas);
  let longitudArreglo = notasArreglo.length;
  let suma = 0;
  let promedio = 0;
  for (let i = 0; i < longitudArreglo; i++) {
    suma += notasArreglo[i];
  }
  promedio = suma / longitudArreglo;
  return promedio;
};

ordenarNotas = (notas) => {
  let notasArreglo = promedioArray(notas);
  let cadena = "";
  let notasOrdenada = notasArreglo.sort((a, b) => b - a);
  cadena = `La nota más alta es ${notasOrdenada[0]} y la nota más baja es ${
    notasOrdenada[notasOrdenada.length - 1]
  }`;
  return cadena;
};

ordenarNotasMayorMenor = (notas) => {
  let notasArreglo = promedioArray(notas);
  let cadena = "";
  let notasOrdenada = notasArreglo.sort((a, b) => b - a);
  cadena = `Sus notas de mayor a menor son: ${notasOrdenada}`;
  return cadena;
};

promedioAproboDesaprobo = (notas) => {
  let promedio = promediar(notas);
  let cadena = "";

  promedio >= 11 || promedio >= 13
    ? (cadena = "Aprobado 😊")
    : (cadena = "Desaprobado ☹️");

  return cadena;
};

mostrarResultado = (notas) => {
  salida.textContent += `Curso: ${materia.value} \n`;
  salida.textContent += `Alumno: ${alumno.value} \n`;
  salida.textContent += `Promedio general: ${promediar(notas)} \n`;
  salida.textContent += ordenarNotas(notas) + "\n";
  salida.textContent += ordenarNotasMayorMenor(notas) + "\n";
  salida.textContent += promedioAproboDesaprobo(notas);
};


//EVENTOS GENERALES
document.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    habilitarComponentes()
  }
  if(event.key=="Escape"){
    limpiarCampos()
    deshabilitarComponentes()
  }
  if(event.key=="F9"){
    mostrarResultado(notasAlumno.value)
  }
})

//EVENTOS BOTONES
limpiar.addEventListener("click", () => {
  limpiarCampos()
  deshabilitarComponentes()
});

promediarButton.addEventListener("click", () => {
    if(materia.value.length<1 || notasAlumno.value.length<1 || alumno.value.length<1){
        alert("Campos obligatorios..!!")
    }else{
        mostrarResultado(notasAlumno.value)
    }
});

nuevo.addEventListener("click", () => {
  habilitarComponentes();
});

//12,10,15,18,12
