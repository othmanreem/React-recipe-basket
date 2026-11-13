
import { useState } from "react";

function RecipeForm({ onAddRecipe }) {
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const ingredientList = ingredients
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    if (!recipeName.trim() || ingredientList.length === 0) {
      return;
    }

    onAddRecipe(recipeName.trim(), ingredientList);

    setRecipeName("");
    setIngredients("");
  }

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <h2>Add a New Recipe</h2>

      <label htmlFor="recipe-name">Recipe name</label>
      <input
        id="recipe-name"
        type="text"
        value={recipeName}
        onChange={(event) => setRecipeName(event.target.value)}
        placeholder="Enter recipe name"
        required
      />

      <label htmlFor="ingredients">Ingredients</label>
      <textarea
        id="ingredients"
        value={ingredients}
        onChange={(event) => setIngredients(event.target.value)}
        placeholder={"Chicken\nRice\nOlive oil"}
        rows="5"
        required
      />

      <button type="submit">Add Recipe</button>
    </form>
  );
}

export default RecipeForm;
