import { MutableRefObject, useEffect, useRef } from "react";
import useInfiniteFetchData from "./useInfiniteFetchData";

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
  useEffect(() => {
    if (target.current && !observer.current) {
      console.log("observer is null");
      observer.current = new IntersectionObserver(
        (entries, observe) => {
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
  }, [data.length, setSize, target]);

  return { data, size, loading, error };
};
