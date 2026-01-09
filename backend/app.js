import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./db.js";
import { triggerWebhook } from "./services/webhook.service.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/jobs", async (req, res) => {
  try {
    const { taskName, payload, priority } = req.body;

    if (!taskName || !priority) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // ✅ ALWAYS stringify payload
    const safePayload = JSON.stringify(payload || {});

    const [result] = await db.query(
      "INSERT INTO jobs (taskName, payload, priority) VALUES (?, ?, ?)",
      [taskName, safePayload, priority]
    );

    res.json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create job" });
  }
});


app.get("/jobs", async (req, res) => {
  let q = "SELECT * FROM jobs WHERE 1=1";
  const p = [];
  if (req.query.status) { q += " AND status=?"; p.push(req.query.status); }
  if (req.query.priority) { q += " AND priority=?"; p.push(req.query.priority); }
  const [rows] = await db.query(q, p);
  res.json(rows);
});

app.get("/jobs/:id", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM jobs WHERE id=?", [req.params.id]);
  if (!rows.length) return res.status(404).json({ error: "Not found" });
  res.json(rows[0]);
});

app.post("/run-job/:id", async (req, res) => {
  const id = req.params.id;
  await db.query("UPDATE jobs SET status='running' WHERE id=?", [id]);

  setTimeout(async () => {
    await db.query(
      "UPDATE jobs SET status='completed', completedAt=NOW() WHERE id=?",
      [id]
    );
    const [[job]] = await db.query("SELECT * FROM jobs WHERE id=?", [id]);
    await triggerWebhook(job);
  }, 3000);

  res.json({ message: "Job started" });
});

app.delete("/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM jobs WHERE id=?", [id]);
    res.json({ message: "Job deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete job" });
  }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Backend running on port", PORT);
});
