import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import * as recipeService from '../../services/recipeService'

const RecipeForm = (props) => {
  const navigate = useNavigate()
  const { recipeId } = useParams()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: [{ name: '', amount: '', unit: '' }],
    instructions: [''],
    prepTime: '',
    cookTime: '',
    servings: ''
  })

  useEffect(() => {
    const fetchRecipe = async () => {
      if (recipeId) {
        try {
          const data = await recipeService.show(recipeId)
          setFormData(data)
        } catch (err) {
          console.log(err)
        }
      }
    }
    fetchRecipe()
  }, [recipeId])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...formData.ingredients]
    newIngredients[index] = {
      ...newIngredients[index],
      [field]: value
    }
    setFormData({ ...formData, ingredients: newIngredients })
  }

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { name: '', amount: '', unit: '' }]
    })
  }

  const removeIngredient = (index) => {
    const newIngredients = formData.ingredients.filter((_, i) => i !== index)
    setFormData({ ...formData, ingredients: newIngredients })
  }

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...formData.instructions]
    newInstructions[index] = value
    setFormData({ ...formData, instructions: newInstructions })
  }

  const addInstruction = () => {
    setFormData({
      ...formData,
      instructions: [...formData.instructions, '']
    })
  }

  const removeInstruction = (index) => {
    const newInstructions = formData.instructions.filter((_, i) => i !== index)
    setFormData({ ...formData, instructions: newInstructions })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const cleanedFormData = {
        ...formData,
        ingredients: formData.ingredients.filter(ingredient => 
          ingredient.name.trim() !== '' || ingredient.amount.trim() !== '' || ingredient.unit.trim() !== ''
        ),
        instructions: formData.instructions.filter(instruction => instruction.trim() !== '')
      }
  
      if (recipeId) {
        await recipeService.update(recipeId, cleanedFormData)
        navigate('/recipes')
      } else {
        props.handleAddRecipe(cleanedFormData)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <main>
      <h1>{recipeId ? 'Edit Recipe' : 'New Recipe'}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <h2>Ingredients</h2>
        {formData.ingredients.map((ingredient, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Ingredient name"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
          
            />
            <input
              type="number"
              placeholder="Amount"
              value={ingredient.amount}
              onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
              
            />
            <input
              type="text"
              placeholder="Unit"
              value={ingredient.unit}
              onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
              
            />
            <button type="button" onClick={() => removeIngredient(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addIngredient}>
          Add Ingredient
        </button>

        <h2>Instructions</h2>
        {formData.instructions.map((instruction, index) => (
          <div key={index}>
            <textarea
              value={instruction}
              onChange={(e) => handleInstructionChange(index, e.target.value)}
              placeholder={`Step ${index + 1}`}
              
            />
            <button type="button" onClick={() => removeInstruction(index)}>
              Remove Step
            </button>
          </div>
        ))}
        <button type="button" onClick={addInstruction}>
          Add Step
        </button>

        <label htmlFor="prepTime">Prep Time (minutes)</label>
        <input
          type="number"
          id="prepTime"
          name="prepTime"
          value={formData.prepTime}
          onChange={handleChange}
          required
        />

        <label htmlFor="cookTime">Cook Time (minutes)</label>
        <input
          type="number"
          id="cookTime"
          name="cookTime"
          value={formData.cookTime}
          onChange={handleChange}
          required
        />

        <label htmlFor="servings">Servings</label>
        <input
          type="number"
          id="servings"
          name="servings"
          value={formData.servings}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {recipeId ? 'Update Recipe' : 'Create Recipe'}
        </button>
      </form>
    </main>
  )
}

export default RecipeForm