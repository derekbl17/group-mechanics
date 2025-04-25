const express =require ("express")
const mysql = require("mysql")
const cors = require ("cors")
const path = require("path")

const app = express()

app.use(express.static(path.join(__dirname, "public")))
app.use(cors())
app.use(express.json())

const port = 5000

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "zooDb"
})
///Post
app.post("/addAnimal", (req, res)=>{
    const sql = `INSERT INTO zoodbtable (gyvūnoPav, rūšis, svoris, aplinka, gyvenaLietuvoje) VALUES (?,?,?,?,?)`;
    const values = [
        req.body.gyvūnoPav,
        req.body.rūšis,
        req.body.svoris,
        req.body.aplinka,
        req.body.gyvenaLietuvoje
    ]
    db.query(sql,values,(err, result)=>{
        if(err){
            return res.json({message:"Something unexpected happened" + err})
        }
        else{
            return res.json({values})
        }
    })
})
///Get ALL
app.get('/getAnimals', (req, res) => {
    db.query('SELECT * FROM zoodbtable', (err, results) => {
      if (err) {
        return res.json({message:"Something unexpected happened" + err})
      } else {
        res.json(results);
      }
    });
  });
//Get by Id
app.get('/getAnimalById/:id', (req, res) => {
    const id = req.params.id; 
    const sql = `SELECT * FROM zoodbtable WHERE id = ?`;
  
    db.query(sql, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching animal data', error: err });
      }
  
      if (result.length === 0) {
        return res.status(404).json({ message: 'Animal not found' });
      }
  
      res.json(result[0]);
    });
  });
  
//Update By Id
app.put('/updateAnimal/:id', (req, res) => {
    const id = req.params.id; 
    const {gyvūnoPav, rūšis, svoris, aplinka, gyvenaLietuvoje } = req.body;

    const sql = `UPDATE zoodbtable SET 
                   gyvūnoPav = ?, 
                   rūšis = ?, 
                   svoris = ?, 
                   aplinka = ?, 
                   gyvenaLietuvoje = ? 
                 WHERE id = ?`;

    const values = [gyvūnoPav, rūšis, svoris, aplinka, gyvenaLietuvoje, id];

    db.query(sql, values, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error updating animal', error: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Animal not found' });
      }
      return res.json({values});
    });
});
//Delete by id
app.delete('/deleteAnimal/:id', (req, res) => {
    const id = req.params.id; 
  
    const sql = `DELETE FROM zoodbtable WHERE id = ?`;
  
    db.query(sql, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error deleting animal', error: err });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Animal not found' });
      }
  
      return res.json({ message: 'Animal deleted successfully' });
    });
  });


app.listen(port, ()=>{
    console.log("listening")
})