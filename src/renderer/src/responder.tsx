import { useState } from 'react'
import RType1 from "./components/rType1"
import RType2 from "./components/rType2"

function Responder(): any {
  const [stage, setStage] = useState(0)
  const [score, setScore] = useState([])
  const [question, setQuestion] = useState("")
  const [penalty, setPenalty] = useState<any>([0, 0, 0, 0])

  // @ts-ignore
  window.api.onSetStage((s, _) => {
    setStage(s)
  })

  // @ts-ignore
  window.api.onLoadScore((ss) => {
    setScore(ss)
  })

  // @ts-ignore
  window.api.onSetQuestion((q) => {
    setQuestion(q)
  })

  // @ts-ignore
  window.api.onSetPenalty((q) => {
    setPenalty(q)
  })

  if (stage == 0) {
    return (<>準備中</>)
  }

  if (stage == 1 || stage == 3) {
    return <RType1 score={[...score].reverse()} stage={stage} question={question} />
  }

  if (stage == 2) {
    return <RType2 stage={stage} question={question} penalty={penalty} />
  }
}

export default Responder
