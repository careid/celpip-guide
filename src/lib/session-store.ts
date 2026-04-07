export interface WritingSession {
  id: string;
  timestamp: number;
  taskType: "task1" | "task2";
  promptId: string;
  wordCount: number;
  scores: {
    task_fulfillment: number;
    coherence: number;
    vocabulary: number;
    readability: number;
  };
  flags: string[];
}

export interface SpeakingSession {
  id: string;
  timestamp: number;
  taskNum: number;
  promptId: string;
  speakingTimeUsed: number;
  speakingTimeAllocated: number;
}

export type PracticeSession = WritingSession | SpeakingSession;

const WRITING_SESSIONS_KEY = "celpip_writing_sessions";
const SPEAKING_SESSIONS_KEY = "celpip_speaking_sessions";
const MAX_STORED_SESSIONS = 50;

function isClient(): boolean {
  return typeof window !== "undefined";
}

// Writing sessions

export function saveWritingSession(session: WritingSession): void {
  if (!isClient()) return;
  const sessions = getWritingSessions();
  sessions.unshift(session);
  localStorage.setItem(
    WRITING_SESSIONS_KEY,
    JSON.stringify(sessions.slice(0, MAX_STORED_SESSIONS))
  );
}

export function getWritingSessions(): WritingSession[] {
  if (!isClient()) return [];
  try {
    const raw = localStorage.getItem(WRITING_SESSIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getRecentWritingSessions(count = 3): WritingSession[] {
  return getWritingSessions().slice(0, count);
}

// Speaking sessions

export function saveSpeakingSession(session: SpeakingSession): void {
  if (!isClient()) return;
  const sessions = getSpeakingSessions();
  sessions.unshift(session);
  localStorage.setItem(
    SPEAKING_SESSIONS_KEY,
    JSON.stringify(sessions.slice(0, MAX_STORED_SESSIONS))
  );
}

export function getSpeakingSessions(): SpeakingSession[] {
  if (!isClient()) return [];
  try {
    const raw = localStorage.getItem(SPEAKING_SESSIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getRecentSpeakingSessions(count = 3): SpeakingSession[] {
  return getSpeakingSessions().slice(0, count);
}

// Aggregate stats for dashboard

export interface PracticeStats {
  totalSessions: number;
  lastPracticed: number | null; // timestamp
  weakestCriterion: string | null;
  writingSessionCount: number;
  speakingSessionCount: number;
}

export function getPracticeStats(): PracticeStats {
  const writing = getWritingSessions();
  const speaking = getSpeakingSessions();

  const allTimestamps = [
    ...writing.map((s) => s.timestamp),
    ...speaking.map((s) => s.timestamp),
  ];

  const lastPracticed = allTimestamps.length > 0 ? Math.max(...allTimestamps) : null;

  // Find weakest writing criterion across last 5 sessions
  let weakestCriterion: string | null = null;
  if (writing.length > 0) {
    const recent = writing.slice(0, 5);
    const avg = {
      task_fulfillment: 0,
      coherence: 0,
      vocabulary: 0,
      readability: 0,
    };
    for (const s of recent) {
      avg.task_fulfillment += s.scores.task_fulfillment;
      avg.coherence += s.scores.coherence;
      avg.vocabulary += s.scores.vocabulary;
      avg.readability += s.scores.readability;
    }
    const n = recent.length;
    const entries = Object.entries(avg).map(([k, v]) => [k, v / n] as [string, number]);
    entries.sort((a, b) => a[1] - b[1]);
    weakestCriterion = entries[0][0];
  }

  return {
    totalSessions: writing.length + speaking.length,
    lastPracticed,
    weakestCriterion,
    writingSessionCount: writing.length,
    speakingSessionCount: speaking.length,
  };
}

// Helpers

export function formatCriterionName(key: string): string {
  const names: Record<string, string> = {
    task_fulfillment: "Task Fulfillment",
    coherence: "Coherence & Organization",
    vocabulary: "Vocabulary",
    readability: "Readability",
  };
  return names[key] ?? key;
}

export function formatRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
