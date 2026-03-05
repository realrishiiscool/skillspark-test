export type Technology =
  | "Core Java"
  | "Python"
  | "Manual Testing"
  | "Automation Testing"
  | "Selenium"
  | "SQL"
  | "HTML"
  | "CSS"
  | "JavaScript"
  | "React";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  type: "mcq" | "scenario" | "conceptual";
}

export interface TestResult {
  technology: Technology;
  difficulty: Difficulty;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  scorePercentage: number;
  answers: Record<number, number>;
  questions: Question[];
  timeTaken: number;
}

export const technologies: { name: Technology; icon: string; description: string }[] = [
  { name: "Core Java", icon: "☕", description: "Object-oriented programming, JVM, collections, and more" },
  { name: "Python", icon: "🐍", description: "Scripting, data structures, OOP, and libraries" },
  { name: "Manual Testing", icon: "🔍", description: "Test cases, bug lifecycle, SDLC, and methodologies" },
  { name: "Automation Testing", icon: "🤖", description: "Frameworks, CI/CD, test automation strategies" },
  { name: "Selenium", icon: "🌐", description: "WebDriver, locators, waits, and frameworks" },
  { name: "SQL", icon: "🗄️", description: "Queries, joins, normalization, and optimization" },
  { name: "HTML", icon: "📄", description: "Elements, forms, semantics, and accessibility" },
  { name: "CSS", icon: "🎨", description: "Layouts, flexbox, grid, animations, and responsive design" },
  { name: "JavaScript", icon: "⚡", description: "ES6+, DOM, async programming, and closures" },
  { name: "React", icon: "⚛️", description: "Components, hooks, state management, and routing" },
];

// Mock question bank - in production these would come from AI
const questionBanks: Record<string, Question[]> = {
  "Core Java-Beginner": [
    { id: 1, question: "Which of the following is the correct way to declare a variable in Java?", options: ["int x = 10;", "x = 10 int;", "declare int x = 10;", "variable x = 10;"], correctAnswer: 0, explanation: "In Java, variables are declared with the type first, followed by the name and optional initialization.", type: "mcq" },
    { id: 2, question: "What is the output of: System.out.println(5 + 3 + \"hello\");?", options: ["53hello", "8hello", "hello53", "hello8"], correctAnswer: 1, explanation: "Java evaluates left to right. 5+3=8 (integer addition), then 8+\"hello\" = \"8hello\" (string concatenation).", type: "mcq" },
    { id: 3, question: "Which keyword is used to inherit a class in Java?", options: ["implements", "extends", "inherits", "super"], correctAnswer: 1, explanation: "The 'extends' keyword is used to inherit a class in Java.", type: "mcq" },
    { id: 4, question: "What is the default value of an int variable in Java?", options: ["null", "0", "undefined", "1"], correctAnswer: 1, explanation: "The default value of an int variable in Java is 0.", type: "conceptual" },
    { id: 5, question: "A developer notices that their ArrayList is throwing ConcurrentModificationException during iteration. What is the most likely cause?", options: ["The list is null", "The list is being modified while iterating with a for-each loop", "The list has duplicate elements", "The list exceeds memory"], correctAnswer: 1, explanation: "Modifying an ArrayList during iteration with for-each or Iterator without using Iterator.remove() throws ConcurrentModificationException.", type: "scenario" },
    { id: 6, question: "Which of the following is NOT a primitive data type in Java?", options: ["int", "boolean", "String", "char"], correctAnswer: 2, explanation: "String is a class in Java, not a primitive data type. The eight primitives are byte, short, int, long, float, double, boolean, and char.", type: "mcq" },
    { id: 7, question: "What does JVM stand for?", options: ["Java Virtual Machine", "Java Variable Manager", "Java Version Module", "Java Visual Machine"], correctAnswer: 0, explanation: "JVM stands for Java Virtual Machine, which is responsible for executing Java bytecode.", type: "conceptual" },
    { id: 8, question: "Which method is the entry point of a Java application?", options: ["start()", "run()", "main()", "init()"], correctAnswer: 2, explanation: "The main() method with signature 'public static void main(String[] args)' is the entry point.", type: "mcq" },
    { id: 9, question: "What is the size of an int in Java?", options: ["16 bits", "32 bits", "64 bits", "Platform dependent"], correctAnswer: 1, explanation: "An int in Java is always 32 bits (4 bytes), regardless of the platform.", type: "mcq" },
    { id: 10, question: "A team is building a banking application. They need to store monetary values precisely. Which data type should they use?", options: ["float", "double", "BigDecimal", "int"], correctAnswer: 2, explanation: "BigDecimal should be used for precise monetary calculations as float and double can have rounding errors.", type: "scenario" },
    { id: 11, question: "What is the purpose of the 'final' keyword in Java?", options: ["To end a program", "To prevent modification of a variable, method, or class", "To finalize garbage collection", "To declare constants only"], correctAnswer: 1, explanation: "The 'final' keyword prevents a variable from being reassigned, a method from being overridden, or a class from being inherited.", type: "conceptual" },
    { id: 12, question: "Which operator is used for string comparison in Java?", options: ["==", "equals()", "compare()", "==="], correctAnswer: 1, explanation: "The equals() method compares string content. The == operator compares references, not content.", type: "mcq" },
    { id: 13, question: "What is autoboxing in Java?", options: ["Automatic packaging of code", "Automatic conversion between primitive types and wrapper classes", "Automatic memory allocation", "Automatic type casting"], correctAnswer: 1, explanation: "Autoboxing is the automatic conversion between primitive types (like int) and their wrapper classes (like Integer).", type: "conceptual" },
    { id: 14, question: "Which collection interface does NOT allow duplicate elements?", options: ["List", "Set", "Queue", "Deque"], correctAnswer: 1, explanation: "The Set interface does not allow duplicate elements. Lists, Queues, and Deques can contain duplicates.", type: "mcq" },
    { id: 15, question: "What is the output of: System.out.println(10 / 3);?", options: ["3.33", "3", "3.0", "Error"], correctAnswer: 1, explanation: "Integer division in Java truncates the decimal. 10/3 = 3 (integer result).", type: "mcq" },
    { id: 16, question: "A developer creates an object but never uses it again. What happens to the memory?", options: ["Memory leak occurs", "Garbage collector reclaims it", "Program crashes", "It stays forever"], correctAnswer: 1, explanation: "Java's garbage collector automatically reclaims memory of objects that are no longer referenced.", type: "scenario" },
    { id: 17, question: "What is the difference between '==' and '.equals()' for objects?", options: ["No difference", "'==' compares references, '.equals()' compares content", "'==' compares content, '.equals()' compares references", "Both compare content"], correctAnswer: 1, explanation: "'==' checks if two references point to the same object in memory, while '.equals()' checks if two objects have the same value.", type: "conceptual" },
    { id: 18, question: "Which access modifier makes a member accessible only within its own class?", options: ["public", "protected", "default", "private"], correctAnswer: 3, explanation: "The 'private' access modifier restricts access to within the declaring class only.", type: "mcq" },
    { id: 19, question: "What is a constructor in Java?", options: ["A method that destroys objects", "A special method called when an object is created", "A method that returns a value", "A static method"], correctAnswer: 1, explanation: "A constructor is a special method invoked when an object is instantiated. It initializes the object's state.", type: "conceptual" },
    { id: 20, question: "You need to store key-value pairs where keys must be unique. Which collection should you use?", options: ["ArrayList", "LinkedList", "HashMap", "HashSet"], correctAnswer: 2, explanation: "HashMap stores key-value pairs with unique keys. It provides O(1) average time for put and get operations.", type: "scenario" },
  ],
};

