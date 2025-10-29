import PhotosListItem from "./PhotosListItem";
import {useFetchPhotosQuery} from "../store";
import Skeleton from "./Skeleton";

export default function PhotosList({album}) {
  const {data, error, isFetching} = useFetchPhotosQuery(album);
  console.log(data)

  let content;
  if (isFetching) {
    content = <Skeleton times={3} className="h-10 w-full"/>;
  } else if (error) {
    content = <div>Error loading photos</div>;
  } else {
    content = data.map((photo) => {
      return <PhotosListItem photo={photo} key={photo.id} />
    })
  }

  return (
    <div>
      {content}
    </div>
  )
}