import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function AiAssistant() {
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!jobDescription || !resume) {
      toast({
        title: "Missing Information",
        description: "Please provide both job description and resume",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    // TODO: Implement AI generation logic
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay
    setIsGenerating(false);
    
    toast({
      title: "Documents Generated",
      description: "Your tailored resume and cover letter are ready!",
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">AI Assistant</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Job Description
          </label>
          <Textarea
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Your Current Resume
          </label>
          <Textarea
            placeholder="Paste your current resume here..."
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        <div className="flex space-x-4">
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate Documents
          </Button>
          <Button variant="outline" disabled={isGenerating}>
            <Download className="mr-2 h-4 w-4" />
            Save Documents
          </Button>
        </div>
      </div>
    </Card>
  );
}