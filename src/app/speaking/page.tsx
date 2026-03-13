import { Mic } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { TipBox } from "@/components/TipBox";
import { RubricTable } from "@/components/RubricTable";

const rubricRows = [
  {
    criterion: "Content / Coherence",
    weight: "25%",
    description: "Ideas are relevant, well-developed, and logically organized. Supporting details and examples are provided. Response stays on topic.",
  },
  {
    criterion: "Vocabulary",
    weight: "25%",
    description: "Range of vocabulary used, appropriate word choice for context, variety of expressions, avoids repetition of basic words.",
  },
  {
    criterion: "Listenability",
    weight: "25%",
    description: "Clear pronunciation, appropriate pace and rhythm, minimal hesitation and filler words (um, uh, like), natural intonation.",
  },
  {
    criterion: "Task Fulfillment",
    weight: "25%",
    description: "All aspects of the task are completed, time is used effectively, response directly addresses the question, appropriate length.",
  },
];

const tasks = [
  {
    num: 1,
    title: "Giving Advice",
    time: "30s prep + 90s speaking",
    description: "You are given a situation where someone has a problem and you need to offer practical advice and suggestions.",
    structure: [
      "Acknowledge the situation (1–2 sentences)",
      "Suggestion 1 + explanation (20 seconds)",
      "Suggestion 2 + explanation (20 seconds)",
      "Suggestion 3 + explanation (20 seconds)",
      "Closing encouragement (5–10 seconds)",
    ],
    phrases: [
      "If I were in your situation, I would...",
      "One thing you might consider is...",
      "Another approach that could work is...",
      "I'd also recommend...",
      "The most important thing is to...",
    ],
    tip: "Give 3 distinct suggestions. Each needs a brief reason (\"because\" / \"since\" / \"so that\"). Don't just list options — explain why each helps.",
  },
  {
    num: 2,
    title: "Talking About a Personal Experience",
    time: "30s prep + 60s speaking",
    description: "You are asked to tell a story about something that happened to you, including what happened, when, where, and how you felt.",
    structure: [
      "Set the scene: when and where (5 seconds)",
      "What happened (main events, 30 seconds)",
      "Key moment or turning point (15 seconds)",
      "How you felt / what you learned (10 seconds)",
    ],
    phrases: [
      "This reminds me of the time when...",
      "A few years ago, I was...",
      "I remember feeling incredibly...",
      "What made it memorable was...",
      "Looking back on it now, I realize...",
    ],
    tip: "Make it vivid. Include sensory details (what you heard, saw, felt). Emotion and specificity score well. Don't be vague.",
  },
  {
    num: 3,
    title: "Describing a Scene",
    time: "30s prep + 60s speaking",
    description: "You see an image and must describe it in detail to someone who cannot see it. Cover what's happening, who is there, where, and any details you notice.",
    structure: [
      "Overall scene (1 sentence overview)",
      "People present — appearance, positions, actions",
      "Setting — indoors/outdoors, time of day, surroundings",
      "Mood, activity, or interesting details",
    ],
    phrases: [
      "The image shows...",
      "In the foreground/background, I can see...",
      "There appears to be...",
      "The overall mood seems to be...",
      "One detail I notice is...",
    ],
    tip: "Describe left to right or foreground to background — any systematic order. Don't just name objects; describe what's happening with them.",
  },
  {
    num: 4,
    title: "Making Predictions",
    time: "30s prep + 60s speaking",
    description: "You see an image showing a situation and are asked to predict what will happen next, giving reasons for your predictions.",
    structure: [
      "Brief observation of the current situation",
      "Prediction 1 + reasoning",
      "Prediction 2 + reasoning",
      "Alternative outcome (optional)",
    ],
    phrases: [
      "Based on what I can see, I predict that...",
      "It seems likely that...",
      "Given the situation, [person] will probably...",
      "I believe this will lead to...",
      "On the other hand, it's also possible that...",
    ],
    tip: "Your prediction doesn't need to be 'correct' — there is no correct answer. You are scored on how well you reason and communicate.",
  },
  {
    num: 5,
    title: "Comparing Two Images",
    time: "30s prep + 60s speaking",
    description: "You see two images and are asked to compare them based on a given scenario (e.g., which image shows a better option for a purpose).",
    structure: [
      "Brief description of Image 1 (2–3 sentences)",
      "Brief description of Image 2 (2–3 sentences)",
      "Key similarities and differences",
      "Your recommendation + reasoning (most important)",
    ],
    phrases: [
      "Compared to...",
      "While Image A shows... Image B depicts...",
      "A key difference is...",
      "Both images share...",
      "In my view, Image [A/B] would be more suitable because...",
    ],
    tip: "Don't just describe both images separately. Directly compare them using contrast language ('whereas,' 'on the other hand,' 'unlike').",
  },
  {
    num: 6,
    title: "Dealing with a Difficult Situation",
    time: "30s prep + 60s speaking",
    description: "You are presented with a challenging scenario and must explain how you would handle it, including steps you would take.",
    structure: [
      "Acknowledge the difficulty of the situation",
      "First action + reason",
      "Second action + reason",
      "Expected outcome",
    ],
    phrases: [
      "In a situation like this, I would first...",
      "My next step would be to...",
      "After that, I would consider...",
      "The reason I would do this is...",
      "Ultimately, I believe this approach would result in...",
    ],
    tip: "Be specific and sequential. Use 'first,' 'then,' 'after that,' 'finally' to show clear organization.",
  },
  {
    num: 7,
    title: "Expressing Opinions",
    time: "30s prep + 60s speaking",
    description: "You are asked to share your views on a topic, provide 2–3 reasons for your position, and possibly address a counterargument.",
    structure: [
      "State your position clearly (1 sentence)",
      "Reason 1 + brief example",
      "Reason 2 + brief example",
      "Reason 3 (optional) or counterargument + rebuttal",
      "Conclude by restating your position",
    ],
    phrases: [
      "In my opinion,...",
      "I firmly believe that...",
      "The primary reason I feel this way is...",
      "Additionally, it is worth noting that...",
      "While some may argue that..., I maintain that...",
      "For all these reasons, I believe...",
    ],
    tip: "Task 7 rewards sophisticated reasoning. Show you've considered multiple perspectives. Use 'while some argue... I believe...' for extra marks.",
  },
  {
    num: 8,
    title: "Describing an Unusual Situation",
    time: "30s prep + 60s speaking",
    description: "You see an image of an unusual or surprising scene and must describe what is happening and explain why it might be unusual or unexpected.",
    structure: [
      "What you see in the image",
      "What makes it unusual or unexpected",
      "Possible explanation or context",
      "Your reaction or observation",
    ],
    phrases: [
      "What immediately stands out to me is...",
      "Interestingly, ...",
      "This appears unusual because...",
      "One possible explanation might be...",
      "I find it surprising that...",
    ],
    tip: "Don't just describe — interpret. What does it mean? Why is it unusual? Show higher-order thinking.",
  },
];

