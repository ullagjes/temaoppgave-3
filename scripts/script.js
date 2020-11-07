import {exercises} from "./exercises.js"

//FORSIDE

let settSammenProgram = document.querySelector("#navigate_to_container");
let container = document.querySelector("#container");

let html = ``;    
    

function forside() {
    
    exercises.forEach(el => {

    html += `
    <article class="container_trening">
        <img class="container_trening_img" src="${el.bilde}">
        <h2 class="container_trening_h2">${el.navn}</h2>
        <ul class="container_trening_ul">${el.instrukser}
        </ul>
        <p>Vanskelighetsgrad: ${el.impact}</p>
        <p>Treningstype: ${el.effekt}</p>
        <label for="quantity" class="container_label">Hvor mange minutter skal økten vare?</label><br>
        <input type="number" id="quantity">
        <button class="container_trening_button_1">Legg til treningsplan</button>
        
        <button class="container_trening_button">Les mer om øvelsen</button>
    </article>
            `;
    
    settSammenProgram = false;
});
    
container.innerHTML = html;
    
}

settSammenProgram.addEventListener("click", forside)


//KLIKKBARHET

let bilder = document.querySelectorAll(".container_trening_img");

for(const bilde of bilder) {
    //bilde.addEventListener("click", utvidBilde)
    bilde.addEventListener("click", utvidBildeTest)
}

let bildeErTrykket = false;

function utvidBildeTest (event) {
    let bildeTrykket = event.target;
    let innholdTrykket = bildeTrykket.parentElement;
    
    if(bildeErTrykket) {
        innholdTrykket.classList.remove("utvidet");
    } else {
        innholdTrykket.classList.add("utvidet");
    }

    bildeErTrykket = !bildeErTrykket;
    
    
}

/*function utvidBilde (event) {
    
    let bildeTrykket = event.target;
    let innholdTrykket = bildeTrykket.parentElement;
    let nyHTML = innholdTrykket.innerHTML;
    
    if(bildeErTrykket) {
        utvid.innerHTML = ``
    } else {
        utvid.innerHTML += nyHTML;
        innholdTrykket.classList.add("utvidet")
    }

    bildeErTrykket = !bildeErTrykket;
        
}*/

//FILTRERING 

let impact1 = document.querySelector("#Lav")
let impact2 = document.querySelector("#Medium")
let impact3 = document.querySelector("#Høy")
let effekt1 = document.querySelector("#Kondisjon")
let effekt2 = document.querySelector("#Styrke")
let effekt3 = document.querySelector("#Mobilitet")
let genererBtn = document.querySelector("#generer")
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


/*function visFiltrerte() {
    for(let i = 0; i < newExercises.length; i++) {
        let nyHTML = ``;
        newExercises[i].forEach(el => {

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
    }*/



//NOTATER FOR FILTRERING

    /*for(let i = 0; i < newExercises.length; i++) {
        for(let j = 0; j < newExercises[i].length; j++){

        console.log(newExercises[i][j].effekt)
    }}*/

//VIS TRENINGSPLAN

let planKnapp = document.querySelector("#treningsplan");

let planErTrykket = false;

function visTreningsplan() {

    if(planErTrykket) {
        planKnapp.style.width = "3em"
        planKnapp.style.height = "3em"
    } else {
        planKnapp.style.width = "100em"
    }
    planErTrykket = !planErTrykket;
}

planKnapp.addEventListener("click", visTreningsplan)

