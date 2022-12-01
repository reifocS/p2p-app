import Peer from "peerjs";
import { useEffect, useState } from "react";

export default function usePeerConnection() {
  const [state, setState] = useState({
    peer: undefined,
    id: undefined,
    conn: undefined,
    connected: false,
    msg: undefined,
    joining: true,
  });

  function send(msg) {
    state.conn.send(msg);
  }

  function connect(dest) {
    console.log(`connecting to ${dest}`);
    const con = state.peer.connect(dest);
    con.on("data", (data) => console.log(data));
    initConn(con);
  }

  function initConn(conn) {
    setState((prev) => ({
      ...prev,
      conn,
      joining: false,
      connected: true,
    }));
  }
  useEffect(() => {
    const peer = new Peer();
    setState((prev) => ({
      ...prev,
      peer,
    }));
    peer.on("open", (id) => setState((prev) => ({ ...prev, id })));
    peer.on("connection", (conn) => {
      console.log(`connected`);
      initConn(conn);
      conn.on("data", (data) => console.log(data));
    });
    return () => {
      console.log("destroy peer");
      peer.destroy();
    };
  }, []);

  return { state, setState, connect, send };
}
