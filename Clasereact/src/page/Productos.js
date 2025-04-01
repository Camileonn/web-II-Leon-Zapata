import { useNavigate } from 'react-router-dom'
import ProductItem from '../components/ProductItem'
import '../style/products.css'
import { useEffect, useState } from 'react'

export default function Products()
{
    const [products, setProducts] = useState(null);
    const [productId, setProductId] = useState(null);
    const [word, setWord] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);

            const data = await getProducts();

            setProducts(data.products);

            setLoading(false);
        }

        fetchProducts()
    }, []);

    useEffect(() => {
        const hasWord = word !== null && word !== undefined && word.length > 3;
        
        if(!hasWord) return;

        const fetchProductsByWord = async () => {
            setLoading(true);
            const data = await getProductsByWord(word)
            setProducts(data.products);
            setLoading(false);
        }

        fetchProductsByWord();
    }, [word])


    return (
        <div>
            <div className='products-title'>
                <h2>Productos</h2>
            </div>

            <div className='product-input'>
                <input onChange={(e) => setWord(e.target.value)} placeholder='Search item...'></input>
            </div>

            {loading ? (
                <div className='loading-container'>
                </div> ) : (
                    <div className="container-products">
                    {products &&
                        products.map((item) => (
                            <ProductItem
                                key={item.id}
                                title={item.title}
                                id={item.id}
                                description={item.description}
                                images={item.images}
                            />
                        ))}
                    </div>
                )}
        </div>
    )
}


async function getProducts()
{
    const products = await fetch("https://dummyjson.com/products");
    return products.json();
}

async function getProductsByWord(word) {
    const products = await fetch(`https://dummyjson.com/products/search?q=${word}`)
    return products.json()
}