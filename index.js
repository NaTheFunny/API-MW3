
const express = require("express");
const multer = require('multer');
const app = express();

app.use(express.json());
//Agregar Imagen por Local (No lo estoy ocupando ya que lo agrego por URL)
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
     image: 'https://assetsio.gnwcdn.com/mw3-rival-9.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp'},

    {id: 5, 
     name: 'Striker-9',
     category: 'SMG',
     image: 'https://assetsio.gnwcdn.com/Striker-9.jpg?width=880&quality=80&format=jpg&auto=webp'},

    {id: 6, 
     name: 'WSP',
     category: 'SMG',
     image: 'https://www.dexerto.es/cdn-image/wp-content/uploads/sites/3/2024/03/08/wsp-swarm-cod-warzone-preview-1024x576-1.jpg?width=3840&quality=75&format=auto'},
    
    {id: 7, 
     name: 'Superi-46',
     category: 'SMG',
     image: 'https://dotesports.com/wp-content/uploads/2024/05/mw3-best-superi-46-loadout-new-smg.jpg'},
];

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