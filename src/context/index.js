import { InitialDataProvider } from "./initialContext";

export const Providers = ({ children }) => {
  return <InitialDataProvider>{children}</InitialDataProvider>;
};
