import { PenLine } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { TipBox } from "@/components/TipBox";
import { RubricTable } from "@/components/RubricTable";

const rubricRows = [
  {
    criterion: "Task Fulfillment",
    weight: "25%",
    description: "Addresses all required bullet points or survey components, uses appropriate tone (formal or casual), meets 150–200 word count, stays on topic.",
  },
  {
    criterion: "Coherence & Organization",
    weight: "25%",
    description: "Clear introduction and conclusion, ideas are logically sequenced, good use of supporting details and examples, clear paragraph/topic sentence structure.",
  },
  {
    criterion: "Vocabulary & Word Choice",
    weight: "25%",
    description: "Range of vocabulary beyond basic words, precise and natural word selection, variety and sophistication, vocabulary appropriate to context.",
  },
  {
    criterion: "Readability",
    weight: "25%",
    description: "Correct grammar and sentence structure, proper spelling and punctuation, effective paragraph breaks and transitions, smooth flow and connectors.",
  },
];

const task1Tips = [
  "Read all 3 bullet points BEFORE writing",
  "Write a clear subject line (formal emails always need one)",
  "Match the tone: formal for managers/strangers, casual for friends",
  "Dedicate roughly one paragraph to each bullet point",
  "Open with why you're writing (one sentence)",
  "Close with a polite sign-off appropriate to the tone",
  "Stay between 150–200 words — count as you write",
];

const task2Tips = [
  "Pick ONE option and commit to it — don't hedge",
  "State your choice clearly in the first sentence",
  "Give 2–3 distinct reasons with brief examples",
  "Acknowledge the other option briefly (optional but impressive)",
  "End with a strong concluding sentence",
  "150–200 words — quality over quantity",
];

const goodPhrases = {
  transitions: [
    "Furthermore, ...",
    "In addition to this, ...",
    "However, ...",
    "On the other hand, ...",
    "As a result, ...",
    "For example, ...",
    "In conclusion, ...",
    "To elaborate, ...",
  ],
  emailOpeners: [
    "I am writing to inform you that...",
    "I hope this message finds you well.",
    "I wanted to bring to your attention...",
    "I am writing regarding...",
    "I am reaching out to discuss...",
  ],
  task2Openers: [
    "I would strongly prefer [Option A] because...",
    "After careful consideration, I believe [Option B] is the better choice.",
    "In my opinion, [Option A] offers significant advantages...",
    "I firmly support [Option B] for several reasons.",
  ],
  closings: {
    formal: ["Best regards,", "Sincerely,", "Thank you for your consideration,", "Respectfully,"],
    casual: ["Take care,", "Thanks again,", "Looking forward to hearing from you,", "Best,"],
  },
};

const commonMistakes = [
  {
    mistake: "Missing bullet points",
    severity: "Critical",
    fix: "Create a mental checklist before writing. Each bullet point = 1 paragraph. Never skip one.",
  },
  {
    mistake: "Too short (under 150 words)",
    severity: "Critical",
    fix: "Short responses signal incomplete ability. Aim for 175 words to allow for safe margin.",
  },
  {
    mistake: "Wrong tone (formal when casual needed, or vice versa)",
    severity: "Major",
    fix: "Read the scenario carefully. Email to a manager = formal. Email to a friend = casual.",
  },
  {
    mistake: "Simple sentence overuse",
    severity: "Major",
    fix: "Mix sentence types: simple, compound, complex. 'Although I..., I also...' scores higher.",
  },
  {
    mistake: "Memorized/templated responses",
    severity: "Major",
    fix: "Raters identify templates. Write naturally to the specific prompt. Generic = lower score.",
  },
  {
    mistake: "No transitions between ideas",
    severity: "Moderate",
    fix: "Use connectors: 'Additionally,' 'However,' 'As a result.' Improves coherence score.",
  },
  {
    mistake: "Not choosing a side in Task 2",
    severity: "Critical",
    fix: "You MUST pick one option. 'Both options have merits' is not an acceptable answer.",
  },
];

