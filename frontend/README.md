# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const currncy = '$';

    // 1. Define the API call function
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get('YOUR_API_URL_HERE/products');
            setProducts(response.data); // 2. Store data in state
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    // 3. Automatically fetch data when the app loads
    useEffect(() => {
        fetchProducts();
    }, []);

    const value = {
        products,
        currncy,
        loading,
        fetchProducts // Expose function if you want to refresh data manually
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
