export const sectionList = [
  {
    name: "populars",
    title: "What's popular?",
    target: "상영중",
    urls: {
      상영중: `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_CODE}&language=ko&page=1`,
      TV: `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_API_CODE}&language=ko&page=1`,
    },
  },
  {
    name: "trending",
    title: "트렌딩",
    target: "오늘",
    urls: {
      오늘: `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.NEXT_PUBLIC_API_CODE}&language=ko`,
      이번주: `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.NEXT_PUBLIC_API_CODE}&language=ko`,
    },
  },
];
