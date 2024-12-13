const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

let items = [];

// curl -X GET http://localhost:3000/
app.get("/", (req, res) => {
  res.set("Content-type", "application/json");

  res.send(
    JSON.stringify({
      items,
    })
  );
});

//  curl -X POST http://localhost:3000/?item=ITEM
app.post("/", (req, res) => {
  const item = req.query.item || "dude";
  items.push(item);

  res.set("Content-type", "application/json");
  res.send(
    JSON.stringify({
      response: `Added ${item}!`,
      items: items,
    })
  );
});

app.post("/add-item", (req, res) => {
  const item = req.body.item || "dude";
  items.push(item);

  res.set("Content-type", "application/json");
  res.send(
    JSON.stringify({
      resonse: `Added ${item}!`,
      items: items,
    })
  );
});

//  curl -X PUT http://localhost:3000/OLDITEM?newItem=NEWITEM
app.put("/:item", (req, res) => {
  const itemToUpdate = req.params.item;
  const newitem = req.query.newitem;

  const index = items.indexOf(itemToUpdate);

  if (index !== -1) {
    items[index] = newitem;

    res.status(200).json({
      message: `${itemToUpdate} updated successfully to ${newitem}`,
      updateditems: items,
    });
  } else {
    res.status(404).json({
      error: `item ${itemToUpdate} not found`,
    });
  }
});

//  curl -X DELETE http://localhost:3000/ITEM
app.delete("/:item", (req, res) => {
  const itemToDelete = req.params.item;

  const index = items.indexOf(itemToDelete);

  if (index !== -1) {
    items.splice(index, 1);

    res.status(200).json({
      message: `${itemToDelete} deleted successfully`,
      remainingitems: items,
    });
  } else {
    res.status(404).json({
      error: `item ${itemToDelete} not found`,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
