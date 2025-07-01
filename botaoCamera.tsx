import React, {useState, useEffect} from 'react'
import {View, Button, Image, StyleSheet, Alert} from 'react-native'
import * as ImagePicker from 'expo-image-picker'


const BotaoCamera: React.FC = () =>{
    const [imagem, setImagem] = useState<string | null>(null)
    // Solicitando permissão para usar a câmera quando o componente é montado
    useEffect(() => {
        (async () => {
            const {status} = await ImagePicker.requestCameraPermissionsAsync()
            if(status !== 'granted'){
                Alert.alert('Permissão negada', 'Você precisa permitir acesso à câmera.')
            }
        })()
    },[])
    // função que é chamada ao clicar no botão
    const tirarFoto = async () => {
        const resultado = await ImagePicker.launchCameraAsync({
            allowsEditing: true, // permite recorte após tirar a foto
            aspect: [1,1], // Proporção da imagem (quadrada)
            quality: 1, // qualidade máxima
        })
        // Se o usuário não cancelar, atualiza o estado com a URI da imagem
        if (!resultado.canceled){
            setImagem(resultado.assets[0].uri)
        }
    }
    return(
        <View style={styles.container}>
            <Button title="Tirar foto" onPress={tirarFoto}/>
            {imagem && (
                <Image
                source={{ uri: imagem}}
                style={styles.imagem}
                />
            )}
        </View>
    )
}
export default BotaoCamera
const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        marginTop: 40,
    },
    imagem:{
        width: 200,
        height: 200,
        marginTop: 20,
        borderRadius: 100, // imagem redonda 
        borderWidth: 2,
        borderColor: '#888'
    }
})
