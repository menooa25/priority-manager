import { PropsWithChildren } from "react";

const PageContainer = ({ children }: PropsWithChildren) => {
  return (
    <main className="flex px-2 mb-10 mt-5 md:w-96 mx-auto justify-center">
      {children}
    </main>
  );
};

export default PageContainer;
