import { useState, useLayoutEffect } from 'react';

export const useWindow = () => {
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);

    console.log('running update')
    useLayoutEffect(() => {
        const updateSize = () => {
            setHeight(window.innerHeight);
            setWidth(window.innerWidth);
        }

        window.addEventListener('resize', updateSize);

        updateSize();

        return () => window.removeEventListener('resize', updateSize);
    }, []);
    
    return { height, width };
  
  }