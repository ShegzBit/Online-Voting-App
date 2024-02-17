// import { Inter } from "next/font/google";
import Navbar from "@/app/components/core/Navbar";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datetime/css/react-datetime.css";
import { UserProvider } from "./contexts/userContext";
import { ElectionsProvider } from "./contexts/electionsContext";
import { ElectionProvider } from "./contexts/electionsContext";


// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PollMaster",
  description: "Online voting platform for your elections",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <UserProvider>
          <ElectionsProvider>
            <ElectionProvider>
            <Navbar />
            {children}
          </ElectionProvider>
          </ElectionsProvider>
        </UserProvider>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous" async></script>
      </body>
    </html>
  );
}
