import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import {GoTrashcan} from "react-icons/go";

export default function AlbumsListItem({album}) {
  const handleClick = () => {
    // TODO
  }

  const header = <div>
    <Button className="mr-3 cursor-pointer" onClick={handleClick}>
      <GoTrashcan/>
    </Button>
    {album.title}
  </div>
  return (
    <ExpandablePanel key={album.id} header={header}>List of photos in the album</ExpandablePanel>
  )
}