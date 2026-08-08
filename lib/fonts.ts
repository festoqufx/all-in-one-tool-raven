// lib/fonts.ts
import {
    Inter as FontSans,
    Noto_Serif as FontSerif,
    Noto_Sans_Bengali as FontSansBengali,
    Noto_Serif_Bengali as FontSerifBengali,
    Anek_Bangla as FontAnekBangla,
} from "next/font/google";
import localFont from "next/font/local";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

// Define font configurations
const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

const fontSerif = FontSerif({
    subsets: ["latin"],
    variable: "--font-serif",
});

const fontSansBengali = FontSansBengali({
    subsets: ["bengali"],
    variable: "--font-sans-bengali",
});

const fontSerifBengali = FontSerifBengali({
    subsets: ["bengali"],
    variable: "--font-serif-bengali",
});

const fontAnekBangla = FontAnekBangla({
    subsets: ["bengali"],
    variable: "--font-anek-bangla",
});

// Define font variables
export const fonts = {
    fontSans,
    fontSerif,
    fontSansBengali,
    fontSerifBengali,
    fontAnekBangla,
    geistSans,
    geistMono,
};

// Export individual font variables with descriptive names
export const textSans = fontSans.variable;
export const textSerif = fontSerif.variable;
export const textSansBengali = fontSansBengali.variable;
export const textSerifBengali = fontSerifBengali.variable;
export const textAnekBangla = fontAnekBangla.variable;
export const textGeistSans = geistSans.variable;
export const textGeistMono = geistMono.variable;

export const fontVariables = {
    textSans,
    textSerif,
    textSansBengali,
    textSerifBengali,
    textAnekBangla,
    textGeistSans,
    textGeistMono,
} 