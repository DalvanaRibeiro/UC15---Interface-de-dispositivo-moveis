// Importando hooks
import{useEffect, useState} from 'react'
import{ View, Text, FlatList, StyleSheet, Pressable, TextInput, ActivityIndicator} from 'react-native'
import { useRouter } from 'expo-router'

// Define o tipo do objeto Usuario com os campos que usaremos
type Usuario = {
  id: number 
  name: string
}
// Componente principal da tela de busca dos usuários
export default function TelaBusca(){
  // Estado para armazenar a lista de usuários obtidos da API
  const [usuario, setUsuario] = useState<Usuario[]>([])
  // Estado para armazenar o texto digitado no filtro de busca
  const[filtro, setFiltro] = useState('')
  // Estado que indica se os dados ainda estão carregando
  const[carregando, setCarregando] = useState(true)
  // Hook do Expo Router para navegar entre telas
  const router = useRouter()
  // Função para buscar os usuários na API externa
  const buscarUsuarios = () => {
    setCarregando(true) // Marca o início do carregamento
    fetch('https://jsonplaceholder.typicode.com/users') // Faz a requisição para a API
    .then(res => res.json()) // converte a resposta para JSON
    .then( dados => {
      setUsuario(dados) // Atualiza o estado com a lista de usuários recebida
      setCarregando(false) // Finaliza o carregamento
    })
  }
  // useEffect executa a função buscarUsuarios uma vez, ao montar o componente
  useEffect(() => {
    buscarUsuarios()
  }, [])
  // Cria uma nova lista filtrando os usuários cujo o nome contém o texto digitado  (iginorando maiúscula/minúscula)
  const usuariosFiltrados = usuario.filter( u => u.name.toLocaleLowerCase().includes(filtro.toLocaleLowerCase())
)
// Se estiver carregando, exibe um indicador e mensagem de carregamento
if(carregando){
  return(
    <View style={estilos.container}>
      {/* Spinner de carregamento com cor azul escuro */}
      <ActivityIndicator size="large" color="#0D47A1" />
      {/* Texto informando que os usuários estão sendo carregados */}
      <Text style={estilos.carregandoTexto}> Carregando usuários...
        </Text>
    </View>
  )
}
// Quando os dados já estiverem carregados, exibe a tela pricipal
return(
  <View style={estilos.container}>
    {/* Título da tela */}
    <Text style={estilos.titulo}> 🔎 Buscar Usuário </Text>
    {/* Campo de texto para digitar o filtro (nome do usuário)*/}
    <TextInput
    placeholder='Digite um nome' 
    value={filtro} // Valor atual do campo (estado de filtro)
    onChangeText={setFiltro}  // Atualizar o estado de filtro ao digitar
    style={estilos.input}     // Estilos aplicaado ao campo
    placeholderTextColor="#90CAF9"/>
    {/* Lista que renderiza os usuários filtrados */}
    <FlatList
    data={usuariosFiltrados}  // Dados que serão exibidos na lista
    keyExtractor={item => item.id.toString()} // Chave única para cada item (ID convertodo em string)
    renderItem={({item}) => (   // Função que renderiza cada item da lista
    <Pressable
    onPress={() =>
      // Ao clicar no usuário, navega para a tela de detalhes enviando o id como parâmetro
      router.push({
        pathname: '/(tabs)/screens/usuarioApi',
        params: {id: item.id.toString()},
      })
    }  
    style={estilos.card} // Card que envolve o nome do usuário
    >
      {/* Texto exibindo o nome do usuário */}
      <Text style={estilos.nome}> 👶 {item.name}</Text>
    </Pressable>
    )}
    />
  </View>
)
}
// Definição dos estilos
const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding:16,
    backgroundColor: '#E3F2FD',
  },
  titulo:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D47A1',
    marginBottom: 10,
  },
  input:{
    backgroundColor: '#FFFFFF',
    borderColor: '#64B5F6',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    color: '#0DA7A1',
  },
  card:{
    backgroundColor: '#BBDEFB',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  nome:{
    fontSize: 18,
    color: '#0D47A1',
  },
  carregandoTexto:{
    marginTop: 10,
    color: '#0D47A1',
  }
})
