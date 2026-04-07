import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

export interface EvaluationRequest {
  promptText: string; // The scenario/question shown to the user
  bullets?: string[]; // Task 1 bullet points (if Task 1)
  taskType: "task1" | "task2";
  tone?: "formal" | "informal"; // Task 1 tone expectation
  responseText: string; // The user's written response
}

export interface EvaluationResult {
  task_fulfillment: {
    score: number;
    bullet_coverage?: { bullet_1: boolean; bullet_2: boolean; bullet_3: boolean };
    tone_match?: "correct" | "incorrect" | "mixed";
    word_count_status: "below" | "within" | "above";
    observations: string[];
  };
  coherence: {
    score: number;
    observations: string[];
  };
  vocabulary: {
    score: number;
    repeated_words: string[];
    suggestions: { word: string; alternatives: string[] }[];
    observations: string[];
  };
  readability: {
    score: number;
    register_prompt?: string;
    register_response?: string;
    observations: string[];
  };
}

const SYSTEM_PROMPT = `You are an expert CELPIP writing examiner. Your role is to evaluate a test-taker's written response against the official CELPIP rubric.

IMPORTANT CONTEXT: The test-taker is already a fluent English speaker. Do NOT focus on basic grammar errors or spelling mistakes unless they are egregious. Your job is to identify the subtle performance issues that prevent fluent speakers from scoring at the top of the scale:
- Missing or inadequately addressed required content points (the most common critical error)
- Register inconsistency (shifting between formal and informal within the same response)
- Lexical flatness — over-reliance on generic, neutral words ("good", "important", "nice", "bad", "things", "stuff") when more precise vocabulary would score higher
- Generic responses that address the topic but not the specific prompt
- Structural weaknesses: no clear topic sentences, no logical flow between paragraphs
- Responses that start and stop at the same register without demonstrating range

CELPIP Scoring Scale: 1 (lowest) to 12 (highest). For a fluent English speaker, scores below 7 on any criterion represent a significant failure.

Score benchmarks:
- 10–12: Expert. Highly specific, precise vocabulary, flawless structure, sophisticated register management.
- 8–9: Advanced. Strong overall, minor weaknesses in vocabulary range or one structural issue.
- 7: Competent. Meets minimum requirements. Meets all bullets but may be generic, transitions may be weak, vocabulary range limited.
- 5–6: Below competent. Missed a bullet, wrong tone, or vocabulary too basic/repetitive.
- Below 5: Significant problems — multiple missed bullets, incoherent structure, wrong register.

You must return ONLY a valid JSON object with exactly this structure. No other text, no markdown, no explanation outside the JSON:

{
  "task_fulfillment": {
    "score": <integer 1-12>,
    "bullet_coverage": { "bullet_1": <boolean>, "bullet_2": <boolean>, "bullet_3": <boolean> },
    "tone_match": "<correct|incorrect|mixed>",
    "word_count_status": "<below|within|above>",
    "observations": ["<specific, actionable observation>"]
  },
  "coherence": {
    "score": <integer 1-12>,
    "observations": ["<specific, actionable observation>"]
  },
  "vocabulary": {
    "score": <integer 1-12>,
    "repeated_words": ["<word used 3+ times>"],
    "suggestions": [
      { "word": "<overused word>", "alternatives": ["<alt1>", "<alt2>", "<alt3>"] }
    ],
    "observations": ["<specific, actionable observation>"]
  },
  "readability": {
    "score": <integer 1-12>,
    "register_prompt": "<formal|informal|neutral>",
    "register_response": "<formal|informal|mixed>",
    "observations": ["<specific, actionable observation>"]
  }
}

Rules for observations:
- Be specific. "Your opening sentence restates the prompt without adding your purpose" is useful. "Good writing" is not.
- Limit to 1–3 observations per criterion. More is not better.
- If something is genuinely strong, say so once and briefly.
- For Task 2 (survey response): bullet_coverage should reflect whether the test-taker clearly chose ONE option (bullet_1), provided at least 2 distinct reasons (bullet_2 = first reason present, bullet_3 = second reason present).`;

export async function POST(req: NextRequest) {
  try {
    const body: EvaluationRequest = await req.json();
    const { promptText, bullets, taskType, tone, responseText } = body;

    if (!responseText || responseText.trim().length < 10) {
      return NextResponse.json({ error: "Response text is too short to evaluate." }, { status: 400 });
    }

    const wordCount = responseText.trim().split(/\s+/).length;

    let userMessage = `TASK TYPE: ${taskType === "task1" ? "Task 1 — Writing an Email" : "Task 2 — Survey Response"}\n\n`;

    if (taskType === "task1" && tone) {
      userMessage += `EXPECTED TONE: ${tone === "formal" ? "Formal (to an authority figure or stranger)" : "Informal (to a friend or family member)"}\n\n`;
    }

    userMessage += `PROMPT:\n${promptText}\n\n`;

    if (taskType === "task1" && bullets && bullets.length > 0) {
      userMessage += `REQUIRED BULLET POINTS TO ADDRESS:\n`;
      bullets.forEach((b, i) => {
        userMessage += `${i + 1}. ${b}\n`;
      });
      userMessage += "\n";
    }

    userMessage += `WORD COUNT: ${wordCount} words (target: 150–200)\n\n`;
    userMessage += `TEST-TAKER'S RESPONSE:\n${responseText}`;

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    const rawContent = message.content[0];
    if (rawContent.type !== "text") {
      throw new Error("Unexpected response type from Claude");
    }

    // Strip any accidental markdown fences
    const jsonText = rawContent.text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();
    const result: EvaluationResult = JSON.parse(jsonText);

    return NextResponse.json(result);
  } catch (err) {
    console.error("Evaluation error:", err);
    return NextResponse.json(
      { error: "Failed to evaluate response. Please try again." },
      { status: 500 }
    );
  }
}
