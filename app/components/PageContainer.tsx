import { PropsWithChildren } from "react";

const PageContainer = ({ children }: PropsWithChildren) => {
  return (
    <main className="flex px-2 pb-6 mb-10 mt-5 sm:w-96 mx-auto justify-center">
      {children}
    </main>
  );
};

export default PageContainer;
