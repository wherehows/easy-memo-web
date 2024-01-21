"use client";

import { useStorage } from "@/hooks/useStorage";
import Header from "@/components/Header";
import MemoItem, { MemoItemProps } from "@/components/MemoItem";
import { classNames, formatTimeDifference, getRefValue } from "@/utils/helpers";
import { LOCALES } from "@/utils/navigation";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

type IsRemoveMapType = { [id: string]: boolean };

const MainPage = () => {
  const t = useTranslations();
  const { locale } = useParams();

  const memoListRef = useRef<HTMLUListElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAllMemoSelected, setIsAllMemoSelected] = useState(false);

  const [memoList, setMemoList] = useStorage<MemoItemProps[]>(
    "memo",
    [],
    "localStorage"
  );
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

  return (
    <>
      <Header>
        <Header.LeftOption
          option={
            isEditing
              ? {
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
                }
              : {}
          }
        />
        <Header.RightOption
          option={
            isEditing
              ? {
                  remove: {
                    disabled:
                      getNewMemoList(isRemoveMap, memoList).length ===
                      memoList.length,
                    onClick: () => {
                      const newMemoList = getNewMemoList(isRemoveMap, memoList);
                      const count = memoList.length - newMemoList.length;

                      if (confirm(t("dialog.remove", { count }))) {
                        setMemoList(newMemoList);
                        setIsEditing(false);
                        toast(t("toast.remove"), {
                          duration: 3000,
                          ariaProps: {
                            role: "status",
                            "aria-live": "polite",
                          },
                        });
                      }
                    },
                  },
                }
              : {
                  edit: {
                    disabled: !sortedMemoList.length,
                    onClick: () => {
                      setIsEditing(true);
                    },
                  },
                  write: true,
                }
          }
        />
      </Header>
      <main className="main">
        {isEditing && (
          <div className="flex items-center mb-2">
            <input
              id="select-all-checkbox"
              type="checkbox"
              className="mr-[16px] w-4 h-4"
              checked={isAllMemoSelected}
              onChange={() => {
                const newState: IsRemoveMapType = {};

                for (const key in isRemoveMap) {
                  newState[key] = !isAllMemoSelected;
                }

                setIsAllMemoSelected(!isAllMemoSelected);
                setIsRemoveMap(newState);
              }}
            />
            <label htmlFor="select-all-checkbox">
              {t("mainPage.select-all")}
            </label>
          </div>
        )}
        {sortedMemoList.length ? (
          <ul ref={memoListRef} className="flex flex-col gap-[16px]">
            {sortedMemoList.map(
              ({ id, title, date, content }: MemoItemProps) => {
                const titleToShow =
                  title || content.substring(0, 20) || t("except.no-title");

                const dateToShow = formatTimeDifference(
                  new Date(date),
                  locale as (typeof LOCALES)[number]
                );

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
                          onChange={() => {
                            const newState = {
                              ...isRemoveMap,
                              [id]: !isRemoveMap[id],
                            };

                            getNewMemoList(newState, memoList).length === 0
                              ? setIsAllMemoSelected(true)
                              : setIsAllMemoSelected(false);

                            setIsRemoveMap(newState);
                          }}
                        />
                        <label
                          htmlFor={`${id}-checkbox`}
                          className="flex flex-col grow"
                        >
                          {titleToShow}
                          <time className="text-sm text-gray-400">
                            {dateToShow}
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

export default dynamic(() => Promise.resolve(MainPage), { ssr: false });

const getNewMemoList = (
  isRemoveMap: IsRemoveMapType,
  memoList: MemoItemProps[]
) =>
  memoList.filter((memo) => {
    return isRemoveMap[memo.id] ? false : true;
  });
