import { useState } from 'react'
import { teamColor } from "../color"

const Dots = ({ c }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      {[...Array(3)].map((_, i) => (
        <div key={i} style={{ borderRadius: "50%", width: 26, height: 26, border: `2px solid ${i < c ? "red" : "#AAA"}`, backgroundColor: i < c ? "red" : "transparent", marginLeft: 2, marginRight: 2 }} />
      ))}
    </div>
  )
}

const ItemLeft = ({ responder, penalty, responderStatus, i, row, column, isLeft }) => {
  return (
    <div style={{
      gridRow: row,
      gridColumn: column,
      display: "flex",
      justifyContent: "flex-start",
      alignItems: isLeft ? "flex-end" : "flex-start",
      fontSize: "1.75rem",
      flexDirection: "column",
      backgroundColor: "black",
      color: "white",
      border: `10px solid ${teamColor[i]}`,
      borderRadius: 20,
      marginLeft: isLeft ? 30 : 0,
      paddingRight: isLeft ? 30 : 0,
      marginRight: !isLeft ? 30 : 0,
      paddingLeft: !isLeft ? 30 : 0,
      marginTop: 10,
      marginBottom: 10
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", width: "80%" }}>
        <p style={{ fontSize: "2.6rem" }}>{responder[i].split(",")[0]}</p>
        <Dots c={penalty[i]} />
      </div>
      <div style={{ fontSize: "4.25rem" }}>
        {responderStatus[i] != 0 ? `${responderStatus[i]}位` : null}
      </div>
      <div style={{ fontSize: `${responderStatus[i] != 0 ? `3rem` : "3.4rem"}` }}>
        {responder[i].split(",")[1]}
        ・
        {responder[i].split(",")[2]}
      </div>
    </div>
  )
}

function Viewer({ responder, question2, question, penalty }) {
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
      <div style={{ backgroundColor: "black", display: "grid", "gridTemplateColumns": "repeat(4, 1fr)", gridTemplateRows: "repeat(15, 1fr)", gap: 0, height: "100vh", width: "100vw" }}>
        <div style={{ backgroundColor: "black", color: "white", gridColumn: "1 / 5", paddingLeft: "5%", paddingRight: "5%", fontSize: "2rem", display: "flex", alignItems: "center" }}>
          2ndステージ{"  "}「パネルをめくって答えを導け！早押しMONDO」
        </div>
        <div style={{ backgroundColor: "black", color: "white", gridColumn: "1 / 5", gridRow: "2 / 5", paddingLeft: "5%", paddingRight: "5%", fontSize: "2.5rem", paddingTop: 10 }}>
          問題: {question ? question : " "}
        </div>
        <ItemLeft responder={responder} responderStatus={responderStatus} penalty={penalty} i={0} row="5 / 10" column="1 / 2" isLeft={true} />
        <ItemLeft responder={responder} responderStatus={responderStatus} penalty={penalty} i={1} row="10 / 15" column="1 / 2" isLeft={true} />
        <ItemLeft responder={responder} responderStatus={responderStatus} penalty={penalty} i={2} row="5 / 10" column="4 / 5" isLeft={false} />
        <ItemLeft responder={responder} responderStatus={responderStatus} penalty={penalty} i={3} row="10 / 15" column="4 / 5" isLeft={false} />

        <div style={{ gridRow: "5 / 16", gridColumn: "2 / 4", display: "flex", flexWrap: "wrap", alignContent: "flex-start", justifyContent: "flex-start", paddingLeft: "10%", paddingRight: "10%" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignContent: "flex-start", justifyContent: "flex-start" }}>
            {question2?.split("").map((v, i) => {
              return (
                <>
                  {i % 8 == 0 && i != 0 ? <br /> : null}

                  <div
                    key={i}
                    style={{
                      border: `5px solid ${questionStatus[i] != null ? teamColor[questionStatus[i]] : "black"}`,
                      backgroundColor: questionStatus[i] == null ? "#DDDDDD" : "#FFF",
                      fontSize: questionStatus[i] == null ? "1.5rem" : "2.75rem",
                      margin: 2,
                      width: 74,
                      height: 74,
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
      </div>
    </>
  )
}

export default Viewer
