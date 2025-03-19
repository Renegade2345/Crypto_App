import { createContext, useEffect, useState, useCallback } from "react";

export const Coincontext = createContext(); 

const CoinContextProvider = (props) => {
    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({ // ✅ Changed `Currency` to `currency`
        name: "usd",
        symbol: "$"
    });

    // ✅ Memoized API call function using useCallback
    const fetchAllCoin = useCallback(async () => {
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-cB8i8MYrqTMoxqpj8ap5mNcX' }
        };

        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options);
            const data = await response.json();
            setAllCoin(data);
        } catch (error) {
            console.error("Error fetching coins:", error);
        }
    }, [currency]);

    
    useEffect(() => {
        fetchAllCoin();
    }, [fetchAllCoin]);

    const contextValue = {
        allCoin,
        currency, 
        setCurrency
    };

    return (
        <Coincontext.Provider value={contextValue}>
            {props.children}
        </Coincontext.Provider>
    );
};

export default CoinContextProvider;
