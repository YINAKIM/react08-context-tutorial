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

## Context API

리액트에서 전역상태값 관리를 위한 context객체를 만들고, 사용하기 위해 제공되는 API

1. React.createContext
2. Context.Provider
3. Context.Consumer
4. Context.displayName
5. Class.contextType → 클래스 컴포넌트에서 사용


>💡 공식문서에서 자꾸 context를 사용한다고 하지 않고 "구독"한다고 표현한다. 
> When React renders a component that "subscribes" to this Context object    
> it will read the current context value from the closest matching Provider above it in the tree.
> 
> 1.리액티브 프로그래밍에서, [생산-연산-소비]의 개념
>* 생산자 → Publisher (아마 리액트에서 Context.Provider?)
>* 연산자 → Operator 
>* 소비자 → Subscriber (아마 리액트에서 Context.Consumer?)
> 
> 2.리액티브 프로그래밍에서, Publisher / Subscribe 패턴

더 자세히 알아볼 것

---

### 1. React.createContext

```javascript
const MyContext = React.createContext(defaultValue);
```

- **input** ) context객체에 들어갈 현재값
  - 기본적으로, Context객체를 구독하고있는 컴포넌트(subscriber) 를 렌더링 할 때 React는 트리상위에서 가장 가까이 있는 Provider로부터 현재값을 읽는다. ( → Provider본 후 더 자세히 )
  - 컴포넌트 트리안에서 적절한 Provider를 찾지 못하면? defaultValue에 넣어준 값을 사용한다.

    (기본값은 컴포넌트를 독립적으로 테스트할 때 유용한 값, Provider로 undefined를 보내도 defaultValue로 읽지않는다. ...?)

- **output** ) context객체를 만든다.
#### 1-1 새로운 Context(전역상태값) 만들기 : 프로젝트에 context값 등록하기
```javascript
import {createContext} from "react";
const ColorContext = createContext({color:'black'});
export default ColorContext;
```
- createContext(defaultValue) : 새로운 context값(전역상태값)을 만드는 함수
- defaultValue : 해당 Context의 기본상태를 지정한다.

### 2. Context.Provider

```jsx
<MyContext.Provider value={값} />
```

- Provider도 React컴포넌트 중 하나다.
- Context오브젝트에 포함되어있다.
- **context를 구독하는 컴포넌트(subscriber)들에게 context의 변화를 알리는 역할**

Provider가 어떻게 전달?

- Provider컴포넌트의 value라는 prop를 하위컴포넌트에 전달, (→ 전달받을 수 있는 컴포넌트의 수는 제한이 없다.)

  (*참고 : Provider가 하위Provider를 갖는것도 가능, 이 경우 최하위Provider의 값이 우선시됨)

- Provider의 value가 바뀔 때 마다, **하위컴포넌트가 다시 리렌더링된다.**

context값이 바뀌었는지 여부를 확인하기?

- Object.is와 동일한 알고리즘을 사용 (true면 동일객체, false면 변한객체)

  → 이전 값과 새로운값을 비교하여 변화를 감지한다.

  → Provider의 value로 Objcet를 보낼 경우의 주의사항

  Provider를 사용하는 부모(context객체)가 렌더링될 때 마다

  불필요하게 하위컴포넌트가 다시 렌더링되는 문제가 생길 수 있음
  
#### 2-1. Provider로 상태값 업데이트하기
  Provider를 사용하면 "사용하는 쪽에서" Context의 value를 변경할 수 있다.
- createContext에 넣어주는 defaultValue는 Provider를 사용하지 않았을 때만 사용된다.
- Provider를 사용하고 기본값보여준다고 value값을 "명시하지 않으면오류발생"
```javascript
function App() {
  return (
      <ColorContext.Provider value={{color: 'red'}}>
          <div>
            <ColorBox/>
          </div>
      </ColorContext.Provider>
  );
}
```


### 3. Context.Consumer

```jsx
<MyContext.Consumer>
  {value => ( 
      //context값을 이용한 렌더링로직이 들어간다.
  )}
</MyContext.Consumer>
```

- context의 변화를 구독하는 React컴포넌트다(subscriber)
- 함수컴포넌트 안에서 context를 구독할 수 있다.
- Context.Consumer의 자식(children)은 함수여야한다. → render props 패턴

  → Consumer의 자식(꼭 함수)은 context의 현재값을 받아서 React노드를 반환

