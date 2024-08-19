import { useState } from 'react'

function Viewer({ stage, responder, question2, question, penalty }) {
  const colors = ["red", "blue", "orange", "green"]
  const [questionStatus, setQuestionStatue] = useState<any>([])
  const [responderStatus, setResponderStatus] = useState<any>([])

  // @ts-ignore
  window.api.onSetQuestionStatus((q) => {
    setQuestionStatue(q)
  })

  // @ts-ignore
  window.api.onSetResponderStatus((q) => {
    setResponderStatus(q)
  })

  return (
    <>
      <code>{stage}ステージ</code>
      <hr />
      <code>{JSON.stringify(responder)}</code>
      <hr />
      <code>{JSON.stringify(responderStatus)}</code>
      <hr />
      <code>{question}</code>
      <hr />
      <code>{JSON.stringify(penalty)}</code>
      <hr />
      {question2?.split("").map((v, i) => (
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
