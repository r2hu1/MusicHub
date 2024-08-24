import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Search from "@/components/Search";

export default function RootLayout({ children }) {
    return (
        <main>
            <Header />
            <div className="md:hidden block px-6 mb-2">
                <Search />
            </div>
            {children}
            <Footer />
        </main>
    )
}