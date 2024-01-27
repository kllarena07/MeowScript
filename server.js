import express from "express"
import path from "path"

const app = express()
const __dirname = path.dirname(new URL(import.meta.url).pathname)
const port = 3000

app.use(express.static(path.join(__dirname, 'src')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})