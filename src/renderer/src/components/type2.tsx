import { useEffect, useState } from "react"

function App({ s, setS }) {
  const [selectedLog, setSelectedLog] = useState(0)
  const [questionStatus, setQuestionStatus] = useState<any>([])
  const [selectedStr, setSelectedStr] = useState(0)
  const [responderStatus, setResponderStatus] = useState<any>([0, 0, 0, 0])
  const [selectedQuestion, setSelectedQuestion] = useState(0)
  const [penalty, setPenalty] = useState<any>([0, 0, 0, 0])
  const colors = ["red", "blue", "orange", "green"]

  const aryMax = function (a, b) { return Math.max(a, b) }

  const LogItem = ({ l, selected }): any => {
    switch (l[0]) {
      case "o":
        return <code style={{ display: "block" }}>{`${selected ? ">" : ""} ${s.responder[parseInt(l.split(" ")[1])]}  ${s.question[0][l.split(" ")[2]]}`}</code>
      case "a":
        return <code style={{ display: "block" }}>{`${selected ? ">" : ""} ${s.responder[parseInt(l.split(" ")[1])]} 抜け`}</code>
    }
  }

  // @ts-ignore
  window.api.onLoadState((ss) => {
    let qs = new Array(ss.question[0]?.length).fill(null)
    ss.log.forEach(l => {
      switch (l[0]) {
        case "o":
          qs[l.split(" ")[2]] = parseInt(l.split(" ")[1])
          break
        case "a":
          responderStatus[l.split(" ")[1]] = responderStatus.reduce(aryMax) + 1
      }
    })
    setQuestionStatus(qs)
    setS(ss)
  })

  const genQuestionStatus = () => {
    let qs = new Array(s.question[0]?.length).fill(null)
    let counter = 1
    let responderSt = [0, 0, 0, 0]
    s.log.forEach(l => {
      switch (l[0]) {
        case "o":
          qs[l.split(" ")[2]] = parseInt(l.split(" ")[1])
          break
        case "a":
          responderSt[l.split(" ")[1]] = counter
          counter++
          break
      }
    })
    setQuestionStatus(qs)
    setResponderStatus(responderSt)
    // @ts-ignore
    window.api.setQuestionStatus(qs)
    // @ts-ignore
    window.api.setResponderStatus(responderSt)
  }

  useEffect(() => {
    genQuestionStatus()
  }, [s])

  useEffect(() => {
    // @ts-ignore
    window.api.setPenalty(penalty)
  }, [penalty])

  useEffect(() => {
    // @ts-ignore
    window.api.displayQuestion2(s.question[0])
  }, [])

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
                return { ...pre, log: [...pre.log, `o ${i} ${selectedStr}`] }
              })}>o</button>
              <button onClick={() => setS((pre) => {
                return { ...pre, log: [...pre.log, `a ${i}`] }
              })}>
                a
              </button>
              <button onClick={() => setPenalty((pre) => {
                let pr = [...pre]
                pr[i] = pr[i] + 1
                return pr
              })}>
                +
              </button>
              <button onClick={() => setPenalty((pre) => {
                let pr = [...pre]
                pr[i] = pr[i] - 1
                return pr
              })}>
                -
              </button>
            </div>
          ))}
        </div>
        <button onClick={() => setPenalty((pre) => { return pre.map((v) => v - 1) })}>-</button>
        <button onClick={() => setPenalty((pre) => { return pre.map((v) => v + 1) })}>+</button>
      </div>

      <code>{JSON.stringify(penalty)}</code>

      <hr />
      <div>
        {s.question[0]?.split("").map((v, i) => (
          <span
            key={i}
            style={{ border: `${selectedStr == i ? "4px solid black" : `2px solid ${questionStatus[i] != null ? colors[questionStatus[i]] : "transparent"}`}` }}
            onClick={() => setSelectedStr(i)}
          >
            {v}
          </span>
        ))}
      </div>

      <hr />
      <code>{JSON.stringify(responderStatus)}</code>

      <hr />
      <div>
        <button onClick={() => setSelectedQuestion((p) => { if (p == 0) return p; return p - 1 })}>↑</button>
        <button onClick={() => setSelectedQuestion((p) => { if (p == s.question.length - 2) return p; return p + 1 })}>↓</button>
        {/* @ts-ignore */}
        <button onClick={() => window.api.displayQuestion(s.question[selectedQuestion + 1])}>show</button>
        {/* @ts-ignore */}
        <button onClick={() => window.api.hideQuestion()}>hide</button>
        <div style={{ maxHeight: 300, overflowY: "scroll" }}>
          {s.question?.slice(1).map((v, i) => (
            <div key={i}>
              <code>{i == selectedQuestion ? "> " : ""}{v}</code>
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
      </div>
    </>
  )
}

export default App
