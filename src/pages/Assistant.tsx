import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Upload } from "lucide-react"

export default function Assistant() {
  const [linkedinUrl, setLinkedinUrl] = useState("")
  const [jobDescription, setJobDescription] = useState("")

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      console.log("File uploaded:", file.name)
      // TODO: Implement file upload logic
    }
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