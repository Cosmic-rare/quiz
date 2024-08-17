import { useState } from 'react'

function Viewer(): JSX.Element {
  const [stage, setStage] = useState(0)
  const [score, setScore] = useState([])
  const [responder, setResponder] = useState([])
  const [question, setQuestion] = useState("")

  // @ts-ignore
  window.api.onSetStage((s, r) => {
    setStage(s)
    setResponder(r)
  })

  // @ts-ignore
  window.api.onLoadScore((ss) => {
    setScore(ss)
  })

  // @ts-ignore
  window.api.onSetQuestion((q) => {
    setQuestion(q)
  })

  return (
    <>
    <code>{stage}ステージ</code>
    <span>{question}</span>
    <hr />
    <code>{JSON.stringify(score)}</code>
    <br />
    <code>{JSON.stringify(responder)}</code>
    </>
  )
}

export default Viewer
