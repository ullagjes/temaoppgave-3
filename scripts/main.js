import {exercises} from "./exercise-array.js";


//--------------SHOW ALL EXERCISES---------------------//

let container = document.querySelector("#container");

//FIRST FUNCTION CREATES HTML FOR EACH OBJECT IN ARRAY

function showExercises(isFiltered) {
    let html = ``;
    let array = exercises;
    if(isFiltered)
        array = newExercises;

    array.forEach(el => {
    html += `
    <article>
        <h2>${el.name}</h2>
        <img class="container__article-img" src="${el.image}" alt="${el.alt}">
        <h3 class="container__article-h3">${el.description}</h3>
        <ul class="container__article-ul">${el.instructions}
        </ul>
            <label for="quantity" class="container__article-label">Hvor mange minutter skal økten vare?</label>
            <input type="number" class="quantity" value=0>
            <button class="container__article-button1">Legg til treningsplan</button>
            <button class="container__article-button2">Les mer om øvelsen</button>
        <p class="container__article-p-impact">Vanskelighetsgrad: ${el.impact}</p>
        <p class="container__article-p-effect">Treningstype: ${el.effect}</p>  
    </article>
            `;
    });
    return html; 
    
}

//FUNCTION FILLS IN HTML FOR ALL OBJECTS IN EXERCISE-ARRAY
function showUnfilteredExercises() {
    container.innerHTML = showExercises(false);
    
    let addExpandBtns = document.querySelectorAll(".container__article-button2");
    for(let addExpandBtn of addExpandBtns){addExpandBtn.addEventListener("click", expandImage)};

    let addToPlanBtns = document.querySelectorAll(".container__article-button1");
    for(let addToPlanBtn of addToPlanBtns){addToPlanBtn.addEventListener("click", addToPlan)};  
}

let showAllExercises = document.querySelector("#main-page__button");
showAllExercises.addEventListener("click", showUnfilteredExercises)

//---------------START ANIMATIONS FOR INTRODUCTION-------------//

let showFilterBtn = document.querySelector("#main-page__button-2");
let textStartAnimation = document.querySelector(".main-page__introBtn");
let introText = document.querySelector("#main-page__div");
let planIcon = document.querySelector("#header__img");
let planBtn = document.querySelector("#header__div");
let myPlanContainer = document.querySelector("#header__div-2");
let myPlanInnerContainer = document.querySelector("#header__div-3");

function startAnimation() {
    showFilterBtn.style.display = "block";
    showAllExercises.style.display = "inline-block";
    introText.classList.add("introAnimated");
    showFilterBtn.classList.add("btnAnimated");
    showAllExercises.classList.add("btnAnimated");
    planIcon.classList.add("iconPulse");
    planBtn.classList.add("iconAnimated");
    myPlanContainer.classList.add("myPlanAnimated");
    planIsPressed = true;
}

textStartAnimation.addEventListener("click", startAnimation);


//------------------ALLOW USER TO FIND MORE INFO ON ACTIVITY------------------//

let imageIsExpanded = false;

function expandImage (event) {
    let btnPressed = event.target;
    let parentOfBtnPressed = btnPressed.parentElement;
    let closeBtn = parentOfBtnPressed.querySelector(".container__article-button2");

    let pressedBtnQty = parentOfBtnPressed.querySelector("input");

    if(imageIsExpanded) {
        parentOfBtnPressed.classList.remove("expand");
        closeBtn.innerText = "Les mer om øvelsen";
        
    } else {
        parentOfBtnPressed.classList.add("expand");
        closeBtn.innerText = "Lukk vindu";
        pressedBtnQty.value = ``;
    }
    imageIsExpanded = !imageIsExpanded;
}

//------------------ADD ACTIVITY TO PERSONALISED PLAN -----------------//

let myPlan = []

function addToPlan(event) {
    let pressedBtn = event.target;
    let pressedBtnContaner = pressedBtn.parentElement;
    let pressedBtnName = pressedBtnContaner.querySelector("h2").innerText;
    let pressedBtnLabel = pressedBtnContaner.querySelector(".container__article-label");
    let pressedBtnQtyStyler = pressedBtnContaner.querySelector("input");
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
        html+=`<p class="planP">${el.name} i ${el.minutes} minutter</p>`})
    
        myPlanInnerContainer.innerHTML = html;
    
    addMinutes()
}

//--------TOTAL MINUTES ADDED TO ACITIVITY PLAN-------------//
//Summarizes total minutes added to acitivityplan and fills inn minute counter on front page

let myMinutes = document.querySelector("#header__p");
let myInnerMinutes = document.querySelector("#myInnerMinutes");
function addMinutes() {
    let totalMinutes = 0;
    for(let i = 0; i < myPlan.length; i++){
        totalMinutes += myPlan[i].minutes;
    }

    myMinutes.innerText = totalMinutes + ` min.`
    myInnerMinutes.innerText = `Du har planlagt ${totalMinutes} minutter med aktivitet denne uka. Da mangler du bare ` + (150 - totalMinutes) + ` minutter før du har 150 totalt!`

    if(totalMinutes >= 150){
        myMinutes.classList.add("minutesAcheived")
        myPlanContainer.style.right = "0vw"
        myPlanContainer.style.transition = "1s"
        myInnerMinutes.innerText = `Supert! Nå har du planlagt minst 150 minutter med aktivitet denne uka. Det vil gi en rekke helsegevinster. Stå på!`
    }     
}

