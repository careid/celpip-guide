"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Mic, Clock, RefreshCw, Play, Square, ChevronDown, ChevronUp, Volume2 } from "lucide-react";
import clsx from "clsx";
import {
  getRandomSpeakingPrompt,
  TASK_INFO,
  type SpeakingPrompt,
  type SpeakingTaskNum,
} from "@/lib/speaking-prompts";
import {
  saveSpeakingSession,
  getRecentSpeakingSessions,
  formatRelativeTime,
  generateSessionId,
  type SpeakingSession,
} from "@/lib/session-store";

type Phase = "idle" | "prep" | "recording" | "done";

function CountdownRing({ seconds, total, label }: { seconds: number; total: number; label: string }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const pct = seconds / total;
  const urgent = seconds <= 10;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 88 88">
          <circle cx="44" cy="44" r={r} fill="none" stroke="#f3f4f6" strokeWidth="6" />
          <circle
            cx="44" cy="44" r={r}
            fill="none"
            stroke={urgent ? "#ef4444" : "#9333ea"}
            strokeWidth="6"
            strokeDasharray={circ}
            strokeDashoffset={circ * (1 - pct)}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={clsx("text-2xl font-bold font-mono tabular-nums", urgent ? "text-red-600" : "text-gray-900")}>
            {seconds}
          </span>
          <span className="text-xs text-gray-500">sec</span>
        </div>
      </div>
      <p className="text-sm font-medium text-gray-700">{label}</p>
    </div>
  );
}

function PulseRecording() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
      <span className="text-sm font-semibold text-red-600">Recording</span>
    </div>
  );
}

