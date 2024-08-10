import { useState } from 'react'

function Responder(): JSX.Element {
  const [stage, setStage] = useState(0)
  // @ts-ignore
  window.api.onSetStage((s) => {
    setStage(s)
  })

  return (
    <>
    <p>Responder</p>
    <code>{stage}</code>
    </>
  )
}

export default Responder
