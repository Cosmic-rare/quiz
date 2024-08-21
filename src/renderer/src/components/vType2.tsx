import { useState } from 'react'

function Viewer({ stage, responder, question2, question, penalty }) {
  const colors = ["red", "blue", "orange", "green"]
  const [questionStatus, setQuestionStatue] = useState<any>([])
  const [responderStatus, setResponderStatus] = useState<any>([])

  // @ts-ignore
  window.api.onSetQuestionStatus((q) => {
    setQuestionStatue(q)
  })

  // @ts-ignore
  window.api.onSetResponderStatus((q) => {
    setResponderStatus(q)
  })

  return (
    <>
      <div style={{ display: "grid", "gridTemplateColumns": "repeat(4, 1fr)", gridTemplateRows: "repeat(15, 1fr)", gap: 0, height: "100vh", width: "100vw" }}>
        <div style={{ gridColumn: "1 / 5", paddingLeft: "5%", paddingRight: "5%", fontSize: "1.25rem", display: "flex", alignItems: "center" }}>
          2stステージ{"  "}うんたらかんたら
        </div>
        <div style={{ gridColumn: "1 / 5", gridRow: "2 / 5", paddingLeft: "5%", paddingRight: "5%", fontSize: "1.15rem", paddingTop: 10 }}>
          問題: {question ? question : " "}
        </div>
        <div style={{ gridRow: "5 / 10", gridColumn: "1 / 2", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.75rem" }}>
          {responder[0].split(",")[0]}
          {responder[0].split(",")[1]}
          {responder[0].split(",")[2]}
          {responderStatus[0]}抜け
          {penalty[0]}
        </div>
        <div style={{ gridRow: "10 / 16", gridColumn: "1 / 2", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.75rem" }}>
          {responder[1].split(",")[0]}
          {responder[1].split(",")[1]}
          {responder[1].split(",")[2]}
          {responderStatus[1]}抜け
          {penalty[1]}
        </div>
        <div style={{ gridRow: "5 / 10", gridColumn: "4 / 5", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.75rem" }}>
          {responder[2].split(",")[0]}
          {responder[2].split(",")[1]}
          {responder[2].split(",")[2]}
          {responderStatus[2]}抜け
          {penalty[2]}
        </div>
        <div style={{ gridRow: "10 / 16", gridColumn: "4 / 5", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.75rem" }}>
          {responder[3].split(",")[0]}
          {responder[3].split(",")[1]}
          {responder[3].split(",")[2]}
          {responderStatus[3]}抜け
          {penalty[3]}
        </div>
        <div style={{ gridRow: "5 / 16", gridColumn: "2 / 4", display: "flex", flexWrap: "wrap", alignContent: "flex-start", justifyContent: "flex-start", paddingLeft: "10%", paddingRight: "10%" }}>
          {question2?.split("").map((v, i) => {
            return (
              <>
                {i % 8 == 0 && i != 0 ? <br /> : null}

                <div
                  key={i}
                  style={{
                    border: `2px solid ${questionStatus[i] != null ? colors[questionStatus[i]] : "transparent"}`,
                    backgroundColor: questionStatus[i] == null ? "blue" : "transparent",
                    color: questionStatus[i] == null ? "transparent" : "black",
                    margin: 2,
                    fontSize: "2rem",
                    width: 42,
                    height: 42,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  {v}
                </div>
              </>
            )
          }

          )}
        </div>
      </div>
    </>
  )
}

export default Viewer
