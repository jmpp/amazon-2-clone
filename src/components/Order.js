import Currency from "react-currency-formatter";
import moment from "moment";
import { groupBy } from "lodash";

function Order({ id, amount, amountShipping, images, timestamp, items }) {
    const groupedImages = Object.values(groupBy(images));

    return (
        <div className="relative border rounded-md">
            <div className="block sm:flex items-center sm:space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
                <div className="mb-3 sm:mb-0">
                    <p className="font-bold text-xs">ORDER PLACED</p>
                    <p>{moment.unix(timestamp).format("MM/DD/YYYY")}</p>
                </div>

                <div>
                    <p className="text-xs font-bold">TOTAL</p>
                    <p>
                        <span className="font-bold">
                            <Currency quantity={amount} currency="EUR" />
                        </span>{" "}
                        (Including{" "}
                        <Currency quantity={amountShipping} currency="EUR" />{" "}
                        for "<span className="italic">Next Day Delivery</span>")
                    </p>
                </div>

                <p className="absolute top-3 right-3 sm:static text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
                    {items.reduce((total, item) => total + item.quantity, 0)}{" "}
                    items
                </p>

                <p className="w-100 sm:absolute top-3 right-2 sm:w-72 truncate text-xs whitespace-nowrap">
                    ORDER #{id}
                </p>
            </div>

            <div className="p-5 sm:p-10">
                <div className="flex space-x-6 overflow-x-auto">
                    {groupedImages.map((group) => (
                        <div className="relative">
                            <img
                                src={group[0]}
                                alt=""
                                className="h-20 object-contain sm:h-32"
                            />
                            {group.length > 1 && (
                                <div className="absolute bottom-2 right-2 p-1 rounded shadow font-bold bg-yellow-400 text-black text-2xl text-center">
                                    &times; {group.length}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Order;
