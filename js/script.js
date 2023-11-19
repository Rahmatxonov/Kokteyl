const btn = document.getElementById("navbar__img__addBurger");
const menu = document.querySelector(".navbar__menu");
const remove__btn = document.getElementById("removeburger");
const regularCard = document.querySelector(".regular__card");
const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a";
const sortButton = document.getElementById("sortButton");

async function getData() {
  try {
    const response = await fetch(url);
    let result = await response.json();

    if (sortButton.classList.contains("sorted")) {
      result.drinks.sort((a, b) => {
        const idA = parseInt(a.idDrink);
        const idB = parseInt(b.idDrink);
        return idB - idA;
      });
      sortButton.classList.remove("sorted");
    } else {
      result.drinks.sort((a, b) => {
        const idA = parseInt(a.idDrink);
        const idB = parseInt(b.idDrink);
        return idA - idB;
      });
      sortButton.classList.add("sorted");
    }

    regularCard.innerHTML = "";
    result.drinks.forEach((element) => {
      const { idDrink, strDrinkThumb, strInstructionsIT } = element;
      const fragment = new DocumentFragment();
      const card = document.createElement("div");
      card.classList.add("card");
      const image = document.createElement("img");
      const title = document.createElement("h2");
      const id = document.createElement("h3");

      image.src = strDrinkThumb;
      image.classList.add("FoodImage");
      fragment.appendChild(image);

      id.textContent = idDrink;
      id.classList.add("FoodId");
      fragment.appendChild(id);

      title.textContent = truncateText(strInstructionsIT, 100);
      title.classList.add("FoodTitle");
      fragment.appendChild(title);

      const readMoreButton = document.createElement("button");
      readMoreButton.classList.add("readMore");
      readMoreButton.textContent = "Read More...";
      readMoreButton.addEventListener("click", () => {
        toggleText(title, strInstructionsIT);
      });

      fragment.appendChild(readMoreButton);
      card.appendChild(fragment);
      regularCard.appendChild(card);
    });
  } catch (error) {
    console.error(error);
  }
}

function truncateText(text, maxLength) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

function toggleText(element, fullText) {
  if (element.dataset.fullText) {
    element.textContent = truncateText(fullText, 100);
    element.dataset.fullText = "";
  } else {
    element.textContent = fullText;
    element.dataset.fullText = fullText;
  }
}

getData();

btn.addEventListener("click", () => {
  menu.classList.toggle("show");
  remove__btn.style.display = "block";
  btn.style.display = "none";
});

remove__btn.addEventListener("click", () => {
  menu.classList.remove("show");
  remove__btn.style.display = "none";
  btn.style.display = "block";
});

sortButton.addEventListener("click", getData);
