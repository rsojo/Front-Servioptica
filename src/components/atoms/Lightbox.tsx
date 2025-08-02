import { Message, MessageContextType } from "../../context/MessageContext";

export const LightboxAtom = ({
    messageContext,
    message,
  }: {
    messageContext: MessageContextType;
    message: Message;
  }) => {
    return (
        <div
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ backgroundColor: "white", padding: "20px" }}>
              <h2>{message.content}</h2>
              <button onClick={() => messageContext?.clearMessages()}>
                Close
              </button>
            </div>
          </div>
    )
}