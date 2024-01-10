import { formatTimeDifference } from "@/utils/helpers";
import MemoItem, { MemoItemProps } from "./index";

const meta = {
  title: "components/MemoItem",
};

export default meta;

const MEMO_LIST: MemoItemProps[] = [];

export const Index = {
  render: () => {
    return (
      <ul>
        {MEMO_LIST.map(({ title, content, date, id }: MemoItemProps) => {
          const titleToShow =
            title || content.substring(0, 20) || "제목이 없습니다";

          const dateToShow = formatTimeDifference(new Date(date), "ko");

          return (
            <li key={id}>
              <MemoItem
                title={titleToShow}
                date={dateToShow}
                content={content}
                id={id}
              />
            </li>
          );
        })}
      </ul>
    );
  },
};
