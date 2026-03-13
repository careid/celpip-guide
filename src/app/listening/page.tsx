import { Headphones } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { TipBox } from "@/components/TipBox";

const parts = [
  {
    part: "Part 1",
    duration: "~2 min audio",
    questions: "6 questions",
    format: "3-segment dialogue (problem → solution format)",
    description: "Two people discuss a problem and work toward a solution. Audio is divided into 3 segments with 2 questions each.",
    questionTypes: ["Gist/main idea", "Specific detail"],
    difficulty: "Moderate",
  },
  {
    part: "Part 2",
    duration: "~2 min audio",
    questions: "5 questions",
    format: "Casual everyday dialogue",
    description: "Informal conversation between two people in a day-to-day scenario (making plans, discussing an issue, etc.).",
    questionTypes: ["Detail", "Attitude/tone", "Inference"],
    difficulty: "Moderate",
  },
  {
    part: "Part 3",
    duration: "~2.5 min audio",
    questions: "6 questions",
    format: "News item / radio segment",
    description: "A reporter or news anchor presents information, causes, statistics, or a situation. Often includes an interview.",
    questionTypes: ["Detail", "Inference", "Cause/effect"],
    difficulty: "Moderate–High",
  },
  {
    part: "Part 4",
    duration: "~2 min audio",
    questions: "6 questions",
    format: "Academic/professional talk",
    description: "A speaker presents specialized information on a topic (environment, business, science). Vocabulary is more advanced.",
    questionTypes: ["Detail", "Main idea", "Vocabulary in context"],
    difficulty: "High",
  },
  {
    part: "Part 5",
    duration: "~2.5 min audio",
    questions: "8 questions",
    format: "Longer conversation / lecture",
    description: "Longer audio with a discussion or lecture format. Requires tracking multiple ideas and speakers.",
    questionTypes: ["Detail", "Inference", "Speaker purpose"],
    difficulty: "High",
  },
  {
    part: "Part 6",
    duration: "~2 min audio",
    questions: "7 questions",
    format: "Viewpoints discussion",
    description: "Two or more speakers debate a topic or express opinions. Tests understanding of stance, agreement, and disagreement.",
    questionTypes: ["Opinion", "Attitude", "Inference", "Detail"],
    difficulty: "High",
  },
];

const questionTypes = [
  {
    type: "Gist / Main Idea",
    description: "What is the overall topic or main purpose of the conversation?",
    strategy: "Listen for the opening lines and recurring themes. The answer is usually supported by multiple parts of the audio.",
    example: "Question: What is the main problem being discussed?\nAnswer choices focus on broad summaries, not specific details.",
  },
  {
    type: "Specific Detail",
    description: "What specific fact, number, name, date, or piece of information was mentioned?",
    strategy: "Take notes for numbers, names, times, and locations. Details that seem incidental (like a date or statistic) often become questions.",
    example: "Q: What time does the meeting start? / Q: How many people attended the event?",
  },
  {
    type: "Inference",
    description: "What can you conclude from what was said, even though it wasn't stated directly?",
    strategy: "Read between the lines. Look for implications in tone, word choice, and context. The answer is NOT directly stated in the audio.",
    example: "Q: What does the man likely feel about the proposal? (Answer based on his reaction, not direct statement)",
  },
  {
    type: "Attitude / Tone / Opinion",
    description: "How does the speaker feel about something? What is their stance or emotional reaction?",
    strategy: "Listen for tone words and emotional language: 'unfortunately,' 'I'm thrilled,' 'I'm not sure about that.' Also listen for hesitation or emphasis.",
    example: "Q: What is the woman's attitude toward the new policy? (Choices: supportive, skeptical, indifferent, opposed)",
  },
];

const strategies = [
  {
    title: "Read questions before the audio plays",
    detail: "You have a brief preview window. Use it to read all questions and predict what information to listen for. This transforms passive listening into active, targeted listening.",
  },
  {
    title: "Develop a note-taking shorthand",
    detail: "You cannot pause or replay. Use abbreviations and symbols: → for 'leads to', ↑ for 'increase', # for numbers, @ for times/locations. Don't write full sentences — capture keywords.",
  },
  {
    title: "Focus on words you DO understand",
    detail: "When you hear unfamiliar vocabulary, don't freeze. Keep listening. Context around the word usually provides enough meaning to answer the question.",
  },
  {
    title: "Answer immediately — don't second-guess",
    detail: "You have only 30 seconds per question after each audio segment. Make your best choice quickly. Second-guessing wastes time and rarely improves accuracy.",
  },
  {
    title: "Watch for distractors",
    detail: "CELPIP often includes answer choices that use exact words from the audio but in the wrong context. The correct answer is often a paraphrase, not a verbatim match.",
  },
  {
    title: "Track attitude shifts",
    detail: "In Part 6, speakers often change their mind or partially agree. Phrases like 'Well, I suppose...', 'But then again...', 'Actually, you might be right' signal attitude changes.",
  },
];

