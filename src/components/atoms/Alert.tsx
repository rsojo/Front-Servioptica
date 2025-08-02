import { Alert } from "@mui/material";
import { Message } from "../../context/MessageContext";

export const AlertAtom = (message: Message) => {
  return (
    <Alert severity={message.type} style={{ marginBottom: "10px" }}>
      {message.content}
    </Alert>
  );
};
