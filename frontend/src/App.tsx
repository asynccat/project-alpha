import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Counter from './components/counter/Counter';
import {signInWithGoogle, signOutWithGoogle} from "./reducers/authReducer";
import CounterWithHooks from "./components/counterWithHooks/CounterWithHooks";
import Button from "@material-ui/core/Button";
import {AppStateType} from "./index";

// @ts-ignore
const gapi = window.gapi
const App: React.FC = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)
    useEffect(() => {
        gapi.load('auth2', function () {
            gapi.auth2.init({
                client_id: "66857043086-3p9jqk27fjm980v9e02733lctksvlkd1.apps.googleusercontent.com"
            }).then(() => {
            }, () => console.log('err'))
        })
    }, [])
    return (
            <div className="container page">
                <h1>Welcome to Project-alpha!</h1>
                { isAuth && <div>
                    <h3>Redux-counter</h3>
                    <Counter/>
                    <h3>Func Redux-counter</h3>
                    <CounterWithHooks/>
                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        onClick={() => dispatch(signOutWithGoogle())}
                    >
                        Выйти из приложения
                    </Button>
                </div> }
                { isAuth || <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={() => dispatch(signInWithGoogle())}
                >
                    Войти с помощью GOOGLE
                </Button> }
            </div>
    );
};

export default App;
