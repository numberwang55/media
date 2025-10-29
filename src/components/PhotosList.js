import PhotosListItem from "./PhotosListItem";
import {useFetchPhotosQuery, useAddPhotoMutation} from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";

export default function PhotosList({album}) {
  const {data, error, isFetching} = useFetchPhotosQuery(album);
  const [addPhoto, addPhotoResults] = useAddPhotoMutation();
  console.log(data)

  const handleAddPhoto = () => {
    addPhoto(album)
  }

  let content;
  if (isFetching) {
    content = <Skeleton times={4} className="h-8 w-8"/>;
  } else if (error) {
    content = <div>Error loading photos</div>;
  } else {
    content = data.map((photo) => {
      return <PhotosListItem photo={photo} key={photo.id}/>
    })
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Photos in {album.title}</h3>
        <Button loading={addPhotoResults.isLoading} onClick={handleAddPhoto}>Add Photo</Button>
      </div>
      <div>
        {content}
      </div>
    </div>
  )
}