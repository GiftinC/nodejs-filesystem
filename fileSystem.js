//imports:
import fs from "fs";
import express from "express";

//Server Creation:
const server = express();

//PORT Number:
const PORT = 4500;

//Listening to Server on PORT Number:
server.listen(PORT, () => {
  console.log(`Server Listening at http://localhost:${PORT}`);
});

//Create Files Function:
const createFiles = (path, filename, contents, cbFn = () => {}) => {
  if (!fs.existsSync(path)) {
    fs.mkdir(path, () => console.log("created Folder"));
  }

  fs.writeFile(`${path}/${filename}`, contents, cbFn);
};

//Get Files Function:
const getFiles = (path, successFn, errorFn) => {
  fs.readdir(path, (err, data) => {
    // sourcery skip: use-braces
    if (err) {
      errorFn();
    } else successFn(data);
  });
};

//POST:
server.post("/create-files", (req, res) => {
  const date = new Date();
  const timeStamp = date.getTime().toString();

  const ISODateTime = date.toISOString().replaceAll(":", "-").split(".")[0];

  createFiles("./generated", `${ISODateTime}.txt`, timeStamp, () =>
    res.status(201).json({ msg: "created Files" })
  );
});

//GET:
server.get("/get-files", (req, res) => {
  getFiles(
    "./generated",
    (data) => res.json(data),
    () => res.status(500).json({ msg: "Something Went Wrong" })
  );
});
