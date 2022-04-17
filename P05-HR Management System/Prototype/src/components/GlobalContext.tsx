import { createContext, useContext } from "react";
export type GlobalContent = {
  loggedIn: boolean;
  setLoggedIn: (c: boolean) => void;
};
export const MyGlobalContext = createContext<GlobalContent>({
  loggedIn: false, // set a default value
  setLoggedIn: () => {},
});
export const useGlobalContext = () => useContext(MyGlobalContext);
