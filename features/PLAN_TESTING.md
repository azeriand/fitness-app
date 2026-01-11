# 🧪 Plan de Testing para Fitness App

## 📚 Índice
1. [¿Qué son los Tests y por qué son importantes?](#qué-son-los-tests-y-por-qué-son-importantes)
2. [Tipos de Tests](#tipos-de-tests)
3. [Herramientas: Jest y React Testing Library](#herramientas-jest-y-react-testing-library)
4. [¿Qué es el Coverage?](#qué-es-el-coverage)
5. [Configuración Inicial](#configuración-inicial)
6. [Plan de Testing para este Proyecto](#plan-de-testing-para-este-proyecto)
7. [Ejemplos Prácticos](#ejemplos-prácticos)
8. [Buenas Prácticas](#buenas-prácticas)
9. [Recursos Adicionales](#recursos-adicionales)

---

## 🎯 ¿Qué son los Tests y por qué son importantes?

### Analogía:

Imagina que estás construyendo una casa en Minecraft:

**Sin tests (Modo Supervivencia sin preparación):**
- Construyes directamente sin planificar
- Un creeper explota y destruye parte de tu casa
- Intentas arreglarla, pero algo más se rompe
- No estás seguro si las puertas funcionan correctamente
- Cada cambio puede romper algo que ya funcionaba
- Tienes que probarlo todo manualmente cada vez

**Con tests (Modo con redstone y comandos de prueba):**
- **Unit tests = Probar cada bloque individual**
  - ¿Esta puerta se abre y cierra? ✅
  - ¿Este pistón empuja correctamente? ✅
  - ¿Esta antorcha de redstone enciende? ✅

- **Integration tests = Probar mecanismos completos**
  - ¿La puerta secreta funciona cuando presiono el botón? ✅
  - ¿La granja automática recolecta y guarda items? ✅
  - ¿El sistema de iluminación se activa de noche? ✅

- **E2E tests = Probar toda la construcción**
  - ¿Puedo entrar, dormir, y salir sin problemas? ✅
  - ¿Los mobs no pueden entrar? ✅
  - ¿Todo funciona junto correctamente? ✅

### Ahora aplícalo a tu código:

Los tests en programación funcionan igual:
- Verifican que **cada pieza de código funcione correctamente** (como cada bloque de redstone)
- Previenen que **cambios futuros rompan funcionalidades existentes** (como asegurarte que modificar una puerta no rompa otra)
- Te dan **confianza** para hacer cambios y refactorizar (como renovar tu casa sabiendo que todo seguirá funcionando)
- Sirven como **documentación** de cómo debe funcionar tu código (como un tutorial de redstone que muestra cómo funciona cada mecanismo)

### ¿Por qué testear?

#### 1. **Detectar bugs temprano** 🐛
Sin tests, encuentras bugs cuando el usuario los reporta (¡malo!).
Con tests, encuentras bugs mientras desarrollas (¡bueno!).

#### 2. **Refactorizar con confianza** 💪
Puedes cambiar código sin miedo. Si rompes algo, los tests te avisan inmediatamente.

#### 3. **Documentación viva** 📖
Los tests muestran cómo se supone que funciona tu código:
```javascript
test('debe calcular el tiempo total de entrenamiento correctamente', () => {
  // Este test te dice exactamente qué hace la función
})
```

#### 4. **Mejor diseño de código** 🎨
El código testeable suele ser código bien diseñado. Si algo es difícil de testear, probablemente necesita refactorización.

#### 5. **Dormir tranquilo** 😴
Despliegas con confianza sabiendo que tus tests verifican que todo funciona.

---

## 🔬 Tipos de Tests

### 1. **Unit Tests (Tests Unitarios)** 🧩
- **Qué prueban**: Funciones o componentes individuales de forma aislada
- **Velocidad**: Muy rápidos (milisegundos)
- **Cantidad**: Muchos (la mayoría de tus tests)
- **Ejemplo**: Probar que la función `getCurrentDateTime()` devuelve el formato correcto

```javascript
// Unit test
test('getCurrentDateTime devuelve fecha en formato DD/MM/YYYY HH:mm', () => {
  const result = getCurrentDateTime()
  expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/)
})
```

### 2. **Integration Tests (Tests de Integración)** 🔗
- **Qué prueban**: Cómo funcionan varios componentes juntos
- **Velocidad**: Más lentos que unitarios
- **Cantidad**: Menos que unitarios, más que E2E
- **Ejemplo**: Probar que al hacer clic en "Start" en una rutina, navegas a `/training` y se actualiza el contexto

```javascript
// Integration test
test('al iniciar rutina, navega a training y actualiza el estado', () => {
  render(<RoutineCard exercises={mockExercises} label="Push Day" />)
  fireEvent.click(screen.getByText('Start'))
  
  expect(mockNavigate).toHaveBeenCalledWith('/training')
  expect(mockSetTrainingData).toHaveBeenCalled()
})
```

### 3. **E2E Tests (End-to-End)** 🎬
- **Qué prueban**: Flujos completos de usuario en un navegador real
- **Velocidad**: Lentos (segundos/minutos)
- **Cantidad**: Pocos (solo flujos críticos)
- **Herramientas**: Cypress, Playwright
- **Nota**: No los cubriremos en este plan (solo Jest + RTL)

### Pirámide de Testing 🔺
```
        /\     ← E2E (pocos, lentos, costosos)
       /  \
      /____\   ← Integration (algunos, medios)
     /      \
    /________\ ← Unit (muchos, rápidos, baratos)
```

---

## 🛠️ Herramientas: Jest y React Testing Library

### Jest
**¿Qué es?** Un framework de testing completo para JavaScript.

**Proporciona:**
- **Test runner**: Ejecuta tus tests
- **Assertions**: Verificaciones (`expect()`)
- **Mocks**: Simular funciones y módulos
- **Coverage**: Reportes de cobertura

```javascript
// Ejemplo de Jest
describe('Utilidades de fecha', () => {
  test('formatea fecha correctamente', () => {
    const result = formatDate('2026-01-11')
    expect(result).toBe('11/01/2026')
  })
})
```

### React Testing Library (RTL)
**¿Qué es?** Una librería para testear componentes React de forma que simula cómo los usuarios interactúan con tu app.

**Filosofía clave:**
> "Mientras más se parezcan tus tests a cómo se usa tu software, más confianza te darán"

**No testeas:**
- Estado interno del componente
- Nombres de props
- Implementación interna

**Sí testeas:**
- Lo que el usuario VE
- Lo que el usuario HACE
- Cómo reacciona la UI

```javascript
// ❌ MAL: Testeando detalles de implementación
expect(wrapper.state('isOpen')).toBe(true)

// ✅ BIEN: Testeando comportamiento visible
expect(screen.getByRole('dialog')).toBeInTheDocument()
```

### Funciones principales de RTL

#### 1. **render()** - Renderiza componentes
```javascript
render(<ExerciseCard label="Press Banca" sets={3} />)
```

#### 2. **screen** - Busca elementos en el DOM
```javascript
screen.getByText('Press Banca')
screen.getByRole('button', { name: /start/i })
```

#### 3. **fireEvent / userEvent** - Simula interacciones
```javascript
fireEvent.click(screen.getByText('Start'))
```

#### 4. **waitFor** - Espera cambios asíncronos
```javascript
await waitFor(() => {
  expect(screen.getByText('Cargando...')).toBeInTheDocument()
})
```

---

## 📊 ¿Qué es el Coverage?

**Coverage (cobertura)** mide qué porcentaje de tu código está siendo ejecutado por tus tests.

### Métricas de Coverage

1. **Line Coverage**: % de líneas ejecutadas
2. **Branch Coverage**: % de ramas if/else ejecutadas
3. **Function Coverage**: % de funciones llamadas
4. **Statement Coverage**: % de statements ejecutados

### Ejemplo Visual
```javascript
function getDiscountPrice(price, hasDiscount) {
  if (hasDiscount) {           // ← Branch 1
    return price * 0.8         // ← Line executed only if hasDiscount = true
  }
  return price                 // ← Branch 2
}

// Test sin coverage completo
test('aplica descuento', () => {
  expect(getDiscountPrice(100, true)).toBe(80)
  // ❌ Line coverage: 66% (no probamos hasDiscount = false)
})

// Tests con coverage completo
test('aplica descuento cuando hasDiscount es true', () => {
  expect(getDiscountPrice(100, true)).toBe(80)
})

test('no aplica descuento cuando hasDiscount es false', () => {
  expect(getDiscountPrice(100, false)).toBe(100)
  // ✅ Line coverage: 100%
})
```

### Ver el reporte de coverage
```bash
npm test -- --coverage
```

Verás algo como:
```
File         | % Stmts | % Branch | % Funcs | % Lines |
-------------|---------|----------|---------|---------|
datetime.js  |   85.7  |   75.0   |  100.0  |  85.7   |
```

### ⚠️ Importante: Coverage no es el objetivo final

**El coverage NO garantiza código libre de bugs**. Puedes tener 100% coverage con tests malos:

```javascript
// ❌ 100% coverage, pero test inútil
test('función existe', () => {
  calculateTotal(10, 20, 30)
  // No verificamos NADA, solo la ejecutamos
})

// ✅ Buen test que además da coverage
test('calcula total correctamente', () => {
  expect(calculateTotal(10, 20, 30)).toBe(60)
})
```

### Para este proyecto:
- **NO vamos a buscar 100% coverage**
- **Sí vamos a testear puntos estratégicos** que enseñen diferentes conceptos
- El objetivo es **aprender**, no alcanzar una métrica específica

---

## ⚙️ Configuración Inicial

### 1. Instalar dependencias

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest jest-environment-jsdom @babel/preset-env @babel/preset-react
```

### 2. Crear configuración de Jest: `jest.config.js`

```javascript
export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg|mp4)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/main.jsx',
    '!src/**/*.test.{js,jsx}',
    '!src/**/__tests__/**'
  ]
}
```

### 3. Crear `jest.setup.js`

```javascript
import '@testing-library/jest-dom'
```

### 4. Crear mock de archivos: `__mocks__/fileMock.js`

```javascript
module.exports = 'test-file-stub'
```

### 5. Configurar Babel: `.babelrc`

**¿Por qué necesitamos Babel?** 🤔

Jest se ejecuta en **Node.js**, no en el navegador. Node.js no entiende nativamente:
- JSX (`<Component />`)
- Sintaxis moderna de ES6+ (import/export)
- Características específicas de React

**Babel es un traductor** que convierte tu código moderno en código que Node.js puede ejecutar:

```jsx
// Tu código (JSX):
const element = <div>Hello</div>

// Lo que Babel traduce para Node.js:
const element = React.createElement('div', null, 'Hello')
```

**En resumen**: Babel permite que Jest entienda tu código React moderno.

```json
{
  "presets": [
    ["@babel/preset-env", { "targets": { "node": "current" } }],
    ["@babel/preset-react", { "runtime": "automatic" }]
  ]
}
```

### 6. Agregar scripts a `package.json`

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

---

## 🎓 Plan de Testing para este Proyecto

El objetivo es **aprender diferentes conceptos**, no alcanzar coverage perfecto. Vamos a testear puntos estratégicos que enseñen técnicas distintas.

### 🗂️ Estructura de carpetas propuesta

```
src/
  utils/
    datetime.js
    __tests__/
      datetime.test.js
  components/
    exercise-card.jsx
    color-badge.jsx
    routine-card.jsx
    __tests__/
      exercise-card.test.jsx
      color-badge.test.jsx
      routine-card.test.jsx
  hooks/
    useLocalStorage.ts
    __tests__/
      useLocalStorage.test.ts
```

### 📝 Tests que vamos a crear

#### Nivel 1: Tests Básicos (Unit Tests)
**Objetivo**: Aprender lo fundamental

##### ✅ 1. `datetime.test.js` - Función pura simple
**Conceptos**: Test básico, matchers, regex
- ✓ Devuelve formato correcto DD/MM/YYYY HH:mm
- ✓ Devuelve un string válido
- ✓ La fecha es la actual (within 1 minuto)

**Por qué este primero**: Es lo más simple. Una función pura sin dependencias.

##### ✅ 2. `color-badge.test.jsx` - Componente presentacional
**Conceptos**: render, getByText, props, snapshots
- ✓ Renderiza el label correctamente
- ✓ Aplica la clase CSS basada en el muscle type
- ✓ Muestra diferentes tamaños (sm, md, lg)

**Por qué este**: Componente simple sin lógica compleja, ideal para aprender RTL básico.

#### Nivel 2: Tests Intermedios (Unit + Integration)
**Objetivo**: Componentes con interacción y lógica

##### ✅ 3. `exercise-card.test.jsx` - Componente con props
**Conceptos**: Renderizado condicional, testing de props variadas
- ✓ Renderiza label e imagen
- ✓ Muestra sets cuando se proporciona
- ✓ No muestra sets cuando no se proporciona
- ✓ Renderiza múltiples badges
- ✓ El input está disabled

**Por qué este**: Enseña renderizado condicional y múltiples variaciones del mismo componente.

##### ✅ 4. `useLocalStorage.test.ts` - Custom Hook
**Conceptos**: Testing hooks, renderHook, localStorage mocking
- ✓ Inicializa con valor por defecto
- ✓ Lee valor del localStorage si existe
- ✓ Actualiza localStorage cuando cambia el valor
- ✓ Parsea JSON correctamente
- ✓ Maneja errores de parsing

**Por qué este**: Los hooks son diferentes, necesitas `renderHook` de RTL, y aprendes a mockear APIs del browser.

#### Nivel 3: Tests Avanzados (Integration)
**Objetivo**: Componentes con contexto, navegación, interacciones complejas

**🎭 ¿Qué es un Mock?**

Un **mock** es un "objeto falso" que simula el comportamiento de algo real.

**Analogía Minecraft**: Imagina que quieres probar tu sistema de defensa contra creepers, pero no quieres que exploten de verdad tu construcción. Entonces:
- ❌ **Sin mock**: Usas creepers reales → pueden destruir todo
- ✅ **Con mock**: Usas "creepers de prueba" que simulan acercarse pero no explotan

**En código**:
```javascript
// ❌ Sin mock: useNavigate real (navegaría de verdad en el test)
const navigate = useNavigate() 

// ✅ Con mock: useNavigate falso (solo verificamos que se llamó)
const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}))
```

**¿Por qué usar mocks?**
1. **Aislamiento**: Probar solo TU código, no librerías externas
2. **Control**: Simular diferentes escenarios (éxito, error, loading)
3. **Velocidad**: No hacer llamadas reales a APIs o bases de datos
4. **Verificación**: Comprobar que se llamó con los parámetros correctos

**Ejemplo práctico**:
```javascript
// Tu componente llama a navigate('/training')
// En el test verificas:
expect(mockNavigate).toHaveBeenCalledWith('/training')
// ¡No navegó de verdad! Solo verificaste que se llamó correctamente
```

##### ✅ 5. `routine-card.test.jsx` - Componente con contexto y navegación
**Conceptos**: Mocking contexto, mocking hooks (useNavigate), fireEvent, user interactions
- ✓ Renderiza información de la rutina
- ✓ Muestra lista de ejercicios
- ✓ Al hacer clic en "Start", navega a /training
- ✓ Al hacer clic en "Start", actualiza trainingData
- ✓ Al hacer clic en "Edit", navega a /edit-routine con query params
- ✓ Muestra timeAgo correctamente

**Por qué este**: Es el test más complejo. Combina contexto, navegación, múltiples interacciones, y custom hooks.

### 📊 Resumen de conceptos aprendidos

| Test | Nivel | Conceptos Clave |
|------|-------|-----------------|
| datetime | Básico | Jest basics, matchers, regex |
| color-badge | Básico | render, screen, getByText, props |
| exercise-card | Intermedio | Renderizado condicional, múltiples casos |
| useLocalStorage | Intermedio | renderHook, mocking APIs, hooks |
| routine-card | Avanzado | Context, navigation, fireEvent, integration |

### 🎯 Cobertura esperada
No es el objetivo, pero aproximadamente:
- **Utils**: ~70-80%
- **Components**: ~40-60%
- **Hooks**: ~70-80%
- **Total**: ~50-60%

**¿Por qué no 100%?**
- Muchos componentes usan contextos complejos (difíciles de testear)
- No todos los edge cases están cubiertos
- El foco es **aprender**, no coverage exhaustivo

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Test Unitario Simple - `datetime.test.js`

```javascript
// src/utils/__tests__/datetime.test.js
import { getCurrentDateTime } from '../datetime'

describe('Utilidades de fecha y hora', () => {
  describe('getCurrentDateTime', () => {
    test('devuelve un string', () => {
      const result = getCurrentDateTime()
      expect(typeof result).toBe('string')
    })

    test('devuelve formato DD/MM/YYYY HH:mm', () => {
      const result = getCurrentDateTime()
      // Regex para validar formato: 01/01/2026 15:30
      expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/)
    })

    test('devuelve la fecha/hora actual', () => {
      const before = new Date()
      const result = getCurrentDateTime()
      const after = new Date()
      
      // Extraer fecha del string "11/01/2026 15:30"
      const [datePart] = result.split(' ')
      const [day, month, year] = datePart.split('/')
      const resultDate = new Date(year, month - 1, day)
      
      expect(resultDate.getTime()).toBeGreaterThanOrEqual(before.setHours(0, 0, 0, 0))
      expect(resultDate.getTime()).toBeLessThanOrEqual(after.getTime())
    })
  })
})
```

### Ejemplo 2: Test de Componente Presentacional - `color-badge.test.jsx`

```javascript
// src/components/__tests__/color-badge.test.jsx
import { render, screen } from '@testing-library/react'
import ColorBadge from '../color-badge'

describe('ColorBadge', () => {
  test('renderiza el label correctamente', () => {
    render(<ColorBadge label="Pecho" />)
    expect(screen.getByText('Pecho')).toBeInTheDocument()
  })

  test('aplica tamaño pequeño cuando size="sm"', () => {
    const { container } = render(<ColorBadge label="Pecho" size="sm" />)
    const badge = container.querySelector('.badge') // Ajusta el selector según tu componente
    expect(badge).toHaveClass('badge-sm') // Ajusta la clase según tu implementación
  })

  test('renderiza diferentes tipos de músculos', () => {
    const muscles = ['Pecho', 'Espalda', 'Piernas', 'Hombros']
    
    muscles.forEach(muscle => {
      const { unmount } = render(<ColorBadge label={muscle} />)
      expect(screen.getByText(muscle)).toBeInTheDocument()
      unmount() // Limpia entre renderizados
    })
  })

  test('puede recibir className personalizado', () => {
    const { container } = render(
      <ColorBadge label="Pecho" className="custom-class" />
    )
    const badge = container.firstChild
    expect(badge).toHaveClass('custom-class')
  })
})
```

### Ejemplo 3: Test de Hook - `useLocalStorage.test.ts`

```javascript
// src/hooks/__tests__/useLocalStorage.test.ts
import { renderHook, act } from '@testing-library/react'
import useLocalStorage from '../useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    // Limpiar localStorage antes de cada test
    localStorage.clear()
  })

  test('inicializa con valor por defecto', () => {
    const { result } = renderHook(() => 
      useLocalStorage('testKey', 'defaultValue')
    )
    
    expect(result.current[0]).toBe('defaultValue')
  })

  test('lee valor existente del localStorage', () => {
    localStorage.setItem('testKey', JSON.stringify('existingValue'))
    
    const { result } = renderHook(() => 
      useLocalStorage('testKey', 'defaultValue')
    )
    
    expect(result.current[0]).toBe('existingValue')
  })

  test('actualiza localStorage cuando cambia el valor', () => {
    const { result } = renderHook(() => 
      useLocalStorage('testKey', 'initial')
    )
    
    act(() => {
      result.current[1]('updated')
    })
    
    expect(localStorage.getItem('testKey')).toBe(JSON.stringify('updated'))
    expect(result.current[0]).toBe('updated')
  })

  test('maneja objetos complejos', () => {
    const complexObject = { name: 'Test', exercises: [1, 2, 3] }
    
    const { result } = renderHook(() => 
      useLocalStorage('testKey', null)
    )
    
    act(() => {
      result.current[1](complexObject)
    })
    
    expect(result.current[0]).toEqual(complexObject)
  })

  test('maneja errores de parsing gracefully', () => {
    // Poner un valor inválido en localStorage
    localStorage.setItem('testKey', 'invalid-json{')
    
    const { result } = renderHook(() => 
      useLocalStorage('testKey', 'defaultValue')
    )
    
    // Debe volver al valor por defecto si hay error
    expect(result.current[0]).toBe('defaultValue')
  })
})
```

### Ejemplo 4: Test de Integración - `routine-card.test.jsx`

```javascript
// src/components/__tests__/routine-card.test.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import RoutineCard from '../routine-card'
import { TrainingContext } from '../training-context'

