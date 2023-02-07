let rowData = document.getElementById("rowData")
let searchContainer = document.getElementById('searchContainer');
let submitBtn ;

$(document).ready(()=> {
    searchMealsByName('').then(()=>{
        $(".loading").fadeOut(500)
        $("body").css("overflow","visible");

    })

})

function openSlideNav() {
    $(".side-nav-menu ").animate({left:0},500)
    $(".open-clase-icon").removeClass("fa-align-justify")
    $(".open-clase-icon").addClass("fa-x");
    for (let i = 0 ; i< 5; i++) {
        $(".links li").eq(i).animate({top:0},(i+5)*100);

    }
}

function claseSlideNav () {
    let boxWidth = $(".side-nav-menu .nav-tab").outerWidth();
    $(".side-nav-menu ").animate({left:-boxWidth},500)
    $(".open-clase-icon").addClass("fa-align-justify")
    $(".open-clase-icon").removeClass("fa-x")
    $(".links li").animate({top:300},500);
}
claseSlideNav ()

$(".side-nav-menu i.open-clase-icon").click(() =>{
    if($(".side-nav-menu").css("left") == "0px") {
        claseSlideNav ();
    }
    else {
        openSlideNav();
    }
});





function displayMeals(arr) {
    let cartoona ="";
    for (let i =0; i<arr.length; i++ ) {
        cartoona += `
        <div class="col-md-3">
        <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="${arr[i].strMealThumb}" alt="">
        <div class="meal-layer p-2 position-absolute d-flex align-items-center text-black">
            <h3>${arr[i].strMeal}</h3>
        </div>
        </div>
    </div>
        `
    }
    rowData.innerHTML = cartoona;
}

async function getCategories() {
    rowData.innerHTML ="";
    $(".inner-loading").fadeIn(300)
    searchContainer.innerHTML="";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    response = await response.json()
    // console.log(response.categories);
    displayCategories(response.categories);
    $(".inner-loading").fadeOut(300)

}

function displayCategories(arr) {
    let cartoona ="";
    for (let i =0; i<arr.length; i++ ) {
        cartoona += `
        <div class="col-md-3">
        <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="${arr[i].strCategoryThumb}" alt="">
        <div class="meal-layer p-2 position-absolute text-center text-black">
            <h3>${arr[i].strCategory}</h3>
            <p>${arr[i].strCategoryDescription.split(" ").slice(0,25).join(" ")}</p>
        </div>
        </div>
    </div>
        `
    }
    rowData.innerHTML = cartoona;
}

async function getArea() {
    rowData.innerHTML ="";

    $(".inner-loading").fadeIn(300)

    searchContainer.innerHTML="";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    response = await response.json();
    // console.log(response.meals);

    displayArea(response.meals);
    $(".inner-loading").fadeOut(300)

}

function displayArea(arr) {
    let cartoona ="";
    for (let i =0; i<arr.length; i++ ) {
        cartoona += `
        <div class="col-md-3">
         <div onclick="getAreaMeals('${arr[i].strArea}')" class=" text-center rounded-2 cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-3x"></i>
            <h3>${arr[i].strArea}</h3>
         </div>
        </div>
        `
    }
    rowData.innerHTML = cartoona;
}

async function getIngredients() {
    rowData.innerHTML ="";

    $(".inner-loading").fadeIn(300)

    searchContainer.innerHTML="";

let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
response = await response.json();
displayIngredient(response.meals.slice(0,20))
$(".inner-loading").fadeOut(300)


}

function displayIngredient(arr) {

    let cartoona ="";
    for (let i =0; i<arr.length; i++ ) {
        cartoona += `
        <div class="col-md-3">
        <div onclick="getIngredientMeals('${arr[i].strIngredient}')" class=" text-center  rounded-2 cursor-pointer">
        <i class="fa-solid fa-clover greran fa-4x "></i>
            <h3>${arr[i].strIngredient}</h3>
            <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
        </div>
        </div>
    </div>
        `
    }
    rowData.innerHTML = cartoona;
}

