"use client";

import { useLocalStorage } from "@/hooks/useStorage";
import Header from "@/stories/Header";
import { debounce, getRefValue } from "@/utils/helpers";
import { checkedLocalStorage } from "@/utils/storage";
import { customAlphabet } from "nanoid";
import { useRouter } from "next/navigation";
import { ChangeEvent, useMemo, useRef } from "react";

const WritePage = () => {
  const router = useRouter();
  const titleInputRef = useRef<HTMLInputElement>(null);
  const contentTextAreaRef = useRef<HTMLTextAreaElement>(null);

  const [id, date] = useMemo(() => {
    let newId = customAlphabet("1234567890abcdefghijklmn", 7)();

    const priorData = checkedLocalStorage.getItem("memo", {});

    while (priorData && newId in priorData) {
      newId = customAlphabet("1234567890abcdefghijklmn", 7)();
    }

    return [newId, new Date()];
  }, []);

  const [value, setValue] = useLocalStorage(id, {
    id: id,
    date,
    title: "",
    content: "",
  });

  const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue({
      ...value,
      content: e.target.value,
    });
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      title: e.target.value,
    });
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
      <main className="flex flex-col grow pt-[8px] pb-[16px] px-[24px]">
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
