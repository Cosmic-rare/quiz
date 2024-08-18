import { useState } from 'react'

function Viewer({ stage, responder, question }) {
  const colors = ["red", "blue", "orange", "green"]
  const [score, setScore] = useState([])
  const [questionStatus, setQuestionStatue] = useState<any>([])

  // @ts-ignore
  window.api.onLoadScore((ss) => {
    setScore(ss)
  })

  // @ts-ignore
  window.api.onSetQuestionStatus((q) => {
    setQuestionStatue(q)
  })

  return (
    <>
      <code>{stage}ステージ</code>
      <hr />
      <code>{JSON.stringify(responder)}</code>
      <hr />
      {question?.split("").map((v, i) => (
          <span
            key={i}
            style={{ border: `2px solid ${questionStatus[i] != null ? colors[questionStatus[i]] : "transparent"}` }}
          >
            {v}
          </span>
        ))}
    </>
  )
}

export default Viewer
