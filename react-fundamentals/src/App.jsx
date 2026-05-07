// src/App.jsx

// React must be in scope when using JSX
// (In React 17+ this is automatic, but good habit to import)
import { useState } from "react";

// =============================================
// WHAT IS JSX?
//
// JSX looks like HTML inside JavaScript.
// It is NOT HTML — it's syntactic sugar that
// gets compiled to React.createElement() calls.
//
// JSX:        <h1 className="title">Hello</h1>
// Compiles to: React.createElement('h1', {className:'title'}, 'Hello')
//
// KEY DIFFERENCES from HTML:
// - class      → className  (class is reserved in JS)
// - for        → htmlFor    (for is reserved in JS)
// - style      → object     ({color: 'red'} not "color: red")
// - All tags   → must close (<br /> not <br>)
// - Expressions → use {}    ({2 + 2}, {name}, {isTrue ? 'yes':'no'})
// =============================================

// =============================================
// COMPONENTS
//
// A component is a JavaScript function that:
// 1. Accepts an object of properties (props)
// 2. Returns JSX (what to render)
//
// Naming rules:
// - MUST start with a capital letter
// - PascalCase by convention
// - One component per file (for larger components)
// =============================================

// ---------------------------------
// COMPONENT 1: Greeting
// The simplest possible component.
// No props, no state — just JSX.
// ---------------------------------
function Greeting() {
  // This is a regular JS variable — fine for data that never changes
  const name = "sarhad3D";
  const week = 2;

  return (
    // JSX must return ONE parent element
    // We use a <div> wrapper here
    <div
      style={{
        // inline styles in React = JS objects (camelCase properties)
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: "24px",
        marginBottom: "24px",
      }}
    >
      {/* Comments in JSX use this syntax */}
      <h2 style={{ color: "var(--primary)", marginBottom: "8px" }}>
        {/* {} lets us embed JavaScript expressions */}
        Hello, {name}! 👋
      </h2>
      <p style={{ color: "var(--text-muted)" }}>
        You are on Week {week} of your MERN bootcamp.
        {/* Ternary operator in JSX */}
        {week < 6 ? " Frontend time! ⚛️" : " Backend time! 🟢"}
      </p>
    </div>
  );
}

// ---------------------------------
// COMPONENT 2: TechBadge
// Accepts PROPS — data passed from parent.
// Props make components reusable.
// ---------------------------------

// Destructure props directly in the parameter
function TechBadge({ name, color, isLearning }) {
  //
  // PROPS EXPLAINED:
  // When a parent renders: <TechBadge name="React" color="#61dafb" />
  // React calls: TechBadge({ name: "React", color: "#61dafb" })
  // Props flow ONE WAY: parent → child (never child → parent)
  //

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        background: `${color}22`, // hex color + 22 = ~13% opacity
        color: color,
        border: `1px solid ${color}44`,
        borderRadius: "999px",
        padding: "4px 12px",
        fontSize: "0.82rem",
        fontWeight: "600",
        fontFamily: "monospace",
      }}
    >
      {name}
      {/* Conditional rendering — only shows if isLearning is true */}
      {isLearning && <span>📍</span>}
    </span>
  );
}

// ---------------------------------
// COMPONENT 3: TechStack
// Renders a LIST of TechBadge components.
// Demonstrates: mapping arrays to components.
// ---------------------------------
function TechStack() {
  // Data array — in a real app this might come from an API
  const technologies = [
    { id: 1, name: "HTML5", color: "#e34f26", isLearning: true },
    { id: 2, name: "CSS3", color: "#264de4", isLearning: true },
    { id: 3, name: "JavaScript", color: "#f7df1e", isLearning: true },
    { id: 4, name: "React", color: "#61dafb", isLearning: true },
    { id: 5, name: "Node.js", color: "#339933", isLearning: false },
    { id: 6, name: "MongoDB", color: "#47a248", isLearning: false },
  ];

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: "24px",
        marginBottom: "24px",
      }}
    >
      <h3 style={{ marginBottom: "16px" }}>Tech Stack</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {/*
          .map() renders a component for each item in the array.
          KEY RULE: each item in a list needs a unique 'key' prop.
          React uses key to track which items change/move/delete.
          NEVER use array index as key for dynamic lists (use id).
        */}
        {technologies.map((tech) => (
          <TechBadge
            key={tech.id}
            name={tech.name}
            color={tech.color}
            isLearning={tech.isLearning}
          />
        ))}
      </div>
      <p
        style={{
          marginTop: "12px",
          fontSize: "0.82rem",
          color: "var(--text-muted)",
        }}
      >
        📍 = currently learning
      </p>
    </div>
  );
}

