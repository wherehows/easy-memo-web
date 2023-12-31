"use client";

import Header from "@/stories/Header";
import { debounce } from "@/utils/helpers";
import { ChangeEvent } from "react";

const WritePage = () => {
  const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    localStorage.setItem("1-content", e.target.value);
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem("1-title", e.target.value);
  };

  return (
    <>
      <Header>
        <Header.LeftOption option={{ back: true }} />
        <Header.RightOption option={{ share: true, save: true }} />
      </Header>
      <main className="flex flex-col grow pt-[8px] pb-[16px] px-[24px]">
        <div className="flex flex-col">
          <label htmlFor="title">제목</label>
          <input
            id="title"
            type="text"
            maxLength={50}
            className="text-black p-[8px] mb-[16px]"
            onChange={debounce(handleChangeTitle, 500)}
          />
        </div>
        <div className="flex flex-col grow">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
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
