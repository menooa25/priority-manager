import { PropsWithChildren } from "react";

const PageContainer = ({ children }: PropsWithChildren) => {
  return (
    <main className="flex  mb-10 mt-5 md:w-96 mx-auto justify-center">
      {children}
    </main>
  );
};

export default PageContainer;
