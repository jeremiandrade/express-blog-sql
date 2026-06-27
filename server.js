const express = require('express')
const app = express()
const port = 3000;

//importo il file di connessione al database
const connection = require('./database/connection')


//start server 
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);

})

// create the first route
app.get('/', (req, res) => {
    res.json({ message: 'welcome to express SQL' })
})


//INDEX
const index = (req, res) => {
    //preparo la query
    const sql = ' SELECT * FROM POSTS'
    //eseguo la query
    connection.query(sql, (err, results) => {
        console.log(err);
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: true, message: 'Internal Server Error' })
        }
        console.log(results);
        res.json(results)
    })
}


// route post
app.get('/posts', index)


//SHOW

const show = (req, res) => {
    //recupero id dall'url
    const id = req.params.id
    const sql = ' SELECT * FROM POSTS WHERE id =?'
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' })
        if (results.lenght === 0) return req.status(400).json({ error: 'Post not found' })
        res.json(results[0])
    })
}

app.get('/posts/:id', show);


// Facciamo sì che l’API di DESTROY permetta di eliminare un post dal database
// Verifichiamo su Postman che la chiamata non dia errore e risponda 204
// Verifichiamo su MySQL Workbench che il post venga effettivamente rimosso


//DESTROY

const destroy = (req, res) => {

    //recupero l'id 
    const id = req.params.id
    // elimino elemento dalla lista
    connection.query('DELETE FROM posts WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete post' })
        res.sendStatus(204)
    })
}

app.delete('/posts/:id', destroy);



// query

// SELECT posts.title, posts.content, posts.image, tags.label,tags.id
// FROM `post_tag`
// JOIN `posts` ON `post_tag`.`post_id`= `posts`.`id` 
// JOIN `tags` ON `post_tag`.`tag_id`= `tags`.`id`
