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
            <Header.RightOption
              option={{
                edit: {
                  onClick: () => {},
                },
                write: true,
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
            <Header.MiddleText text="작성 페이지" />
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
                close: {
                  onClick: () => {},
                },
              }}
            />
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
