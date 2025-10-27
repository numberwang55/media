import {fetchUsers, addUser, deleteUser} from "../store";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import Skeleton from "../components/Skeleton";
import Button from "./Button";
import {useThunk} from "../hooks/use-thunk";
import UsersListItem from "./UsersListItem";

export default function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
  const [doAddUser, isCreatingUser, creatingUserError] = useThunk(addUser);
  const [doDeleteUser, isDeletingUser, deletingUserError] = useThunk(deleteUser);

  const {data} = useSelector(state => state.users)

  useEffect(() => {
    doFetchUsers()
  }, [doFetchUsers]);

  const handleAddUser = () => {
    doAddUser()
  }

  let content;
  if (isLoadingUsers) {
    content = <Skeleton times={6} className="h-10 w-full"/>
  } else if (loadingUsersError) {
    content = <div>Error fetching data...</div>
  } else {
    content = data.map((user) => {
      return <UsersListItem key={user.id} user={user} />
    })
  }

  return (
    <div>
      <div className="flex flex-row justify-between m-3 items-center">
        <h1 className="m-2 text-xl">Users</h1>
        <Button onClick={handleAddUser} loading={isCreatingUser}>Add User</Button>
        {creatingUserError && "Error creating user"}
      </div>
      {content}
    </div>
  )
}