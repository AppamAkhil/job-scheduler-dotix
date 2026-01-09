"use client";
import { useEffect, useState } from "react";
import { getJob } from "../../../services/api";

export default function JobDetail({ params }: any) {
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    getJob(params.id).then(setJob);
  }, []);

  if (!job) return null;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Job Details</h1>

      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(job, null, 2)}
      </pre>
    </div>
  );
}
