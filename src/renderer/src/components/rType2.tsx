function Responder({score ,stage}): JSX.Element {
  return (
    <>
    <p>第{stage}ステージ</p>
    {[...score].reverse().map((v, i) => (
      <code key={i}>{v}{' '}</code>
    ))}
    </>
  )
}

export default Responder
