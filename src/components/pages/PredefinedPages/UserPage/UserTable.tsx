import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { User } from "../../../../types/models/User.model";
import UserService from "../../../../Services/UserService";
import { Link, useNavigate } from "react-router-dom";

const UserTable = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    UserService.getAllUsers().then((data) => {
      setUsers(data.data);
    });
  }, []);

  const handleAdd = () => {
    navigate("../user/add/");
  };

  const reloadPage = () => {
    window.location.reload();
  };
  return (
    <>
      {users.map((user) => (
        <div key={user.id}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              
              {user.firstName} {user.lastName} {user.email}
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  state = {user}
                  onClick={() => {
                    UserService.deleteUser(user["id"]).then(reloadPage);
                  }}
                  component = {Link}
                  to = {`../useredit/`}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    UserService.deleteUser(user["id"]).then(reloadPage);
                  }}
                >
                  Delete
                </Button>
                <Button
                  size='small'
                  color='error'
                  variant='contained'
                  onClick={() => navigate(`/users/${user.id}/posts`)}
                >
                  Posts
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </div>
      ))}
      <Button
        size="small"
        color="success"
        variant="contained"
        onClick={handleAdd}
      >
        Add
      </Button>
    </>
  );
};

export default UserTable;
