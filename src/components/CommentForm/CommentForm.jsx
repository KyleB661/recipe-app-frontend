import { useState } from 'react'
import * as recipeService from '../../services/recipeService'

const CommentForm = ({ recipeId, onCommentSubmitted }) => {
  const [formData, setFormData] = useState({
    content: '',
    rating: 5
  })

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    try {
      await recipeService.createComment(recipeId, formData)

      setFormData({
        content: '',
        rating: 5
      })
      
      onCommentSubmitted()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a Comment</h3>
      
      <label htmlFor="rating">Rating:</label>
      <select
        name="rating"
        id="rating"
        value={formData.rating}
        onChange={handleChange}
        required
      >
        <option value="1">1 ⭐</option>
        <option value="2">2 ⭐⭐</option>
        <option value="3">3 ⭐⭐⭐</option>
        <option value="4">4 ⭐⭐⭐⭐</option>
        <option value="5">5 ⭐⭐⭐⭐⭐</option>
      </select>

      <label htmlFor="content">Comment:</label>
      <textarea
        name="content"
        id="content"
        value={formData.content}
        onChange={handleChange}
        required
      />

      <button type="submit">Submit Comment</button>
    </form>
  )
}

export default CommentForm