// Generate questions for any tech/difficulty combo by reusing and adapting the bank
export function generateMockQuestions(technology: Technology, difficulty: Difficulty): Question[] {
  const key = `${technology}-${difficulty}`;
  if (questionBanks[key]) return questionBanks[key];

  // Fallback: generate generic questions for the technology
  const questions: Question[] = [];
  for (let i = 1; i <= 20; i++) {
    const types: Question["type"][] = ["mcq", "scenario", "conceptual"];
    const type = types[i % 3];
    questions.push({
      id: i,
      question: `${difficulty} ${technology} Question ${i}: What is a key concept related to ${technology} at the ${difficulty.toLowerCase()} level?`,
      options: [
        `Correct answer for ${technology} Q${i}`,
        `Distractor option A for Q${i}`,
        `Distractor option B for Q${i}`,
        `Distractor option C for Q${i}`,
      ],
      correctAnswer: 0,
      explanation: `This tests your understanding of ${technology} at the ${difficulty.toLowerCase()} level. The correct answer demonstrates fundamental knowledge required for this topic.`,
      type,
    });
  }
  return questions;
}

export function getPerformanceLevel(score: number): { level: string; color: string } {
  if (score >= 80) return { level: "Excellent", color: "text-success" };
  if (score >= 60) return { level: "Good", color: "text-accent" };
  return { level: "Needs Improvement", color: "text-destructive" };
}

export function generateFeedback(result: TestResult): string {
  const { technology, scorePercentage, difficulty } = result;
  if (scorePercentage >= 90) {
    return `Outstanding performance! You demonstrate expert-level knowledge in ${technology} at the ${difficulty} level. You have a strong grasp of both theoretical concepts and practical applications.`;
  }
  if (scorePercentage >= 70) {
    return `Good job! You have a solid foundation in ${technology}. To reach the next level, focus on the questions you missed and review the explanations provided. Consider practicing more ${difficulty.toLowerCase()}-level scenarios.`;
  }
  if (scorePercentage >= 50) {
    return `You have a basic understanding of ${technology}, but there's room for improvement. Review the core concepts and practice with more examples. Consider starting with a lower difficulty level to build stronger foundations.`;
  }
  return `You need more practice with ${technology}. We recommend reviewing the fundamentals and studying the explanations for each question. Start with beginner-level resources and gradually work your way up.`;
}
