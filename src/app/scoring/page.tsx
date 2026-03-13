import { BarChart3 } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { TipBox } from "@/components/TipBox";

const scoreChart = [
  {
    score: "12",
    clb: "CLB 12",
    proficiency: "Expert",
    listening: "Understands virtually everything; identifies subtle nuances and unstated implications",
    reading: "Reads virtually all text types with full understanding; extracts implicit information effortlessly",
    writing: "Writes with complete precision, natural style, and sophisticated vocabulary across all contexts",
    speaking: "Speaks with complete fluency, precision, and naturalness in all situations",
    badge: "bg-emerald-100 text-emerald-800",
  },
  {
    score: "11",
    clb: "CLB 11",
    proficiency: "Expert",
    listening: "Understands virtually everything; small gaps in understanding of rare idioms or accents",
    reading: "Reads all common text types fluently; understands complex arguments and implied meaning",
    writing: "Writes clearly and fluently on complex topics with very few errors",
    speaking: "Speaks fluently and spontaneously; very natural and easy to understand",
    badge: "bg-emerald-100 text-emerald-800",
  },
  {
    score: "10",
    clb: "CLB 10",
    proficiency: "Advanced",
    listening: "Understands complex and technical speech; follows fast-paced or non-standard accents with minimal difficulty",
    reading: "Reads complex texts fluently; understands most implicit meanings and abstract ideas",
    writing: "Writes clearly on complex topics; minor grammar/vocabulary errors don't impede meaning",
    speaking: "Expresses ideas clearly and fluently; communicates complex information precisely",
    badge: "bg-blue-100 text-blue-800",
    highlight: "Max CRS points",
  },
  {
    score: "9",
    clb: "CLB 9",
    proficiency: "Advanced",
    listening: "Understands most complex speech; occasional difficulty with unfamiliar topics or fast speech",
    reading: "Reads most types of texts; can understand most complex ideas with some effort",
    writing: "Writes clearly and coherently; vocabulary and grammar mostly accurate",
    speaking: "Communicates fluently in most situations; occasional hesitation or imprecision",
    badge: "bg-blue-100 text-blue-800",
  },
  {
    score: "8",
    clb: "CLB 8",
    proficiency: "Competent",
    listening: "Understands most everyday and some specialized speech; may need repetition for complex topics",
    reading: "Reads most everyday texts with good comprehension; some complex texts require re-reading",
    writing: "Writes coherently with adequate vocabulary; some grammar/spelling errors present",
    speaking: "Communicates effectively in most everyday and work situations; some hesitation",
    badge: "bg-indigo-100 text-indigo-800",
  },
  {
    score: "7",
    clb: "CLB 7",
    proficiency: "Competent",
    listening: "Understands moderately complex speech in familiar contexts; may miss details in fast or complex audio",
    reading: "Reads moderately complex texts; may need more time or re-reading for difficult passages",
    writing: "Writes adequately on familiar topics; grammar and vocabulary limitations apparent",
    speaking: "Communicates adequately in common everyday and work situations; noticeable effort",
    badge: "bg-indigo-100 text-indigo-800",
    highlight: "Min for FSWP Express Entry",
  },
  {
    score: "6",
    clb: "CLB 6",
    proficiency: "Basic",
    listening: "Understands simple to moderately complex speech; frequent repetition needed for complex topics",
    reading: "Reads simple to moderately complex text with reasonable understanding",
    writing: "Writes adequately on familiar topics; frequent grammatical errors",
    speaking: "Communicates in simple situations; limited vocabulary and grammatical errors affect flow",
    badge: "bg-purple-100 text-purple-800",
  },
  {
    score: "5",
    clb: "CLB 5",
    proficiency: "Basic",
    listening: "Understands simple speech; significant difficulty with moderately complex topics",
    reading: "Reads simple texts with effort; limited comprehension of complex material",
    writing: "Writes simple messages; grammar and vocabulary errors are frequent",
    speaking: "Communicates in very simple situations; limited range and frequent errors",
    badge: "bg-purple-100 text-purple-800",
  },
  {
    score: "4",
    clb: "CLB 4",
    proficiency: "Basic",
    listening: "Understands basic speech on familiar topics with considerable difficulty",
    reading: "Reads basic, short texts on familiar topics",
    writing: "Writes very simple messages with many errors",
    speaking: "Communicates in basic situations with great difficulty",
    badge: "bg-gray-100 text-gray-700",
    highlight: "Min for Citizenship (L+S)",
  },
  {
    score: "3",
    clb: "CLB 3",
    proficiency: "Basic",
    listening: "Understands very simple speech only",
    reading: "Reads very simple, short texts only",
    writing: "Writes very simple messages; errors are pervasive",
    speaking: "Limited to very basic communication",
    badge: "bg-gray-100 text-gray-700",
  },
];

