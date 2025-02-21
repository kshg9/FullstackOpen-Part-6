import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from "../services/anecdotesService"
import { setNotification } from "./notificationReducer"

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]


// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const anecdote = action.payload
      state.push({
        ...anecdote,
        votes: 0,
      })
    },
    vote(state, action) {
      console.log('action', action)
      const id = action.payload
      const anecdoteToChange = state.find(s => s.id === id)
      if (anecdoteToChange) {
        anecdoteToChange.votes += 1
      }
    },
    setAnecdotes(state, action) { // fetch anecdotes from server
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdoteAction = content => {
  return async dispatch =>  {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
    dispatch(setNotification(`You created '${content}'`, 10))
  }
}

export const voteAnecdote = anecdote => {
  console.log('anecdote: ', anecdote)
  return async dispatch => {
    const updatedAnecdote = await anecdotesService.vote(anecdote.id, anecdote)
    dispatch(vote(updatedAnecdote.id))
    dispatch(setNotification(`You voted for '${anecdote.content}'`, 10))
  }
}

export const { createAnecdote, vote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer