const express = require('express');

const router = express.Router() //sub routing

router.get('/chat', (req, res)=>{

    res.render('chat')
})

module.exports = router;