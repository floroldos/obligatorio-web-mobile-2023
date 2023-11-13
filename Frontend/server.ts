import * as express from 'express';
import mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
const app = express();

app.use(bodyParser.json());
app.use(cors());

const itemSchema = new mongoose.Schema({
  name: String,
  description: String
});

const Item = mongoose.model('Item', itemSchema);

app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find({});
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});


app.post('/api/items', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); // esto borro? si fleta el archivo entero