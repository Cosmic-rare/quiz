import { useState } from 'react'

function Viewer({ stage, responder, question }) {
  const [score, setScore] = useState([])

  // @ts-ignore
  window.api.onLoadScore((ss) => {
    setScore(ss)
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
