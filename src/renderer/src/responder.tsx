import { useState } from 'react'
import RType1 from "./components/rType1"
import RType2 from "./components/rType2"

function Responder() {
  const [stage, setStage] = useState(0)
  const [score, setScore] = useState([])
  const [question, setQuestion] = useState("")
  
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

  if (stage==0) {
    return (<>準備中</>)
  }

  if (stage==1 || stage==3) {
    return <RType1 score={[...score].reverse()} stage={stage} question={question} />
  }

  if (stage==2) {
    return <RType2 score={[...score].reverse()} stage={stage} />
  }
}

export default Responder
