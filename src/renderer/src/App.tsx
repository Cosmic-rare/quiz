import { useState } from "react"

function App(): JSX.Element {
  const [stage, setStage] = useState(1)

  // @ts-ignore
  window.api.onSetStage((s) => {
    setStage(s)
  })

  return (
    <>
      <select value={stage} onChange={(e) => setStage(parseInt(e.target.value))}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>

      {/* @ts-ignore */}
      <button onClick={() => window.api.applyStage(stage)}>apply</button>

      {/* @ts-ignore */}
      <button onClick={() => window.api.syncStage()}>sync</button>

      {/* @ts-ignore */}
      <button onClick={() => window.electron.ipcRenderer.send('createWindow')}>open</button>
    </>
  )
}

export default App
