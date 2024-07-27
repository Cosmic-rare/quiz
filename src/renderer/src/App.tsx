function App(): JSX.Element {
  const ipcHandle1 = (): void => window.electron.ipcRenderer.send('createWindow')
  // @ts-ignore
  const ipcHandle2 = (): void =>  window.api.ping()

  return (
    <>
      <button onClick={ipcHandle1}>
        subwindow
      </button>
      <button onClick={ipcHandle2}>
        ping
      </button>
    </>
  )
}

export default App