const strategies = [
  {
    title: "Use your 30-second prep time strategically",
    detail: "Mentally outline 2–3 key points you will make. Don't script word-for-word — just identify your main ideas. Writing full notes often backfires because reading them sounds unnatural.",
  },
  {
    title: "Start speaking immediately when the recording starts",
    detail: "Long opening pauses waste time and signal hesitation. A confident opener like 'Sure, I'd be happy to give you my thoughts on this...' bridges into your main content naturally.",
  },
  {
    title: "Replace filler words with meaningful pauses",
    detail: "Instead of 'um' or 'uh,' allow a brief natural pause. A 1-second pause sounds professional. A long string of 'um um um' hurts your Listenability score significantly.",
  },
  {
    title: "Fill your allocated time",
    detail: "Stopping at 40 seconds when you have 60 seconds available signals incomplete ability. If you run out of ideas, add detail, elaborate on an example, or add a qualifier ('That said, some might argue...').",
  },
  {
    title: "Speak to be heard, not performed",
    detail: "CELPIP raters are looking for clear communication, not perfect accent. Speak at a natural conversational pace — not too fast (swallowing words) or too slow (sounding stilted).",
  },
  {
    title: "Use discourse markers to signal organization",
    detail: "'First of all,' 'Additionally,' 'On the other hand,' 'In conclusion' signal to raters that you're organized. These markers improve both Content/Coherence and Listenability scores.",
  },
  {
    title: "Vary your vocabulary — avoid word repetition",
    detail: "If you've said 'good' once, use 'beneficial,' 'effective,' 'advantageous' the next time. Vocabulary range is 25% of your score. Keep mental synonyms ready for common words.",
  },
];

