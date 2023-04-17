import Navbar from "./Components/Navbar/Navbar";
import { Nunito } from "next/font/google";
import "./globals.css";
import RegisterModal from "./Components/Modals/RegisterModal";
import LoginModal from "./Components/Modals/LoginModal";
import ToasterProvider from "./Providers/ToasterProvider";

export const metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <Navbar />
        <LoginModal />
        <RegisterModal />
        {children}
      </body>
    </html>
  );
}
