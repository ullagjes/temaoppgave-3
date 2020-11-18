import {exercises} from "./exercises.js"

//______________________________________________________________FORSIDE
let container = document.querySelector("#container");
    

function showExercises() {
    let html = ``;
    exercises.forEach(el => {
    html += `
    <article>
        <h2>${el.navn}</h2>
        <img class="container_trening_img" src="${el.bilde}">
        <h3 class="beskrivelse">${el.beskrivelse}</h3>
        <ul class="container_trening_ul">${el.instrukser}
        </ul>
            <label for="quantity" class="container_label">Hvor mange minutter skal økten vare?</label>
            <input type="number" class="quantity" value=0>
            <button class="container_trening_button1">Legg til treningsplan</button>
            <button class="container_trening_button">Les mer om øvelsen</button>
        <p class="vanskelighetsgrad">Vanskelighetsgrad: ${el.impact}</p>
        <p class="treningstype">Treningstype: ${el.effekt}</p>  
    </article>
            `;
    });

container.innerHTML = html;
    
let visMerKnapper = document.querySelectorAll(".container_trening_button")
for(let visMerKnapp of visMerKnapper){visMerKnapp.addEventListener("click", utvidBilde)}

let addToPlanBtns = document.querySelectorAll(".container_trening_button1");
for(let addToPlanBtn of addToPlanBtns){addToPlanBtn.addEventListener("click", addToPlan)}   
}

let settSammenProgram = document.querySelector("#navigate_to_container");
settSammenProgram.addEventListener("click", showExercises)

//____________________________________________________________ANIMASJON FORSIDE

let textStartAnimation = document.querySelector(".introBtn");
let introText = document.querySelector("#intro");
let planIcon = document.querySelector(".icon");

function startAnimation() {
    introText.classList.add("introAnimated")
    showFilterBtn.classList.add("btnAnimated")
    settSammenProgram.classList.add("btnAnimated")
    planIcon.classList.add("iconPulse")
    planKnapp.classList.add("iconAnimated")
    myPlanContainer.classList.add("myPlanAnimated")
    myPlanContainer.innerHTML = `<p>Her finner du oversikt over alle aktiviteter du har planlagt denne uka. Greier du 150 minutter til sammen?</p>`
}

textStartAnimation.addEventListener("click", startAnimation)

//____________________________________________________________SE NÆRMRERE PÅ EN ØVELSE

let visMerErTrykket = false;
function utvidBilde (event) {
    let knappTrykket = event.target;
    let innholdTrykket = knappTrykket.parentElement;
    let lukkKnapp = innholdTrykket.querySelector(".container_trening_button");
    let pressedBtnQty = innholdTrykket.querySelector("input");


    if(visMerErTrykket) {
        innholdTrykket.classList.remove("utvidet");
        lukkKnapp.innerText = "Les mer om øvelsen";
        
    } else {
        innholdTrykket.classList.add("utvidet");
        lukkKnapp.innerText = "Lukk vindu";
        pressedBtnQty.value = ``;
    }
    visMerErTrykket = !visMerErTrykket;
}

//___________________________________________________________LEGG TIL I TRENINGSPLAN

let myPlan = []
let myPlanContainer = document.querySelector("#myPlanContainer");

function addToPlan (event) {


    let pressedBtn = event.target;
    let pressedBtnContaner = pressedBtn.parentElement;
    let pressedBtnName = pressedBtnContaner.querySelector("h2").innerText;
    let pressedBtnLabel = pressedBtnContaner.querySelector(".container_label")
    let pressedBtnQtyStyler = pressedBtnContaner.querySelector("input")
    let pressedBtnQty = pressedBtnContaner.querySelector("input").value;

    if(pressedBtnQty <= 0 || pressedBtnQty === NaN) {
        pressedBtnQtyStyler.style.backgroundColor = "lightCoral";
        pressedBtnLabel.innerText = "Du må legge til hvor lenge du skal trene!"
    } else {
        pressedBtnQtyStyler.style.backgroundColor = "white";
        pressedBtnLabel.innerText = "Hvor mange minutter skal økten vare?"
        myPlan.push({
        name: pressedBtnName,
        minutes: Number(pressedBtnQty)
        })
        ;
    }
    
    
    let html = ``;
    myPlan.forEach(el => {
        html+=`<div class="planDiv"><p class="nameOfExercise">${el.name}</p><input type="number" value="${el.minutes}" id="quantityOfExercise"></input><label for="quantityOfExercise">minutter</label></div>`})
    
        myPlanContainer.innerHTML = html;
    
    addMinutes()
}
    
    

