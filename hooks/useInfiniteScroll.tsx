import { MutableRefObject, useEffect, useRef } from "react";
import { useInfiniteFetchData } from "./useInfiniteFetchData";

interface IProps {
  target: MutableRefObject<Element | null>;
  section: string;
  category: string;
}

export const useInfiniteScroll = ({ target, section, category }: IProps) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const { size, setSize, data, error, loading } = useInfiniteFetchData({
    section,
    category,
  });

  const initialLoading = loading && data.length == 0;
  useEffect(() => {
    if (target.current && !observer.current) {
      observer.current = new IntersectionObserver(
        (entries, _) => {
          entries.forEach((entry) => {
            entry.isIntersecting && setSize((prev) => prev + 1);
          });
        },
        {
          threshold: 1.0,
        }
      );
      observer.current.observe(target.current);
    }
    return () => {
      observer.current = null;
    };
  }, [initialLoading, setSize, target]);

  return { data, size, loading: initialLoading, error };
};
