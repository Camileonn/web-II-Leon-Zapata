import { Routes, Route } from "react-router-dom"

import Home from '../page/Home'
import About from '../page/About'
import Contact from '../page/Contact'
import Login from "../page/Login"
import Products from '../page/Productos'
import ProductDetails from "../page/ProductDetails"
import ProductList from "../page/ProductList"
import ProductClase from "../page/ProductDetailsClase"
import Cart from "../page/Carrito"

export default function MyRouters()
{
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/Productos" element={<Productos/>}/>
            <Route path="/detalles-roducto/:id" element={<Detalleprodutos/>}/>
            <Route path="/productlist" element={<ProductList/>}/>
            <Route path="/product/:id" element={<Productocomponent/>}/>
            <Route path="/carrito" element={<Carritt/>}/>
        </Routes>
    )
}