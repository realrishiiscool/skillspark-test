import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { technologies, type Technology, type Difficulty } from "@/lib/questions";

const difficulties: { name: Difficulty; description: string; color: string }[] = [
  { name: "Beginner", description: "Fundamentals and basic concepts", color: "bg-success/10 text-success border-success/20" },
  { name: "Intermediate", description: "Applied knowledge and patterns", color: "bg-accent/10 text-accent border-accent/20" },
  { name: "Advanced", description: "Expert-level and architecture", color: "bg-destructive/10 text-destructive border-destructive/20" },
];

const SelectTechnology = () => {
  const navigate = useNavigate();
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [step, setStep] = useState<1 | 2>(1);

  const handleStart = () => {
    if (selectedTech && selectedDifficulty) {
      navigate(`/test?tech=${encodeURIComponent(selectedTech)}&difficulty=${selectedDifficulty}`);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Progress */}
        <div className="flex items-center gap-3 mb-8">
          <div className={`h-1 flex-1 rounded-full ${step >= 1 ? "bg-accent" : "bg-border"}`} />
          <div className={`h-1 flex-1 rounded-full ${step >= 2 ? "bg-accent" : "bg-border"}`} />
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Choose Your Technology</h1>
              <p className="text-muted-foreground mb-8">Select the technology you want to be tested on</p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {technologies.map((tech) => (
                  <div
                    key={tech.name}
                    onClick={() => setSelectedTech(tech.name)}
                    className={`tech-card ${selectedTech === tech.name ? "selected" : ""}`}
                  >
                    <span className="text-3xl mb-3 block">{tech.icon}</span>
                    <h3 className="font-display font-semibold mb-1">{tech.name}</h3>
                    <p className="text-sm text-muted-foreground">{tech.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <Button
                  onClick={() => setStep(2)}
                  disabled={!selectedTech}
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl"
                >
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </button>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Select Difficulty</h1>
              <p className="text-muted-foreground mb-8">
                Taking <span className="font-semibold text-foreground">{selectedTech}</span> test
              </p>

              <div className="grid gap-4 max-w-lg">
                {difficulties.map((diff) => (
                  <div
                    key={diff.name}
                    onClick={() => setSelectedDifficulty(diff.name)}
                    className={`tech-card flex items-center gap-4 ${selectedDifficulty === diff.name ? "selected" : ""}`}
                  >
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${diff.color}`}>
                      {diff.name}
                    </div>
                    <p className="text-sm text-muted-foreground">{diff.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <Button
                  onClick={handleStart}
                  disabled={!selectedDifficulty}
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl"
                >
                  Start Test <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SelectTechnology;
