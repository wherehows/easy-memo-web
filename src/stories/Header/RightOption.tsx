import { IconButtonOption, XOR } from "@/types/common";
import Link from "next/link";

type RightOptionProps = XOR<
  {
    text: string;
  },
  {
    option: {
      search?: IconButtonOption;
      filter?: IconButtonOption;
      menu?: IconButtonOption;
      save?: IconButtonOption;
      remove?: IconButtonOption;
      allSelection?: IconButtonOption;
      compile?: IconButtonOption;
      write?: IconButtonOption;
      share?: IconButtonOption;
    };
  }
>;

const RightOption = ({ text, option }: RightOptionProps) => {
  if (text) {
    return <button>{text}</button>;
  }

  if (option) {
    const {
      search,
      menu,
      write,
      share,
      save,
      compile,
      remove,
      allSelection,
      filter,
    } = option;

    const Search = search && (
      <button>
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    );
    const Filter = filter && (
      <button>
        <i className="fa-sharp fa-solid fa-filter"></i>
      </button>
    );
    const Menu = menu && (
      <button>
        <i className="fa-solid fa-bars"></i>
      </button>
    );
    const AllSelection = allSelection && <button>전체 선택</button>;
    const Remove = remove && <button>삭제</button>;
    const Compile = compile && <button>편집</button>;
    const Write = write && <Link href="/write">작성</Link>;

    const Share = share && <button>공유</button>;
    const saveDisabled = save && typeof save !== "boolean" && !!save.disabled;
    const Save = save && <button disabled={saveDisabled}>저장</button>;

    return (
      <div className="flex gap-[18px]">
        {[
          Search,
          Filter,
          Menu,
          Share,
          Compile,
          Save,
          Write,
          AllSelection,
          Remove,
        ]}
      </div>
    );
  }
};

export default RightOption;
