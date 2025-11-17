import React, { useState } from "react"
import Modal from "../components/Modal"
import { api } from "../services/api"
import axios from "axios"
import ContinenteTable from "../components/ContinenteTable"

function Continentes() {
    const [open, setOpen] = useState<boolean>(false)
    const [nome, setNome] = useState('')
    const [desc, setDesc] = useState('')
    const [message, setMessage] = useState('')
    const [refreshTable, setRefreshTable] = useState(false)

    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault()
        setMessage("")
        const continenteData = { nome, desc }

        try {
            const response = await api.post('/continente', continenteData)

            setMessage(`Continente ${response.data.nome} cadastrado com sucesso!`)
            setNome("")
            setDesc("")
            setOpen(false)
            setRefreshTable((prev) => !prev)
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setMessage(`Erro: ${error.response.data.message || "Tente Novamente"}`)
            } else {
                setMessage("Nao foi possivel conectar ao servidor")
            }
            console.error("Erro no cadastro:", error)
        }
    }

    return (
        <>
            <div className="w-full flex items-center flex-col mt-6">
                <div className="w-9/10 flex justify-between mb-4">
                    <div className="text-2xl font-semibold">Continentes Cadastrados</div>
                    <button onClick={() => setOpen(true)} className="bg-emerald-600 rounded-lg px-4 py-2 text-stone-50 flex items-center transition duration-300 ease-in-out hover:cursor-pointer hover:bg-emerald-500">Novo continente + </button>
                </div>
                <div className="w-8/10 mb-5">
                    <input className="w-full px-5 py-2 rounded-full border border-gray-400" type="text" placeholder="Busque por um continente especifico"/>
                </div>
                <div className="w-9/10">
                    <ContinenteTable refresh={refreshTable}/>
                </div>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <div className="w-140">
                        <div className=" py-4 border-b border-b-gray-300 mb-6">
                            <h1 className="text-lg font-semibold">Cadastrar Novo Continente</h1>
                        </div>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <label className="mb-1" htmlFor="nome">Nome</label>
                                    <input 
                                        className="border border-gray-400 h-10 pl-2 mb-4 rounded-lg focus:outline-hidden focus:border-emerald-600" 
                                        value={nome} 
                                        type="text" 
                                        id="nome" 
                                        placeholder="Ex: América"
                                        onChange={(e) => setNome(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1" htmlFor="desc">Descricao</label>
                                    <textarea 
                                        className="border border-gray-400 h-20 pl-2 pt-2 rounded-lg  focus:outline-hidden focus:border-emerald-600" 
                                        value={desc} 
                                        name="desc" 
                                        id="desc" 
                                        placeholder="Uma breve descricao do continente"
                                        onChange={(e) => setDesc(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <div className="flex justify-center items-center mt-8">
                                    <button className="bg-emerald-600 rounded-lg px-4 py-2 text-stone-50 flex items-center transition font-semibold duration-300 ease-in-out hover:cursor-pointer hover:bg-emerald-500 hover:-translate-y-0.5 active:translate-y-0" type="submit">
                                        Cadastrar
                                    </button>
                                </div>
                                {message && <p className="text-center mt-4 hidden">{message}</p>}
                            </form>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default Continentes