export default function SpeakingPracticePage() {
  const [taskNum, setTaskNum] = useState<SpeakingTaskNum>(1);
  const [prompt, setPrompt] = useState<SpeakingPrompt>(() => getRandomSpeakingPrompt(1));
  const [phase, setPhase] = useState<Phase>("idle");
  const [prepSecondsLeft, setPrepSecondsLeft] = useState(30);
  const [speakSecondsLeft, setSpeakSecondsLeft] = useState(0);
  const [speakSecondsUsed, setSpeakSecondsUsed] = useState(0);
  const [notes, setNotes] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [showTips, setShowTips] = useState(false);
  const [recentSessions, setRecentSessions] = useState<SpeakingSession[]>([]);
  const [mediaError, setMediaError] = useState<string | null>(null);

  const prepTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const speakTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const taskInfo = TASK_INFO[taskNum];

  useEffect(() => {
    setRecentSessions(getRecentSpeakingSessions(3));
  }, []);

  const clearTimers = useCallback(() => {
    if (prepTimerRef.current) { clearInterval(prepTimerRef.current); prepTimerRef.current = null; }
    if (speakTimerRef.current) { clearInterval(speakTimerRef.current); speakTimerRef.current = null; }
  }, []);

  // Cleanup URLs and timers on unmount
  useEffect(() => {
    return () => {
      clearTimers();
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      if (mediaRecorderRef.current?.state === "recording") {
        mediaRecorderRef.current.stop();
      }
    };
  }, [clearTimers, audioUrl]);

  function startSpeakingPhase() {
    const totalSpeakSecs = taskInfo.speakingSeconds;
    setSpeakSecondsLeft(totalSpeakSecs);
    setSpeakSecondsUsed(0);

    // Start MediaRecorder
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      chunksRef.current = [];

      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        // Stop all tracks
        stream.getTracks().forEach((t) => t.stop());
      };

      mr.start();
      setPhase("recording");

      let elapsed = 0;
      speakTimerRef.current = setInterval(() => {
        elapsed++;
        setSpeakSecondsUsed(elapsed);
        setSpeakSecondsLeft((prev) => {
          if (prev <= 1) {
            stopRecording(elapsed);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }).catch((err) => {
      console.error("Microphone access denied:", err);
      setMediaError("Microphone access is required. Please allow microphone access in your browser and try again.");
      setPhase("idle");
    });
  }

  function stopRecording(usedSeconds?: number) {
    clearTimers();
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    const used = usedSeconds ?? speakSecondsUsed;
    setSpeakSecondsUsed(used);
    setPhase("done");

    // Save session
    const session: SpeakingSession = {
      id: generateSessionId(),
      timestamp: Date.now(),
      taskNum,
      promptId: prompt.id,
      speakingTimeUsed: used,
      speakingTimeAllocated: taskInfo.speakingSeconds,
    };
    saveSpeakingSession(session);
    setRecentSessions(getRecentSpeakingSessions(3));
  }

  function handleReady() {
    setPhase("prep");
    setPrepSecondsLeft(30);
    prepTimerRef.current = setInterval(() => {
      setPrepSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(prepTimerRef.current!);
          prepTimerRef.current = null;
          startSpeakingPhase();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function handleNewPrompt() {
    clearTimers();
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setPhase("idle");
    setNotes("");
    setMediaError(null);
    setPrepSecondsLeft(30);
    setSpeakSecondsLeft(0);
    setSpeakSecondsUsed(0);
    const newPrompt = getRandomSpeakingPrompt(taskNum);
    setPrompt(newPrompt);
  }

  function handleTaskChange(t: SpeakingTaskNum) {
    clearTimers();
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setTaskNum(t);
    setPrompt(getRandomSpeakingPrompt(t));
    setPhase("idle");
    setNotes("");
    setMediaError(null);
  }

  const timePct = speakSecondsUsed / taskInfo.speakingSeconds;
  const timeUsedLabel = `${speakSecondsUsed}s of ${taskInfo.speakingSeconds}s used`;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Mic className="w-5 h-5 text-orange-600" />
          <h1 className="text-2xl font-bold text-gray-900">Speaking Practice</h1>
        </div>
        <p className="text-sm text-gray-500">
          30 seconds to prepare. Then record your response and play it back.
        </p>
      </div>

      {/* Task selector */}
      {phase === "idle" && (
        <div className="mb-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Task Type</p>
          <div className="grid grid-cols-4 gap-1.5">
            {([1, 2, 3, 4, 5, 6, 7, 8] as SpeakingTaskNum[]).map((t) => (
              <button
                key={t}
                onClick={() => handleTaskChange(t)}
                className={clsx(
                  "rounded-lg border py-2 text-xs font-medium text-center transition-colors",
                  taskNum === t
                    ? "bg-orange-600 text-white border-orange-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"
                )}
              >
                Task {t}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            <span className="font-medium">{taskInfo.title}</span> · {taskInfo.speakingSeconds}s speaking
          </p>
        </div>
      )}

      {/* Prompt card */}
      <div className="bg-white rounded-xl border border-orange-100 p-5 mb-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold text-orange-700 bg-orange-50 rounded-full px-2 py-0.5 uppercase tracking-wide">
            Task {taskNum}
          </span>
          <span className="text-xs text-gray-500">{taskInfo.title} · 30s prep + {taskInfo.speakingSeconds}s speaking</span>
        </div>

        {prompt.imageDescription && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4 text-xs text-gray-600 italic leading-relaxed">
            {prompt.imageDescription}
          </div>
        )}

        <p className="text-gray-800 text-sm leading-relaxed">{prompt.prompt}</p>
      </div>

      {/* Phase: idle */}
      {phase === "idle" && (
        <>
          {mediaError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-sm text-red-700">
              {mediaError}
            </div>
          )}
          <div className="flex gap-3 mb-6">
            <button
              onClick={handleReady}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Mic className="w-4 h-4" />
              I&apos;m Ready — Start Prep Time
            </button>
            <button
              onClick={handleNewPrompt}
              className="px-4 py-3 rounded-xl border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-900 transition-colors"
              title="New prompt"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </>
      )}

      {/* Phase: prep */}
      {phase === "prep" && (
        <div className="flex flex-col items-center py-6 mb-6 bg-orange-50 rounded-xl border border-orange-100">
          <CountdownRing seconds={prepSecondsLeft} total={30} label="Preparation time" />
          <p className="text-sm text-gray-600 mt-4 text-center max-w-sm">
            Recording starts automatically when prep time ends. Use the notepad below — notes won&apos;t be read aloud.
          </p>
          <textarea
            className="mt-4 w-full max-w-sm rounded-lg border border-orange-200 bg-white p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
            rows={4}
            placeholder="Jot down 2–3 key points (optional)…"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      )}

      {/* Phase: recording */}
      {phase === "recording" && (
        <div className="flex flex-col items-center py-6 mb-6 bg-red-50 rounded-xl border border-red-100">
          <PulseRecording />
          <div className="mt-5">
            <CountdownRing seconds={speakSecondsLeft} total={taskInfo.speakingSeconds} label="Time remaining" />
          </div>
          <p className="text-xs text-gray-500 mt-3">Recording stops automatically when time is up.</p>
          <button
            onClick={() => stopRecording()}
            className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg border border-red-300 bg-white text-red-700 text-sm font-medium hover:bg-red-50 transition-colors"
          >
            <Square className="w-3.5 h-3.5" />
            Stop Early
          </button>
        </div>
      )}

      {/* Phase: done */}
      {phase === "done" && audioUrl && (
        <div className="mb-6 space-y-4">
          {/* Time used indicator */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">{timeUsedLabel}</span>
              </div>
              {speakSecondsUsed < taskInfo.speakingSeconds * 0.7 && (
                <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
                  Used under 70% of your time
                </span>
              )}
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={clsx("h-full rounded-full", timePct >= 0.9 ? "bg-green-500" : timePct >= 0.7 ? "bg-orange-400" : "bg-red-400")}
                style={{ width: `${Math.min(timePct * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Playback */}
          <div className="bg-white rounded-xl border border-orange-100 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Volume2 className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-semibold text-gray-900">Play back your response</span>
            </div>
            <audio
              ref={audioRef}
              src={audioUrl}
              controls
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-2">
              Listen carefully: count filler words, notice where you paused, and check whether you filled your time.
            </p>
          </div>

          {/* Self-check questions */}
          <div className="bg-orange-50 rounded-xl border border-orange-100 p-4">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Self-check</p>
            <ul className="space-y-1.5">
              {[
                "Did you fill most of the allocated time?",
                "Did you give reasons for each suggestion or point?",
                "Did you avoid saying 'um' or 'uh' more than 2–3 times?",
                "Did you use a clear structure (first… also… finally…)?",
                "Did your vocabulary stay varied — no word repeated more than twice?",
              ].map((q, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-700">
                  <span className="text-orange-400 shrink-0">□</span>
                  {q}
                </li>
              ))}
            </ul>
          </div>

          {/* Tips toggle */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setShowTips(!showTips)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 text-sm font-medium text-gray-700 transition-colors"
            >
              <span>View task-specific tips for Task {taskNum}: {taskInfo.title}</span>
              {showTips ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {showTips && (
              <div className="p-4 bg-white border-t border-gray-100 text-sm text-gray-700 space-y-2">
                {taskNum === 1 && <>
                  <p>• Give exactly <strong>3 suggestions</strong>, each with a reason ("because…" / "since…").</p>
                  <p>• Don&apos;t just list options — explain why each one helps the person&apos;s specific situation.</p>
                  <p>• Close with brief encouragement to show empathy.</p>
                </>}
                {taskNum === 2 && <>
                  <p>• Set the scene quickly: <em>when</em> and <em>where</em> in the first 5 seconds.</p>
                  <p>• Include a turning point or key moment — this is what makes a story memorable.</p>
                  <p>• End with how you felt or what you learned.</p>
                </>}
                {taskNum === 3 && <>
                  <p>• Describe systematically: foreground → background, or left → right.</p>
                  <p>• Don&apos;t just name objects — describe what&apos;s happening with them.</p>
                  <p>• Comment on mood, lighting, or atmosphere at the end.</p>
                </>}
                {taskNum === 4 && <>
                  <p>• Your prediction doesn&apos;t need to be &ldquo;correct&rdquo; — you&apos;re scored on how well you reason.</p>
                  <p>• Give 2 predictions with reasoning, and consider an alternative outcome.</p>
                </>}
                {taskNum === 5 && <>
                  <p>• Don&apos;t describe each image separately — compare them directly using contrast language.</p>
                  <p>• &ldquo;While Image A shows…, Image B depicts…&rdquo; is more efficient than two separate descriptions.</p>
                </>}
                {taskNum === 6 && <>
                  <p>• Be sequential: <em>first… then… after that… finally…</em></p>
                  <p>• State the expected outcome of your plan.</p>
                </>}
                {taskNum === 7 && <>
                  <p>• State your position in the first sentence. Don&apos;t build up to it.</p>
                  <p>• Use <em>while some argue that X, I maintain that Y</em> — this shows sophisticated reasoning.</p>
                </>}
                {taskNum === 8 && <>
                  <p>• Don&apos;t just describe — interpret. What does it mean? Why is it unusual?</p>
                  <p>• Show higher-order thinking: propose an explanation and comment on it.</p>
                </>}
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleNewPrompt}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              New Prompt
            </button>
            <button
              onClick={() => {
                setPhase("idle");
                setAudioUrl(null);
                setSpeakSecondsUsed(0);
              }}
              className="px-5 py-3 rounded-xl border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5" />
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Recent sessions */}
      {recentSessions.length > 0 && (
        <div className="border-t border-gray-100 pt-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Recent Sessions</h3>
          <div className="space-y-2">
            {recentSessions.map((s) => {
              const pct = s.speakingTimeUsed / s.speakingTimeAllocated;
              return (
                <div key={s.id} className="flex items-center justify-between bg-white rounded-lg border border-gray-100 px-3 py-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-800">Task {s.taskNum}</span>
                    <span className="text-gray-400">{formatRelativeTime(s.timestamp)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={clsx("font-medium", pct >= 0.9 ? "text-green-700" : pct >= 0.7 ? "text-amber-700" : "text-red-700")}>
                      {s.speakingTimeUsed}s/{s.speakingTimeAllocated}s
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
