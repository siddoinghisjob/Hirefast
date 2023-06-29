import React from 'react'
import Active from './active'
import Dormant from './dormant'

export default function Selecter({current,name,link}) {
    if(current){
         return(
            <Active link={link} name={name}/>
         )
    }else{
        return(
            <Dormant link={link} name={name}/>
        )
    }
}
