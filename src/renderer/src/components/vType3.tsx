import { useState } from 'react'

const Dots = ({ c }) => {
  return (
    <>
      {[...Array(7)].map((_, i) => (
        <div key={i} style={{ borderRadius: "50%", width: 25, height: 25, border: `2px solid ${i < c ? "red" : "black"}`, marginBottom: 6 }} />
      ))}
    </>
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
      <div style={{ display: "grid", "gridTemplateColumns": "repeat(4, 1fr)", gridTemplateRows: "repeat(15, 1fr)", gap: 0, height: "100vh", width: "100vw" }}>
        <div style={{ gridColumn: "1 / 5", paddingLeft: "5%", paddingRight: "5%", fontSize: "1.25rem", display: "flex", alignItems: "center" }}>
          3stステージ{"  "}うんたらかんたら
        </div>
        <div style={{ gridColumn: "1 / 5", gridRow: "2 / 5", paddingLeft: "5%", paddingRight: "5%", fontSize: "1.15rem", paddingTop: 10 }}>
          問題: {question ? question : " "}
        </div>

        <div style={{ gridColumn: "1 / 2", gridRow: "6 / 16", display: "flex", flexDirection: "column-reverse", justifyContent: "flex-end", alignItems: "flex-end", marginTop: 0 }}>
          <Dots c={score[0]} />
        </div>
        <div style={{ gridColumn: "4 / 5", gridRow: "6 / 16", display: "flex", flexDirection: "column-reverse", justifyContent: "flex-end", alignItems: "flex-start", marginTop: 0 }}>
          <Dots c={score[1]} />
        </div>

        <div style={{ gridColumn: "2 / 3", gridRow: "5 / 6", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.75rem" }}>
          {responder[0].split(",")[0]}
        </div>
        <div style={{ gridColumn: "2 / 3", gridRow: "6 / 9", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.85rem" }}>
          {score[0] >= 7 ? "win" : score[0]}
        </div>
        <div style={{ gridColumn: "2 / 3", gridRow: "9 / 15", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.5rem", writingMode: "vertical-rl" }}>
          {responder[0].split(",")[1]}
          ・
          {responder[0].split(",")[2]}
        </div>

        <div style={{ gridColumn: "3 / 4", gridRow: "5 / 6", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.75rem" }}>
          {responder[1].split(",")[0]}
        </div>
        <div style={{ gridColumn: "3 / 4", gridRow: "6 / 9", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.85rem" }}>
        {score[1] >= 7 ? "win" : score[1]}
        </div>
        <div style={{ gridColumn: "3 / 4", gridRow: "9 / 15", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.5rem", writingMode: "vertical-rl" }}>
          {responder[1].split(",")[1]}
          ・
          {responder[1].split(",")[2]}
        </div>
      </div>
    </>
  )
}

export default Viewer
