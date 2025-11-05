import { GlobeEuropeAfricaIcon } from "@heroicons/react/16/solid"

function Navbar() {
    return (
        <>
            <header className="w-full h-20 border border-b-gray-300 flex justify-center items-center">
                <div className="w-9/10 h-full flex justify-between">
                    <div className="flex items-center">
                        <GlobeEuropeAfricaIcon className="w-9 h-9  fill-orange-500 mr-2" />
                        <p className="text-xl font-bold">AtlasDB</p>
                    </div>

                    <nav className="w-60 flex items-center">
                        <ul className="w-full list-none flex justify-around">
                            <div className="hover:scale-110 hover:text-orange-500 duration-200 ease-in-out">
                                <li><a href="#" className=" ">Continentes</a></li>
                            </div>
                            <div className="hover:scale-110 hover:text-orange-500 duration-200 ease-in-out">
                                <li><a href="#" className="hover:text-orange-500 ease-linear">Países</a></li>
                            </div>
                            <div className="hover:scale-110 hover:text-orange-500 duration-200 ease-in-out">
                                <li><a href="#" className="hover:text-orange-500 ease-linear" >Cidades</a></li>
                            </div>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Navbar

