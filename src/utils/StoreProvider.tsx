"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store"; // Adjust the import path to your actual store location

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
