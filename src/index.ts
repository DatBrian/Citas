import express from "express";

const app = express();

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

app.listen(port, () => {
    console.log(`listening on http://${host}:${port}`);
})