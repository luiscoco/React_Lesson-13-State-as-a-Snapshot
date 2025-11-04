import { useState } from 'react'

export default function FunctionalUpdater() {
  const [count, setCount] = useState(0)

  function addWithValues() {
    // Based on the same snapshot; ends up +1
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1)
  }

  function addWithUpdater() {
    // Each updater receives the latest computed state; ends up +3
    setCount(c => c + 1)
    setCount(c => c + 1)
    setCount(c => c + 1)
  }

  return (
    <section className="card">
      <h2>Functional Updater</h2>
      <p className="stat">Count: <strong>{count}</strong></p>
      <div className="actions">
        <button className="btn" onClick={addWithValues}>+3 (value form → +1)</button>
        <button className="btn" onClick={addWithUpdater}>+3 (functional form → +3)</button>
      </div>
      <p className="muted" style={{ marginTop: 8 }}>The functional form reads the freshest state per call.</p>
    </section>
  )
}
