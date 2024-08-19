import { useState } from 'react'

function Viewer({ stage, responder, question }) {
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
      <code>{JSON.stringify(responderStatus)}</code>
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