export default function SpeakingPage() {
  return (
    <div>
      <SectionHeader
        icon={Mic}
        title="Speaking"
        subtitle="15–20 minutes · 8 tasks · 30s prep + 60–90s speaking · Rated by 3 raters minimum"
        color="orange"
        stats={[
          { label: "minutes", value: "15–20" },
          { label: "tasks", value: "8" },
          { label: "prep time each", value: "30s" },
          { label: "min raters", value: "3+" },
        ]}
      />

      <TipBox variant="warning" title="No Human Examiner">
        Speaking is fully computerized. Your responses are recorded and evaluated later by human raters. There is no real-time interaction. Speak clearly to the microphone.
      </TipBox>
      <TipBox variant="info" title="Timer awareness">
        When preparation time ends, recording starts automatically. When speaking time ends, recording stops. Practice timing your responses so you use the full allocated time.
      </TipBox>

      {/* Rubric */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Scoring Rubric (All Tasks)</h2>
      <Card className="mb-10">
        <RubricTable rows={rubricRows} />
      </Card>

      {/* Tasks */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">The 8 Tasks</h2>
      <div className="space-y-5 mb-10">
        {tasks.map((task) => (
          <div key={task.num} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-orange-50 border-b border-orange-100 px-5 py-3 flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-orange-700 mr-2">Task {task.num}</span>
                <span className="font-bold text-gray-900">{task.title}</span>
              </div>
              <span className="text-xs bg-orange-100 text-orange-700 rounded-full px-2 py-0.5 font-medium">{task.time}</span>
            </div>
            <div className="p-5">
              <p className="text-sm text-gray-700 mb-4">{task.description}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-2">RESPONSE STRUCTURE</p>
                  <ul className="space-y-1">
                    {task.structure.map((step, i) => (
                      <li key={i} className="flex gap-2 text-sm text-gray-700">
                        <span className="text-orange-500 shrink-0 font-bold">{i + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-2">USEFUL PHRASES</p>
                  <ul className="space-y-1">
                    {task.phrases.map((phrase, i) => (
                      <li key={i} className="text-xs bg-orange-50 text-orange-800 border border-orange-100 rounded px-2 py-1">{phrase}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
                <span className="font-semibold">Key insight: </span>{task.tip}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Strategies */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Strategies</h2>
      <div className="space-y-3 mb-10">
        {strategies.map((s, i) => (
          <div key={i} className="flex gap-3 bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="w-7 h-7 rounded-full bg-orange-600 text-white text-sm font-bold flex items-center justify-center shrink-0">
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
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Speaking Mistakes</h2>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-10">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left p-3 font-semibold text-gray-700 w-1/2">Mistake</th>
              <th className="text-left p-3 font-semibold text-gray-700">Fix</th>
            </tr>
          </thead>
          <tbody>
            {[
              { m: "Excessive 'um,' 'uh,' 'like' fillers", f: "Practice pausing silently. Record yourself and identify filler patterns." },
              { m: "Stopping before time is up", f: "Elaborate on examples, add qualifiers, or add a counterpoint to fill time." },
              { m: "Memorized/scripted-sounding answers", f: "Know your structure, not your script. Spontaneous language scores higher." },
              { m: "Not addressing all parts of the question", f: "Re-read the task during prep time. Make sure you've covered every element." },
              { m: "Speaking too fast (nervousness)", f: "Slow down deliberately. Clarity matters more than speed." },
              { m: "Repeating the same words/phrases", f: "Prepare synonyms for common words: good → beneficial/effective/worthwhile." },
              { m: "Vague, generic responses without examples", f: "Always include a specific example. 'For instance, last year...' raises the score." },
            ].map((row, i) => (
              <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                <td className="p-3 text-red-700">{row.m}</td>
                <td className="p-3 text-green-700">{row.f}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sample Task 1 */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Sample Response: Task 1 (Giving Advice)</h2>
      <Card>
        <div className="space-y-4">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-sm">
            <p className="font-semibold text-orange-800 mb-1">PROMPT</p>
            <p className="text-orange-900">Your friend has just moved to a new city and is feeling lonely. They don&apos;t know many people and are finding it hard to make friends as an adult. What advice would you give them?</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-800 leading-relaxed">
            &quot;That sounds like a really tough situation, and it&apos;s something a lot of people face when they move somewhere new. But don&apos;t worry — there are definitely things you can do.
            <br /><br />
            First of all, I&apos;d recommend joining a club or group related to something you enjoy — whether that&apos;s a sports team, a language exchange, or a cooking class. Shared interests make it so much easier to connect with people naturally, without it feeling forced.
            <br /><br />
            Another thing you might consider is using apps like Meetup, which are specifically designed to help people find local events and social groups. You could attend a few events and see which ones feel comfortable to you.
            <br /><br />
            Finally, I&apos;d suggest being patient with the process. Friendships as an adult do take more time to develop, but if you put yourself out there consistently, you&apos;ll definitely start building a network. Good luck — I&apos;m sure you&apos;ll find your people!&quot;
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {["3 suggestions ✓", "Reasons given ✓", "Natural tone ✓", "Full 90s ✓"].map((item) => (
              <span key={item} className="bg-green-100 text-green-800 rounded px-2 py-1 text-center font-medium">{item}</span>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
