import { AuthContext } from "../context";
import { useContext, useDebugValue } from "react";

export default function useAuth() {
  const auth = useContext(AuthContext);
  useDebugValue(auth, (auth) => (auth?.user ? "Logged In" : "Logged Out"));

  return useContext(AuthContext);
}
