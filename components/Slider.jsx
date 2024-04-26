
import './slide.css';

export default function Slider({
    height,
    itemWidth,
    items,
    className,
}) {
    const renderItem = (child, index) => (
        <div
            key={index}
            className="h-full absolute"
            style={{
                left: `${index * (itemWidth + 20)}px`,
                width: `${itemWidth}px`,
            }}
        >
            {child}
        </div>
    );
    const itemsToRender = Array.isArray(items) ? items : [items];

    return (
        <div
            className={`${className} w-full block mt-auto mb-2`}>
            <div
                className="overflow-x-auto w-full relative mySlider"
                style={{ height: `${height}px` }}
            >
                { itemsToRender.map((item, index) => {
                    return renderItem(item, index);
                })}
            </div>
        </div>
    );
}
