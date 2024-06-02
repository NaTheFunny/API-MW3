
const express = require("express");
const multer = require('multer');
const app = express();

app.use(express.json());

const upload = multer({ dest: 'uploads/' });

const weapons = [
    {id: 1, 
     name: 'Striker',
     category: 'SMG',
     image: 'https://assetsio.gnwcdn.com/mw3-striker.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp'},

    {id: 2, 
     name: 'AMR9',
     category: 'SMG',
     image: 'https://static.wikia.nocookie.net/callofduty/images/f/fa/AMR9_Gunsmith_MWIII.png/revision/latest?cb=20231007025105'},
    
    {id: 3, 
     name: 'WSP9',
     category: 'SMG',
     image: 'https://www.charlieintel.com/cdn-cgi/image/width=3840,quality=60,format=auto/https://editors.charlieintel.com/wp-content/uploads/2023/11/14/Best-WSP-9-loadout-MW3-Modern-Warfare-3.jpg'},
    
    {id: 4, 
     name: 'Rival-9',
     category: 'SMG',
     image: 'https://assetsio.gnwcdn.com/mw3-rival-9.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp'}
];

app.get('/',(req,res) =>{
    res.send('Node JS api');
});

app.get('/api/weapons/', (req,res) =>{
    res.send(weapons);
})

app.get('/api/weapons/:id',(req, res)=>{
    const weapon = weapons.find(w => w.id === parseInt(req.params.id));
    if (!weapon) return res.status(404).send('weapon is not found');
    else res.send(weapon);
})

app.post('/api/weapons', (req,res) =>{
    const weapon = {
        id: weapons.length + 1,
        name: req.body.name,
        category: req.body.category,
        image: req.body.image
    };
    weapons.push(weapon);
    res.send(weapon);
})

app.delete('/api/weapons/:id',(req,res) =>{
    const weapon = weapons.find(w => w.id === parseInt(req.params.id));
    if (!weapon) return res.status(404).send('weapon is not found');

    const index = weapons.indexOf(weapon);
    weapons.splice(index, 1);
    res.send(weapon);
})

const port = process.env.port || 80;
app.listen(port, () => console.log('Conectado al puerto '+port));