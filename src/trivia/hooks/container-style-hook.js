import { useState } from 'react';

export const useStyle = () => {

    const [catQ1, setCatQ1] = useState("category-select-container-default")
    const [catQ2, setCatQ2] = useState("category-select-container-default")
    const [catQ3, setCatQ3] = useState("category-select-container-default")

    return { 
        catQ1, 
        setCatQ1, 
        catQ2, 
        setCatQ2, 
        catQ3, 
        setCatQ3
    }
}

