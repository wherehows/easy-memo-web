"use client";

import Header from "@/stories/Header";
import { useRouter } from "next/navigation";

interface DetailPageProps {
  params: { memoId: string };
}

const DetailPage = ({ params: { memoId } }: DetailPageProps) => {
  const router = useRouter();

  return (
    <>
      <Header>
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
              save: {
                onClick: () => {},
              },
            }}
          />
        </Header>
      </Header>
      <main></main>
    </>
  );
};

export default DetailPage;
