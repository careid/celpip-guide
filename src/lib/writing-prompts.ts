export type TaskType = "task1" | "task2";

export interface Task1Prompt {
  id: string;
  type: "task1";
  tone: "formal" | "informal";
  scenario: string;
  recipient: string;
  bullets: [string, string, string];
  timeMinutes: 27;
}

export interface Task2Prompt {
  id: string;
  type: "task2";
  topic: string;
  scenario: string;
  optionA: string;
  optionB: string;
  timeMinutes: 26;
}

export type WritingPrompt = Task1Prompt | Task2Prompt;

export const task1Prompts: Task1Prompt[] = [
  {
    id: "t1-01",
    type: "task1",
    tone: "formal",
    scenario:
      "You have been renting an apartment for six months. There is a leak in your bathroom ceiling that has been getting worse for two weeks. Write an email to your landlord.",
    recipient: "your landlord",
    bullets: [
      "Describe the problem and how long it has been occurring",
      "Explain how the leak is affecting your daily life",
      "Request a specific action and deadline for repair",
    ],
    timeMinutes: 27,
  },
  {
    id: "t1-02",
    type: "task1",
    tone: "formal",
    scenario:
      "You need to take Friday afternoon off work to attend an important family event. Write an email to your manager.",
    recipient: "your manager",
    bullets: [
      "State which time you need off and the reason",
      "Explain how your work responsibilities will be covered",
      "Confirm that all urgent tasks will be completed beforehand",
    ],
    timeMinutes: 27,
  },
  {
    id: "t1-03",
    type: "task1",
    tone: "informal",
    scenario:
      "Your friend recently moved to a new city and is feeling lonely. You want to plan a visit. Write an email to your friend.",
    recipient: "your friend",
    bullets: [
      "Express sympathy and share that you want to visit",
      "Suggest two possible dates and ask which works best",
      "Describe two activities you would like to do together during the visit",
    ],
    timeMinutes: 27,
  },
  {
    id: "t1-04",
    type: "task1",
    tone: "formal",
    scenario:
      "You recently purchased a laptop from an electronics store. After two weeks, it stopped working correctly. Write an email to the store's customer service department.",
    recipient: "the customer service department",
    bullets: [
      "Describe the product and when you purchased it",
      "Explain the specific problem you are experiencing",
      "State what resolution you are requesting (refund, replacement, or repair)",
    ],
    timeMinutes: 27,
  },
  {
    id: "t1-05",
    type: "task1",
    tone: "formal",
    scenario:
      "You are a university student and need an extension on a major assignment due to a family emergency last week. Write an email to your professor.",
    recipient: "your professor",
    bullets: [
      "Explain the personal circumstances that affected your work",
      "Describe the progress you have already made on the assignment",
      "Request a specific extended deadline and explain why that timeline is realistic",
    ],
    timeMinutes: 27,
  },
  {
    id: "t1-06",
    type: "task1",
    tone: "informal",
    scenario:
      "You heard about a job opening at your company that would be perfect for your friend, who is currently looking for work. Write an email to your friend.",
    recipient: "your friend",
    bullets: [
      "Describe the position and why you think it suits them",
      "Explain what the application process involves and the deadline",
      "Offer to help them prepare for the application or interview",
    ],
    timeMinutes: 27,
  },
  {
    id: "t1-07",
    type: "task1",
    tone: "formal",
    scenario:
      "You regularly use a community recreation centre. You have noticed that the facility has some issues that could be improved. Write an email to the centre's manager.",
    recipient: "the recreation centre manager",
    bullets: [
      "Describe how long you have been a member and which services you use",
      "Identify two specific problems you have observed",
      "Suggest a practical solution for each problem",
    ],
    timeMinutes: 27,
  },
  {
    id: "t1-08",
    type: "task1",
    tone: "informal",
    scenario:
      "You recently visited a restaurant that a friend had recommended to you. You had an excellent experience and want to share your thoughts. Write an email to your friend.",
    recipient: "your friend",
    bullets: [
      "Describe what you ordered and what you enjoyed most about the food",
      "Comment on the atmosphere and service",
      "Suggest a plan to visit the restaurant together",
    ],
    timeMinutes: 27,
  },
  {
    id: "t1-09",
    type: "task1",
    tone: "formal",
    scenario:
      "Your neighbourhood association is planning to cut down several large trees on your street to make room for a parking lot expansion. Write an email to the association president.",
    recipient: "the neighbourhood association president",
    bullets: [
      "Express your concern about the proposed tree removal",
      "Explain the benefits the trees provide to the community",
      "Propose an alternative solution that meets both goals",
    ],
    timeMinutes: 27,
  },
  {
    id: "t1-10",
    type: "task1",
    tone: "formal",
    scenario:
      "You are organizing a team-building event for your department and need to book a meeting room in your building for next month. Write an email to the office administrator.",
    recipient: "the office administrator",
    bullets: [
      "State the date, time, and expected number of attendees",
      "Describe the equipment and setup you will need",
      "Ask about the booking process and any associated costs",
    ],
    timeMinutes: 27,
  },
];

