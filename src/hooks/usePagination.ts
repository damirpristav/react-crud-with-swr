import { useEffect, useState } from 'react';

export const usePagination = ({ total, current, siblings = 2 }: Props) => {
  const [pages, setPages] = useState<Pages[]>([]);

  useEffect(() => {
    if (!total) return;

    if (total < siblings * 2 + 1) {
      setPages(
        Array(total)
          .fill('')
          .map((_, index) => ({ page: index + 1, skip: false, active: current === index + 1 }))
      );
      return;
    }

    const pagesArr: Pages[] = Array(siblings * 2 + 1).fill('').map((_, index) => {
      let page = current;
      if (current <= siblings) {
        return {
          page: index + 1,
          skip: false,
          active: current === index + 1,
        };
      }
      if (current >= total - siblings) {
        return {
          page: total - (siblings * 2 - index),
          skip: false,
          active: current === total - (siblings * 2 - index),
        };
      }
      if (index < siblings) {
        page = current - (siblings - index);
      } else if (index > siblings) {
        page = current + (index - siblings);
      }
      return {
        page,
        skip: false,
        active: page === current,
      };
    });

    if (pagesArr[0].page > 1) {
      pagesArr.unshift({
        page: 1,
        skip: false,
        active: false,
      });
    }

    if (pagesArr[0].page === 1 && pagesArr[1].page > 2) {
      pagesArr.splice(1, 0, {
        page: 0,
        skip: true,
        active: false,
      });
    }

    if (pagesArr[pagesArr.length - 1].page < total) {
      pagesArr.push({
        page: total,
        skip: false,
        active: false,
      });
    }

    if (pagesArr[pagesArr.length - 1].page === total && pagesArr[pagesArr.length - 2].page < total - 1) {
      pagesArr.splice(pagesArr.length - 1, 0, {
        page: 0,
        skip: true,
        active: false,
      });
    }

    setPages(pagesArr);
  }, [total, current, siblings]);

  return { pages };
};

type Props = {
  total: number | undefined;
  current: number;
  siblings?: number;
};

type Pages = {
  page: number;
  skip: boolean;
  active: boolean;
};
