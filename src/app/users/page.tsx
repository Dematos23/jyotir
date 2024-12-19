"use client";

import { useEffect, useState } from "react";
import { getUsers } from "../../services/users.service";
import { useRouter } from "next/navigation";
import UserOverlay from "../../components/UserOverlay";
import Loading from "@/components/Loading";
import NewUserOverlay from "@/components/NewUserOverlay";
import NewUserSuccessOverlay from "@/components/NewUserSuccessOverlay";
import NewPasswordOverlay from "@/components/NewPasswordOverlay";
import { User, NewUser } from "../../types/types";
import { getPropertyIndex } from "../../utils/getPropertyIndex";
import Table from "@/components/Table";
import { useLoginContext } from "@/context/loginContext";

export default function Users() {
  const initialUserState: NewUser = {
    id: "",
    name: "",
    lastname: "",
    spiritualName: undefined,
    email: "",
    role: "",
    state: "ACTIVO",
    password: "",
  };

  const { session } = useLoginContext();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [showNewUserOverlay, setNewUserShowOverlay] = useState<boolean>(false);
  const [showNewUserOverlaySuccess, setNewUserShowOverlaySuccess] =
    useState<boolean>(false);
  const [showNewPasswordOverlay, setShowNewPasswordOverlay] =
    useState<boolean>(false);
  const [newUser, setNewUser] = useState<NewUser>(initialUserState);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [headers, setHeaders] = useState<
    { head: string; location: number | undefined }[]
  >([]);
  const [thInRowHeaders, setTnInRowHeaders] = useState<
    {
      head: string;
      location: number | undefined;
    }[]
  >([]);

  const router = useRouter();

  const handleUsers = async () => {
    try {
      const data = await getUsers();
      const Headers = [
        {
          head: "Nombre espiritual",
          location: getPropertyIndex(data[0], "spiritualName"),
        },
        { head: "Email", location: getPropertyIndex(data[0], "email") },
        { head: "Rol", location: getPropertyIndex(data[0], "role") },
        { head: "Estado", location: getPropertyIndex(data[0], "state") },
      ];
      setHeaders(Headers);

      const ThInRow = [
        { head: "Nombre", location: getPropertyIndex(data[0], "name") },
        { head: "Apellido", location: getPropertyIndex(data[0], "lastname") },
      ];
      setTnInRowHeaders(ThInRow);

      data.map((user) => {
        if (user.spiritualName === null) {
          user.spiritualName = "";
        }
        if (user.role === "SUPER_ADMIN") {
          user.role = "Super Administrador";
        }
        if (user.role === "ADMIN") {
          user.role = "Administrador";
        }
        if (user.role === "EXTERNO") {
          user.role = "Externo";
        }
        if (user.state === "ACTIVO") {
          user.state = "Activo";
        }
        if (user.state === "INACTIVO") {
          user.state = "Inactivo";
        }
      });
      data.sort((a, b) => a.name.localeCompare(b.name));
      setUsers(data);
      setLoading(false);
    } catch (error) {
      throw new Error();
    }
  };

  const openNewUserOverlay = () => {
    setNewUserShowOverlay(true);
  };
  const closeNewUserOverlay = () => {
    setNewUserShowOverlay(false);
  };
  const openNewUserSuccessOverlay = () => {
    setNewUserShowOverlaySuccess(true);
  };
  const closeNewUserSuccessOverlay = () => {
    setNewUserShowOverlaySuccess(false);
  };

  const showNewPassword = () => {
    setShowNewPasswordOverlay(true);
  };
  const closeNewPasswordOverlay = () => {
    setShowNewPasswordOverlay(false);
  };

  const storeNewUser = (newUser: NewUser) => {
    setNewUser(newUser);
  };

  const handleEdit = (user: User | null) => {
    if (user) {
      setShowOverlay(true);
      setSelectedUser(user);
    }
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };
  useEffect(() => {
    const role = session.user.role;
    role === "SUPER_ADMIN" || role === "DEV" ? handleUsers() : router.push("/");
  }, [router]);

  if (loading) return <Loading loading={loading} />;

  return (
    <div className="">
      <button
        className="mx-8 rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={openNewUserOverlay}
      >
        Nuevo Usuario
      </button>
      <Table
        data={users}
        headers={headers}
        isThInRow={true}
        thInRowHeaders={thInRowHeaders}
        isColumnButton={true}
        columnButtonFunction={handleEdit}
      />
      {selectedUser ? (
        <UserOverlay
          user={selectedUser}
          open={showOverlay}
          onClose={handleCloseOverlay}
          updateParent={handleUsers}
          onReset={showNewPassword}
          storeNewUser={storeNewUser}
        />
      ) : null}
      <NewUserOverlay
        open={showNewUserOverlay}
        onClose={closeNewUserOverlay}
        updateParent={handleUsers}
        storeNewUser={storeNewUser}
        onSuccess={openNewUserSuccessOverlay}
      />
      <NewUserSuccessOverlay
        open={showNewUserOverlaySuccess}
        onClose={closeNewUserSuccessOverlay}
        newUser={newUser}
      />
      <NewPasswordOverlay
        open={showNewPasswordOverlay}
        onClose={closeNewPasswordOverlay}
        newUser={newUser}
      />
    </div>
  );
}
