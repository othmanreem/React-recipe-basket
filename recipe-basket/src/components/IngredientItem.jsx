
function IngredientItem({ ingredient, onToggle }) {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={ingredient.bought}
          onChange={() => onToggle(ingredient.id)}
        />

        <span
          style={{
            textDecoration: ingredient.bought
              ? "line-through"
              : "none",
          }}
        >
          {ingredient.name}
        </span>
      </label>
    </li>
  );
}

export default IngredientItem;
