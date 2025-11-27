import timeTravelerImage from "@/assets/time-traveler.png";
import pioneerLifeImage from "@/assets/pioneer-life.png";
import miFamiliaImage from "@/assets/mi-familia.png";
import californiaGoldImage from "@/assets/california-gold.png";

export interface Quest {
  id: number;
  title: string;
  description: string;
  image: string;
  gradeLevel: string;
  subject: string;
  type: string;
  wordCount: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic';
  features: string[];
  instructions: string[];
}

export const QUEST_LIBRARY: Quest[] = [
  {
    id: 1,
    title: "Passion Paragraph",
    description: "Write a short paragraph describing your favorite hobby or activity. Include a clear topic sentence introducing your hobby or activity. Then, give at least three details or reasons...",
    image: californiaGoldImage,
    gradeLevel: "3rd-5th",
    subject: "Writing",
    type: "Quick Write",
    wordCount: "100 words",
    points: 20,
    difficulty: 'easy',
    rarity: "uncommon",
    features: ["📝 Creative", "⚡ Quick", "🎯 Focus Practice"],
    instructions: [
      "Write a short paragraph describing your favorite hobby or activity. Include a clear topic sentence introducing your hobby or activity.",
      "Then, give at least three details or reasons why you enjoy it. Use descriptive words to help your reader understand what makes this activity special to you.",
      "Remember to end with a concluding sentence that wraps up your thoughts!"
    ]
  },
  {
    id: 2,
    title: "Best Day Ever",
    description: "Imagine your perfect day from the moment you wake up until you go to bed. Think about what you would do, who you'd spend time with, and where you'd go. In your essay, remember to...",
    image: miFamiliaImage,
    gradeLevel: "3rd-5th",
    subject: "Creative Writing",
    type: "Essay",
    wordCount: "500 words",
    points: 20,
    difficulty: 'easy',
    rarity: "uncommon",
    features: ["✨ Imagination", "📖 Storytelling", "💭 Personal"],
    instructions: [
      "Imagine your perfect day from the moment you wake up until you go to bed. Think about what you would do, who you'd spend time with, and where you'd go.",
      "In your essay, remember to include sensory details (what you see, hear, smell, taste, and touch) to make your writing come alive.",
      "Organize your essay with a clear beginning, middle, and end. Use transition words like 'first,' 'next,' and 'finally' to guide your reader through your perfect day."
    ]
  },
  {
    id: 3,
    title: "History Maker",
    description: "Write a short paragraph about an important person in your local community or in history. First, state the person's name and explain what they are famous for. Next, describe why thi...",
    image: timeTravelerImage,
    gradeLevel: "6th-8th",
    subject: "History",
    type: "Quick Write",
    wordCount: "100 words",
    points: 20,
    difficulty: 'medium',
    rarity: "uncommon",
    features: ["🎓 Research", "🌟 Biography", "💡 Learning"],
    instructions: [
      "Write a short paragraph about an important person in your local community or in history. First, state the person's name and explain what they are famous for.",
      "Next, describe why this person's contributions matter and how they have impacted others.",
      "Use specific facts and details from your research. Include proper citations if you use information from sources."
    ]
  },
  {
    id: 4,
    title: "Animal Journey",
    description: "Write a short paragraph about an animal's life cycle. First, name the animal and where it lives. Next, describe the stages of its life from birth to adulthood. Finally, explain...",
    image: californiaGoldImage,
    gradeLevel: "3rd-5th",
    subject: "Science",
    type: "Paragraph",
    wordCount: "150 words",
    points: 30,
    difficulty: 'easy',
    rarity: "rare",
    features: ["🔬 Science", "🐾 Animals", "🌱 Life Cycles"],
    instructions: [
      "Write a short paragraph about an animal's life cycle. First, name the animal and where it lives.",
      "Next, describe the stages of its life from birth to adulthood. Include interesting facts about how the animal changes and grows.",
      "Finally, explain one way this animal is important to its ecosystem. Use scientific vocabulary and clear explanations."
    ]
  },
  {
    id: 5,
    title: "Animal for a Day",
    description: "Imagine you could become your favorite animal for a day! Write a story about your adventure experiencing life from that animal's point of view. What would you do? Where would you...",
    image: pioneerLifeImage,
    gradeLevel: "4th-6th",
    subject: "Creative Writing",
    type: "Story",
    wordCount: "300 words",
    points: 30,
    difficulty: 'medium',
    rarity: "rare",
    features: ["🦁 Adventure", "🎭 Perspective", "🌍 Exploration"],
    instructions: [
      "Imagine you could become your favorite animal for a day! Write a story about your adventure experiencing life from that animal's point of view.",
      "What would you do? Where would you go? What challenges would you face? Include dialogue and descriptive details to bring your animal character to life.",
      "Think about the animal's abilities, habits, and habitat. Make your story exciting and help readers understand what life is like as that creature!"
    ]
  },
  {
    id: 6,
    title: "Mi Familia",
    description: "Write a short paragraph about your family or pets in Spanish. Use vocabulary words we studied in class. First, introduce your family members (Mi familia tiene...). Next, describe...",
    image: miFamiliaImage,
    gradeLevel: "6th-8th",
    subject: "Language Arts",
    type: "Quick Write",
    wordCount: "100 words",
    points: 20,
    difficulty: 'medium',
    rarity: "uncommon",
    features: ["🌎 Spanish", "👨‍👩‍👧‍👦 Family", "📚 Vocabulary"],
    instructions: [
      "Write a short paragraph about your family or pets in Spanish. Use vocabulary words we studied in class.",
      "First, introduce your family members (Mi familia tiene...). Next, describe what each person or pet is like using adjectives.",
      "Finally, write about one thing your family likes to do together. Use correct grammar, including gender agreements and verb conjugations."
    ]
  },
  {
    id: 7,
    title: "Scientific Discovery",
    description: "Choose a major scientific discovery or invention that changed the world. Write an essay explaining what was discovered, who made the discovery, and why it was important...",
    image: timeTravelerImage,
    gradeLevel: "7th-9th",
    subject: "Science",
    type: "Essay",
    wordCount: "750 words",
    points: 40,
    difficulty: 'hard',
    rarity: "epic",
    features: ["🔬 STEM", "💎 Research", "🏆 Advanced"],
    instructions: [
      "Choose a major scientific discovery or invention that changed the world. Write an essay explaining what was discovered, who made the discovery, and why it was important.",
      "Include the historical context (when and where it happened), the process of discovery, and how it impacted science and society.",
      "Use at least three credible sources and cite them properly. Organize your essay with a strong thesis statement, supporting body paragraphs with evidence, and a thoughtful conclusion.",
      "Consider discussing any controversies or ethical considerations related to the discovery."
    ]
  },
  {
    id: 8,
    title: "Letter to Future Self",
    description: "Write a letter to yourself 10 years from now. Tell your future self about your current life, your hopes and dreams, and the person you want to become. Include details about your...",
    image: californiaGoldImage,
    gradeLevel: "4th-6th",
    subject: "Creative Writing",
    type: "Letter",
    wordCount: "200 words",
    points: 20,
    difficulty: 'easy',
    rarity: "uncommon",
    features: ["💌 Personal", "🎯 Goals", "🔮 Future"],
    instructions: [
      "Write a letter to yourself 10 years from now. Tell your future self about your current life, your hopes and dreams, and the person you want to become.",
      "Include details about your current interests, friends, family, and school experiences. What advice would you give your future self?",
      "Use letter format with a greeting, body paragraphs, and closing. Be honest and thoughtful—this letter is for you!"
    ]
  },
  {
    id: 9,
    title: "Narrative Adventure",
    description: "Write an exciting story about a character who goes on an unexpected adventure. Your story should have a clear beginning (introduce the character and setting), middle (describe the...",
    image: pioneerLifeImage,
    gradeLevel: "6th-8th",
    subject: "Creative Writing",
    type: "Story",
    wordCount: "500 words",
    points: 30,
    difficulty: 'medium',
    rarity: "rare",
    features: ["📚 Plot", "🎬 Action", "✨ Creativity"],
    instructions: [
      "Write an exciting story about a character who goes on an unexpected adventure. Your story should have a clear beginning (introduce the character and setting), middle (describe the adventure and challenges), and end (resolution).",
      "Include vivid descriptions, realistic dialogue, and show (don't just tell) your character's emotions through their actions and words.",
      "Use narrative techniques like sensory details, figurative language, and varied sentence structure to engage your reader. Make sure your plot has a conflict and resolution."
    ]
  },
  {
    id: 10,
    title: "Book Review",
    description: "Write a book review for a novel you recently read. Start with the book's title, author, and genre. Summarize the plot WITHOUT spoiling the ending. Then, analyze what you liked and...",
    image: miFamiliaImage,
    gradeLevel: "5th-7th",
    subject: "Language Arts",
    type: "Essay",
    wordCount: "400 words",
    points: 25,
    difficulty: 'medium',
    rarity: "rare",
    features: ["📖 Reading", "✍️ Analysis", "⭐ Review"],
    instructions: [
      "Write a book review for a novel you recently read. Start with the book's title, author, and genre. Summarize the plot WITHOUT spoiling the ending.",
      "Then, analyze what you liked and didn't like about the book. Consider the characters, writing style, themes, and pacing.",
      "Finally, give your recommendation: who would enjoy this book and why? Support your opinions with specific examples from the text.",
      "Rate the book out of 5 stars and explain your rating."
    ]
  },
  {
    id: 11,
    title: "Time Traveler's Journal",
    description: "Imagine you've traveled back in time to an important historical event we've studied in class. Write a journal entry describing your experience. Explain what you see happening...",
    image: timeTravelerImage,
    gradeLevel: "6th-8th",
    subject: "History",
    type: "Quick Write",
    wordCount: "100 words",
    points: 25,
    difficulty: 'medium',
    rarity: "rare",
    features: ["⚡ Speed Run", "⏱️ Time Limited", "💎 Rare Loot"],
    instructions: [
      "Imagine you've traveled back in time to an important historical event we've studied in class. Write a journal entry describing your experience.",
      "Explain what you see happening around you, who you meet, and how you feel about witnessing this moment in history.",
      "Be sure to include details that make your reader feel like they're right there with you!"
    ]
  },
  {
    id: 12,
    title: "Pioneer Life",
    description: "You are a pioneer traveling west during the 1800s. Life on the trail is difficult, but you're determined to reach your destination. Write an essay describing the challenges pioneers...",
    image: pioneerLifeImage,
    gradeLevel: "6th-8th",
    subject: "History",
    type: "Essay",
    wordCount: "500 words",
    points: 50,
    difficulty: 'hard',
    rarity: "epic",
    features: ["⚔️ Boss Battle", "✨ XP++", "🌟 Glowing Border"],
    instructions: [
      "You are a pioneer traveling west during the 1800s. Life on the trail is difficult, but you're determined to reach your destination.",
      "Write an essay describing the challenges pioneers faced during westward expansion. Include specific examples of hardships they encountered and how they overcame them.",
      "Use evidence from your textbook and class discussions to support your points. Organize your essay with a clear introduction, body paragraphs, and conclusion."
    ]
  }
];
