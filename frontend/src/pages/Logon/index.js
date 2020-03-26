import React,{useState} from 'react';
import {FiLogIn} from 'react-icons/fi';
import { Link,useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';
export default ()=>{
    const [id, setId] = useState('');
    const history = useHistory();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const data = {id};
        try {
            const resp = await api.post('sessions',data);
            localStorage.setItem('ong',JSON.stringify(resp.data));
            history.push('/profile');
        } catch (error) {
            alert('Falha no login, tente novamente.');
        }

    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Heroes"/>
                <form onSubmit={handleSubmit} >
                    <h1>Faça seu logon</h1>
                    <input
                    value={id}
                    onChange={e => setId(e.target.value)}
                    type="text" placeholder="Sua Id"/>
                    <button className="button" type="submit">Entrar</button>
                    <Link className="btnLink" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não sou registrado
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes"/>
        </div>
    )
}