"use client";

import { checkedLocalStorage } from "@/utils/storage";
import { customAlphabet } from "nanoid";
import dynamic from "next/dynamic";
import { useState } from "react";
import WriteTemplate from "@/components/WriteTemplate";

const WritePage = () => {
  const [currentMemo, setCurrentMemo] = useState(() => {
    const currentMemo = {
      id: generateId(),
      date: `${new Date()}`,
      title: "",
      content: "",
    };

    checkedLocalStorage.setItem("memo", [
      ...checkedLocalStorage.getItem("memo", []),
      currentMemo,
    ]);

    return currentMemo;
  });

  return (
    <WriteTemplate
      currentMemo={currentMemo}
      onWriteMemo={(newMemo) => setCurrentMemo(newMemo)}
    />
  );
};

export default dynamic(() => Promise.resolve(WritePage), { ssr: false });

const generateId = () => {
  let id = customAlphabet("1234567890abcdefghijklmn", 7)();
  let duplicated = true;

  const priorData = checkedLocalStorage.getItem("memo", []);

  while (priorData.length && duplicated) {
    for (let i = 0; i < priorData.length; i++) {
      const current = priorData[i];

      if (current.id === id) {
        id = customAlphabet("1234567890abcdefghijklmn", 7)();
        break;
      }

      if (priorData.length - 1 === i) {
        duplicated = false;
      }
    }
  }

  return id;
};
