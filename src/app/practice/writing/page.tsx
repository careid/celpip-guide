"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { PenLine, Clock, CheckCircle2, AlertCircle, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import clsx from "clsx";
import { getRandomPrompt, type WritingPrompt, type TaskType } from "@/lib/writing-prompts";
import {
  saveWritingSession,
  getRecentWritingSessions,
  formatRelativeTime,
  formatCriterionName,
  generateSessionId,
  type WritingSession,
} from "@/lib/session-store";
import type { EvaluationResult } from "@/app/api/evaluate/route";

type Phase = "idle" | "active" | "submitting" | "feedback";

function countWords(text: string): number {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
}

function WordCountBadge({ count }: { count: number }) {
  const color =
    count < 140
      ? "text-gray-500"
      : count >= 150 && count <= 200
      ? "text-green-700"
      : count > 200
      ? "text-amber-700"
      : "text-yellow-600";
  return (
    <span className={clsx("text-sm font-mono font-semibold tabular-nums", color)}>
      {count} / 150–200 words
    </span>
  );
}

function TimerDisplay({ secondsLeft, totalSeconds }: { secondsLeft: number; totalSeconds: number }) {
  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const pct = secondsLeft / totalSeconds;
  const urgent = secondsLeft < 180; // last 3 minutes
  return (
    <div className={clsx("flex items-center gap-2 text-sm font-mono font-semibold tabular-nums", urgent ? "text-red-600" : "text-gray-700")}>
      <Clock className="w-3.5 h-3.5 shrink-0" />
      {mins}:{secs.toString().padStart(2, "0")} remaining
      <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={clsx("h-full rounded-full transition-all", urgent ? "bg-red-500" : "bg-brand-500")}
          style={{ width: `${pct * 100}%` }}
        />
      </div>
    </div>
  );
}

function ScoreChip({ score }: { score: number }) {
  const color =
    score >= 10 ? "bg-green-100 text-green-800 border-green-200"
    : score >= 8 ? "bg-blue-100 text-blue-800 border-blue-200"
    : score >= 6 ? "bg-yellow-100 text-yellow-800 border-yellow-200"
    : "bg-red-100 text-red-800 border-red-200";
  return (
    <span className={clsx("inline-flex items-center justify-center w-9 h-9 rounded-lg border text-base font-bold shrink-0", color)}>
      {score}
    </span>
  );
}

