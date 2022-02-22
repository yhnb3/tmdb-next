import React, { useState, useEffect } from "react";
import useInfiniteFetchData from "../hooks/useInfiniteFetchData";

export default function withInfiniteScroll(Component:React.FC, category: string, section: string) {
  const WithInfiniteComponent = (props) => {
    const { data=[], size, setSize, isLoading, error } = useInfiniteFetchData({category, section})
    useEffect(() => {
      window.addEventListener('scroll', (e : any) => {
        if (
          e.target.scrollingElement.scrollHeight - 300 <=
          window.scrollY + window.innerHeight
        ) {
          setSize(size + 1);
        }
      });

      return () => {
        window.removeEventListener('scroll', (e : any) => {
          if (
            e.target.scrollingElement.scrollHeight - 300 <=
            window.scrollY + window.innerHeight
          ) {
            setSize(size + 1);
          }
        });
      };
    }, [size, setSize]);
    
    if(error) return <p>에러</p>
    
    return isLoading ? <p>Loading</p> : <Component data={data} {...props} />;
  };

  return WithInfiniteComponent;
}
