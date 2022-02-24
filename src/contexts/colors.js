import {createContext, useState} from "react";

const ColorContext = createContext({
    state : {color:'black', subcolor:'red'},
    actions : {
        setColor :() => {},
        setSubcolor :() => { console.log("set서브컬러 실행됨")},
    } // createContext에 actions객체의 속성으로 함수를 전달
});


const ColorProvider = ({children}) => {
    const [color, setColor] = useState('black');
    const [subcolor, setSubcolor] = useState('red');

    const value = {
        state : {color,subcolor},
        actions : {setColor, setSubcolor}
    };

    return (
        <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
    );
};

const { Consumer : ColorConsumer } = ColorContext;
// const ColorConsumer = ColorContext.Consumer와 같은 의미,

export { ColorProvider, ColorConsumer }; // ColorConsumer, ColorProvider 도 내보냄.. 그럼 import  { ColorProvider, ColorConsumer } from "./contexts/colors"; 이것만 따로 사용할 수 있겠네 ?
                                         //
export default ColorContext;