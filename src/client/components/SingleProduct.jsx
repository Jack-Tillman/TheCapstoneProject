import { useState, useEffect} from "react";
import { fetchSingleItem } from "../api";
import { useParams } from "react-router";

export const SingleProduct = () => {
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    const {stripe_id} = useParams();

    useEffect(() => {
        async function getSingleItem() {
            const response = await fetchSingleItem(stripe_id);
            const result = await response.json();
            console.log(`Response: ${response}`);
            console.log(`Result: ${result}`);
            if (response.status === 200) {                
                setProduct(result);
            } else {
                setError("Bad")
            }
        }
        getSingleItem();
    }, [])

    return (
        <>
            <h2>Name: {product && product.productname}</h2>
        </>
    )

}