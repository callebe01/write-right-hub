import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { assignments } from "./Index";
import Header from "@/components/Header";
import DecorativeDots from "@/components/DecorativeDots";
import WritingEditor from "@/components/WritingEditor";
import SageChat from "@/components/SageChat";
import InstructionsModal from "@/components/InstructionsModal";

const QuestWriter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const assignment = assignments.find((a) => a.id === Number(id));

  const [editorContent, setEditorContent] = useState("");
  const [isInstructionsModalOpen, setIsInstructionsModalOpen] = useState(false);
  const [isSageTyping, setIsSageTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{
    id: number;
    sender: "sage" | "student";
    text: string;
    timestamp: Date;
  }>>([
    {
      id: 1,
      sender: "sage" as const,
      text: "Let's get started—this is going to be good.",
      timestamp: new Date()
    }
  ]);

  if (!assignment) {
    return (
      <div className="min-h-screen bg-spark-main-bg flex items-center justify-center">
        <div className="text-white text-2xl">Quest not found</div>
      </div>
    );
  }

  const handleSendMessage = (message: string) => {
    // Add student message
    const studentMessage = {
      id: chatMessages.length + 1,
      sender: "student" as const,
      text: message,
      timestamp: new Date()
    };
    setChatMessages([...chatMessages, studentMessage]);

    // Show typing indicator
    setIsSageTyping(true);

    // Mock Sage response (after a brief delay)
    setTimeout(() => {
      const sageResponses = [
        "That's a great question! Let me help you with that.",
        "Good thinking! Try describing what you see in more detail.",
        "You're on the right track! What else can you add?",
        "Let's break this down together. What's the main point you want to make?",
        "Nice work! Keep going—you're doing great!",
        "I love where you're going with this! Here's some detailed feedback to help you level up your writing: First, consider adding more sensory details—what do you hear, smell, or feel in this moment? Second, think about showing emotions through actions rather than just stating them. For example, instead of saying 'I was nervous,' you could describe your sweaty palms or racing heartbeat. Third, vary your sentence structure to create rhythm and keep your reader engaged. You've got short, punchy sentences and longer, flowing ones—mix them up! Finally, remember that every detail should serve your story. Ask yourself: does this help my reader understand the scene or my character better? You're doing amazing work, and these tweaks will make it even stronger!"
      ];

      const randomResponse = sageResponses[Math.floor(Math.random() * sageResponses.length)];

      const sageMessage = {
        id: chatMessages.length + 2,
        sender: "sage" as const,
        text: randomResponse,
        timestamp: new Date()
      };

      // Hide typing indicator and add message
      setIsSageTyping(false);
      setChatMessages(prev => [...prev, sageMessage]);
    }, 1500);
  };

  const handleGradeIt = () => {
    // TODO: Implement grading flow
    console.log("Grade it clicked!", editorContent);
  };

  return (
    <div className="min-h-screen bg-spark-main-atmospheric relative overflow-hidden flex flex-col">
      <DecorativeDots />
      <Header />

      <main className="relative z-10 flex-1 flex items-center justify-center py-3 px-6">
        <div className="w-full max-w-[1400px] h-[calc(100vh-110px)] flex gap-6">
          {/* Left Panel - Writing Editor */}
          <div className="flex-1">
            <WritingEditor
              assignment={assignment}
              content={editorContent}
              onContentChange={setEditorContent}
              onGrade={handleGradeIt}
              onViewInstructions={() => setIsInstructionsModalOpen(true)}
            />
          </div>

          {/* Right Panel - Sage Chat */}
          <div className="w-[432px]">
            <SageChat
              messages={chatMessages}
              onSendMessage={handleSendMessage}
              isTyping={isSageTyping}
            />
          </div>
        </div>
      </main>

      {/* Instructions Modal */}
      <InstructionsModal
        isOpen={isInstructionsModalOpen}
        onClose={() => setIsInstructionsModalOpen(false)}
        assignment={assignment}
      />
    </div>
  );
};

export default QuestWriter;
