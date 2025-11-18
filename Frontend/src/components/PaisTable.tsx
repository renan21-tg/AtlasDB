import { useEffect, useState } from "react"
import { api } from "../services/api"
import { EyeIcon, MapIcon, TrashIcon } from "@heroicons/react/16/solid"

interface Pais {
    pai_id: number,
    pai_nome: string,
    pai_descricao: string,
    pai_idioma_oficial: string,
    pai_moeda: string,
    pai_populacao: number,
    pai_area: number,
    pai_bandeira_png: string
    continenteId: number
}

interface PaisTableProps {
    refresh: boolean
}

function PaisTable( { refresh }:PaisTableProps) {
    const [paises, setPaises] = useState<Pais[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const fetchPaises = async () => {
        try {
            const response = await api.get<Pais[]>(`/pais`)

            setPaises(response.data)
        } catch (error) {
            setError("Erro ao carregar dados")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPaises()
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
                        <th className="py-3 px-2 font-medium">Moeda</th>
                        <th className="py-3 px-2 font-medium">Populacão</th>
                        <th className="py-3 px-2 font-medium">Acoes</th>
                    </tr>
                </thead>
                <tbody className="text-justify">
                    {paises.length === 0 ? (
                        <tr>
                            <td colSpan={3} className="py-8 text-center text-gray-500">Não há Continentes cadastrados</td>
                        </tr>
                    ) : (
                    paises.map((pais) => (
                        <tr key={pais.pai_id} className="hover:bg-gray-100 border-b border-gray-300">
                            <td className="py-8 px-8">{pais.pai_nome}</td>
                            <td className="py-8 px-2">{pais.pai_descricao}</td>
                            <td className="py-8 px-2">{pais.pai_moeda}</td>
                            <td className="py-8 px-2">{pais.pai_populacao}</td>
                            <td className="py-8 px-2">
                                <div className="w-full flex items-center">
                                    <button className="rounded-full p-1 mr-2 cursor-pointer transition duration-200 hover:bg-sky-200">
                                        <MapIcon className="w-5 h-5 fill-sky-600" />
                                    </button>
                                    <button className="rounded-full p-1 mr-2 cursor-pointer transition duration-200 hover:bg-red-200">
                                        <TrashIcon className="w-5 h-5 fill-red-600" />
                                    </button>
                                    <button className="rounded-full p-1 cursor-pointer transition duration-200 hover:bg-sky-200">
                                        <EyeIcon className="w-5 h-5 fill-sky-600" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
        </>
    )
}

export default PaisTable