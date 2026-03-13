import { BookOpen } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { TipBox } from "@/components/TipBox";

const parts = [
  {
    part: "Part 1",
    title: "Reading Correspondence",
    questions: "11 questions",
    textType: "Email, letter, memo, or message",
    description: "You read a piece of correspondence (email, business letter, or personal message) and answer questions about tone, purpose, content, and next steps.",
    tips: [
      "Identify the relationship between sender and recipient (formal vs. casual)",
      "Look for the purpose in the first 1–2 sentences",
      "Watch for action items or requests (often the source of 'What will the sender do next?' questions)",
      "Time guide: ~10 minutes",
    ],
  },
  {
    part: "Part 2",
    title: "Reading to Apply a Diagram",
    questions: "8 questions",
    textType: "Schedule, chart, map, timetable, form",
    description: "You read a visual information source (transit schedule, job application, seating chart, etc.) and answer questions by locating specific information within it.",
    tips: [
      "Read the title and column/row headers first",
      "Questions will ask you to find specific cells or cross-reference multiple data points",
      "Don't read everything — scan for the answer",
      "Time guide: ~8 minutes",
    ],
  },
  {
    part: "Part 3",
    title: "Reading for Information",
    questions: "9 questions",
    textType: "Informational article, brochure, or report",
    description: "A longer informational text (similar to a magazine article or fact sheet). Tests comprehension of main ideas, supporting details, and vocabulary in context.",
    tips: [
      "Skim the text first to get the general idea",
      "Read each question and then scan the text for relevant sections",
      "Pay attention to cause-and-effect language: 'as a result,' 'therefore,' 'because'",
      "Time guide: ~9 minutes",
    ],
  },
  {
    part: "Part 4",
    title: "Reading for Viewpoints",
    questions: "10 questions",
    textType: "Opinion article, editorial, or discussion",
    description: "A text presenting one or more viewpoints on a topic. Tests your ability to identify opinions, reasons, and areas of agreement or disagreement between perspectives.",
    tips: [
      "Track whose opinion is being expressed (Author A vs. Author B, or speaker vs. opposition)",
      "Watch for contrast words: 'however,' 'on the other hand,' 'while some argue'",
      "Questions about 'What does the author imply?' require inference",
      "Time guide: ~12 minutes",
    ],
  },
];

const questionTypes = [
  {
    type: "General Meaning",
    description: "What is the overall topic, purpose, or main idea of the entire text or a paragraph?",
    howToApproach: "Read the first and last sentence of the passage. Don't get lost in details — think about the big picture. Look for the central claim.",
    signalWords: ["mainly about", "primarily discusses", "overall purpose", "best title"],
  },
  {
    type: "Specific Information",
    description: "Locate one precise piece of information from the text: a date, name, price, place, or fact.",
    howToApproach: "Scan don't read. Use keywords from the question to find the relevant part of the text, then read just that sentence or paragraph.",
    signalWords: ["according to the text", "what is the...", "where does", "when did", "how many"],
  },
  {
    type: "Inference",
    description: "Draw a conclusion that is implied but not directly stated in the text.",
    howToApproach: "The answer requires combining two pieces of information or understanding what the text implies. Be careful not to over-interpret — the answer must be supported by the text.",
    signalWords: ["suggests", "implies", "can be concluded", "most likely", "probably"],
  },
  {
    type: "Vocabulary in Context",
    description: "What does a highlighted word or phrase mean in the context of the passage?",
    howToApproach: "Read the full sentence containing the word. Use surrounding context clues. Substitute each answer choice and see which one makes the most sense.",
    signalWords: ["as used in the passage", "the word X most nearly means", "the phrase X refers to"],
  },
];

const timeStrategy = [
  { part: "Part 1 (Correspondence)", time: "~10 min", approach: "Read the email once thoroughly, then answer questions." },
  { part: "Part 2 (Diagram)", time: "~8 min", approach: "Skim headers first, then scan for each answer." },
  { part: "Part 3 (Information)", time: "~9 min", approach: "Quick skim, then question-driven scanning." },
  { part: "Part 4 (Viewpoints)", time: "~12 min", approach: "Track author positions carefully, answer opinion questions last." },
  { part: "Review", time: "~8–10 min", approach: "Go back and check flagged/uncertain answers." },
];

const strategies = [
  {
    title: "You CAN go back — use it",
    detail: "Reading is the only section where you can review and change answers. Flag uncertain questions and come back with fresh eyes. Don't second-guess correct answers, but do revisit ones you found difficult.",
  },
  {
    title: "Skim first, scan for answers",
    detail: "Don't read every word sequentially. Skim each paragraph's first sentence to build a mental map. Then use questions to guide targeted scanning rather than re-reading everything.",
  },
  {
    title: "Read the question before the passage (especially Part 3 & 4)",
    detail: "Reading the questions first tells you what information is important. You can then highlight or mentally note those specific details while reading, rather than reading without a purpose.",
  },
  {
    title: "Eliminate wrong answers",
    detail: "For tough questions, cross off answers that are clearly wrong. Usually 2 options can be eliminated quickly, leaving you a 50/50 choice. Partial elimination improves your odds significantly.",
  },
  {
    title: "Distinguish fact from opinion (Part 4)",
    detail: "Part 4 tests whether you can identify opinions vs. facts. Phrases like 'I believe,' 'some argue,' 'according to critics,' signal opinion. 'Studies show,' 'data indicates' signal facts.",
  },
  {
    title: "Never leave a blank",
    detail: "There is no penalty for wrong answers. Always guess if you don't know. Statistically, a random guess gives you a 25% chance (4 options) vs. a guaranteed 0% for leaving it blank.",
  },
];

