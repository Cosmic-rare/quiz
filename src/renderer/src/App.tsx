import { useState } from "react"

const LogItem = ({ l, selected }) => {
  switch (l[0]) {
    case "s":
      return <code style={{ display: "block" }}>{`${selected ? ">" : ""} ${l.split(" ")[1]}  ${l.split(" ")[2]}`}</code>
    case "i":
      return <code style={{ display: "block" }}>{`${selected ? ">" : ""} ${l.split(" ")[1]} +`}</code>
    case "d":
      return <code style={{ display: "block" }}>{`${selected ? ">" : ""} ${l.split(" ")[1]} -`}</code>
  }
}

function App(): JSX.Element {
  const [stage, setStage] = useState(1)
  const [s, setS] = useState<any>({ responder: [], log: [] })
  const [filePath, setFilePath] = useState<null | string>(null)
  const [score, setScore] = useState<any[]>([])
  const [selectedLog, setSelectedLog] = useState(0)
  const [addLogScore, setAddLogScore] = useState<any>(0)

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
            <div>
            <input
              value={v}
              key={i}
              onChange={(e) => setS((ss) => {
                let sss = { ...ss }
                /// @ts-ignore
                sss.responder[i] = e.target.value
                return sss
              })}
            />
            <button onClick={() => setS((pre) => {
              return { responder: pre.responder, log: [...pre.log, `i ${i}`] }
            })}>+</button>
            <button onClick={() => setS((pre) => {
              return { responder: pre.responder, log: [...pre.log, `d ${i}`] }
            })}>-</button>
            <button onClick={() => setS((pre) => {
              return { responder: pre.responder, log: [...pre.log, `s ${i} ${addLogScore}`] }
            })}>s</button>
            </div>
          ))}
        </div>
      </div>

      <hr />
      <div>
        <button onClick={() => {
          setS((pre) => {
            if (s.log.length - 1 == selectedLog) { return pre }
            let lo = [...pre.log]
            const tmp = lo[selectedLog]
            lo[selectedLog] = lo[selectedLog + 1]
            lo[selectedLog + 1] = tmp
            setSelectedLog(selectedLog + 1)
            return { ...pre, log: lo }
          })
        }}>↓</button>
        <button onClick={() => {
          setS((pre) => {
            if (0 == selectedLog) { return pre }
            let lo = [...pre.log]
            const tmp = lo[selectedLog]
            lo[selectedLog] = lo[selectedLog - 1]
            lo[selectedLog - 1] = tmp
            setSelectedLog(selectedLog - 1)
            return { ...pre, log: lo }
          })
        }}>↑</button>
        <button onClick={() => {
          setS((pre) => {
            let lo = [...pre.log]
            lo.splice(selectedLog, 1)
            return { ...pre, log: lo }
          })
        }}>del</button>
        <div>
          {s.log.map((v, i) => (
            <div key={i} onClick={() => setSelectedLog(i)}>
              <LogItem l={v} selected={i == selectedLog} />
            </div>
          ))}
        </div>
        <button onClick={() => setAddLogScore((p) => p+1)}>+</button>
        {addLogScore}
        <button onClick={() => setAddLogScore((p) => p-1)}>-</button>
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
