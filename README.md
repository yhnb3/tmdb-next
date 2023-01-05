# TMDB 클론 사이트 with nextjs

> 기존에 react로 만들어진 사이트를 nextjs를 이용해서 성능향상을 목표로 재구성하고자 합니다.

### [배포사이트](https://tmdb-next.vercel.app/)

### 수정사항

#### 전체적인 컴포넌트 리팩토링

- 리팩토링 하면서 느끼는 거지만 파일구조도 제대로 자리 잡지 않다 보니 어떻게 리팩토링해야할지 막막합니다.
- `tailwind`를 사용하다 보니 느낀건데 너무 css를 너무 좁은 범위로 이용하고 있었다는 생각이 들었습니다.
  - 개인적으로 `module css`를 이용한 개발을 경험 한 후라 `tailwind`로 적용하기 어려운 부분이 몇몇 있었습니다.
  - 예를 들면 부모에 hover를 주고 그걸 자식에게 넘겨주는 것이 `tailwind`에서는 간단치 않다는 것?
  - 그리고 리팩토링이 일단 너무 어렵습니다.

#### 20220713

- 인피니티 스크롤 intersection observer로 다시 구현
  - loading indicator를 target으로 하여서 구현
  - 더 이상 불러올 page가 없을 경우 loading indicator를 구현 하지 않음으로 로딩을 막을 수 있다.
- hoc를 hook으로 교체

#### 20220715

- 모바일 UI 변경
  - Slider내에 스크롤 제거
  - header, footer 크기 조절
  - 모바일 폰트 크기 조절
  - side nav 로직 변경
- 메인 페이지에 hero-image 추가
  - 현 시점 기준 일주일 내에 가장 트렌드한 영화의 `backdrop-path`활용

#### 20220724

- 인피니티 스크롤 구현 과정에서 첫번째 data를 불러오는 과정에서 두번째 data까지 한꺼번에 불러와지는 현상 수정
  - intersection Observer의 타겟이 되는 loading 컴포넌트가 처음 데이터를 렌더링 되는 과정에서 노출 되기 때문에 2번 데이터가 불러와지는 것으로 추정하였음
  - useInfiniteFetchData hook에서 loading을 이용하여서 data가 fetch되고 있을 때는 ref 프로퍼티에 할당되지 않은 loading 컴포넌트를 노출 시키도록 하였습니다.
  - 이러면서 새로운 데이터를 가져올 때 마다 페이지가 전체적으로 리렌더링 되는 현상을 막고자 data의 길이가 0이면서 data를 fetch할때만 loading 컴포넌트를 단일로 노출 하도록 수정 하였습니다.

#### 20221210

- 영화, 드라마, 그리고 인물 리스트 페이지를 SSR에서 CRS로 수정
- 훨씬 나은 속도와 반응을 보임.
- Server에서 scree객체를 인지하지 못하는 문제를 해결하기 위해 useEffect를 이용해서 isMobile여부 판단.

#### 20221230

- `useIsMobile`에서 `useEffect`로 `isMobile`여부를 확인 할시에는 `mobile`로 판단될 시에 `mobile`화면이 아닌 다른 화면이 페인트 되었다가 다시 `mobile`컴포넌트로 페인트 되는것을 볼 수 잇는데 이를 `useLayoutEffect`를 이용하여 화면을 페인트 하기 전에 `isMobil`여부를 판단할 수 있게 하여서 좀 더 좋은 유저 경험을 줄 수 있게 되었습니다.
- 그리고 화면이 로딩 될때 모두 일관적인 회전하는 로딩 인디케이터를 보여주는 것이 아닌 로딩 될 컴포넌트에 맞는 모양을 보여줌으로써 조금 덜 지루한 로딩경험을 가질 수 있게 하였습니다. - 현재 일부 적용중 이지만 계속해서 확장될 예정 입니다.

#### 20231004

- `useIsMobile`훅은 `useLayoutEffect`를 이용한 훅이라 `server side`에서는 실행이 되면 안됩니다. 그래서 

  ```jsx
  const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
  // 출처 : https://github.com/reduxjs/react-redux/blob/8605088606403f6909597405c67db91d907db86e/src/components/connectAdvanced.js#L35-L41
  ```

  위와 같이 `window`가 `undefined`일때는 `server side`이므로 `useLayoutEffect`가 아닌 `useEffect`로 대체 함으로써 해결 하였습니다.

- Search Page 리팩토링

  - 데이터 패칭 하는 `hook`만들기
  - 데이터 패칭하는 동안 모든 페이지가 아닌 데이터가 필요한 페이지만 로딩 컴포넌트로 표시
  - css 정리.
    - 필요없는 `flex` 삭제
    - 필요없는 `div` 삭제
    - 데이터 없는 페이지 더 보기 좋게 수정

#### 20230105

- `useClickAwayHook`을 이용하여 `mobileSideNav`를 좀더 직관성 있게 컨트롤 할 수 있게 함.

  ```tsx
  export const useClickAway = ({ targetRef, buttonRef, onClick }: Props) => {
    const hadleClickEvent = useCallback(
      (e) => {
        if (!targetRef || !buttonRef) return;
        const { current: targetEl } = targetRef;
        const { current: buttonEl } = buttonRef;
        targetEl &&
          buttonEl &&
          !targetEl.contains(e.target) &&
          !buttonEl.contains(e.target) &&
          onClick();
      },
      [buttonRef, onClick, targetRef]
    );
  
    useEffect(() => {
      window.addEventListener("click", hadleClickEvent);
  
      return () => {
        window.removeEventListener("click", hadleClickEvent);
      };
    }, [hadleClickEvent]);
  };
  ```

  - 우선 `target`을 포함하지 않는 elmenet를 클릭했을때 `target`을 닫습니다.
  - 하지만 `target`을 여는 버튼을 클릭했을때 닫히는 순간 다시 열리는 현상을 막아햐 합니다.
  - 그래서 `target`을 포함하지 않고 버튼을 포함하지 않는 타겟을 선택했을때만 `onClick`함수를 실행할 수 있도록 합니다.
  - 그럼 버튼을 클릭했을 경우는 `onClick`이 실행되지 않고 버튼에 따로 달려있는 콜백함수로 인해 `target`을 닫게 합니다.

- search bar에서 빈 글자를 입력하였을때 검색이 안되게끔 수정
