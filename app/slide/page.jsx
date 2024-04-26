export default async function SwiperPage() {

    const content = (product, index) => (
        <div
            key={product.id}
            className="p-4 h-[120px] w-[150px] bg-slate-700 border border-1 absolute "
            style={{ left: `${index * 170 + 20}px` }}>
            
            <p>{product.name}</p>
        </div>
    );



    const products = [
        { id: '3333324242', name: 'Producto 1' },
        { id: '3545354444', name: 'Producto 2' },
        { id: '3434234234', name: 'Producto 3' },
        { id: '6577665756', name: 'Producto 4' },
        { id: '8908796574', name: 'Producto 5' },
        { id: '1231313131', name: 'Producto 6' },
        { id: '12312232123', name: 'Producto 7' },
        { id: '423423432423', name: 'Producto 8' },
        { id: '786786786787', name: 'Producto 9' },
        { id: '678678688678', name: 'Producto 9' },
        { id: '768678678676', name: 'Producto 9' },
        { id: '658658658657', name: 'Producto 9' },
    ]

    return (
        <div
            className="py-14 px-4 block w-full">
            <h1>Ejemplo del slider</h1>
            <div
                className="overflow-x-auto w-full relative h-[150px]">
                {products.map((product, index) => {
                    return content(product, index);
                })}
            </div>
        </div>
    );
}