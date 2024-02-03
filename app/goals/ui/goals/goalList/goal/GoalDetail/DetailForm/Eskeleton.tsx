const Eskeleton = () => {
  return (
    <form className="flex flex-col gap-y-2">
      <div>
        <div className="skeleton h-2 w-4/5 ml-auto" />
        <div className="skeleton h-20 mt-1" />
      </div>
      <div>
        <div className="skeleton h-2 w-4/5 ml-auto" />
        <div className="skeleton h-20 mt-1" />
      </div>
      <div>
        <div className="skeleton h-2 w-4/5 ml-auto" />
        <div className="skeleton h-20 mt-1" />
      </div>
    </form>
  );
};

export default Eskeleton;
