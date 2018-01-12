// FUNCIONES PARA MOSTRAR Y OCULTAR EL MENU EN LA VERSIÓN MOVIL

function showMenu(){	//Mostrar el menu en la versión movil
				document.getElementById("mostrar_menu").onclick = function() {
				document.getElementById("mostrar_menu").style.display = "none";
				document.getElementById("panel_opciones").style.display = "block";
				document.getElementById("ocultar_menu").style.display = "block";
						}
					}
					
function hideMenu(){	//Ocultar el menú en la versión movil			
				document.getElementById("ocultar_menu").onclick = function() {
				document.getElementById("panel_opciones").style.display = "none";
				document.getElementById("mostrar_menu").style.display = "block";
				document.getElementById("ocultar_menu").style.display = "none";
								}
					}

// DECLARACION DE VARIABLES NECESARIAS PARA EL JUEGO

var y = 10; //Altura inicial de la nave como no se lee del css hay que ajustar la diferencia para que el marcador quede a cero.
var v = 0;
var c = 1000;
var tComb = 0;

var tiempo = null;
var dt = 0.016683;
var g = 1.622;
var a = g; // Posteriormente cambiará al encender motor a -g

var umbral = 3;

// FUNCIONES PARA MOVER LA NAVE

function inicio(){	//Cada 1000dt ejecuta la función de mover nave
			tiempo = setInterval(moverNave,dt*1000);
			}
			
function parada(){	//Resetea el intervalo de la función play
			clearInterval(tiempo);
			}

function moverNave(){
					v += a*dt;
					y += v*dt;
					// Actualizar marcador
					document.getElementById("altura").innerHTML = parseFloat(73.8 - y).toFixed(0);
					document.getElementById("v_vertical").innerHTML = parseFloat(v).toFixed(2);
					// Ejecutar el movimiento hasta que llegue a un porcentaje de pant.
					if(y<73.8){
						document.getElementById("vehiculo").style.top = y+"%";
						}else{
							parada();
							gameEnd();
							}
					}

function potencia(){	//Inicia o apaga el motor si a es igual a g o si queda combustible
				if(a == g & c>0){motorOn()}else{motorOff()};
				}
				
function motorOn(){		//Inicia el motor y empieza a restar combustible
				if(tComb == 0 & y<73.8)
				{a = -g;
				tComb = setInterval(actCombustible,10);
				document.getElementById("motor").style.display = "block";
				}else{motorOff}
				}
				
function motorOff(){	//Para el motor y resetea el intervalo de combustible
				a = g;
				clearInterval(tComb);
				tComb=0;
				document.getElementById("motor").style.display = "none";
				}
	
function actCombustible(){
				c -=1;
				if(c<0) {c = 0;
						motorOff();
						}
				document.getElementById("combustible").innerHTML = c; //Actualizando el marcador
				}
//Funcion terminar juego al impactar ya sea mision cumplida				
function gameEnd(){
					if(v>umbral){
							document.getElementById("nave").style.backgroundImage = 'url("img/explosion.png")';
							document.getElementById("motor").style.display = "none";
							setTimeout(function(){alert("Game Over")},500);
							}else{
							setTimeout(function(){alert("Mission Accomplished")},500);
							motorOff();
								}
					}


//ACCIONES AL TERMINAR DE CARGAR LA VENTANA
window.onload = function(){
// Inicializar marcadores
document.getElementById("altura").innerHTML = 100-y;
document.getElementById("v_vertical").innerHTML = v;
document.getElementById("combustible").innerHTML = c;
// Mostrar u ocultar menús en versión movil
showMenu();
hideMenu();
// Iniciar el movimiento de la nave
inicio();
//Click para arrancar o parar el motor
document.getElementById("boton_arranque").onclick = potencia;
//Pulsar una tecla para arrancar el motor o pararlo
document.onkeydown = potencia;
//Enlaces y funciones del menu de opciones
document.getElementById("dificultad").onclick = function(){umbral = prompt('Introduce valor de dificultad (1-Muy Difícil hasta 5-Muy fácil)','3');}
document.getElementById("ayuda").onclick = function(){window.open('help.html');parada();}
document.getElementById("about").onclick = function(){window.open('about.html');parada();}
document.getElementById("reset").onclick = function(){location.href = 'index.html';}
}