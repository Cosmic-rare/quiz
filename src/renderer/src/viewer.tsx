import { useState } from 'react'

function Viewer(): JSX.Element {
  const [stage, setStage] = useState(0)
  const [score, setScore] = useState([])

  // @ts-ignore
  window.api.onSetStage((s) => {
    setStage(s)
  })

  // @ts-ignore
  window.api.onLoadScore((ss) => {
    setScore(ss)
  })

  return (
    <>
    <p>Viewer</p>
    <code>{stage}</code>
    <hr />
    <code>{JSON.stringify(score)}</code>
    </>
  )
}

export default Viewer
