/*Modulo Maquina de estados
*Creado por @smilena y @danyjavierb
*este modulo encapsula los comportamientos de una maquina de estados
*y la formacion de la ecuacion de cada variable segun el tipo de
*flip flop elegido (JK ó RS).
*/


var maquinaApi = (function (window){

	var estados;
	var secuencias;
	var tamano;
	var variables;
	var arregloEstadosFuturosDecimal=[];
	var arregloEstadosPresentes = [];
	var arregloEstadosFuturos = [];
	var arregloFlipFlop = [];
	var arregloMinterminos = new Array([]);
	var ecuacion="";
	var indice;
	var string1 = new String();
	var string2 = new String();
	var tipoFlipFlop;
	var nombresVariables=["A","B","C","D","E"];
	
	var metodoprivado = function(){};
	
	function replaceAt(string, index, char) {
		return string.substring(0, index) + char + string.substring(index + 1);
	}
	
	Array.prototype.unique = function(a) {
		return function() {
			return this.filter(a)
		}
	}(function(a, b, c) {
		return c.indexOf(a, b + 1) < 0
	});
	
	function decToBin(numero) {
		return numero === 0 ? "" : decToBin(parseInt(numero / 2), 10) + String(numero % 2)
	}
	
	function estadosPresentes() {
		for (var i = 0; i < tamano; i++) {
			arregloEstadosPresentes[i] = decToBin(i);
		}
		for (var i = 0; i < tamano; i++) {
			for ( j = 0; j < variables; j++) {
				if (arregloEstadosPresentes[i].length < variables)
					arregloEstadosPresentes[i] = "0".concat(arregloEstadosPresentes[i]);
			}
		}
	}
	
	function estadosFuturos() {
		for (var i = 0; i < tamano; i++) {
			arregloEstadosFuturos[i] = decToBin(arregloEstadosFuturosDecimal[i]);
		}
		for (var i = 0; i < tamano; i++) {
			for (var j = 0; j < variables - (secuencias / 2) + 1; j++) {
				if (arregloEstadosFuturos[i].length < variables - (secuencias / 2))
					arregloEstadosFuturos[i] = "0".concat(arregloEstadosFuturos[i]);
			}
		}
	}
	
	function flipFlop() {
		var inicio = secuencias / 2;
		for ( i = 0; i < tamano; i++) {
			arregloFlipFlop[i] = "";
		}
		if (tipoFlipFlop == 1) {//JK
			for (var i = 0; i < tamano; i++) {
				var k = 0;
				for (var j = inicio; j < variables; j++) {
					if (arregloEstadosPresentes[i][j] == '0' && arregloEstadosFuturos[i][k] == '0') {
						arregloFlipFlop[i] += "0X";
					} else if (arregloEstadosPresentes[i][j] == '1' && arregloEstadosFuturos[i][k] == '1') {
						arregloFlipFlop[i] += "X0";
					} else if (arregloEstadosPresentes[i][j] == '0' && arregloEstadosFuturos[i][k] == '1') {
						arregloFlipFlop[i] += "1X";
					} else if (arregloEstadosPresentes[i][j] == '1' && arregloEstadosFuturos[i][k] == '0') {
						arregloFlipFlop[i] += "X1";
					}
					k++;
				}
				document.write(arregloFlipFlop[i]+"<br/>");
			}
		} else {//RS
			for (var i = 0; i < tamano; i++) {
				k = 0;
				for (var j = inicio; j < variables; j++) {
					if (arregloEstadosPresentes[i][j] == '0' && arregloEstadosFuturos[i][k] == '0') {
						arregloFlipFlop[i] += "X0";
					} else if (arregloEstadosPresentes[i][j] == '1' && arregloEstadosFuturos[i][k] == '1') {
						arregloFlipFlop[i] += "0X";
					} else if (arregloEstadosPresentes[i][j] == '0' && arregloEstadosFuturos[i][k] == '1') {
						arregloFlipFlop[i] += "01";
					} else if (arregloEstadosPresentes[i][j] == '1' && arregloEstadosFuturos[i][k] == '0') {
						arregloFlipFlop[i] += "10";
					}
					k++;
				}
			}
		}
	}
	
	function minterminos() {
		for (var i = 0; i < (decToBin(estados).length - 1) * 2; i++) {
			arregloMinterminos[i] = new Array();
			for (var j = 0; j < arregloFlipFlop.length; j++) {
				if (arregloFlipFlop[j][i] == '1' || arregloFlipFlop[j][i] == 'X') {
					arregloMinterminos[i].push(arregloEstadosPresentes[j]);
				}
			}
		}
	}
	
	function cambioBit(string1, string2) {
		var contador = 0;
		for (var i = 0; i < string1.length; i++) {
			if (string1.charAt(i) != string2.charAt(i)) {
				contador++;
				if (contador > 1) {
					break;
				}
				indice = i;
			}
		}
		return contador;
	}
	
	function ordenar(arregloDesordenado) {
		var arregloOrdenado = new Array();
		var temp;
		var contadorUnos;
		for (var j = 0; j < arregloDesordenado[0].length + 1; j++) {
			arregloOrdenado.push(new Array());
		}
		for (var i = 0; i < arregloDesordenado.length; i++) {
			contadorUnos = 0;
			for (var j = 0; j < arregloDesordenado[i].length; j++) {
				if (arregloDesordenado[i][j] == "1") {
					contadorUnos++;
				}
			}
			arregloOrdenado[contadorUnos].push(arregloDesordenado[i]);
		}
		return arregloOrdenado;
	}
	
	function simplificar(arregloMinterminosVariable) {
		var arregloTemporal = new Array();
		var cadenaTemporal = new String();
		var arregloFinal = new Array();
		var arregloContadorCoincidencias=new Array();
		
		for(var i=0;i<arregloMinterminosVariable.length;i++){
			arregloContadorCoincidencias[i]=new Array();
			for(var j=0;j<arregloMinterminosVariable[i].length;j++){
				arregloContadorCoincidencias[i].push(0);
			}
		}
		
		var i=0;
		var j=i+1;
		while(i<arregloMinterminosVariable.length - 1 && j<arregloMinterminosVariable.length){
			for (var k = 0; k < arregloMinterminosVariable[i].length; k++) {
					for (var f = 0; f < arregloMinterminosVariable[j].length; f++) {
						if (arregloMinterminosVariable[i][k] != null && arregloMinterminosVariable[j][f] != null) {
							if (cambioBit(arregloMinterminosVariable[i][k], arregloMinterminosVariable[j][f]) == 1) {
								cadenaTemporal = replaceAt(arregloMinterminosVariable[i][k], indice, "X");
								arregloTemporal.push(cadenaTemporal);
								arregloContadorCoincidencias[i][k]++;
								arregloContadorCoincidencias[j][f]++;							
							}
						}
					}
					
				}
				i++;
				j=i+1;
		}
	
		for(var i=0;i<arregloContadorCoincidencias.length;i++){
			for(var j=0;j<arregloContadorCoincidencias[i].length;j++){
				if(arregloContadorCoincidencias[i][j]==0){
					arregloTemporal.push(arregloMinterminosVariable[i][j]);
					
				}
			}
		}
		
		
		for (var j = 0; j < arregloTemporal[0].length +1; j++) {
			arregloFinal.push(new Array());
		}
		for (var i = 0; i < arregloTemporal.length; i++) {
			contadorUnos = 0;
			for (var j = 0; j < arregloTemporal[i].length; j++) {
				if (arregloTemporal[i][j] == "1") {
					contadorUnos++;
				}
			}
			arregloFinal[contadorUnos].push(arregloTemporal[i]);
		}
		for (var j = 0; j < arregloFinal.length; j++) {
			arregloFinal[j]=arregloFinal[j].unique();
		}
		return arregloFinal;
	}
	
	function generarEcuacion(matrizFinal){
		var terminoTemporal="";
		ecuacion="";
		for(var i=0;i<matrizFinal.length;i++){
			for(var j=0;j<matrizFinal[i].length;j++){
				terminoTemporal="";
				for(var k=0;k<matrizFinal[i][j].length;k++){
					if(matrizFinal[i][j][k]=='1'){
						terminoTemporal+=nombresVariables[k]+" ";
					}else if(matrizFinal[i][j][k]=='0'){
						terminoTemporal+="'"+nombresVariables[k]+" ";
					}
				}
				ecuacion+=terminoTemporal+"+";
			}
		}
		return (ecuacion.substr(0,ecuacion.length-1));
	}
	
	function comparar(arreglo1, arreglo2){
		var retorno=true;
		if(arreglo1.length != arreglo2.length){
			retorno=false;
		}
		else{
			for(var l=0;l<arreglo1.length;l++){
				for(var j=0;j<arreglo1[l].length;j++){
					if(arreglo1[l][j] != arreglo2[l][j]){				
						retorno= false;
						break;
					}
				}
				if(!retorno){
					break;
				}
			}
		}
		return retorno;
	}
	
	

//comsumible api
return {
	
	inicializar:function(nvoestados, nvosecuencias,nvoArregloEstadosFuturosDecimal,nvoTipoFlipFlop) {
		estados = nvoestados;
		secuencias = nvosecuencias;
		variables = (secuencias / 2) + (decToBin(estados).length - 1);
		tamano = Math.pow(2, variables);
		arregloEstadosFuturosDecimal=nvoArregloEstadosFuturosDecimal;
		tipoFlipFlop=nvoTipoFlipFlop;
	},
	
		secuencia:function(){
		var arregloEcuaciones=new Array();
		estadosPresentes();
		estadosFuturos();
		flipFlop();
		minterminos();
		for(var i=0;i<arregloMinterminos.length;i++){
			var ecuacionActual=simplificar(ordenar(arregloMinterminos[i]));
			var ecuacionAnterior=new Array();	
			var temp;	
			while(!comparar(ecuacionAnterior,ecuacionActual)){
				ecuacionAnterior=ecuacionActual;
				ecuacionActual=simplificar(ecuacionAnterior);
			}
			arregloEcuaciones.push(generarEcuacion(ecuacionActual));
			document.write(generarEcuacion(ecuacionActual)+"<br/>");
		}
		return arregloEcuaciones;
	}
}

} )(window);