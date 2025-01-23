import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Upload, Loader2, Download } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function Assistant() {
  const [linkedinUrl, setLinkedinUrl] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [resume, setResume] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // TODO: Implement file upload logic
      console.log("File uploaded:", file.name)
    }
  }

  const handleGenerate = async () => {
    if (!jobDescription || !resume) {
      toast({
        title: "Missing Information",
        description: "Please provide both job description and resume",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    // TODO: Implement AI generation logic
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulated delay
    setIsGenerating(false)
    
    toast({
      title: "Documents Generated",
      description: "Your tailored resume and cover letter are ready!",
    })
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">AI Assistant</h1>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">LinkedIn Profile</h2>
            <Input
              placeholder="Enter your LinkedIn URL"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
            />
          </Card>

          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Upload Documents</h2>
            <div className="space-y-4">
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <Button
                variant="outline"
                className="w-full"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Resume/Cover Letter
              </Button>
            </div>
          </Card>

          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Job Description</h2>
            <Textarea
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-[200px]"
            />
          </Card>

          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Your Current Resume</h2>
            <Textarea
              placeholder="Paste your current resume here..."
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              className="min-h-[200px]"
            />
          </Card>

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

        <div className="space-y-6">
          <Card className="p-4 h-full">
            <h2 className="text-lg font-semibold mb-4">Generated Documents</h2>
            <p className="text-muted-foreground">
              Your generated documents will appear here...
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}