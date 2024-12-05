const BASE_URL = "https://6747a4b738c8741641d74a23.mockapi.io";

export const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`Erro: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao realizar operação");
  }
};
