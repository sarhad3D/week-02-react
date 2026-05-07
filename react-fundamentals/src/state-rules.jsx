// src/state-rules.jsx
// REFERENCE FILE — not rendered, just for learning

import { useState } from "react";

// =============================================
// RULE 1: NEVER mutate state directly
// Always create new values
// =============================================
function Rule1() {
  const [items, setItems] = useState([1, 2, 3]);

  // ❌ WRONG — mutates the existing array
  const addWrong = () => {
    items.push(4); // This mutates! React won't re-render
    setItems(items); // Same reference = React ignores it
  };

  // ✅ CORRECT — creates a new array
  const addCorrect = () => {
    setItems([...items, 4]); // New array = React detects change
  };

  // ❌ WRONG — mutates object
  const updateWrong = (id) => {
    items[0] = 99; // Direct mutation!
    setItems(items);
  };

  // ✅ CORRECT — creates new array with updated item
  const updateCorrect = (id) => {
    setItems(items.map((item) => (item === id ? 99 : item)));
  };
}

// =============================================
// RULE 2: State updates may be ASYNCHRONOUS
// Don't rely on state value immediately after setting it
// =============================================
function Rule2() {
  const [count, setCount] = useState(0);

  // ❌ WRONG — count hasn't updated yet when this logs
  const wrongUpdate = () => {
    setCount(count + 1);
    console.log(count); // Still shows OLD value!
  };

  // ✅ CORRECT — use functional update form when new state
  // depends on old state
  const correctUpdate = () => {
    // React passes the guaranteed latest value as argument
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1); // This works — adds 2
  };
}

// =============================================
// RULE 3: Each component has its OWN state
// State is local and isolated by default
// =============================================
function CounterInstance({ label }) {
  const [count, setCount] = useState(0); // Each instance is independent!
  return (
    <div>
      <span>
        {label}: {count}
      </span>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

function Rule3() {
  return (
    <div>
      {/* Each Counter has its own count — changing one doesn't affect others */}
      <CounterInstance label="Counter A" />
      <CounterInstance label="Counter B" />
      <CounterInstance label="Counter C" />
    </div>
  );
}

// =============================================
// RULE 4: To share state — LIFT IT UP
// Move state to the closest common parent
// =============================================
function Rule4() {
  // State lives in the parent
  const [sharedCount, setSharedCount] = useState(0);

  return (
    <div>
      {/* Both children share the same state via props */}
      <DisplayCount count={sharedCount} />
      <ControlCount count={sharedCount} setCount={setSharedCount} />
    </div>
  );
}

function DisplayCount({ count }) {
  return <p>Shared count: {count}</p>;
}

function ControlCount({ count, setCount }) {
  return <button onClick={() => setCount(count + 1)}>Increment Shared</button>;
}
