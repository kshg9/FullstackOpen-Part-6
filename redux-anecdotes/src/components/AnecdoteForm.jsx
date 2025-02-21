import { useDispatch } from "react-redux"
import { createAnecdoteAction } from "../reducers/anecdoteReducer"


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    console.log(event.target)
    const content = event.target.note.value
    event.target.note.value = ''

    dispatch(createAnecdoteAction(content))
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