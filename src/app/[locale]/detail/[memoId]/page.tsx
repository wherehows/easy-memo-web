"use client";

import { useLocalStorage } from "@/hooks/useStorage";
import Header from "@/stories/Header";
import { MemoItemProps } from "@/stories/MemoItem";
import { debounce } from "@/utils/helpers";
import { checkedLocalStorage } from "@/utils/storage";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { notFound, useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";

interface DetailPageProps {
  params: { memoId: string };
}

const DetailPage = ({ params: { memoId } }: DetailPageProps) => {
  const t = useTranslations();

  const router = useRouter();
  const titleInputRef = useRef<HTMLInputElement>(null);
  const contentTextAreaRef = useRef<HTMLTextAreaElement>(null);

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

  const [memoList, setMemoList] = useLocalStorage("memo", []);

  if (!currentMemo) {
    return notFound();
  }

  const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const oldMemoList = memoList.slice(0, -1);

    const newMemoState = {
      ...currentMemo,
      content: e.target.value,
    };

    setCurrentMemo(newMemoState);
    setMemoList([...oldMemoList, newMemoState]);
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const oldMemoList = memoList.slice(0, -1);

    const newMemoState = {
      ...currentMemo,
      title: e.target.value,
    };

    setCurrentMemo(newMemoState);
    setMemoList([...oldMemoList, newMemoState]);
  };

  const { title, content } = currentMemo;
  return (
    <>
      <Header>
        <Header.LeftOption
          option={{
            back: {
              onClick: () => {
                router.back();
              },
            },
          }}
        />
        <Header.RightOption
          option={{
            save: {
              onClick: () => {},
            },
          }}
        />
      </Header>
      <main className="main pt-[8px] pb-[16px] px-[8px]">
        <div className="flex flex-col">
          <label htmlFor="title">{t("write.title")}</label>
          <input
            id="title"
            type="text"
            ref={titleInputRef}
            defaultValue={title}
            maxLength={50}
            className="text-black p-[8px] mb-[16px]"
            onChange={debounce(handleChangeTitle, 500)}
          />
        </div>
        <div className="flex flex-col grow">
          <label htmlFor="content">{t("write.content")}</label>
          <textarea
            id="content"
            ref={contentTextAreaRef}
            maxLength={2000}
            defaultValue={content}
            className="h-[100%] text-black resize-none p-[8px]"
            onChange={debounce(handleChangeContent, 500)}
          />
        </div>
      </main>
    </>
  );
};

export default dynamic(() => Promise.resolve(DetailPage), { ssr: false });
