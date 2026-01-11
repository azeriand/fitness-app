# Plan de Migración a Redux - De Context a Redux

## 📋 Tabla de Contenidos
1. [Entendiendo el Problema Actual](#entendiendo-el-problema-actual)
2. [¿Qué es State Management?](#qué-es-state-management)
3. [¿Por qué Redux?](#por-qué-redux)
4. [Análisis de la Arquitectura Actual](#análisis-de-la-arquitectura-actual)
5. [Conceptos Clave de Redux](#conceptos-clave-de-redux)
6. [Plan de Migración Paso a Paso](#plan-de-migración-paso-a-paso)
7. [Comparación Antes y Después](#comparación-antes-y-después)
8. [Cronograma de Implementación](#cronograma-de-implementación)

---

## 🔍 Entendiendo el Problema Actual

### Lo Que Tienes Ahora (Context API)
Tu aplicación actualmente usa **4 componentes Context diferentes**:
1. `TrainingContext` - Gestiona sesiones de entrenamiento, ejercicios, timer, historial
2. `SettingsContext` - Gestiona configuración del usuario, rachas, unidades de peso
3. `PopupContext` - Gestiona la visibilidad de los popups
4. `ExerciseContext` - Gestiona búsqueda y filtros de ejercicios

### El Problema: "Context Hell"
```jsx
<PopupContextComponent>
  <ThemeContextComponent>
    <TrainingContextComponent>
      <SettingsContextComponent>
        <AppContent />  // ¡Tu app está enterrada 4 niveles de profundidad!
      </SettingsContextComponent>
    </TrainingContextComponent>
  </ThemeContextComponent>
</PopupContextComponent>
```

**Problemas con este enfoque:**
- **Anidación Excesiva (Nested Hell)**: Demasiados componentes anidados (difícil de leer)
- **Performance**: Cada cambio en un context re-renderiza TODOS los consumers
- **Problemas de Dependencias**: `SettingsContext` depende de `TrainingContext` (acoplamiento fuerte)
- **Testing**: Difícil testear componentes de forma aislada
- **DevTools**: No hay forma fácil de debuggear cambios de state
- **Duplicación de Código**: Patrones similares repetidos en cada context

---

## 🎯 ¿Qué es State Management?

Piensa en el state management como gestionar un restaurante:

### Sin State Management (Tu Setup Actual)
- Cada camarero (Context) tiene su propia libreta
- La cocina (TrainingContext) lleva el control de los pedidos
- El gerente (SettingsContext) lleva el control de las preferencias
- El anfitrión (PopupContext) controla la disponibilidad de mesas
- **Problema**: Todos necesitan comunicarse constantemente entre sí, creando caos

### Con Redux (Solución Propuesta)
- **Un tablero central de cocina** (Redux Store) donde vive TODA la información
- **Todos pueden ver el tablero** (Los componentes pueden leer el state)
- **Procedimientos claros** (Actions) para actualizar el tablero
- **Cocineros designados** (Reducers) que actualizan secciones específicas
- **Resultado**: Todos saben qué está pasando, sin confusión

---

## 💡 ¿Por qué Redux?

### Beneficios para Tu Aplicación de Fitness

1. **Single Source of Truth (Única Fuente de Verdad)**
   - Todos tus datos en UN solo lugar
   - No más pasar datos a través de múltiples contexts
   - Fácil ver el estado completo de tu app

2. **Actualizaciones de State Predecibles**
   - Actions claras describen qué pasó: `"USER_STARTED_WORKOUT"`, `"USER_ADDED_SET"`
   - Cada cambio de state es rastreable
   - Puedes reproducir actions para debuggear

3. **Mejor Performance**
   - Los componentes solo re-renderizan cuando SUS datos cambian
   - No cuando CUALQUIER context cambia

4. **DevTools Increíbles**
   - Redux DevTools te muestra CADA cambio de state
   - Time-travel debugging (deshacer/rehacer cambios)
   - Ver exactamente qué causó un bug

5. **Testing Más Fácil**
   - Testear la lógica del state separada de la UI
   - Mockear datos fácilmente
   - Resultados de tests predecibles

6. **Soporte de Middleware**
   - Guardar automáticamente en localStorage
   - Agregar logging
   - Manejar operaciones asíncronas (llamadas a API)

---

## 🏗️ Análisis de la Arquitectura Actual

### Lo Que Gestiona Cada Context

#### 1. TrainingContext (186 líneas) 🏋️
**State:**
- `history` - Array de entrenamientos completados
- `timer` - Timer del entrenamiento actual (segundos)
- `timerformat` - String de tiempo formateado
- `trainingData` - Entrenamiento actual en progreso
- `exercises` - Todos los ejercicios disponibles
- `routinesList` - Todas las rutinas guardadas

**Actions:**
- `startTraining()`, `pauseTraining()`, `resetTimer()`
- `addExercise()`, `addSet()`
- `updateReps()`, `updateKg()`
- `finishTraining()`
- `getRoutineByName()`, `getTrainingDays()`

**Problemas:**
- ⚠️ Demasiada responsabilidad (timer + datos + ejercicios)
- ⚠️ Side effects (localStorage, intervals) mezclados con state
- ⚠️ 186 líneas - difícil de mantener

#### 2. SettingsContext (60 líneas) ⚙️
**State:**
- `defaultStreak` - Objetivo de racha del usuario
- `currentStreak` - Contador de racha actual
- `defaultWeightUnit` - 'KG' o 'IBS'

**Actions:**
- `setDefaultStreak()`, `setCurrentStreak()`
- `setDefaultWeightUnit()`
- `calculateToIbs()`
- `calculateCurrentStreak()`

**Problemas:**
- ⚠️ Depende de `TrainingContext` (acoplamiento)
- ⚠️ Lógica de cálculo compleja dentro del context

#### 3. PopupContext (15 líneas) 🪟
**State:**
- `isPopupOpen` - Flag booleano

**Actions:**
- `setIsPopupOpen()`

**Problemas:**
- ✅ Simple, pero podría ser parte del UI state

#### 4. ExerciseContext (16 líneas) 🔍
**State:**
- `searchValue` - Input de búsqueda actual
- `filterSelected` - Filtro seleccionado

**Actions:**
- `setSearchValue()`, `setFilterSelected()`

**Problemas:**
- ⚠️ Depende de `TrainingContext` para los ejercicios
- ⚠️ Podría ser state local del componente

---

## 📚 Conceptos Clave de Redux

Déjame explicarte Redux como si estuvieras construyendo con bloques de LEGO:

### 1. Store (La Base de LEGO)
El **Store** es el ÚNICO lugar donde viven TODOS los datos de tu app.

```javascript
// Todo el state de tu app en un solo lugar
const store = {
  training: { /* datos de entrenamiento */ },
  settings: { /* datos de configuración */ },
  ui: { /* state de UI */ }
}
```

### 2. State (El Modelo LEGO Actual)
El **State** es cómo se ven tus datos AHORA MISMO.

```javascript
// Ejemplo de state para tu app
{
  training: {
    history: [...],
    currentWorkout: {...},
    timer: 0,
    timerStatus: 'STOPPED'
  },
  settings: {
    weightUnit: 'KG',
    streakGoal: 3,
    currentStreak: 0
  },
  ui: {
    isPopupOpen: false,
    searchValue: '',
    selectedFilter: null
  }
}
```

### 3. Actions (Instrucciones para Cambiar el Modelo)
Las **Actions** son objetos planos que describen QUÉ pasó (no CÓMO).

```javascript
// Ejemplos de actions
{ type: 'training/startWorkout', payload: { routineName: 'Push Day' } }
{ type: 'training/addSet', payload: { exercise: 'Bench Press', reps: 10, kg: 80 } }
{ type: 'settings/changeWeightUnit', payload: 'IBS' }
{ type: 'ui/openPopup' }
```

**Piensa en las actions como titulares de periódico:**
- `"USER_STARTED_WORKOUT"` - ¡Algo pasó!
- `"USER_FINISHED_SET"` - ¡Algo pasó!
- No describes CÓMO actualizar, solo QUÉ pasó

### 4. Reducers (Los Constructores Que Actualizan el Modelo)
Los **Reducers** son funciones puras que toman el state anterior y una action, luego retornan el NUEVO state.

```javascript
// Un reducer es como un constructor especializado
function trainingReducer(state, action) {
  switch (action.type) {
    case 'training/addSet':
      // ¡No modifiques el state directamente! Retorna un NUEVO state
      return {
        ...state,
        currentWorkout: {
          ...state.currentWorkout,
          exercises: [...updatedExercises]
        }
      }
    default:
      return state
  }
}
```

**Reglas para Reducers:**
- ✅ Funciones puras (mismo input = mismo output)
- ✅ Nunca modificar el state directamente (crear nuevos objetos)
- ✅ Sin side effects (sin llamadas a API, sin timers)

### 5. Dispatch (Enviando Instrucciones)
**Dispatch** es cómo envías actions al store.

```javascript
// En tu componente
dispatch({ type: 'training/addSet', payload: { exercise: 'Squat', kg: 100 } })
```

### 6. Selectors (Leyendo Datos Específicos)
Los **Selectors** son funciones que extraen datos específicos del state.

```javascript
// En lugar de acceder a state.training.history directamente
const selectHistory = (state) => state.training.history
const selectCurrentWorkout = (state) => state.training.currentWorkout

// En tu componente
const history = useSelector(selectHistory)
```

### El Flujo de Redux (Ciclo de Datos)
```
┌─────────────┐
│  Component  │ ──── dispatch(action) ────> ┌──────────┐
└─────────────┘                              │  Action  │
       ↑                                     └──────────┘
       │                                           │
       │                                           ↓
       │                                     ┌──────────┐
       │                                     │ Reducer  │
       │                                     └──────────┘
       │                                           │
       │                                           ↓
       │                                      ┌─────────┐
       └────── useSelector() ────────────────│  Store  │
                                              └─────────┘
```

1. **El usuario hace click** en un botón del componente
2. El componente **despacha una action**: `dispatch({ type: 'training/addSet' })`
3. Redux llama al **reducer** con el state actual + action
4. El reducer retorna el **nuevo state**
5. El Store se actualiza
6. Los componentes usando **useSelector()** automáticamente re-renderizan con los nuevos datos

---

## 🚀 Plan de Migración Paso a Paso

### Fase 1: Setup (1-2 horas)

#### Paso 1.1: Instalar Dependencias de Redux
```bash
npm install @reduxjs/toolkit react-redux
```

**Lo que estás instalando:**
- `@reduxjs/toolkit` - Redux moderno (más fácil de usar que el Redux antiguo)
- `react-redux` - Conecta Redux con los componentes de React

#### Paso 1.2: Crear Estructura de Carpetas Redux
```
src/
  redux/
    store.js                 # Configurar el Redux store
    slices/
      trainingSlice.js      # State de entrenamiento + actions
      settingsSlice.js      # State de configuración + actions
      uiSlice.js            # State de UI (popup, búsqueda, filtros)
    selectors/
      trainingSelectors.js  # Funciones para leer datos de entrenamiento
      settingsSelectors.js  # Funciones para leer datos de configuración
    middleware/
      localStorageMiddleware.js  # Auto-guardar en localStorage
```

---

### Fase 2: Crear Redux Slices (3-4 horas)

Un **slice** es una colección de lógica de reducer y actions para una funcionalidad específica.

#### Paso 2.1: Training Slice
**Archivo: `src/redux/slices/trainingSlice.js`**

```javascript
import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import exercises from '../../data/exercises.json'
import routines from '../../data/routines.json'
import generateTrainingDays from '../../data/generateTrainingDays.js'
import { getCurrentDateTime } from '../../utils/datetime.js'

// State inicial (cómo se ven tus datos cuando la app inicia)
const initialState = {
  // Datos
  exercises: exercises,
  routines: routines,
  history: generateTrainingDays(),
  
  // Entrenamiento actual
  currentWorkout: {
    routineName: '',
    createdDay: '',
    exercises: [],
    status: 'STOPPED' // 'STOPPED' | 'RUNNING' | 'PAUSED'
  },
  
  // Timer
  timer: 0, // segundos
  timerFormat: '00:00:00',
}

// Crear el slice
const trainingSlice = createSlice({
  name: 'training',
  initialState,
  reducers: {
    // Action: Iniciar un nuevo entrenamiento
    startWorkout: (state, action) => {
      state.currentWorkout = {
        routineName: action.payload.routineName,
        createdDay: getCurrentDateTime(),
        exercises: [],
        status: 'RUNNING'
      }
    },

    // Action: Pausar entrenamiento
    pauseWorkout: (state) => {
      state.currentWorkout.status = 'PAUSED'
    },

    // Action: Reanudar entrenamiento
    resumeWorkout: (state) => {
      state.currentWorkout.status = 'RUNNING'
    },

    // Action: Agregar ejercicio al entrenamiento actual
    addExercise: (state, action) => {
      const exerciseName = action.payload.exerciseName
      state.currentWorkout.exercises.push({
        exercise_name: exerciseName,
        sets: []
      })
    },

    // Action: Agregar set a un ejercicio
    addSet: (state, action) => {
      const { exerciseName } = action.payload
      const exercise = state.currentWorkout.exercises.find(
        ex => ex.exercise_name === exerciseName
      )
      if (exercise) {
        exercise.sets.push({ KG: '', reps: '' })
      }
    },

    // Action: Actualizar valores de un set
    updateSet: (state, action) => {
      const { exerciseName, setIndex, field, value } = action.payload
      const exercise = state.currentWorkout.exercises.find(
        ex => ex.exercise_name === exerciseName
      )
      if (exercise && exercise.sets[setIndex]) {
        exercise.sets[setIndex][field] = value
      }
    },

    // Action: Incrementar timer
    incrementTimer: (state) => {
      state.timer += 1
      
      // Actualizar tiempo formateado
      const hours = Math.floor(state.timer / 3600)
      const minutes = Math.floor((state.timer % 3600) / 60)
      const seconds = (state.timer % 3600) % 60
      const format = (time) => time < 10 ? `0${time}` : `${time}`
      state.timerFormat = `${format(hours)}:${format(minutes)}:${format(seconds)}`
    },

    // Action: Resetear timer
    resetTimer: (state) => {
      state.timer = 0
      state.timerFormat = '00:00:00'
    },

    // Action: Finalizar entrenamiento
    finishWorkout: (state) => {
      const workout = {
        day: getCurrentDateTime(),
        duration: state.timer,
        exercises: state.currentWorkout.exercises,
        name: state.currentWorkout.routineName,
        type: 'add type',
        user: 'add user',
        volume: 'add volume'
      }
      
      // Agregar al historial y ordenar
      state.history = [...state.history, workout].sort((a, b) => 
        dayjs(a.day).isAfter(dayjs(b.day)) ? -1 : 1
      )

      // Resetear entrenamiento actual
      state.currentWorkout = {
        routineName: '',
        createdDay: '',
        exercises: [],
        status: 'STOPPED'
      }
      state.timer = 0
      state.timerFormat = '00:00:00'
    },

    // Action: Resetear entrenamiento (descartar)
    resetWorkout: (state) => {
      state.currentWorkout = {
        routineName: '',
        createdDay: '',
        exercises: [],
        status: 'STOPPED'
      }
      state.timer = 0
      state.timerFormat = '00:00:00'
    },
  }
})

// Exportar actions (para usar en componentes)
export const {
  startWorkout,
  pauseWorkout,
  resumeWorkout,
  addExercise,
  addSet,
  updateSet,
  incrementTimer,
  resetTimer,
  finishWorkout,
  resetWorkout,
} = trainingSlice.actions

// Exportar reducer (para agregar al store)
export default trainingSlice.reducer
```

#### Paso 2.2: Settings Slice
**Archivo: `src/redux/slices/settingsSlice.js`**

```javascript
import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

const initialState = {
  weightUnit: 'KG', // 'KG' | 'IBS'
  streakGoal: 3,
  currentStreak: 0,
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setWeightUnit: (state, action) => {
      state.weightUnit = action.payload
    },

    setStreakGoal: (state, action) => {
      state.streakGoal = action.payload
    },

    setCurrentStreak: (state, action) => {
      state.currentStreak = action.payload
    },

    // Calcular racha (ahora lógica pura, sin side effects)
    calculateStreak: (state, action) => {
      const history = action.payload.history
      const streakGoal = state.streakGoal
      
      const days = history.map(routine => routine.day)
      const daysReversed = [...days].reverse()
      const daysOfWeek = daysReversed.map(day => dayjs(day).day())

      let dayCounter = 0
      let streakCounter = 0
      let streakActive = false

      for (let i = 0; i < daysOfWeek.length - 1; i++) {
        const actualDay = daysOfWeek[i]
        const nextDay = daysOfWeek[i + 1]

        if (nextDay != undefined && actualDay <= nextDay) {
          dayCounter++
          if (dayCounter >= streakGoal && !streakActive) {
            streakCounter++
            streakActive = true
            state.currentStreak = streakCounter
          }
        } else {
          if (!streakActive) {
            dayCounter = 0
            streakCounter = 0
            state.currentStreak = 0
          } else {
            dayCounter = 0
            streakActive = false
          }
        }
      }
    },
  }
})

export const {
  setWeightUnit,
  setStreakGoal,
  setCurrentStreak,
  calculateStreak,
} = settingsSlice.actions

export default settingsSlice.reducer
```

#### Paso 2.3: UI Slice
**Archivo: `src/redux/slices/uiSlice.js`**

```javascript
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isPopupOpen: false,
  searchValue: '',
  selectedFilter: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openPopup: (state) => {
      state.isPopupOpen = true
    },

    closePopup: (state) => {
      state.isPopupOpen = false
    },

    setSearchValue: (state, action) => {
      state.searchValue = action.payload
    },

    setSelectedFilter: (state, action) => {
      state.selectedFilter = action.payload
    },

    clearFilters: (state) => {
      state.searchValue = ''
      state.selectedFilter = null
    },
  }
})

export const {
  openPopup,
  closePopup,
  setSearchValue,
  setSelectedFilter,
  clearFilters,
} = uiSlice.actions

export default uiSlice.reducer
```

---

### Fase 3: Crear Selectors (1 hora)

Los selectors son funciones que leen datos del state. Hacen tu código más limpio y reutilizable.

#### Paso 3.1: Training Selectors
**Archivo: `src/redux/selectors/trainingSelectors.js`**

```javascript
// Selectors básicos
export const selectTrainingState = (state) => state.training
export const selectHistory = (state) => state.training.history
export const selectExercises = (state) => state.training.exercises
export const selectRoutines = (state) => state.training.routines
export const selectCurrentWorkout = (state) => state.training.currentWorkout
export const selectTimer = (state) => state.training.timer
export const selectTimerFormat = (state) => state.training.timerFormat
export const selectWorkoutStatus = (state) => state.training.currentWorkout.status

// Selectors computados (datos derivados)
export const selectIsWorkoutActive = (state) => {
  const status = selectWorkoutStatus(state)
  return status === 'RUNNING' || status === 'PAUSED'
}

export const selectTrainingDays = (state) => {
  const history = selectHistory(state)
  return history.map(day => day.day)
}

export const selectRoutineByName = (state, routineName) => {
  const routines = selectRoutines(state)
  return routines.find(r => r.routine_name === routineName)
}

export const selectExerciseFromWorkout = (state, exerciseName) => {
  const workout = selectCurrentWorkout(state)
  return workout.exercises.find(ex => ex.exercise_name === exerciseName)
}
```

#### Paso 3.2: Settings Selectors
**Archivo: `src/redux/selectors/settingsSelectors.js`**

```javascript
export const selectWeightUnit = (state) => state.settings.weightUnit
export const selectStreakGoal = (state) => state.settings.streakGoal
export const selectCurrentStreak = (state) => state.settings.currentStreak

// Selector de utilidad para conversión de peso
export const selectConvertedWeight = (state, weightInKg) => {
  const unit = selectWeightUnit(state)
  if (unit === 'IBS') {
    return (weightInKg * 2.20462).toFixed(0)
  }
  return weightInKg
}
```

---

### Fase 4: Configurar el Store (30 minutos)

**Archivo: `src/redux/store.js`**

```javascript
import { configureStore } from '@reduxjs/toolkit'
import trainingReducer from './slices/trainingSlice'
import settingsReducer from './slices/settingsSlice'
import uiReducer from './slices/uiSlice'
import localStorageMiddleware from './middleware/localStorageMiddleware'

export const store = configureStore({
  reducer: {
    training: trainingReducer,
    settings: settingsReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
})

// Para usuarios de TypeScript (opcional)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

---

### Fase 5: Crear Middleware para localStorage (1 hora)

**Archivo: `src/redux/middleware/localStorageMiddleware.js`**

```javascript
// Middleware guarda automáticamente state específico en localStorage
const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action)
  const state = store.getState()

  // Guardar timer y entrenamiento actual
  if (action.type.startsWith('training/')) {
    localStorage.setItem('training-timer', JSON.stringify(state.training.timer))
    localStorage.setItem('current-training', JSON.stringify(state.training.currentWorkout))
  }

  // Guardar preferencia de unidad de peso
  if (action.type === 'settings/setWeightUnit') {
    localStorage.setItem('weightUnit', state.settings.weightUnit)
  }

  return result
}

export default localStorageMiddleware
```

**Opcional: Cargar desde localStorage al iniciar**

Actualizar `src/redux/slices/trainingSlice.js`:

```javascript
// Al principio, cargar desde localStorage
const loadFromLocalStorage = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

const initialState = {
  exercises: exercises,
  routines: routines,
  history: generateTrainingDays(),
  
  // Cargar datos guardados
  currentWorkout: loadFromLocalStorage('current-training', {
    routineName: '',
    createdDay: '',
    exercises: [],
    status: 'STOPPED'
  }),
  
  timer: loadFromLocalStorage('training-timer', 0),
  timerFormat: '00:00:00',
}
```

---

### Fase 6: Manejar el Timer con Redux (1 hora)

El timer necesita manejo especial porque usa `setInterval`. Usaremos **Redux Thunk** (incluido con Redux Toolkit).

**Archivo: `src/redux/slices/trainingSlice.js`** (agregar estos thunks)

```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Guardar el ID del interval fuera de Redux (no es serializable)
let timerIntervalId = null

// Thunk: Iniciar el timer
export const startTimer = createAsyncThunk(
  'training/startTimer',
  async (_, { dispatch }) => {
    if (timerIntervalId) return // Ya está corriendo

    timerIntervalId = setInterval(() => {
      dispatch(incrementTimer())
    }, 1000)
  }
)

// Thunk: Detener el timer
export const stopTimer = createAsyncThunk(
  'training/stopTimer',
  async () => {
    if (timerIntervalId) {
      clearInterval(timerIntervalId)
      timerIntervalId = null
    }
  }
)

// Agregar a los reducers de tu slice
const trainingSlice = createSlice({
  // ... código anterior ...
  
  reducers: {
    // ... reducers anteriores ...
    
    toggleWorkout: (state) => {
      if (state.currentWorkout.status === 'RUNNING') {
        state.currentWorkout.status = 'PAUSED'
      } else {
        state.currentWorkout.status = 'RUNNING'
      }
    },
  }
})

// Uso en componente:
// dispatch(startTimer()) - inicia el interval
// dispatch(stopTimer()) - detiene el interval
// dispatch(toggleWorkout()) - pausar/reanudar
```

---

### Fase 7: Conectar Redux con React (1 hora)

#### Paso 7.1: Envolver la App con el Redux Provider

**Archivo: `src/main.jsx`** (o donde tengas tu root)

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
```

#### Paso 7.2: Actualizar App.jsx (¡Eliminar los Context Providers!)

**Archivo: `src/App.jsx`**

```javascript
import './App.css'
import 'azeriand-library/dist/styles.css';
import AppContent from './AppContent.jsx'
import { useEffect, useRef } from 'react'
import { ThemeContextComponent } from 'azeriand-library'
import backgroundVideo from './assets/background.mp4'

function App() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Video autoplay failed:', error);
      });
    }
  }, []);

  return(
    <div className='viewport' style={{ position: 'relative', minHeight: '100vh' }}>
      <video 
        ref={videoRef}
        // ... props del video ...
        src={backgroundVideo}
      />
      
      {/* ¡NO MÁS CONTEXT HELL! */}
      <ThemeContextComponent>
        <AppContent />
      </ThemeContextComponent>
    </div>
  )
}

export default App
```

---

### Fase 8: Migrar Componentes (2-4 horas)

#### Ejemplo: Migrando un componente que usa TrainingContext

**ANTES (con Context):**
```javascript
import { useContext } from 'react'
import { TrainingContext } from './training-context'

function ExerciseCard({ exerciseName }) {
  const { addSet, updateReps, updateKg, trainingData } = useContext(TrainingContext)
  
  const exercise = trainingData.exercises.find(
    ex => ex.exercise_name === exerciseName
  )

  const handleAddSet = () => {
    addSet(exerciseName)
  }

  return (
    <div>
      <h3>{exerciseName}</h3>
      <button onClick={handleAddSet}>Agregar Set</button>
      {/* ... */}
    </div>
  )
}
```

**DESPUÉS (con Redux):**
```javascript
import { useSelector, useDispatch } from 'react-redux'
import { addSet, updateSet } from '../redux/slices/trainingSlice'
import { selectExerciseFromWorkout } from '../redux/selectors/trainingSelectors'

function ExerciseCard({ exerciseName }) {
  const dispatch = useDispatch()
  const exercise = useSelector(state => 
    selectExerciseFromWorkout(state, exerciseName)
  )

  const handleAddSet = () => {
    dispatch(addSet({ exerciseName }))
  }

  const handleUpdateReps = (setIndex, value) => {
    dispatch(updateSet({ 
      exerciseName, 
      setIndex, 
      field: 'reps', 
      value 
    }))
  }

  return (
    <div>
      <h3>{exerciseName}</h3>
      <button onClick={handleAddSet}>Agregar Set</button>
      {/* ... */}
    </div>
  )
}
```

**Cambios Clave:**
1. Reemplazar `useContext` con `useSelector` (leer datos) y `useDispatch` (actualizar datos)
2. Importar actions desde los slices en lugar de funciones del context
3. Usar `dispatch(actionName(payload))` para actualizar el state

---

## 📊 Comparación Antes y Después

### Estructura de Archivos

**ANTES:**
```
src/
  components/
    exercise-context.jsx     ← 16 líneas
    popup-context.jsx        ← 15 líneas
    settings-context.jsx     ← 60 líneas
    training-context.jsx     ← 186 líneas
  App.jsx                    ← Context hell anidado
```

**DESPUÉS:**
```
src/
  redux/
    store.js                 ← 15 líneas (¡limpio!)
    slices/
      trainingSlice.js       ← 120 líneas (organizado)
      settingsSlice.js       ← 40 líneas
      uiSlice.js             ← 25 líneas
    selectors/
      trainingSelectors.js   ← 20 líneas
      settingsSelectors.js   ← 10 líneas
    middleware/
      localStorageMiddleware.js ← 15 líneas
  App.jsx                    ← ¡SIN anidación!
```

### Comparación de Performance

**ANTES (Context):**
```
Cuando trainingData cambia:
  ↳ Todos los componentes usando TrainingContext re-renderizan
  ↳ Todos los componentes usando SettingsContext re-renderizan (depende de Training)
  ↳ Potencialmente cientos de re-renders innecesarios
```

**DESPUÉS (Redux):**
```
Cuando trainingData cambia:
  ↳ Solo los componentes usando esos datos ESPECÍFICOS re-renderizan
  ↳ React-Redux optimiza automáticamente
  ↳ ¡App mucho más rápida!
```

### Experiencia del Desarrollador

**ANTES:**
- 😵 State disperso en 4 archivos
- 🤔 Difícil debuggear (¿qué context causó el bug?)
- 😤 Sin time-travel debugging
- 😓 Testing requiere mockear múltiples contexts

**DESPUÉS:**
- 😊 Todo el state en un lugar
- 🎯 Redux DevTools muestran cada action
- ⏮️ Time-travel debugging (deshacer cambios)
- ✅ Testing fácil (solo testear reducers)

---

## 📅 Cronograma de Implementación

### Semana 1: Setup y Slices Principales
- **Día 1-2**: Instalar Redux, crear estructura de carpetas, training slice
- **Día 3**: Settings slice, UI slice
- **Día 4**: Selectors y configuración del store
- **Día 5**: Middleware e integración con localStorage

### Semana 2: Migración de Componentes
- **Día 1-2**: Migrar componentes relacionados con entrenamiento
- **Día 3**: Migrar componentes de configuración
- **Día 4**: Migrar componentes de UI (búsqueda, filtros, popup)
- **Día 5**: Testing y corrección de bugs

### Semana 3: Limpieza y Optimización
- **Día 1-2**: Eliminar archivos viejos de context
- **Día 3**: Agregar configuración de Redux DevTools
- **Día 4**: Optimizar selectors (usar `reselect` para memoización)
- **Día 5**: Documentación y revisión del equipo

---

## 🎓 Recursos de Aprendizaje

### Documentación Oficial
1. **Redux Toolkit**: https://redux-toolkit.js.org/
2. **Redux DevTools**: https://github.com/reduxjs/redux-devtools

### Tutoriales en Video
1. "Redux Toolkit Tutorial" - Net Ninja (YouTube)
2. "Redux for Beginners" - Academind (YouTube)

### Práctica
¡Empieza poco a poco! Migra un context a la vez:
1. Empieza con `PopupContext` (el más simple)
2. Luego `ExerciseContext`
3. Después `SettingsContext`
4. Finalmente `TrainingContext` (el más complejo)

---

## ✅ Checklist de Éxito

- [ ] Instalar `@reduxjs/toolkit` y `react-redux`
- [ ] Crear estructura de carpetas `redux/`
- [ ] Crear training slice con todas las actions
- [ ] Crear settings slice
- [ ] Crear UI slice
- [ ] Crear selectors para cada slice
- [ ] Configurar el Redux store
- [ ] Agregar middleware de localStorage
- [ ] Manejar el timer con thunks
- [ ] Envolver la app con `<Provider>`
- [ ] Migrar el primer componente
- [ ] Testear Redux DevTools
- [ ] Migrar todos los componentes
- [ ] Eliminar archivos viejos de context
- [ ] ¡Celebrar! 🎉

---

## 🆘 Errores Comunes y Soluciones

### Error 1: Mutar el State Directamente
**❌ INCORRECTO:**
```javascript
state.currentWorkout.exercises.push(newExercise)
```

**✅ CORRECTO:**
```javascript
// Redux Toolkit usa Immer, ¡así que esto está OK!
state.currentWorkout.exercises.push(newExercise)

// O la forma manual:
return {
  ...state,
  currentWorkout: {
    ...state.currentWorkout,
    exercises: [...state.currentWorkout.exercises, newExercise]
  }
}
```

### Error 2: Usar Context Dentro de Reducers
**❌ INCORRECTO:**
```javascript
const trainingSlice = createSlice({
  reducers: {
    someAction: (state) => {
      const data = useContext(TrainingContext) // ¡NO!
    }
  }
})
```

**✅ CORRECTO:**
```javascript
// Pasar datos como payload de la action
dispatch(someAction({ trainingData }))
```

### Error 3: Olvidar el Dispatch
**❌ INCORRECTO:**
```javascript
addSet({ exerciseName: 'Bench Press' })
```

**✅ CORRECTO:**
```javascript
dispatch(addSet({ exerciseName: 'Bench Press' }))
```

---

## 🎯 Reflexiones Finales

Redux puede parecer complejo al principio, pero piensa en ello como aprender a conducir:
- **Primera semana**: Abrumador (¡tantos conceptos!)
- **Segunda semana**: Empieza a tener sentido
- **Tercera semana**: Se siente natural
- **Después**: ¡No puedes imaginar volver al Context hell!

Los beneficios clave para tu app de fitness:
1. **Código organizado**: Todo tiene su lugar
2. **Mejor performance**: App más rápida
3. **Debugging más fácil**: Ver exactamente qué está pasando
4. **Escalabilidad**: Fácil agregar funcionalidades
5. **Colaboración en equipo**: Patrones claros para todos

**¡Puedes hacerlo! Empieza con pasos pequeños, y pronto serás un pro de Redux! 💪**

---