"use client";

import { useLocalStorage } from "@/hooks/useStorage";
import Header from "@/stories/Header";
import MemoItem, { MemoItemProps } from "@/stories/MemoItem";
import { classNames, formatTimeDifference, getRefValue } from "@/utils/helpers";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

type IsRemoveMapType = { [id: number]: boolean };

const HomePage = () => {
  const t = useTranslations();

  const memoListRef = useRef<HTMLUListElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [memoList, setMemoList] = useLocalStorage<MemoItemProps[]>("memo", []);
  const sortedMemoList = memoList.sort(
    (a: MemoItemProps, b: MemoItemProps) =>
      +new Date(b.date) - +new Date(a.date)
  );

  const [isRemoveMap, setIsRemoveMap] = useState<IsRemoveMapType>(
    sortedMemoList.reduce((acc: IsRemoveMapType, memo: MemoItemProps) => {
      acc[memo.id] = false;
      return acc;
    }, {} as IsRemoveMapType)
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
                  const newIsRemoveMap: IsRemoveMapType = {};

                  for (const key in isRemoveMap) {
                    newIsRemoveMap[key] = false;
                  }

                  setIsEditing(false);
                  setIsRemoveMap(newIsRemoveMap);
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
                  const newState: IsRemoveMapType = {};

                  for (const key in isRemoveMap) {
                    newState[key] = true;
                  }

                  setIsRemoveMap(newState);
                },
              },
              remove: {
                disabled:
                  getNewMemoList(isRemoveMap, memoList).length ===
                  memoList.length,
                onClick: () => {
                  const newMemoList = getNewMemoList(isRemoveMap, memoList);

                  const count = memoList.length - newMemoList.length;
                  const confirmMessage = t("dialog.remove", { count });
                  const toastMessage = t("toast.remove");

                  if (confirm(confirmMessage)) {
                    setMemoList(newMemoList);
                    setIsEditing(false);
                    toast(toastMessage, {
                      duration: 3000,
                      ariaProps: {
                        role: "status",
                        "aria-live": "polite",
                      },
                    });
                  }
                },
              },
            }}
          />
        ) : (
          <Header.RightOption
            option={{
              edit: {
                disabled: !sortedMemoList.length,
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
        {sortedMemoList.length ? (
          <ul
            ref={memoListRef}
            className="flex flex-col gap-[16px] pt-[8px] pb-[16px] px-[8px]"
          >
            {sortedMemoList.map(
              ({ id, title, date, content }: MemoItemProps) => {
                const titleToShow =
                  title || content.substring(0, 20) || "제목이 없습니다";

                const dateToShow = formatTimeDifference(new Date(date));

                return (
                  <li
                    key={id}
                    className={classNames(isEditing ? "flex flex-row" : "")}
                  >
                    {isEditing ? (
                      <div className="flex items-center grow">
                        <input
                          id={`${id}-checkbox`}
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
                        <label
                          htmlFor={`${id}-checkbox`}
                          className="flex flex-col grow"
                        >
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
              }
            )}
          </ul>
        ) : (
          <div className="grow center text-gray-400">{t("except.empty")}</div>
        )}
      </main>
    </>
  );
};

export default dynamic(() => Promise.resolve(HomePage), { ssr: false });

const getNewMemoList = (
  isRemoveMap: IsRemoveMapType,
  memoList: MemoItemProps[]
) =>
  memoList.filter((memo) => {
    return isRemoveMap[memo.id] ? false : true;
  });