function CriterionCard({
  label,
  score,
  observations,
  extra,
}: {
  label: string;
  score: number;
  observations: string[];
  extra?: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <div className="flex items-start gap-3 mb-3">
        <ScoreChip score={score} />
        <div>
          <p className="font-semibold text-gray-900 text-sm">{label}</p>
          <p className="text-xs text-gray-500">Score: {score} / 12</p>
        </div>
      </div>
      {extra}
      {observations.length > 0 && (
        <ul className="space-y-1.5 mt-2">
          {observations.map((obs, i) => (
            <li key={i} className="flex gap-2 text-sm text-gray-700">
              <span className="text-gray-400 shrink-0 mt-0.5">•</span>
              {obs}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function WritingPracticePage() {
  const [taskType, setTaskType] = useState<TaskType>("task1");
  const [prompt, setPrompt] = useState<WritingPrompt>(() => getRandomPrompt("task1"));
  const [phase, setPhase] = useState<Phase>("idle");
  const [text, setText] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [feedback, setFeedback] = useState<EvaluationResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showExemplar, setShowExemplar] = useState(false);
  const [recentSessions, setRecentSessions] = useState<WritingSession[]>([]);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalSeconds = prompt.timeMinutes * 60;

  useEffect(() => {
    setRecentSessions(getRecentWritingSessions(3));
  }, []);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const handleStart = useCallback(() => {
    setPhase("active");
    setSecondsLeft(totalSeconds);
    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [totalSeconds, clearTimer]);

  // Auto-submit when timer hits 0
  useEffect(() => {
    if (phase === "active" && secondsLeft === 0) {
      handleSubmit();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft, phase]);

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  async function handleSubmit() {
    clearTimer();
    if (text.trim().length < 20) {
      setErrorMsg("Please write at least a few sentences before submitting.");
      return;
    }
    setPhase("submitting");
    setErrorMsg(null);

    try {
      const body = {
        promptText: prompt.type === "task1"
          ? prompt.scenario
          : `${prompt.scenario}\nOption A: ${prompt.optionA}\nOption B: ${prompt.optionB}`,
        bullets: prompt.type === "task1" ? prompt.bullets : undefined,
        taskType: prompt.type,
        tone: prompt.type === "task1" ? prompt.tone : undefined,
        responseText: text,
      };

      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Evaluation failed");
      }

      const result: EvaluationResult = await res.json();
      setFeedback(result);
      setPhase("feedback");

      // Save to localStorage
      const wordCount = countWords(text);
      const session: WritingSession = {
        id: generateSessionId(),
        timestamp: Date.now(),
        taskType: prompt.type,
        promptId: prompt.id,
        wordCount,
        scores: {
          task_fulfillment: result.task_fulfillment.score,
          coherence: result.coherence.score,
          vocabulary: result.vocabulary.score,
          readability: result.readability.score,
        },
        flags: [
          ...(result.task_fulfillment.bullet_coverage
            ? Object.entries(result.task_fulfillment.bullet_coverage)
                .filter(([, v]) => !v)
                .map(([k]) => `missed_${k}`)
            : []),
          ...(result.task_fulfillment.tone_match === "incorrect" ? ["wrong_tone"] : []),
          ...(result.vocabulary.repeated_words.length > 0 ? ["word_repetition"] : []),
        ],
      };
      saveWritingSession(session);
      setRecentSessions(getRecentWritingSessions(3));
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setPhase("active");
    }
  }

  function handleNewPrompt() {
    clearTimer();
    const newPrompt = getRandomPrompt(taskType);
    setPrompt(newPrompt);
    setPhase("idle");
    setText("");
    setFeedback(null);
    setErrorMsg(null);
    setShowExemplar(false);
    setSecondsLeft(0);
  }

  function handleTaskTypeChange(type: TaskType) {
    setTaskType(type);
    setPrompt(getRandomPrompt(type));
    setPhase("idle");
    setText("");
    setFeedback(null);
    setErrorMsg(null);
    setShowExemplar(false);
    setSecondsLeft(0);
    clearTimer();
  }

  const wordCount = countWords(text);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <PenLine className="w-5 h-5 text-purple-600" />
          <h1 className="text-2xl font-bold text-gray-900">Writing Practice</h1>
        </div>
        <p className="text-sm text-gray-500">
          Write under timed conditions. Rubric-specific feedback after submission.
        </p>
      </div>

      {/* Task type selector */}
      {phase === "idle" && (
        <div className="flex gap-2 mb-5">
          {(["task1", "task2"] as TaskType[]).map((t) => (
            <button
              key={t}
              onClick={() => handleTaskTypeChange(t)}
              className={clsx(
                "px-4 py-2 rounded-lg text-sm font-medium border transition-colors",
                taskType === t
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-white text-gray-700 border-gray-200 hover:border-purple-300"
              )}
            >
              {t === "task1" ? "Task 1 — Email (27 min)" : "Task 2 — Survey (26 min)"}
            </button>
          ))}
        </div>
      )}

      {/* Prompt card */}
      <div className="bg-white rounded-xl border border-purple-100 p-5 mb-5 shadow-sm">
        {prompt.type === "task1" ? (
          <>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold text-purple-700 bg-purple-50 rounded-full px-2 py-0.5 uppercase tracking-wide">
                Task 1 · Email
              </span>
              <span className="text-xs text-gray-500 capitalize">
                {prompt.tone} tone · Write to {prompt.recipient}
              </span>
            </div>
            <p className="text-gray-800 text-sm leading-relaxed mb-4">{prompt.scenario}</p>
            <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">In your email:</p>
            <ul className="space-y-1.5">
              {prompt.bullets.map((b, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-700">
                  <span className="text-purple-500 font-bold shrink-0">•</span>
                  {b}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold text-purple-700 bg-purple-50 rounded-full px-2 py-0.5 uppercase tracking-wide">
                Task 2 · Survey
              </span>
              <span className="text-xs text-gray-500">{prompt.topic}</span>
            </div>
            <p className="text-gray-800 text-sm leading-relaxed mb-4">{prompt.scenario}</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[prompt.optionA, prompt.optionB].map((opt, i) => (
                <div key={i} className="bg-purple-50 border border-purple-100 rounded-lg p-3 text-sm text-purple-900">
                  <span className="font-bold">Option {i === 0 ? "A" : "B"}:</span> {opt}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">Choose ONE option and write 150–200 words explaining your preference.</p>
          </>
        )}
      </div>

      {/* Timer bar (when active) */}
      {phase === "active" && (
        <div className="flex items-center justify-between mb-3 px-1">
          <TimerDisplay secondsLeft={secondsLeft} totalSeconds={totalSeconds} />
          <WordCountBadge count={wordCount} />
        </div>
      )}

      {/* Textarea */}
      {(phase === "idle" || phase === "active") && (
        <>
          <textarea
            className={clsx(
              "w-full rounded-xl border p-4 text-sm text-gray-900 leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors",
              phase === "idle" ? "bg-gray-50 border-gray-200 cursor-default" : "bg-white border-purple-200"
            )}
            rows={12}
            placeholder={
              phase === "idle"
                ? 'Click \u201cStart Writing\u201d to begin your timed session\u2026'
                : prompt.type === "task1"
                ? "Begin your email here…"
                : "State your choice clearly in your first sentence…"
            }
            value={text}
            onChange={(e) => setText(e.target.value)}
            readOnly={phase === "idle"}
          />
          {phase === "active" && (
            <div className="flex justify-between items-center mt-2 mb-5">
              <WordCountBadge count={wordCount} />
              <span className="text-xs text-gray-400">
                {wordCount < 150 ? `${150 - wordCount} more words to reach minimum` : wordCount > 200 ? `${wordCount - 200} words over maximum` : "Word count is in range ✓"}
              </span>
            </div>
          )}
        </>
      )}

      {/* Error */}
      {errorMsg && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-sm text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          {errorMsg}
        </div>
      )}

      {/* CTA buttons */}
      <div className="flex gap-3 mb-8">
        {phase === "idle" && (
          <>
            <button
              onClick={handleStart}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Start Writing
            </button>
            <button
              onClick={handleNewPrompt}
              className="px-4 py-3 rounded-xl border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-900 transition-colors"
              title="New prompt"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </>
        )}
        {phase === "active" && (
          <button
            onClick={handleSubmit}
            disabled={wordCount < 10}
            className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Submit for Feedback
          </button>
        )}
        {phase === "submitting" && (
          <div className="flex-1 flex items-center justify-center gap-2 py-3 bg-purple-50 rounded-xl text-purple-700 text-sm font-medium">
            <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
            Evaluating against CELPIP rubric…
          </div>
        )}
      </div>

      {/* Feedback panel */}
      {phase === "feedback" && feedback && (
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Rubric Feedback</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{wordCount} words</span>
              {feedback.task_fulfillment.word_count_status === "below" && (
                <span className="text-red-600 font-medium">· below minimum</span>
              )}
              {feedback.task_fulfillment.word_count_status === "above" && (
                <span className="text-amber-600 font-medium">· over maximum</span>
              )}
              {feedback.task_fulfillment.word_count_status === "within" && (
                <span className="text-green-600 font-medium">· in range ✓</span>
              )}
            </div>
          </div>

          {/* Task Fulfillment */}
          <CriterionCard
            label="Task Fulfillment"
            score={feedback.task_fulfillment.score}
            observations={feedback.task_fulfillment.observations}
            extra={
              feedback.task_fulfillment.bullet_coverage ? (
                <div className="flex gap-2 mb-2 flex-wrap">
                  {Object.entries(feedback.task_fulfillment.bullet_coverage).map(([k, covered], i) => (
                    <span
                      key={k}
                      className={clsx(
                        "text-xs rounded-full px-2 py-0.5 flex items-center gap-1",
                        covered ? "bg-green-100 text-green-800" : "bg-red-100 text-red-700"
                      )}
                    >
                      {covered ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      Bullet {i + 1}
                    </span>
                  ))}
                  {feedback.task_fulfillment.tone_match && (
                    <span className={clsx("text-xs rounded-full px-2 py-0.5", feedback.task_fulfillment.tone_match === "correct" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-700")}>
                      Tone: {feedback.task_fulfillment.tone_match}
                    </span>
                  )}
                </div>
              ) : null
            }
          />

          {/* Coherence */}
          <CriterionCard
            label="Coherence & Organization"
            score={feedback.coherence.score}
            observations={feedback.coherence.observations}
          />

          {/* Vocabulary */}
          <CriterionCard
            label="Vocabulary"
            score={feedback.vocabulary.score}
            observations={feedback.vocabulary.observations}
            extra={
              feedback.vocabulary.repeated_words.length > 0 ? (
                <div className="mb-2 flex flex-wrap gap-1">
                  {feedback.vocabulary.suggestions.map((s) => (
                    <div key={s.word} className="text-xs bg-amber-50 border border-amber-200 rounded-lg px-2 py-1">
                      <span className="text-amber-800 font-semibold">&ldquo;{s.word}&rdquo;</span>
                      <span className="text-gray-500"> → </span>
                      <span className="text-gray-700">{s.alternatives.join(", ")}</span>
                    </div>
                  ))}
                </div>
              ) : null
            }
          />

          {/* Readability */}
          <CriterionCard
            label="Readability"
            score={feedback.readability.score}
            observations={feedback.readability.observations}
            extra={
              feedback.readability.register_response === "mixed" ? (
                <div className="mb-2 text-xs bg-orange-50 border border-orange-200 rounded-lg px-2 py-1 text-orange-800">
                  Register mismatch — prompt is {feedback.readability.register_prompt}, response is {feedback.readability.register_response}
                </div>
              ) : null
            }
          />

          {/* Exemplar (hidden by default) */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setShowExemplar(!showExemplar)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700"
            >
              <span>View a strong sample response for this prompt</span>
              {showExemplar ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {showExemplar && (
              <div className="p-4 text-sm text-gray-700 leading-relaxed bg-white border-t border-gray-100">
                <p className="text-xs text-gray-400 mb-3 italic">
                  This is a model response — compare it to yours now that you&apos;ve already attempted the prompt.
                </p>
                {prompt.type === "task1" ? (
                  <div className="whitespace-pre-line font-mono text-xs bg-gray-50 rounded-lg p-3 text-gray-800">
                    {`Subject: [Clear, task-relevant subject line]

Dear [Title] [Last Name],

I am writing to [state purpose clearly — one sentence].

[Paragraph addressing bullet 1 — 2–3 sentences with specific detail]

[Paragraph addressing bullet 2 — 2–3 sentences with specific detail]

[Paragraph addressing bullet 3 — 2–3 sentences with specific detail]

Thank you for your time and consideration. Please do not hesitate to contact me if you require any additional information.

[Formal closing],
[Full Name]`}
                  </div>
                ) : (
                  <div className="whitespace-pre-line bg-gray-50 rounded-lg p-3 text-gray-800 text-sm leading-relaxed">
                    {`I strongly believe that [Option X] is the better choice for [the community/workers/students].

Firstly, [Reason 1 with a specific example or elaboration — 2–3 sentences].

Furthermore, [Reason 2 with a specific example or elaboration — 2–3 sentences].

While some may argue that [Option Y] has merit — particularly because [brief acknowledgement] — I maintain that [restate why your choice is stronger].

For these reasons, I believe [Option X] would have a greater long-term impact.`}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Actions after feedback */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleNewPrompt}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              New Prompt
            </button>
          </div>
        </div>
      )}

      {/* Recent sessions strip */}
      {recentSessions.length > 0 && (
        <div className="border-t border-gray-100 pt-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Recent Sessions</h3>
          <div className="space-y-2">
            {recentSessions.map((s) => (
              <div key={s.id} className="flex items-center justify-between bg-white rounded-lg border border-gray-100 px-3 py-2 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-800">{s.taskType === "task1" ? "Task 1 Email" : "Task 2 Survey"}</span>
                  <span className="text-gray-400">{formatRelativeTime(s.timestamp)}</span>
                  <span className="text-gray-400">{s.wordCount}w</span>
                </div>
                <div className="flex gap-1.5">
                  {Object.entries(s.scores).map(([k, v]) => (
                    <span key={k} title={formatCriterionName(k)} className={clsx("w-6 h-6 rounded text-xs font-bold flex items-center justify-center", v >= 9 ? "bg-green-100 text-green-800" : v >= 7 ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800")}>
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
