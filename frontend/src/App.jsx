import ChatWindow from "./components/ChatWindow"



// function App() {
//   return (
//     <div>
//       <ChatWindow />
//     </div>
//   )
// }



function App() {
  return (
    <div
      style={{
        display: "flex",

        height: "200px",
        border: "2px solid black",
        alignItems: "center"
      }}
    >
      <div style={{ backgroundColor: "red", width: "100px"}}>
        Box 1
      </div>

      <div style={{ backgroundColor: "blue", width: "100px"}}>
        Box 2
      </div>

      <div style={{ backgroundColor: "green", width: "100px"}}>
        Box 3
      </div>
    </div>
  );
}

export default App;
