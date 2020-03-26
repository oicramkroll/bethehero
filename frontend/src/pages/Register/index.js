import React,{ useState } from 'react';
import {Link,useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi'

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

import './styles.css';
export default ()=>{
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [whatsapp,setWhatsApp] = useState('');
    const [city,setCity] = useState('');
    const [state,setState] = useState('');

    const history = useHistory();

    const handleRegister = async (e)=>{
        e.preventDefault();
        const data = {
            name,
            email,
            whatsapp,
            city,
            state
        };
        try {
            const resp = await api.post('ongs',data);
            alert(`Seu ID de acesso ${resp.data.id}`);
            history.push('/');
        } catch (error) {
            alert('Erro no cadastro.');
        }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero"/>
                    <p>
                        Faça seu cadastro, entre na plataforma e 
                        ajude pessoas a encontrarem 
                        os casos de sua ONG.
                    </p>
                    <Link className="btnLink" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Já sou cadastrado
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input
                    value={name}
                    onChange={ (e)=>{setName(e.target.value)} }
                    type="text" placeholder="Nome da ONG"/>
                    <input
                    value={email}
                    onChange={ e =>  setEmail(e.target.value) }
                    type="emial" placeholder="E-mail"/>
                    <input
                    value={whatsapp}
                    onChange={ e => setWhatsApp(e.target.value)}
                    type="text" placeholder="WhatsApp"/>
                    <div className="input-group">
                        <input 
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        type="text" placeholder="Cidade"/>
                        <input 
                        value={state}
                        onChange={e => setState(e.target.value)}
                        type="text" placeholder="UF" style={{width:80}}/>
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}