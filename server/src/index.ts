import express from 'express';
import type { Request, Response } from 'express';
import cors from "cors";

const app = express();
app.use(cors());
const PORT = 3010;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.set('json spaces', 2);
app.get('/', (req: Request, res: Response) => {
    res.json({ status: 'live',stadtus: 'live',statuss: 'live',staetus: 'live'});
});