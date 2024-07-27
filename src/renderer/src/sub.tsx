import { useState } from 'react'

function Sub(): JSX.Element {
  const [count, setCount] = useState(0)
  // @ts-ignore
  window.api.onPong(() => {
    setCount(count + 1)
    console.log('pong!')
  })

  return (
    <>
      {count} pong
    </>
  )
}

export default Sub