//SUM MINUTTER
let myMinutes = document.querySelector("#myMinutes");

function addMinutes(){
    let totalMinutes = 0;
    for(let i = 0; i < myPlan.length; i++){
        totalMinutes += myPlan[i].minutes;
    }

    myMinutes.innerText = totalMinutes + ` min.`
    if(totalMinutes >= 150){
        myMinutes.classList.add("minutesAcheived")
    } 
}

//___________________________________________________________VIS TRENINGSPLAN

let planKnapp = document.querySelector("#myPlanIcon");
let planErTrykket = false;

function visTreningsplan() {

    if(planErTrykket) {
        myPlanContainer.style.right = "-100vw"
        myMinutes.style.marginRight = "1em";
    } else {
        myPlanContainer.style.right = "0vw"
        myMinutes.style.marginRight = "22em";
    }
    planErTrykket = !planErTrykket;
}
planKnapp.addEventListener("click", visTreningsplan)
planKnapp.addEventListener("keypress", function (e) {
    if(e.key === "Enter"){
        visTreningsplan()
    }
})

//__________________________________________________________FILTRERING 

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
        let filteredAgain = newExercises.filter((el) => {
                return el.effekt.includes(mittFilter2)}
        )

        if(effekt1.checked == true || effekt2.checked == true || effekt3.checked == true){
            newExercises = filteredAgain;
        }
    resetBtn.style.display = "inline-block";
    }    
}

// VIS MULIGHET FOR Å TILPASSE ØVELSER 
let mainPage = document.querySelector("#mainPage")
let showFilterBtn = document.querySelector("#show_filter");
let filterByImpact = document.querySelector("#filter_by_impact");
let filterbyEffect = document.querySelector("#filter_by_effect");

function showFilterOptions(){
        settSammenProgram.style.display = "none"
        showFilterBtn.style.display = "none";
        filterByImpact.style.display = "block"
        filterByImpact.style.transition = "1s"
    }

showFilterBtn.addEventListener("click", showFilterOptions);

//TILPASSEDE ØVELSER STEG 2
function filterFurther () {
    if(impact1.checked == true || impact2.checked == true || impact3.checked == true) {
        filterByImpact.style.display = "none"
        filterbyEffect.style.display = "block";
        filterbyEffect.style.transition = "1s";
    }  
}

impact1.addEventListener("click", filterFurther)
impact2.addEventListener("click", filterFurther)
impact3.addEventListener("click", filterFurther)

//_______________________________________________________________VIS FILTRERTE ØVELSER 

function visFiltrerte() {
    mainPage.style.display = "none"
    let nyHTML = ``;
    newExercises.forEach(el => {
            nyHTML += `
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
    container.innerHTML = nyHTML;   
    
    let visMerKnapper = document.querySelectorAll(".container_trening_button")
    for(let visMerKnapp of visMerKnapper){visMerKnapp.addEventListener("click", utvidBilde)}
    
    let addToPlanBtns = document.querySelectorAll(".container_trening_button1");
    for(let addToPlanBtn of addToPlanBtns){addToPlanBtn.addEventListener("click", addToPlan)}
}

//____________________________________________________________TILBAKE TIL FORSIDEN

function resetPage(){
    mainPage.style.display = "flex";
    showFilterBtn.style.display = "block"
    settSammenProgram.style.display = "inline-block";
    let filterForm = document.querySelector("#filter_by_effect")
    filterForm.style.display = "none";
    textStartAnimation.style.display = "none";
    textStartAnimation.removeEventListener("click", startAnimation)
    textStartAnimation.addEventListener("click", resetFilter)
}

let resetBtn = document.querySelector("#filter_again")
resetBtn.addEventListener("click", resetPage)

function resetFilter() {
    
    settSammenProgram.style.display = "inline-block";
    showFilterBtn.style.display = "inline-block";
    settSammenProgram.style.opacity = "100%"
    showFilterBtn.style.opacity = "100%"
}


//NOTATER

/*let filterStyrke = newExercises.filter((el) => {
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
        }*/