const commonMistakes = [
  { mistake: "Reading the entire passage before looking at questions", fix: "Skim first, then use questions to guide targeted reading." },
  { mistake: "Choosing answers with exact wording from the text", fix: "CELPIP uses paraphrases. The right answer is usually a restatement, not a copy." },
  { mistake: "Not finishing all questions in a part", fix: "Pace yourself strictly. Use time guide above. Skip hard questions and return to them." },
  { mistake: "Treating inference questions as detail questions", fix: "Inference answers are NOT directly stated. Look for what's implied, not what's explicit." },
  { mistake: "Ignoring Part 4 opinion distinctions", fix: "Track which speaker holds which position. Make notes: Author A: pro, Author B: con." },
];

export default function ReadingPage() {
  return (
    <div>
      <SectionHeader
        icon={BookOpen}
        title="Reading"
        subtitle="55–60 minutes · 38 questions · 4 parts · You can review within this section"
        color="green"
        stats={[
          { label: "minutes", value: "55–60" },
          { label: "questions", value: "38" },
          { label: "parts", value: "4" },
          { label: "words per text", value: "150–400" },
        ]}
      />

      <TipBox variant="success" title="Key Advantage">
        Reading is the ONLY section where you can go back and change your answers. Use this strategically — flag uncertain questions and review them at the end.
      </TipBox>
      <TipBox variant="warning" title="Section Lock">
        Once you click &quot;Next&quot; to move from Reading to Writing, you CANNOT return to Reading. Make sure you&apos;ve reviewed before moving on.
      </TipBox>

      {/* Parts breakdown */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">The 4 Parts</h2>
      <div className="space-y-4 mb-10">
        {parts.map((p) => (
          <div key={p.part} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{p.part}: {p.title}</h3>
                <p className="text-sm text-gray-500">Text type: {p.textType}</p>
              </div>
              <span className="text-xs bg-green-100 text-green-700 rounded-full px-2 py-0.5 font-medium">{p.questions}</span>
            </div>
            <p className="text-sm text-gray-700 mb-3">{p.description}</p>
            <ul className="space-y-1">
              {p.tips.map((tip, i) => (
                <li key={i} className="text-sm text-gray-700 flex gap-2">
                  <span className="text-green-600 shrink-0">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Question Types */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Question Types</h2>
      <div className="space-y-4 mb-10">
        {questionTypes.map((qt) => (
          <Card key={qt.type}>
            <h3 className="font-bold text-gray-900 mb-1">{qt.type}</h3>
            <p className="text-sm text-gray-600 mb-3">{qt.description}</p>
            <div className="bg-green-50 border border-green-100 rounded-lg p-3 mb-2">
              <p className="text-xs font-semibold text-green-700 mb-1">How to approach</p>
              <p className="text-sm text-green-800">{qt.howToApproach}</p>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              <span className="text-xs text-gray-500 mr-1">Signal words:</span>
              {qt.signalWords.map((word) => (
                <span key={word} className="text-xs bg-gray-100 text-gray-600 rounded px-2 py-0.5 italic">&quot;{word}&quot;</span>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Time Strategy */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Time Strategy (55–60 min)</h2>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-10">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left p-3 font-semibold text-gray-700">Section</th>
              <th className="text-center p-3 font-semibold text-gray-700 w-24">Target Time</th>
              <th className="text-left p-3 font-semibold text-gray-700">Approach</th>
            </tr>
          </thead>
          <tbody>
            {timeStrategy.map((row, i) => (
              <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                <td className="p-3 font-medium text-gray-800">{row.part}</td>
                <td className="p-3 text-center font-bold text-green-700">{row.time}</td>
                <td className="p-3 text-gray-600">{row.approach}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Strategies */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Strategies</h2>
      <div className="space-y-3 mb-10">
        {strategies.map((s, i) => (
          <div key={i} className="flex gap-3 bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="w-7 h-7 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center shrink-0">
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
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Mistakes</h2>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-10">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left p-3 font-semibold text-gray-700 w-1/2">Mistake</th>
              <th className="text-left p-3 font-semibold text-gray-700">Fix</th>
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

      {/* Sample Email Walkthrough */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Sample: Part 1 (Reading Correspondence)</h2>
      <Card>
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-1">SAMPLE EMAIL</p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-700">
              <p className="mb-1"><strong>From:</strong> Sarah Chen, Project Manager</p>
              <p className="mb-1"><strong>To:</strong> All Team Members</p>
              <p className="mb-3"><strong>Subject:</strong> Updated Project Deadline</p>
              <p className="mb-2">Dear Team,</p>
              <p className="mb-2">I wanted to let you know that due to feedback from our client, we have moved the final presentation date from March 20 to March 27. This gives us an additional week, which I believe will allow us to improve the quality of our deliverables significantly.</p>
              <p className="mb-2">Please update your schedules accordingly and let me know if you have any concerns by end of business Thursday.</p>
              <p>Best, Sarah</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              {
                q: "Q1: Why was the deadline changed?",
                answer: "Due to client feedback",
                options: ["A) The team asked for more time", "B) Due to client feedback ✓", "C) The presentation location changed", "D) Sarah was unavailable"],
              },
              {
                q: "Q2: What does Sarah want team members to do by Thursday?",
                answer: "Let her know if they have concerns",
                options: ["A) Submit their deliverables", "B) Update the project plan", "C) Let her know if they have concerns ✓", "D) Contact the client directly"],
              },
            ].map((item) => (
              <div key={item.q}>
                <p className="font-medium text-gray-900 mb-1">{item.q}</p>
                <div className="space-y-0.5">
                  {item.options.map((opt) => (
                    <div key={opt} className={`text-sm px-3 py-1 rounded ${opt.includes("✓") ? "bg-green-100 text-green-800 font-medium" : "text-gray-600"}`}>
                      {opt}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
