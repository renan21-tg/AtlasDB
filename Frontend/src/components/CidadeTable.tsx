import { useEffect, useState } from "react"
import { api } from "../services/api"
import { EyeIcon, TrashIcon, PencilSquareIcon, CheckIcon, CloudIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid"
import Modal from "./Modal"

interface Cidade {
    cid_id: number
    cid_nome: string
    cid_populacao: number
    cid_latitude: number
    cid_longitude: number
    paisId: number
}

interface WeatherData {
    temp: number
    description: string
    icon: string
    humidity: number
    wind: number
}

interface CidadeTableProps {
    refresh: boolean
    searchTerm: string
    filterPaisId: string
    orderBy: string
}

function CidadeTable({ refresh, searchTerm, filterPaisId, orderBy }: CidadeTableProps) {
    const [cidades, setCidades] = useState<Cidade[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [viewOpen, setViewOpen] = useState<boolean>(false)
    const [selectedCidade, setSelectedCidade] = useState<Cidade | null>(null)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [formData, setFormData] = useState<Partial<Cidade>>({})
    const [msg, setMsg] = useState<string>("")
    const [weather, setWeather] = useState<WeatherData | null>(null)
    const [loadingWeather, setLoadingWeather] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    const fetchCidades = async () => {
        try {
            const response = await api.get<Cidade[]>('/cidade')
            setCidades(response.data)
        } catch (error) {
            setError("Erro ao carregar dados")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, filterPaisId, orderBy])

    const fetchWeather = async (id: number) => {
        setLoadingWeather(true)
        setWeather(null)
        try {
            const response = await api.get(`/cidade/${id}/clima`)
            const data = response.data
            setWeather({
                temp: data.main.temp,
                description: data.weather[0].description,
                icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                humidity: data.main.humidity,
                wind: data.wind.speed
            })
        } catch (error) {
            console.error("Erro ao buscar clima:", error)
        } finally {
            setLoadingWeather(false)
        }
    }

    useEffect(() => {
        fetchCidades()
    }, [refresh])

    const handleRemove = async (id: number) => {
        const confirm = window.confirm("Tem certeza que deseja excluir esta cidade?")
        if (!confirm) return
        try {
            await api.delete(`/cidade/${id}`)
            setCidades(cidades.filter(item => item.cid_id !== id))
        } catch (error) {
            console.error("Erro ao deletar:", error)
            alert("Não foi possível excluir a cidade.")
        }
    }

    const handleView = (cidade: Cidade) => {
        setSelectedCidade(cidade)
        setFormData(cidade)
        setIsEditing(false)
        setMsg("")
        setViewOpen(true)
        fetchWeather(cidade.cid_id)
    }

    const handleCloseView = () => {
        setViewOpen(false)
        setSelectedCidade(null)
        setIsEditing(false)
        setWeather(null)
    }

    const handleSave = async () => {
        if (!selectedCidade || !formData) return
        try {
            const payload = {
                nome: formData.cid_nome,
                populacao: Number(formData.cid_populacao),
                lat: Number(formData.cid_latitude),
                lon: Number(formData.cid_longitude),
                paisId: Number(formData.paisId)
            }
            await api.put(`/cidade/${selectedCidade.cid_id}`, payload)
            const updatedCidade = { ...selectedCidade, ...formData } as Cidade
            setCidades(cidades.map(c => c.cid_id === selectedCidade.cid_id ? updatedCidade : c))
            setSelectedCidade(updatedCidade)
            setIsEditing(false)
            setMsg("Dados atualizados com sucesso!")
            setTimeout(() => setMsg(""), 3000)
            fetchWeather(selectedCidade.cid_id)
        } catch (error) {
            console.error("Erro ao atualizar:", error)
            setMsg("Erro ao salvar as alterações.")
        }
    }

    const renderField = (label: string, key: keyof Cidade, type: string = "text", disabled = false) => {
        const value = formData[key]
        if (isEditing) {
            return (
                <div className="bg-white p-3 rounded-lg border border-gray-300 shadow-sm">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">{label}</p>
                    <input
                        type={type}
                        className={`w-full border-b border-gray-300 focus:border-emerald-600 focus:outline-none text-gray-800 font-medium ${disabled ? 'bg-gray-100 text-gray-500' : ''}`}
                        value={value?.toString() || ""}
                        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                        disabled={disabled}
                    />
                </div>
            )
        }
        return (
            <div className="bg-gray-50 p-3 rounded-lg border border-transparent">
                <p className="text-xs font-semibold text-gray-500 uppercase">{label}</p>
                <p className="text-lg font-medium text-gray-800">
                    {type === 'number' && value ? Number(value).toLocaleString('pt-BR') : value || 'N/A'}
                </p>
            </div>
        )
    }

    const filteredCidades = cidades
        .filter((cidade) => {
            const matchesSearch = cidade.cid_nome.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesFilter = filterPaisId ? cidade.paisId === Number(filterPaisId) : true
            return matchesSearch && matchesFilter
        })
        .sort((a, b) => {
            if (orderBy === "nome") return a.cid_nome.localeCompare(b.cid_nome)
            if (orderBy === "populacao") return (b.cid_populacao || 0) - (a.cid_populacao || 0)
            if (orderBy === "id_desc") return b.cid_id - a.cid_id
            return a.cid_id - b.cid_id
        })

    const totalPages = Math.ceil(filteredCidades.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const currentItems = filteredCidades.slice(startIndex, startIndex + itemsPerPage)

    if (loading) return <p className="text-center mt-4">Carregando tabela...</p>
    if (error) return <p className="text-center mt-4 text-red-500">{error}</p>

    return (
        <>
            <div className="rounded-lg border border-gray-300 shadow-sm overflow-hidden overflow-x-auto">
                <table className="w-full min-w-[600px] divide-y divide-gray-200">
                    <thead className="bg-gray-200 text-justify">
                        <tr>
                            <th className="py-3 px-8 font-medium">Nome</th>
                            <th className="py-3 px-2 font-medium">População</th>
                            <th className="py-3 px-2 font-medium">Latitude</th>
                            <th className="py-3 px-2 font-medium">Longitude</th>
                            <th className="py-3 px-2 font-medium">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="text-justify bg-white">
                        {currentItems.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-8 text-center text-gray-500">
                                    {cidades.length === 0 ? "Não há Cidades cadastradas" : "Nenhuma cidade encontrada"}
                                </td>
                            </tr>
                        ) : (
                            currentItems.map((cidade) => (
                                <tr key={cidade.cid_id} className="hover:bg-gray-100 border-b border-gray-300 transition duration-150">
                                    <td className="py-4 px-8 font-medium text-gray-900">{cidade.cid_nome}</td>
                                    <td className="py-4 px-2 text-gray-600">
                                        {cidade.cid_populacao.toLocaleString('pt-BR')}
                                    </td>
                                    <td className="py-4 px-2 text-gray-600">{Number(cidade.cid_latitude).toFixed(4)}</td>
                                    <td className="py-4 px-2 text-gray-600">{Number(cidade.cid_longitude).toFixed(4)}</td>
                                    <td className="py-4 px-2">
                                        <div className="flex items-center w-full">
                                            <button onClick={() => handleRemove(cidade.cid_id)} className="rounded-full p-1 mr-2 cursor-pointer transition duration-200 hover:bg-red-200" title="Excluir">
                                                <TrashIcon className="w-5 h-5 fill-red-600" />
                                            </button>
                                            <button onClick={() => handleView(cidade)} className="rounded-full p-1 cursor-pointer transition duration-200 hover:bg-sky-200" title="Ver Detalhes">
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

            {filteredCidades.length > 0 && (
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

            <Modal open={viewOpen} onClose={handleCloseView}>
                {selectedCidade && (
                    <div className="w-[600px]">
                        <div className="flex justify-between items-start border-b border-gray-200 pb-4 mb-6 pr-8">
                            <div className="flex-1">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        className="text-2xl font-bold text-gray-800 border-b border-gray-300 focus:border-emerald-600 focus:outline-none w-full"
                                        value={formData.cid_nome}
                                        onChange={(e) => setFormData({ ...formData, cid_nome: e.target.value })}
                                        placeholder="Nome da Cidade"
                                    />
                                ) : (
                                    <h2 className="text-3xl font-bold text-gray-800">{selectedCidade.cid_nome}</h2>
                                )}
                            </div>
                        </div>

                        <div className="space-y-5">
                            {!isEditing && (
                                <div className="w-full bg-linear-to-br from-emerald-400 to-emerald-600 rounded-xl p-4 text-white shadow-lg mb-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                                <CloudIcon className="w-5 h-5" />
                                                Clima Agora
                                            </h3>
                                            {loadingWeather ? (
                                                <p className="mt-2 animate-pulse">Carregando clima...</p>
                                            ) : weather ? (
                                                <div className="mt-2">
                                                    <div className="text-4xl font-bold">{Math.round(weather.temp)}°C</div>
                                                    <p className="capitalize opacity-90">{weather.description}</p>
                                                    <div className="text-xs mt-2 opacity-80 flex gap-3">
                                                        <span>Umidade: {weather.humidity}%</span>
                                                        <span>Vento: {weather.wind} m/s</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p className="mt-2 text-sm opacity-80">Dados meteorológicos indisponíveis (Verifique API Key).</p>
                                            )}
                                        </div>
                                        {weather && (
                                            <img 
                                                src={weather.icon} 
                                                alt={weather.description} 
                                                className="w-24 h-24 drop-shadow-md"
                                            />
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                {renderField("População", "cid_populacao", "number")}
                                {renderField("ID do País", "paisId", "text", true)} 
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {renderField("Latitude", "cid_latitude", "number")}
                                {renderField("Longitude", "cid_longitude", "number")}
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
                                            onClick={() => { setIsEditing(false); setFormData(selectedCidade) }}
                                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition font-medium border border-gray-300"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition font-medium flex items-center gap-2"
                                        >
                                            <CheckIcon className="w-4 h-4" />
                                            Salvar
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-e-500 transition font-medium flex items-center gap-2"
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

export default CidadeTable