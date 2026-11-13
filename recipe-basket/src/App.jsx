
import { useState } from "react";
import RecipeList from "./components/RecipeList.jsx";
import RecipeForm from "./components/RecipeForm.jsx";
import ArchiveList from "./components/ArchiveList.jsx";
import "./App.css";

function App() {
  // Active recipes
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      name: "Chicken Pasta",
      ingredients: [
        { id: 1, name: "Chicken", bought: false },
        { id: 2, name: "Pasta", bought: false },
        { id: 3, name: "Cream", bought: false },
      ],
    },
  ]);

  // Archived recipes
  const [archivedRecipes, setArchivedRecipes] = useState([]);

  // Controls which section is visible
  const [activeTab, setActiveTab] = useState("recipes");

  // Add a new recipe
  function addRecipe(name, ingredientNames) {
    const newRecipe = {
      id: crypto.randomUUID(),
      name: name,
      ingredients: ingredientNames.map((ingredient) => ({
        id: crypto.randomUUID(),
        name: ingredient,
        bought: false,
      })),
    };

    setRecipes((previousRecipes) => [
      ...previousRecipes,
      newRecipe,
    ]);
  }

  // Toggle an ingredient and archive completed recipes
  function toggleIngredient(recipeId, ingredientId) {
    const recipe = recipes.find((item) => item.id === recipeId);

    if (!recipe) return;

    const updatedIngredients = recipe.ingredients.map(
      (ingredient) =>
        ingredient.id === ingredientId
          ? { ...ingredient, bought: !ingredient.bought }
          : ingredient
    );

    const updatedRecipe = {
      ...recipe,
      ingredients: updatedIngredients,
    };

    const allPurchased =
      updatedIngredients.length > 0 &&
      updatedIngredients.every((ingredient) => ingredient.bought);

    if (allPurchased) {
      // Remove from active recipes
      setRecipes((previousRecipes) =>
        previousRecipes.filter((item) => item.id !== recipeId)
      );

      // Add to archive with timestamp
      setArchivedRecipes((previousArchived) => [
        ...previousArchived,
        {
          ...updatedRecipe,
          archivedAt: new Date().toISOString(),
        },
      ]);
    } else {
      // Update the recipe without archiving
      setRecipes((previousRecipes) =>
        previousRecipes.map((item) =>
          item.id === recipeId ? updatedRecipe : item
        )
      );
    }
  }

  // Restore a recipe from the archive
  function restoreRecipe(recipeId) {
    const recipe = archivedRecipes.find(
      (item) => item.id === recipeId
    );

    if (!recipe) return;

    const restoredRecipe = {
      ...recipe,
      archivedAt: null,
      ingredients: recipe.ingredients.map((ingredient) => ({
        ...ingredient,
        bought: false,
      })),
    };

    setArchivedRecipes((previousArchived) =>
      previousArchived.filter((item) => item.id !== recipeId)
    );

    setRecipes((previousRecipes) => [
      ...previousRecipes,
      restoredRecipe,
    ]);
  }

  return (
    <div className="app">
      <h1>Recipe Basket</h1>
      <p>Manage your recipes and shopping ingredients</p>

      <div className="tabs">
        <button
          type="button"
          className={activeTab === "recipes" ? "active" : ""}
          onClick={() => setActiveTab("recipes")}
        >
          Active Recipes ({recipes.length})
        </button>

        <button
          type="button"
          className={activeTab === "archive" ? "active" : ""}
          onClick={() => setActiveTab("archive")}
        >
          Archive ({archivedRecipes.length})
        </button>
      </div>

      {activeTab === "recipes" ? (
        <>
          <RecipeForm onAddRecipe={addRecipe} />

          <RecipeList
            recipes={recipes}
            onToggleIngredient={toggleIngredient}
          />
        </>
      ) : (
        <ArchiveList
          archivedRecipes={archivedRecipes}
          onRestore={restoreRecipe}
        />
      )}
    </div>
  );
}

export default App;
