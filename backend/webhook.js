import axios from "axios";

export async function triggerWebhook(job) {
  try {
    await axios.post(process.env.WEBHOOK_URL, {
      jobId: job.id,
      taskName: job.taskName,
      priority: job.priority,
      payload: job.payload,
      completedAt: new Date()
    });
    console.log("Webhook sent");
  } catch (err) {
    console.error("Webhook failed", err.message);
  }
}