// Mock de useNavigate
const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

// Mock de useGetExercises
jest.mock('../../hooks/useGetExercises', () => ({
  __esModule: true,
  default: jest.fn(() => [
    { exercise_name: 'Press Banca', muscle_type: 'Pecho' },
    { exercise_name: 'Sentadilla', muscle_type: 'Piernas' },
  ])
}))

describe('RoutineCard', () => {
  const mockSetTrainingData = jest.fn()
  const mockRoutinesList = [
    {
      routine_name: 'Push Day',
      exercises: [
        { exercise_name: 'Press Banca', sets: 3 },
        { exercise_name: 'Press Militar', sets: 3 },
      ]
    }
  ]

  const defaultProps = {
    exercises: [
      { exercise_name: 'Press Banca' },
      { exercise_name: 'Press Militar' }
    ],
    label: 'Push Day',
    timeAgo: 'hace 2 días'
  }

  const wrapper = ({ children }) => (
    <BrowserRouter>
      <TrainingContext.Provider value={{
        routinesList: mockRoutinesList,
        setTrainingData: mockSetTrainingData
      }}>
        {children}
      </TrainingContext.Provider>
    </BrowserRouter>
  )

  beforeEach(() => {
    mockNavigate.mockClear()
    mockSetTrainingData.mockClear()
  })

  test('renderiza el nombre de la rutina', () => {
    render(<RoutineCard {...defaultProps} />, { wrapper })
    expect(screen.getByText('Push Day')).toBeInTheDocument()
  })

  test('renderiza el timeAgo', () => {
    render(<RoutineCard {...defaultProps} />, { wrapper })
    expect(screen.getByText('hace 2 días')).toBeInTheDocument()
  })

  test('renderiza la lista de ejercicios', () => {
    render(<RoutineCard {...defaultProps} />, { wrapper })
    expect(screen.getByText('Press Banca')).toBeInTheDocument()
    expect(screen.getByText('Sentadilla')).toBeInTheDocument()
  })

  test('al hacer clic en Start, navega a /training', () => {
    render(<RoutineCard {...defaultProps} />, { wrapper })
    
    const startButton = screen.getByText('Start')
    fireEvent.click(startButton)
    
    expect(mockNavigate).toHaveBeenCalledWith('/training')
  })

  test('al hacer clic en Start, actualiza trainingData con state RUNNING', () => {
    render(<RoutineCard {...defaultProps} />, { wrapper })
    
    const startButton = screen.getByText('Start')
    fireEvent.click(startButton)
    
    expect(mockSetTrainingData).toHaveBeenCalledWith({
      ...mockRoutinesList[0],
      state: 'RUNNING'
    })
  })

  test('al hacer clic en Edit, navega a /edit-routine con el nombre', () => {
    render(<RoutineCard {...defaultProps} />, { wrapper })
    
    const editButton = screen.getByText('Edit')
    fireEvent.click(editButton)
    
    expect(mockNavigate).toHaveBeenCalledWith('/edit-routine?name=Push Day')
  })

  test('renderiza botones de Start y Edit', () => {
    render(<RoutineCard {...defaultProps} />, { wrapper })
    
    expect(screen.getByText('Start')).toBeInTheDocument()
    expect(screen.getByText('Edit')).toBeInTheDocument()
  })
})
```

### Ejemplo 5: Test de Componente con Renderizado Condicional

```javascript
// src/components/__tests__/exercise-card.test.jsx
import { render, screen } from '@testing-library/react'
import ExerciseCard from '../exercise-card'

