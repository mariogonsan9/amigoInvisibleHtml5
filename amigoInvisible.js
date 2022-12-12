let participantes = []
participantes.push("usuario1")
participantes.push("usuario2")
participantes.push("usuario3")
participantes.push("usuario4")

let participantesSinRegalo
let participantesQueYaRegalan
let asignacionesParticipantes

document.addEventListener("DOMContentLoaded", function(event) { 
    displayParticipants()
});

function displayParticipants(){
    let participantesList=document.getElementById("listaParticipantes");

    for(let i=0;i<participantes.length;i++){
        participantesList.appendChild(document.createElement("li"))
        participantesList.lastChild.appendChild(document.createTextNode(participantes[i]))
    }
} 

function addParticipant() {
    var name = document.getElementById('enteredName').value;
    if (!(typeof name === 'undefined') && name!=null && name.trim()!='') {  
        participantes.push(name);
    }
    console.log(participantes);
    document.getElementById('enteredName').value = '';
    
    //pintartlo en la lista:

    let participantesList=document.getElementById("listaParticipantes");
    participantesList.appendChild(document.createElement("li"))
    participantesList.lastChild.appendChild(document.createTextNode(name))
}


function clearParticipants() {
    participantes=[]
    let participantesList=document.getElementById("listaParticipantes");
    participantesList.innerHTML = ""

}
function doRoll() {

    console.log("Sorteando!")
    participantesSinRegalo=[...participantes]
    participantesQueYaRegalan=[]

    asignacionesParticipantes=new Map();

    for(let i=0;i<participantes.length;i++){

        //primera comprobacion, ver si en el array hay solo 2 usuarios, para evitar en la implemenacion que el ultimo usuario se quede "huerfano"
        if(!(participantesSinRegalo.length==2 && participantesSinRegalo.indexOf(participantes[participantes.length-1])!= -1)){

                //comprobar si el usuario esta dentro del array y extraerlo momentaneamente
                //TODO: añadir otras restricciones
            let posicionArrayUserActual=participantesSinRegalo.indexOf(participantes[i])
            if(posicionArrayUserActual!=-1){
                participantesSinRegalo.splice(posicionArrayUserActual,1)
            }

                //elegir aleatoriamente alguien del array de participantesSinRegalo
            let participanteAsignado = participantesSinRegalo[ participantesSinRegalo.length * Math.random() | 0];

                //añadir en participantesQueYaRegalan y eliminar de participantesSinRegalo

            if(participanteAsignado){
                participantesQueYaRegalan.push(participantes[i])
                participantesSinRegalo.splice(participantesSinRegalo.indexOf(participanteAsignado),1)
                
                    // si estaba en el array de participantes, volverlo a insertar
                if(posicionArrayUserActual!=-1){
                    participantesSinRegalo.push(participantes[i])
                }

                    //asignarlo en Asignacionesparticipantes
                asignacionesParticipantes.set(participantes[i],participanteAsignado);
            }else{
                participantesSinRegalo.push(participantes[i])
                alert("hubo un error, quedaron usuarios sin regalar")
            }
            

        }else{
            console.log("vamos a evitar que el ultimo participante se quede huerfano")
            let participanteAsignado = participantes[participantes.length-1];

                //añadir en participantesQueYaRegalan y eliminar de participantesSinRegalo

            participantesQueYaRegalan.push(participantes[i])
            participantesSinRegalo.splice(participantesSinRegalo.indexOf(participanteAsignado),1)

                //asignarlo en Asignacionesparticipantes
            asignacionesParticipantes.set(participantes[i],participanteAsignado);
        }


    }
    console.log(asignacionesParticipantes)
    console.log("usuarios sin regalo:",participantesSinRegalo)

    var sectionCards = document.getElementById('cards');
    sectionCards.innerHTML=``

    //pintar en estructura
    for (let [regalador, afortunado] of asignacionesParticipantes) {
        addAsignacionToCards(regalador, afortunado)
        }
        const cards = document.querySelectorAll(".cards__single");
        cards.forEach((card) => card.addEventListener("click", flipCard));
}


function flipCard() {
  this.classList.toggle("flip");
}


function addAsignacionToCards(regalador, afortunado) {
    var sectionCards = document.getElementById('cards');

    var div = document.createElement('div');
    div.setAttribute('class', 'cards__single');
    div.innerHTML = `
            <div class="cards__front">
                <h1 class="cards__artist" tabindex="0">${regalador}</h1>
            </div>
            <div class="cards__back">
                <h2 tabindex="0">Regalas a ${afortunado}</h2>
            </div>
    `;
    document.getElementById('cards').appendChild(div);
}