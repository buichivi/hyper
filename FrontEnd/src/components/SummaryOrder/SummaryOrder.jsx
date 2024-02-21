const SummaryOrder = ({
    totalProducts = 0,
    subTotal = 0,
    total = 0,
    onProgress = () => {},
    textBtn = '',
}) => {
    return (
        <div className="sticky top-[72px] flex-1">
            <div className="border-[1px] border-slate-300 p-4">
                <h4 className="border-b border-b-slate-200 pb-2 text-xl font-medium">
                    Summary Order
                </h4>
                <div className="grid grid-cols-2 gap-2 border-b border-b-slate-200 pb-2 pt-2">
                    <span>Quantity of products</span>
                    <span className="text-right">{totalProducts}</span>
                    <span>Subtotal</span>
                    <span className="text-right">${subTotal}</span>
                    <span>Total discount</span>
                    <span className="text-right">${subTotal - total}</span>
                    <span>Delivery charges</span>
                    <span className="text-right">Free Delivery</span>
                </div>
                <div className="grid grid-cols-2 pt-2">
                    <span>Total</span>
                    <span className="text-right font-bold">${total}</span>
                </div>
            </div>
            <button
                type="submit"
                className="mt-3 w-full border 
                border-black bg-black py-3 uppercase text-white
                transition-colors hover:bg-white hover:text-black"
                onClick={() => {
                    onProgress();
                }}
            >
                {textBtn}
            </button>
        </div>
    );
};

export default SummaryOrder;
