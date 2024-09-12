import type { Metadata } from "next";
import AppBarComponent from "@/components/AppBarComponent";
import ClientThemeProvider from "@/utils/ClientThemeProvider";
import StoreProvider from "@/utils/StoreProvider";
import SnackBar from "@/components/SnackBarComponent";
import "./globals.css";

export const metadata: Metadata = {
  title: "Avaliação FullStack Drag and Drop",
  description: "Aplicação com intuito de demonstrar habilidades full-stack, envolvendo o uso de uma lista to-do com drag and drop.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <SnackBar />
          <ClientThemeProvider>
            <AppBarComponent />
            <main>{children}</main>
          </ClientThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
