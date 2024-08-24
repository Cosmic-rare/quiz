function Responder({ score, stage, question }): JSX.Element {
  return (
    <>
      <p style={{ fontSize: "3.5rem", marginLeft: 30 }}>第{stage}ステージ</p>
      <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", paddingLeft: stage == 1 ? 30 : 150, paddingRight: stage == 1 ? 30 : 150 }}>
        {[...score].map((v, i) => (
          <div style={{ fontSize: "6rem" }} key={i}>{v == 0 ? "out" : v}</div>
        ))}
      </div>
      {stage == 1 ?
        null
        :
        <p style={{ fontSize: "2.75rem", paddingLeft: 30, paddingRight: 30 }}>問題: {question}</p>
      }
    </>
  )
}

export default Responder
