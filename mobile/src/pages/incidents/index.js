import React, { useEffect,useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import {Feather} from '@expo/vector-icons';
import {View, Image, Text, TouchableOpacity, FlatList} from 'react-native';
import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';
export default ()=>{
    const [incidents,setIncidents] = useState([]);
    const [total,setTotal] = useState(0);
    const [page,setPage] = useState(1);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigation();

    const loadIncidents = async ()=>{
        if(loading) return;
        if(total>0 && incidents.length === total) return;

        setLoading(true);
        const resp = await api.get(`incidents?page=${page}`);
        
        setIncidents([... incidents, ...resp.data]);
        setTotal(resp.headers['x-total-count']);
        setPage(page+1);
        setLoading(false);
    } 

    useEffect(()=>{
        loadIncidents();
    },[]);

    return(
    <View style={styles.container}>
        <View style={styles.header}> 
            <Image source={logoImg}/>
            <Text style={styles.headerText}>
                total de <Text style={styles.headerTextBold}> {total} casos</Text>
            </Text>
        </View>
        <Text style={styles.title}>Seja bem vindo!</Text>
        <Text style={styles.description}>Escolha um dos casos a baixo e salve o dia.</Text>
    
        <FlatList 
        style={styles.incidentsList} 
        data={incidents} 
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({item:incident})=>(
            <View style={styles.incident} >
                <Text style={styles.insdentProperty}>ONG:</Text>
                <Text style={styles.insdentValue}>{incident.name}</Text>

                <Text style={styles.insdentProperty}>Caso:</Text>
                <Text style={styles.insdentValue}>{incident.title}</Text>

                <Text style={styles.insdentProperty}>Valor:</Text>
                <Text style={styles.insdentValue}>{Intl.NumberFormat('pt-BT',{style:'currency',currency:'BRL'}).format(incident.value)}</Text>

                <TouchableOpacity style={styles.detailsButton} onPress={()=>{navigate.navigate('Details',{incident})}}>
                    <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                    <Feather name="arrow-right" size={16} color="#E02041"/>
                </TouchableOpacity>
                
            </View>

        )}
        />
    </View>
    );
}