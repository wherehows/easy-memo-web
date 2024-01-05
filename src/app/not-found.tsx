"use client";

import Header from "@/stories/Header";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
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
        <div className="grow center text-gray-400">
          존재하지 않는 페이지입니다.
        </div>
      </main>
    </>
  );
};

export default NotFoundPage;
