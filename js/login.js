

 // objeto usuario que se almacenaran en el array usuarios_registrados [] y el array en el storage;
class usuario {
   constructor (nuevo_usuario, nueva_clave){
        this.nombre_usuario = nuevo_usuario;
        this.password = nueva_clave;
    }
 };

let clave = "usuarios_almacenados";
let usuarios_registrados = [];
let password_registrado;

let nod_nuevo_usuario = document.getElementById("NuevoUsuario");
let nod_nueva_clave = document.getElementById("NuevaClave");
let nod_nueva_clave2 = document.getElementById("NuevaClave2");
let nod_usuario = document.getElementById("NombreUsuario");
let nod_clave = document.getElementById("ClaveUsuario");


function registrarse () {
   let nuevo_usuario = nod_nuevo_usuario.value;
   let nueva_clave = nod_nueva_clave.value;
   let nueva_clave2 = nod_nueva_clave2.value;

   // verifico que el usuario a registrar haya ingresado todos los datos requeridos

   if (nuevo_usuario == "" || nueva_clave == "" || nueva_clave2 == ""){
      
      Swal.fire ({
         title: "Error",
         text: "El usuario y/o la contraseña no pueden estar vacios",
         icon: "error",
         confirmButtonColor: "#43A047",
      }
      );
      nod_nuevo_usuario.focus();
   }
   else{

      // verifico que haya usuarios almacenados en el storage
      if (localStorage.getItem ("usuarios_almacenados") !== null){

         //traigo los usuarios registrados desde el storage
         usuarios_registrados = JSON.parse(localStorage.getItem("usuarios_almacenados"));
         let usuario_existente = false;

         // verifico si el nuevo usuario a registrar ya existe
         for (let item  of usuarios_registrados){
            if(nuevo_usuario === item.nombre_usuario){
            usuario_existente = true;
            break;
            }
         };

         // cuando el usuario ya existe
         if (usuario_existente == true){
            Swal.fire ({
               title: "Atención",
               text: "El usuario ya existe. Por favor elija otro",
               icon: "info",
               confirmButtonColor: "#43A047",
            }
            );

            nod_nuevo_usuario.value = "";
            nod_nueva_clave.value = "";
            nod_nueva_clave2.value = "";
            nod_nuevo_usuario.focus();
         }
         else{
         // cuando el usuario no esta registrado, verifico que las claves ingresadas coincidan
            if (nueva_clave !== nueva_clave2){
              
               Swal.fire ({
                  title: "Error",
                  text: "Las claves no coinciden Por favor reingréselas",
                  icon: "error",
                  confirmButtonColor: "#43A047",
               }
               );
               nod_nuevo_usuario.value = "";
               nod_nueva_clave.value = "";
               nod_nueva_clave2.value = "";
               nod_nuevo_usuario.focus();
            }
            else {
               // todo validado ok. registro el usuario en el array y lo almaceno en el storage
              
               Swal.fire ({
                  title: "Registro Correcto",
                  text: "El usuario " + nuevo_usuario + " se registro correctamente. Inicie sesión",
                  icon: "success",
                  confirmButtonColor: "#43A047",
               }
               );
               let usuario_nuevo = new usuario (nuevo_usuario, nueva_clave);
               usuarios_registrados.push (usuario_nuevo);
               localStorage.setItem (clave, JSON.stringify(usuarios_registrados));

               nod_nuevo_usuario.value = "";
               nod_nueva_clave.value = "";
               nod_nueva_clave2.value = "";
               nod_nuevo_usuario.focus();
            };
         };

      }
   else{
      // este bloque solo una vez hasta que se almacene el primer usuario en el storage.

      if (nueva_clave !== nueva_clave2){
         Swal.fire ({
            title: "Error",
            text: "Las claves no coinciden Por favor reingréselas",
            icon: "error",
            confirmButtonColor: "#43A047",
         }
         );
         nod_nuevo_usuario.value = "";
         nod_nueva_clave.value = "";
         nod_nueva_clave2.value = "";
         nod_nuevo_usuario.focus();
         }
      else {
         
         let usuario_nuevo = new usuario (nuevo_usuario, nueva_clave);
         usuarios_registrados.push (usuario_nuevo);
         localStorage.setItem (clave, JSON.stringify(usuarios_registrados));
         nod_nuevo_usuario.value = "";
         nod_nueva_clave.value = "";
         nod_nueva_clave2.value = "";
         nod_nuevo_usuario.focus();

         Swal.fire ({
            title: "Registro Correcto",
            text: "El usuario " + nuevo_usuario + " se registro correctamente. Inicie sesión",
            icon: "success",
            confirmButtonColor: "#43A047",
         }
         );
         };
      };
   };
};

 function ingresar () {

      let user = document.getElementById("NombreUsuario").value;
      let password = document.getElementById("ClaveUsuario").value;

   if (localStorage.getItem ("usuarios_almacenados") !== null){

      //traigo los usuarios registrados desde el storage
      usuarios_registrados = JSON.parse(localStorage.getItem("usuarios_almacenados"));

      let usuario_existente = false;

      if (user == "" || password == ""){
         Swal.fire ({
            title: "Error",
            text: "Debe ingresar usuario y contraseña",
            icon: "error",
            confirmButtonColor: "#43A047",
         }
         );
      }
      else{
         for (let item  of usuarios_registrados){
            if(user === item.nombre_usuario){
            usuario_existente = true;
            password_registrado = item.password;
            
            break;
            }
         };

         if (usuario_existente == false){
            
            Swal.fire ({
               title: "Acceso denegado",
               text: "Usuario incorrecto o inexistente. Verifíquelo o regístrese",
               icon: "error",
               confirmButtonColor: "#43A047",
            }
            );
            
         }
         else{
            if(password == password_registrado){
               sessionStorage.setItem("usuario_activo", user);  
                        
               Swal.fire ({
                  title: "Acceso Correcto",
                  text: "Bienvenido " + user + " al sistema",
                  icon: "success",
                  confirmButtonColor: "#43A047",

               }).then((result) => {
                  if (result.isConfirmed) {
                     window.location.href = 'pages/main.html'
                  }
                })

            }

            else{
              
              Swal.fire ({
               title: "Acceso denegado",
               text: "La clave ingresada es incorrecta. Intente nuevamente",
               icon: "error",
               confirmButtonColor: "#43A047",
            }
            );
            }
         }
      };
      
   }
   else{
      Swal.fire ({
         title: "Atención",
         text: "No hay usuarios registrados. Por favor regístrese ",
         icon: "info",
         confirmButtonColor: "#43A047",
      }
      );
   };
};

 let btn_ingresar = document.getElementById("btnIngresar");
 btn_ingresar.addEventListener("click", ingresar);

 let btn_registrase = document.getElementById("btnRegistrarse");
 btn_registrase.addEventListener("click", registrarse );

//funcion jquery cambia entre los forms de login y registro 

/*$('.link_login a').click(function(){
   $('div .form-registro').animate({height: "toggle", opacity: "toggle"}, "slow")
});*/

$(".link_login a").click( function(){
   $("div .login-form").hide();
   $("div .form-registro").show();
});

$(".link_registro a").click( function(){
   $("div .login-form").show();
   $("div .form-registro").hide();
});






