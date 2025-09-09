import DownloadProgressProvider from "@/components/download-progress";
import NextProvider from "@/components/next-provider";
import Footer from "@/components/page/footer";
import Header from "@/components/page/header";

export default function RootLayout({ children }) {
  return (
    <main>
      <NextProvider>
        <DownloadProgressProvider>
          <Header />
          {children}
        </DownloadProgressProvider>
      </NextProvider>
      <Footer />
    </main>
  );
}