describe('ExerciseCard', () => {
  const defaultProps = {
    label: 'Press Banca',
    img: '/images/press-banca.jpg'
  }

  test('renderiza el label del ejercicio', () => {
    render(<ExerciseCard {...defaultProps} />)
    expect(screen.getByText('Press Banca')).toBeInTheDocument()
  })

  test('renderiza la imagen del ejercicio', () => {
    render(<ExerciseCard {...defaultProps} />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', '/images/press-banca.jpg')
  })

  test('muestra el número de sets cuando se proporciona', () => {
    render(<ExerciseCard {...defaultProps} sets={3} />)
    const input = screen.getByDisplayValue('3')
    expect(input).toBeInTheDocument()
    expect(input).toBeDisabled()
  })

  test('no muestra input de sets cuando no se proporciona', () => {
    render(<ExerciseCard {...defaultProps} />)
    const inputs = screen.queryAllByRole('textbox')
    expect(inputs).toHaveLength(0)
  })

  test('renderiza múltiples badges', () => {
    const badges = [
      <span key="1">Pecho</span>,
      <span key="2">Tríceps</span>
    ]
    
    render(<ExerciseCard {...defaultProps} badges={badges} />)
    expect(screen.getByText('Pecho')).toBeInTheDocument()
    expect(screen.getByText('Tríceps')).toBeInTheDocument()
  })

  test('acepta props adicionales (spread ...cardProps)', () => {
    const { container } = render(
      <ExerciseCard 
        {...defaultProps} 
        data-testid="exercise-card"
        className="custom-class"
      />
    )
    
    const card = container.querySelector('[data-testid="exercise-card"]')
    expect(card).toBeInTheDocument()
  })
})
```

---

## ✨ Buenas Prácticas

### 1. **Arrange, Act, Assert (AAA)**
Estructura tus tests en 3 partes claramente:

```javascript
test('descripción', () => {
  // Arrange (Preparar): Setup inicial
  const user = { name: 'Juan', age: 25 }
  
  // Act (Actuar): Ejecutar la acción
  const result = getUserInfo(user)
  
  // Assert (Afirmar): Verificar el resultado
  expect(result).toBe('Juan (25 años)')
})
```

### 2. **Nombres descriptivos**
El nombre del test debe explicar qué hace y qué espera:

```javascript
// ❌ MAL
test('test 1', () => {})
test('funciona', () => {})

// ✅ BIEN
test('devuelve error cuando el email es inválido', () => {})
test('muestra mensaje de éxito después de guardar', () => {})
```

### 3. **Un concepto por test**
No mezcles múltiples verificaciones no relacionadas:

```javascript
// ❌ MAL: Test que hace demasiado
test('función de usuario', () => {
  expect(getUser()).toBeDefined()
  expect(saveUser()).toBe(true)
  expect(deleteUser()).not.toThrow()
})

// ✅ BIEN: Tests separados
test('getUser devuelve un usuario', () => {
  expect(getUser()).toBeDefined()
})

test('saveUser retorna true cuando se guarda exitosamente', () => {
  expect(saveUser()).toBe(true)
})
```

### 4. **Testear comportamiento, no implementación**

```javascript
// ❌ MAL: Testeando implementación
test('llama a setState con el valor correcto', () => {
  const wrapper = shallow(<Counter />)
  wrapper.instance().setState({ count: 5 })
  expect(wrapper.state('count')).toBe(5)
})

// ✅ BIEN: Testeando comportamiento
test('incrementa el contador cuando se hace clic', () => {
  render(<Counter />)
  fireEvent.click(screen.getByText('+'))
  expect(screen.getByText('Count: 1')).toBeInTheDocument()
})
```

### 5. **Usar data-testid solo cuando sea necesario**

```javascript
// ✅ MEJOR: Usar roles y texto (más parecido al usuario real)
screen.getByRole('button', { name: /start/i })
screen.getByText('Press Banca')
screen.getByLabelText('Email')

// ⚠️ ACEPTABLE: Cuando no hay otra forma
screen.getByTestId('complex-chart-component')
```

### 6. **Limpiar después de cada test**

```javascript
describe('Tests con efectos secundarios', () => {
  beforeEach(() => {
    // Setup antes de cada test
    localStorage.clear()
    jest.clearAllMocks()
  })

  afterEach(() => {
    // Cleanup después de cada test
    cleanup() // RTL lo hace automáticamente
  })
})
```

### 7. **Mockear solo lo necesario**

```javascript
// ❌ MALO: Mockear demasiado
jest.mock('../all-components')
jest.mock('../all-utils')
jest.mock('../all-hooks')

// ✅ BIEN: Mock específico
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))
```

### 8. **Tests deben ser independientes**
Cada test debe poder ejecutarse solo y en cualquier orden:

```javascript
// ❌ MAL: Tests dependientes
test('crea usuario', () => {
  userId = createUser('Juan')
})

