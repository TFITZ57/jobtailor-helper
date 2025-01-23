import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Job, JobCard } from "@/components/JobCard";
import { Stats } from "@/components/Stats";
import { Button } from "@/components/ui/button";
import { Plus, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { AddJobModal } from "@/components/AddJobModal";
import { AuthError } from "@supabase/supabase-js";

const initialJobs: Job[] = [
  {
    id: "1",
    company: "Tech Corp",
    position: "Senior Frontend Developer",
    status: "pending",
    dateAdded: "2024-02-20",
    dateModified: "2024-02-20",
  },
  {
    id: "2",
    company: "Startup Inc",
    position: "Full Stack Engineer",
    status: "pending",
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
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAddJob = (newJob: Omit<Job, "id" | "dateAdded" | "dateModified">) => {
    const job: Job = {
      ...newJob,
      id: crypto.randomUUID(),
      dateAdded: new Date().toISOString(),
      dateModified: new Date().toISOString(),
    };
    setJobs(prev => [...prev, job]);
  };

  const moveJob = (jobId: string, direction: "left" | "right") => {
    const statusOrder = ["pending", "applied", "answered"];
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

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/auth");
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: (error as AuthError).message,
        variant: "destructive",
      });
    }
  };

  const jobsByStatus = {
    pending: jobs.filter((job) => job.status === "pending"),
    applied: jobs.filter((job) => job.status === "applied"),
    answered: jobs.filter((job) => job.status === "answered"),
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Job Applications Dashboard</h1>
          <div className="flex gap-4">
            <AddJobModal onAddJob={handleAddJob} />
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <Stats jobs={jobs} />

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">Pending</h2>
            {jobsByStatus.pending.map((job) => (
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
            <h2 className="text-lg font-semibold mb-4">Answered</h2>
            {jobsByStatus.answered.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onMoveLeft={() => moveJob(job.id, "left")}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;