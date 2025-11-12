import { useState } from "react"
import Modal from "../components/Modal"

function Continentes() {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <>
            <div className="w-full flex justify-center mt-6">
                <div className="w-8/10 flex justify-between">
                    <div className="text-2xl font-semibold">Continentes Cadastrados</div>
                    <button onClick={() => setOpen(true)} className="bg-emerald-600 rounded-lg px-4 py-2 text-stone-50 flex items-center transition duration-300 ease-in-out hover:cursor-pointer hover:bg-emerald-500">Novo continente + </button>
                </div>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <div className="w-140">
                        <div className=" py-4 border-b border-b-gray-300 mb-6">
                            <h1 className="text-lg font-semibold">Cadastrar Novo Continente</h1>
                        </div>
                        <div>
                            <form action="">
                                <div className="flex flex-col">
                                    <label className="mb-1" htmlFor="nome">Nome</label>
                                    <input className="border border-gray-400 h-10 pl-2 mb-4 rounded-lg focus:outline-hidden focus:border-emerald-600" type="text" id="nome" placeholder="Ex: América   "/>
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1" htmlFor="desc">Descricao</label>
                                    <textarea className="border border-gray-400 h-20 pl-2 pt-2 rounded-lg  focus:outline-hidden focus:border-emerald-600" name="desc" id="desc" placeholder="Uma breve descricao do continente"></textarea>
                                </div>
                                <div className="flex justify-center items-center mt-8">
                                    <button className="bg-emerald-600 rounded-lg px-4 py-2 text-stone-50 flex items-center transition font-semibold duration-300 ease-in-out hover:cursor-pointer hover:bg-emerald-500 hover:-translate-y-0.5 active:translate-y-0" type="submit">
                                        Cadastrar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default Continentes