import { useState } from 'react'
import colors from "../color"

function Viewer({ responder }) {
  const [score, setScore] = useState([])

  // @ts-ignore
  window.api.onLoadScore((ss) => {
    setScore(ss)
  })

  return (
    <>
      <div style={{ backgroundColor: "black", display: "grid", "gridTemplateColumns": "repeat(6, 1fr)", gridTemplateRows: "repeat(15, 1fr)", gap: 0, height: "100vh", width: "100vw" }}>
        <div style={{ background: "black", color: "white", gridColumn: "1 / 7", paddingLeft: "5%", paddingRight: "5%", fontSize: "2rem", display: "flex", alignItems: "center" }}>
          1stステージ{"  "}「チームで生き残れ！択一サバイバル」
        </div>
        {responder.map((v, i) => {
          return (
            <div style={{ gridRow: "3 / 5", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "3.5rem" }} key={i}>
            <p style={{ backgroundColor: "black", color: "white" }}>
            {v.split(",")[0]}
            </p>
            </div>
          )
        })}
        {score.map((v, i) => {
          return (
            <div style={{ gridRow: "5 / 8", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "5rem" }} key={i}>
              <div style={{ height: "80%", aspectRatio: "1/1", borderRadius: "50%", border: `5px solid ${v == 0 ? colors[1] : colors[0]}`, display: "flex", justifyContent: "center", alignItems: "center", }}>
              <p style={{ color: "white" }}>
              {v == 0 ? "out" : v}
              </p>
              </div>
            </div>
          )
        })}
        {responder.map((v, i) => {
          return (
            <div style={{ gridRow: "8 / 14", display: "flex", justifyContent: "flex-start", alignItems: "center", fontSize: "2.5rem", writingMode: "vertical-rl", paddingTop: 50 }} key={i}>
              <p style={{ backgroundColor: "black", color: "white" }}>
                {v.split(",")[1]}・{v.split(",")[2]}
              </p>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Viewer
