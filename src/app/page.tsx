import Link from "next/link";
import { Headphones, BookOpen, PenLine, Mic, BarChart3, Plane, Clock, Target, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card, CardGrid } from "@/components/Card";

const sections = [
  {
    href: "/listening",
    icon: Headphones,
    title: "Listening",
    color: "blue",
    duration: "47–55 min",
    questions: "38 questions",
    parts: "6 parts",
    tip: "Audio plays once — no replay. Note-taking is critical.",
  },
  {
    href: "/reading",
    icon: BookOpen,
    title: "Reading",
    color: "green",
    duration: "55–60 min",
    questions: "38 questions",
    parts: "4 parts",
    tip: "Only section where you can go back and review answers.",
  },
  {
    href: "/writing",
    icon: PenLine,
    title: "Writing",
    color: "purple",
    duration: "53–60 min",
    questions: "2 tasks",
    parts: "Email + Survey",
    tip: "150–200 words per task. Address all bullet points.",
  },
  {
    href: "/speaking",
    icon: Mic,
    title: "Speaking",
    color: "orange",
    duration: "15–20 min",
    questions: "8 tasks",
    parts: "30s prep + 60–90s speaking",
    tip: "No human examiner — fully computerized and recorded.",
  },
];

const colorMap: Record<string, { card: string; icon: string; link: string }> = {
  blue: { card: "border-blue-200 hover:border-blue-300", icon: "bg-blue-100 text-blue-700", link: "text-blue-700" },
  green: { card: "border-green-200 hover:border-green-300", icon: "bg-green-100 text-green-700", link: "text-green-700" },
  purple: { card: "border-purple-200 hover:border-purple-300", icon: "bg-purple-100 text-purple-700", link: "text-purple-700" },
  orange: { card: "border-orange-200 hover:border-orange-300", icon: "bg-orange-100 text-orange-700", link: "text-orange-700" },
};

