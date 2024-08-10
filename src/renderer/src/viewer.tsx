import { useState } from 'react'

function Viewer(): JSX.Element {
  const [stage, setStage] = useState(0)
  // @ts-ignore
  window.api.onSetStage((s) => {
    setStage(s)
  })

  return (
    <>
    <p>Viewer</p>
    <code>{stage}</code>
    </>
  )
}

export default Viewer
