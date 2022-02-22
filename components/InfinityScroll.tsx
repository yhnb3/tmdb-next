/* eslint-disable no-underscore-dangle */
import * as React from 'react'
import { throttle } from 'lodash';

interface Props {
  isLoading: boolean,
  size: number,
  error: boolean,
  setSize: (size: number) => void,
  children: React.ReactElement,
  dataLen: number,
}
const InfinityScroll = ({setSize, size, children, error, dataLen} : Props) => {
  const _throttle = throttle((e) => {
    if (
      e.target.scrollingElement.scrollHeight - 300 <=
      window.scrollY + window.innerHeight
    ) {
      setSize(size + 1);
    }
  }, 500);

  React.useEffect(() => {
    window.addEventListener('scroll', _throttle);

    return () => {
      window.removeEventListener('scroll', _throttle);
    };
  },[dataLen]);
  
  if (error) return <p>에러</p>
  return children
}

export default InfinityScroll