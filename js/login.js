// funcion jquery cambia entre los forms de login y registro 
$('.link_login a').click(function(){
   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
}); 
 
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
let mensaje_log = document.getElementById("msj_login");
let mensaje_reg = document.getElementById("msj_registro");


function registrarse () {

   let nuevo_usuario = document.getElementById("NuevoUsuario").value;
   let nueva_clave = document.getElementById("NuevaClave").value;
   let nueva_clave2 = document.getElementById("NuevaClave2").value;

   // verifico que el usuario a registrar haya ingresado todos los datos requeridos
   // aca no se si conviene validarlos con js o directamente en el HTML con la propiedad required.//

   if (nuevo_usuario == "" || nueva_clave == "" || nueva_clave2 == ""){

      mensaje_reg.innerHTML = `El usuario y/o la contraseña no pueden estar vacios`;

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
            mensaje_reg.innerHTML = `El usuario ya existe, elija otro`;
            document.getElementById("NuevoUsuario").value = "";
            document.getElementById("NuevaClave").value = "";
            document.getElementById("NuevaClave2").value = "";
         }
         else{
         // cuando el usuario no esta registrado, verifico que las claves ingresadas coincidan
            if (nueva_clave !== nueva_clave2){
               mensaje_reg.innerHTML = `Las claves no coinciden. Reingreselas`;
               document.getElementById("NuevaClave").value = "";
               document.getElementById("NuevaClave2").value = "";
            }
            else {
               // todo validado ok. registro el usuario en el array y lo almaceno en el storage
               mensaje_reg.innerHTML = `<p class="msj_ok">Usuario registrado correctamente. Inicie sesion</p>`;
               let usuario_nuevo = new usuario (nuevo_usuario, nueva_clave);
               usuarios_registrados.push (usuario_nuevo);
               localStorage.setItem (clave, JSON.stringify(usuarios_registrados));

               document.getElementById("NuevoUsuario").value = "";
               document.getElementById("NuevaClave").value = "";
               document.getElementById("NuevaClave2").value = "";
            };
         };

      }
   else{
      // este bloque solo una vez hasta que se almacene el primer usuario en el storage.

      if (nueva_clave !== nueva_clave2){
         mensaje_reg.innerHTML = `Las claves no coinciden. Reingreselas`;
         document.getElementById("NuevaClave").value = "";
         document.getElementById("NuevaClave2").value = "";
         }
      else {
         mensaje_reg.innerHTML = `<p class="msj_ok">Usuario registrado correctamente. Inicie sesion</p>`;
         let usuario_nuevo = new usuario (nuevo_usuario, nueva_clave);
         usuarios_registrados.push (usuario_nuevo);
         localStorage.setItem (clave, JSON.stringify(usuarios_registrados));
         document.getElementById("NuevoUsuario").value = "";
         document.getElementById("NuevaClave").value = "";
         document.getElementById("NuevaClave2").value = "";
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
         mensaje_log.innerHTML = `Ingrese usuario y contraseña`;
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
            mensaje_log.innerHTML = `El usuario no existe. Por favor verifíquelo o registrese`;
         }
         else{
            if(password == password_registrado){
               sessionStorage.setItem("usuario_activo", user);
               window.location.href = "../pages/main.html";
               alert("bienvenido");
            }
            else{
               mensaje_log.innerHTML = `La clave ingresada es incorrecta.`;
            }
         }
      };
      
   }
   else{
      mensaje_log.innerHTML = `No hay usuarios registrados. Regtrese`;
   };
   

};

 let btn_ingresar = document.getElementById("btnIngresar");
 btn_ingresar.addEventListener("click", ingresar);

 let btn_registrase = document.getElementById("btnRegistrarse");
 btn_registrase.addEventListener("click", registrarse );

