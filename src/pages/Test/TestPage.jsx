import React, { useEffect, useState } from 'react';

const TestPage = () => {
    const [count, setCount] = useState(0);
    const [total, setTotal] = useState(0);

    // useEffect(() => {
    //     setTotal(count * 2);
    //     // alert('Changed');
    //     console.log('Changed');
    // });

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => {
                setCount(count + 1); 
                setTotal(count * 2);
            }}>+</button>
            <p>Total: {total}</p>
        </div>
    );
};

export default TestPage;