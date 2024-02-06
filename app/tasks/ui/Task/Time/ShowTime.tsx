"use client";
interface Props {
  from: string;
  to: string;
}
const ShowTime = ({ from, to }: Props) => {
  if (!from && !to) return <span>اضافه کردن زمان</span>;
  if (from && to)
    return (
      <span>
        از {from} - تا {to}
      </span>
    );
  if (from) return <span>از {from}</span>;
  if (to) return <span>تا {to}</span>;
};

export default ShowTime;
