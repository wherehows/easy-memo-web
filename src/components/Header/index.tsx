import { classNames } from "@/utils/helpers";
import LeftOption from "./LeftOption";
import RightOption from "./RightOption";
import MiddleText from "./MiddleText";
import { StrictPropsWithChildren } from "@/types/common";

type Props = StrictPropsWithChildren<{
  bottom?: boolean;
}>;

const Header = ({ bottom = false, children }: Props) => {
  return (
    <header
      className={classNames(
        "sticky top-0 flex justify-between items-center w-[100%] h-[48px] min-h-[48px] pl-[24px] pr-[24px]",
        bottom ? "bottom-0" : "top-0"
      )}
    >
      {children}
    </header>
  );
};

export default Header;

Header.LeftOption = LeftOption;
Header.RightOption = RightOption;
Header.MiddleText = MiddleText;
