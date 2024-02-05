"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useQueryParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const changeSearchParams = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    router.push(pathname + "?" + params);
  };
  return { changeSearchParams, searchParams };
};

export default useQueryParams;
