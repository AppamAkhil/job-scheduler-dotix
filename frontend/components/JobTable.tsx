"use client";
import Link from "next/link";
import { runJob, deleteJob } from "../services/api";

export default function JobTable({ jobs, refresh }: any) {
  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th>ID</th>
          <th>Task</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job: any) => (
          <tr key={job.id} className="text-center border-t">
            <td>{job.id}</td>
            <td>
              <Link className="text-blue-600" href={`/jobs/${job.id}`}>
                {job.taskName}
              </Link>
            </td>
            <td>{job.priority}</td>
            <td>{job.status}</td>
            <td>
              {job.status === "pending" && (
                <button
                  onClick={async () => {
                    await runJob(job.id);
                    setTimeout(() => {
      refresh(); // reload jobs after backend updates
    }, 500);
                  }}
                  className="text-green-600"
                >
                  Run
                </button>
              )}
              <button
    onClick={async () => {
      if (confirm("Delete this job?")) {
        await deleteJob(job.id);
        refresh();
      }
    }}
    className="text-red-600 ml-3"
  >
    Delete
  </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
