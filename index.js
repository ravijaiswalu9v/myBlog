import express from 'express'
import demoBlogData from './lib/seed.js'
import bodyParser from 'body-parser'

const app = express()
const port = 3000

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/blog', (req, res) => {
res.send(demoBlogData);
})

app.get('/blog/:id', (req, res) => {
 const blogId = parseInt(req.params.id);
 const blog = demoBlogData.find((b)=> b.id === blogId);

 if(blog){
    res.send(blog);
 }else{
    res.status(404).send(`Blog with id: ${blogId} is not found`);   
 }s
})

app.post("/blog", (req, res)=>{

  console.log(req.body);
  // res.send(req.body);

  const newBlog = req.body;
  newBlog.id = demoBlogData.length + 1;
  newBlog.created_at = new Date();
  newBlog.updated_at = new Date();
  demoBlogData.push(newBlog);

  res.status(201).send(newBlog);
})

app.delete("/blog/:id", (req, res)=>{
  const blogId = parseInt(req.params.id);
  const blog = demoBlogData.find((b)=> b.id === blogId);

  if(blog){
    demoBlogData = demoBlogData.filter((b)=> b.id === blogId);
    res.send(blog);
  }else{
    res.status(400).send("Resource not found!")
  }

  console.log(req.body);
  // res.send(req.body);

  const newBlog = req.body;
  newBlog.id = demoBlogData.length + 1;
  newBlog.created_at = new Date();
  newBlog.updated_at = new Date();
  demoBlogData.push(newBlog);

  res.status(201).send(newBlog);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})