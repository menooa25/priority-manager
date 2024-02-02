"use client";

import { useEffect, useState } from "react";

const useNoScroll = (elemRef: any) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    if (elemRef?.current) {
      const newHeight = elemRef.current.scrollHeight + scrollPosition;
      elemRef.current.style.height = `${newHeight}px`;
    }
  }, [scrollPosition]);
  const onScroll = (e: any) => {
    setScrollPosition(e.currentTarget.scrollTop);
  };
  return { onScroll };
};

export default useNoScroll;
