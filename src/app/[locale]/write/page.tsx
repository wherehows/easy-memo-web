"use client";

import { useStorage } from "@/hooks/useStorage";
import Header from "@/stories/Header";
import { debounce } from "@/utils/helpers";
import { checkedLocalStorage } from "@/utils/storage";
import { customAlphabet } from "nanoid";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import toast from "react-hot-toast";

const WritePage = () => {
  const t = useTranslations();

  const router = useRouter();
  const titleInputRef = useRef<HTMLInputElement>(null);
  const contentTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const [currentMemo, setCurrentMemo] = useState(() => {
    const currentMemo = {
      id: getId(),
      date: new Date(),
      title: "",
      content: "",
    };

    checkedLocalStorage.setItem("memo", [
      ...checkedLocalStorage.getItem("memo", []),
      currentMemo,
    ]);

    return currentMemo;
  });

  const [memoList, setMemoList] = useStorage("memo", [], "localStorage");

  const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const priorMemoList = memoList.slice(0, -1);

    const newMemoState = {
      ...currentMemo,
      content: e.target.value,
    };

    setCurrentMemo(newMemoState);
    setMemoList([...priorMemoList, newMemoState]);
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const priorMemoList = memoList.slice(0, -1);

    const newMemoState = {
      ...currentMemo,
      title: e.target.value,
    };

    setCurrentMemo(newMemoState);
    setMemoList([...priorMemoList, newMemoState]);
  };

  return (
    <>
      <Header>
        <Header.LeftOption
          option={{
            back: {
              onClick: () => {
                router.replace("/");
              },
            },
          }}
        />
        <Header.RightOption
          option={{
            share: {
              onClick: () => {},
            },
            save: {
              onClick: () => {
                const priorMemoList = memoList.slice(0, -1);
                setMemoList([...priorMemoList, currentMemo]);
                toast(t("toast.save"), {
                  duration: 2000,
                  ariaProps: {
                    role: "status",
                    "aria-live": "polite",
                  },
                });
              },
            },
          }}
        />
      </Header>
      <main className="main">
        <div className="flex flex-col">
          <label htmlFor="title">{t("write.title")}</label>
          <input
            id="title"
            type="text"
            ref={titleInputRef}
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
            className="h-[100%] text-black resize-none p-[8px]"
            onChange={debounce(handleChangeContent, 500)}
          />
        </div>
      </main>
    </>
  );
};

export default dynamic(() => Promise.resolve(WritePage), { ssr: false });

const getId = () => {
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
