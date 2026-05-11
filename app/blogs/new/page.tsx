import { createBlog } from "../../actions/blogs"

const NewBlog = () => {
  return (
    <div>
      <h2>Create a new blog</h2>
      <form action={createBlog}>
        <div>
          <label htmlFor="titulo">Título:</label>
          <input type="text" id="titulo" name="titulo" required />
        </div>
        <div>
          <label htmlFor="autor">Autor:</label>
          <input type="text" id="autor" name="autor" required />
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input type="text" id="url" name="url" required />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlog