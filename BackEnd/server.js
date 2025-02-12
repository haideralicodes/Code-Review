require('dotenv').config()
const app = require('./src/app')

app.get('/', (req, res)=>{
    res.send('Hello World') 
}) 

app.listen(3000, ()=>{
    console.log("server running on port 3000")
})
