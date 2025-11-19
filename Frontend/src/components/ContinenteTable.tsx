import { useEffect, useState, type FormEvent } from "react"
import { api } from "../services/api"
import { PencilSquareIcon, TrashIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid"
import Modal from "./Modal"

interface Continente {
    con_id: number
    con_nome: string
    con_descricao: string
}

interface ContinenteTableProps {
    refresh: boolean
    searchTerm: string
    orderBy: string
}

function ContinenteTable({ refresh, searchTerm, orderBy }: ContinenteTableProps) {
    const [continentes, setContinentes] = useState<Continente[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [open, setOpen] = useState<boolean>(false)
    const [id, setId] = useState<number | null>(null)
    const [nome, setNome] = useState<string>("")
    const [desc, setDesc] = useState<string>("")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    const fetchContinentes = async () => {
        try {
            const response = await api.get<Continente[]>('/continente')
            setContinentes(response.data)
        } catch (error) {
            setError("Erro ao carregar dados")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, orderBy])

    const handleRemove = async (id: number) => {
        const confirm = window.confirm("Tem certeza que deseja excluir este continente?")
        if (!confirm) return
        try {
            await api.delete(`/continente/${id}`)
            setContinentes(continentes.filter(item => item.con_id !== id))
        } catch (error) {
            console.error(error)
        }
    }

    const handleEdit = async (continente: Continente) => {
        setId(continente.con_id)
        setNome(continente.con_nome)
        setDesc(continente.con_descricao)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setNome("")
        setId(null)
        setDesc("")
    }

    const handleUpdate = async (e: FormEvent) => {
        e.preventDefault()
        if (!id) return
        try {
            await api.put(`/continente/${id}`, { nome: nome, desc: desc })
            handleClose()
            fetchContinentes()
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchContinentes()
    }, [refresh])

    const filteredContinentes = continentes
        .filter((continente) => 
            continente.con_nome.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (orderBy === "nome") return a.con_nome.localeCompare(b.con_nome)
            if (orderBy === "id_desc") return b.con_id - a.con_id
            return a.con_id - b.con_id
        })

    const totalPages = Math.ceil(filteredContinentes.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const currentItems = filteredContinentes.slice(startIndex, startIndex + itemsPerPage)

    if (loading) return <p className="text-center mt-4">Carregando tabela...</p>
    if (error) return <p className="text-center mt-4 text-red-500">{error}</p>

    return (
        <>
            <div className="rounded-lg border border-gray-300 shadow-sm overflow-hidden overflow-x-auto">
                <table className="w-full min-w-[600px] divide-y divide-gray-200">
                    <thead className="bg-gray-200 text-justify">
                        <tr>
                            <th className="py-3 px-8 font-medium">Nome</th>
                            <th className="py-3 px-2 font-medium">Descricao</th>
                            <th className="py-3 px-2 font-medium">Acoes</th>
                        </tr>
                    </thead>
                    <tbody className="text-justify bg-white">
                        {currentItems.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="py-8 text-center text-gray-500">
                                    {continentes.length === 0 ? "Não há Continentes cadastrados" : "Nenhum resultado encontrado"}
                                </td>
                            </tr>
                        ) : (
                            currentItems.map((continente) => (
                                <tr key={continente.con_id} className="hover:bg-gray-100 border-b border-gray-300">
                                    <td className="py-8 px-8">{continente.con_nome}</td>
                                    <td className="py-8 px-2">{continente.con_descricao}</td>
                                    <td className="py-8 px-2">
                                        <div className="w-full flex items-center">
                                            <button onClick={() => handleRemove(continente.con_id)} className="rounded-full p-1 mr-2 cursor-pointer transition duration-200 hover:bg-red-200" title="Excluir">
                                                <TrashIcon className="w-5 h-5 fill-red-600" />
                                            </button>
                                            <button onClick={() => handleEdit(continente)} className="rounded-full p-1 cursor-pointer transition duration-200 hover:bg-sky-200" title="Editar">
                                                <PencilSquareIcon className="w-5 h-5 fill-sky-600" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {filteredContinentes.length > 0 && (
                <div className="flex justify-between items-center mt-4 px-2">
                    <span className="text-sm text-gray-600">
                        Página {currentPage} de {totalPages}
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                        >
                            <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
                        </button>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="p-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                        >
                            <ChevronRightIcon className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>
            )}
            
            <Modal open={open} onClose={handleClose}>
                <div className="w-140">
                    <div className=" py-4 border-b border-b-gray-300 mb-6">
                        <h1 className="text-lg font-semibold">Atualizar dados do Continente</h1>
                    </div>
                    <div>
                        <form onSubmit={handleUpdate}>
                            <div className="flex flex-col">
                                <label className="mb-1" htmlFor="nome">Nome</label>
                                <input
                                    className="border border-gray-400 h-10 pl-2 mb-4 rounded-lg focus:outline-hidden focus:border-emerald-600"
                                    type="text" id="nome" placeholder="Ex: América" required value={nome} onChange={(e) => setNome(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1" htmlFor="desc">Descricao</label>
                                <textarea
                                    className="border border-gray-400 h-20 pl-2 pt-2 rounded-lg  focus:outline-hidden focus:border-emerald-600"
                                    name="desc" id="desc" placeholder="Uma breve descricao do continente" required value={desc} onChange={(e) => setDesc(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="flex justify-center items-center mt-8">
                                <button className="bg-emerald-600 rounded-lg px-4 py-2 text-stone-50 flex items-center transition font-semibold duration-300 ease-in-out hover:cursor-pointer hover:bg-emerald-500 hover:-translate-y-0.5 active:translate-y-0" type="submit">
                                    Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ContinenteTable