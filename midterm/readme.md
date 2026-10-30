# CSC336 Lab Mid Term - Upgrade Your E-commerce Listing and Product Pages

- **Name:** Ahad
- **Roll no:** FA24-BCS-007
- **N** = 7 (last two digits of the roll number)
- **BP** = 600 + 7 = **607px**
- **H** = (7 x 7) mod 360 = **49** (accent colour = hsl(49, 70%, 45%))
- **K** = (7 mod 3) + 3 = **4** categories (so 5 radio buttons: All + 4)
- Sticky offset = (7 mod 40) + 70 = **77px**
- Premium limit = N x 100 = **Rs 700**

Starting point: copy of `assignment-2/` (Dawlance reference site, Bootstrap 5), committed as "midterm: baseline copy".

## Files I changed
- `index.html` (Task 1 and Task 3)
- `product.html` (Task 2)
- `Style.css` (Task 1 and Task 2)
- `script.js` (new file, Task 3)

## Task 1 - CSS-only category filter
- In `index.html` I gave every product card (the `.col` wrapper) a `data-category` (4 categories: ac, fridge, washer, other) and added 5 radio buttons ("All" is `checked`) with labels above the grid.
- In `Style.css` the rule `#cat-ac:checked ~ .product-grid .col:not([data-category="ac"])` (and the same for the other 3) sets `display: none`, so non-matching cards disappear completely and leave no gaps.
- The checked label gets the accent colour `hsl(49, 70%, 45%)` with `.btn-check:checked + .filter-label`. No JavaScript is used for this task.

## Task 2 - Product page layout with a sticky details box
- In `product.html` I put the image, details box (name, price, quantity, Add to Cart) and the description inside one `.product-layout` div and wrote a longer description.
- In `Style.css` `.product-layout` is a CSS Grid with `grid-template-areas`: one column (image, details, description) below 607px, and from `min-width: 607px` two columns ("image details" / "description description").
- From 607px the details box has `position: sticky; top: 77px; align-self: start`, so it stays 77px from the top while the page scrolls past the image.

## Task 3 - JavaScript: live search and price sort
- New file `script.js`, linked at the end of `index.html`. It works with the cards already in the page and does not rebuild them.
- The search box filters cards by name (not case-sensitive) together with the selected category; "No products found" replaces the grid when nothing matches.
- The "Sort by price" button reads each price from the card and moves the existing cards with `appendChild` (low to high on the first click, then high to low, and so on).
- On page load, every card with a price above N x 100 = 700 gets a "Premium" label added by the script.

## AI tools used
- Claude (Anthropic)
