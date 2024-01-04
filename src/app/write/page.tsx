"use client";

import { useLocalStorage } from "@/hooks/useStorage";
import Header from "@/stories/Header";
import { debounce, getRefValue } from "@/utils/helpers";
import { checkedLocalStorage } from "@/utils/storage";
import { customAlphabet } from "nanoid";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";

const WritePage = () => {
  const router = useRouter();
  const titleInputRef = useRef<HTMLInputElement>(null);
  const contentTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const [newMemo, setNewMemo] = useState(() => {
    if (typeof window === undefined) {
      return undefined;
    }

    const newMemo = {
      id: getId(),
      date: new Date(),
      title: "",
      content: "",
    };

    checkedLocalStorage.setItem("memo", [
      ...checkedLocalStorage.getItem("memo", []),
      newMemo,
    ]);

    return newMemo;
  });

  const [value, setValue] = useLocalStorage("memo", []);

  if (typeof window === "undefined" || !newMemo) {
    return <></>;
  }

  const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const priorValue = value.slice(0, -1);

    const newMemoState = {
      ...newMemo,
      content: e.target.value,
    };

    setNewMemo(newMemoState);
    setValue([...priorValue, newMemoState]);
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const priorValue = value.slice(0, -1);

    const newMemoState = {
      ...newMemo,
      title: e.target.value,
    };

    setNewMemo(newMemoState);
    setValue([...priorValue, newMemoState]);
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
                setValue({
                  ...value,
                  title: getRefValue(titleInputRef).value,
                  content: getRefValue(contentTextAreaRef).value,
                });
              },
            },
          }}
        />
      </Header>
      <main className="main pt-[8px] pb-[16px] px-[24px">
        <div className="flex flex-col">
          <label htmlFor="title">제목</label>
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
          <label htmlFor="content">내용</label>
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

export default WritePage;

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
