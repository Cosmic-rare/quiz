import { useState } from "react"

function App(): JSX.Element {
  const [stage, setStage] = useState(1)
  const [filePath, setFilePath] = useState<null | string>(null)

  // @ts-ignore
  window.api.onSetStage((s) => {
    setStage(s)
  })

  return (
    <>
      <div>
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
      </div>

      <div>
        <button onClick={async () => {
          // @ts-ignore
          const p = await window.api.selectFile()
          setFilePath(p)
        }}>selectFile</button>

        {/* @ts-ignore */}
        <button onClick={() => window.api.loadFile()}>loadFile</button>

        <code>{filePath}</code>
      </div>
    </>
  )
}

export default App
