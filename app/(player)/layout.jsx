import Footer from "@/components/page/footer";
import Header from "@/components/page/header";
import NextProvider from "@/components/providers/next-provider";

export default function RootLayout({ children }) {
  return (
    <main>
      <NextProvider>
        <Header />
        {children}
      </NextProvider>
      <Footer />
    </main>
  );
}
