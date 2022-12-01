import "./App.css";
import usePeerConnection from "../hooks/usePeerConnection";
import { useState } from "react";
function App() {
  const { state, connect, send } = usePeerConnection();
  const [dest, setDest] = useState("");

  function handleSend(e) {
    e.preventDefault();
    send(e.target.msg.value);
    e.target.reset();
  }

  return (
    <>
      <h3>My peer ID is: {state.id}</h3>

      {state.joining && (
        <div>
          <p>Try joining by adding dest id</p>
          <input
            value={state.dest}
            onChange={({ target }) => setDest(target.value)}
          />
          <button disabled={!dest} onClick={() => connect(dest)}>
            Connect
          </button>
        </div>
      )}
      {state.connected && (
        <section>
          <p>Connection established</p>
          <div>Other: {state.conn.peer}</div>
          <form onSubmit={handleSend}>
            <input required name="msg" />
            <button>Send</button>
          </form>
        </section>
      )}
    </>
  );
}

export default App;
