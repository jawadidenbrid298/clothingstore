import {ABeeZee} from 'next/font/google';
import '../globals.css';

const abeezee = ABeeZee({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap'
});

export default function RootLayout({children}) {
  return (
    <html lang='en'>
      <body className={`${abeezee.className} bg-white flex flex-col`}>{children}</body>
    </html>
  );
}
