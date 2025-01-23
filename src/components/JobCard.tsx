import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Building2, Calendar } from "lucide-react";

export interface Job {
  id: string;
  company: string;
  position: string;
  description?: string;
  status: "pending" | "applied" | "answered";
  dateAdded: string;
  dateModified: string;
}

interface JobCardProps {
  job: Job;
  onMoveLeft?: () => void;
  onMoveRight?: () => void;
}

export function JobCard({ job, onMoveLeft, onMoveRight }: JobCardProps) {
  const statusColors = {
    pending: "bg-job-notApplied",
    applied: "bg-job-applied",
    answered: "bg-job-pending",
  };

  return (
    <Card className={`${statusColors[job.status]} p-4 mb-4 shadow-md`}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-lg">{job.position}</h3>
          <div className="flex items-center text-gray-600 text-sm">
            <Building2 className="w-4 h-4 mr-1" />
            <span>{job.company}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          {onMoveLeft && (
            <Button variant="ghost" size="icon" onClick={onMoveLeft}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          {onMoveRight && (
            <Button variant="ghost" size="icon" onClick={onMoveRight}>
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      <div className="flex items-center text-gray-600 text-sm">
        <Calendar className="w-4 h-4 mr-1" />
        <span>Added: {new Date(job.dateAdded).toLocaleDateString()}</span>
      </div>
    </Card>
  );
}