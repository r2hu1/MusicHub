import Footer from "@/components/page/footer";
import Header from "@/components/page/header";
import Search from "@/components/page/search";

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