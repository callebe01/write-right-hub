import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  // Writing state management for progressive disclosure
  const [isFocused, setIsFocused] = useState(false);
  const isWriting = currentWordCount > 0 || isFocused;
  const [showToolbar, setShowToolbar] = useState(true);

  // Milestone celebration state
  const [celebration, setCelebration] = useState<{ show: boolean; milestone: number; coins: number } | null>(null);
  const prevWordCountRef = useRef(0);
  const milestonesReached = useRef(new Set<number>());

  // Check for milestone achievements
  useEffect(() => {
    const milestones = [25, 50, 75, 100];
    const prevProgress = (prevWordCountRef.current / targetWords) * 100;
    const currentProgress = progressPercent;

    milestones.forEach((milestone) => {
      if (
        currentProgress >= milestone &&
        prevProgress < milestone &&
        !milestonesReached.current.has(milestone)
      ) {
        // Milestone reached!
        milestonesReached.current.add(milestone);
        const coinsEarned = milestone === 100 ? 10 : 5;
        setCelebration({ show: true, milestone, coins: coinsEarned });

        // Hide celebration after animation
        setTimeout(() => {
          setCelebration(null);
        }, 2000);
      }
    });

    prevWordCountRef.current = currentWordCount;
  }, [currentWordCount, targetWords, progressPercent]);

  return (
    <div className="h-full bg-spark-card-bg border-[4px] border-spark-card-border rounded-[26px] flex flex-col relative overflow-hidden">
      {/* Milestone Celebration Overlay */}
      <AnimatePresence>
        {celebration?.show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="bg-gradient-to-br from-spark-yellow to-yellow-500 text-spark-header-bg rounded-3xl px-12 py-8 shadow-2xl text-center"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              <h3 className="font-game text-4xl uppercase mb-2">
                {celebration.milestone}% Complete!
              </h3>
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-spark-coin-gold to-yellow-600 rounded-full"></div>
                  <div className="absolute inset-1 bg-gradient-to-br from-spark-coin-gold to-yellow-500 rounded-full"></div>
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-yellow-900 text-lg font-bold">$</div>
                </div>
                <span className="font-black text-3xl">+{celebration.coins}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Progress Bar Overlay (only visible when writing) */}
      {isWriting && (
        <div className="absolute top-0 left-0 right-0 z-30 bg-spark-card-bg/95 backdrop-blur-sm border-b border-spark-card-border px-5 py-2 transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-spark-progress-bg h-[5px] rounded-full overflow-hidden">
              <div
                className="bg-spark-yellow h-full rounded-r-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-white text-sm font-medium whitespace-nowrap">
              {currentWordCount}/{targetWords}
            </p>
          </div>
        </div>
      )}

      <div className={`flex flex-col h-full p-5 gap-3 transition-all duration-300 ${isWriting ? 'pt-14' : ''}`}>
        {/* Header: Title + Action Buttons */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1
              className={`font-game text-white uppercase leading-tight transition-all duration-300 ${
                isWriting ? 'text-[20px]' : 'text-[32px]'
              }`}
            >
              {assignment.title}
            </h1>

            {/* Progress Bar (only visible when NOT writing AND has content) */}
            {!isWriting && currentWordCount > 0 && (
              <div className="flex flex-col gap-1 mt-2">
                <div className="bg-spark-progress-bg h-[5px] rounded-full overflow-hidden">
                  <div
                    className="bg-spark-yellow h-full rounded-r-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="text-white text-sm">
                  {currentWordCount}/{targetWords} words
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons (top-right) */}
          <div className="flex gap-2 items-start flex-shrink-0">
            <motion.button
              onClick={onViewInstructions}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-[#c9d650] text-[#c9d650] rounded-full px-4 py-2 font-bold text-sm hover:bg-[#c9d650]/10 transition-colors"
            >
              View Instructions
            </motion.button>
            <motion.button
              onClick={onGrade}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`bg-spark-yellow hover:bg-spark-yellow/90 text-spark-header-bg font-bold rounded-full uppercase tracking-wide transition-colors duration-200 shadow-lg border-2 border-spark-header-bg ${
                isWriting ? 'text-xs py-2 px-4' : 'text-sm py-2 px-5'
              }`}
            >
              Grade It
            </motion.button>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 bg-spark-progress-bg border border-spark-progress-bg rounded-[15px] flex flex-col overflow-hidden">
          {/* Toolbar */}
          <div
            className={`border-b border-spark-card-bg px-3 flex items-center gap-2 flex-wrap transition-all duration-300 origin-top ${
              showToolbar ? 'py-2.5 opacity-100' : 'py-0 h-0 opacity-0 overflow-hidden'
            }`}
          >
            {/* Toolbar Toggle Button */}
            <button
              onClick={() => setShowToolbar(!showToolbar)}
              className="text-gray-400 hover:text-white text-xs font-medium px-2 py-1 rounded hover:bg-white/10 transition-colors"
              title={showToolbar ? "Hide toolbar" : "Show toolbar"}
            >
              Format {showToolbar ? '▲' : '▼'}
            </button>

            <div className="w-px h-6 bg-white/20" />

            {/* Font Selector */}
            <select className="bg-spark-progress-bg border border-spark-card-border rounded-lg px-3 py-1.5 text-white text-sm font-medium cursor-pointer">
              <option>Lexend</option>
              <option>Georgia</option>
              <option>Arial</option>
            </select>

            {/* Size Selector */}
            <select className="bg-spark-progress-bg border border-spark-card-border rounded-lg px-3 py-1.5 text-white text-sm font-medium cursor-pointer w-20">
              <option>16px</option>
              <option>14px</option>
              <option>18px</option>
              <option>20px</option>
            </select>

            {/* Formatting Buttons */}
            <div className="flex items-center gap-0.5">
              <button className="p-1.5 rounded hover:bg-white/10 transition-colors" title="Bold">
                <Bold className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-1.5 rounded hover:bg-white/10 transition-colors" title="Italic">
                <Italic className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-1.5 rounded hover:bg-white/10 transition-colors" title="Underline">
                <Underline className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            <div className="w-px h-6 bg-white/20" />

            {/* Color Picker */}
            <button className="w-7 h-7 rounded-full bg-gray-900 border-2 border-white/20 hover:border-white/40 transition-colors" title="Text color">
              <div className="w-3 h-3 rounded-full bg-gray-900 mx-auto" />
            </button>

            <div className="w-px h-6 bg-white/20" />

            {/* Alignment */}
            <div className="flex items-center gap-0.5">
              <button className="p-1.5 rounded hover:bg-white/10 transition-colors" title="Align left">
                <AlignLeft className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-1.5 rounded hover:bg-white/10 transition-colors" title="Align center">
                <AlignCenter className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-1.5 rounded hover:bg-white/10 transition-colors" title="Bullet list">
                <List className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            <div className="w-px h-6 bg-white/20" />

            {/* Insert */}
            <div className="flex items-center gap-0.5">
              <button className="p-1.5 rounded hover:bg-white/10 transition-colors" title="Insert link">
                <Link2 className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-1.5 rounded hover:bg-white/10 transition-colors" title="Insert image">
                <Image className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            <div className="w-px h-6 bg-white/20" />

            {/* AI Generate */}
            <button className="p-1.5 rounded hover:bg-white/10 transition-colors" title="AI Generate">
              <Sparkles className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Format Toggle (when toolbar is hidden) */}
          {!showToolbar && (
            <div className="border-b border-spark-card-bg px-3 py-2">
              <button
                onClick={() => setShowToolbar(true)}
                className="text-gray-400 hover:text-white text-xs font-medium px-2 py-1 rounded hover:bg-white/10 transition-colors"
              >
                Format ▼
              </button>
            </div>
          )}

          {/* Textarea */}
          <textarea
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Start writing..."
            className="flex-1 p-4 bg-transparent text-white text-base resize-none outline-none font-body leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
};

export default WritingEditor;
