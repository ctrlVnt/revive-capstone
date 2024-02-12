import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function Recipes() {
  const [recipeList, setRecipeList] = useState([])
  const [search, setSearch] = useState("")

  const searchResults = recipeList.filter((recipe) => recipe.name.toLowerCase().includes(search.toLowerCase()))
  console.log(searchResults)


  useEffect(() => {

    const fetchAllRecipes = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/recipes");
        const result = await response.json();
        console.log(result)
        setRecipeList(result);
      } catch (error) {
        console.error(error)
      }
    }
    fetchAllRecipes()
  }, [])

  return (
    <>
      <div id='spotlight' className='border border-5 border-black p-5 m-5'>
        <h1 className='m-4'>Chef Spotlight</h1>
        <a href='www.tiktok.com' className='border border-3 border-black p-2 m-3'>tiktok</a>
        <a href='www.tiktok.com' className='border border-3 border-black p-2 m-3'>tiktok</a>
        <a href='www.tiktok.com' className='border border-3 border-black p-2 m-3'>tiktok</a>
      </div>
      <div>
        <div id="searchbarContainer">
          <input id="searchbar" placeholder="Search Recipes" type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className='row row-cols-1 row-cols-md-2 row-cols-lg-4 justify-content-center'>


          {searchResults.map((recipe) => {
            return (
              <>

                <div id='recipeCard' className='border border-5 border-black p-3 m-5'>

                  <img src={recipe.imgurl} alt={recipe.name} className='w-75' />
                  <h3>{recipe.name}</h3>
                  {/* <p>Difficulty: {recipe.difficulty}</p> */}
                  {/* <p>Serves {recipe.recipe_yield}</p> */}
                  {/* <p>{recipe.description}</p> */}

                  <div className='p-3 m-3'>

                    <Link to={`/recipes/${recipe.recipe_id}`}>
                      <button>
                        See Details
                      </button>
                    </Link>
                  </div>

                </div>





              </>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Recipes