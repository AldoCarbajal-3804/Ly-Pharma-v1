export const AlertsProducts = ({
    name,
    stock,
    badge,
    badgeColor = "orange",
}) => {

    const badgeStyles = {
        orange: "bg-orange-100 text-orange-700",
        red: "bg-red-100 text-red-700",
    };

    return (
        <blockquote className="bg-gray-100 rounded-xl p-4 flex items-center justify-between">
            <section className="flex items-center gap-3">
                <main>
                    <h3 className="font-bold text-[#1b2340] leading-5">
                        {name}
                    </h3>

                    <p className="text-sm text-gray-600">
                        Stock: {stock} uds.
                    </p>
                </main>
            </section>

            <span
                className={`text-xs font-bold px-3 py-1 rounded-md ${badgeStyles[badgeColor]}`}
            >
                {badge}
            </span>
        </blockquote>
    );
}