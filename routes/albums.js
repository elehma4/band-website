const express = require('express');

const router = express.Router() //sub routing

//import data from data.json

// const data = require('../data/data.json');

router.get('/albums', (req, res)=>{

    res.render('albums')
})

module.exports = router;