import { useState } from "react";
import WriteTemplate from ".";

export default {
  title: "templates/Write",
};

export const Index = {
  render: function Render() {
    const [currentMemo, setCurrentMemo] = useState({
      id: "abcd",
      date: `${new Date()}`,
      title: "",
      content: "",
    });

    return (
      <WriteTemplate
        currentMemo={currentMemo}
        onWriteMemo={(newMemo) => setCurrentMemo(newMemo)}
      />
    );
  },
};
