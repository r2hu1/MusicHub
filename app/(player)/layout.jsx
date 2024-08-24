import Footer from "@/components/page/footer";
import Header from "@/components/page/header";

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