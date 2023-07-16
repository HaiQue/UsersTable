import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  StyledTable,
  LoadingIndicator,
  ErrorBox,
  StyledForm,
  StyledInput,
  StyledModal,
  StyledButton,
  StyledAddNewButton,
  StyledContainer,
  StyledGridButton,
  StyledButtonContainer,
  StyledLabelInputPair,
} from "../../pages/styles";
import { IColorTheme } from "../../shared/color_themes";
import { StyledChartName, StyledCurrencyUpdatedTime } from "./style";
import "../../App.css";

interface IUsersProps {
  theme?: IColorTheme;
}

interface IUser {
  _id: string;
  name: string;
  surname: string;
  email: string;
  age: number;
}

const UsersListOrg = ({ theme }: IUsersProps) => {
  const [users, setUsers] = useState<IUser[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm<IUser>();

  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const result = await axios.get("http://localhost:5000/api/users");
      setUsers(result.data);
      setError(null);
    } catch (e) {
      console.log(e);
      if (e instanceof Error) {
        setError(e.toString());
      } else {
        setError(JSON.stringify(e));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async (user: IUser) => {
    try {
      await axios.post("http://localhost:5000/api/users", user);
      fetchUsers();
    } catch (e) {
      console.log(e);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchUsers();
    } catch (e) {
      console.log(e);
    }
  };

  const updateUser = async (id: string, user: IUser) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${id}`, user);
      fetchUsers();
    } catch (e) {
      console.log(e);
    }
  };

  const editUser = (id: string) => {
    setEditingUser(id);
  };

  const openModalWithForm = () => {
    setShowModal(true);
  };

  const closeModalAndClearForm = () => {
    setShowModal(false);
    reset();
    setEditingUser(null);
  };

  const onSubmit = handleSubmit((data) => {
    if (editingUser) {
      updateUser(editingUser, data);
      setEditingUser(null);
    } else {
      addUser(data);
    }
    closeModalAndClearForm();
  });

  const saveChanges = (id: string) => {
    handleSubmit((data: IUser) => updateUser(id, data))();
    closeModalAndClearForm();
  };

  return (
    <>
      {error ? (
        <ErrorBox>{error}</ErrorBox>
      ) : loading ? (
        <LoadingIndicator></LoadingIndicator>
      ) : (
        <>
          <StyledContainer>
            <StyledAddNewButton onClick={() => openModalWithForm()}>
              Add new
            </StyledAddNewButton>
          </StyledContainer>
          {showModal && (
            <StyledModal>
              <StyledForm onSubmit={onSubmit}>
                <StyledLabelInputPair gridArea="name">
                  <label className="ModelHeader">Name:</label>
                  <StyledInput {...register("name")} />
                </StyledLabelInputPair>
                <StyledLabelInputPair gridArea="surname">
                  <label className="ModelHeader">Surname:</label>
                  <StyledInput {...register("surname")} />
                </StyledLabelInputPair>
                <StyledLabelInputPair gridArea="email">
                  <label className="ModelHeader">Email:</label>
                  <StyledInput {...register("email")} />
                </StyledLabelInputPair>
                <StyledLabelInputPair gridArea="age">
                  <label className="ModelHeader">Age:</label>
                  <StyledInput {...register("age")} />
                </StyledLabelInputPair>
                <StyledButtonContainer>
                  <StyledGridButton type="submit">
                    {editingUser ? "Update" : "Submit"}
                  </StyledGridButton>
                  <StyledGridButton onClick={closeModalAndClearForm}>
                    Cancel
                  </StyledGridButton>
                </StyledButtonContainer>
              </StyledForm>
            </StyledModal>
          )}
          <StyledTable>
            <thead className="table-header">
              <tr>
                <td className="TableHeader">Name</td>
                <td className="TableHeader">Surname</td>
                <td className="TableHeader">Email</td>
                <td className="TableHeader">Age</td>
                <td className="TableHeader"></td>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user._id}>
                  {editingUser === user._id ? (
                    <>
                      <td>
                        <StyledInput
                          {...register("name")}
                          defaultValue={user.name}
                        />
                      </td>
                      <td>
                        <StyledInput
                          {...register("surname")}
                          defaultValue={user.surname}
                        />
                      </td>
                      <td>
                        <StyledInput
                          {...register("email")}
                          defaultValue={user.email}
                        />
                      </td>
                      <td>
                        <StyledInput
                          {...register("age")}
                          defaultValue={user.age}
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td data-label="Name">{user.name}</td>
                      <td data-label="Surname">{user.surname}</td>
                      <td data-label="Email">{user.email}</td>
                      <td data-label="Age">{user.age}</td>
                    </>
                  )}
                  <td>
                    {editingUser === user._id ? (
                      <>
                        <StyledButton onClick={() => saveChanges(user._id)}>
                          Save
                        </StyledButton>
                        <StyledButton onClick={() => setEditingUser(null)}>
                          Cancel
                        </StyledButton>
                      </>
                    ) : (
                      <>
                        <StyledButton onClick={() => editUser(user._id)}>
                          Edit
                        </StyledButton>
                        <StyledButton onClick={() => deleteUser(user._id)}>
                          Delete
                        </StyledButton>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </>
      )}
    </>
  );
};

export default UsersListOrg;
