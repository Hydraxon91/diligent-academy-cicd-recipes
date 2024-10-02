import { getRecipes } from "./recipes.js";


function element(tag, attributes = {}, children = []) {
  const element = document.createElement(tag);

  Object.entries(attributes).forEach(([key, value]) => {
    if (key.startsWith('on')) {
      const eventName = key.toLowerCase().substring(2)
      element.addEventListener(eventName, value);
    } else {
      element.setAttribute(key, value);
    }
  })

  children.forEach((child) => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child))
    } else {
      element.appendChild(child);
    }
  })
  return element;
}

function createContainer({ onShow }) {
  const container = element('div', { class: 'container' }, [
    element('h1', {}, ['My Recipes']),
    element('button', { class: 'btn btn-primary', onClick: onShow }, ['Show Recipes']),
    element('div', { id: 'recipeList' }),
  ])
  return container;
}

function renderRecipeCards(recipes, list) {
  if (recipes && recipes.length > 0) {
    const row = document.createElement('div');
    row.classList.add('row', 'g-3');

    recipes.forEach(recipe => {
      const card = `
        <div class="col-md-4">
          <div class="card h-100" style="margin: 10px;">
            <div class="card-body">
              <h5 class="card-title">${recipe.name}</h5>
              <h6>Ingredients:</h6>
              <ul>
                ${recipe.ingredients.map(ingredient => `<li>${ingredient.quantity} ${ingredient.item}</li>`).join('')}
              </ul>
              <h6>Instructions:</h6>
              <ol>
                ${recipe.instructions.map(step => `<li>${step}</li>`).join('')}
              </ol>
              <p><strong>Servings:</strong> ${recipe.servings}</p>
              <p><strong>Preparation Time:</strong> ${recipe.preparation_time}</p>
            </div>
          </div>
        </div>
      `;
      row.innerHTML += card;
    });

    list.appendChild(row);
  } else {
    list.innerHTML = '<p>No recipes available.</p>';
  }
}


export function setupApp(root) {  
  function handleShow(event) {
    const list = event.target.parentNode.querySelector('#recipeList');

    list.innerHTML = '';

    const recipes = getRecipes();
    renderRecipeCards(recipes, list);

  }

  root.appendChild(createContainer({ onShow: handleShow }))
  return root;
}
