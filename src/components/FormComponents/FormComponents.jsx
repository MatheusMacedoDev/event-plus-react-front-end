import './FormComponents.css';

import { motion } from 'framer-motion';

export const Input = ( {
    id,
    name,
    value,
    type,
    required,
    additionalClassName,
    placeholder,
    handleChange
} ) => {
    return (
        <input 
            type={type} 
            id={id}
            name={name}
            required={required ? 'required' : ""}
            className={`input-component ${additionalClassName}`}
            placeholder={placeholder}
            onChange={handleChange}
            autoComplete='off'
            value={value}
        />
    );
}

export const Label = ({htmlFor, labelText}) => {
    return <label htmlFor={htmlFor}>{labelText}</label>
}

export const Button = ( {
    name,
    id,
    textButton = 'Button',
    type = 'submit',
    additionalClassName = '',
    handleClick
} ) => {
    return (
        <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            name={name}
            id={id}
            type={type}
            onClick={handleClick}
            className={`button-component ${additionalClassName}`}
        >
            {textButton}
        </motion.button>
    )
}

export const Select = ( { 
    id,
    name,
    options = [],
    handleChange,
    required,
    additionalClassNmae = '',
    handleClick,
    value = '',
    firstOption = ''
} ) => {
    return (
        <select 
            name={name} 
            id={id}
            className={`input-component ${additionalClassNmae}`}
            onChange={handleChange}
            onClick={handleClick}
            value={value}
        >
            {
                (firstOption !== '') 
                    ? <option value="">{`${firstOption}:`}</option>
                    : ''
            }
            {options.map((option, index) => <option key={index} value={option.value}>{option.text}</option>)}
        </select>
    );
}