test('actualiza usuario', () => {
  updateUser(userId, { name: 'Pedro' }) // Depende del test anterior
})

// ✅ BIEN: Tests independientes
test('crea usuario', () => {
  const userId = createUser('Juan')
  expect(userId).toBeDefined()
})

test('actualiza usuario', () => {
  const userId = createUser('Juan') // Crea su propio usuario
  updateUser(userId, { name: 'Pedro' })
  expect(getUser(userId).name).toBe('Pedro')
})
```

### 9. **No testear código de terceros**
No necesitas testear React, dayjs, o librerías externas:

```javascript
// ❌ INNECESARIO
test('dayjs formatea fechas', () => {
  expect(dayjs('2026-01-11').format('DD/MM/YYYY')).toBe('11/01/2026')
})

// ✅ BIEN: Testea TU código
test('getCurrentDateTime usa el formato correcto', () => {
  const result = getCurrentDateTime()
  expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4}/)
})
```

### 10. **Usar describe para agrupar tests relacionados**

```javascript
describe('RoutineCard', () => {
  describe('renderizado', () => {
    test('muestra el título', () => {})
    test('muestra la lista de ejercicios', () => {})
  })

  describe('interacciones', () => {
    test('navega al hacer clic en Start', () => {})
    test('navega al hacer clic en Edit', () => {})
  })

  describe('edge cases', () => {
    test('maneja lista vacía de ejercicios', () => {})
    test('maneja rutina sin nombre', () => {})
  })
})
```

---

## 📚 Recursos Adicionales

### Documentación Oficial
- **Jest**: https://jestjs.io/docs/getting-started
- **React Testing Library**: https://testing-library.com/docs/react-testing-library/intro/
- **Testing Library Queries**: https://testing-library.com/docs/queries/about

### Guías y Tutoriales
- **Kent C. Dodds Blog**: https://kentcdodds.com/blog (creador de RTL)
- **Common mistakes with RTL**: https://kentcdodds.com/blog/common-mistakes-with-react-testing-library
- **Jest Cheat Sheet**: https://github.com/sapegin/jest-cheat-sheet

### Herramientas útiles
- **Testing Playground**: https://testing-playground.com/ (prueba queries de RTL)
- **Jest Preview**: https://www.jest-preview.com/ (visualiza tu UI durante tests)

### Videos recomendados (YouTube)
- "React Testing Library Tutorial" - Codevolution
- "Testing React Apps" - Academind
- "Jest Crash Course" - Traversy Media

---

## 🎯 Checklist de Progreso

Marca cada item cuando lo completes:

### Configuración
- [ ] Instalar dependencias
- [ ] Crear jest.config.js
- [ ] Crear jest.setup.js
- [ ] Configurar Babel
- [ ] Agregar scripts a package.json
- [ ] Ejecutar primer test de prueba

### Tests Nivel 1 (Básico)
- [ ] Test: datetime.js
- [ ] Test: color-badge.jsx

### Tests Nivel 2 (Intermedio)
- [ ] Test: exercise-card.jsx
- [ ] Test: useLocalStorage hook

### Tests Nivel 3 (Avanzado)
- [ ] Test: routine-card.jsx

### Conceptos Aprendidos
- [ ] Entiendo qué es un test y por qué es importante
- [ ] Puedo usar los matchers básicos de Jest (toBe, toEqual, toMatch)
- [ ] Puedo renderizar componentes con RTL
- [ ] Puedo buscar elementos con screen.getByText, getByRole
- [ ] Puedo simular eventos con fireEvent
- [ ] Entiendo cómo mockear módulos
- [ ] Puedo testear hooks con renderHook
- [ ] Puedo crear wrappers con providers (Context)
- [ ] Entiendo qué es coverage y cómo verlo
- [ ] Sé cuándo NO escribir tests

### Práctica adicional (Opcional)
- [ ] Crear test para otro componente simple
- [ ] Crear test para una función en src/utils
- [ ] Refactorizar un componente para hacerlo más testeable
- [ ] Experimentar con user-event en lugar de fireEvent
- [ ] Escribir un test de snapshot

---

## 🚀 Siguientes Pasos

Una vez completado este plan:

1. **Practica regularmente**
   - Escribe tests para cada nuevo componente
   - Refactoriza tests existentes
   - Experimenta con diferentes escenarios

2. **Explora conceptos avanzados**
   - MSW (Mock Service Worker) para mockear APIs
   - Tests asíncronos con waitFor
   - Testing de forms complejos
   - Tests de animaciones

3. **E2E Testing**
   - Aprende Cypress o Playwright
   - Testea flujos completos de usuario
   - Integración con CI/CD

4. **TDD (Test-Driven Development)**
   - Escribe tests ANTES del código
   - Red → Green → Refactor
   - Diseño guiado por tests

---

## 💬 Preguntas Frecuentes

### ¿Cuándo debo escribir tests?
- Para funciones críticas de negocio
- Para bugs que ya encontraste (regression tests)
- Para código complejo que puede romperse fácilmente
- Cuando el código será usado por otros desarrolladores

### ¿Cuándo NO escribir tests?
- Prototipos rápidos que cambiarán pronto
- Código extremadamente simple (getters, setters)
- Componentes puramente visuales sin lógica
- Cuando el costo de mantener el test es mayor que el beneficio

### ¿Snapshot testing es buena idea?
**Con moderación**. Los snapshots son útiles para:
- Detectar cambios no intencionados en UI
- Componentes con estructura compleja

Pero son malos porque:
- Fácil de aprobar cambios sin revisar
- Dificil de entender qué cambió
- Generen muchos falsos positivos

### ¿Debo testear componentes de terceros?
**No**. Asume que las librerías que usas están bien testeadas. Testea **tu** código, no el de otros.

### ¿Cómo sé qué testear?
Pregúntate:
1. ¿Esto podría romperse fácilmente?
2. ¿Es crítico para el negocio?
3. ¿Sería difícil detectar este bug manualmente?
4. ¿Este código es complejo o tiene lógica intrincada?

Si respondes "sí" a alguna, probablemente deberías testearlo.

---

## 🎉 ¡Buena suerte!

El testing es una habilidad que se aprende con práctica. No te frustres si al principio es difícil. Sigue estos pasos:

1. **Empieza pequeño**: Un test simple es mejor que ningún test
2. **Sé consistente**: Escribe tests regularmente
3. **Aprende de errores**: Cada test que falla te enseña algo
4. **Pide feedback**: Haz code reviews de tus tests
5. **Diviértete**: Los tests te dan superpoderes para refactorizar sin miedo

**Remember**: El objetivo no es coverage perfecto, es **confianza** en tu código.

---

_"Código sin tests es código legacy desde el día 1"_ - Michael Feathers

¡Ahora ve y testea con confianza! 🚀🧪
