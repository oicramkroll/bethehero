import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi'

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

import './styles.css';
export default ()=>{
    const history = useHistory();
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [value,setValue] = useState('');
    
    const ong = JSON.parse(localStorage.getItem('ong'));

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const data = {title,description,value};
        try {
            await api.post('incidents',data,{headers:{Authorization:ong.id}});
            alert('Caso cadastrado com sucesso.');
            history.push('/profile');
        } catch (error) {
            alert('Não foi possivel cadastrar o caso.');
        }
    }


    return(
        <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="Be the Hero"/>
                <h1>Cadastrar novo caso</h1>
                <p>
                    Descreva o caso detalhadamente para encontrar um heroi para
                    resover isso.
                </p>
                <Link className="btnLink" to="/profile">
                    <FiArrowLeft size={16} color="#E02041"/>
                    voltar
                </Link>
            </section>
            <form onSubmit={handleSubmit}>
                <input
                value={title}
                onChange={ e => setTitle(e.target.value)}
                type="text" placeholder="Titulo"/>
                <textarea 
                value={description} 
                onChange={e => setDescription(e.target.value)}
                placeholder="Descrição" />
                <input 
                value={value}
                onChange={e => setValue(e.target.value)}
                type="text" placeholder="Valor em reais"/>
                
                <button className="button" type="submit">Cadastrar</button>
            </form>
        </div>
    </div>
    );
}