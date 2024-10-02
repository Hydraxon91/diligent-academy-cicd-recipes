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

export function setupApp(root) {  
  function handleShow(event) {
    const list = event.target.parentNode.querySelector('#recipeList');

    list.innerHTML = '';

    const recipes = getRecipes();
    
    if (recipes && recipes.length > 0) {
      recipes.forEach(recipe => {
        // Create a card for each recipe
        const card = `
          <div class="card" style="width: 18rem; margin: 10px;">
            <div class="card-body">
              <h5 class="card-title">${recipe.name}</h5>
            </div>
          </div>
        `;
        list.innerHTML += card; // Append the card to the recipe list
      });
    } else {
      list.innerHTML = '<p>No recipes available.</p>'; // Handle case with no recipes
    }

  }

  root.appendChild(createContainer({ onShow: handleShow }))
  return root;
}
