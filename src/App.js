import './App.css';
import ColorBox from "./components/ColorBox";
import ColorContext, {ColorProvider} from "./contexts/colors";
import SelectColors from "./components/SelectColors";
import SelectColorsClass from "./components/SelectColorsClass"; // export를 ColorProvider도 따로 했으니까 import가능


function App() {
  return (
      <ColorProvider>
          <div>
              <SelectColorsClass/>
              <ColorBox/>
          </div>
      </ColorProvider>
  );
}

export default App;
