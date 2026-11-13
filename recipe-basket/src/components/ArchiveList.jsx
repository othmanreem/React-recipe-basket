
function ArchiveList({ archivedRecipes, onRestore }) {
    return (
      <div className="archive-list">
        <h2>Archived Recipes</h2>
  
        {archivedRecipes.length === 0 ? (
          <p>No archived recipes yet.</p>
        ) : (
          archivedRecipes.map((recipe) => (
            <div className="recipe-card" key={recipe.id}>
              <h3>{recipe.name}</h3>
  
              <p>
                Archived on:{" "}
                {new Date(recipe.archivedAt).toLocaleDateString()}
              </p>
  
              <p>
                {recipe.ingredients.length} ingredients purchased
              </p>
  
              <button
                type="button"
                onClick={() => onRestore(recipe.id)}
              >
                Restore Recipe
              </button>
            </div>
          ))
        )}
      </div>
    );
  }
  
  export default ArchiveList;
  