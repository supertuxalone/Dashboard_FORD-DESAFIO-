
//car
let carArr = [];

class Car {
   

    constructor(modelo, preco, alturaCacamba, alturaVeiculo, alturaSolo, capacidadeCarga, motor, potencia, volumeCacamba, roda, image){
	   this.modelo = modelo;
       this.preco = preco;
       this.alturaCacamba = alturaCacamba;
       this.alturaVeiculo = alturaVeiculo;
       this.alturaSolo = alturaSolo;
       this.capacidadeCarga = capacidadeCarga;
       this.motor = motor;
       this.potencia = potencia;
       this.volumeCacamba = volumeCacamba;
       this.roda = roda;
       this.image = image;
       
    }
} 

// search on array if exist carClass returning 1 if not return -1
function GetCarArrPosition(arr, carClass) {
    for(let i = 0; i < arr.length; i++){
        if(arr[i].nome  === carClass.nome)
            return i;
    }
    return -1;
}

function SetCarToCompare(el, carClass) {
   
    if(carClass instanceof Car){       
        if(el.checked){
			if(maiorDuasSelect()){
				el.checked = false;
			}else{
				carArr.push(carClass);
			}	
		}else{
			let carInd = GetCarArrPosition (carArr, carClass);
			//altera o conteúdo de uma lista, adicionando novos elementos enquanto remove elementos antigos.
			carArr.splice(carInd, 1);
		}
	}else {
		throw "Você precisa definir uma classe de Veículo !";
    }
}

function ShowCompare() {
    if(carArr.length < 2) {
        alert("Marcar 2 Veiculos para Comparação");
        return;
    }

    UpdateCompareTable();
    document.getElementById("compare").style.display = "block";
}

function HideCompare(){
    document.getElementById("compare").style.display = "none"; 
}

function UpdateCompareTable() {
	carArr.forEach( (car, index) => setDetails(car, index));    
}

function setDetails(car, id){
	//retorna um vetor com todas as propriedades (enumeráveis ou não) encontradas diretamente em um dado objeto.
	let carProperties = Object.getOwnPropertyNames(car);
	
	carProperties.forEach( prop => {
		contentTo(prop, id, car[prop]);
	});	
} 

function contentTo(prop, id, content){
	if(prop == 'image'){
		compareImg(id, content);
	}else{
		let element = document.querySelector(`#compare_${prop.toLowerCase()}_${id}`);
		element.textContent = content;
	} 
}
	
function compareImg(id, content){
	let compareImg = document.querySelector("#compare_image_" + id);
	let carImg = compareImg.querySelector("img");
	if (carImg == null){
		carImg = document.createElement("img");
	}
	
	carImg.src = content;
	carImg.classList.add("photocar");
	compareImg.appendChild(carImg);
} 

function maiorDuasSelect(){
    if(carArr.length >= 2){
        alert("Apenas 2 veículos para Comparação.");
        return true;
    }
    return false;
}