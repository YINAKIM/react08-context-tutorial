import './App.css';
import ColorBox from "./components/ColorBox";
import ColorContext from "./contexts/colors";

function App() {
  return (
      <ColorContext.Provider value={{color: 'red'}}>
          {/*
            Provider를 사용하면 Context의 value를 변경할 수 있다.
            - createContext에 넣어주는 defaultValue는 Provider를 사용하지 않았을 때만 사용된다.
            - Provider를 사용하고 기본값보여준다고 value값을 "명시하지 않으면오류발생"
           */}
          <div>
            <ColorBox/>
          </div>
      </ColorContext.Provider>
  );
}

export default App;
