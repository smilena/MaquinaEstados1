//rutinas validacion,interacion y despliegue de resultados de la app
//author: @danyjavierb @smilena89
$(function() {
	//rutinas validacion datos Nestados,Nsecuencias y captura entradas usuario
	$("#capturar-datos").bind("click", function(ev) {
		ev.preventDefault();
		var numeroEstados;
		var numeroSecuencias;
		var camposEntradas = $("#datos-secuencias input");

		numeroEstados = Number(camposEntradas.eq(0).val());
		numeroSecuencias = Number(camposEntradas.eq(1).val());
		if(!$.isNumeric(numeroEstados) || !$.isNumeric(numeroEstados)) {


			//no es numerico o vacio.
		} else {
			//todo va bien, dibujar estados y empezar rutinas de campura de secuencias
			iniciarCapturaSecuencias(numeroSecuencias);
			dibujarEstados(numeroEstados);



		}
	});
});

function dibujarEstados(numero) {

	var canvas = $("#canvas-mask");
	var r = 20;
	var radio = 100; //cte para muchos
	var angulo = (2 * (Math.PI)) / numero;
	var anchoCanvas = canvas.width();

	var altoCanvas = canvas.height();
	for(var i = 0; i < numero; i++) {

		var x = (radio + numero * 3) * (Math.cos(angulo * i));
		var y = (radio + numero) * (Math.sin(angulo * i));
		//moviendo a sistema de coordenadas en centro del canvas
		x += (anchoCanvas / 2);
		y += (altoCanvas / 2);
		//ajustando posiciones al centro de los circulos con radio  25px
		x -= r;
		y += r;


		var estadoTemp = $("<button style='display:none;position:absolute; left:" + 0 + "px ;top:" + 0 + "px;' id=e" + i + ">s" + (i) + "</button>");
		canvas.append(estadoTemp);

		estadoTemp.fadeIn(1000);
		estadoTemp.animate({
			left: x,
			top: y,

		}, numero * 250);
	}


}

function iniciarCapturaSecuencias(numero) {
	window.secuencias = [];
	$("#captura-secuencias").fadeIn(2000);
	for(var i = 0; i < numero; i++) {
		var secuenciaTemp = $("<option id=s" + i + ">Secuencia " + (i + 1) + "</option>");
		$('#lista-secuencias').append(secuenciaTemp);
	}
	var capturando = false;
	var secuenciaActual = [];
	//secuencia q se esta grabando, se usa el indice de la lista de secuencias
			var indiceSecuencia;
	$("#capturar-secuencias").bind("click", function(ev) {
		ev.preventDefault();
		if(capturando == false) {
			capturando = true;
			
			

			$("#lista-secuencias option:selected").each(function() {
				indiceSecuencia = Number($(this).attr('id')[1]);
				console.log(indiceSecuencia);
			});

			$("#capturar-secuencias").text("Fijar secuencia actual...").removeClass("btn-primary").addClass("btn-warning");
			$("#canvas-mask button").each(function() {

				$(this).bind("click", function() {
					var destino = Number($(this).attr("id")[1]);
					if($.inArray(destino, secuenciaActual)>-1) {

						//ah ah ya esta este destino
						console.log("ah ah ya esta");
					} else {

						secuenciaActual.push(Number($(this).attr("id")[1]));
						console.log(secuenciaActual);
					}

				});
			});


		} else {

			capturando=false;

			$("#alerts").fadeIn(1000);//temporal ->modal debe usarse
			$("#capturar-secuencias").text("Fijar secuencia actual...").removeClass("btn-warning").addClass("btn-primary");
			
			secuenciaActual.shift();
			window.secuencias[indiceSecuencia]=secuenciaActual;
			console.log(secuenciaActual);
			console.log(window.secuencias);
			$("#s"+indiceSecuencia).remove();

			secuenciaActual=[];
			indiceSecuencia=null;

			
		}

	});



}