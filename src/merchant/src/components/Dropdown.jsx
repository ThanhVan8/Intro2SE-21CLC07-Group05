import React, { useState } from 'react'

const Dropdown = ({isDisable, selectedValue}) => {
    const [selectedCategory, setSelectedCategory] = useState(selectedValue)
    const handleSelect = (e) => {
        setSelectedCategory(e.target.value)
        // add to database
    }
    return (
        <select value={selectedCategory} disabled={isDisable} autoFocus={!isDisable}
        className={isDisable?"w-64 p-2.5 text-gray-500 bg-gray-100 border rounded-md shadow-sm outline-none appearance-none"
        :"w-64 p-2.5 text-textColor bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-primary hover:border-primary"}   
        onChange={handleSelect}>
            <option>Rice</option>
            <option>Milk tea</option>
            <option>Noodle</option>
            <option>Chicken</option>
        </select>
    );
}

export default Dropdown