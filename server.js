import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import charactersRoutes from "./src/routes/charactersRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import rickAndMortyRoutes from "./src/routes/rickAndMortyRoutes.js";


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS middleware (should be placed before routes)
app.use(cors({
  origin: ["http://localhost:3000","https://rickmort-frontend-21m679qs3-piyushs-projects-1d4ee47d.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Define API routes
app.use("/api/characters", charactersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/rickandmorty", rickAndMortyRoutes);


// ✅ Test route to check if the server is running
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// ✅ Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
