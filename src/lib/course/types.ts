export type Callout = {
  tone: "tip" | "rule" | "warn";
  title: string;
  body: string;
};

export type TheoryBlock = {
  heading: string;
  body: string[];
  bullets?: string[];
  code?: { source: string; output?: string; caption?: string };
  callout?: Callout;
};

export type QuizOption = { id: string; text: string };

export type QuizQuestion = {
  id: string;
  prompt: string;
  code?: string;
  options: QuizOption[];
  correctId: string;
  explain: string;
};

export type LabTest =
  | { id: string; label: string; kind: "stdout"; expected: string; inputs?: string[] }
  | { id: string; label: string; kind: "equals"; expr: string; expected: unknown };

export type Lab = {
  title: string;
  brief: string;
  spec: string[];
  starter: string;
  hint: string;
  solution: string;
  inputs?: string[];
  tests: LabTest[];
};

export type CourseModule = {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  minutes: number;
  goals: string[];
  theory: TheoryBlock[];
  quiz: QuizQuestion[];
  lab: Lab;
};

export type GlossaryTerm = {
  term: string;
  def: string;
};

export type CheatGroup = {
  title: string;
  rows: { code: string; meaning: string }[];
};

export type Drill = Lab & {
  id: string;
  title: string;
  unlockAfter: number;
  minutes: number;
};
