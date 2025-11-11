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
        
        <main className="">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}
