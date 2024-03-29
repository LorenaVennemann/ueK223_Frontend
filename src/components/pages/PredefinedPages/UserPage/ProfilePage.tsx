import { Box, Button, Card, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActiveUserContext from "../../../../Contexts/ActiveUserContext";
import UserService from "../../../../Services/UserService";
import { User } from "../../../../types/models/User.model";
import UserForm from "../../../molecules/UserForm";

const ProfilePage = () => {
  const context = useContext(ActiveUserContext);
  const user: User = context.user!;
  const [editing, setEditing] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleSubmit = (e: any) => {
    UserService.updateUser(e);
    setEditing(false);
    navigate("/profile");
  };
  if (!context.user) {
    navigate("/login");
  }
  const handleEdit = () => {
    setEditing(!editing);
  };
  return (
    <div>
      <Box sx={{ margin: "30px" }}>
        <Card elevation={1}>
          {!editing && (
            <Box sx={{ margin: "20px" }}>
              <Typography variant="h3">
                {user?.firstName + " " + user?.lastName}
              </Typography>
              <Typography variant="subtitle2">id: {user?.id}</Typography>
            </Box>
          )}
          {editing && (
            <Box sx={{ margin: "10px" }}>
              <UserForm
                user={user!}
                cancelActionHandler={() => setEditing(false)}
                submitActionHandler={handleSubmit}
                isAllowedEditRoles={false}
                showPasswordField={true}
              ></UserForm>
            </Box>
          )}
        </Card>
        {!editing && <Button onClick={handleEdit}>Edit</Button>}
      </Box>
    </div>
  );
};

export default ProfilePage;
