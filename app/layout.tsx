import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'telegram archive.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <footer>
          <hr></hr>
          <div className="flex flex-row gap-x-4 items-center m-4">
            <a className="text-sm text-white" href="">
            telegram archive.
            </a>
            <p className="text-sm text-gray-100">
              I do not claim any copyright to the displayed pictures.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}