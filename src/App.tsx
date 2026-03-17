/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { MarketplaceHome } from './pages/MarketplaceHome';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/marketplace" replace />} />
        <Route element={<Layout />}>
          <Route path="/:section" element={<MarketplaceHome />} />
          <Route path="/:section/:categoryId" element={<CategoryPage />} />
          <Route path="/:section/:categoryId/:productId" element={<ProductDetailsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
