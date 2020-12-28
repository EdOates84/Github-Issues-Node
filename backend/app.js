const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
const app = express();
app.use(bodyParser.json());
app.use(cors());
const connection = require("./connector")


// app.use(express.static(path.join(__dirname, "build")));

// add-issue  POST
app.post("/api/issue", (req, res) => {
    const { author, title, comment } = req.body;
    connection.query("INSERT INTO test (title, comment, author) VALUES (?,?,?);", [title, comment, author], (err, result, fields) => {
        if (err) { res.status(404).json(err.message); }
        else {
            res.status(200).json({ msg: "Issue Created Successfully", id: result.insertId });
        }
    });
});

// list-issues?page=  GET
app.get("/api/issue", (req, res) => {
    const page = parseInt(req.query.page);
    console.log(page);
    const isOpen = req.query.isOpen ? req.query.isOpen === "true" ? true : false : null;
    const limit = 10;
    const offset = (page - 1) * limit;
    let pageLimit = 1;

    if (isOpen != null) {
        connection.query(
            "SELECT * FROM test WHERE isOpen = ? LIMIT ?, ?;", [isOpen, offset, limit],
            (err, result, fields) => {
                if (err) {
                    res.status(404).json(err.message);
                } else {
                    connection.query("SELECT COUNT(*) FROM test WHERE isOpen = ?;", [isOpen],
                        (err, result, fields) => {
                            if (err) { }
                            else {
                                console.log(result);
                            }
                        }
                    );
                    res.status(200).json(result);

                }
            });
    } else {
        connection.query(
            "SELECT * FROM test LIMIT ?, ?;", [offset, limit],
            (err, result, fields) => {
                if (err) {
                    res.status(404).json(err.message);
                } else {
                    if (result.length === 0) {
                        res.status(404).json({ message: "No more results" });
                    } else {
                        connection.query(
                            "SELECT COUNT(*) FROM test;", (err, result, fields) => {
                                if (err) { }
                                else {
                                    console.log(result);
                                }
                            });
                        res.status(200).json(result);
                    }
                }
            });
    }
});

// update-issue/id   PATCH
app.patch("/api/issue/:id", (req, res) => {
    const { id } = req.params;
    const { title, comment, isOpen } = req.body;
    connection.query(
        `UPDATE test SET title = ?, comment = ?, isOpen = ? WHERE id=?`, [title, comment, isOpen, id],
        (err, result, fields) => {
            if (err) {
                res.status(404).json(err.message);
            } else {
                res.status(200).json({ result, msg: "updated successfully" });
            }
        });
});

// delete-issue/id   DELETE
app.delete("/api/issue/:id", (req, res) => {
    const id = parseInt(req.params.id);
    connection.query(`DELETE FROM test WHERE id= ?`, [id],
        (err, result, fields) => {
            if (err) {
                res.status(404).json(err.message);
            } else {
                res.status(200).json({ msg: "Issue Deleted" });
            }
        });
});

// list-issues/id   GET
app.get("/api/issue/:id", (req, res) => {
    const { id } = req.params;
    connection.query(`SELECT * FROM test WHERE id=?`, [id],
        (err, result, fields) => {
            if (err) {
                res.status(404).json(err.message);
            } else {
                res.status(200).json(result[0]);
            }
        });
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(process.env.PORT, () => {
    console.log("app is running on port " + process.env.PORT);
});

module.exports = app;
