import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router'
import * as recipeService from '../../services/recipeService'
import CommentForm from '../CommentForm/CommentForm'
import EditCommentForm from '../EditCommentForm/EditCommentForm'
import { UserContext } from '../../contexts/UserContext'

const RecipeDetails = ({handleDeleteRecipe}) => {
  const { recipeId } = useParams()
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState(null)
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchRecipe = async () => {
    try {
      setLoading(true)
      const data = await recipeService.show(recipeId)
      setRecipe(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRecipe()
  }, [recipeId])

  const handleDelete = async () => {
    try {
      await handleDeleteRecipe(recipeId)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCommentSubmitted = async () => {
    await fetchRecipe()
  }

  const handleDeleteComment = async (commentId) => {
    try {
      await recipeService.deleteComment(recipeId, commentId)
      fetchRecipe()
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditComment = (commentId) => {
    setEditingCommentId(commentId)
  }

  if (loading) return <h1>Loading...</h1>
  if (!recipe) return <h1>Recipe not found</h1>

  return (
    <main>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

      {recipe.ingredients && recipe.ingredients.length > 0 && (
        <>
          <h2>Ingredients:</h2>
          <ul>
            {recipe.ingredients.map((ingredient, i) => (
              <li key={i}>
                {ingredient.amount} {ingredient.unit} {ingredient.name}
              </li>
            ))}
          </ul>
        </>
      )}

      {recipe.instructions && recipe.instructions.length > 0 && (
        <>
          <h2>Instructions:</h2>
          <ol>
            {recipe.instructions.map((instruction, i) => (
              <li key={i}>{instruction}</li>
            ))}
          </ol>
        </>
      )}

      <div>
        {recipe.prepTime && <p>Prep Time: {recipe.prepTime} minutes</p>}
        {recipe.cookTime && <p>Cook Time: {recipe.cookTime} minutes</p>}
        {recipe.servings && <p>Servings: {recipe.servings}</p>}
      </div>

      <div>
        <button onClick={() => navigate(`/recipes/${recipeId}/edit`)}>
          Edit Recipe
        </button>
        <button onClick={handleDelete}>
      Delete Recipe
    </button>
      </div>

      <section>
        <h2>Comments</h2>
        {recipe.comments?.length > 0 ? (
          <ul>
            {recipe.comments.map((comment) => (
              <li key={comment._id}>
                {editingCommentId === comment._id ? (
                  <EditCommentForm
                    recipeId={recipeId}
                    comment={comment}
                    onCommentUpdated={() => {
                      fetchRecipe()
                      setEditingCommentId(null)
                    }}
                    onCancel={() => setEditingCommentId(null)}
                  />
                ) : (
                  <>
                    <p>Rating: {'⭐'.repeat(Number(comment.rating))}</p>
                    <p>{comment.content}</p>
                    <p>- {comment.author?.username}</p>
                    {user?._id === comment.author?._id && (
                      <>
                        <button onClick={() => handleEditComment(comment._id)}>
                          Edit
                        </button>
                        <button onClick={() => handleDeleteComment(comment._id)}>
                          Delete
                        </button>
                      </>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet</p>
        )}
        
        <CommentForm 
          recipeId={recipeId} 
          onCommentSubmitted={handleCommentSubmitted} 
        />
      </section>
    </main>
  )
}

export default RecipeDetails