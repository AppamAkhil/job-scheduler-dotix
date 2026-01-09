"use client";
import { useState } from "react";
import { createJob } from "../services/api";

export default function JobForm({ onSuccess }: any) {
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("Low");
  const [payload, setPayload] = useState("{}");
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");

    let parsedPayload = {};

    try {
      parsedPayload = payload ? JSON.parse(payload) : {};
    } catch (err) {
      setError("Payload must be valid JSON");
      return;
    }

    if (!taskName.trim()) {
      setError("Task name is required");
      return;
    }

    await createJob({
      taskName,
      priority,
      payload: parsedPayload
    });

    setTaskName("");
    setPayload("{}");
    onSuccess();
  };

  return (
    <div className="border p-4 rounded mb-6">
      <h2 className="font-semibold mb-2">Create Job</h2>

      {error && (
        <p className="text-red-600 mb-2">{error}</p>
      )}

      <input
        className="border p-2 w-full mb-2"
        placeholder="Task Name"
        value={taskName}
        onChange={e => setTaskName(e.target.value)}
      />

      <select
        className="border p-2 w-full mb-2"
        value={priority}
        onChange={e => setPriority(e.target.value)}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <textarea
        className="border p-2 w-full mb-2 font-mono"
        rows={4}
        placeholder='Example: {"email":"a@b.com"}'
        value={payload}
        onChange={e => setPayload(e.target.value)}
      />

      <button
        onClick={submit}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Create Job
      </button>
    </div>
  );
}
