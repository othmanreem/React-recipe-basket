
import RecipeCard from "./RecipeCard.jsx";

function RecipeList({ recipes, onToggleIngredient }) {
  return (
    <div className="recipe-list">
      <h2>My Recipes</h2>

      {recipes.length === 0 ? (
        <p>No recipes added yet.</p>
      ) : (
        recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onToggleIngredient={onToggleIngredient}
          />
        ))
      )}
    </div>
  );
}

export default RecipeList;
