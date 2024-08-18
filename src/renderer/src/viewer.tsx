import { useState } from 'react'
import VType1 from "./components/vType1"
import VType2 from "./components/vType2"

function Viewer() {
  const [stage, setStage] = useState(0)
  const [responder, setResponder] = useState([])
  const [question, setQuestion] = useState("")

  // @ts-ignore
  window.api.onSetStage((s, r) => {
    setStage(s)
    setResponder(r)
  })

  // @ts-ignore
  window.api.onSetQuestion((q) => {
    setQuestion(q)
  })

  if (stage==0) {
    return (<>準備中</>)
  }

  if (stage==1 || stage==3) {
    return <VType1 responder={responder} stage={stage} question={question} />
  }

  if (stage==2) {
    return <VType2 responder={responder} stage={stage} question={question} />
  }
}

export default Viewer
