import{View, Text, StyleSheet, ActivityIndicator} from 'react-native'
// Importando o hook Expo Router para acessar os parâmetros da tela de origem (URL)
import { useLocalSearchParams } from 'expo-router'

import {useEffect, useState} from 'react'
// Definindo o tipo para o objeto Usuario com os campos esperados
type Usuario = {
    id: number
    name: string
    email: string
    phone: string
    website: string
    company: {name: string}
    address: {street: string; city: string}
}
// Componente principal de tela
export default function DetalhesUsuario(){
    // Obtém o parâmetro 'id' da URL via hook do Expo Router ( ex: /detalhesUsuario?id=3)
    const { id } = useLocalSearchParams()
    // Estado para armazenar os dados do usuário buscado ou null se não carregou
    const[usuario, setUsuario] = useState<Usuario | null>(null)
    // Estado para indicar se a tela está carregando dados da API
    const [carregando, setCarregando] = useState(true)
    // hook para buscar dados do usuário quando o 'id' mudar
    useEffect(() =>{
        // Se não tiver id (ex: página acessada sem parâmetro), ele não executa nada
        if(!id) return
        // Faz a requisição para a API para buscar usuário pelo id
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then( res => res.json())  // converte a resposta JSON
        .then(dados => {
            setUsuario(dados)    // atualiza estado com os dados do usuário
            setCarregando(false)   // marca o fim do carregamento
        })

    }, [id]) // Executa toda vez que o 'id' mudar

    // Se estiver carregando ou o usuário ainda for null, mostra o indicador de loading
    if( carregando || !usuario){
        return(
            <View style={estilos.container}>
                {/* Spinner animado para carregar */}
                <ActivityIndicator size="large" color="#0D47A1"/>
                {/* Texto de ajuda */}
                <Text style={estilos.carregandoTexto}> Carregando detalhes...</Text>
            </View>
        )
    }
    // Quando os dados já estiverem carregados, mostra os detalhes dos usuários
    return(
        <View style={estilos.container}>
            <Text style={estilos.nome}> 👶 {usuario.name}</Text>
            <Text style={estilos.info}> ✉️ {usuario.email}</Text>
            <Text style={estilos.info}> 📱 {usuario.phone}</Text>
            <Text style={estilos.info}> 🖥️ {usuario.website}</Text>
            <Text style={estilos.info}> 🛖 {usuario.company.name}</Text>
            <Text style={estilos.info}> 🏡 {usuario.address.street}, {usuario.address.city}</Text>
        </View>
    )
}
const estilos = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#E3F2FD',
    },
    nome:{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0D47A1',
        marginBottom: 15,
    },
    info:{
        fontSize: 16,
        color: '#1565C0',
        marginBottom: 8,
    },
    carregandoTexto:{
        marginTop: 10,
        color: '#0D47A1',
    },
})
