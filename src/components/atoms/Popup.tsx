import { Message, MessageContextType } from "../../context/MessageContext";

export const PopupAtom = ({
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
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px",
        border: "1px solid black",
      }}
    >
      <h2>{message.content}</h2>
      <button onClick={() => messageContext?.clearMessages()}>Close</button>
    </div>
  );
};
