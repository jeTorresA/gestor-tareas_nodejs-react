import { React } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Header } from './components/ui/Header';
import { EstadoTareaView } from "./components/estadotareas/EstadoTareaView";
import { TareaView } from "./components/tareas/TareaView";
import { UsuarioView } from "./components/usuarios/UsuarioView";
import { NoPageView } from "./components/nopage/NoPageView";
import { TareaUpdate } from "./components/tareas/TareaUpdate";
import { UsuarioUpdate } from "./components/usuarios/UsuarioUpdate";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Header /> }>
          <Route index element={ <TareaView /> } />
          <Route path='tareas' element={ <TareaView /> } />
          {/*<Route path='estadotareas' element={ <EstadoTareaView /> } />*/}
          <Route path='usuarios' element={ <UsuarioView /> } />
          <Route exact path='tareas/edit/:tareaID' element={ <TareaUpdate /> } />
          <Route exact path='usuarios/edit/:usuarioID' element={ <UsuarioUpdate /> } />
          <Route path='*' element={ <NoPageView /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;