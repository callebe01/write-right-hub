import { Bold, Italic, Underline, List, AlignLeft, AlignCenter, Link2, Image, Sparkles } from "lucide-react";

interface WritingEditorProps {
  assignment: {
    title: string;
    wordCount: string;
    type: string;
  };
  content: string;
  onContentChange: (content: string) => void;
  onGrade: () => void;
  onViewInstructions: () => void;
}

const WritingEditor = ({
  assignment,
  content,
  onContentChange,
  onGrade,
  onViewInstructions
}: WritingEditorProps) => {
  // Extract target word count from assignment
  const targetWords = parseInt(assignment.wordCount.split(" ")[0]);

  // Calculate current word count
  const currentWordCount = content.trim().length === 0
    ? 0
    : content.trim().split(/\s+/).length;

  // Calculate progress percentage
  const progressPercent = Math.min((currentWordCount / targetWords) * 100, 100);

  return (
    <div className="h-full bg-spark-card-bg border-[7px] border-spark-card-border rounded-[26px] flex flex-col relative">
      {/* View Instructions Button */}
      <button
        onClick={onViewInstructions}
        className="absolute top-8 right-8 border-2 border-[#c9d650] text-[#c9d650] rounded-full px-4 py-2 font-bold text-sm hover:bg-[#c9d650]/10 transition-colors z-10"
      >
        View Instructions
      </button>

      <div className="flex flex-col h-full p-9 gap-4">
        {/* Title */}
        <div>
          <h1 className="font-game text-[44px] text-white uppercase leading-tight">
            {assignment.title}
          </h1>
        </div>

        {/* Progress Bar */}
        <div className="flex flex-col gap-1">
          <div className="bg-spark-progress-bg h-[7px] rounded-full overflow-hidden">
            <div
              className="bg-spark-yellow h-full rounded-r-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-white text-base">
            {currentWordCount}/{targetWords} words
          </p>
        </div>

        {/* Editor Area */}
        <div className="flex-1 bg-spark-progress-bg border border-spark-progress-bg rounded-[15px] flex flex-col overflow-hidden">
          {/* Toolbar */}
          <div className="border-b border-spark-card-bg px-3 py-2.5 flex items-center gap-2 flex-wrap">
            {/* Font Selector */}
            <select className="bg-spark-progress-bg border border-spark-card-border rounded-lg px-3 py-2 text-white text-sm font-medium cursor-pointer">
              <option>Inter</option>
              <option>Arial</option>
              <option>Georgia</option>
            </select>

            {/* Size Selector */}
            <select className="bg-spark-progress-bg border border-spark-card-border rounded-lg px-3 py-2 text-white text-sm font-medium cursor-pointer w-20">
              <option>16px</option>
              <option>14px</option>
              <option>18px</option>
              <option>20px</option>
            </select>

            {/* Formatting Buttons */}
            <div className="flex items-center gap-0.5">
              <button className="p-1.5 rounded hover:bg-white/10 transition-colors" title="Bold">
                <Bold className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-1.5 rounded hover:bg-white/10 transition-colors" title="Italic">
                <Italic className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-1.5 rounded hover:bg-white/10 transition-colors" title="Underline">
                <Underline className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="w-px h-8 bg-white/20" />

            {/* Color Picker */}
            <button className="w-8 h-8 rounded-full bg-gray-900 border-2 border-white/20 hover:border-white/40 transition-colors" title="Text color">
              <div className="w-4 h-4 rounded-full bg-gray-900 mx-auto" />
            </button>

            <div className="w-px h-8 bg-white/20" />

            {/* Alignment */}
            <div className="flex items-center gap-0.5">
              <button className="p-1.5 rounded hover:bg-white/10 transition-colors" title="Align left">
                <AlignLeft className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-1.5 rounded hover:bg-white/10 transition-colors" title="Align center">
                <AlignCenter className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-1.5 rounded hover:bg-white/10 transition-colors" title="Bullet list">
                <List className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="w-px h-8 bg-white/20" />

            {/* Insert */}
            <div className="flex items-center gap-0.5">
              <button className="p-1.5 rounded hover:bg-white/10 transition-colors" title="Insert link">
                <Link2 className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-1.5 rounded hover:bg-white/10 transition-colors" title="Insert image">
                <Image className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="w-px h-8 bg-white/20" />

            {/* AI Generate */}
            <button className="p-1.5 rounded hover:bg-white/10 transition-colors" title="AI Generate">
              <Sparkles className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Textarea */}
          <textarea
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder="Start writing..."
            className="flex-1 p-4 bg-transparent text-white text-base resize-none outline-none font-sans"
            style={{ fontFamily: 'Inter, sans-serif' }}
          />
        </div>

        {/* Grade It Button */}
        <button
          onClick={onGrade}
          className="bg-spark-yellow hover:bg-spark-yellow/90 text-spark-header-bg font-bold text-base py-3 px-6 rounded-full uppercase tracking-wide transition-all duration-200 shadow-lg border-2 border-spark-header-bg"
        >
          Grade It
        </button>
      </div>
    </div>
  );
};

export default WritingEditor;
