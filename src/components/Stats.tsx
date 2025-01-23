import { Card } from "@/components/ui/card";
import { Job } from "./JobCard";

interface StatsProps {
  jobs: Job[];
}

export function Stats({ jobs }: StatsProps) {
  const totalJobs = jobs.length;
  const pending = jobs.filter((job) => job.status === "pending").length;
  const applied = jobs.filter((job) => job.status === "applied").length;
  const answered = jobs.filter((job) => job.status === "answered").length;

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500">Total Jobs</h3>
        <p className="text-2xl font-bold">{totalJobs}</p>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500">Pending</h3>
        <p className="text-2xl font-bold">{pending}</p>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500">Applied</h3>
        <p className="text-2xl font-bold">{applied}</p>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500">Answered</h3>
        <p className="text-2xl font-bold">{answered}</p>
      </Card>
    </div>
  );
}