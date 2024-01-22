import ErrorPage from ".";

export default {
  title: "PAGES/Error",
};

export const Index = {
  render: () => {
    return (
      <ErrorPage
        error={{
          name: "Test Error Name",
          message: "Test Error Message",
        }}
        reset={() => {}}
      />
    );
  },
};
