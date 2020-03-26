import React ,{useEffect,useState}from 'react';
import {Link,useHistory} from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import {FiPower, FiTrash2} from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';

export default ()=>{
    const ong = JSON.parse(localStorage.getItem('ong'));
    const [incidents,setIncidents] = useState([]);
    const history = useHistory();

    useEffect(()=>{
        api.get('ongincidents',{
            headers:{
                Authorization:ong.id
            }
        }).then(resp =>{
            setIncidents(resp.data);
        });
    },[ong.id]);

    const deleteIncident = async(id)=>{
        try {
            await api.delete(`incidents/${id}`,{
                headers:{
                 Authorization:ong.id
                }
            });
            setIncidents(incidents.filter(item => item.id !== id));
        } catch (error) {
            alert('Não foi possivel deletar. tente novamente!');
        }
    }

    const handleLogOut = ()=>{
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vindo, {ong.name}</span>
                <Link className="button" to="/incidentes/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogOut}>
                    <FiPower size={18} color="#e02041"/>
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
               {incidents.map((item =>(
                    <li key={item.id}>
                        <strong>Caso:</strong>
                        <p>{item.title}</p>

                        <strong>Descrição:</strong>
                        <p>{item.description}</p>

                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR',{style:'currency', currency: 'BRL'}).format(item.value) }</p>

                        <button type="button" onClick={()=>{ deleteIncident(item.id)}}>
                            <FiTrash2 size={16} color="#e02041"/>
                        </button>
                    </li>
                   )
               ))}
            </ul>
        </div>
    )
}