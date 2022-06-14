const { Router, request } = require('express');
const router = Router();
const _ = require('underscore');


const data = require('../cards.json');

//Cards
router.get('/', (req, res) => {
    res.json(data);
});

router.post('/', (req, res) => {
    const {name, elixir, type, rarity, arena, description} = req.body;
    if (name && elixir && type && rarity && arena && description) {
        const id = data.length + 1;
        const newCard = {...req.body, id};
        data.push(newCard);
        res.json(data);
    }else{
        res.status(500).json({"error" : "There was an error."});
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, elixir, type, rarity, arena, description} = req.body;
    if(name && elixir && type && rarity && arena && description) {
        _.each(data, (card, i) => {
            if (card.id == id) {
                card.name = name;
                card.elixir = elixir;
                card.type = type;
                card.rarity = rarity;
                card.arena = arena;
                card.description = description;
            }
        });
        res.json(data);
    }else {
        res.status(500).json({"error": "There was an error."});
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    _.each(data, (card, i) => {
        if(card.id == id) {
            data.splice(i, 1);
        }
    });
    res.send(data);
})

module.exports = router;