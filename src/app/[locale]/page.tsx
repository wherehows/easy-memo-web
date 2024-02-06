"use client";

import { useStorage } from "@/hooks/useStorage";
import Header from "@/components/Header";
import MemoItem, { MemoItemProps } from "@/components/MemoItem";
import { formatTimeDifference, postMessage } from "@/utils/helpers";
import { LOCALES } from "@/utils/navigation";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect } from "react";
import { checkStorageAvailability } from "@/utils/storage";
import EditModal from "@/components/EditModal";

const MainPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isEditing = searchParams.get("isEditing");

  const t = useTranslations();
  const { locale } = useParams();

  const [memoList, setMemoList] = useStorage<MemoItemProps[]>(
    "memo",
    [],
    "localStorage"
  );

  const sortedMemoList = memoList.sort(
    (a: MemoItemProps, b: MemoItemProps) =>
      +new Date(b.date) - +new Date(a.date)
  );

  useEffect(() => {
    const [isAvailable, reason] = checkStorageAvailability("localStorage");

    if (!isAvailable) {
      alert(`${t("alert.storage")}. ${reason}`);
      postMessage("STORAGE_ERROR", "");
    }
  }, [t]);

  return (
    <>
      {isEditing ? (
        <EditModal
          memoList={memoList}
          setMemoList={setMemoList}
          sortedMemoList={sortedMemoList}
        />
      ) : (
        <>
          <Header>
            <Header.LeftOption option={{}} />
            <Header.RightOption
              option={{
                edit: {
                  disabled: !sortedMemoList.length,
                  onClick: () => {
                    router.push(`${pathname}?isEditing=true`);
                  },
                },
                write: true,
              }}
            />
          </Header>
          <main className="main">
            {sortedMemoList.length ? (
              <ul className="flex flex-col gap-[16px]">
                {sortedMemoList.map(
                  ({ id, title, date, content }: MemoItemProps) => {
                    const titleToShow =
                      title || content.substring(0, 20) || t("except.no-title");

                    const dateToShow = formatTimeDifference(
                      new Date(date),
                      locale as (typeof LOCALES)[number]
                    );

                    return (
                      <li key={id}>
                        <MemoItem
                          id={id}
                          date={dateToShow}
                          title={titleToShow}
                          content={content}
                        />
                      </li>
                    );
                  }
                )}
              </ul>
            ) : (
              <div className="grow center text-gray-400">
                {t("except.empty")}
              </div>
            )}
          </main>
        </>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(MainPage), { ssr: false });
