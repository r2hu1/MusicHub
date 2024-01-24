import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Search from "@/components/Search";

export default function RootLayout({ children }) {
    return (
        <main>
            <Header/>
            {/* <Search/> */}
            {children}
            <Footer/>
        </main>
    )
}