async function getCategoryMeals(category) {
    rowData.innerHTML ="";

    $(".inner-loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json();
    // console.log(response);
    displayMeals(response.meals.slice(0,20));
    $(".inner-loading").fadeOut(300)

    
}

async function getAreaMeals(area) {
    rowData.innerHTML ="";

    $(".inner-loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json();
    // console.log(response);
    displayMeals(response.meals.slice(0,20));
    $(".inner-loading").fadeOut(300)

}

async function getIngredientMeals(ingredient) {
    rowData.innerHTML ="";

    $(".inner-loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    response = await response.json();
    displayMeals(response.meals.slice(0,20));
    $(".inner-loading").fadeOut(300)

}

async function getMealDetails(mealID) {
    claseSlideNav ()
    $(".inner-loading").fadeIn(300)
    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayMealDetails(respone.meals[0])
    $(".inner-loading").fadeOut(300)


}


function displayMealDetails(meal) {
    
    searchContainer.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    // let tags = meal.strTags.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let cartoona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    rowData.innerHTML = cartoona
}

function searchInputs() {
    searchContainer.innerHTML= ` <div class="row py-4 text-white">
    <div class="col-md-6">
        <input onkeyup="searchMealsByName(this.value)" class="text-white form-control bg-transparent" type="text" placeholder="Search By Name">
    </div>

    <div class="col-md-6">
        <input onkeyup="searchByFirstLitter(this.value)" maxlength="1" class="text-white form-control bg-transparent" type="text" placeholder="Search By First Litter">
    </div>
</div>`

rowData.innerHTML = ""
}


async function searchMealsByName(term) {
    $(".inner-loading").fadeIn(500)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    response = await response.json()
    // console.log(response.meals);
   
    response.meals ?  displayMeals(response.meals) : displayMeals([])
    $(".inner-loading").fadeOut(500)

}

async function searchByFirstLitter(term) {
    $(".inner-loading").fadeIn(500)

    term == ""  ? term =  "a": "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
    response = await response.json()
    // console.log(response.meals);
   
    response.meals ?  displayMeals(response.meals) : displayMeals([]);
    $(".inner-loading").fadeOut(500)

}


function showContacts() {
    rowData.innerHTML =  `<div class="contact min-vh-100 d-flex justify-content-between align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="text-white form-control bg-transparent" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                Special characters and numbers not allowed
                </div>
            </div>

            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()"  type="email" class="text-white form-control bg-transparent" placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
                </div>

            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="phone" class=" text-white form-control bg-transparent" placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
                </div>

            <div class="col-md-6">
                <input id="ageINput" onkeyup="inputsValidation()" type="number" class="text-white form-control bg-transparent" placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div> 
                </div>
            
            <div class="col-md-6">
                <input id="passwordInput" onkeyup="inputsValidation()" type="password" class="text-white form-control bg-transparent" placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid password *Minimum eight characters, at least one letter and one number:*
            </div>
                </div>

            <div class="col-md-6">
                <input id="rePasswoedInput" onkeyup="inputsValidation()" type="password" class="text-white form-control bg-transparent" placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid repassword 
            </div>
                </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
 </div> `;
 submitBtn = document.getElementById("submitBtn");

 document.getElementById("nameInput").addEventListener("focus", ()=> {
    nameInputFocus = true
})

document.getElementById("emailInput").addEventListener("focus", ()=> {
    emailInputFocus = true
})
document.getElementById("phoneInput").addEventListener("focus", ()=> {
    phoneInputFocus = true
})
document.getElementById("ageINput").addEventListener("focus", ()=> {
    ageInputFocus = true
})
document.getElementById("passwordInput").addEventListener("focus", ()=> {
    passwordInputFocus = true
})
document.getElementById("rePasswoedInput").addEventListener("focus", ()=> {
    rePasswordInputFocus = true
})
}

let nameInputFocus = false;
let emailInputFocus = false;
let phoneInputFocus = false;
let ageInputFocus = false;
let passwordInputFocus = false;
let rePasswordInputFocus = false;





function inputsValidation() {
    if(nameInputFocus) {

    
    if(nameValidation()){
        document.getElementById("nameAlert").classList.replace("d-block","d-none")
    }

    else{
        document.getElementById("nameAlert").classList.replace("d-none","d-block")

    }
}
    if(emailInputFocus) {

    
    
    if(emailValidation()){
        document.getElementById("emailAlert").classList.replace("d-block","d-none")
    }
    else{
        document.getElementById("emailAlert").classList.replace("d-none","d-block")

    }
}
    if (phoneInputFocus){

    if(phoneValidation()){
        document.getElementById("phoneAlert").classList.replace("d-block","d-none")
    }
    else{
        document.getElementById("phoneAlert").classList.replace("d-none","d-block")

    }
}
    if(ageInputFocus) {

    if(ageValidation()){
        document.getElementById("ageAlert").classList.replace("d-block","d-none")
    }
    else{
        document.getElementById("ageAlert").classList.replace("d-none","d-block")

    }
}
    if (passwordInputFocus) {

   
    if(passwordValidation()){
        document.getElementById("passwordAlert").classList.replace("d-block","d-none")
    }
    else{
        document.getElementById("passwordAlert").classList.replace("d-none","d-block")

    }
}
    if(rePasswordInputFocus) {

    if(rePasswordValidation()){
        document.getElementById("repasswordAlert").classList.replace("d-block","d-none")
    }
    else{
        document.getElementById("repasswordAlert").classList.replace("d-none","d-block")

    }
}

    if (
        nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        rePasswordValidation() ) {
            submitBtn.removeAttribute("disabled")
        }
        else {
            submitBtn.setAttribute("disabled",true)

        }
}



function nameValidation() {
    return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value)
}

function emailValidation() {

    return  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value)

}

function phoneValidation() {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value);
}

function ageValidation() {
    return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageINput").value);
}  

function passwordValidation() {
    return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value);
}

function rePasswordValidation() {
    return document.getElementById("rePasswoedInput").value == document.getElementById("passwordInput").value
}



