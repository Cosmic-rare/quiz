function Responder({ score, stage, question }): JSX.Element {
  return (
    <>
      <p>第{stage}ステージ</p>
      <code>{question}</code>
      {[...score].reverse().map((v, i) => (
        <code key={i}>{v}{' '}</code>
      ))}
    </>
  )
}

export default Responder
