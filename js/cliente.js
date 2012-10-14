//rutinas validacion,interacion y despliegue de resultados de la app
//author: @danyjavierb @smilena89

$(function() {
	//rutinas validacion datos Nestados,Nsecuencias y captura entradas usuario
	$("#capturar-datos").bind("click",function(){ 
		var numeroEstados;
		var numeroSecuencias;
		var camposEntradas=$("#datos-secuencias input");
		
		numeroEstados=Number(camposEntradas.eq(0).val());
		numeroSecuencias=Number(camposEntradas.eq(1).val());
		if(!$.isNumeric(numeroEstados) || !$.isNumeric(numeroEstados)  ){


			//no es numerico o vacio.
		}
		else {
			//todo va bien, dibujar estados y empezar rutinas de campura de secuencias
			iniciarCapturaSecuencias(numeroSecuencias);
			dibujarEstados(numeroEstados);
			


		}
	});
});

function dibujarEstados(numero){

var canvas = $("#canvas-mask");

var radio= 60;//cte para muchos
var angulo= (2*(Math.PI))/numero;
var anchoCanvas=canvas.width();

var altoCanvas=canvas.height();
for (var i=0;i<numero;i++){

	var x= (radio)*(Math.cos(angulo*i));
	var y= (radio)*(Math.sin(angulo*i));
    //moviendo a sistema de coordenadas en centro del canvas
    x+=(anchoCanvas/2);
    y+=(altoCanvas/2); 

	
	var estadoTemp =$("<button style='position:absolute; left:"+x+"px ;top:"+y+"px;' id=estado"+i+">s"+(i+1)+"</button>");
	canvas.append(estadoTemp);
}


}

function iniciarCapturaSecuencias(numero){
$("#captura-secuencias").fadeIn(2000);
for (var i=0;i<numero;i++){
	var secuenciaTemp =$("<option id=secuencia"+i+">Secuencia "+(i+1)+"</option>");
	$('#lista-secuencias').append(secuenciaTemp);
}


}
