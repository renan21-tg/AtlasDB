import React, { useEffect, useState } from "react"
import { api } from "../services/api"
import axios from "axios"
import Modal from "../components/Modal"
import CidadeTable from "../components/CidadeTable"

interface Pais {
    pai_id: number
    pai_nome: string
}

function Cidades() {
    const [open, setOpen] = useState<boolean>(false)
    const [nome, setNome] = useState('')
    const [populacao, setPopulacao] = useState('')
    const [paisId, setPaisId] = useState('')
    const [message, setMessage] = useState('')
    const [paises, setPaises] = useState<Pais[]>([])
    const [refreshTable, setRefreshTable] = useState(false)

    // Busca paises para o Select do formulário
    const fetchPaises = async () => {
        try {
            const response = await api.get<Pais[]>('/pais')
            setPaises(response.data)
        } catch (error) {
            console.error("Erro ao buscar países", error)
        } 
    }

    useEffect(() => {
        fetchPaises()
    }, [])

    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault()
        setMessage("")
        
        // Converte para os tipos esperados pelo Backend
        const cidadeData = { 
            nome, 
            populacao: Number(populacao),
            paisId: Number(paisId) 
        }

        try {
            const response = await api.post('/cidade', cidadeData)

            setMessage(`Cidade ${response.data.cid_nome} cadastrada com sucesso!`)
            setNome("")
            setPopulacao("")
            setPaisId("")
            setOpen(false)
            setRefreshTable((prev) => !prev) // Força atualização da tabela
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setMessage(`Erro: ${error.response.data.message || "Tente Novamente"}`)
            } else {
                setMessage("Não foi possível conectar ao servidor")
            }
            console.error("Erro no cadastro:", error)
        }
    }

    return (
        <>
            <div className="w-full flex items-center flex-col mt-6">
                <div className="w-9/10 flex justify-between mb-4">
                    <div className="text-2xl font-semibold">Cidades Cadastradas</div>
                    <button onClick={() => setOpen(true)} className="bg-emerald-600 rounded-lg px-4 py-2 text-stone-50 flex items-center transition duration-300 ease-in-out hover:cursor-pointer hover:bg-emerald-500">Nova cidade + </button>
                </div>
                
                <div className="w-8/10 mb-5">
                    <input className="w-full px-5 py-2 rounded-full border border-gray-400" type="text" placeholder="Busque por uma cidade específica"/>
                </div>

                <div className="w-9/10">
                    <CidadeTable refresh={refreshTable} />
                </div>

                <Modal open={open} onClose={() => setOpen(false)}>
                    <div className="w-140">
                        <div className="py-4 border-b border-b-gray-300 mb-6">
                            <h1 className="text-lg font-semibold">Cadastrar Nova Cidade</h1>
                        </div>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col mb-4">
                                    <label className="mb-1" htmlFor="nome">Nome</label>
                                    <input 
                                        className="border border-gray-400 h-10 pl-2 rounded-lg focus:outline-hidden focus:border-emerald-600" 
                                        value={nome} 
                                        type="text" 
                                        id="nome" 
                                        placeholder="Ex: São Paulo"
                                        onChange={(e) => setNome(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="flex flex-col mb-4">
                                    <label className="mb-1" htmlFor="populacao">População</label>
                                    <input 
                                        className="border border-gray-400 h-10 pl-2 rounded-lg focus:outline-hidden focus:border-emerald-600" 
                                        value={populacao} 
                                        type="number" 
                                        id="populacao" 
                                        placeholder="Ex: 12000000"
                                        onChange={(e) => setPopulacao(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="mb-1" htmlFor="paisId">País</label>
                                    <select 
                                        value={paisId} 
                                        onChange={(e) => setPaisId(e.target.value)}
                                        className="border border-gray-400 h-10 pl-2 rounded-lg focus:outline-hidden focus:border-emerald-600"  
                                        name="pais" 
                                        id="paisId"
                                        required
                                    >
                                        <option value="">Selecione um país</option>
                                        {paises.map((pais) => (
                                            <option key={pais.pai_id} value={pais.pai_id}>
                                                {pais.pai_nome}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex justify-center items-center mt-8">
                                    <button className="bg-emerald-600 rounded-lg px-4 py-2 text-stone-50 flex items-center transition font-semibold duration-300 ease-in-out hover:cursor-pointer hover:bg-emerald-500 hover:-translate-y-0.5 active:translate-y-0" type="submit">
                                        Cadastrar
                                    </button>
                                </div>
                                {message && <p className="text-center mt-4 hidden text-red-600">{message}</p>}
                            </form>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default Cidades