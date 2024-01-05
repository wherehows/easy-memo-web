import { IconButtonOption, XOR } from "@/types/common";
import { classNames } from "@/utils/helpers";
import Link from "next/link";

type RightOptionProps = XOR<
  {
    text: string;
  },
  {
    option: {
      save?: IconButtonOption;
      remove?: IconButtonOption;
      allSelection?: IconButtonOption;
      edit?: IconButtonOption;
      back?: boolean;
      write?: boolean;
      share?: IconButtonOption;
    };
  }
>;

const RightOption = ({ text, option }: RightOptionProps) => {
  if (text) {
    return <button>{text}</button>;
  }

  if (option) {
    const { write, share, save, edit, remove, allSelection } = option;

    const AllSelection = allSelection && "onClick" in allSelection && (
      <button key="allSelection" onClick={allSelection.onClick}>
        전체 선택
      </button>
    );

    const Remove = remove && "onClick" in remove && (
      <button
        key="remove"
        className={classNames(!!remove.disabled && "text-gray-500")}
        aria-disabled={remove.disabled}
        disabled={remove.disabled}
        onClick={remove.onClick}
      >
        삭제
      </button>
    );

    const Edit = edit && "onClick" in edit && (
      <button
        key="onClick"
        className={classNames(!!edit.disabled && "text-gray-500")}
        aria-disabled={edit.disabled}
        disabled={edit.disabled}
        onClick={edit.onClick}
      >
        편집
      </button>
    );
    const Write = write && (
      <Link key="write" href="/write">
        작성
      </Link>
    );

    const Share = share && "onClick" in share && (
      <button key="share" onClick={share.onClick}>
        공유
      </button>
    );

    const Save = save && "onClick" in save && (
      <button
        key="onClick"
        onClick={save.onClick}
        aria-disabled={save.disabled}
        disabled={save.disabled}
      >
        저장
      </button>
    );

    return (
      <div className="flex gap-[18px]">
        {[Share, Edit, Save, Write, AllSelection, Remove]}
      </div>
    );
  }
};

export default RightOption;
