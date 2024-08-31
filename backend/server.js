// Requires
require("dotenv").config();
const fs = require("fs");
const cors = require("cors");
const express = require("express");
const app = express();

// Vars
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  fs.readFile("database.json", "utf8", (err, data) => {
    if (err) console.log(err);
    if (data) {
      const parsedData = JSON.parse(data);
      let userData = parsedData["users"].map(({ password, ...reset }) => reset);
      res.status(200).json({
        data: userData,
      });
    }
  });
});

app.post("/", (req, res) => {
  const { name, email, password } = req.body;
  fs.readFile("database.json", "utf8", (err, data) => {
    if (err) console.log(err);
    if (data) {
      const parsedData = JSON.parse(data);
      const last_id = parsedData["last_id"] + 1;
      let users = parsedData["users"];
      users.push({
        id: last_id,
        name,
        email,
        password,
      });

      fs.writeFile(
        "database.json",
        JSON.stringify({
          users,
          last_id,
        }),
        (err) => {
          if (err) {
            console.log(err);
          } else {
            res.status(201).json({ msg: "User has been added" });
          }
        }
      );
    }
  });
});



app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  fs.readFile("database.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    if (data) {
      const parsedData = JSON.parse(data);
      let usersData = parsedData["users"].map(({ password, ...reset }) => reset);
      const user = usersData.filter((e) => e.id === id);
      res.status(200).json({
        data: user,
      });
    }
  });
});


app.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  fs.readFile("database.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    if (data) {
      const parsedData = JSON.parse(data);
      const usersData = parsedData["users"].filter((e) => e.id !== id);
      const last_id = parsedData['last_id'];
      fs.writeFile(
        "database.json",
        JSON.stringify({ users: usersData, last_id }),
        (err) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json({ msg: "A user has been deleted" });
          }
        }
      );
    }
  });
});

app.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const {name,email,password} = req.body
  fs.readFile("database.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    if (data) {
      const parsedData = JSON.parse(data);
      const users = parsedData["users"]
      const userIndex = users.findIndex((e)=>e.id == id)
      if(name !== undefined) {users[userIndex].name = name}
      if(email !== undefined) {users[userIndex].email = email}
      if(password !== undefined) {users[userIndex].password = password}
      fs.writeFile(
        "database.json",
        JSON.stringify({ users,last_id : parsedData['last_id'] }),
        (err) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json({ msg: "A user has been updated" });
          }
        }
      );
    }
  });
});
// Server
app.listen(port, () => console.log(`Server is running on port ${port}`));
