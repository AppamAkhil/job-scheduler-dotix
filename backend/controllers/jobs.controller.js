import { db } from "../db.js";
import { triggerWebhook } from "../services/webhook.service.js";

export async function createJob(req, res) {
  const { taskName, payload, priority } = req.body;

  if (!taskName || !priority) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const [result] = await db.query(
    "INSERT INTO jobs (taskName, payload, priority) VALUES (?, ?, ?)",
    [taskName, payload || {}, priority]
  );

  res.json({ id: result.insertId });
}

export async function getJobs(req, res) {
  let query = "SELECT * FROM jobs WHERE 1=1";
  const params = [];

  if (req.query.status) {
    query += " AND status=?";
    params.push(req.query.status);
  }
  if (req.query.priority) {
    query += " AND priority=?";
    params.push(req.query.priority);
  }

  const [jobs] = await db.query(query, params);
  res.json(jobs);
}

export async function getJobById(req, res) {
  const [rows] = await db.query("SELECT * FROM jobs WHERE id=?", [req.params.id]);
  if (!rows.length) return res.status(404).json({ error: "Not found" });
  res.json(rows[0]);
}

export async function runJob(req, res) {
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
}
