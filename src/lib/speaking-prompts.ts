export type SpeakingTaskNum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface SpeakingPrompt {
  id: string;
  taskNum: SpeakingTaskNum;
  taskTitle: string;
  prepSeconds: 30;
  speakingSeconds: 60 | 90;
  prompt: string;
  // For image-based tasks (3, 4, 5, 8), a text description stands in for the image at V1
  imageDescription?: string;
}

export const speakingPrompts: SpeakingPrompt[] = [
  // Task 1 — Giving Advice (90s)
  {
    id: "s1-01",
    taskNum: 1,
    taskTitle: "Giving Advice",
    prepSeconds: 30,
    speakingSeconds: 90,
    prompt:
      "Your friend has just accepted a new job but is very nervous about starting. They have never worked in an office environment before. What advice would you give them to help them succeed in their first few weeks?",
  },
  {
    id: "s1-02",
    taskNum: 1,
    taskTitle: "Giving Advice",
    prepSeconds: 30,
    speakingSeconds: 90,
    prompt:
      "Your cousin is moving to a new city where they don't know anyone and is worried about making friends as an adult. What advice would you give them?",
  },
  {
    id: "s1-03",
    taskNum: 1,
    taskTitle: "Giving Advice",
    prepSeconds: 30,
    speakingSeconds: 90,
    prompt:
      "A family member wants to start saving money but finds it very difficult to stick to a budget. What practical advice would you give them?",
  },

  // Task 2 — Personal Experience (60s)
  {
    id: "s2-01",
    taskNum: 2,
    taskTitle: "Talking About a Personal Experience",
    prepSeconds: 30,
    speakingSeconds: 60,
    prompt:
      "Tell me about a time when you had to make a difficult decision. What was the situation, what did you decide, and how did it turn out?",
  },
  {
    id: "s2-02",
    taskNum: 2,
    taskTitle: "Talking About a Personal Experience",
    prepSeconds: 30,
    speakingSeconds: 60,
    prompt:
      "Describe an experience that taught you something important about yourself. What happened and what did you learn?",
  },
  {
    id: "s2-03",
    taskNum: 2,
    taskTitle: "Talking About a Personal Experience",
    prepSeconds: 30,
    speakingSeconds: 60,
    prompt:
      "Talk about a time when you had to adapt to a completely new environment or situation. What made it challenging and how did you handle it?",
  },

  // Task 3 — Describing a Scene (60s) — text description stands in for image
  {
    id: "s3-01",
    taskNum: 3,
    taskTitle: "Describing a Scene",
    prepSeconds: 30,
    speakingSeconds: 60,
    imageDescription:
      "[IMAGE: A busy farmers' market on a sunny Saturday morning. In the foreground, a woman is handing a bunch of flowers to a customer. Several stalls are visible selling vegetables, baked goods, and handmade crafts. Children are eating ice cream nearby. A dog is tied to a post in the background.]",
    prompt:
      "Describe the scene in the image in as much detail as possible to someone who cannot see it.",
  },
  {
    id: "s3-02",
    taskNum: 3,
    taskTitle: "Describing a Scene",
    prepSeconds: 30,
    speakingSeconds: 60,
    imageDescription:
      "[IMAGE: A university library. Several students are working at individual desks with laptops and textbooks open. In the background, tall bookshelves line the walls. One student is asleep at their desk. A librarian is helping someone at the information desk near the entrance. Large windows let in natural light.]",
    prompt:
      "Describe the scene in the image in as much detail as possible to someone who cannot see it.",
  },

  // Task 4 — Making Predictions (60s)
  {
    id: "s4-01",
    taskNum: 4,
    taskTitle: "Making Predictions",
    prepSeconds: 30,
    speakingSeconds: 60,
    imageDescription:
      "[IMAGE: A man in a business suit is running toward a bus stop. The bus doors are beginning to close. He is about 10 metres away, his briefcase in one hand and his phone in the other. He looks worried.]",
    prompt:
      "Look at this image and predict what will happen next. Give reasons for your predictions.",
  },
  {
    id: "s4-02",
    taskNum: 4,
    taskTitle: "Making Predictions",
    prepSeconds: 30,
    speakingSeconds: 60,
    imageDescription:
      "[IMAGE: A couple is sitting at a restaurant table. One person has just opened a small jewellery box and is looking at the other with a big smile. The other person has their hand over their mouth in surprise. There is a candle on the table and champagne glasses.]",
    prompt:
      "Look at this image and predict what will happen next. Give reasons for your predictions.",
  },

  // Task 5 — Comparing Two Images (60s)
  {
    id: "s5-01",
    taskNum: 5,
    taskTitle: "Comparing Two Images",
    prepSeconds: 30,
    speakingSeconds: 60,
    imageDescription:
      "[IMAGE A: A small, cozy apartment in a city with a view of tall buildings from the window. It is modern and well-furnished but compact.]\n[IMAGE B: A large house in a suburban neighbourhood with a garden, a driveway, and space between houses. It looks spacious but far from the city centre.]",
    prompt:
      "A family with two young children is choosing where to live. Compare these two options and recommend which would be better for them, giving reasons.",
  },
  {
    id: "s5-02",
    taskNum: 5,
    taskTitle: "Comparing Two Images",
    prepSeconds: 30,
    speakingSeconds: 60,
    imageDescription:
      "[IMAGE A: A traditional classroom with a teacher at the front, students sitting in rows, textbooks on desks, and a whiteboard behind the teacher.]\n[IMAGE B: An open-concept learning space where students are seated in small groups, working on tablets, with a teacher circulating among them.]",
    prompt:
      "A school board is choosing a classroom model. Compare these two environments and recommend which would better support student learning, giving specific reasons.",
  },

  // Task 6 — Dealing with a Difficult Situation (60s)
  {
    id: "s6-01",
    taskNum: 6,
    taskTitle: "Dealing with a Difficult Situation",
    prepSeconds: 30,
    speakingSeconds: 60,
    prompt:
      "You are at work and you realize that your colleague has made a significant error in a report that is about to be sent to a client. Your colleague is currently in an important meeting. What would you do?",
  },
  {
    id: "s6-02",
    taskNum: 6,
    taskTitle: "Dealing with a Difficult Situation",
    prepSeconds: 30,
    speakingSeconds: 60,
    prompt:
      "You planned an outdoor birthday party for 20 guests this weekend. The day before the party, there is a forecast of heavy rain all day. What would you do?",
  },

  // Task 7 — Expressing Opinions (60s)
  {
    id: "s7-01",
    taskNum: 7,
    taskTitle: "Expressing Opinions",
    prepSeconds: 30,
    speakingSeconds: 60,
    prompt:
      "Some people believe that children should be allowed to use smartphones at school for educational purposes. Others believe smartphones should be completely banned in schools. What is your opinion?",
  },
  {
    id: "s7-02",
    taskNum: 7,
    taskTitle: "Expressing Opinions",
    prepSeconds: 30,
    speakingSeconds: 60,
    prompt:
      "Some people argue that working from home permanently is better for employees' health and work-life balance. Others say that in-person office work leads to better teamwork and career growth. What is your view?",
  },
  {
    id: "s7-03",
    taskNum: 7,
    taskTitle: "Expressing Opinions",
    prepSeconds: 30,
    speakingSeconds: 60,
    prompt:
      "Some believe that universities should focus primarily on preparing students for specific careers. Others argue that a broad, general education is more valuable for developing critical thinking. What is your opinion?",
  },

  // Task 8 — Describing an Unusual Situation (60s)
  {
    id: "s8-01",
    taskNum: 8,
    taskTitle: "Describing an Unusual Situation",
    prepSeconds: 30,
    speakingSeconds: 60,
    imageDescription:
      "[IMAGE: A man in a formal business suit is sitting in a tree in the middle of a park, eating a sandwich and reading a newspaper. Office workers eating their lunch on benches below are looking up at him with confused expressions.]",
    prompt:
      "Describe what is unusual about this scene and suggest a possible explanation for why this situation might have occurred.",
  },
  {
    id: "s8-02",
    taskNum: 8,
    taskTitle: "Describing an Unusual Situation",
    prepSeconds: 30,
    speakingSeconds: 60,
    imageDescription:
      "[IMAGE: A large supermarket aisle. All the shopping carts are stacked in the middle of the aisle in a tall, precarious tower. A store employee is scratching their head looking at them. Several shoppers are taking photos with their phones.]",
    prompt:
      "Describe what is unusual about this scene and suggest a possible explanation for why this situation might have occurred.",
  },
];

export function getPromptsByTask(taskNum: SpeakingTaskNum): SpeakingPrompt[] {
  return speakingPrompts.filter((p) => p.taskNum === taskNum);
}

export function getRandomSpeakingPrompt(taskNum?: SpeakingTaskNum): SpeakingPrompt {
  const pool = taskNum ? getPromptsByTask(taskNum) : speakingPrompts;
  return pool[Math.floor(Math.random() * pool.length)];
}

export const TASK_INFO: Record<SpeakingTaskNum, { title: string; speakingSeconds: 60 | 90 }> = {
  1: { title: "Giving Advice", speakingSeconds: 90 },
  2: { title: "Talking About a Personal Experience", speakingSeconds: 60 },
  3: { title: "Describing a Scene", speakingSeconds: 60 },
  4: { title: "Making Predictions", speakingSeconds: 60 },
  5: { title: "Comparing Two Images", speakingSeconds: 60 },
  6: { title: "Dealing with a Difficult Situation", speakingSeconds: 60 },
  7: { title: "Expressing Opinions", speakingSeconds: 60 },
  8: { title: "Describing an Unusual Situation", speakingSeconds: 60 },
};
