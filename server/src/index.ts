import express from 'express';

const app = express();

const PORT = 3010;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Hello');
});