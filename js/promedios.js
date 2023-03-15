let nombre_alumno, inasistencias, nota_pri_trim, nota_sec_trim, nota_ter_trim, promedio, estado

//declaro array
let lista_alumnos = [];

//defino el objeto alumno
class alumno{
    constructor(nombre_alumno, inasistencias, nota_pri_trim, nota_sec_trim, nota_ter_trim, promedio, estado){
        this.nombre_alumno = nombre_alumno;
        this.inasistencias = inasistencias;
        this.nota_pri_trim = nota_pri_trim;
        this.nota_sec_trim = nota_sec_trim;
        this.nota_ter_trim = nota_ter_trim;
        this.promedio = promedio;
        this.estado = estado;
    }
};

//funcion que captura los datos ingresados en los inputs, almacena en array y en storage y realiza el renderizado del HTML.
function ingresar_alumno(){

    //almaceno los nodos obtenidos
    let nombre = document.getElementById("nombreAlumno");
    let faltas = document.getElementById("inasistencias");
    let pri_trim = document.getElementById("nota_pri_trim");
    let sec_trim = document.getElementById("nota_sec_trim");
    let ter_trim = document.getElementById("nota_ter_trim");
   
    //obtengo los datos desde los nodos.
    nombre_alumno = nombre.value;
    inasistencias = parseInt(faltas.value);
    nota_pri_trim = parseFloat(pri_trim.value);
    nota_sec_trim = parseFloat(sec_trim.value);
    nota_ter_trim = parseFloat(ter_trim.value);
    promedio = "";
    estado = "";

    //creo objeto alumno con datos obtenidos y lo guardo en array
    let nuevo_alumno = new alumno(nombre_alumno, inasistencias, nota_pri_trim, nota_sec_trim, nota_ter_trim, promedio, estado);
    lista_alumnos.push (nuevo_alumno);

    mostrar_alumnos();

    //guardo el array, ya con los promedios y el estado del alumno, en el storage local.
    let clave = "alumnos_almacenados"
    localStorage.setItem (clave, JSON.stringify(lista_alumnos));
};

//Calcula los promedios y el estado de los alumnos y agrega esos datos al array de objetos alumno y almacena en el storage
function calcular_promedios(){

   lista_alumnos = JSON.parse(localStorage.getItem("alumnos_almacenados")); //obtengo el arreglo desde el storage y lo recorro para calcular los promedios.
    
    for (let alumno_actual of lista_alumnos){
        
        if (alumno_actual.inasistencias >= 25) {
            alumno_actual.promedio = "-";
            alumno_actual.estado = "LIBRE" 
        }
        else {
            let promedio = (alumno_actual.nota_pri_trim + alumno_actual.nota_sec_trim + alumno_actual.nota_ter_trim) / 3;
            promedio = promedio.toFixed(2);   
            if (promedio >= 7){
                alumno_actual.promedio = promedio;
                alumno_actual.estado = "PROMOCIONA"   
            }
            else if(promedio >= 4){
                alumno_actual.promedio = promedio;
                alumno_actual.estado = "RECUPERA" 
            }
            else if (promedio < 4){
                alumno_actual.promedio = promedio;
                alumno_actual.estado = "RECURSA"
            }
        }
        lista_alumnos.push;
    };

    mostrar_alumnos();
};

//funcion realiza renderizacion del HTML
function mostrar_alumnos(){

    let tabla = document.getElementById("tbody");
    tabla.innerHTML = "";

    for (let alumno_actual of lista_alumnos){ 
        let fila = document.createElement("tr");
        fila.innerHTML = `<td>${alumno_actual.nombre_alumno}</td>
                          <td><p>${alumno_actual.inasistencias}</p></td>
                          <td><p>${alumno_actual.nota_pri_trim}</p></td>
                          <td><p>${alumno_actual.nota_sec_trim}</p></td>
                          <td><p>${alumno_actual.nota_ter_trim}</p></td>
                          <td><p>${alumno_actual.promedio}</p></td>
                          <td><p>${alumno_actual.estado}</p></td>
                         `
        tabla.append(fila);
    }
};

// capturo btnIngresar y ejecuto función para ingresar alumnos, inasistencias y notas a la tabla html
let btn_ingresar = document.getElementById("btnIngresar");
btn_ingresar.addEventListener("click", ingresar_alumno);

// capturo btnCalcular y ejecuto función para calcular promedios y verificar la situación regular del alumno.
let btn_calcular = document.getElementById("btnCalcular");
btn_calcular.addEventListener("click", calcular_promedios);