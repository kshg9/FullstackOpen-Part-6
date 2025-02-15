import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { clearNotification, setNotification } from '../reducers/notificationReducer'
import anecdotesService from '../services/anecdotesService'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    console.log(state)
    const filteredList = state.anecdote.filter(anecdote =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    )
    return [...filteredList].sort((a, b) => b.votes - a.votes)
  })

  const handleVote = async ( id, anecdote ) => {
    const updatedVotes = await anecdotesService.vote(id, anecdote)
    dispatch(vote(id))
    dispatch(setNotification(`You voted for '${updatedVotes.content}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000);
  }

  return (
    <>
      {anecdotes
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id, anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList