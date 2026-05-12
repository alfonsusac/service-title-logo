import { fetchAuthors } from "../(app)/data"

export default async function TestOGImagePage() {

  if (process.env.NODE_ENV !== 'development') return null

  const authors = await fetchAuthors()

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Test Metadata</h1>
      <p className="text-lg">This page is used to test the metadata.</p>

      <br />

      <p>Home page</p>
      <img src="/opengraph-image" alt="OG Image Test" className="w-full max-w-md rounded-lg shadow-lg" />
      
      <br />
      
      <p>404 page</p>
      <img src="http://localhost:3000/asdfasdfasdf/opengraph-image-15futl?6c555a3b8937e154" alt="OG Image Test" className="w-full max-w-md rounded-lg shadow-lg" />

      <br />

      <p>Author Page</p>
      {authors.map(author => {
        return (
          <div key={author.id} className="mb-4">
            <h2 className="text-xl font-semibold">{author.displayName}</h2>
            <img src={`http://localhost:3000/${ author.id }/opengraph-image-15futl?6c555a3b8937e154`} alt={`OG Image for ${ author.displayName }`} className="w-full max-w-md rounded-lg shadow-lg" />
          </div>
        )
      })}
    </main>
  )
}