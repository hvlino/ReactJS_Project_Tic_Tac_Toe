import React from 'react';
import './Button.scss';

export default function Button(props) {
    return (
    <button className={ ['button', props.theme, props.size].join(' ') } onClick={props.onClick} >
        <span className='button-front'>
            {props.children}
        </span>
    </button>);
}