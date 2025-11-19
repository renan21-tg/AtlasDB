import { useEffect, useState } from "react"
import { api } from "../services/api"
import { EyeIcon, TrashIcon, PencilSquareIcon, CheckIcon } from "@heroicons/react/16/solid"
import Modal from "./Modal"

interface Pais {
    pai_id: number,
    pai_nome: string,
    pai_descricao: string,
    pai_idioma_oficial: string,
    pai_moeda: string,
    pai_populacao: number | null,
    pai_area: number | null,
    pai_bandeira_png: string | null
    continenteId: number
}

interface PaisTableProps {
    refresh: boolean
    searchTerm: string
    filterContinenteId: string 
    orderBy: string
}

function PaisTable({ refresh, searchTerm, filterContinenteId, orderBy }: PaisTableProps) {
    const [paises, setPaises] = useState<Pais[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [viewOpen, setViewOpen] = useState<boolean>(false)
    const [selectedPais, setSelectedPais] = useState<Pais | null>(null)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [formData, setFormData] = useState<Partial<Pais>>({})
    const [msg, setMsg] = useState<string>("")

    const fetchPaises = async () => {
        try {
            const response = await api.get<Pais[]>('/pais')
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

    const handleRemove = async (id: number) => {
        const confirm = window.confirm("Tem certeza que deseja excluir este país?")
        if (!confirm) return

        try {
            await api.delete(`/pais/${id}`)
            setPaises(paises.filter(item => item.pai_id !== id))
        } catch (error) {
            console.error("Erro ao deletar:", error)
            alert("Não foi possível excluir o país.")
        }
    }

    const handleView = (pais: Pais) => {
        setSelectedPais(pais)
        setFormData(pais)
        setIsEditing(false)
        setMsg("")
        setViewOpen(true)
    }

    const handleCloseView = () => {
        setViewOpen(false)
        setSelectedPais(null)
        setIsEditing(false)
    }

    const handleSave = async () => {
        if (!selectedPais || !formData) return

        try {
            const payload = {
                nome: formData.pai_nome,
                descricao: formData.pai_descricao,
                idioma_oficial: formData.pai_idioma_oficial,
                moeda: formData.pai_moeda,
                populacao: Number(formData.pai_populacao),
                area: Number(formData.pai_area),
                bandeira: formData.pai_bandeira_png,
                continenteID: formData.continenteId
            }

            await api.put(`/pais/${selectedPais.pai_id}`, payload)

            const updatedPais = { ...selectedPais, ...formData } as Pais
            setPaises(paises.map(p => p.pai_id === selectedPais.pai_id ? updatedPais : p))
            setSelectedPais(updatedPais)

            setIsEditing(false)
            setMsg("Dados atualizados com sucesso!")
            setTimeout(() => setMsg(""), 3000)

        } catch (error) {
            console.error("Erro ao atualizar:", error)
            setMsg("Erro ao salvar as alterações.")
        }
    }

    const renderField = (label: string, key: keyof Pais, type: string = "text") => {
        const value = formData[key]

        if (isEditing) {
            return (
                <div className="bg-white p-3 rounded-lg border border-gray-300 shadow-sm">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">{label}</p>
                    <input
                        type={type}
                        className="w-full border-b border-gray-300 focus:border-emerald-600 focus:outline-none text-gray-800 font-medium"
                        value={value?.toString() || ""}
                        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    />
                </div>
            )
        }

        return (
            <div className="bg-gray-50 p-3 rounded-lg border border-transparent">
                <p className="text-xs font-semibold text-gray-500 uppercase">{label}</p>
                <p className="text-lg font-medium text-gray-800">
                    {type === 'number' && value
                        ? Number(value).toLocaleString('pt-BR') + (key === 'pai_area' ? ' km²' : '')
                        : value || 'N/A'
                    }
                </p>
            </div>
        )
    }

    const filteredPaises = paises
        .filter((pais) => {
            const matchesSearch = pais.pai_nome.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesFilter = filterContinenteId ? pais.continenteId === Number(filterContinenteId) : true
            return matchesSearch && matchesFilter
        })
        .sort((a, b) => {
            if (orderBy === "nome") return a.pai_nome.localeCompare(b.pai_nome)
            if (orderBy === "populacao") return (b.pai_populacao || 0) - (a.pai_populacao || 0)
            if (orderBy === "area") return (b.pai_area || 0) - (a.pai_area || 0)
            if (orderBy === "id_desc") return b.pai_id - a.pai_id
            return a.pai_id - b.pai_id
        })

    if (loading) return <p className="text-center mt-4">Carregando tabela...</p>
    if (error) return <p className="text-center mt-4 text-red-500">{error}</p>

    return (
        <>
            <div className="rounded-lg border border-gray-300 shadow-sm overflow-hidden overflow-x-auto">
                <table className="w-full divide-y divide-gray-200 min-w-[800px]">
                    <thead className="bg-gray-200 text-justify">
                        <tr>
                            <th className="py-3 px-8 font-medium">Nome</th>
                            <th className="py-3 px-2 font-medium">Descricao</th>
                            <th className="py-3 px-2 font-medium">Moeda</th>
                            <th className="py-3 px-2 font-medium">População</th>
                            <th className="py-3 px-2 font-medium">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="text-justify bg-white">
                        {filteredPaises.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-8 text-center text-gray-500">
                                    {paises.length === 0 ? "Não há Países cadastrados" : "Nenhum país encontrado com estes filtros"}
                                </td>
                            </tr>
                        ) : (
                            filteredPaises.map((pais) => (
                                <tr key={pais.pai_id} className="hover:bg-gray-100 border-b border-gray-300 transition duration-150">
                                    <td className="py-4 px-8 font-medium text-gray-900">{pais.pai_nome}</td>
                                    <td className="py-4 px-2 text-gray-600 truncate max-w-xs" title={pais.pai_descricao}>
                                        {pais.pai_descricao.length > 40 ? pais.pai_descricao.substring(0, 40) + '...' : pais.pai_descricao}
                                    </td>
                                    <td className="py-4 px-2 text-gray-600">{pais.pai_moeda}</td>
                                    <td className="py-4 px-2 text-gray-600">
                                        {pais.pai_populacao ? pais.pai_populacao.toLocaleString('pt-BR') : 'N/A'}
                                    </td>
                                    <td className="py-4 px-2">
                                        <div className="flex items-center w-full">
                                            <button
                                                onClick={() => handleRemove(pais.pai_id)}
                                                className="rounded-full p-1 mr-2 cursor-pointer transition duration-200 hover:bg-red-200"
                                                title="Excluir"
                                            >
                                                <TrashIcon className="w-5 h-5 fill-red-600" />
                                            </button>
                                            <button
                                                onClick={() => handleView(pais)}
                                                className="rounded-full p-1 cursor-pointer transition duration-200 hover:bg-sky-200"
                                                title="Ver Detalhes"
                                            >
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

             <Modal open={viewOpen} onClose={handleCloseView}>
                {selectedPais && (
                    <div className="w-[600px]">
                        <div className="flex justify-between items-start border-b border-gray-200 pb-4 mb-6 pr-8">
                            <div className="flex-1 mr-4">
                                {isEditing ? (
                                    <input 
                                        type="text"
                                        className="text-2xl font-bold text-gray-800 border-b border-gray-300 focus:border-emerald-600 focus:outline-none w-full"
                                        value={formData.pai_nome}
                                        onChange={(e) => setFormData({...formData, pai_nome: e.target.value})}
                                        placeholder="Nome do País"
                                    />
                                ) : (
                                    <h2 className="text-3xl font-bold text-gray-800">{selectedPais.pai_nome}</h2>
                                )}
                            </div>
                            
                            {selectedPais.pai_bandeira_png && (
                                <img 
                                    src={selectedPais.pai_bandeira_png} 
                                    alt="Bandeira" 
                                    className="h-10 w-auto shadow-md rounded-sm border border-gray-200"
                                />
                            )}
                        </div>

                        <div className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                {renderField("População", "pai_populacao", "number")}
                                {renderField("Área", "pai_area", "number")}
                                {renderField("Moeda", "pai_moeda")}
                                {renderField("Idioma Oficial", "pai_idioma_oficial")}
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-gray-500 mb-1">Descrição</p>
                                {isEditing ? (
                                    <textarea 
                                        className="w-full bg-white p-3 rounded-lg border border-gray-300 focus:border-emerald-600 focus:outline-none text-gray-700 h-32 resize-none"
                                        value={formData.pai_descricao}
                                        onChange={(e) => setFormData({...formData, pai_descricao: e.target.value})}
                                    />
                                ) : (
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-gray-700 text-justify leading-relaxed h-32 overflow-y-auto">
                                        {selectedPais.pai_descricao}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-8 flex justify-between items-center pt-4 border-t border-gray-200">
                            <span className={`text-sm font-medium ${msg.includes("Erro") ? "text-red-500" : "text-emerald-600"}`}>
                                {msg}
                            </span>
                            
                            <div className="flex gap-3">
                                {isEditing ? (
                                    <>
                                        <button 
                                            onClick={() => {setIsEditing(false); setFormData(selectedPais)}}
                                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer rounded-lg transition font-medium border border-gray-300"
                                        >
                                            Cancelar
                                        </button>
                                        <button 
                                            onClick={handleSave}
                                            className="px-4 py-2 bg-emerald-600 text-white cursor-pointer rounded-lg hover:bg-emerald-500 transition font-medium flex items-center gap-2"
                                        >
                                            <CheckIcon className="w-4 h-4" />
                                            Salvar
                                        </button>
                                    </>
                                ) : (
                                    <button 
                                        onClick={() => setIsEditing(true)}
                                        className="px-4 py-2 bg-emerald-600 cursor-pointer text-white rounded-lg hover:bg-emerald-500 transition font-medium flex items-center gap-2"
                                    >
                                        <PencilSquareIcon className="w-4 h-4" />
                                        Editar
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    )
}

export default PaisTable