//-------------OPEN AND CLOSE "ACTIVITETSPLAN"----------------//

let closePlan = document.querySelector("#header__div-2-btn");
let planIsPressed = false;

function showPlan() {

    if(planIsPressed) {
        myPlanContainer.style.right = "-100vw"
        myMinutes.style.marginRight = "1em";
        myPlanContainer.style.transition = "1s"
    } else {
        myPlanContainer.style.right = "0vw"
        myPlanContainer.style.transition = "1s"
    }
    planIsPressed = !planIsPressed;
}
closePlan.addEventListener("click", showPlan);
planBtn.addEventListener("click", showPlan);
planBtn.addEventListener("keypress", function (e) {
    if(e.key === "Enter"){
        showPlan()
    }
});

//-------------FILTERING EXERCISE ARRAY--------------------//

let applySecondFilter = document.querySelector("#main-page__form-2-btn");
let filterContainer = document.querySelector("#filters");
let loadBar = document.querySelector("#loadBar");
let impact1 = document.querySelector("#Lav");
let impact2 = document.querySelector("#Medium");
let impact3 = document.querySelector("#Høy");
let effekt1 = document.querySelector("#Kondisjon");
let effekt2 = document.querySelector("#Styrke");
let effekt3 = document.querySelector("#Mobilitet");
let newExercises = ``;

impact1.addEventListener("click", filterExercises);
impact2.addEventListener("click", filterExercises);
impact3.addEventListener("click", filterExercises);

function filterExercises(event) {
    let myFilter = event.target.id;
    let findFilterValue = event.target.value;

    let filterFirst = exercises.filter((el) => {
        return el.impact.includes(myFilter)
    })

    if(impact1.checked == true || impact2.checked == true || impact3.checked == true){
        newExercises = filterFirst
    }    

    function filter2(event){
        let myFilter2 = event.target.id;
        let findSecondFilterValue = event.target.value;

        let filteredAgain = newExercises.filter((el)=> {
            return el.effect.includes(myFilter2)}
        )

        if(effekt1.checked == true || effekt2.checked == true || effekt3.checked == true){
            newExercises = filteredAgain;
        }
        
        loadBar.style.display = "block"
        loadBar.classList.add("showActivitiesAnimation");
        applySecondFilter.classList.add("showTextAnimation");
        applySecondFilter.style.display = "block";
        
        //SHOW USER CHOSEN FILTERS
        filterContainer.innerHTML = `<p>Foreslåtte aktiviteter som passer for følgende kriterier:</p><div>${findFilterValue}</div><div>${findSecondFilterValue}</div>`

    } 

    effekt1.addEventListener("click", filter2)
    effekt2.addEventListener("click", filter2)
    effekt3.addEventListener("click", filter2)
    
}

//------------------SHOW USER FILTERING OPTIONS ON FRONT PAGE-----------------//

let mainPage = document.querySelector("#main-page")
let filterByImpact = document.querySelector("#main-page__form");
let filterbyEffect = document.querySelector("#main-page__form-2");

function showFilterOptions(){
        textStartAnimation.style.display = "none";
        showAllExercises.style.display = "none";
        showFilterBtn.style.display = "none";
        filterByImpact.style.display = "block"
        filterByImpact.style.transition = "1s"
        filterbyEffect.style.display = "block";
        filterbyEffect.style.transition = "1s";
    }

showFilterBtn.addEventListener("click", showFilterOptions);
applySecondFilter.addEventListener("click", visFiltrerte)

//-----------------------SHOW USER PERSONALISED ARRAY--------------------//

function visFiltrerte() {
    filterContainer.style.display = "flex";
    mainPage.style.display = "none"
    container.innerHTML = showExercises(true);


    resetBtn.style.display = "inline-block";
    let addExpandBtns = document.querySelectorAll(".container__article-button2")
    for(let addExpandBtn of addExpandBtns){addExpandBtn.addEventListener("click", expandImage)}

    let addToPlanBtns = document.querySelectorAll(".container__article-button1");
    for(let addToPlanBtn of addToPlanBtns){addToPlanBtn.addEventListener("click", addToPlan)}   
}


//--------------RESTART FRONTPAGE AFTER FILTERING----------------//



function resetPage(){
    impact1.checked = false;
    impact2.checked = false;
    impact3.checked = false;
    effekt1.checked = false;
    effekt2.checked = false;
    effekt3.checked = false;
    filterContainer.style.display = "none";
    loadBar.style.display = "none";
    mainPage.style.display = "flex";
    showFilterBtn.style.display = "block"
    showAllExercises.style.display = "inline-block";
    applySecondFilter.style.display = "none";
    filterByImpact.style.display = "none"
    filterbyEffect.style.display = "none";
    textStartAnimation.style.display = "none";
    textStartAnimation.removeEventListener("click", startAnimation)
    textStartAnimation.addEventListener("click", resetFilter)
    filterContainer.innerHTML = ``;
}

let resetBtn = document.querySelector("#footer__button")
resetBtn.addEventListener("click", resetPage)
resetBtn.addEventListener("keypress", function (e) {
    if(e.key === "Enter"){
        resetPage()
    }   
})

function resetFilter() {
    newExercises = ``;
    showAllExercises.style.opacity = "100%";
    showAllExercises.style.display = "inline-block";
    showFilterBtn.style.display = "inline-block";
    showFilterBtn.style.opacity = "100%";
    
}
