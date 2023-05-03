const express = require('express');

const router = express.Router() //sub routing

//import data from data.json

// const data = require('../data/data.json');

router.get('/', (req, res)=>{

    res.render('index')
})

module.exports = router;