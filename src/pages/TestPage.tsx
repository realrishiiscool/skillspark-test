import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  generateMockQuestions,
  type Technology,
  type Difficulty,
  type TestResult,
} from "@/lib/questions";

const TOTAL_TIME = 60 * 60; // 60 minutes in seconds

const TestPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const technology = searchParams.get("tech") as Technology;
  const difficulty = searchParams.get("difficulty") as Difficulty;

  const [questions] = useState(() => generateMockQuestions(technology, difficulty));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Prevent accidental close
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  const handleSubmit = useCallback(() => {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });

    const result: TestResult = {
      technology,
      difficulty,
      totalQuestions: questions.length,
      correctAnswers: correct,
      wrongAnswers: questions.length - correct,
      scorePercentage: Math.round((correct / questions.length) * 100),
      answers,
      questions,
      timeTaken: TOTAL_TIME - timeLeft,
    };

    sessionStorage.setItem("testResult", JSON.stringify(result));
    navigate("/results");
  }, [answers, questions, technology, difficulty, timeLeft, navigate]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const q = questions[currentQuestion];
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / questions.length) * 100;
  const isLowTime = timeLeft < 300;

  if (!technology || !difficulty) {
    navigate("/select");
    return null;
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Top bar */}
        <div className="glass-card-elevated p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-sm text-muted-foreground">{technology}</span>
            <span className="mx-2 text-border">|</span>
            <span className="text-sm font-medium">{difficulty}</span>
          </div>
          <div className={`flex items-center gap-2 font-mono text-lg font-semibold ${isLowTime ? "text-destructive" : ""}`}>
            <Clock className="h-4 w-4" />
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>{answeredCount} of {questions.length} answered</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid lg:grid-cols-[1fr_240px] gap-6">
          {/* Question */}
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card-elevated p-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                {q.type === "mcq" ? "Multiple Choice" : q.type === "scenario" ? "Scenario" : "Conceptual"}
              </span>
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>

            <h2 className="text-xl font-display font-semibold mb-6 leading-relaxed">
              {q.question}
            </h2>

            <div className="space-y-3">
              {q.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => setAnswers({ ...answers, [q.id]: idx })}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                    answers[q.id] === idx
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-accent/30 hover:bg-secondary/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border-2 ${
                        answers[q.id] === idx
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm leading-relaxed pt-0.5">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className="rounded-xl"
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>

              {currentQuestion < questions.length - 1 ? (
                <Button
                  onClick={() => setCurrentQuestion(currentQuestion + 1)}
                  className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl"
                >
                  Next <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button
                  onClick={() => setShowSubmitDialog(true)}
                  className="bg-success text-success-foreground hover:bg-success/90 rounded-xl"
                >
                  Submit Test
                </Button>
              )}
            </div>
          </motion.div>

          {/* Question nav panel */}
          <div className="glass-card p-4">
            <h3 className="font-display font-semibold text-sm mb-3">Questions</h3>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentQuestion(i)}
                  className={`w-full aspect-square rounded-lg text-xs font-semibold flex items-center justify-center transition-all ${
                    i === currentQuestion
                      ? "bg-accent text-accent-foreground"
                      : answers[questions[i].id] !== undefined
                      ? "bg-accent/15 text-accent border border-accent/30"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <Button
                onClick={() => setShowSubmitDialog(true)}
                variant="outline"
                className="w-full rounded-xl border-success text-success hover:bg-success hover:text-success-foreground"
              >
                Submit Test
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Submit dialog */}
      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Submit Test?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You have answered {answeredCount} out of {questions.length} questions.
              {answeredCount < questions.length && (
                <span className="block mt-2 text-destructive font-medium">
                  {questions.length - answeredCount} questions are unanswered and will be marked wrong.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Test</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit} className="bg-success text-success-foreground hover:bg-success/90">
              Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TestPage;
