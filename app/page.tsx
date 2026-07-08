const Home = () => {
  return (
    <div className="container mx-auto px-4 py-4">
      <div>
        <h2 className="text-2xl font-bold mb-4">Blog app</h2>
        An example app for{" "}
        <a className="text-blue-500 hover:underline" rel="noopener noreferrer" target="_blank" href="https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-nextjs">
          Full Stack Open Next.js
        </a>
      </div>
      <div className="mt-4">
        See{" "}
        <a target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline" href="https://github.com/fullstack-hy2020/nextjs-notes">
          https://github.com/fullstack-hy2020/nextjs-notes
        </a>{" "}
        for the source code
      </div>
    </div>
  )
}
export default Home