const express = require('express');

const router = express.Router() //sub routing

//import data from data.json

const data = require('../data/data.json');

// console.log(data.albums); 

let albums = data.albums; // arr of objs

router.get('/albums', (req, res)=>{

    res.render('albums', {
        albums: albums
    })
})

module.exports = router;