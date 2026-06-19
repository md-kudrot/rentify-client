// import Icon from "../Icon";

export default function SummaryCards({ cards }) {
    // cards should be an array of objects:
    // { id, title, icon, value, trend, trendIcon, colorClass }
    // colorClass handles the bg and text colors for the specific card styling (e.g. primary, secondary)

    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {cards.map((card) => (
                <div key={card.id} className="glass-panel p-lg rounded-xxl space-y-md relative overflow-hidden group">
                    <div
                        className={`absolute top-0 right-0 w-32 h-32 ${card.colorClass.glow} blur-[60px] rounded-full -mr-16 -mt-16 transition-all duration-500`}
                    ></div>
                    <div className="flex items-center justify-between relative">
                        <span className="text-on-surface-variant font-label-md uppercase">{card.title}</span>
                        <div
                            className={`w-10 h-10 rounded-xl ${card.colorClass.iconBg} flex items-center justify-center ${card.colorClass.iconText}`}
                        >
                            {/* <Icon name={card.icon} size={24} /> */}
                        </div>
                    </div>
                    <div className="space-y-xs relative">
                        <h3 className="text-display-lg-mobile md:text-headline-lg font-bold text-on-surface">
                            {card.value}
                        </h3>
                        {card.trend && (
                            <div
                                className={`flex items-center gap-xs ${card.colorClass.trendText || "text-on-surface-variant"}`}
                            >
                                {/* {card.trendIcon && <Icon name={card.trendIcon} size={16} />} */}
                                <span className="text-xs font-bold">{card.trend}</span>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </section>
    )
}

