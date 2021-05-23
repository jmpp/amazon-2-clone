import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import { useState } from "react";
import { getSession } from "next-auth/client";

export default function Home({ products }) {
    const [filteredProducts, setProducts] = useState(products);

    function filterProducts(searchText) {
        const matchedProducts = products.filter((product) =>
            product.title.toLowerCase().includes(searchText.toLowerCase())
        );
        setProducts([...matchedProducts]);
    }

    return (
        <div className="bg-gray-100 ">
            <Head>
                <title>Amazon 2.0</title>
            </Head>

            {/* Header */}
            <Header onSearchValue={filterProducts} />

            <main className="max-w-screen-2xl mx-auto">
                <Banner />

                {/* Product Feed */}
                {filteredProducts.length > 0 ? (
                    <ProductFeed products={filteredProducts} />
                ) : (
                    <h1 className="text-center text-2xl py-4">
                        🙁 No matching products…
                    </h1>
                )}
            </main>
        </div>
    );
}

// Tells nextJS that's no longer a static page
// eg "Please calculate smthg and send it to the user next"
// Here, it's executed by Node.js
export async function getServerSideProps(context) {
    const session = await getSession(context);
    const products = await fetch("https://fakestoreapi.com/products").then(
        (res) => res.json()
    );

    return { props: { products } };
}
