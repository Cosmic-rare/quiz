import { useEffect, useState } from "react"

function App({ s, setS, filePath }) {
  const [score, setScore] = useState<any[]>([])
  const [previewScore, setPreviewScore] = useState<any[]>([])
  const [selectedLog, setSelectedLog] = useState(0)
  const [addLogScore, setAddLogScore] = useState<any>(0)

  const LogItem = ({ l, selected }) => {
    switch (l[0]) {
      case "s":
        return <code style={{ display: "block" }}>{`${selected ? ">" : ""} ${s.responder[parseInt(l.split(" ")[1])]}  ${l.split(" ")[2]}`}</code>
    }
  }

  // @ts-ignore
  window.api.onLoadState((ss) => {
    let sc = new Array(ss.responder.length).fill(0)
    ss.log.forEach(l => {
      switch (l[0]) {
        case "s":
          sc[l.split(" ")[1]] = parseInt(l.split(" ")[2])
          break
      }
    })
    setScore(sc)
    setPreviewScore(sc)
    setS(ss)
  })

  useEffect(() => {
    let sc = new Array(s.responder.length).fill(0)
    s.log.forEach(l => {
      switch (l[0]) {
        case "s":
          sc[l.split(" ")[1]] = parseInt(l.split(" ")[2])
          break
        case "i":
          sc[l.split(" ")[1]]++
          break
        case "d":
          sc[l.split(" ")[1]]--
          break
      }
    })
    setPreviewScore(sc)
  }, [s])

  return (
    <>
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
        <button onClick={() => setAddLogScore((p) => p + 1)}>+</button>
        {addLogScore}
        <button onClick={() => setAddLogScore((p) => p - 1)}>-</button>
      </div>

      <hr />
      <div>
        {s.question[0]}
      </div>

      <hr />
      <div>
        <p>preview score</p>
        <button disabled={!filePath} onClick={() => {
          // @ts-ignore
          window.api.applyData(s)
        }}>apply</button>
        <div>
          {previewScore.map((v, i) => (
            <code key={i} style={{ display: "block" }}>{v}</code>
          ))}
        </div>
      </div>

      <hr />
      <div>
        <p>score</p>
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