const crsPoints = [
  { clb: "CLB 10+", listenRead: "29 pts each", writingSpeak: "32 pts each", total: "122 pts", note: "Maximum from first language test" },
  { clb: "CLB 9", listenRead: "23 pts each", writingSpeak: "25 pts each", total: "96 pts", note: "" },
  { clb: "CLB 8", listenRead: "17 pts each", writingSpeak: "20 pts each", total: "74 pts", note: "" },
  { clb: "CLB 7", listenRead: "9 pts each", writingSpeak: "10 pts each", total: "38 pts", note: "Minimum for FSWP" },
  { clb: "CLB 6 and below", listenRead: "0 pts", writingSpeak: "0 pts", total: "0 pts", note: "Does not qualify for FSWP" },
];

const secondLangCrs = [
  { clb: "CLB 9+", points: "22 pts (each skill)", total: "88 pts max" },
  { clb: "CLB 7–8", points: "6 pts (each skill)", total: "24 pts max" },
  { clb: "CLB 5–6", points: "1 pt (each skill)", total: "4 pts max" },
  { clb: "CLB 4 and below", points: "0 pts", total: "0 pts" },
];

export default function ScoringPage() {
  return (
    <div>
      <SectionHeader
        icon={BarChart3}
        title="Scoring & CLB Levels"
        subtitle="CELPIP scores 1–12 map directly to CLB levels 1–12. Each skill is scored independently."
        color="teal"
        stats={[
          { label: "score range", value: "1–12" },
          { label: "CLB levels", value: "1–12" },
          { label: "skills scored", value: "4" },
          { label: "min raters/task", value: "3–4" },
        ]}
      />

      <TipBox variant="info" title="Direct CLB mapping — no conversion needed">
        Unlike IELTS (which requires a conversion chart), CELPIP scores map 1:1 to CLB levels. CELPIP 7 = CLB 7. CELPIP 10 = CLB 10. This makes it straightforward for IRCC applications.
      </TipBox>

      {/* Full score chart */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Full Score & Descriptor Chart</h2>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm mb-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left p-3 font-semibold text-gray-700 w-14">Score</th>
                <th className="text-left p-3 font-semibold text-gray-700 w-20">CLB</th>
                <th className="text-left p-3 font-semibold text-gray-700 w-24 hidden sm:table-cell">Level</th>
                <th className="text-left p-3 font-semibold text-gray-700">Listening</th>
                <th className="text-left p-3 font-semibold text-gray-700 hidden lg:table-cell">Reading</th>
                <th className="text-left p-3 font-semibold text-gray-700 hidden lg:table-cell">Writing</th>
                <th className="text-left p-3 font-semibold text-gray-700 hidden md:table-cell">Speaking</th>
              </tr>
            </thead>
            <tbody>
              {scoreChart.map((row, i) => (
                <tr
                  key={row.score}
                  className={`border-b border-gray-100 ${
                    row.score === "10" ? "bg-blue-50" :
                    row.score === "7" ? "bg-indigo-50" :
                    row.score === "4" ? "bg-amber-50" :
                    i % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="p-3">
                    <div className="font-bold text-gray-900 text-lg">{row.score}</div>
                    {row.highlight && (
                      <div className="text-xs text-brand-600 font-medium leading-tight mt-0.5">{row.highlight}</div>
                    )}
                  </td>
                  <td className="p-3">
                    <span className={`text-xs font-bold rounded-full px-2 py-0.5 ${row.badge}`}>{row.clb}</span>
                  </td>
                  <td className="p-3 text-gray-600 hidden sm:table-cell text-xs">{row.proficiency}</td>
                  <td className="p-3 text-xs text-gray-600 max-w-xs">{row.listening}</td>
                  <td className="p-3 text-xs text-gray-600 max-w-xs hidden lg:table-cell">{row.reading}</td>
                  <td className="p-3 text-xs text-gray-600 max-w-xs hidden lg:table-cell">{row.writing}</td>
                  <td className="p-3 text-xs text-gray-600 max-w-xs hidden md:table-cell">{row.speaking}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-xs text-gray-500 mb-8">
        Showing Listening descriptions on smaller screens. Full descriptors visible on desktop.
      </p>

      {/* Key thresholds */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Score Thresholds</h2>
      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        {[
          {
            score: "CLB 4",
            label: "Citizenship Minimum",
            color: "border-amber-200 bg-amber-50",
            titleColor: "text-amber-800",
            body: "The minimum CELPIP score required for Canadian citizenship. Only Listening and Speaking are tested (use CELPIP-LS). Applies to adults aged 18–54.",
          },
          {
            score: "CLB 7",
            label: "Express Entry Minimum (FSWP)",
            color: "border-blue-200 bg-blue-50",
            titleColor: "text-blue-800",
            body: "The minimum score for Federal Skilled Worker Program applications through Express Entry. Required in all 4 skills. Below CLB 7 in any skill = 0 CRS language points.",
          },
          {
            score: "CLB 10",
            label: "Maximum CRS Points",
            color: "border-green-200 bg-green-50",
            titleColor: "text-green-800",
            body: "Achieving CLB 10 in all 4 skills earns the maximum language CRS points. Scores of CLB 11 or 12 do not provide additional CRS points beyond CLB 10.",
          },
        ].map((item) => (
          <div key={item.score} className={`rounded-xl border p-5 ${item.color}`}>
            <div className={`text-3xl font-bold mb-1 ${item.titleColor}`}>{item.score}</div>
            <div className={`text-sm font-semibold mb-2 ${item.titleColor}`}>{item.label}</div>
            <p className="text-sm text-gray-700">{item.body}</p>
          </div>
        ))}
      </div>

      {/* CRS Points table */}
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Express Entry CRS Language Points</h2>
      <p className="text-gray-600 text-sm mb-4">CRS language points are awarded for your first official language. A second language (French) also contributes additional points.</p>

      <Card className="mb-4">
        <h3 className="font-semibold text-gray-900 mb-3">First Language (English) CRS Points</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 border border-gray-200 font-semibold">CLB Level</th>
                <th className="text-center p-3 border border-gray-200 font-semibold">Listening & Reading<br /><span className="font-normal text-gray-500">(per skill)</span></th>
                <th className="text-center p-3 border border-gray-200 font-semibold">Writing & Speaking<br /><span className="font-normal text-gray-500">(per skill)</span></th>
                <th className="text-center p-3 border border-gray-200 font-semibold">Total Points</th>
                <th className="text-left p-3 border border-gray-200 font-semibold hidden sm:table-cell">Notes</th>
              </tr>
            </thead>
            <tbody>
              {crsPoints.map((row, i) => (
                <tr key={i} className={`${row.clb === "CLB 10+" ? "bg-green-50" : row.clb === "CLB 7" ? "bg-blue-50" : i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                  <td className="p-3 border border-gray-200 font-bold text-gray-900">{row.clb}</td>
                  <td className="p-3 border border-gray-200 text-center font-medium text-teal-700">{row.listenRead}</td>
                  <td className="p-3 border border-gray-200 text-center font-medium text-teal-700">{row.writingSpeak}</td>
                  <td className="p-3 border border-gray-200 text-center font-bold text-gray-900">{row.total}</td>
                  <td className="p-3 border border-gray-200 text-xs text-gray-600 hidden sm:table-cell">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <TipBox variant="tip" title="Important: Per-skill scoring">
        If you score CLB 10 in Listening, CLB 9 in Reading, CLB 10 in Writing, and CLB 8 in Speaking, your CRS points are calculated per skill individually — not averaged. Weak skills matter a lot.
      </TipBox>

      <Card className="mb-10">
        <h3 className="font-semibold text-gray-900 mb-3">Second Language (French/English) CRS Points</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 border border-gray-200 font-semibold">CLB Level</th>
                <th className="text-center p-3 border border-gray-200 font-semibold">Points (per skill)</th>
                <th className="text-center p-3 border border-gray-200 font-semibold">Max Total</th>
              </tr>
            </thead>
            <tbody>
              {secondLangCrs.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-3 border border-gray-200 font-bold text-gray-900">{row.clb}</td>
                  <td className="p-3 border border-gray-200 text-center font-medium text-teal-700">{row.points}</td>
                  <td className="p-3 border border-gray-200 text-center font-bold text-gray-900">{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">Maximum CRS points from both languages combined: 150 for French as first language scenarios.</p>
      </Card>

      {/* How scoring works */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">How CELPIP Scoring Works</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {[
          {
            title: "Multiple raters per task",
            body: "Writing tasks are rated by at least 4 human raters. Speaking tasks are rated by at least 3. Their scores are averaged to determine your final score for each criterion.",
          },
          {
            title: "Performance Standards (not pass/fail)",
            body: "There is no fixed passing score for CELPIP itself. The score you need depends on the specific immigration program or institution. For Express Entry FSWP: minimum CLB 7 in all 4 skills.",
          },
          {
            title: "No penalty for wrong answers",
            body: "In Listening and Reading, there is no score deduction for incorrect answers. Always provide an answer — never leave a question blank.",
          },
          {
            title: "Skills scored independently",
            body: "Your 4 skill scores are not averaged. You could receive CELPIP 10/8/9/7 for L/R/W/S. Each skill is reported separately and matters individually for immigration programs.",
          },
          {
            title: "Results timeline",
            body: "CELPIP test results are typically available within 4–8 calendar days of your test date. You access results through your My CELPIP account. Expedited scoring is not available.",
          },
          {
            title: "Score validity",
            body: "For Express Entry: scores valid for 2 years from test date. For Canadian citizenship applications: no expiry — IRCC accepts older CELPIP scores. Check the specific program requirements.",
          },
        ].map((item) => (
          <Card key={item.title}>
            <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
            <p className="text-sm text-gray-700">{item.body}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
