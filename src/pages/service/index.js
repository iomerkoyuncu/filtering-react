import httpHelper from '../../utils/httpHelper';
import { appConfig } from '../../constants/appConfig';

const service = {
    async getProducts() {
        return await httpHelper.makeGetRequest(appConfig.baseUrl, '/products', {
            limit: 100,
        });
    },

    async getProduct(id) {
        return await httpHelper.makeGetRequest(appConfig.baseUrl, `/products/${id}`, {
            limit: 100,
        });
    },

    async searchProducts(query) {
        return await httpHelper.makeGetRequest(appConfig.baseUrl, '/products/search', { q: query, limit: 100 });
    },

    async getCategories() {
        return await httpHelper.makeGetRequest(appConfig.baseUrl, '/products/categories');
    },
}

export default service;