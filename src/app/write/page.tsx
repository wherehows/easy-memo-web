import Header from "@/stories/Header";

const WritePage = () => {
  return (
    <>
      <Header>
        <Header.LeftOption option={{ back: true }} />
        <Header.MiddleText text="작성 페이지" />
        <Header.RightOption option={{ save: true }} />
      </Header>
      <main className="flex flex-col grow py-[16px] px-[24px]">
        <div className="flex flex-col">
          <label htmlFor="title">제목</label>
          <input id="title" type="text" maxLength={50} />
        </div>
        <div className="flex flex-col grow">
          <label htmlFor="content">내용</label>
          <textarea
            className="h-[100%] resize-none"
            id="content"
            maxLength={2000}
          />
        </div>
      </main>
    </>
  );
};

export default WritePage;
