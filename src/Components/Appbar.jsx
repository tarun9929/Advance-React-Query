import { NavLink } from 'react-router-dom'


function Appbar() {
    const navLinkClass = ({ isActive }) =>
        isActive
            ? 'text-red-200 underline font-bold text-md'
            : 'text-white font-bold hover:text-red-200 text-md transition-colors'

    return (
        <nav className="bg-red-600 py-3 px-6 flex justify-between items-center">
            <ul className="flex items-center gap-6">
                <li>
                    <NavLink to="/" className={navLinkClass}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/recipes" className={navLinkClass}>
                        Products
                    </NavLink>
                </li>
            </ul>

            <button className="bg-white text-red-600 px-4 py-1.5 uppercase font-bold rounded-md hover:bg-gray-100 transition">
                Dashboard
            </button>
        </nav>
    )
}

export default Appbar
