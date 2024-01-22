import { useRouter } from "next/navigation";
import Header from "../Header";

export interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage = ({ error }: ErrorPageProps) => {
  const router = useRouter();

  return (
    <>
      <Header>
        <Header.LeftOption
          option={{
            back: {
              onClick: () => router.replace("/"),
            },
          }}
        />
      </Header>
      <main className="main center text-gray-400">
        <h2>Error!</h2>
        {error.name && <div>error name is {error.name}</div>}
        {error.message && <div>error message is {error.message}</div>}
      </main>
    </>
  );
};

export default ErrorPage;
