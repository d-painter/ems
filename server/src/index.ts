import express from 'express';
import cors from "cors";

const app = express();
app.use(cors());
const PORT = 3010;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Hello w');
});