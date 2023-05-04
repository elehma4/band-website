const express = require('express');

const router = express.Router() //sub routing

// const data = require('../data/forums.json');


router.get('/forums', (req, res)=>{

    res.render('forums')
})

module.exports = router;