// ---------------------------------
// COMPONENT 4: Counter
// Introduces STATE with useState.
// State = data that changes and causes re-render.
// ---------------------------------
function Counter() {
  //
  // useState EXPLAINED:
  //
  // const [count, setCount] = useState(0)
  //         ↑         ↑              ↑
  //    current    function to    initial
  //     value      update it      value
  //
  // When setCount(newValue) is called:
  // 1. React updates the state value
  // 2. React re-renders the Counter component
  // 3. The new count value appears in the UI
  //
  // WHY NOT just do: let count = 0; count++ ?
  // Because React doesn't know about regular variables.
  // Only state changes trigger re-renders.
  //
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  // Regular variable derived from state
  // Recalculated every render automatically
  const isPositive = count > 0;
  const isNegative = count < 0;
  const isZero = count === 0;

  // Event handler functions — defined inside component
  // so they have access to state via closure
  const increment = () => setCount(count + step);
  const decrement = () => setCount(count - step);
  const reset = () => setCount(0);

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: "24px",
        marginBottom: "24px",
      }}
    >
      <h3 style={{ marginBottom: "16px" }}>Counter with State</h3>

      {/* Display count — colour changes based on value */}
      <div
        style={{
          fontSize: "4rem",
          fontWeight: "800",
          textAlign: "center",
          padding: "16px",
          color: isPositive
            ? "var(--success)"
            : isNegative
              ? "var(--danger)"
              : "var(--text-muted)",
          fontFamily: "monospace",
          transition: "color 0.2s ease",
        }}
      >
        {count}
      </div>

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          marginBottom: "16px",
        }}
      >
        <button
          onClick={decrement}
          style={{
            background: "var(--danger)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px 24px",
            fontSize: "1.2rem",
            fontWeight: "700",
          }}
        >
          −
        </button>

        <button
          onClick={reset}
          disabled={isZero}
          style={{
            background: isZero ? "var(--border)" : "var(--bg)",
            color: isZero ? "var(--text-muted)" : "var(--text)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            padding: "10px 20px",
            fontSize: "0.9rem",
            cursor: isZero ? "not-allowed" : "pointer",
          }}
        >
          Reset
        </button>

        <button
          onClick={increment}
          style={{
            background: "var(--success)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px 24px",
            fontSize: "1.2rem",
            fontWeight: "700",
          }}
        >
          +
        </button>
      </div>

      {/* Step control */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          fontSize: "0.9rem",
          color: "var(--text-muted)",
        }}
      >
        <span>Step:</span>
        {[1, 5, 10].map((s) => (
          <button
            key={s}
            onClick={() => setStep(s)}
            style={{
              background: step === s ? "var(--primary)" : "transparent",
              color: step === s ? "white" : "var(--text-muted)",
              border: `1px solid ${step === s ? "var(--primary)" : "var(--border)"}`,
              borderRadius: "6px",
              padding: "4px 12px",
              fontSize: "0.85rem",
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------
// COMPONENT 5: TodoItem
// A single todo — child component
// Receives data AND a callback via props
// ---------------------------------
function TodoItem({ todo, onToggle, onDelete }) {
  //
  // CALLBACK PROPS EXPLAINED:
  // Child components can't directly change parent state.
  // Instead, parent passes a function as a prop.
  // Child calls that function when something happens.
  // Parent's state updates → re-render flows down.
  //
  // This is called "lifting state up" — a core React pattern.
  //

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 16px",
        background: todo.completed
          ? "rgba(34,197,94,0.05)"
          : "rgba(255,255,255,0.03)",
        border: `1px solid ${todo.completed ? "rgba(34,197,94,0.2)" : "var(--border)"}`,
        borderRadius: "8px",
        marginBottom: "8px",
        transition: "all 0.2s ease",
      }}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        style={{
          width: "18px",
          height: "18px",
          cursor: "pointer",
          accentColor: "var(--primary)",
        }}
      />

      {/* Todo text — strikethrough if completed */}
      <span
        style={{
          flex: 1,
          textDecoration: todo.completed ? "line-through" : "none",
          color: todo.completed ? "var(--text-muted)" : "var(--text)",
          fontSize: "0.95rem",
        }}
      >
        {todo.text}
      </span>

      {/* Delete button */}
      <button
        onClick={() => onDelete(todo.id)}
        style={{
          background: "transparent",
          border: "none",
          color: "var(--text-muted)",
          fontSize: "1rem",
          padding: "4px 8px",
          borderRadius: "6px",
          transition: "color 0.15s",
        }}
        onMouseEnter={(e) => (e.target.style.color = "var(--danger)")}
        onMouseLeave={(e) => (e.target.style.color = "var(--text-muted)")}
      >
        ✕
      </button>
    </div>
  );
}

// ---------------------------------
// COMPONENT 6: TodoList
// Parent component that owns state.
// Passes data and callbacks to TodoItem children.
// ---------------------------------
function TodoList() {
  // State: array of todo objects
  const [todos, setTodos] = useState([
    { id: 1, text: "Complete Day 1 setup ✅", completed: true },
    { id: 2, text: "Build portfolio website", completed: true },
    { id: 3, text: "Master JavaScript ES6+", completed: true },
    { id: 4, text: "Learn React fundamentals", completed: false },
    { id: 5, text: "Build calculator app", completed: false },
  ]);

  // State: the input field value
  const [inputValue, setInputValue] = useState("");

  // DERIVED STATE — computed from state, no useState needed
  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;
  const progress =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // ADD a todo
  const addTodo = () => {
    // Trim removes leading/trailing spaces
    if (inputValue.trim() === "") return;

    const newTodo = {
      // Date.now() gives a unique number — fine for small apps
      // In real apps, use a proper UUID library
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
    };

    // NEVER mutate state directly: todos.push(newTodo) ❌
    // ALWAYS create new array with spread: [...todos, newTodo] ✅
    // React needs a NEW array reference to detect the change
    setTodos([...todos, newTodo]);
    setInputValue(""); // Clear input after adding
  };

  // TOGGLE a todo's completed status
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        // If this is the todo to toggle, flip completed
        // Otherwise return it unchanged
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  // DELETE a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Handle Enter key in input
  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTodo();
  };

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: "24px",
        marginBottom: "24px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h3>Bootcamp Progress</h3>
        <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
          {completedCount}/{totalCount} done
        </span>
      </div>

      {/* Progress bar */}
      <div
        style={{
          height: "8px",
          background: "var(--border)",
          borderRadius: "999px",
          overflow: "hidden",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background:
              "linear-gradient(90deg, var(--primary), var(--secondary))",
            borderRadius: "999px",
            transition: "width 0.4s ease",
          }}
        />
      </div>

      {/* Todo items */}
      <div style={{ marginBottom: "16px" }}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </div>

      {/* Add new todo */}
      <div style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          value={inputValue}
          // onChange keeps React state in sync with what you type
          // This is called a "controlled input"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task..."
          style={{
            flex: 1,
            background: "var(--bg)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            padding: "10px 14px",
            color: "var(--text)",
            fontSize: "0.95rem",
            outline: "none",
          }}
          onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
        />
        <button
          onClick={addTodo}
          disabled={inputValue.trim() === ""}
          style={{
            background: inputValue.trim() ? "var(--primary)" : "var(--border)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            fontWeight: "600",
            transition: "background 0.2s",
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}

// =============================================
// ROOT COMPONENT: App
// The top-level component.
// Composes all other components together.
// Think of it as the "page layout".
// =============================================
function App() {
  return (
    <div
      style={{
        maxWidth: "680px",
        margin: "0 auto",
        padding: "40px 20px",
      }}
    >
      {/* Page header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <p
          style={{
            fontFamily: "monospace",
            color: "var(--primary)",
            fontSize: "0.85rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "8px",
          }}
        >
          Week 2 — Day 1
        </p>
        <h1
          style={{
            fontSize: "2.2rem",
            fontWeight: "800",
            marginBottom: "8px",
            background: "linear-gradient(135deg, #fff, var(--primary))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          React Fundamentals
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Components · Props · State · Events
        </p>
      </div>

      {/* Render all components */}
      <Greeting />
      <TechStack />
      <Counter />
      <TodoList />
    </div>
  );
}

// Every component file exports its main component
export default App;
