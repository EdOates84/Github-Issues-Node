const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const path = require('path')
require('dotenv').config();

var  mysql = require('mysql');
const pass = process.env.DBPASS;
const user = process.env.DBUSER;
var connection = mysql.createConnection({
    host: 'localhost',
    user: user,
    password: pass,
    database : 'git_issues'
});

connection.connect(function(error){
    if(error){
        console.log(error);
    } else{
        console.log('Connected');
        connection.query("CREATE TABLE IF NOT EXISTS issues (id INT AUTO_INCREMENT NOT NULL, title varchar(255) NOT NULL, comment TEXT(65535), author varchar(255) NOT NULL, date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, isOpen TINYINT(1) DEFAULT 1, primary key (id));",(err,result, fields) =>{
            if(err){
                console.log(err)
            }else{
                console.log('Created')
            }
        })
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.use(express.static(path.join(__dirname, 'build')));

// add-issue  POST
app.post('/api/add-issue', (req, res)=>{
    const {author, title, comment} = req.body;
    connection.query("INSERT INTO issues (title, comment, author) VALUES (?,?,?);",[title,comment,author], (err, result, fields) => {
        if(err){
            console.log(err)
            res.status(404).json(err.message);
        }else{
            res.status(200).json({msg : "Issue Created Successfully"});
        }
    });
})


// list-issues?page=  GET
app.get('/api/list-issues', (req, res)=>{
    const page = parseInt(req.query.page);
    console.log(page)
    const isOpen = req.query.isOpen ? req.query.isOpen==='true' ? true : false : null;
    const limit = 10;
    const offset = (page-1)*limit;
    let pageLimit = 1;
    
    if(isOpen!=null){
        connection.query("SELECT * FROM issues WHERE isOpen = ? LIMIT ?, ?;", [isOpen, offset, limit],(err,result,fields)=>{
            if(err){
                res.status(404).json(err.message)
            }else{
                connection.query("SELECT COUNT(*) FROM issues WHERE isOpen = ?;",[isOpen],(err,result,fields)=>{
                    if(err){
                    }else{
                        console.log(result)
                    }
                })
                res.status(200).json(result);
            }
        })
    }else{
        connection.query("SELECT * FROM issues LIMIT ?, ?;", [offset, limit],(err,result,fields)=>{
            if(err){
                res.status(404).json(err.message)
            }else{
                if(result.length === 0 ){
                    res.status(404).json({message:"No more results"})
                }else{
                    connection.query("SELECT COUNT(*) FROM issues;",(err,result,fields)=>{
                        if(err){
                        }else{
                            console.log(result)
                        }
                    })
                    res.status(200).json(result);
                }
            }
        })
    }
    
})


// update-issue/id   PATCH
app.patch('/api/update-issue/:id', (req, res)=>{
    const { id } = req.params;
    const {title, comment, isOpen, } = req.body;
    connection.query(`UPDATE issues SET title = ?, comment = ?, isOpen = ? WHERE id=?`,[title,comment,isOpen,id], (err, result, fields) => {
        if(err){
            res.status(404).json(err.message);
        }else{
            res.status(200).json({msg : "updated successfully"});
        }
    });
})


// delete-issue/id   DELETE
app.delete('/api/delete-issue/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    connection.query(`DELETE FROM issues WHERE id= ?`,[id], (err, result, fields) => {
        if(err){
            res.status(404).json(err.message);
        }else{
            res.status(200).json({msg : "Issue Deleted"});
        }
    });
})


// list-issues/id   GET
app.get('/api/list-issues/:id', (req, res)=>{
    const { id } = req.params;
    connection.query(`SELECT * FROM issues WHERE id=?`,[id], (err, result, fields) => {
        if(err){
            res.status(404).json(err.message);
        }else{
            res.status(200).json({result});
        }
    });
    console.log("yes this is running")
    
})

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
})

app.listen(process.env.PORT, ()=>{
    console.log('app is running on port '+process.env.PORT);
})

module.exports = app;