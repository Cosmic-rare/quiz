import { useState } from "react"
import Type1 from "./components/type1"
import Type2 from "./components/type2"

// {"s1":{"responder":["佐藤","田中","山田","伊藤","佐々木","高野"],"log":["s 5 2","i 0"],"question":["a","b","c"]},"s2":{"responder":["僕","私","吾","俺"],"log":[],"question":["『蒸気船ウィリー』という作品で初登場した、ディズニーを代表するキャラクターは"]},"s3":{"responder":["僕","吾"],"log":["i 0","i 0","i 0","i 1","i 1","i 0","i 1"],"question":["a","b"]}}

function App(): JSX.Element {
  const [stage, setStage] = useState(1)
  const [s, setS] = useState<any>({ responder: [], log: [], question: [] })
  const [filePath, setFilePath] = useState<null | string>(null)

  // @ts-ignore
  window.api.onSetStage((ss) => {
    setStage(ss)
  })

  return (
    <>
      <div>
        <select value={stage} onChange={(e) => setStage(parseInt(e.target.value))}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>

        <button disabled={!filePath} onClick={() => {
          // @ts-ignore
          window.api.applyStage(stage)
          // @ts-ignore
          window.api.loadFile()
        }}>apply</button>

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
        <button onClick={() => window.api.loadFile()} disabled={!filePath}>loadFile</button>

        {/* @ts-ignore */}
        <button onClick={() => window.api.saveFile(s)} disabled={!filePath}>saveFile</button>

        <code>{filePath}</code>
      </div>

      <hr />

      {stage == 2 ?
        <Type2 s={s} setS={setS} filePath={filePath} /> :
        stage != 0 ?
          <Type1 s={s} setS={setS} filePath={filePath} />
          : <></>
      }

    </>
  )
}

export default App
