import { useState } from 'react'

function Viewer({ responder }) {
  const [score, setScore] = useState([])

  // @ts-ignore
  window.api.onLoadScore((ss) => {
    setScore(ss)
  })

  return (
    <>
      <div style={{ display: "grid", "gridTemplateColumns": "repeat(6, 1fr)", gridTemplateRows: "repeat(15, 1fr)", gap: 0, height: "100vh", width: "100vw" }}>
        <div style={{ gridColumn: "1 / 7", paddingLeft: "5%", paddingRight: "5%", fontSize: "1.25rem", display: "flex", alignItems: "center" }}>
          1stステージ{"  "}うんたらかんたら
        </div>
        {responder.map((v, i) => {
          return (
            <div style={{ gridRow: "3 / 5", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.75rem" }} key={i}>
              {v.split(",")[0]}
            </div>
          )
        })}
        {score.map((v, i) => {
          return (
            <div style={{ gridRow: "5 / 8", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.85rem" }} key={i}>
              {v == 0 ? "out" : v}
            </div>
          )
        })}
        {responder.map((v, i) => {
          return (
            <div style={{ gridRow: "8 / 14", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.5rem", writingMode: "vertical-rl" }} key={i}>
              {v.split(",")[1]}・{v.split(",")[2]}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Viewer
