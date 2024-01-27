import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

interface ButtonsProps {
  display: boolean;
  onClick: () => void;
  loading?: boolean;
}

export const IncreaseIndexBtn = ({
  display,
  onClick,
  loading,
}: ButtonsProps) => {
  if (!display) return null;
  return (
    <button
      disabled={loading}
      onClick={onClick}
      className="btn  p-2 flex-1 rounded-2xl rounded-l-none rounded-b-none"
    >
      {loading ? (
        <span className="loading w-3 loading-spinner " />
      ) : (
        <IoIosArrowUp size={12} />
      )}
    </button>
  );
};
export const DecreaseIndexBtn = ({
  display,
  onClick,
  loading,
}: ButtonsProps) => {
  if (!display) return null;
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="btn p-2 flex-1 rounded-2xl  rounded-l-none rounded-t-none"
    >
      {loading ? (
        <span className="loading w-3 loading-spinner" />
      ) : (
        <IoIosArrowDown size={12} />
      )}
    </button>
  );
};
