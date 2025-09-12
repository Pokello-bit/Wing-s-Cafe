// ----------------------
// Required Modules
// ----------------------
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// ----------------------
// Data Files
// ----------------------
const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

const productsFile = path.join(dataDir, "products.json");
const salesFile    = path.join(dataDir, "sales.json");

if (!fs.existsSync(productsFile)) fs.writeFileSync(productsFile, JSON.stringify([], null, 2));
if (!fs.existsSync(salesFile))    fs.writeFileSync(salesFile, JSON.stringify([], null, 2));

function readJSON(file) {
  try { return JSON.parse(fs.readFileSync(file, "utf8")); }
  catch { return []; }
}
function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// ----------------------
// Routes
// ----------------------
app.get("/", (_, res) => res.send("🛠️ Wings Café Inventory API running."));

app.get("/products", (_, res) => res.json(readJSON(productsFile)));

app.post("/products", (req, res) => {
  const { name, description, category, price, quantity, image } = req.body;
  if (!name || !category || isNaN(price) || isNaN(quantity)) {
    return res.status(400).json({ message: "Invalid product data" });
  }
  const products = readJSON(productsFile);
  const newProduct = {
    id: Date.now(),
    name,
    description: description || "",
    category,
    price: Number(price),
    quantity: Number(quantity),
    image: image || ""          // ✅ save image link
  };
  products.push(newProduct);
  writeJSON(productsFile, products);
  res.status(201).json(newProduct);
});

app.put("/products/:id", (req, res) => {
  const products = readJSON(productsFile);
  const id = Number(req.params.id);
  const idx = products.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ message: "Product not found" });

  products[idx] = { ...products[idx], ...req.body }; // includes image if sent
  writeJSON(productsFile, products);
  res.json(products[idx]);
});

app.delete("/products/:id", (req, res) => {
  const products = readJSON(productsFile);
  const id = Number(req.params.id);
  const idx = products.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ message: "Product not found" });

  const [deleted] = products.splice(idx, 1);
  writeJSON(productsFile, products);
  res.json({ message: "Deleted", deleted });
});

// ----- Sales -----
app.get("/sales", (_, res) => res.json(readJSON(salesFile)));
app.post("/sales", (req, res) => {
  const { items, total } = req.body;
  if (!Array.isArray(items) || typeof total !== "number") {
    return res.status(400).json({ message: "Invalid sale data" });
  }
  const sales = readJSON(salesFile);
  const newSale = { id: Date.now(), date: new Date().toISOString(), items, total };
  sales.push(newSale);
  writeJSON(salesFile, sales);
  res.status(201).json(newSale);
});

app.listen(5000, () => console.log("✅ Server running at http://localhost:5000"));
