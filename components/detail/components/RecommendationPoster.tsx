import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Props {
  content : {
    id: string,
    title?: string,
    name?: string,
    backdrop_path: string,
    vote_average: number
  },
}

const RecommendationPoster : React.FC<Props> = ({content} : Props) => {
  const section = content.title ? "movie" : "tv"
  return <div>
    <Link href={`/${section}/${content.id}`}>
      <a>
      <Image
        className="object-cover rounded-md"
        width={250}
        height={141}
        src={
          content.backdrop_path
            ? `https://image.tmdb.org/t/p/original/${content.backdrop_path}`
            : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
        }
        alt={content.name || content.title}
      />
      </a>
      
    </Link>
    <div className="flex justify-between mb-2 w-sm_backdrop">
      <p className="text-sm  w-10/12 line-clamp-1">
        {content.name || content.title}
      </p>
      <p>{`${Math.round(content.vote_average * 10)}%`}</p>
    </div>
</div>

}

export default RecommendationPoster