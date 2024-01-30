"use client";

import Header from "../Header";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { MemoItemProps } from "../MemoItem";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { formatTimeDifference } from "@/utils/helpers";
import { LOCALES } from "@/utils/navigation";

type IsRemoveMapType = { [id: string]: boolean };

interface EditModalProps {
  sortedMemoList: MemoItemProps[];
  memoList: MemoItemProps[];
  setMemoList: (value: MemoItemProps[]) => void;
}

const EditModal = ({
  sortedMemoList,
  memoList,
  setMemoList,
}: EditModalProps) => {
  const router = useRouter();
  const t = useTranslations();
  const { locale } = useParams();

  const [isAllMemoSelected, setIsAllMemoSelected] = useState(false);

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
          option={{
            close: {
              onClick: () => router.back(),
            },
          }}
        />
        <Header.RightOption
          option={{
            remove: {
              disabled:
                getNewMemoList(isRemoveMap, memoList).length ===
                memoList.length,
              onClick: () => {
                const newMemoList = getNewMemoList(isRemoveMap, memoList);
                const count = memoList.length - newMemoList.length;

                if (confirm(t("dialog.remove", { count }))) {
                  setMemoList(newMemoList);
                  router.back();
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
          }}
        />
      </Header>
      <main className="main">
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
        <ul className="flex flex-col gap-[16px]">
          {sortedMemoList.map(({ id, title, date, content }: MemoItemProps) => {
            const titleToShow =
              title || content.substring(0, 20) || t("except.no-title");

            const dateToShow = formatTimeDifference(
              new Date(date),
              locale as (typeof LOCALES)[number]
            );

            return (
              <li key={id} className="flex flex-row">
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
                    <time className="text-sm text-gray-400">{dateToShow}</time>
                  </label>
                </div>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
};

export default EditModal;

const getNewMemoList = (
  isRemoveMap: IsRemoveMapType,
  memoList: MemoItemProps[]
) =>
  memoList.filter((memo) => {
    return isRemoveMap[memo.id] ? false : true;
  });
