import * as express from "express";

const app = express();
app.use(express.static("dist"));
app.use((req, res) => res.sendFile(`dist/index.html`));
app.listen(process.env.PORT || 8080, () => {
    // tslint:disable-next-line: no-console
    console.log("Carnelian website listening on port " + (process.env.PORT || 8080));
});