const clbScores = [
  { score: "12", clb: "CLB 12", level: "Expert", use: "Advanced professional" },
  { score: "11", clb: "CLB 11", level: "Expert", use: "Advanced professional" },
  { score: "10", clb: "CLB 10", level: "Advanced", use: "Max CRS points (Express Entry)" },
  { score: "9", clb: "CLB 9", level: "Advanced", use: "Strong Express Entry profile" },
  { score: "8", clb: "CLB 8", level: "Competent", use: "Good CRS score" },
  { score: "7", clb: "CLB 7", level: "Competent", use: "Min for FSWP Express Entry" },
  { score: "6", clb: "CLB 6", level: "Basic", use: "Min for some CEC occupations" },
  { score: "5", clb: "CLB 5", level: "Basic", use: "Min for some CEC occupations" },
  { score: "4", clb: "CLB 4", level: "Basic", use: "Min for Citizenship (L+S only)" },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-brand-600 text-white rounded-full px-4 py-1.5 text-sm font-medium mb-4">
          <Target className="w-4 h-4" />
          Personal Study Guide
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
          CELPIP Exam Guide
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Canadian English Language Proficiency Index Program — complete preparation for all four skills.
        </p>
      </div>

      {/* Quick stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {[
          { icon: Clock, label: "Total Duration", value: "~3 hours" },
          { icon: Target, label: "Score Scale", value: "1 – 12" },
          { icon: CheckCircle2, label: "Express Entry Min", value: "CLB 7" },
          { icon: AlertTriangle, label: "Citizenship Min", value: "CLB 4 (L+S)" },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
            <Icon className="w-5 h-5 text-brand-600 mx-auto mb-1" />
            <div className="text-xl font-bold text-gray-900">{value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* About CELPIP */}
      <Card className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-3">What is CELPIP?</h2>
        <p className="text-gray-700 mb-3 leading-relaxed">
          CELPIP (Canadian English Language Proficiency Index Program) is a fully computer-delivered English
          proficiency test designed for Canadian immigration and citizenship. Administered by Paragon Testing
          Enterprises, it is accepted by IRCC for Express Entry, permanent residency, and Canadian citizenship.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">CELPIP-General</h4>
            <p className="text-sm text-gray-600">All 4 skills (Listening, Reading, Writing, Speaking). ~3 hours. Used for Express Entry and permanent residency.</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">CELPIP-General-LS</h4>
            <p className="text-sm text-gray-600">Listening and Speaking only. ~70 minutes. Specifically for Canadian citizenship applications (ages 18–54).</p>
          </div>
        </div>
      </Card>

      {/* Test Sections */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Test Sections</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {sections.map(({ href, icon: Icon, title, color, duration, questions, parts, tip }) => {
          const c = colorMap[color];
          return (
            <Link
              key={href}
              href={href}
              className={`bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition-all group ${c.card}`}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className={`rounded-lg p-2 ${c.icon}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-0.5">{duration}</span>
                    <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-0.5">{questions}</span>
                    <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-0.5">{parts}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{tip}</p>
              <span className={`text-sm font-medium mt-3 inline-block group-hover:underline ${c.link}`}>
                Study {title} →
              </span>
            </Link>
          );
        })}
      </div>

      {/* Score Quick Reference */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Score Quick Reference</h2>
          <Link href="/scoring" className="text-sm text-brand-600 hover:underline font-medium">
            Full scoring guide →
          </Link>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left p-3 font-semibold text-gray-700">CELPIP Score</th>
                <th className="text-left p-3 font-semibold text-gray-700">CLB Level</th>
                <th className="text-left p-3 font-semibold text-gray-700 hidden sm:table-cell">Proficiency</th>
                <th className="text-left p-3 font-semibold text-gray-700">Immigration Use</th>
              </tr>
            </thead>
            <tbody>
              {clbScores.map((row, i) => (
                <tr
                  key={row.score}
                  className={`border-b border-gray-100 ${
                    row.score === "10" ? "bg-green-50" : row.score === "7" ? "bg-blue-50" : row.score === "4" ? "bg-amber-50" : i % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="p-3 font-bold text-gray-900">{row.score}</td>
                  <td className="p-3 font-medium text-gray-700">{row.clb}</td>
                  <td className="p-3 text-gray-600 hidden sm:table-cell">{row.level}</td>
                  <td className="p-3 text-gray-600 text-xs">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex gap-4 mt-2 text-xs text-gray-500 flex-wrap">
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-100 rounded inline-block"></span> Max CRS points</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-100 rounded inline-block"></span> Express Entry minimum</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-amber-100 rounded inline-block"></span> Citizenship minimum (L+S)</span>
        </div>
      </div>

      {/* Key Resources */}
      <CardGrid cols={2}>
        <Link href="/scoring">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <div className="flex items-start gap-3">
              <BarChart3 className="w-6 h-6 text-brand-600 shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Scoring & CLB Levels</h3>
                <p className="text-sm text-gray-600">Complete score chart, CLB mapping, CRS points breakdown, and performance descriptors for each level.</p>
              </div>
            </div>
          </Card>
        </Link>
        <Link href="/immigration">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <div className="flex items-start gap-3">
              <Plane className="w-6 h-6 text-brand-600 shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Immigration Requirements</h3>
                <p className="text-sm text-gray-600">Express Entry CRS points, FSWP/CEC minimums, citizenship requirements, and test validity periods.</p>
              </div>
            </div>
          </Card>
        </Link>
      </CardGrid>

      {/* Test Day Timeline */}
      <Card className="mt-8" title="Test Day Timeline (3 hours total)">
        <div className="space-y-2">
          {[
            { section: "Listening", time: "47–55 min", note: "38 questions, 6 parts. Audio plays once only." },
            { section: "Reading", time: "55–60 min", note: "38 questions, 4 parts. Can review within section." },
            { section: "Writing", time: "53–60 min", note: "2 tasks: email (27 min) + survey response (26 min)." },
            { section: "Speaking", time: "15–20 min", note: "8 tasks, 30s prep + 60–90s speaking each." },
          ].map(({ section, time, note }, i) => (
            <div key={section} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
              <div className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </div>
              <div>
                <span className="font-semibold text-gray-900">{section}</span>
                <span className="ml-2 text-xs bg-white border border-gray-200 rounded-full px-2 py-0.5 text-gray-600">
                  {time}
                </span>
                <p className="text-sm text-gray-600 mt-0.5">{note}</p>
              </div>
            </div>
          ))}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-2 text-sm text-amber-800">
            <strong>Important:</strong> Once you move from one section to the next, you cannot go back. Sections are sequential with no breaks.
          </div>
        </div>
      </Card>
    </div>
  );
}
