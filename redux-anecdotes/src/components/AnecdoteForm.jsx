import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { clearNotification, setNotification } from "../reducers/notificationReducer"


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNote = (event) => {
    event.preventDefault()
    console.log(event.target)
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotification(`You created '${content}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000);
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNote}>
        <div><input name="note" /></div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm