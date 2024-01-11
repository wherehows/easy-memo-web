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
            <Header.LeftOption empty />
            <Header.MiddleText text="메인 페이지" />
            <Header.RightOption
              option={{
                edit: {
                  onClick: () => {},
                },
              }}
            />
          </Header>
        </div>
        <div className="relative">
          <Header>
            <Header.LeftOption
              option={{
                back: {
                  onClick: () => {},
                },
              }}
            />
            <Header.MiddleText text="상세 페이지" />
            <Header.RightOption
              option={{
                save: {
                  onClick: () => {},
                },
              }}
            />
          </Header>
        </div>
        <div className="relative">
          <Header>
            <Header.LeftOption
              option={{
                back: {
                  onClick: () => {},
                },
              }}
            />
            <Header.MiddleText text="삭제 페이지" />
            <Header.RightOption
              option={{
                remove: {
                  onClick: () => {},
                },
              }}
            />
          </Header>
        </div>
      </>
    );
  },
};
