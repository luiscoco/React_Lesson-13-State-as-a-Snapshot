import { useEffect, useRef, useState } from 'react'

export default function AsyncRace() {
  const [count, setCount] = useState(0)
  const [running, setRunning] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    return () => clearInterval(timerRef.current)
  }, [])

  function startNaive() {
    clearInterval(timerRef.current)
    setRunning(true)
    // Captures snapshot of `count` at start
    let local = count
    timerRef.current = setInterval(() => {
      // This updates from the stale local variable
      local = local + 1
      setCount(local) // forces updates but derived from stale chain
    }, 500)
  }

  function startFunctional() {
    clearInterval(timerRef.current)
    setRunning(true)
    timerRef.current = setInterval(() => {
      // Uses the latest state every tick
      setCount(c => c + 1)
    }, 500)
  }

  function stop() {
    clearInterval(timerRef.current)
    setRunning(false)
  }

  function reset() {
    stop()
    setCount(0)
  }

  return (
    <section className="card">
      <h2>Async Race: stale closure vs functional updates</h2>
      <p className="stat">Count: <strong>{count}</strong></p>
      <div className="actions">
        <button className="btn" onClick={startNaive}>Start (naive)</button>
        <button className="btn" onClick={startFunctional}>Start (functional)</button>
        <button className="btn" onClick={stop} disabled={!running}>Stop</button>
        <button className="btn" onClick={reset}>Reset</button>
      </div>
      <p className="muted" style={{ marginTop: 8 }}>
        The naive version closes over a snapshot of <code>count</code> and increments a local copy.

        The functional version always computes from the freshest state, avoiding races.

      </p>
    </section>
  )
}
