import { useState } from "react";
import { Job, JobCard } from "@/components/JobCard";
import { AiAssistant } from "@/components/AiAssistant";
import { Stats } from "@/components/Stats";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const initialJobs: Job[] = [
  {
    id: "1",
    company: "Tech Corp",
    position: "Senior Frontend Developer",
    status: "notApplied",
    dateAdded: "2024-02-20",
    dateModified: "2024-02-20",
  },
  {
    id: "2",
    company: "Startup Inc",
    position: "Full Stack Engineer",
    status: "applied",
    dateAdded: "2024-02-19",
    dateModified: "2024-02-19",
  },
  {
    id: "3",
    company: "Big Tech Co",
    position: "Software Engineer",
    status: "pending",
    dateAdded: "2024-02-18",
    dateModified: "2024-02-18",
  },
];

const Index = () => {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  const moveJob = (jobId: string, direction: "left" | "right") => {
    const statusOrder = ["notApplied", "applied", "pending"];
    setJobs((currentJobs) => {
      return currentJobs.map((job) => {
        if (job.id === jobId) {
          const currentIndex = statusOrder.indexOf(job.status);
          const newIndex =
            direction === "right"
              ? Math.min(currentIndex + 1, statusOrder.length - 1)
              : Math.max(currentIndex - 1, 0);
          return {
            ...job,
            status: statusOrder[newIndex] as Job["status"],
            dateModified: new Date().toISOString(),
          };
        }
        return job;
      });
    });
  };

  const jobsByStatus = {
    notApplied: jobs.filter((job) => job.status === "notApplied"),
    applied: jobs.filter((job) => job.status === "applied"),
    pending: jobs.filter((job) => job.status === "pending"),
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Job Applications Dashboard</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Job
          </Button>
        </div>

        <Stats jobs={jobs} />

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">Not Applied</h2>
            {jobsByStatus.notApplied.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onMoveRight={() => moveJob(job.id, "right")}
              />
            ))}
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Applied</h2>
            {jobsByStatus.applied.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onMoveLeft={() => moveJob(job.id, "left")}
                onMoveRight={() => moveJob(job.id, "right")}
              />
            ))}
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Pending Response</h2>
            {jobsByStatus.pending.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onMoveLeft={() => moveJob(job.id, "left")}
              />
            ))}
          </div>
        </div>

        <AiAssistant />
      </div>
    </div>
  );
};

export default Index;