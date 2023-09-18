import toast from 'react-hot-toast';
import { apiConnector } from '../apiconnector';
import { catalogData } from '../apis';

const getCatalogPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...");

  let result = [];

  try {
    const res = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, 
      { categoryId: categoryId });

    if (!res?.data?.success) {
      throw new Error("Could not Fetch Category page data");
    }
    result.push(res.data); // Push res.data instead of entire res

  } catch (error) {
    console.log("CATALOG PAGE DATA API ERROR...", error);
    toast.error(error.message);
    result = error?.response?.data; // Corrected "res" to "response"

  } finally {
    toast.dismiss(toastId);
  }
  return result;
};

export default getCatalogPageData;