export default function WritingPage() {
  return (
    <div>
      <SectionHeader
        icon={PenLine}
        title="Writing"
        subtitle="53–60 minutes · 2 tasks · 150–200 words each · Rated by 4 raters minimum"
        color="purple"
        stats={[
          { label: "minutes total", value: "53–60" },
          { label: "tasks", value: "2" },
          { label: "words per task", value: "150–200" },
          { label: "raters per task", value: "4+" },
        ]}
      />

      <TipBox variant="info" title="How the Writing section works">
        Task 1 (Email): 27 minutes. Task 2 (Survey Response): 26 minutes. Each task is independently rated by a minimum of 4 raters using the same 4-criterion rubric. Scores from all raters are averaged.
      </TipBox>

      {/* Scoring Rubric */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Scoring Rubric (Both Tasks)</h2>
      <Card className="mb-10">
        <RubricTable rows={rubricRows} />
        <TipBox variant="tip" title="Equal weight strategy">
          All 4 criteria carry equal weight (25% each). Don&apos;t sacrifice organization for vocabulary, or vice versa. A balanced response beats a lopsided one.
        </TipBox>
      </Card>

      {/* Task 1 */}
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Task 1: Writing an Email (27 minutes)</h2>
      <p className="text-gray-600 mb-4">
        You are given a scenario and must write an email addressing exactly 3 bullet points. The tone may be formal (to an employer, landlord, or stranger) or informal (to a friend or family member).
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <Card title="Formal Email Structure">
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex gap-2"><span className="font-semibold text-gray-900 w-20 shrink-0">Subject:</span><span>Clear, descriptive line</span></div>
            <div className="flex gap-2"><span className="font-semibold text-gray-900 w-20 shrink-0">Greeting:</span><span>Dear [Title] [Last Name],</span></div>
            <div className="flex gap-2"><span className="font-semibold text-gray-900 w-20 shrink-0">Opening:</span><span>State purpose in one sentence</span></div>
            <div className="flex gap-2"><span className="font-semibold text-gray-900 w-20 shrink-0">Body:</span><span>3 paragraphs (one per bullet)</span></div>
            <div className="flex gap-2"><span className="font-semibold text-gray-900 w-20 shrink-0">Closing:</span><span>Polite sign-off + full name</span></div>
          </div>
        </Card>
        <Card title="Informal Email Structure">
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex gap-2"><span className="font-semibold text-gray-900 w-20 shrink-0">Subject:</span><span>Optional or casual</span></div>
            <div className="flex gap-2"><span className="font-semibold text-gray-900 w-20 shrink-0">Greeting:</span><span>Hey / Hi [First Name],</span></div>
            <div className="flex gap-2"><span className="font-semibold text-gray-900 w-20 shrink-0">Opening:</span><span>Casual opener or small talk</span></div>
            <div className="flex gap-2"><span className="font-semibold text-gray-900 w-20 shrink-0">Body:</span><span>Cover all 3 bullet points</span></div>
            <div className="flex gap-2"><span className="font-semibold text-gray-900 w-20 shrink-0">Closing:</span><span>Friendly sign-off + first name</span></div>
          </div>
        </Card>
      </div>

      <Card className="mb-6" title="Task 1 Tips">
        <ul className="space-y-2">
          {task1Tips.map((tip, i) => (
            <li key={i} className="flex gap-2 text-sm text-gray-700">
              <span className="text-purple-600 shrink-0">✓</span>
              {tip}
            </li>
          ))}
        </ul>
      </Card>

      {/* Task 1 Sample */}
      <Card className="mb-10">
        <h3 className="font-bold text-gray-900 mb-3">Sample Task 1 Prompt & Strong Response</h3>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4 text-sm">
          <p className="font-semibold text-purple-800 mb-2">PROMPT</p>
          <p className="text-purple-900 mb-2">You need to take a day off work. Write an email to your manager. In your email:</p>
          <ul className="space-y-1 text-purple-800">
            <li>• State which day you need off</li>
            <li>• Explain the reason for your absence</li>
            <li>• Describe how you will ensure your work is covered</li>
          </ul>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-800 whitespace-pre-line leading-relaxed">
{`Subject: Request for Personal Day – Friday, March 15

Dear Ms. Thompson,

I am writing to request a personal day off on Friday, March 15th. I have a medical appointment that unfortunately cannot be rescheduled, and I want to ensure it does not interfere with any upcoming project deadlines.

Before my absence, I will complete the quarterly status report that is due that week. I will also brief my colleague, David, on the two active client accounts so that any urgent matters can be addressed promptly in my absence. I will leave detailed notes on my desk and remain reachable by email throughout the day.

Thank you for your understanding. Please let me know if you require any additional information.

Best regards,
[Your Name]`}
        </div>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          {["Day ✓", "Reason ✓", "Coverage ✓", "~170 words ✓"].map((item) => (
            <span key={item} className="bg-green-100 text-green-800 rounded px-2 py-1 text-center font-medium">{item}</span>
          ))}
        </div>
      </Card>

      {/* Task 2 */}
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Task 2: Responding to Survey Questions (26 minutes)</h2>
      <p className="text-gray-600 mb-4">
        You are presented with a survey topic and must choose ONE of two options, then write 150–200 words explaining and justifying your choice with reasons and examples.
      </p>

      <Card className="mb-6" title="Task 2 Tips">
        <ul className="space-y-2">
          {task2Tips.map((tip, i) => (
            <li key={i} className="flex gap-2 text-sm text-gray-700">
              <span className="text-purple-600 shrink-0">✓</span>
              {tip}
            </li>
          ))}
        </ul>
      </Card>

      <Card className="mb-10">
        <h3 className="font-bold text-gray-900 mb-3">Sample Task 2 Prompt & Strong Response</h3>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4 text-sm">
          <p className="font-semibold text-purple-800 mb-2">PROMPT</p>
          <p className="text-purple-900 mb-2">A community organization is planning a new facility. Which would be more beneficial to your community?</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="bg-white rounded p-2 border border-purple-200"><strong>Option A:</strong> A public library with computers and study spaces</div>
            <div className="bg-white rounded p-2 border border-purple-200"><strong>Option B:</strong> A recreation centre with gym facilities</div>
          </div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-800 leading-relaxed">
          I strongly believe that <strong>Option A — a public library</strong> would be more beneficial to our community. While a recreation centre has clear advantages for physical health, a library provides resources that address a much broader range of community needs.
          <br /><br />
          Firstly, a public library with computers and study spaces would greatly benefit students and job seekers who may not have reliable internet access at home. Many residents, particularly newcomers, depend on library resources for research and employment applications. Secondly, libraries foster lifelong learning by providing access to books, digital resources, and educational programs at no cost, making them accessible to people of all income levels.
          <br /><br />
          Although a gym promotes physical wellness, private fitness centres are already available in our area. In contrast, a quality public library would fill an existing gap and serve a larger, more diverse segment of the population. For these reasons, I believe the library would have a greater long-term impact on our community.
        </div>
        <div className="mt-3 text-xs text-gray-500">~165 words · Clear position · 2 reasons with examples · Acknowledges other option · Strong conclusion</div>
      </Card>

      {/* Useful Phrases */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Useful Phrases Bank</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        <Card title="Transition Words">
          <div className="flex flex-wrap gap-2">
            {goodPhrases.transitions.map((p) => (
              <span key={p} className="text-sm bg-purple-50 text-purple-700 border border-purple-100 rounded px-2 py-1">{p}</span>
            ))}
          </div>
        </Card>
        <Card title="Task 2 Openers">
          <ul className="space-y-1">
            {goodPhrases.task2Openers.map((p) => (
              <li key={p} className="text-sm text-gray-700 border-b border-gray-100 pb-1">{p}</li>
            ))}
          </ul>
        </Card>
        <Card title="Email Openers (Formal)">
          <ul className="space-y-1">
            {goodPhrases.emailOpeners.map((p) => (
              <li key={p} className="text-sm text-gray-700 border-b border-gray-100 pb-1">{p}</li>
            ))}
          </ul>
        </Card>
        <Card title="Email Closings">
          <div className="mb-2">
            <p className="text-xs font-semibold text-gray-500 mb-1">Formal</p>
            <div className="flex flex-wrap gap-1">
              {goodPhrases.closings.formal.map((p) => (
                <span key={p} className="text-sm bg-gray-100 text-gray-700 rounded px-2 py-0.5">{p}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-1">Casual</p>
            <div className="flex flex-wrap gap-1">
              {goodPhrases.closings.casual.map((p) => (
                <span key={p} className="text-sm bg-gray-100 text-gray-700 rounded px-2 py-0.5">{p}</span>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Common Mistakes */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Mistakes</h2>
      <div className="space-y-3 mb-8">
        {commonMistakes.map((m, i) => (
          <div key={i} className={`rounded-xl border p-4 ${m.severity === "Critical" ? "border-red-200 bg-red-50" : m.severity === "Major" ? "border-orange-200 bg-orange-50" : "border-yellow-200 bg-yellow-50"}`}>
            <div className="flex items-start gap-3">
              <span className={`text-xs font-bold rounded-full px-2 py-0.5 shrink-0 mt-0.5 ${m.severity === "Critical" ? "bg-red-600 text-white" : m.severity === "Major" ? "bg-orange-500 text-white" : "bg-yellow-500 text-white"}`}>{m.severity}</span>
              <div>
                <p className="font-semibold text-gray-900">{m.mistake}</p>
                <p className="text-sm text-gray-700 mt-1">{m.fix}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
