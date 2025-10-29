import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import {GoTrashcan} from "react-icons/go";
import {useDeleteAlbumMutation} from "../store";
import PhotosList from "./PhotosList";

export default function AlbumsListItem({album}) {
  const [deleteAlbum, results] = useDeleteAlbumMutation();

  const handleClick = () => {
    deleteAlbum(album)
  }

  const header = <>
    <Button className="mr-3 cursor-pointer" onClick={handleClick} loading={results.isLoading}>
      <GoTrashcan/>
    </Button>
    {album.title}
  </>
  return (
    <ExpandablePanel key={album.id} header={header}>
      <PhotosList album={album} />
    </ExpandablePanel>
  )
}