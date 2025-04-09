import { useState } from 'react'
import * as recipeService from '../../services/recipeService'

const EditCommentForm = ({ recipeId, comment, onCommentUpdated, onCancel }) => {
  const [formData, setFormData] = useState({
    content: comment.content,
    rating: comment.rating
  })

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    try {
      await recipeService.updateComment(recipeId, comment._id, formData)
      onCommentUpdated()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Comment</h3>
      
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

      <button type="submit">Update Comment</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  )
}

export default EditCommentForm