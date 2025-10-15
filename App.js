import React, { useState, useEffect } from "react";
import "./App.css";

// Shuffle function for questions only
function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [scores, setScores] = useState([]);

  // Original questions with options in order
  const originalQuestions = [
    {
      question: "Which of the following is a good way to introduce yourself?",
      options: [
        "Talk only about hobbies",
        "Briefly summarize your background and strengths",
        "Explain your entire life story",
        "Just say your name and stop",
      ],
      correctIndex: 1,
    },
    {
      question: "What should you focus on while answering 'Why this company?'",
      options: [
        "The company’s reputation and your alignment with its values",
        "Salary only",
        "That you just need any job",
        "That you live nearby",
      ],
      correctIndex: 0,
    },
    {
      question: "What is a good way to discuss your weaknesses?",
      options: [
        "Say you have no weaknesses",
        "Mention a weakness and how you're improving it",
        "Complain about your boss",
        "Avoid the question",
      ],
      correctIndex: 1,
    },
    {
      question: "How should you answer technical questions?",
      options: [
        "By panicking",
        "By giving clear, structured explanations",
        "By ignoring the question",
        "By saying you forgot everything",
      ],
      correctIndex: 1,
    },
    {
      question:
        "What should you do if you don’t know the answer to a question?",
      options: [
        "Make up something unrelated",
        "Admit you don’t know and explain how you'd find the answer",
        "Stay silent",
        "Blame your college",
      ],
      correctIndex: 1,
    },
  ];

  // Shuffle questions only
  useEffect(() => {
    const shuffledQs = shuffleArray(originalQuestions);
    setQuestions(shuffledQs);
    setSelectedOptions(Array(shuffledQs.length).fill(null));
    setScores(Array(shuffledQs.length).fill(null));
    setCurrentQ(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOptionSelect = (index) => {
    if (questions.length === 0) return;
    const updatedSelected = [...selectedOptions];
    updatedSelected[currentQ] = index;
    setSelectedOptions(updatedSelected);

    const updatedScores = [...scores];
    updatedScores[currentQ] =
      index === questions[currentQ].correctIndex ? 1 : 0;
    setScores(updatedScores);
  };

  const Home = () => (
    <div className="section">
      <h1>🤖 Interview Buddy</h1>
      <p className="tagline">AI Powered Interview Preparation Bot</p>
      <p>
        Practice MCQ interview questions with randomized order of questions!
      </p>
    </div>
  );

  const MockInterview = () => {
    if (questions.length === 0) return <p>Loading questions...</p>;
    const current = questions[currentQ];

    return (
      <div className="section">
        <h2>🎤 Mock Interview</h2>
        <p className="question">
          <strong>Q{currentQ + 1}:</strong> {current.question}
        </p>

        <div className="options">
          {current.options.map((option, i) => (
            <label key={i} className="option-item">
              <input
                type="radio"
                name={`question-${currentQ}`}
                checked={selectedOptions[currentQ] === i}
                onChange={() => handleOptionSelect(i)}
              />
              {option}
            </label>
          ))}
        </div>

        {scores[currentQ] !== null && (
          <p className="score-display">
            {scores[currentQ] === 1 ? "✅ Correct!" : "❌ Wrong Answer"}
          </p>
        )}

        <div className="button-group">
          <button
            className="primary-btn"
            onClick={() => setCurrentQ((prev) => (prev > 0 ? prev - 1 : prev))}
            disabled={currentQ === 0}
          >
            Previous
          </button>
          <button
            className="primary-btn"
            onClick={() =>
              setCurrentQ((prev) =>
                prev < questions.length - 1 ? prev + 1 : prev
              )
            }
            disabled={currentQ === questions.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  const Feedback = () => {
    const answered = scores.filter((s) => s !== null);
    const total = answered.reduce((a, b) => a + b, 0);
    const totalQuestions = questions.length;
    const percentage = totalQuestions
      ? ((total / totalQuestions) * 100).toFixed(1)
      : 0;

    return (
      <div className="section">
        <h2>📝 Feedback Summary</h2>
        <p>
          Questions Attempted: {answered.length}/{totalQuestions}
        </p>
        <p>Correct Answers: {total}</p>
        <p>Score Percentage: {percentage}%</p>
      </div>
    );
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">Interview Buddy</div>
        <div className="nav-links">
          <button
            className={activeSection === "home" ? "active" : ""}
            onClick={() => setActiveSection("home")}
          >
            Home
          </button>
          <button
            className={activeSection === "mock" ? "active" : ""}
            onClick={() => setActiveSection("mock")}
          >
            Mock Interview
          </button>
          <button
            className={activeSection === "feedback" ? "active" : ""}
            onClick={() => setActiveSection("feedback")}
          >
            Feedback
          </button>
        </div>
      </nav>

      <div className="content">
        {activeSection === "home" && <Home />}
        {activeSection === "mock" && <MockInterview />}
        {activeSection === "feedback" && <Feedback />}
      </div>
    </div>
  );
}

export default App;
