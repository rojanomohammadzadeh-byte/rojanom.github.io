export const useFetch = async (url) => {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      src: data.src || [],
      title: data.title || [],
      category: data.category || []
    };
  } catch (error) {
    console.error('Fetch error:', error);
    return {
      src: [],
      title: [],
      category: [],
      error: error.message
    };
  }
}; 