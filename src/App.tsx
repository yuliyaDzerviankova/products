import { Route, Routes } from "react-router-dom"
import { ProductDetailWrapper, ProductList } from "./features/ProductsList/ProductsList"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/:id" element={<ProductDetailWrapper />} />
    </Routes>
  )
}

export default App 