import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./styles.scss";

const cssModule = classNames.bind(styles);

interface PageNavigationProps {
  current: number;
  max: number;
  updatePage: (page: number) => void;
}

export const PageNavigation = ({ current, max, updatePage }: PageNavigationProps): JSX.Element => {
  const [showPages, showPagesUpdate] = useState<Array<number | string>>([]);
  const pageUpdate = useCallback(
    (page) => {
      if (page !== current && typeof page === "number") {
        updatePage(page);
        console.log(page);
      }
    },
    [current, updatePage],
  );

  useEffect(() => {
    const showPages = new Set();

    if (current > 1) {
      showPages.add(1);
      showPages.add(current - 1);
    }

    showPages.add(current);

    if (current < max) {
      showPages.add(max);
      showPages.add(current + 1);
    }

    const showPagesArray = Array.from(showPages) as Array<number>;
    const showPagesArraySorted = showPagesArray.sort((a: number, b: number) => a - b) as Array<number | string>;

    if (!showPagesArraySorted.includes(2)) {
      showPagesArraySorted.splice(1, 0, "...");
    }

    if (!showPagesArraySorted.includes(max - 1)) {
      showPagesArraySorted.splice(showPagesArraySorted.length - 1, 0, "...");
    }

    showPagesUpdate(showPagesArraySorted);
  }, [current, max]);

  return (
    <ul className={cssModule("PageNavigation")}>
      {showPages.map((el, index) => {
        return (
          <li className={cssModule("PageNavigation__page")} key={index} onClick={() => pageUpdate(el)}>
            {el}
          </li>
        ) as JSX.Element;
      })}
    </ul>
  );
};
