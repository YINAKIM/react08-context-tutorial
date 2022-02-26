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

    // Provider의 props중 하나인 value로 하위컴포넌트(children들)에게 전달한다.
    // 그럼 Consumer가 자기children함수에서 인자로 받아서 사용한다.)
    return (
        <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
    );
};

const { Consumer : ColorConsumer } = ColorContext;
// const ColorConsumer = ColorContext.Consumer와 같은 의미,

export { ColorProvider, ColorConsumer }; // ColorConsumer, ColorProvider 도 내보냄.. 그럼 import  { ColorProvider, ColorConsumer } from "./contexts/colors"; 이것만 따로 사용할 수 있겠네 ?
                                         //
export default ColorContext;