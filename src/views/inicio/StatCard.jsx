export const StatCard = ({ title, value, badge, badgeType, iconSvg }) => {
    const badgeStyles = {
        success: "bg-green-100 text-green-700",
        warning: "bg-orange-100 text-orange-700",
        danger: "bg-red-100 text-red-700",
        info: "bg-emerald-100 text-emerald-700"
    };

    return (
        <blockquote className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-1 min-w-50">
            <section className="flex justify-between items-start mb-4">
                <div className="p-2 rounded-lg bg-opacity-10">
                    <img src={iconSvg} alt="Icon" />
                </div>
                
                {badge && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${badgeStyles[badgeType]}`}>
                        {badge}
                    </span>
                )}
            </section>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{title}</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
        </blockquote>
    );
}