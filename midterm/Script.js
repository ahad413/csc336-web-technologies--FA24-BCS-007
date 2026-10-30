// ===== TASK 3: live search, price sort and Premium labels =====
// My roll number is FA24-BCS-007, so N = 7.
// Products costing more than N x 100 = 700 get a "Premium" label.
const N = 7;
const premiumLimit = N * 100;

// Find the elements on the page that the script needs
const grid = document.querySelector(".product-grid"); // the grid that holds the cards
const cards = grid.querySelectorAll(".col"); // every product card (column)
const searchBox = document.getElementById("search-box"); // the search text box
const sortButton = document.getElementById("sort-button"); // the "Sort by price" button
const noProductsMessage = document.getElementById("no-products"); // the "No products found" message
const categoryRadios = document.querySelectorAll('input[name="category"]'); // the 5 filter radio buttons

// Read the price from the card itself, for example "Rs 78,999" becomes the number 78999
function getPrice(card) {
  const priceText = card.querySelector(".price").textContent;
  return Number(priceText.replace(/[^0-9]/g, "")); // remove everything that is not a digit
}

// Read the product name from the card, in lower case
function getName(card) {
  return card.querySelector(".card-title").textContent.toLowerCase();
}

// Show only the cards that match BOTH the search text and the selected category
function showMatchingCards() {
  const searchText = searchBox.value.toLowerCase().trim();
  const category = document.querySelector(
    'input[name="category"]:checked',
  ).value;
  let visibleCount = 0;

  cards.forEach(function (card) {
    const nameMatches = getName(card).includes(searchText);
    const categoryMatches =
      category === "all" || card.dataset.category === category;

    if (nameMatches && categoryMatches) {
      card.style.display = ""; // empty value: the CSS decides (card is shown)
      visibleCount++;
    } else {
      card.style.display = "none"; // hide the card
    }
  });

  // If no card matches, hide the grid and show the message instead
  if (visibleCount === 0) {
    grid.classList.add("d-none");
    noProductsMessage.classList.remove("d-none");
  } else {
    grid.classList.remove("d-none");
    noProductsMessage.classList.add("d-none");
  }
}

// Run the filter every time the user types, and every time a category is chosen
searchBox.addEventListener("input", showMatchingCards);
categoryRadios.forEach(function (radio) {
  radio.addEventListener("change", showMatchingCards);
});

// Sort by price: first click low to high, next click high to low, and so on
let lowToHigh = true;

sortButton.addEventListener("click", function () {
  // Put the existing cards in an array and sort it by price
  const sortedCards = Array.from(cards).sort(function (a, b) {
    if (lowToHigh) {
      return getPrice(a) - getPrice(b);
    } else {
      return getPrice(b) - getPrice(a);
    }
  });

  // appendChild moves each existing card to the end of the grid, so the grid ends up in the sorted order
  sortedCards.forEach(function (card) {
    grid.appendChild(card);
  });

  // Show the current order on the button, then switch the direction for the next click
  if (lowToHigh) {
    sortButton.textContent = "Sort by price (low to high)";
  } else {
    sortButton.textContent = "Sort by price (high to low)";
  }
  lowToHigh = !lowToHigh;
});

// When the page loads: add a "Premium" label to every card that costs more than the limit
cards.forEach(function (card) {
  if (getPrice(card) > premiumLimit) {
    const label = document.createElement("span");
    label.className = "badge bg-dark mb-2 align-self-start";
    label.textContent = "Premium";
    card.querySelector(".card-body").prepend(label); // put the label at the top of the card text
  }
});

// Make sure the cards match the search box and radio buttons when the page first loads
showMatchingCards();
