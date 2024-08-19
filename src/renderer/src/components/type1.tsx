import { useEffect, useState } from "react"

// {"s1":{"responder":["佐藤","田中","山田","伊藤","佐々木","高野"],"log":["s 5 2","i 0"],"question":["a","b","c"]},"s2":{"responder":["僕","私","吾","俺"],"log":[],"question":["『蒸気船ウィリー』という作品で初登場した、ディズニーを代表するキャラクターは"]},"s3":{"responder":["僕","吾"],"log":["i 0","i 0","i 0","i 1","i 1","i 0","i 1"],"question":["a","b"]}}

function App({ s, setS }) {
  const [score, setScore] = useState<any[]>([])
  const [selectedLog, setSelectedLog] = useState(0)
  const [addLogScore, setAddLogScore] = useState<any>(0)
  const [selectedQuestion, setSelectedQuestion] = useState(0)

  const LogItem = ({ l, selected }) => {
    switch (l[0]) {
      case "s":
        return <code style={{ display: "block" }}>{`${selected ? ">" : ""} ${s.responder[parseInt(l.split(" ")[1])]}  ${l.split(" ")[2]}`}</code>
      case "i":
        return <code style={{ display: "block" }}>{`${selected ? ">" : ""} ${s.responder[parseInt(l.split(" ")[1])]} +`}</code>
      case "d":
        return <code style={{ display: "block" }}>{`${selected ? ">" : ""} ${s.responder[parseInt(l.split(" ")[1])]} -`}</code>
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

  useEffect(() => {
    // @ts-ignore
    window.api.applyData(s)

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
    setScore(sc)
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
                return { ...pre, log: [...pre.log, `i ${i}`] }
              })}>+</button>
              <button onClick={() => setS((pre) => {
                return { ...pre, log: [...pre.log, `d ${i}`] }
              })}>-</button>
              <button onClick={() => setS((pre) => {
                return { ...pre, log: [...pre.log, `s ${i} ${addLogScore}`] }
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
        {/* @ts-ignore */}
        <button onClick={() => window.api.displayQuestion(s.question[selectedQuestion])}>show</button>
        {/* @ts-ignore */}
        <button onClick={() => window.api.hideQuestion()}>hide</button>
        <div>
          {s.question?.map((v, i) => (
            <div key={i} onClick={() => setSelectedQuestion(i)}>
              <code>{i == selectedQuestion ? "> " : ""}{v}</code>
            </div>
          ))}
        </div>
      </div>

      <hr />
      <code>{JSON.stringify(score)}</code>
    </>
  )
}

export default App
