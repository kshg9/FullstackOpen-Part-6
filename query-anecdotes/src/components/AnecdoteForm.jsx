import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useContext } from "react"
import NotificationContext, { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const queryclient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryclient.invalidateQueries('anecdotes')
      dispatch({type: 'SET', data: `New anecdote created`})
      setTimeout(() => {
        dispatch({type: 'CLEAR'})
      }, 5000);
    },
    onError: (error) => {
      dispatch({ type: 'SET', data: 'Too short anecdote, must have length 5 or more' })
      setTimeout(() => {
        dispatch({ type: 'CLEAR' })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes: 0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
