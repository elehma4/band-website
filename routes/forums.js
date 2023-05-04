const express = require('express');

const router = express.Router() //sub routing

// const data = require('../data/data.json');


router.get('/forums', (req, res)=>{

    res.render('forums')
})

module.exports = router;