import React, { useState } from 'react';

import Button from '../../Button/Button';
import Input from '../../components/Input/Input';

const TestPage = () => {
    const [number1, setNumber1] = useState(0);
    const [number2, setNumber2] = useState(0);
    const [total, setTotal] = useState(0);

    function handleCalculate() {
        setTotal(number1 + number2)
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(e.target)
    }

    return (
        <div>
            <h1>Poc's</h1>
            <h2>Calculator</h2>

            <form action='' onSubmit={handleSubmit}>
                <Input number={number1} setNumber={setNumber1} placeholder='Digite o primeiro número' name='number1' id='number1'/>
                <Input number={number2} setNumber={setNumber2} placeholder='Digite o segundo número' name='number2' id='number2'/>
                <Button handleClick={handleCalculate}/>
            </form>

            <p>{total}</p>
        </div>
    );
};

export default TestPage;