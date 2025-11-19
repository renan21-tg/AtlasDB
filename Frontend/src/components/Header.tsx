import { GlobeEuropeAfricaIcon } from "@heroicons/react/16/solid"
import { Link } from "react-router-dom"

function Header() {
    return (
        <>
            <header className="w-full h-auto md:h-20 border-b border-gray-300 flex justify-center items-center py-4 md:py-0">
                <div className="w-11/12 md:w-9/10 h-full flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <GlobeEuropeAfricaIcon className="w-9 h-9 fill-emerald-700 mr-2" />
                            <p className="text-xl font-bold">AtlasDB</p>
                        </Link>
                    </div>

                    <nav className="w-full md:w-auto">
                        <ul className="w-full list-none flex justify-center gap-6 md:gap-8">
                            <li className="hover:scale-110 hover:text-emerald-900 duration-200 ease-in-out">
                                <Link to="/continentes">Continentes</Link>
                            </li>
                            <li className="hover:scale-110 hover:text-emerald-900 duration-200 ease-in-out">
                                <Link to="/paises">Países</Link>
                            </li>
                            <li className="hover:scale-110 hover:text-emerald-900 duration-200 ease-in-out">
                                <Link to="/cidades">Cidades</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Header