//rutinas validacion,interacion y despliegue de resultados de la app
//author: @danyjavierb @smilena89


jQuery(document).ready(function() {
  $('#app-name').popover({
    placement: "bottom",
    delay: { show: 500, hide: 1000 },
  });
console.log();

  $('#app-name').bind({
    "click": function() {
      $('#app-name').popover('show');
     
    },
    "mouseleave": function() {
      $('#app-name').popover('hide');

    }
  })

//tooltip ayuda secuencias

$('#tooltip-ayuda-secuencias').popover({
    placement: "bottom",
    delay: { show: 500, hide: 1000 },
  });
console.log();

  $('#tooltip-ayuda-secuencias').bind({
    "mouseenter": function() {
      $('#tooltip-ayuda-secuencias').tooltip('show');
     
    },
    "mouseleave": function() {
      $('#tooltip-ayuda-secuencias').tooltip('hide');

    }
  })



});

//rutinas logica de presentacion
$(function() {
	//rutinas validacion datos Nestados,Nsecuencias y captura entradas usuario
	$("#capturar-datos").bind("click", function(ev) {
		ev.preventDefault();
		var numeroEstados;
		var numeroSecuencias;
		var camposEntradas = $("#datos-secuencias input");

		numeroEstados = Number(camposEntradas.eq(0).val());
		numeroSecuencias = Number(camposEntradas.eq(1).val());

		
		var error=false;
		if($.isNumeric(numeroEstados)==false || $.isNumeric(numeroEstados)==false|| numeroEstados<=0 ||numeroEstados>16 ) {
			error=true;
			$("#error-estados").popover({
				content:"El numero de estados debe ser un dato numerico, que este en el intervalo [0,16]",
				delay:{show:4000,hide:500},

			});
				
				$("#error-estados").popover("show");
				$("#capturar-datos").bind("mouseleave",function(){

					$("#error-estados").popover("hide");

					camposEntradas.eq(0).val(null);
					$("#error-estados").popover("destroy");


				});

			
		}
		else if($.isNumeric(numeroSecuencias)==false || $.isNumeric(numeroSecuencias)==false|| numeroSecuencias<=0 || (numeroSecuencias>=numeroEstados) ) {
			error=true;
			$("#error-secuencias").popover({
				content:"El numero de secuencias debe ser un dato numerico, y que sea menor que el numero de estados",
				delay:{show:4000,hide:500},

			});
				
				$("#error-secuencias").popover("show");
				$("#capturar-datos").bind("mouseleave",function(){

					$("#error-secuencias").popover("hide");
					camposEntradas.eq(1).val(null);
					$("#error-secuencias").popover("destroy");


				});

			
		}


		 if(error==false) {
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

		var x = (radio*numero/2 ) * (Math.cos(angulo * i));
		var y = (radio *numero/2) * (Math.sin(angulo * i));
		//moviendo a sistema de coordenadas en centro del canvas
		x += (anchoCanvas / 2);
		y += (altoCanvas / 2);
		//ajustando posiciones al centro de los circulos con radio  25px
		x += r;
		y += r;


		var estadoTemp = $("<button style='display:none;z-index:3;position:absolute; left:" + 0 + "px ;top:" + 0 + "px;' id=e" + i + ">s" + (i) + "</button>");
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
	window.coloresSecuencias=[];
	$("#captura-secuencias").fadeIn(2000);
	for(var i = 0; i < numero; i++) {
		window.coloresSecuencias[i]= random_hexa_color();
		console.log(coloresSecuencias[i]);
		var secuenciaTemp = $("<option style='color:"+window.coloresSecuencias[i] +"; font-weight: bold;' id=s" + i + ">Secuencia " + (i + 1) + "</option>");
		$('#lista-secuencias').append(secuenciaTemp);
	}
	var capturando = false;
	var secuenciaActual = [];

	//secuencias a unir con flechas
	var origen = null;
	var destino = null;
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

					if(origen==null){
							origen = Number($(this).attr("id")[1]);
							console.log("origen"+origen);
					}
					else if (origen!=null && destino==null) {

						destino =  Number($(this).attr("id")[1]);
						console.log("destino"+destino);
					}

					


					if($.inArray($(this).attr("id")[1], secuenciaActual) > -1 ) {

						//ah ah ya esta este destino
						console.log("ah ah ya esta");
					} else {

						
						if(origen!=null&&destino!=null){

							console.log("dibujando flecha de s"+origen +" a s"+destino);
							//dibujo flechas
							var elOrigen= $("#e"+""+origen);
							var elDestino=$("#e"+""+destino);
							var x1=elOrigen.position().left;
							var y1=elOrigen.position().top;
							var x2=elDestino.position().left;
							var y2=elDestino.position().top;

							//radio circulos


							var r = 20;

							//calculo puntos iniciales y finales a partir de las coordenadas de los botones

							var teta = (180/Math.PI) * Math.atan((y2-y1)/(x2-x1)); 

							if(x2 > x1) {
							var inicialX = x1 + r + (r * Math.cos(teta));
							var finalX =x2 + r - (r * Math.cos(teta));

							}
							if(x1 > x2) {
							var inicialX = x1 + r - (r * Math.cos(teta));
							var finalX =x2 + r + (r * Math.cos(teta));


							}
							
							if(y2>y1){
								var inicialY = y1 + r + (r * Math.sin(teta));
								var finalY= y2 + r - (r*Math.sin(teta));

							}	

							if(y1>y2){

							var inicialY = y1 + r - (r * Math.sin(teta));
							var finalY= y2 + r + (r*Math.sin(teta));


							}

							if(x1==x2){
							var inicialX = x1 + r ;
							var finalY= y1 + r;
							}

							if(y1==y2){
								var inicialY = y1 + r;
								var finalY= y1 + r;


							}


							


							var canvas = document.getElementById("canvas");
							var canvasLayer = document.getElementById("canvas-mask");

							canvas.width=canvasLayer.scrollWidth;
							canvas.height=canvasLayer.scrollHeight;
							canvas.style.position = 'absolute';

							var context = canvas.getContext('2d');



   







							

							flechas.draw_arrow(context,inicialX,inicialY,finalX,finalY);




							origen = destino;
							destino = null;
						}

						secuenciaActual.push(Number($(this).attr("id")[1]));
						console.log(secuenciaActual);
					}

				});
			});


		} else {

			capturando = false;

			$("#alerts").fadeIn(1000).fadeOut(2000); //temporal ->modal debe usarse
			$("#capturar-secuencias").text("Fijar secuencia actual...").removeClass("btn-warning").addClass("btn-primary");

			secuenciaActual.shift();
			window.secuencias[indiceSecuencia] = secuenciaActual;
			console.log(secuenciaActual);
			console.log(window.secuencias);
			$("#s" + indiceSecuencia).remove();

			secuenciaActual = [];
			indiceSecuencia = null;


		}

	});



}

function random_hexa_color(){

var r= Math.round((Math.random()*89)+10);
var g= Math.round((Math.random()*89)+10);
var b = Math.round((Math.random()*89)+10);
var hexa= "#"+r+""+g+""+b;
return hexa;
}


function cambioBit(string1, string2){
       var contador=0;
       for(var i=0;i<string1.length;i++){
               if(string1.charAt(i)!=string2.charAt(i)){
                       contador++;
               }
       }
       return contador;
}