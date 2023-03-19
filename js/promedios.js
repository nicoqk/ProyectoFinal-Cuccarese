//funcion asincronica
setTimeout(function(){
    Toastify({

        duration:700,
        gravity:"bottom",
        position:"right",
        avatar:"../media/img/toasty.png",
        style: {
            background:"none",
            height: "150px",
            width: "150px",
            }, 
    }).showToast();
    let audio = new Audio("../media/audio/toasty.mp3");
    audio.play();
    }, 35000
); 
// fecha de hoy
let ahora = luxon.DateTime.now().setLocale('es-AR');
let formatoArgentino = 'dd/LL/yyyy';
let fechaHoraArgentino = ahora.toFormat(formatoArgentino);

function mostrar_posicion(posicion){

    let latitud = posicion.coords.latitude;
    let longitud = posicion.coords.longitude;
    let llave = "c177c748bc71843b922eb8f0d9bfc991";
        
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${llave}&units=metric&lang=es`)
        .then( response=> response.json() )
        .then( data =>{
                    fecha_clima.innerHTML = `Hoy es ${fechaHoraArgentino}. En ${data.name} la temperatura actual es de ${data.main.temp}°`
        })
}
navigator.geolocation.getCurrentPosition(mostrar_posicion);


// traigo el usuario activo capturado en login para darle la bienvenida
let usuario_activo = sessionStorage.getItem("usuario_activo");
let bienvenido = document.getElementById("usrBienvenido");
bienvenido.innerHTML = 'Hola ' + usuario_activo + ', bienvenido al sistema de calculo de promedios!';

let fecha_clima = document.getElementById("fecha");
fecha_clima.innerHTML = 'Hoy es  ' +  fechaHoraArgentino ;

let nombre_alumno, inasistencias, nota_pri_trim, nota_sec_trim, nota_ter_trim, promedio, estado;

//declaro array
let lista_alumnos = [];

//construyo el objeto alumno
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

 //almaceno los nodos obtenidos
 let nombre = document.getElementById("nombreAlumno");
 let faltas = document.getElementById("inasistencias");
 let pri_trim = document.getElementById("nota_pri_trim");
 let sec_trim = document.getElementById("nota_sec_trim");
 let ter_trim = document.getElementById("nota_ter_trim");


function ingresar_alumno(){

    //obtengo los datos desde los nodos.
    nombre_alumno = nombre.value;
    nombre.focus();
    nota_pri_trim = parseFloat(pri_trim.value);
    nota_sec_trim = parseFloat(sec_trim.value);
    nota_ter_trim = parseFloat(ter_trim.value);
    inasistencias = parseInt(faltas.value);
    promedio = "";
    estado = "";

    if (nombre_alumno == ""){
        Swal.fire ({
            text: "Debe ingresar el nombre del Alumno",
            title: "Atención",
            icon: "info",
            confirmButtonColor: "#43A047",
         })
    }
    else{
        if (isNaN(inasistencias)){
            Swal.fire ({
                text: "Debe ingresar la cantidad de inasistencias",
                title: "Atención",
                icon: "info",
                confirmButtonColor: "#43A047",
             })
        }
        else{
            if (isNaN(nota_pri_trim)|| isNaN(nota_sec_trim) || isNaN(nota_ter_trim)){
                Swal.fire ({
                    text: "Debe ingresar las tres notas",
                    title: "Atención",
                    icon: "info",
                    confirmButtonColor: "#43A047",
                 })
            }
            else{
                if (nota_pri_trim <1 || nota_pri_trim > 10 || nota_sec_trim <1 || nota_sec_trim > 10 || nota_ter_trim <1 || nota_ter_trim > 10) {
                    Swal.fire ({
                        text: "Error",
                        title: "Las notas deben ser un numero entre 1 y 10",
                        icon: "error",
                        confirmButtonColor: "#43A047",
                     })
                }
                else {
                     //creo un alumno con datos obtenidos y lo guardo en array
                    let nuevo_alumno = new alumno(nombre_alumno, inasistencias, nota_pri_trim, nota_sec_trim, nota_ter_trim, promedio, estado);
                    lista_alumnos.push (nuevo_alumno);

                    mostrar_alumnos();

                    nombre.value = "";
                    faltas.value = "";
                    pri_trim.value = "";
                    sec_trim.value = "";
                    ter_trim.value = "";

                    //guardo el array, con los promedios y el estado del alumno vacios, en el storage local.
                    let clave = "alumnos_almacenados"
                    localStorage.setItem (clave, JSON.stringify(lista_alumnos));
                    
                    Toastify({

                        text: "Alumno Agregado",
                        duration: 800,
                        gravity: "bottom",
                        position: "left",
                        style: {
                            color:"#4CAF50",
                            background: "#ffffff",
                            border: '1px solid #4CAF50', 
                        },
                        offset: { 
                            y: 180,
                        },
                    }).showToast();
                }
            }
        }
                        
    }
};

//Calcula los promedios y el estado de los alumnos. Agrega esos datos al array  y almacena en el storage
function calcular_promedios(){

   //obtengo el arreglo desde el storage y lo recorro para calcular los promedios.

   lista_alumnos = JSON.parse(localStorage.getItem("alumnos_almacenados"));
        
    for (let alumno_actual of lista_alumnos){
            
            if (alumno_actual.inasistencias >= 25) {
                alumno_actual.promedio = "";
                alumno_actual.estado = "LIBRE" 
            }
            else {
                promedio = (alumno_actual.nota_pri_trim + alumno_actual.nota_sec_trim + alumno_actual.nota_ter_trim) / 3;
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
        fila.innerHTML = `<td><p>${alumno_actual.nombre_alumno}</p></td>
                          <td><p>${alumno_actual.inasistencias}</p></td>
                          <td><p>${alumno_actual.nota_pri_trim}</p></td>
                          <td><p>${alumno_actual.nota_sec_trim}</p></td>
                          <td><p>${alumno_actual.nota_ter_trim}</p></td>
                          <td><p>${alumno_actual.promedio}</p></td>
                          <td><p>${alumno_actual.estado}</p></td>
                          <td><button class="btn_borrar">X</button></td>
                         `
        tabla.append(fila);

        let boton_borrar = document.querySelectorAll(".btn_borrar");  
        for (let btn of boton_borrar){
            btn.addEventListener("click", borrar_alumno);
            } 
    }
};

function borrar_alumno(e){
    let abuelo = e.target.parentNode.parentNode;
    let alumno_eliminar = abuelo.querySelector("p").textContent;

    function eliminar_alumno( lista_alumnos ){

        return lista_alumnos.nombre_alumno != alumno_eliminar
    }

    let alumnos_filtrados = lista_alumnos.filter(eliminar_alumno);
    lista_alumnos = alumnos_filtrados;
    mostrar_alumnos();
    localStorage.setItem ("alumnos_almacenados", JSON.stringify(lista_alumnos));
    Toastify({

        text: "Alumno Eliminado",
        duration: 800,
        gravity: "bottom",
        position: "left",
        style: {
            color:"red",
            background: "yellow",
            border: '1px solid #4CAF50', 
          },
          offset: { 
            y: 180,
          },
        }).showToast();
}

function mostrar_estadisticas(){
    
    let cant_alumnos = lista_alumnos.length;
    let alumno_mayor_prom = "";
    let promedio_mayor = 0;
    let promedio_menor = "";
    let cant_promociona = 0;
    let cant_recupera = 0;
    let cant_recursa = 0;
    let cant_libre = 0;
    
    for (item of lista_alumnos){
        
        if (item.estado == "PROMOCIONA"){
            cant_promociona ++
        }
        else if (item.estado == "RECUPERA"){
                cant_recupera ++
            
        }
        else if(item.estado == "RECURSA"){
            cant_recursa ++
        }
        else if (item.estado == "LIBRE"){
            cant_libre ++
        }
        if (item.promedio >= promedio_mayor){
            promedio_mayor = parseFloat(item.promedio);
            alumno_mayor_prom = item.nombre_alumno;   
        }
        if (promedio_menor == "" || item.promedio < promedio_menor ){
            promedio_menor = parseFloat(item.promedio);
        };
    };

    let total_alumnos = document.getElementById("alTotales");
    total_alumnos.innerHTML = 'Cantidad total de Alumnos: ' + cant_alumnos;

    let total_promocionan = document.getElementById("alPromocionados");
    total_promocionan.innerHTML = 'Alumnos promocionados: ' + cant_promociona;

    let total_recuperan = document.getElementById("alRecuperatorio");
    total_recuperan.innerHTML = 'Alumnos a recuperatorio: ' + cant_recupera;

    let total_recursan = document.getElementById("alRecursan");
    total_recursan.innerHTML = 'Alumnos promocionados: ' + cant_recursa;

    let total_libres = document.getElementById("alLibres");
    total_libres.innerHTML = 'Alumnos libres por faltas: ' + cant_libre;

    let mayor_promedio = document.getElementById("alMayorPromedio");
    mayor_promedio.innerHTML = 'Mayor promedio: ' + promedio_mayor;

    let menor_promedio = document.getElementById("alMenorPromedio");
    menor_promedio.innerHTML = 'Menor promedio: ' + promedio_menor;
};

// capturo btnIngresar y ejecuto función para ingresar alumnos, inasistencias y notas a la tabla html
let btn_ingresar = document.getElementById("btnIngresar");
btn_ingresar.addEventListener("click", ingresar_alumno);

// capturo btnCalcular y ejecuto función para calcular promedios y verificar la situación  del alumno.
let btn_calcular = document.getElementById("btnCalcular");
btn_calcular.addEventListener("click", calcular_promedios);

// capturo btnEstadisticas y ejecuto función para calcular estadisticas utiles al usuario
let btn_estadisticas = document.getElementById("btnEstadisticas");
btn_estadisticas.addEventListener("click", mostrar_estadisticas);

