import React, {useState} from 'react'
import {View, Text, Button, StyleSheet } from 'react-native'
// Importa o módulo de localização da Expo, que permite acessar a geolocalização do dispositivo
import * as Location from 'expo-location'

// Componente principal do aplicativo
export default function App(){
    // Estado para armazenar o objeto de localização (como não temos ainda, pode ser null inicialmente)
    const[location, setLocation] = useState<Location.LocationObject | null>(null)
    // Estado para armazenar mensagens de erro (caso a permissão for negada)
    const[errorMsg, setErrorMsg] = useState<string | null>(null)
    // Função chamada quando o usuárip clica no botão "Obter localização"
    const handleGetLocation = async() => {
        // solicitar a permissão ao usuário para acessar a localização
        const{ status } = await Location.requestForegroundPermissionsAsync()
    }
}
