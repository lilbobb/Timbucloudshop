import axios from "axios";

const Apikey = "9f0107ebc147481caa81275271e10a6920240712132305877558";
const Appid = "Y9A66PC22ZLJORZ";
const organizationid = "eb1b7ba0e53c4f7faa7a82ec423daae5";

// Fetch multiple products
export const fetchProducts = async (page = 1, size = 10) => {
  try {
    const url = `/api/timbu-get-all-products.reavdev.workers.dev/?organization_id=${organizationid}&reverse_sort=false&page=${page}&size=${size}&Appid=${Appid}&Apikey=${Apikey}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching products:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Fetch a single product by ID
export const fetchProductById = async (id) => {
  try {
    const url = `/api/timbu-get-single-product.reavdev.workers.dev/?organization_id=${organizationid}&product_id=${id}&Appid=${Appid}&Apikey=${Apikey}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching product details:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
