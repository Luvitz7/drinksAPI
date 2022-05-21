function search () {
    const drinkSearch = document.getElementById("searchByName").value;
    const drinkAPI = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkSearch}`;
    console.log(drinkSearch);
    fetch(drinkAPI) 
    .then(res => res.json())
    .then(data => {
        const results  = data.drinks.length;
        const listaResultados = document.getElementById("resultsList");
        listaResultados.textContent = ("Especifica la bebida")
            for (let i=0; i < results; i++) {
                const value = data.drinks[i].idDrink;
                const itemList = document.createElement('LI');
                itemList.setAttribute("onClick", "secondSearch()");
                itemList.setAttribute("value", `${value}`);
                itemList.setAttribute("class", "list");
                itemList.textContent = data.drinks[i].strDrink;
                listaResultados.appendChild(itemList);
            }
    });
}

function secondSearch() {
    /* Event Listener para obtener el valor del LI creado con la primer consulta */
    document.querySelectorAll(".list").forEach(el => {
        el.addEventListener("click", e => {
            const value = e.target.getAttribute("value");
            const secondDrink = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${value}`;
            fetch(secondDrink) 
            .then(res => res.json())
            .then(data => {
                /*              Un objeto tiene clave y valor, for realizado para consultarlo
                   for (let i = 0; i <= 11; i++) {
                    ingredients[i] = data.drinks[0][`strIngredient${i+1}`];
                } */

                /* Contruccion para crear el array de ingredientes y medidas */
                let ingredients = [];
                let index = 0;
                let index2 = 0;
                let value = data.drinks[0][`strIngredient1`];
                let value2 = data.drinks[0][`strMeasure1`];
                while (Boolean (value)) {
                    ingredients[index] = value;
                    value = data.drinks[0][`strIngredient${(++index)+1}`];
                }
                let measures = [];
                while (Boolean (value2)) {
                    measures[index2] = value2;
                    value2 = data.drinks[0][`strMeasure${(++index2)+1}`];
                }
/*                 for (let i = 0; i <= 11; i++) {
                    measures[i] = data.drinks[0][`strMeasure${i+1}`];
                } */
  /*              Investigar sobre filter
                 measures = measures.filter(Boolean); */

   /*               Construccion del Objeto Drink en los objetos si se le pasa una variable
                la clave toma el nombre de la variable y el valor el contenido de la misma
                  const drink = {
                    name: data.drinks[0].strDrink,
                    type: data.drinks[0].strAlcoholic,
                    ingredient: data.drinks[0].strIngredient1,
                    measure: data.drinks[0].strMeasure1,
                    instruccions: data.drinks[0].strInstructions,
                    pic: data.drinks[0].strDrinkThumb,
                    glass: data.drinks[0].strGlass
                } */
                const drink = {
                    name: data.drinks[0].strDrink,
                    type: data.drinks[0].strAlcoholic,
                     ingredients,
                     measures,
                    instruccions: data.drinks[0].strInstructions,
                    pic: data.drinks[0].strDrinkThumb,
                    glass: data.drinks[0].strGlass
                }
                /* Maniplacion DOM -*/
                document.getElementById("drinkTitle").textContent = drink.name;
                document.getElementById("drinkIMG").src = drink.pic;
                document.getElementById("drinkIMG").style.visibility = "visible";
                document.getElementById("cookContainer").style.visibility = "visible";
                document.getElementById("drinkType").textContent = drink.type;
                const ingredientList = document.getElementById("ingredientsList");
                ingredientList.textContent = "Ingredients";
                const ingredientCount = drink.ingredients.length;
                for (let i=0; i < ingredientCount; i++) {
                    const element = document.createElement("LI");
                    element.textContent = drink.ingredients[i]+" ";
                    const elementM = document.createElement("SPAN");
                    element.appendChild(elementM);
                    elementM.textContent = drink.measures[i];
                    ingredientList.appendChild(element);
                }
                document.getElementById("titleCook").textContent = "Instruccions";
                document.getElementById("cook").textContent = drink.instruccions;
                document.getElementById("glass").textContent = "Be served in "+drink.glass+", and enjoy it";
            });    
        });
    });
}

function searchByIngredient () {
    const ingredientGET = document.getElementById("searchByIngredient").value;
    const ingredientSearch = `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingredientGET}`;
    fetch(ingredientSearch) 
    .then(res => res.json())
    .then(data => {
        const ingredient = {
            name: data.ingredients[0].strIngredient,
            description: data.ingredients[0].strDescription,
            type: data.ingredients[0].strType,
            alcohol: data.ingredients[0].strAlcohol,
            percentage: data.ingredients[0].strABV
        }
        document.getElementById("drinkTitle").innerText = ingredient.name;
        document.getElementById("typeIngredient").textContent = "Type: "+ingredient.type;
        if ( Boolean(ingredient.alcohol)) {
            document.getElementById("alcohol").textContent = "Alcoholic: "+ ingredient.alcohol;
            document.getElementById("percentage").textContent = "% "+ ingredient.percentage;
        } else {
            document.getElementById("alcohol").textContent = "Alcoholic: No";
            document.getElementById("percentage").textContent = "% 0";
        }
        if ( Boolean(ingredient.description)) {
            document.getElementById("description").textContent = "Descprition: "+ ingredient.description;
        } else {
            document.getElementById("description").textContent = "No contamos con información, disculpa";
        }
    });
}

/* Thaht function no works by CORS policy, i will be try fix it early

function randomSearch() {
    const randomDrink = `http://www.thecocktaildb.com/api/json/v1/1/random.php`;
    console.log(randomDrink);
    fetch(randomDrink) 
    .then(res => res.json())
    .then(data => {
        let ingredients = [];
        let index = 0;
        let index2 = 0;
        let value = data.drinks[0][`strIngredient1`];
        let value2 = data.drinks[0][`strMeasure1`];
        while (Boolean (value)) {
            ingredients[index] = value;
            value = data.drinks[0][`strIngredient${(++index)+1}`];
        }
        let measures = [];
        while (Boolean (value2)) {
            measures[index2] = value2;
            value2 = data.drinks[0][`strMeasure${(++index2)+1}`];
        }
        const drink = {
            name: data.drinks[0].strDrink,
            type: data.drinks[0].strAlcoholic,
             ingredients,
             measures,
            instruccions: data.drinks[0].strInstructions,
            pic: data.drinks[0].strDrinkThumb,
            glass: data.drinks[0].strGlass
        }
        document.getElementById("drinkTitle").textContent = drink.name;
        document.getElementById("drinkIMG").src = drink.pic;
        document.getElementById("drinkType").textContent = drink.type;
        const ingredientList = document.getElementById("ingredientsList");
        const ingredientCount = drink.ingredients.length;
        for (let i=0; i < ingredientCount; i++) {
            const element = document.createElement("LI");
            element.textContent = drink.ingredients[i]+" ";
            const elementM = document.createElement("SPAN");
            element.appendChild(elementM);
            elementM.textContent = drink.measures[i];
            ingredientList.appendChild(element);
        }
        document.getElementById("titleCook").textContent = "Instruccions";
        document.getElementById("cook").textContent = drink.instruccions;
        document.getElementById("glass").textContent = "Be served in "+drink.glass+", and enjoy it";
    });
}

*/