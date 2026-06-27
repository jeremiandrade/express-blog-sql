const express = require('express')
const app = express()
const port = 3000;


//start server 
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);

})

// create the first route
app.get('/', (req, res) => {
    res.json({ message: 'welcome to express SQL' })
})


