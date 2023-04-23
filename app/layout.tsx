import Navbar from "./Components/Navbar/Navbar";
import { Nunito } from "next/font/google";
import "./globals.css";
import RegisterModal from "./Components/Modals/RegisterModal";
import LoginModal from "./Components/Modals/LoginModal";
import ToasterProvider from "./Providers/ToasterProvider";
import getCurrentUser from "./Actions/getCurrentUser";
import RentModal from "./Components/Modals/RentModal";

export const metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <Navbar currentUser={currentUser} />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <div className="pb-20 pt-20">{children}</div>
      </body>
    </html>
  );
}
