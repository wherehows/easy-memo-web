"use client";

import Header from "@/components/Header";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const t = useTranslations();
  const router = useRouter();

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
      </Header>
      <main className="main pt-[8px] pb-[16px] px-[24px]">
        <div className="grow center text-gray-400">{t("except.404")}</div>
      </main>
    </>
  );
};

export default NotFoundPage;
