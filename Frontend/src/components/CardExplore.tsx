import { GlobeAsiaAustraliaIcon } from "@heroicons/react/16/solid"

function CardExplore() {
    return (
        <>
            <div className="inline-block py-10 px-6 rounded-2xl shadow-xl">
                <div className="flex justify-center mb-2">
                    <div className="rounded-full bg-emerald-500 inline-block p-2">
                        <GlobeAsiaAustraliaIcon className="w-8 h-8 fill-emerald-900" />
                    </div>
                </div>
                <div className="flex justify-center font-semibold mb-2">Continentes</div>
                <div className="flex justify-center mb-3 text-sm">Visualize e gerencie os continentes</div>
                <hr className="mb-3" />
                <div className="flex justify-center">
                    <a className="rounded-xl px-2 py-1 text-emerald-700 text-md font-semibold duration-200 ease-in-out hover:bg-emerald-700 hover:text-emerald-50" href="">Explorar</a>
                </div>
            </div>
        </>
    )
}

export default CardExplore