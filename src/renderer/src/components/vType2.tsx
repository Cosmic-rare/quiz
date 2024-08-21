import { useState } from 'react'

const Dots = ({ c }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      {[...Array(3)].map((_, i) => (
        <div key={i} style={{ borderRadius: "50%", width: 15, height: 15, border: `2px solid ${i < c ? "red" : "black"}`, marginLeft: 2, marginRight: 2 }} />
      ))}
    </div>
  )
}

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
        <div style={{ gridRow: "5 / 10", gridColumn: "1 / 2", display: "flex", justifyContent: "flex-start", alignItems: "flex-end", fontSize: "1.75rem", flexDirection: "column", paddingLeft: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", width: "80%" }}>
            <p>{responder[0].split(",")[0]}</p>
            <Dots c={penalty[0]} />
          </div>
          <div style={{ fontSize: "2.2rem" }}>
            {responderStatus[0] != 0 ? `${responderStatus[0]}位` : null}
          </div>
          <div style={{ fontSize: `${responderStatus[0] != 0 ? `1.5rem` : "1.75rem"}` }}>
            {responder[0].split(",")[1]}
            ・
            {responder[0].split(",")[2]}
          </div>
        </div>
        <div style={{ gridRow: "10 / 16", gridColumn: "1 / 2", display: "flex", justifyContent: "flex-start", alignItems: "flex-end", fontSize: "1.75rem", flexDirection: "column", paddingLeft: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", width: "80%" }}>
            <p>{responder[1].split(",")[0]}</p>
            <Dots c={penalty[1]} />
          </div>
          <div style={{ fontSize: "2.2rem" }}>
            {responderStatus[1] != 0 ? `${responderStatus[1]}位` : null}
          </div>
          <div style={{ fontSize: `${responderStatus[1] != 0 ? `1.5rem` : "1.75rem"}` }}>
            {responder[1].split(",")[1]}
            ・
            {responder[1].split(",")[2]}
          </div>
        </div>
        <div style={{ gridRow: "5 / 10", gridColumn: "4 / 5", display: "flex", justifyContent: "flex-start", alignItems: "flex-start", fontSize: "1.75rem", flexDirection: "column", paddingLeft: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", width: "80%" }}>
            <p>{responder[2].split(",")[0]}</p>
            <Dots c={penalty[2]} />
          </div>
          <div style={{ fontSize: "2.2rem" }}>
            {responderStatus[2] != 0 ? `${responderStatus[2]}位` : null}
          </div>
          <div style={{ fontSize: `${responderStatus[2] != 0 ? `1.5rem` : "1.75rem"}` }}>
            {responder[2].split(",")[1]}
            ・
            {responder[2].split(",")[2]}
          </div>
        </div>
        <div style={{ gridRow: "10 / 16", gridColumn: "4 / 5", display: "flex", justifyContent: "flex-start", alignItems: "flex-start", fontSize: "1.75rem", flexDirection: "column", paddingLeft: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", width: "80%" }}>
            <p>{responder[3].split(",")[0]}</p>
            <Dots c={penalty[3]} />
          </div>
          <div style={{ fontSize: "2.2rem" }}>
            {responderStatus[3] != 0 ? `${responderStatus[3]}位` : null}
          </div>
          <div style={{ fontSize: `${responderStatus[3] != 0 ? `1.5rem` : "1.75rem"}` }}>
            {responder[3].split(",")[1]}
            ・
            {responder[3].split(",")[2]}
          </div>
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
                    backgroundColor: questionStatus[i] == null ? "#DDDDDD" : "transparent",
                    fontSize: questionStatus[i] == null ? "1.25rem" : "2rem",
                    margin: 2,
                    width: 42,
                    height: 42,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  {questionStatus[i] == null ? i + 1 : v}
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