const commonMistakes = [
  { mistake: "Getting stuck on unfamiliar words", fix: "Keep listening — context will provide meaning. Don't waste mental energy on one word." },
  { mistake: "Not taking notes on numbers/times", fix: "Specific details (dates, prices, quantities) frequently appear as questions. Always note them." },
  { mistake: "Choosing answers with exact words from audio", fix: "Correct answers are usually paraphrases. Watch for synonym traps." },
  { mistake: "Assuming based on the first answer heard", fix: "Speakers often correct themselves or revise. Wait for the full context before answering." },
  { mistake: "Skipping the preview time", fix: "Reading questions before audio plays is your biggest advantage. Never skip it." },
];

export default function ListeningPage() {
  return (
    <div>
      <SectionHeader
        icon={Headphones}
        title="Listening"
        subtitle="47–55 minutes · 38 questions · 6 parts · Audio plays once only"
        color="blue"
        stats={[
          { label: "minutes", value: "47–55" },
          { label: "questions", value: "38" },
          { label: "parts", value: "6" },
          { label: "seconds per question", value: "30" },
        ]}
      />

      <TipBox variant="warning" title="Critical Rule">
        Audio plays ONCE — there is no replay. Once a segment finishes, you cannot go back. You have 30 seconds after each segment to answer. Note-taking is essential.
      </TipBox>

      {/* Parts breakdown */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">The 6 Parts</h2>
      <div className="space-y-4 mb-10">
        {parts.map((p) => (
          <div key={p.part} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{p.part}</h3>
                <p className="text-sm text-gray-600">{p.format}</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 font-medium">{p.questions}</span>
                <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-0.5">{p.duration}</span>
                <span className={`text-xs rounded-full px-2 py-0.5 font-medium ${
                  p.difficulty === "High" ? "bg-red-100 text-red-700" :
                  p.difficulty === "Moderate–High" ? "bg-orange-100 text-orange-700" :
                  "bg-green-100 text-green-700"
                }`}>{p.difficulty}</span>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-2">{p.description}</p>
            <div className="flex flex-wrap gap-1">
              {p.questionTypes.map((qt) => (
                <span key={qt} className="text-xs bg-blue-50 text-blue-700 border border-blue-100 rounded px-2 py-0.5">{qt}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Question Types */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Question Types Explained</h2>
      <div className="space-y-4 mb-10">
        {questionTypes.map((qt) => (
          <Card key={qt.type}>
            <h3 className="font-bold text-gray-900 mb-1">{qt.type}</h3>
            <p className="text-sm text-gray-600 mb-2">{qt.description}</p>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-2">
              <p className="text-xs font-semibold text-blue-700 mb-1">Strategy</p>
              <p className="text-sm text-blue-800">{qt.strategy}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs font-semibold text-gray-600 mb-1">Example</p>
              <p className="text-sm text-gray-700 whitespace-pre-line">{qt.example}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Strategies */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Strategies</h2>
      <div className="space-y-3 mb-10">
        {strategies.map((s, i) => (
          <div key={i} className="flex gap-3 bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center shrink-0">
              {i + 1}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{s.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{s.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Common Mistakes */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Mistakes to Avoid</h2>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-10">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left p-3 font-semibold text-gray-700 w-1/2">Common Mistake</th>
              <th className="text-left p-3 font-semibold text-gray-700">How to Fix It</th>
            </tr>
          </thead>
          <tbody>
            {commonMistakes.map((row, i) => (
              <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                <td className="p-3 text-red-700">{row.mistake}</td>
                <td className="p-3 text-green-700">{row.fix}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sample Question */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Sample Question Walkthrough</h2>
      <Card>
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-1">AUDIO TRANSCRIPT (you would hear this)</p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-700 italic">
              &quot;I&apos;ve been looking into the restaurant schedule and I think we should meet at 7:30. The place closes at 9, so that gives us about an hour and a half — enough time to eat and catch up without rushing. Does that work for you?&quot;
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2">QUESTION</p>
            <p className="font-medium text-gray-900">When will they meet at the restaurant?</p>
            <div className="mt-2 space-y-1">
              {["A) 6:30 PM", "B) 7:00 PM", "C) 7:30 PM ✓", "D) 9:00 PM"].map((opt) => (
                <div key={opt} className={`text-sm px-3 py-1.5 rounded ${opt.includes("✓") ? "bg-green-100 text-green-800 font-medium" : "text-gray-600"}`}>
                  {opt}
                </div>
              ))}
            </div>
          </div>
          <TipBox variant="info" title="Why C is correct">
            The speaker explicitly states &quot;meet at 7:30.&quot; Option D (9:00 PM) is a distractor — it was mentioned as closing time, not meeting time. Many test-takers pick the last time they hear, which is 9:00.
          </TipBox>
        </div>
      </Card>
    </div>
  );
}
