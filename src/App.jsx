import { useState } from 'react'
import './App.css'
import ControlledUncontrolled from './components/ControlledUncontrolled.jsx'
import FunctionalUpdater from './components/FunctionalUpdater.jsx'
import AsyncRace from './components/AsyncRace.jsx'

function SnapshotBasics() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('Alice')
  const [isSent, setIsSent] = useState(false)
  const [message, setMessage] = useState('Hello!')

  console.log('Rendering snapshot with:', { count, name, message, isSent })

  function handleAdd() {
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1)
    console.log('Clicked +3, but count is still:', count)
  }

  function handleAlert() {
    setCount(count + 5)
    setTimeout(() => {
      alert(`Snapshot count = ${count}`)
    }, 3000)
  }

  function handleSend(e) {
    e.preventDefault()
    setIsSent(true)
    setTimeout(() => {
      alert(`You said "${message}" to ${name}`)
    }, 4000)
  }

  if (isSent) {
    return (
      <div className="card">
        <h2>Message sent!</h2>
        <button className="btn" onClick={() => setIsSent(false)}>Reset</button>
      </div>
    )
  }

  return (
    <section className="card">
      <h2>Snapshot Basics</h2>
      <p className="muted">Open your console to observe per-render snapshots.</p>
      <p className="stat">Current count: <strong>{count}</strong></p>
      <div className="actions">
        <button className="btn" onClick={handleAdd}>+3 (same render)</button>
        <button className="btn" onClick={handleAlert}>+5 (delayed alert)</button>
      </div>

      <hr style={{ opacity: 0.2, margin: '16px 0' }} />

      <h3>Async Snapshot in Forms</h3>
      <form onSubmit={handleSend} className="form">
        <label className="label">
          Send to
          <select className="input" value={name} onChange={(e) => setName(e.target.value)}>
            <option value="Alice">Alice</option>
            <option value="Bob">Bob</option>
          </select>
        </label>

        <label className="label">
          Message
          <textarea
            className="input textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
          />
        </label>

        <button className="btn primary" type="submit">Send</button>
      </form>
      <p className="muted" style={{ marginTop: 8 }}>Tip: Click Send and quickly change the dropdown — the alert still shows the name from the click moment.</p>
    </section>
  )
}

export default function App() {
  const [tab, setTab] = useState('basics')
  return (
    <div className="container">
      <h1>🧠 React 19: State as a Snapshot — Playground</h1>

      <div className="tabs">
        <button className={tab==='basics' ? 'tabbtn active' : 'tabbtn'} onClick={() => setTab('basics')}>Basics</button>
        <button className={tab==='functional' ? 'tabbtn active' : 'tabbtn'} onClick={() => setTab('functional')}>Functional Updater</button>
        <button className={tab==='async' ? 'tabbtn active' : 'tabbtn'} onClick={() => setTab('async')}>Async Race</button>
        <button className={tab==='control' ? 'tabbtn active' : 'tabbtn'} onClick={() => setTab('control')}>Controlled vs Uncontrolled</button>
      </div>

      {tab === 'basics' && <SnapshotBasics />}
      {tab === 'functional' && <FunctionalUpdater />}
      {tab === 'async' && <AsyncRace />}
      {tab === 'control' && <ControlledUncontrolled />}

      <p className="footer muted">
        Explore how per-render snapshots, updater functions, and async code interact. Open the console!
      </p>
    </div>
  )
}
