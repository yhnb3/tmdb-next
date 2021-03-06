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

