// hooks
import useAuth from "../hooks/useAuth";
//
import { MAvatar } from "./@material-extend";
import createAvatar from "../utils/createAvatar";

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user } = useAuth();

  return (
    <MAvatar
      src={user.photoURL}
      alt={user.displayName}
      color={user.photoURL ? "default" : createAvatar(user.displayName).color}
      {...other}
      style={{ width: "35px", height: "35px" }}
    >
      {createAvatar(user.displayName).name}
    </MAvatar>
  );
}
