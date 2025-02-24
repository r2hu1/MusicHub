import Player from "@/components/cards/player";
import Footer from "@/components/page/footer";
import Header from "@/components/page/header";
import Search from "@/components/page/search";

export default function RootLayout({ children }) {
    return (
        <main>
            <Header />
            <div className="px-6 sm:hidden mb-4">
                <Search />
            </div>
            {children}
            <Player />
            <Footer />
        </main>
    )
}