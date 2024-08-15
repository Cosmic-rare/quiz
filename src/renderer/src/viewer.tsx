import { useState } from 'react'

function Viewer(): JSX.Element {
  const [stage, setStage] = useState(0)
  const [score, setScore] = useState([])
  const [responder, setResponder] = useState([])

  // @ts-ignore
  window.api.onSetStage((s, r) => {
    setStage(s)
    setResponder(r)
  })

  // @ts-ignore
  window.api.onLoadScore((ss) => {
    setScore(ss)
  })

  return (
    <>
    <code>{stage}ステージ</code>
    <hr />
    <code>{JSON.stringify(score)}</code>
    <code>{JSON.stringify(responder)}</code>
    </>
  )
}

export default Viewer