export const task2Prompts: Task2Prompt[] = [
  {
    id: "t2-01",
    type: "task2",
    topic: "Community Facility",
    scenario:
      "A local government has received funding to build one new facility in your neighbourhood. Which would be more beneficial to your community?",
    optionA: "A public library with computers, study spaces, and community meeting rooms",
    optionB: "A recreation centre with a gym, swimming pool, and fitness classes",
    timeMinutes: 26,
  },
  {
    id: "t2-02",
    type: "task2",
    topic: "Work Arrangement",
    scenario:
      "A technology company is deciding on a permanent work policy for its employees. Which policy would be better for employee productivity and wellbeing?",
    optionA: "Full-time remote work — employees work entirely from home",
    optionB: "Full-time in-office work — employees come to the office every day",
    timeMinutes: 26,
  },
  {
    id: "t2-03",
    type: "task2",
    topic: "After Graduation",
    scenario:
      "A high school student is deciding what to do after graduation. Which path would be more beneficial for their long-term success?",
    optionA: "Take a gap year to travel, volunteer, or gain work experience before university",
    optionB: "Begin university studies immediately after graduation",
    timeMinutes: 26,
  },
  {
    id: "t2-04",
    type: "task2",
    topic: "Daily Commute",
    scenario:
      "A city is surveying residents about how they prefer to commute to work. Which option do you believe is better for most urban workers?",
    optionA: "Using public transit (bus, subway, or commuter train)",
    optionB: "Driving a personal vehicle",
    timeMinutes: 26,
  },
  {
    id: "t2-05",
    type: "task2",
    topic: "Post-Secondary Education",
    scenario:
      "A guidance counsellor is advising students about their education options. Which path provides better long-term career outcomes?",
    optionA: "A four-year university degree in a traditional academic field",
    optionB: "A two-year vocational or trades program with direct job placement",
    timeMinutes: 26,
  },
  {
    id: "t2-06",
    type: "task2",
    topic: "Where to Live",
    scenario:
      "A recent immigrant is deciding where to settle in Canada. Which type of community would provide a better quality of life?",
    optionA: "A large metropolitan city (population over 1 million)",
    optionB: "A small or medium-sized town (population under 100,000)",
    timeMinutes: 26,
  },
  {
    id: "t2-07",
    type: "task2",
    topic: "Housing Decision",
    scenario:
      "A young professional couple is deciding what to do about their housing situation. Which option would be the better financial and lifestyle decision?",
    optionA: "Continue renting an apartment for flexibility and lower upfront cost",
    optionB: "Purchase a home despite the larger financial commitment",
    timeMinutes: 26,
  },
  {
    id: "t2-08",
    type: "task2",
    topic: "Travel Style",
    scenario:
      "A survey is asking people about their preferred travel style for a two-week vacation. Which experience do you think is more rewarding?",
    optionA: "Travelling alone — planning your own itinerary with full independence",
    optionB: "Travelling with a group of friends or family",
    timeMinutes: 26,
  },
  {
    id: "t2-09",
    type: "task2",
    topic: "First Job",
    scenario:
      "A recent university graduate is choosing between two job offers. Which type of employer would offer better career development?",
    optionA: "A large, established corporation with structured training programs and clear career paths",
    optionB: "A small startup with more responsibility, variety, and potential for rapid growth",
    timeMinutes: 26,
  },
  {
    id: "t2-10",
    type: "task2",
    topic: "Learning Environment",
    scenario:
      "A school board is deciding on an approach to education for the upcoming year. Which model would better serve students' academic and social development?",
    optionA: "Full in-person learning — all instruction takes place at school",
    optionB: "A hybrid model — some days at school, some days learning from home",
    timeMinutes: 26,
  },
];

const allPrompts: WritingPrompt[] = [...task1Prompts, ...task2Prompts];

export function getRandomPrompt(type?: TaskType): WritingPrompt {
  const pool = type === "task1" ? task1Prompts : type === "task2" ? task2Prompts : allPrompts;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getPromptById(id: string): WritingPrompt | undefined {
  return allPrompts.find((p) => p.id === id);
}
