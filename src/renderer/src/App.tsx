import { useState } from "react"

function App(): JSX.Element {
  const [stage, setStage] = useState(1)
  const [s, setS] = useState({ responder: [], log: [] })
  const [filePath, setFilePath] = useState<null | string>(null)
  const [score, setScore] = useState<any[]>([])

  // @ts-ignore
  window.api.onSetStage((ss) => {
    setStage(ss)
  })

  // @ts-ignore
  window.api.onLoadState((ss) => {
    let sc = new Array(ss.responder.length).fill(0)
    ss.log.forEach(l => {
      switch (l[0]) {
        case "s":
          sc[l.split(" ")[1]] = l.split(" ")[2]
          break
        case "i":
          sc[l.split(" ")[1]]++
          break
        case "d":
          sc[l.split(" ")[1]]--
          break
      }
    })
    setScore(sc)
    setS(ss)
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

        {/* @ts-ignore */}
        <button onClick={() => window.api.saveFile(s)}>saveFile</button>

        <code>{filePath}</code>
      </div>

      <hr />
      <div>
        <code>{JSON.stringify(s)}</code>
      </div>

      <hr />
      <div>
        <div>
          {s.responder.map((v, i) => (
            <input
              value={v}
              key={i}
              onChange={(e) => setS((ss) => {
                let sss = {...ss}
                /// @ts-ignore
                sss.responder[i] = e.target.value
                return sss
              })}
            />
          ))}
        </div>
      </div>

      <hr />
      <div>
        <div>
          {s.log.map((v, i) => (
            <code key={i} style={{ display: "block" }}>{v}</code>
          ))}
        </div>
      </div>

      <hr />
      <div>
        <div>
          {score.map((v, i) => (
            <code key={i} style={{ display: "block" }}>{v}</code>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
