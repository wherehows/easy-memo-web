"use client";

import Header from "@/stories/Header";

interface DetailPageProps {
  params: { memoId: string };
}

const DetailPage = ({ params: { memoId } }: DetailPageProps) => {
  return (
    <>
      <Header>
        <Header>
          <Header.LeftOption option={{ back: true }} />
          <Header.MiddleText text="상세 페이지" />
          <Header.RightOption option={{ save: true }} />
        </Header>
      </Header>
      <main></main>
    </>
  );
};

export default DetailPage;
