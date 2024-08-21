import { useState } from 'react'
import VType1 from "./components/vType1"
import VType2 from "./components/vType2"
import VType3 from "./components/vType3"

function Viewer(): any {
  const [stage, setStage] = useState(0)
  const [responder, setResponder] = useState([])
  const [question, setQuestion] = useState("")
  const [question2, setQuestion2] = useState("")
  const [penalty, setPenalty] = useState<any>([0, 0, 0, 0])

  // @ts-ignore
  window.api.onSetStage((s, r) => {
    setStage(s)
    setResponder(r)
  })

  // @ts-ignore
  window.api.onSetQuestion((q) => {
    setQuestion(q)
  })

  // @ts-ignore
  window.api.onSetQuestion2((q) => {
    setQuestion2(q)
  })

  // @ts-ignore
  window.api.onSetPenalty((q) => {
    setPenalty(q)
  })


  if (stage == 0) {
    return (<>準備中</>)
  }

  if (stage == 1) {
    return <VType1 responder={responder} />
  }

  if (stage == 2) {
    return <VType2 responder={responder} question2={question2} question={question} penalty={penalty} />
  }

  if (stage == 3) {
    return <VType3 responder={responder} question={question} />
  }
}

export default Viewer
