import { useState } from 'react'

function Responder(): JSX.Element {
  const [count, setCount] = useState(0)
  // @ts-ignore
  window.api.onPong(() => {
    setCount(count + 1)
    console.log('pong!')
  })

  return (
    <>
    <p>Responder</p>
      {count} pong
    </>
  )
}

export default Responder
