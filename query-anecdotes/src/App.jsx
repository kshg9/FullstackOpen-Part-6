import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdotes } from './requests'
import { useContext } from 'react'
import NotificationContext, { useNotificationDispatch } from './NotificationContext'

const App = () => {

  const queryclient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const updateAnecdotesMutation = useMutation({
    mutationFn: updateAnecdotes,
    onSuccess: (newAnecdote) => {
      queryclient.invalidateQueries('anecdotes')
      dispatch({type: 'SET', data: `anecdote ${newAnecdote.content} voted`});
      setTimeout(() => {
        dispatch({type: 'CLEAR'})
      }, 5000);
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdotesMutation.mutate({...anecdote, votes: anecdote.votes + 1});
  }

  const { data: anecdotes, isLoading, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
  })

  console.log('anecdotes', anecdotes, isLoading, error)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
