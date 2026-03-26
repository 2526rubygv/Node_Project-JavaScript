const express = require("express");
const convert = require("xml-js");

const app = express();
const PORT = 3000;

// permet rebre JSON
app.use(express.json());

// servir fitxers estàtics (HTML, JS, CSS)
app.use(express.static("public"));


// endpoint d'exemple
app.post("/convert", (req, res) => {
  const { data } = req.body;

  const result = data.toUpperCase(); // prova simple
  res.json({ result });
});

//=================funció a completar===========================================
app.post("/convertToXML", (req, res) => {
  const { data } = req.body;
  
  const obj = JSON.parse(data);
  let result1 = convert.json2xml(obj, { compact: true, spaces: 4 });
  const result = result1;
  res.json({ result });
});

app.post("/convertToJSON", (req, res) => {
  try {
    const { data } = req.body;
    console.log("XML rebut:", data);
    
    // Convertir XML a JSON
    const jsonObj = convert.xml2json(data, { compact: true, spaces: 4 });
    console.log("JSON generat:", jsonObj);
    
    const result = jsonObj;
    res.json({ result });
  } catch (error) {
    console.error("Error:", error.message);
    res.json({ result: "Error: XML inválid - " + error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor a http://localhost:${PORT}`);
});