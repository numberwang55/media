import {fetchUsers, addUser} from "../store";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Skeleton from "../components/Skeleton";
import Button from "./Button";

export default function UsersList() {
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [loadingUsersError, setLoadingUsersError] = useState(null);
  const dispatch = useDispatch()
  const {data} = useSelector(state => state.users)

  useEffect(() => {
    setIsLoadingUsers(true);
    dispatch(fetchUsers())
      .unwrap()
      .then(() => {
        console.log("Success")
        setIsLoadingUsers(false);
      })
      .catch((err) => {
        console.error(err.message);
      })
  }, [dispatch]);

  const handleAddUser = () => {
    dispatch(addUser())
  }

  if (isLoadingUsers) {
    return <Skeleton times={6} className="h-10 w-full"/>
  }

  if (loadingUsersError) {
    return <div>Error fetching data...</div>
  }

  const renderedUsers = data.map((user) => {
    return <div key={user.id} className="mb-2 border rounded">
      <div className="flex p-2 justify-between items-center cursor-pointer">
        {user.name}
      </div>
    </div>
  })

  return (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button onClick={handleAddUser}>Add User</Button>
      </div>
      {renderedUsers}
    </div>
  )
}