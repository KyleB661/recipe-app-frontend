import { useContext, useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router'

import NavBar from './components/NavBar/NavBar'
import SignUpForm from './components/SignupForm/SignUpForm'
import SignInForm from './components/SignInForm/SignInForm'
import Landing from './components/Landing/Landing'
import Dashboard from './components/Dashboard/Dashboard'
import RecipeList from './components/RecipeList/RecipeList'
import * as recipeService from './services/recipeService'
import RecipeDetails from './components/RecipeDetails/RecipeDetails'
import RecipeForm from './components/RecipeForm/RecipeForm'
import './styles/App.css'

import { UserContext } from './contexts/UserContext'

const App = () => {
  const { user } = useContext(UserContext)
  const [recipes, setRecipes] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllRecipes = async () => {
      const recipesData = await recipeService.index()

      setRecipes(recipesData)
    }
    if (user) fetchAllRecipes()
  }, [user])

  const handleAddRecipe = async (recipeFormData) => {
    try {
      const newRecipe = await recipeService.create(recipeFormData)
      setRecipes([...recipes, newRecipe])
      navigate('/recipes')
    } catch (error) {
      console.log(error)
    }
  };

  const handleDeleteRecipe = async (recipeId) => {
    try {
      await recipeService.deleteRecipe(recipeId)
      setRecipes(recipes.filter(recipe => recipe._id !== recipeId))
      navigate('/recipes')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            <Route path="/recipes" element={<RecipeList recipes={recipes} />} />
            <Route path="/recipes/new" element={<RecipeForm handleAddRecipe={handleAddRecipe} />} />
            <Route 
              path="/recipes/:recipeId" 
              element={<RecipeDetails handleDeleteRecipe={handleDeleteRecipe} />} 
            />
            <Route path="/recipes/:recipeId/edit" element={<RecipeForm />} />
          </>
        ) : (
          <>
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
          </>
        )}
        <Route path='*' element={<Landing />} />
      </Routes>
    </>
  )
}

export default App