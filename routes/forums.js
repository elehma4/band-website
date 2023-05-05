const express = require('express');
const router = express.Router() //sub routing

const fs = require('fs');
const messages = require('../data/forums.json'); //json to js obj

router.use(express.json())
router.use(express.urlencoded({extended: true}))

router.get('/forums', (req, res)=>{
    res.render('forums')
})

router.get('/api', (req, res) => {
    res.json(messages)
})

router.post('/api', (req, res) => {
    // get data from header & form data
    let {name, title, message} = req.body;
    messages.unshift(req.body)
    // write new message obj to the file
    fs.writeFile('data/forums.json', JSON.stringify(messages), 'utf8', err=>{
        if(err){
            res.status(444).send(err)
        }
    })
    // send back all messages w/ new message
    res.json(messages)
})

router.delete('/api/:index', (req, res) => {

    let {index} = req.params;

    if(messages.length > 0 && index !== ''){ //make sure index isn't empty & messages array

        messages.splice(index, 1)

        fs.writeFile('data/forums.json', JSON.stringify(messages), 'utf8', err=>{
            if(err){
                res.status(444).send(err)
            }
        })

    }

    // send back all messages w/ new message
    res.json(messages)
})
  

module.exports = router;