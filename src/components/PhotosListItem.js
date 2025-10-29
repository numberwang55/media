import {useDeletePhotoMutation} from "../store";
import {GoTrashcan} from "react-icons/go";

export default function PhotosListItem({photo}) {
  const [deletePhoto, deletePhotoResults] = useDeletePhotoMutation();
  return (
    <div className="relative m-2 cursor-pointer">
      <img src={photo.url} alt="random" className="h-20 w-20" />
      <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80">
        <GoTrashcan className="text-3xl" onClick={() => deletePhoto(photo)} />
      </div>
    </div>
  )
}