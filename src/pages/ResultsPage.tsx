import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { RotateCcw, Home, CheckCircle, XCircle, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type TestResult, getPerformanceLevel, generateFeedback } from "@/lib/questions";

const ResultsPage = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<TestResult | null>(null);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem("testResult");
    if (data) {
      setResult(JSON.parse(data));
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!result) return null;

  const performance = getPerformanceLevel(result.scorePercentage);
  const feedback = generateFeedback(result);
  const timeTakenMin = Math.floor(result.timeTaken / 60);
  const timeTakenSec = result.timeTaken % 60;

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Score card */}
          <div className="glass-card-elevated p-8 text-center mb-8">
            <Trophy className="h-12 w-12 mx-auto mb-4 text-accent" />
            <h1 className="text-3xl font-display font-bold mb-2">Test Complete!</h1>
            <p className="text-muted-foreground mb-6">
              {result.technology} — {result.difficulty}
            </p>

            <div className="relative w-40 h-40 mx-auto mb-6">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" strokeWidth="8" className="stroke-secondary" />
                <circle
                  cx="60" cy="60" r="54" fill="none" strokeWidth="8"
                  strokeDasharray={`${(result.scorePercentage / 100) * 339.3} 339.3`}
                  strokeLinecap="round"
                  className="stroke-accent transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-display font-bold">{result.scorePercentage}%</span>
                <span className={`text-sm font-semibold ${performance.color}`}>{performance.level}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
              <div className="text-center">
                <div className="text-2xl font-display font-bold">{result.totalQuestions}</div>
                <div className="text-xs text-muted-foreground">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-display font-bold text-success">{result.correctAnswers}</div>
                <div className="text-xs text-muted-foreground">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-display font-bold text-destructive">{result.wrongAnswers}</div>
                <div className="text-xs text-muted-foreground">Wrong</div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              Time taken: {timeTakenMin}m {timeTakenSec}s
            </p>
          </div>

          {/* AI Feedback */}
          <div className="glass-card p-6 mb-8">
            <h2 className="font-display font-semibold text-lg mb-3">AI Performance Feedback</h2>
            <p className="text-muted-foreground leading-relaxed">{feedback}</p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <Button
              onClick={() => navigate(`/test?tech=${encodeURIComponent(result.technology)}&difficulty=${result.difficulty}`)}
              className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl"
            >
              <RotateCcw className="h-4 w-4 mr-2" /> Retake Test
            </Button>
            <Button variant="outline" onClick={() => navigate("/select")} className="rounded-xl">
              Choose Another Test
            </Button>
            <Button variant="outline" onClick={() => navigate("/")} className="rounded-xl">
              <Home className="h-4 w-4 mr-2" /> Home
            </Button>
            <Button variant="outline" onClick={() => setShowReview(!showReview)} className="rounded-xl">
              {showReview ? "Hide" : "Review"} Answers
            </Button>
          </div>

          {/* Answer review */}
          {showReview && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {result.questions.map((q, i) => {
                const userAnswer = result.answers[q.id];
                const isCorrect = userAnswer === q.correctAnswer;
                return (
                  <div key={q.id} className="glass-card p-6">
                    <div className="flex items-start gap-3 mb-3">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-semibold text-sm">Q{i + 1}: {q.question}</p>
                        <div className="mt-2 space-y-1">
                          {q.options.map((opt, idx) => (
                            <p
                              key={idx}
                              className={`text-sm px-3 py-1 rounded ${
                                idx === q.correctAnswer
                                  ? "bg-success/10 text-success font-medium"
                                  : idx === userAnswer && !isCorrect
                                  ? "bg-destructive/10 text-destructive line-through"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {String.fromCharCode(65 + idx)}. {opt}
                            </p>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 italic">{q.explanation}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsPage;
