const express = require('express');
const bodyParser = require('body-parser')

const cfg = require('./cfg');
const db = require('./models');
const alphabet = '123456789abcdefghijkmnpqrstuvwxyz';
const length = 4;

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('cors')());

app.post('/api/create', async (req, res) => {
    if (req.body.k !== cfg.key)
        return res.json(false);
    
    let from = req.body.f;
    let to = req.body.t;

    if (from != 'generateRandomLink') { //a target was provided
        await db.Link.destroy({where: {from}});
    } else { //no target was provided
        do {
            from = '';
            for (let i = 0; i < cfg.randomLength; i++)
                from += alphabet[Math.floor(Math.random() * alphabet.length)];
        } while (await db.Link.count({where: {from}}) > 0)
    }

    await db.Link.create({from, to});
    res.json(from);
});

app.get('/*', async (req, res) => {
    let from = req._parsedUrl.href.slice(1);
    let link = await db.Link.findOne({where: {from}});
    if (link == null)
        res.send(`"/${from}" is not a shortened link`);
    else
        res.redirect(link.to);
});

const server = app.listen(cfg.port, () => {
    console.log(`Web server started on port ${cfg.port}.`);
});