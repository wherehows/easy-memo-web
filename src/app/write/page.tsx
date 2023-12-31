import Header from "@/stories/Header";

const WritePage = () => {
  return (
    <>
      <Header>
        <Header.LeftOption option={{ back: true }} />
        <Header.MiddleText text="작성 페이지" />
        <Header.RightOption option={{ save: true }} />
      </Header>
      <main></main>
    </>
  );
};

export default WritePage;
