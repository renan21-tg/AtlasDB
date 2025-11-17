import { useEffect, useState } from "react"
import { api } from "../services/api"
import { MapIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid"

interface Continente  {
    con_id: number
    con_nome: string
    con_descricao: string
}

interface ContinenteTableProps {
    refresh: boolean
}

function ContinenteTable ( { refresh }:ContinenteTableProps) {
    const [continentes, setContinentes] = useState<Continente[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)


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

    const handleRemove = async (id: number) => {
        const confirm = window.confirm("Tem certeza que deseja exluir este continente?")
        if (!confirm) return
        try {
            await api.delete(`/continente/${id}`)
            setContinentes(continentes.filter(item => item.con_id !== id))
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchContinentes()
    }, [refresh])

    if(loading) return <p>Carregando tabela</p>
    if(error) return <p>{error}</p>
    
    return (
        <>
        <div className="rounded-lg border border-gray-300 shadow-sm overflow-hidden">
            <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-200 text-justify">
                    <tr>
                        <th className="py-3 px-8 font-medium">Nome</th>
                        <th className="py-3 px-2 font-medium">Descricao</th>
                        <th className="py-3 px-2 font-medium">Acoes</th>
                    </tr>
                </thead>
                <tbody className="text-justify">
                    {continentes.map((continente) => (
                        <tr key={continente.con_id} className="hover:bg-gray-100 border-b border-gray-300">
                            <td className="py-8 px-8">{continente.con_nome}</td>
                            <td className="py-8 px-2">{continente.con_descricao}</td>
                            <td className="py-8 px-2">
                                <div className="w-full flex items-center">
                                    <button className="rounded-full p-1 mr-2">
                                        <MapIcon className="w-5 h-5 fill-sky-600" />
                                    </button>
                                    <button onClick={() => handleRemove(continente.con_id)} className="rounded-full p-1 mr-2 cursor-pointer transition duration-200 hover:bg-red-200">
                                        <TrashIcon className="w-5 h-5 fill-red-600" />
                                    </button>
                                    <button className="rounded-full p-1">
                                        <PencilSquareIcon className="w-5 h-5 fill-sky-600" />
                                    </button>
                                    
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
}

export default ContinenteTable