- Context.Consumer의 자식(children)은 함수가 받는 `value`
  매개변수 값은 해당 context의 Provider 중 상위 트리에서 가장 가까운 Provider의 `value`
  prop과 동일
- (Provider의 기본로직이 적용된다 → ) 상위에 Provider가 없다면 `value` 매개변수 값은 `createContext()`
  에 보냈던 `defaultValue`와 동일

#### 3-1. Context(전역상태값) 사용하기 : 프로젝트에 등록된 context값 사용하기
```javascript
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
  

# 동적 Context 사용하기
Context value에는 무조건 상태값만 있어야하는 것이 아니라, 함수를 전달할 수 있다.


---

# Context의 구조 파악하기   

### App.js : 최종 렌더링되는 컴포넌트 구조      
- ColorProvider의 자식컴포넌트로 \<SelectColors/>와 \<ColorBox/> 컴포넌트가 렌더링되는 구조
```javascript
function App() {
  return (
      <ColorProvider>
          <div>
              <SelectColors/>
              <ColorBox/>
          </div>
      </ColorProvider>
  );
}
```
    
### colors.js에서 export되는 ColorProvider컴포넌트 : Provider가 된다.       
```javascript
import {createContext, useState} from "react";

const ColorContext = createContext({
   //...(React.createContext로 context객체를 만든다)...
});// ---------------------------------------------------------------------------------------[1]


const ColorProvider = ({children}) => {
  const [color, setColor] = useState('black');
  const [subcolor, setSubcolor] = useState('red');

  const value = {
    state : {color,subcolor},
    actions : {setColor, setSubcolor}
  };

  // Provider의 props중 하나인 value로 하위컴포넌트(children들)에게 전달한다.
  // (그럼 Consumer가 자기children함수에서 인자로 받아서 사용함)
  return (
          <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};// -----------------------------------------------------------------------------------------[2]

const { Consumer : ColorConsumer } = ColorContext; // ----------------------------------------[3]
export { ColorProvider, ColorConsumer }; // --------------------------------------------------[4]
export default ColorContext;// ---------------------------------------------------------------[5]
```
[1] React.createContext()로 context객체를 만든다.    
[2] children을 받아서 value props를 넣어주는 Provider를 만든다.   
[3] ColorContext.Consumer는 ColorConsumer다.   
   
(export하는 부분)      
[4] Provider와 Consumer를 각각 import하여 사용할 수 있도록 export   
[5] ColorContext를 통째로사용할 수도 있도록 export   


### SelectColors와 ColorBox : Consumer가 된다.
ColorContext.ColorConsumer를 return하는 컴포넌트들이다.    
#### 1. SelectColors.js         
```javascript
import {ColorConsumer} from "../contexts/colors"; // --------------------------------------------------------[1]
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
const SelectColors = () => {
    return ( 
        <div>
            <h2>색상을 선택하세요</h2>
            <ColorConsumer>
                {({actions}) => ( // ------------------------------------------------------------------------[2]
                                  // ...(내부 JSX 생략)...
                )}
            </ColorConsumer>
            <hr/>
        </div>
    );
};// -------------------------------------------------------------------------------------------------------[3]
export default SelectColors;
```
[1] 내가 createContext로 생성한 context객체   
[2] 여기서 인자로받는 actions도 ColorBox와 같게 "Provider컴포넌트의 props중 value값"과 동일하다.   
    SelectColors의 상위컴포넌트인 ColorProvider에서 value={여기다넣은거} prop을 받아오는 것! (App.js참고)   
[3] SelectColors는 \<ColorConsumer/>를 리턴한다.   


#### 2. ColorBox.js   
```javascript
import ColorContext from "../contexts/colors"; // --------------------------------------------------------[1]
import {ColorConsumer} from "../contexts/colors";


const ColorBox = () => {
    return (
        <ColorConsumer>
            {value => (     // ---------------------------------------------------------------------------[2]
                            // ...(내부JSX생략)...
            )}
        </ColorConsumer>
    );
};// -----------------------------------------------------------------------------------------------------[3]
export default ColorBox;
```
[1] 내가 createContext로 생성한 context객체   
[2] Consumer의 "children함수"에 전달되는 value는 "Provider컴포넌트의 props중 value값"과 동일하다.   
    ColorBox의 상위컴포넌트인 ColorProvider에서 value={여기다넣은거} prop을 받아오는 것! (App.js참고)   
[3] ColorBox는 \<ColorConsumer/>를 리턴한다.      
