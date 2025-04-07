import { Poppins } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // adjust as needed
  variable: "--font-poppins",
  display: "swap",
});
