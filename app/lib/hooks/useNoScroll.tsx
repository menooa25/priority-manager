"use client";

import { useEffect, useState } from "react";

const useNoScroll = (elemRef: any, itsParent = false) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    let elem: any = elemRef?.current;
    const childElem = elem?.childNodes?.[0];
    if (itsParent && childElem) elem = childElem;
    if (elem) {
      const newHeight = elem.scrollHeight + scrollPosition;
      elem.style.height = `${newHeight}px`;
    }
  }, [scrollPosition]);
  const onScroll = (e: any) => {
    setScrollPosition(e.currentTarget.scrollTop);
  };
  return { onScroll };
};

export default useNoScroll;
