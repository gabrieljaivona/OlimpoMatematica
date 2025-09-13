import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" >
      <body className="bg-[#F5F5F5] flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow max-w-screen-xl mx-auto p-8 w-full bg-white shadow-md">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}
