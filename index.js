
const express = require("express");
const multer = require('multer');
const weapons = require('./weapons');
const app = express();

app.use(express.json());

//Agregar Imagen por Local (No lo estoy ocupando ya que lo agrego por URL)
const upload = multer({ dest: 'uploads/' });

//Obtener respuesta
app.get('/',(req,res) =>{
    res.send('Node JS api');
});

//Obtener respuesta de armas
app.get('/api/weapons/', (req,res) =>{
    res.send(weapons);
})

//Obtener arma por Id
app.get('/api/weapons', (req, res) => {
    const { category, id } = req.query;

    // Filtrar por categoría y/o por ID si ambos están presentes
    if (category && id) {
        const weapon = weapons.find(w => w.category.toLowerCase() === category.toLowerCase() && w.id === parseInt(id));
        if (!weapon) {
            return res.status(404).send('Weapon not found for the given category and ID');
        }
        return res.send(weapon);
    }

    // Filtrar solo por categoría
    if (category) {
        const filteredWeapons = weapons.filter(w => w.category.toLowerCase() === category.toLowerCase());
        if (filteredWeapons.length === 0) {
            return res.status(404).send('No weapons found for this category');
        }
        return res.send(filteredWeapons);
    }

    // Filtrar solo por ID
    if (id) {
        const weapon = weapons.find(w => w.id === parseInt(id));
        if (!weapon) {
            return res.status(404).send('Weapon not found');
        }
        return res.send(weapon);
    }

    // Si no se proporciona ninguna categoría ni ID, devolver todas las armas
    res.send(weapons);
});

app.get('/api/weapons/category/:category', (req, res) => {
    const category = req.params.category.toLowerCase();
    const filteredWeapons = weapons.filter(w => w.category.toLowerCase() === category);

    if (filteredWeapons.length === 0) {
        return res.status(404).send('No weapons found for this category');
    }

    res.send(filteredWeapons);
});

app.get('/api/weapons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const weapon = weapons.find(w => w.id === id);
    if (!weapon) {
        return res.status(404).send('Weapon not found');
    }
    res.send(weapon);
});

//Agregar un nuevo arma
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
//Eliminar arma por id
app.delete('/api/weapons/:id',(req,res) =>{
    const weapon = weapons.find(w => w.id === parseInt(req.params.id));
    if (!weapon) return res.status(404).send('weapon is not found');

    const index = weapons.indexOf(weapon);
    weapons.splice(index, 1);
    res.send(weapon);
})
//Iniciar Conexion a puerto 
const port = process.env.port || 80;
app.listen(port, () => console.log('Conectado al puerto '+port));