import { useState } from 'react'

function Responder(): JSX.Element {
  const [stage, setStage] = useState(0)
  const [score, setScore] = useState([])
  
  // @ts-ignore
  window.api.onSetStage((s, _) => {
    setStage(s)
  })

  // @ts-ignore
  window.api.onLoadScore((ss) => {
    setScore(ss)
  })

  return (
    <>
    <p>第{stage}ステージ</p>
    <p>問題文</p>
    {[...score].reverse().map((v, i) => (
      <code key={i}>{v}{' '}</code>
    ))}
    </>
  )
}

export default Responder
