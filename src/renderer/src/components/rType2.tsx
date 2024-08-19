function Responder({ stage, question, penalty }): JSX.Element {
  return (
    <>
      <p>第{stage}ステージ</p>
      <hr />
      <code>{question}</code>
      <hr />
      <code>{JSON.stringify(penalty)}</code>
    </>
  )
}

export default Responder
