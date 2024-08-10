import { useState } from "react"

function App(): JSX.Element {
  // window.api.ping()
  const [stage, setStage] = useState(1)
  
  return (
    <>
      <select value={stage} onChange={(e) => setStage(parseInt(e.target.value))}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>

      {/* @ts-ignore */}
      <button onClick={() => window.api.applyStage(stage)}>apply</button>
    </>
  )
}

export default App
