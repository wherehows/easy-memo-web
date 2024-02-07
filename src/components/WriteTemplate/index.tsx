import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Header from "../Header";
import { useStorage } from "@/hooks/useStorage";
import { ChangeEvent } from "react";
import { MemoItemProps } from "../MemoItem";
import toast from "react-hot-toast";
import { debounce, postMessage } from "@/utils/helpers";

interface WriteTemplateProps {
  currentMemo: MemoItemProps;
  onWriteMemo: (newMemo: MemoItemProps) => void;
}

const WriteTemplate = ({ currentMemo, onWriteMemo }: WriteTemplateProps) => {
  const t = useTranslations();
  const router = useRouter();

  const [memoList, setMemoList] = useStorage("memo", [], "localStorage");

  const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const priorMemoList = memoList.slice(0, -1);

    const newMemoState = {
      ...currentMemo,
      content: e.target.value,
    };

    onWriteMemo(newMemoState);
    setMemoList([...priorMemoList, newMemoState]);
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const priorMemoList = memoList.slice(0, -1);

    const newMemoState = {
      ...currentMemo,
      title: e.target.value,
    };

    onWriteMemo(newMemoState);
    setMemoList([...priorMemoList, newMemoState]);
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
            share:
              window.platform === "ios"
                ? {
                    onClick: () => {
                      const { title, content } = currentMemo;

                      postMessage("SHARE", {
                        title:
                          title ||
                          content.substring(0, 20) ||
                          t("except.no-title"),
                        content: content || t("except.no-content"),
                      });
                    },
                  }
                : undefined,
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
          <label htmlFor="title" className="mb-1">
            {t("write.title")}
          </label>
          <input
            id="title"
            type="text"
            defaultValue={title}
            maxLength={50}
            className="text-white p-2 mb-4 rounded-md bg-[#1e2126]"
            onChange={debounce(handleChangeTitle, 500)}
          />
        </div>
        <div className="flex flex-col grow">
          <label htmlFor="content" className="mb-1">
            {t("write.content")}
          </label>
          <textarea
            id="content"
            maxLength={2000}
            defaultValue={content}
            className="h-[100%] text-white resize-none p-2 rounded-md bg-[#1e2126]"
            onChange={debounce(handleChangeContent, 500)}
          />
        </div>
      </main>
    </>
  );
};

export default WriteTemplate;
