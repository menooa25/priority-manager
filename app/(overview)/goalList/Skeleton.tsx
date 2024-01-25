const Skeleton = () => {
  return (
    <div className="flex w-full md:w-96 flex-col gap-y-3">
      <div className="flex items-stretch mb-1">
        <div className="skeleton rounded-2xl overflow-hidden w-full min-h-[97px] focus:outline-none textarea-bordered"></div>
      </div>
      <div className="flex w-full gap-x-1">
        <div className="skeleton flex-1 h-9"></div>
        <div className="skeleton flex-1 h-9"></div>
      </div>
      <hr className="mt-1" />
      <div className="flex items-stretch mb-1">
        <div className="skeleton rounded-2xl overflow-hidden w-full min-h-[97px] focus:outline-none textarea-bordered"></div>
      </div>
      <div className="flex w-full gap-x-1">
        <div className="skeleton flex-1 h-9"></div>
        <div className="skeleton flex-1 h-9"></div>
      </div>
      <hr className="mt-1" />
      <div className="flex items-stretch mb-1">
        <div className="skeleton rounded-2xl overflow-hidden w-full min-h-[97px] focus:outline-none textarea-bordered"></div>
      </div>
      <div className="flex w-full gap-x-1">
        <div className="skeleton flex-1 h-9"></div>
        <div className="skeleton flex-1 h-9"></div>
      </div>
      <hr className="mt-1" />
      <div className="flex items-stretch mb-1">
        <div className="skeleton rounded-2xl overflow-hidden w-full min-h-[97px] focus:outline-none textarea-bordered"></div>
      </div>
      <div className="flex w-full gap-x-1">
        <div className="skeleton flex-1 h-9"></div>
        <div className="skeleton flex-1 h-9"></div>
      </div>
    </div>
  );
};

export default Skeleton;
