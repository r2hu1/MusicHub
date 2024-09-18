import NextProvider from "@/components/next-provider";
import Footer from "@/components/page/footer";
import Header from "@/components/page/header";

export default function RootLayout({ children }) {
    return (
        <main>
            <Header />
            <NextProvider>
                {children}
            </NextProvider>
            <Footer />
        </main>
    )
}