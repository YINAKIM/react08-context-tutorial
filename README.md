# ContextAPI?
***프로젝트 안에서 전역으로 사용하고 싶은 props가 있다면?***   
(예를들어, 사용자 로그인정보, 애플리케이션 환경설정, 테마 등등)     

기본적인 리액트 구조상, 최상위컴포넌트인 App.js에 state로 관리하고, 자식컴포넌트에 props로 전달하여 사용가능   
그런데 그 자식컴포넌트도 또 자식컴포넌트가 있고, 타고타고 자식컴포넌트를 사용할 수 있다.   
> [최상위App컴포넌트, 자식A를사용] - [자식컴포넌트A, 자식B를사용] - [자식컴포넌트B, 자식C를사용] ... [막내컴포넌트Z]   

그럼 만약,   
최하위 컴포넌트에서 App.js의 state를 props로 전달받아 [막내Z]에서 state로 사용하려고 한다면?
> App.js ~~ 막내컴포넌트Z 까지  
> props로 넣어주고 > state갱신 > 컴포넌트리렌더링 

- 이렇게 전체 컴포넌트의 비효율적인 리렌더링이 일어난다. (렌더링 느려지는 원인) 
- 새로운 값을 추가해서 사용하려면, 코드에 props를 넣고 state로 사용하는 코드수정을 모든 컴포넌트에 해야한다. (야근의 원인..)

***그래서 프로젝트 전역상태관리를 위해 사용하는 기능이 Context API***   
(리덕스, 리액트라우터, styled-components 등의 라이브러리도 Context API를 기반으로 구현되어있다.)
>Context API를 사용하면 Context를 만들어 "단 한번에" 사용하려는 "전역상태값"을 받아와서 사용할 수 있다.   



## 새로운 Context(전역상태값) 만들기 : 프로젝트에 context값 등록하기
```
import {createContext} from "react";
const ColorContext = createContext({color:'black'});
export default ColorContext;
```
- createContext(defaultValue) : 새로운 context값(전역상태값)을 만드는 함수
- defaultValue : 해당 Context의 기본상태를 지정한다. 


## Context(전역상태값) 사용하기 : 프로젝트에 등록된 context값 사용하기
```
import ColorContext from "../contexts/colors"; // 내가 context로 등록한 값

const ColorBox = () => {
    return (
        <ColorContext.Consumer>
            {value => (
                <div
                style={{
                    width: '64px', height: '64px', background: value.color
                }}
                ></div>
            )}
        </ColorContext.Consumer>
    );
};
```
- context값은 props로 받아오는 것이 아니라, 해당 Context컴포넌트에 들어있는 [Consumer컴포넌트]를 통해 사용
- {value => ()}   
  ***Render Props(Function as a child) 패턴*** : 컴포넌트의 children이 있어야 할 자리에 값이 아닌 함수를 전달