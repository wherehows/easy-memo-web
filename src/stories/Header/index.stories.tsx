import Header from ".";

const meta = {
  title: "components/Header",
};

export default meta;

export const Index = {
  render: () => {
    return (
      <>
        <div className="relative">
          <Header>
            <Header.LeftOption logo />
            <Header.MiddleText text="메인 페이지" />
            <Header.RightOption
              option={{ search: true, filter: true, menu: true }}
            />
          </Header>
        </div>
        <div className="relative">
          <Header>
            <Header.LeftOption option={{ back: true }} />
            <Header.MiddleText text="상세 페이지" />
            <Header.RightOption option={{ save: true }} />
          </Header>
        </div>
        <div className="relative">
          <Header>
            <Header.LeftOption option={{ back: true }} />
            <Header.MiddleText text="삭제 페이지" />
            <Header.RightOption option={{ allSelection: true, remove: true }} />
          </Header>
        </div>
      </>
    );
  },
};
