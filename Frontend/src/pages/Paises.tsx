import { useEffect, useState } from "react"
import { api } from "../services/api"
import axios from "axios"
import Modal from "../components/Modal"
import PaisTable from "../components/PaisTable"

interface Continente {
    con_id: number
    con_nome: string
    con_descricao: string
}

function Paises () {
    const [open, setOpen] = useState<boolean>(false)
    const [nome, setNome] = useState('')
    const [continenteId, setContinenteId] = useState('')
    const [message, setMessage] = useState('')
    const [continentes, setContinentes] = useState<Continente[]>([])
    const [refreshTable, setRefreshTable] = useState(false)

    const fetchContinentes = async () => {
        try {
            const response = await api.get<Continente[]>('/continente')
    
            setContinentes(response.data)
        } catch (error) {
            console.error(error)
        } 
    }

    useEffect(() => {
            fetchContinentes()
        }, [])

    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault()
        setMessage("")
        const paisData = { nome, continenteId:Number(continenteId) }

        try {
            const response = await api.post('/pais', paisData)

            setMessage(`${response.data.nome} cadastrado com sucesso`)
            setNome("")
            setContinenteId("")
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
                    <div className="text-2xl font-semibold">Paises Cadastrados</div>
                    <button onClick={() => setOpen(true)} className="bg-emerald-600 rounded-lg px-4 py-2 text-stone-50 flex items-center transition duration-300 ease-in-out hover:cursor-pointer hover:bg-emerald-500">Novo país + </button>
                </div>
                <div className="w-8/10 mb-5">
                    <input className="w-full px-5 py-2 rounded-full border border-gray-400" type="text" placeholder="Busque por um pais especifico"/>
                </div>
                <div className="w-9/10">
                    <PaisTable refresh={refreshTable} />
                </div>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <div className="w-140">
                        <div className=" py-4 border-b border-b-gray-300 mb-6">
                            <h1 className="text-lg font-semibold">Cadastrar Novo País</h1>
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
                                        placeholder="Ex: Brasil"
                                        onChange={(e) => setNome(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1" htmlFor="contineteId">Contienete que pertence</label>
                                    <select 
                                        value={continenteId} 
                                        onChange={(e) => setContinenteId(e.target.value)}
                                        className="border border-gray-400 h-10 pl-2 mb-4 rounded-lg focus:outline-hidden focus:border-emerald-600"  
                                        name="continentes" 
                                        id="continenteId"
                                        required
                                    >
                                        <option value="">Selecione um continente</option>
                                        {continentes.map((continente) => (
                                            <option key={continente.con_id} value={continente.con_id}>
                                                {continente.con_nome}
                                            </option>
                                        ))}
                                    </select>
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

export default Paises