"use client";

import { useLocalStorage } from "@/hooks/useStorage";
import Header from "@/stories/Header";
import MemoItem, { MemoItemProps } from "@/stories/MemoItem";
import { classNames, formatTimeDifference, getRefValue } from "@/utils/helpers";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

type MemoIdObject = { [id: number]: boolean };

const HomePage = () => {
  const memoListRef = useRef<HTMLUListElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [memoList, setMemoList] = useLocalStorage<MemoItemProps[]>("memo", []);

  const [isRemoveMap, setIsRemoveMap] = useState<MemoIdObject>(
    memoList.reduce((acc: MemoIdObject, memo: MemoItemProps) => {
      acc[memo.id] = false;
      return acc;
    }, {} as MemoIdObject)
  );

  useEffect(() => {
    if (isEditing) {
      const { firstChild } = getRefValue(memoListRef);

      if (firstChild instanceof Element) {
        firstChild.querySelector("input")?.focus();
      }
    }
  }, [isEditing]);

  return (
    <>
      <Header>
        {isEditing ? (
          <Header.LeftOption
            option={{
              close: {
                onClick: () => {
                  setIsEditing(false);
                },
              },
            }}
          />
        ) : (
          <Header.LeftOption empty />
        )}
        {isEditing ? (
          <Header.RightOption
            option={{
              allSelection: {
                onClick: () => {
                  const newState: {
                    [id: number]: boolean;
                  } = {};

                  for (const key in isRemoveMap) {
                    newState[key] = true;
                  }

                  setIsRemoveMap(newState);
                },
              },
              remove: {
                onClick: () => {
                  const newMemoList = [...memoList].filter((memo) => {
                    return isRemoveMap[memo.id] ? false : true;
                  });

                  setMemoList(newMemoList);
                  setIsEditing(false);
                },
              },
            }}
          />
        ) : (
          <Header.RightOption
            option={{
              edit: {
                disabled: !memoList.length,
                onClick: () => {
                  setIsEditing(true);
                },
              },
              write: true,
            }}
          />
        )}
      </Header>
      <main className="main">
        {memoList.length ? (
          <ul
            ref={memoListRef}
            className="flex flex-col gap-[16px] pt-[8px] pb-[16px] px-[24px]"
          >
            {memoList.map(({ id, title, date, content }: MemoItemProps) => {
              const titleToShow =
                title || content.substring(0, 20) || "제목이 없습니다";

              const dateToShow = formatTimeDifference(new Date(date));

              return (
                <li
                  key={id}
                  className={classNames(isEditing ? "flex flex-row" : "")}
                >
                  {isEditing ? (
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-[16px] w-4 h-4"
                        checked={isRemoveMap[id] || false}
                        onChange={() =>
                          setIsRemoveMap({
                            ...isRemoveMap,
                            [id]: !isRemoveMap[id],
                          })
                        }
                      />
                      <label className="flex flex-col">
                        {titleToShow}
                        <time className="text-sm text-gray-400">
                          {dateToShow}에 작성됨
                        </time>
                      </label>
                    </div>
                  ) : (
                    <MemoItem
                      id={id}
                      date={dateToShow}
                      title={titleToShow}
                      content={content}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="grow center text-gray-400">
            작성된 메모가 없습니다. 메모를 작성해주세요
          </div>
        )}
      </main>
    </>
  );
};

export default dynamic(() => Promise.resolve(HomePage), { ssr: false });
