import { useState } from 'react';
 
export default function Button(props) {

    // console.log(props)
    return (
 <button onClick={ props.handleClick } className='button' >{ props.temp.cityName }</button> 
    )}