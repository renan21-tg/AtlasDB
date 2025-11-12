import CardExplore from "../components/CardExplore"
import Footer from "../components/Footer"

function Home() {
    return (
        <>
            <section>
                <div className="h-[75vh] w-full bg-cover flex justify-center items-center mb-8 bg-[url(https://images.unsplash.com/photo-1661705969607-cde73828023d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFwZWwlMjBkZSUyMHBhcmVkZSUyMHRlcnJhfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000)]"> 
                    <div className="flex flex-col items-center">
                        <div className="text-8xl text-shadow-lg/40 text-shadow-black text-teal-50 font-semibold italic mb-3">Atlas DB</div>
                        <p className="mb-24 text-xl text-emerald-600 text-shadow-emerald-900 text-shadow-md">Gerencie e explore informações geográficas com facilidade.</p>
                    </div>
                </div>
            </section>

            <section>
                <div className="flex justify-center mb-10">
                    <div className="inline-block border-b-black border-b-2 px-10">
                        <h1 className="text-2xl font-semibold">Acesso Rápido</h1>
                    </div>
                </div>
                <div className="flex justify-around">
                    <CardExplore />
                    <CardExplore />
                    <CardExplore />
                </div>
            </section>

            <Footer />
        </>
    )
}

export default  Home