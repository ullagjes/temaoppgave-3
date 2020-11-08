import {exercises} from "./exercises.js"

//FORSIDE

let settSammenProgram = document.querySelector("#navigate_to_container");
let container = document.querySelector("#container");


let html = ``;    
    

function forside() {
    
    exercises.forEach(el => {

    html += `
    <article>
        <h2>${el.navn}</h2>
        <img class="container_trening_img" src="${el.bilde}">
        
        <h3 class="beskrivelse">${el.beskrivelse}</h3>
        <ul class="container_trening_ul">${el.instrukser}
        </ul>
            <label for="quantity" class="container_label">Hvor mange minutter skal økten vare?</label>
            <input type="number" class="quantity">
            <button class="container_trening_button1">Legg til treningsplan</button>
            <button class="container_trening_button">Les mer om øvelsen</button>
        
        <p class="vanskelighetsgrad">Vanskelighetsgrad: ${el.impact}</p>
        <p class="treningstype">Treningstype: ${el.effekt}</p>
       
    </article>
            `;
    
});

container.innerHTML = html;
let visMerKnapper = document.querySelectorAll(".container_trening_button")
for(let visMerKnapp of visMerKnapper){
    visMerKnapp.addEventListener("click", utvidBilde)
}
let addToPlanBtns = document.querySelectorAll(".container_trening_button1");
for(let addToPlanBtn of addToPlanBtns){
    addToPlanBtn.addEventListener("click", addToPlan)
}
    
}

settSammenProgram.addEventListener("click", forside)


//____________________________________________________________KLIKKBARHET

//SE NÆRMRERE PÅ EN ØVELSE



let visMerErTrykket = false;

function utvidBilde (event) {
    
    let knappTrykket = event.target;
    let innholdTrykket = knappTrykket.parentElement;

    
    if(visMerErTrykket) {
        innholdTrykket.classList.remove("utvidet");
    } else {
        innholdTrykket.classList.add("utvidet");
    }

    visMerErTrykket = !visMerErTrykket;

}

//VIS TRENINGSPLAN

let planKnapp = document.querySelector("#treningsplan");

let planErTrykket = false;

function visTreningsplan() {

    if(planErTrykket) {
        planKnapp.style.width = "3em"
        planKnapp.style.height = "3em"
        
    } else {
        planKnapp.style.width = "10em"
    }
    planErTrykket = !planErTrykket;
}

planKnapp.addEventListener("click", visTreningsplan)

//LEGG TIL I TRENINGSPLAN

let myPlan = []

function addToPlan (event) {

    let pressedBtn = event.target;
    let pressedBtnContaner = pressedBtn.parentElement;
    let pressedBtnName = pressedBtnContaner.querySelector("h2").innerText;
   
    
    let myFilteredActivities = exercises.filter((el) => {
        return el.navn.includes(pressedBtnName)} )
   
    
    myPlan.push(myFilteredActivities)
    
    
    let html = ``;
    for(let i = 0; i < myPlan.length; i++){
        myPlan[i].forEach(el => {
        html+=`
        <div><p>${el.navn}</p></div>        
        `
        }) 
    }
    
    planKnapp.innerHTML = html;
}




//FILTRERING 

let impact1 = document.querySelector("#Lav")
let impact2 = document.querySelector("#Medium")
let impact3 = document.querySelector("#Høy")
let effekt1 = document.querySelector("#Kondisjon")
let effekt2 = document.querySelector("#Styrke")
let effekt3 = document.querySelector("#Mobilitet")
let newExercises = ``;

impact1.addEventListener("click", filtrere);
impact2.addEventListener("click", filtrere);
impact3.addEventListener("click", filtrere);


function filtrere(event){
    
    let mittFilter = event.target.id;
    let filterLav = exercises.filter(el => el.impact.includes(mittFilter))
    let filterMedium = exercises.filter(el => el.impact.includes(mittFilter))
    let filterHigh = exercises.filter(el => el.impact.includes(mittFilter))
    
    if(impact1.checked == true) {
        newExercises = filterLav; 
    }
    if(impact2.checked == true) {
        newExercises = filterMedium;
    }
    if(impact3.checked == true) {
        newExercises = filterHigh;
    }

    effekt1.addEventListener("click", filtrer2)
    effekt2.addEventListener("click", filtrer2)
    effekt3.addEventListener("click", filtrer2)
    effekt1.addEventListener("click", visFiltrerte)
    effekt2.addEventListener("click", visFiltrerte)
    effekt3.addEventListener("click", visFiltrerte)

    function filtrer2(event){
        
        let mittFilter2 = event.target.id;

        let filterStyrke = newExercises.filter((el) => {
            return el.effekt.includes(mittFilter2)}
        )

        let filterKondis = newExercises.filter((el) => {
            return el.effekt.includes(mittFilter2)}
        )

        let filterMobilitet = newExercises.filter((el) => {
            return el.effekt.includes(mittFilter2)}
        )
        
        if(effekt1.checked == true) {
            newExercises = filterKondis;
            //console.log(newExercises)
        }
        if(effekt2.checked == true) {
            newExercises = filterStyrke;
            //console.log(newExercises)
        }
        if(effekt3.checked == true) {
            newExercises = filterMobilitet;
            //console.log(newExercises)
        }
    console.log(newExercises)
    }
    
}


function visFiltrerte() {
    
    let nyHTML = ``;
    newExercises.forEach(el => {

            nyHTML += `
            <article class="container_trening">
                <img class="container_trening_img" src="${el.bilde}">
                <h2 class="container_trening_h2">${el.navn}</h2>
                <ul class="container_trening_ul">${el.instrukser}</ul>
                <p>Vanskelighetsgrad: ${el.impact}</p>
                <p>Treningstype: ${el.effekt}</p>
                <label for="quantity" class="container_label">Hvor mange minutter skal økten vare?</label>
                <input type="number" id="quantity">
                <button class="container_trening_button_1">Legg til treningsplan</button>
                
                <button class="container_trening_button">Les mer om øvelsen</button>
            </article>
                    `;
       
    });
 container.innerHTML = nyHTML;   
}



