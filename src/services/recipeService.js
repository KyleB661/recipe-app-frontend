const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/recipes`

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const create = async (recipeData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipeData)
    })
    return res.json()
  } catch (error) {
    throw error
  }
}

const update = async (id, recipeData) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipeData)
    })
    return res.json()
  } catch (error) {
    throw error
  }
}

const deleteRecipe = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    return res.json()
  } catch (error) {
    throw error
  }
}

const show = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
    if (!res.ok) {
      throw new Error('Recipe not found')
    }
    return res.json()
  } catch (error) {
    throw error
  }
}

const createComment = async (recipeId, commentData) => {
  try {
    const res = await fetch(`${BASE_URL}/${recipeId}/comments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentData)
    })
    return res.json()
  } catch (error) {
    throw error
  }
}

const deleteComment = async (recipeId, commentId) => {
  try {
    const res = await fetch(`${BASE_URL}/${recipeId}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
    return res.json()
  } catch (error) {
    throw error
  }
}

const updateComment = async (recipeId, commentId, commentData) => {
  try {
    const res = await fetch(`${BASE_URL}/${recipeId}/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentData)
    })
    return res.json()
  } catch (error) {
    throw error
  }
}


export {
  index,
  show,
  create,
  update,
  deleteRecipe,
  createComment,
  deleteComment,
  updateComment
}