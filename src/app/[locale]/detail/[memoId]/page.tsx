"use client";

import { MemoItemProps } from "@/components/MemoItem";
import { checkedLocalStorage } from "@/utils/storage";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { useState } from "react";
import WriteTemplate from "@/components/WriteTemplate";

interface DetailPageProps {
  params: { memoId: string };
}

const DetailPage = ({ params: { memoId } }: DetailPageProps) => {
  const [currentMemo, setCurrentMemo] = useState(() => {
    let currentMemo = checkedLocalStorage
      .getItem("memo", [])
      .find((memo: MemoItemProps) => String(memo.id) === memoId);

    if (!currentMemo) {
      return undefined;
    }

    checkedLocalStorage.setItem("memo", [
      ...checkedLocalStorage
        .getItem("memo", [])
        .filter((memo: MemoItemProps) => String(memo.id) !== memoId),
      currentMemo,
    ]);

    return currentMemo;
  });

  if (!currentMemo) {
    return notFound();
  }

  return (
    <WriteTemplate
      currentMemo={currentMemo}
      onWriteMemo={(newMemo) => setCurrentMemo(newMemo)}
    />
  );
};

export default dynamic(() => Promise.resolve(DetailPage), { ssr: false });
