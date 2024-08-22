import { useState } from 'react'
import colors from "../color"

const Dots = ({ c }) => {
  return (
    <div style={{ backgroundColor: "black", display: "flex", flexDirection: "column-reverse", justifyContent: "flex-end", alignItems: "flex-end", border: "10px solid black" }}>
      {[...Array(7)].map((_, i) => (
        <div key={i} style={{ borderRadius: "50%", width: 25, height: 25, border: `2px solid ${i < c ? colors[2] : "#AAA"}`, backgroundColor: i < c ? colors[2] : "transparent", marginBottom: 6 }} />
      ))}
    </div>
  )
}

function Viewer({ responder, question }) {
  const [score, setScore] = useState([])

  // @ts-ignore
  window.api.onLoadScore((ss) => {
    setScore(ss)
  })

  return (
    <>
      <div style={{ backgroundColor: "#00FF00", display: "grid", "gridTemplateColumns": "repeat(5, 1fr)", gridTemplateRows: "repeat(15, 1fr)", gap: 0, height: "100vh", width: "100vw" }}>
        <div style={{ backgroundColor: "black", color: "white", gridColumn: "1 / 6", paddingLeft: "5%", paddingRight: "5%", fontSize: "1.25rem", display: "flex", alignItems: "center" }}>
          3rdステージ{"  "}<span style={{ fontStyle: "italic", marginLeft: 20 }}>FINALだけ良い名称が思いつかない…</span>
        </div>
        <div style={{ backgroundColor: "black", color: "white", gridColumn: "1 / 6", gridRow: "2 / 5", paddingLeft: "5%", paddingRight: "5%", fontSize: "1.15rem", paddingTop: 10 }}>
          問題: {question ? question : " "}
        </div>

        <div style={{ gridColumn: "1 / 2", gridRow: "6 / 16", display: "flex", flexDirection: "column-reverse", justifyContent: "flex-end", alignItems: "flex-end", marginTop: 0 }}>
          <Dots c={score[0]} />
        </div>
        <div style={{ gridColumn: "5 / 6", gridRow: "6 / 16", display: "flex", flexDirection: "column-reverse", justifyContent: "flex-end", alignItems: "flex-start", marginTop: 0 }}>
          <Dots c={score[1]} />
        </div>

        <div style={{ gridColumn: "2 / 3", gridRow: "5 / 6", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.75rem" }}>
          <p style={{ backgroundColor: "black", color: "white", border: "15px solid black" }}>
            {responder[0].split(",")[0]}
          </p>
        </div>
        <div style={{ gridColumn: "2 / 3", gridRow: "6 / 9", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.95rem" }}>
          <div style={{ height: "95%", aspectRatio: "1/1", borderRadius: "50%", border: `5px solid ${colors[3]}`, display: "flex", justifyContent: "center", alignItems: "center", }}>
            <p style={{ background: "black", color: "white", border: "15px solid black" }}>
              {score[0] >= 7 ? "win" : score[0]}
            </p>
          </div>
        </div>
        <div style={{ gridColumn: "2 / 3", gridRow: "9 / 15", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.5rem", writingMode: "vertical-rl" }}>
          <p style={{ backgroundColor: "black", color: "white", border: "15px solid black", height: "80%", textAlign: "center" }}>
            {responder[0].split(",")[1]}
            ・
            {responder[0].split(",")[2]}
          </p>
        </div>

        <div style={{ gridColumn: "4 / 5", gridRow: "5 / 6", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.75rem" }}>
          <p style={{ backgroundColor: "black", color: "white", border: "15px solid black" }}>
            {responder[1].split(",")[0]}
          </p>
        </div>
        <div style={{ gridColumn: "4 / 5", gridRow: "6 / 9", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.95rem" }}>
          <div style={{ height: "95%", aspectRatio: "1/1", borderRadius: "50%", border: `5px solid ${colors[3]}`, display: "flex", justifyContent: "center", alignItems: "center", }}>
            <p style={{ background: "black", color: "white", border: "15px solid black" }}>
              {score[1] >= 7 ? "win" : score[1]}
            </p>
          </div>
        </div>
        <div style={{ gridColumn: "4 / 5", gridRow: "9 / 15", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.5rem", writingMode: "vertical-rl" }}>
          <p style={{ backgroundColor: "black", color: "white", border: "15px solid black", height: "80%", textAlign: "center" }}>
            {responder[1].split(",")[1]}
            ・
            {responder[1].split(",")[2]}
          </p>
        </div>
      </div>
    </>
  )
}

export default Viewer
