import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Search from "@/components/Search";

export default function RootLayout({ children }) {
    return (
        <main>
            <div className="absolute inset-0 -z-10 h-[340px] w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-10 blur-[100px]"></div></div>
            <Header />
            <div className="md:hidden block px-6">
                <Search />
            </div>
            {children}
            <Footer />
        </main>
    )
}