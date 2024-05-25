import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js"
import router from "./routes/router.js"
import cors from "cors"

// Je créé une application express
const app = express();

// Je connecte avec ma DB
connectDB

// Pour lire le contenu du fichier .env
dotenv.config();


app.use(express.json()) // Pour convertir la req.body qui est en json
app.use(express.urlencoded({extended: true})) // Pour déchiffrer la méthode POST
app.use(express.static("public")) // Pour créer des routes des fichiers à l'intérieur du dossier
app.use(cors({
    origin: "http://alinarusnac.ide.3wa.io:3000"
}))

// Pour que tous mes routeurs commencent par le préfixe "api"
// Exemple: http://localhost:9000/api/destination/new
app.use("/api", router)


app.listen(process.env.PORT || 9000, () => {
    console.log(`Server is running: ${process.env.BASE_URL}`);
})