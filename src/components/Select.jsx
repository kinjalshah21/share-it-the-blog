import React, {forwardRef, useId} from 'react'

function Select({
    options,
    label,
    className,
    ...props

},ref) {
    
    const id = useId()

    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className=''></label>}
            <select 
            {...props}
            id = {id}
            className= {`px-3 py-2 rounded-lg bg-[#F7F7FF] text-black outline-none focus:bg-gray-50 duration-200 border border-[#495867] w-full ${className}`}
            ref = {ref}>
                {options?.map((option)=>(
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}

            </select>
        </div>
    )
}

export default forwardRef(Select);