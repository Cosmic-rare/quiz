import { useState } from 'react'

function Viewer(): JSX.Element {
  const [count, setCount] = useState(0)
  // @ts-ignore
  window.api.onPong(() => {
    setCount(count + 1)
    console.log('pong!')
  })

  return (
    <>
    <p>Viewer</p>
      {count} pong
    </>
  )
}

export default Viewer
