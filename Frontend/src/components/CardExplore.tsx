import { Link } from "react-router-dom"

interface CardProps {
    icon: any,
    title: string,
    desc: string,
    linkToPage: string
}

function CardExplore({icon, title, desc, linkToPage}: CardProps) {
    return (
        <>
            <div className="w-86 py-10 px-6 rounded-2xl shadow-xl">
                <div className="flex justify-center mb-2">
                    <div className="rounded-full bg-emerald-500 inline-block p-2">
                        {icon}
                    </div>
                </div>
                <div className="flex justify-center font-semibold mb-2">{title}</div>
                <div className="flex justify-center mb-3 text-sm">{desc}</div>
                <hr className="mb-3" />
                <div className="flex justify-center">
                    <Link to={linkToPage} className="rounded-xl px-4 py-1 text-emerald-700 text-md font-semibold duration-300 ease-in-out hover:bg-emerald-700 hover:text-emerald-50 hover:scale-110 hover:-translate-y-0.5 active:translate-y-0 active:scale-105">Explorar</Link>
                </div>
            </div>
        </>
    )
}

export default CardExplore