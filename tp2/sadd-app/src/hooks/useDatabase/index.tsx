import { log } from "console";
import React, { useEffect, useState } from "react";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fazendo uma requisição GET para a API
    fetch("http://localhost:3001/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Erro ao buscar usuários:", error));
  }, []);

  return { users };
}

export default UserList;
