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
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "sage",
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
      sender: "student",
      text: message,
      timestamp: new Date()
    };
    setChatMessages([...chatMessages, studentMessage]);

    // Mock Sage response (after a brief delay)
    setTimeout(() => {
      const sageResponses = [
        "That's a great question! Let me help you with that.",
        "Good thinking! Try describing what you see in more detail.",
        "You're on the right track! What else can you add?",
        "Let's break this down together. What's the main point you want to make?",
        "Nice work! Keep going—you're doing great!"
      ];

      const randomResponse = sageResponses[Math.floor(Math.random() * sageResponses.length)];

      const sageMessage = {
        id: chatMessages.length + 2,
        sender: "sage",
        text: randomResponse,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, sageMessage]);
    }, 1000);
  };

  const handleGradeIt = () => {
    // TODO: Implement grading flow
    console.log("Grade it clicked!", editorContent);
  };

  return (
    <div className="min-h-screen bg-spark-main-bg relative overflow-hidden flex flex-col">
      <DecorativeDots />
      <Header />

      <main className="relative z-10 flex-1 flex items-center justify-center py-6 px-6">
        <div className="w-full max-w-[1400px] h-[calc(100vh-150px)] flex gap-6">
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
