import { useRef, useState } from 'react'

export default function ControlledUncontrolled() {
  const inputRef = useRef(null)
  const [controlled, setControlled] = useState('Hello')

  function showUncontrolled() {
    alert(`Uncontrolled value (read via ref): ${inputRef.current?.value ?? ''}`)
  }

  return (
    <section className="card">
      <h2>Controlled vs Uncontrolled</h2>
      <p className="muted">Controlled inputs store value in React state. Uncontrolled rely on the DOM.</p>

      <div className="form">
        <label className="label">
          Controlled input
          <input
            className="input"
            value={controlled}
            onChange={(e) => setControlled(e.target.value)}
            placeholder="Type..."
          />
        </label>

        <label className="label">
          Uncontrolled input
          <input
            className="input"
            defaultValue="Hello (DOM)"
            ref={inputRef}
            placeholder="Type..."
          />
        </label>
      </div>

      <div className="actions" style={{ marginTop: 12 }}>
        <button className="btn" onClick={() => alert(`Controlled state: ${controlled}`)}>Read controlled</button>
        <button className="btn" onClick={showUncontrolled}>Read uncontrolled</button>
      </div>
    </section>
  )
}
