import { useState } from "react"


export const useToken = () => {
  const getToken = () => {
    const getString: any = localStorage.getItem("token");
    const userToken = JSON.parse(getString);

    return userToken?.email;
  };

  const [token, setToken] = useState<React.SetStateAction<string | null>>(getToken());

  const saveToken = (userToken: any) => {
    localStorage.setItem("token", JSON.stringify(userToken));

    setToken(userToken.email);
  };

  const deleteToken = () => {
    localStorage.removeItem("token");

    setToken(null);
  };

  return { token, setToken: saveToken, deleteToken } as const;
}