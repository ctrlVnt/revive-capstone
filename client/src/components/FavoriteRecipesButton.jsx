

export default function FavoriteRecipesButton({ user_id, recipe_id, setFavoriteRecipes }) {

  async function handleClick() {
    try {
      const response = await fetch('https://revive-capstone.onrender.com/api/favoriteRecipes', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({user_id, recipe_id}),
      });
      const result = await response.json();
      setFavoriteRecipes(result);
      

    } catch (error) {
    };
};

return (
  <div className="favoriteButton">
    <button onClick={() => {
    handleClick();
    alert("This recipe has been added to your favorites.")
    }}>Add to Favorites</button>
  </div>
);
};