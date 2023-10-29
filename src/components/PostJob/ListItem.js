import React, { Component } from 'react';

function ListItem(props) {
    const { index, value, onChange, onRemove } = props;
    return (
        <li>
            <input type="text" 
            value={value.value} 
            onChange={() => onChange(value)} 
            placeholder={value.placeholder + index}/>
            <button className={`btn_delete`} onClick={() => onRemove(value)}>
                <span className={`fas fa-trash-alt`} aria-hidden="true"></span>
            </button>
        </li>
    );
}

export default ListItem;