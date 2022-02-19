import {createContext} from "react";

const ColorContext = createContext({color:'black'});
                     // createContext에 넣어주는 defaultValue는 Provider를 사용하지 않았을 때만 사용된다.
                     // 사용하는 컴포넌트에서 Provider를 사용하고 기본값보여준다고 값을 명시하지 않으면오류발생

export default ColorContext;