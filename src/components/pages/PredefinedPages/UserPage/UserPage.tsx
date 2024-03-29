import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { User } from '../../../../types/models/User.model';
import UserService from '../../../../Services/UserService';
import UserForm from '../../../molecules/UserForm';

const UserPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState<User>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    roles: [],
  });

  useEffect(() => {
    return () => {
      if (userId) {
        UserService.getUser(userId).then((res) => {
          return setUser(res);
        });
      }
    };
  }, [userId]);

  const submitActionHandler = (values: User) => {
    if (userId !== undefined) {
      UserService.updateUser(values).then(() => {
        navigate("../users");
      });
    } else {
      UserService.addUser(values).then(() => {
        navigate("/users");
      });
    }
  };

  return (
    <UserForm
      user={user}
      submitActionHandler={submitActionHandler}
      isAllowedEditRoles={false}
      showPasswordField={false}
    />
  );
};
export default UserPage;