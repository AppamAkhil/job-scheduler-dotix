"use client";
import { useEffect, useState } from "react";
import { fetchJobs } from "../services/api";
import JobForm from "../components/JobForm";
import JobTable from "../components/JobTable";

export default function Home() {
  const [jobs, setJobs] = useState([]);

  const load = async () => {
    const data = await fetchJobs();
    setJobs(data);
  };

  useEffect(() => {
    load();
     const interval = setInterval(load, 2000);
  return () => clearInterval(interval);
  }, []);
  return (
    <main className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Job Scheduler Dashboard
      </h1>

      <JobForm onSuccess={load} />
      <JobTable jobs={jobs} refresh={load} />
    </main>
  );
}
