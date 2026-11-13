
import IngredientItem from "./IngredientItem.jsx";

function RecipeCard({ recipe, onToggleIngredient }) {
  const purchasedCount = recipe.ingredients.filter(
    (ingredient) => ingredient.bought
  ).length;

  return (
    <div className="recipe-card">
      <h2>{recipe.name}</h2>

      <p>
        Purchased: {purchasedCount} / {recipe.ingredients.length}
      </p>

      <h3>Ingredients:</h3>

      <ul>
        {recipe.ingredients.map((ingredient) => (
          <IngredientItem
            key={ingredient.id}
            ingredient={ingredient}
            onToggle={(ingredientId) =>
              onToggleIngredient(recipe.id, ingredientId)
            }
          />
        ))}
      </ul>
    </div>
  );
}

export default RecipeCard;
