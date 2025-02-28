import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async content => {
  const object = {
    id: getId(),
    votes: 0,
    content
  }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const vote = async (id, anecdote) => {
  const voteAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1
  }
  const request = await axios.put(`${baseUrl}/${id}`, voteAnecdote)
  return await request.data
}

export default { getAll, createNew, vote }