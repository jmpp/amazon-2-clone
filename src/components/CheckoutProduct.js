import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

function CheckoutProduct(props) {
    const dispatch = useDispatch();

    const id = props.id;
    const title = props.title;
    const rating = props.rating;
    const price = props.price;
    const description = props.description;
    const category = props.category;
    const image = props.image;
    const hasPrime = props.hasPrime;

    function addItemToBasket() {
        const product = {
            id,
            title,
            price,
            description,
            category,
            image,
            rating,
            hasPrime,
        };

        // Sending the product via an action to the redux store (= basket "slice")
        dispatch(addToBasket(product));
    }

    function removeItemFromBasket() {
        dispatch(removeFromBasket({ id }));
    }
    return (
        <div className="grid grid-cols-5 my-3">
            <Image src={image} width={200} height={200} objectFit="contain" />

            {/* Middle */}
            <div className="col-span-3 mx-5">
                <p className="my-3">{title}</p>
                <div className="flex">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <StarIcon key={i} className="h-5 text-yellow-500" />
                        ))}
                </div>
                <p className="text-xs my-2 line-clamp-3">{description}</p>
                <Currency quantity={price} currency="EUR" />
                {hasPrime && (
                    <div className="flex items-center space-x-2">
                        <img
                            loading="lazy"
                            className="w-12"
                            src="https://links.papareact.com/fdw"
                            alt=""
                        />
                        <p className="text-xs text-gray-500">
                            FREE Next-day Delivery
                        </p>
                    </div>
                )}
            </div>

            {/* Buttons on the right of the products */}
            <div className="flex flex-col space-y-2 my-auto justify-self-end">
                <button className="button" onClick={addItemToBasket}>
                    Add to Basket
                </button>
                <button className="button" onClick={removeItemFromBasket}>
                    Remove from Basket
                </button>
            </div>
        </div>
    );
}

export default CheckoutProduct;
