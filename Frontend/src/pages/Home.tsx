import Navbar from "../components/Navbar"

function Home() {
    return (
        <>
            <Navbar />
            <section>
                <div className="h-[75vh] w-full bg-cover flex justify-center items-center bg-[url(https://images.unsplash.com/photo-1661705969607-cde73828023d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFwZWwlMjBkZSUyMHBhcmVkZSUyMHRlcnJhfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000)]"> 
                    <div className="flex flex-col items-center">
                        <div className="text-8xl text-shadow-lg/40 text-shadow-black text-teal-50 font-semibold italic mb-3">Atlas DB</div>
                        <p className="mb-16 text-xl text-emerald-600 text-shadow-emerald-900 text-shadow-md">Gerencie e explore informações geográficas com facilidade.</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default  Home