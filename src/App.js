import './App.css';

import backgroundImage from './pitch_and_roll.svg'

import { Canvas, useLoader } from '@react-three/fiber'
import { Euler } from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useCallback, useRef, useState } from 'react'

const DEFAULT_Y_ROTATION = 4.7;

export const degreesToRadians = (degrees) => degrees * (Math.PI / 180);
export const radiansToDegrees = (radians) => (radians * 180) / Math.PI;

const Sphere = ({ pitch, roll }) => {
  const sphereRef = useRef();
  const colorMap = useLoader(TextureLoader, 'texturka.jpg');

  return (
      <mesh
          ref={sphereRef}
          position={[0.01, -0.01, 3.11]}
          rotation={new Euler(
              degreesToRadians(roll || 0),
              DEFAULT_Y_ROTATION,
              degreesToRadians(pitch || 0),
              'YXZ',
          )}
      >
          <sphereBufferGeometry />
          <meshStandardMaterial map={colorMap} />
      </mesh>
  );
}

const imageCanvas = document.createElement("canvas");
const context = imageCanvas.getContext("2d");

function App() {
  const [pitch, setPitch] = useState(0);
  const [roll, setRoll] = useState(0);
  const [lightIntensity, setLightIntensity] = useState(2);
  const [lightColor, setLightColor] = useState("#AAEEFF");
  const [lightPos, setLightPos] = useState([0, 0, 6]);

  const onPitchChange = useCallback((event) => {
    setPitch(event.target.value);
  }, []);

  const onRollChange = useCallback((event) => {
    setRoll(event.target.value);
  }, []);

  const onLightIntensityChange = useCallback((event) => {
    setLightIntensity(event.target.value);
  }, []);

  const onLightColorChange = useCallback((event) => {
    setLightColor(event.target.value);
  }, []);

  const onLightPosChange = useCallback((coordinate, { target : { value } }) => {
    const [x, y, z] = lightPos;

    const pos = { x, y, z };
    pos[coordinate] = value;

    setLightPos([pos.x, pos.y, pos.z]);
  }, [lightPos]);

  return (
    <div className="App">
        <aside>
          <label>
            Pitch: <input type="number" step={1} value={pitch} onChange={onPitchChange} />
          </label>
          <label>
            Roll: <input type="number" step={1} value={roll} onChange={onRollChange} />
          </label>
          <label>
            Light intensity: <input type="number" step={1} value={lightIntensity} onChange={onLightIntensityChange} />
          </label>
          <label>
            Light color: <input type="text" value={lightColor} onChange={onLightColorChange} />
          </label>
          <hr />
          <label>
            Light position:
          </label>
          <label>
            X: <input type="number" step={1} value={lightPos[0]} onChange={onLightPosChange.bind(this, 'x')} />
          </label>
          <label>
            Y: <input type="number" step={1} value={lightPos[1]} onChange={onLightPosChange.bind(this, 'y')} />
          </label>
          <label>
            Z: <input type="number" step={1} value={lightPos[2]} onChange={onLightPosChange.bind(this, 'z')} />
          </label>
        </aside>
        <div id="canvasContainer">
          <img className='bg' src={backgroundImage} alt="Background" />
          <Canvas style={{ width: '236px', height: '236px'}}>
              <directionalLight position={lightPos} intensity={lightIntensity} color={lightColor} />
              <Sphere pitch={pitch} roll={roll} />
          </Canvas>
        </div>
    </div>
  );
}

export default App;
