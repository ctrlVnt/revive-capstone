import { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import Account from './components/Account'
import Calendars from './components/Calendars'
import Exercises from './components/Exercises'
import FavoriteExercises from './components/FavoriteExercises'
import FavoriteRecipes from './components/FavoriteRecipes'
import Login from './components/Login'
import Navigations from './components/Navigations'
import Recipes from './components/Recipes'
import Register from './components/Register'
import SelfCare from './components/SelfCare'
import SingleExercise from './components/SingleExercise'
import SingleRecipe from './components/SingleRecipe'
import SingleSelfCare from './components/SingleSelfCare'
import './App.css'

function App() {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState({})
  const [favoriteExercises, setFavoriteExercises] = useState([])
  const [favoriteRecipes, setFavoriteRecipes] = useState([])

  return (
    <>
      <Navigations />
      <h1>revive</h1>

      <Routes>

        <Route path="/" />
        <Route path="/account" element={<Account />} />
        <Route path="/selfcare" element={<SelfCare />} />
        <Route path="/exercises" element={<Exercises user_id={user.user_id}/>} />
        <Route path="/login"  element={<Login setToken={setToken} setUser={setUser}/>} />
        <Route path="/register"  element={<Register setToken={setToken} setUser={setUser} />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:recipe_id" element={<SingleRecipe user_id={user.user_id} />} />
        <Route path="/selfcare/:selfCare_id" element={<SingleSelfCare />} />
        <Route path="/exercises/:id" element={<SingleExercise />} />
        <Route path="/favorite-exercises" element={<FavoriteExercises favoriteExercises= {favoriteExercises} setFavoriteExericises={setFavoriteExercises} user ={user} setUser = {setUser}/>} />
        <Route path="/favorite-recipes" element={<FavoriteRecipes user={user} setUser = {setUser} favoriteRecipes = {favoriteRecipes} setFavoriteRecipes={setFavoriteRecipes}/>} />
        

      </Routes>
    </>
  )
}

export default App
