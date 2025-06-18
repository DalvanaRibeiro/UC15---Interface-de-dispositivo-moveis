// Importa hooks useEffect e useState do React para gerenciar estado e ciclo de vida
import { useEffect, useState } from 'react';
// Importa componentes básicos do React Native para construir a interface
import { View, Text, FlatList, StyleSheet, Pressable, TextInput, ActivityIndicator } from 'react-native';
// Importa useRouter do Expo Router para navegação entre telas
import { useRouter } from 'expo-router';

// Define o tipo do objeto Usuario com os campos que usaremos
type Usuario = {
  id: number;    // ID numérico único do usuário
  name: string;  // Nome do usuário
};

// Componente principal da tela de busca de usuários
export default function TelaBusca() {
  // Estado para armazenar a lista de usuários obtidos da API
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  // Estado para armazenar o texto digitado no filtro de busca
  const [filtro, setFiltro] = useState('');
  // Estado que indica se os dados ainda estão carregando
  const [carregando, setCarregando] = useState(true);
  // Hook do Expo Router para navegar para outras telas
  const router = useRouter();

  // Função para buscar os usuários na API externa
  const buscarUsuarios = () => {
    setCarregando(true); // Marca o início do carregamento
    fetch('https://jsonplaceholder.typicode.com/users') // Faz requisição para a API
      .then(res => res.json())  // Converte a resposta para JSON
      .then(dados => {
        setUsuarios(dados);  // Atualiza o estado com a lista de usuários recebida
        setCarregando(false); // Finaliza o carregamento
      });
  };

  // useEffect executa a função buscarUsuarios uma vez, ao montar o componente
  useEffect(() => {
    buscarUsuarios();
  }, []);

  // Cria uma nova lista filtrando os usuários cujo nome contém o texto digitado (ignora maiúsculas/minúsculas)
  const usuariosFiltrados = usuarios.filter(u =>
    u.name.toLowerCase().includes(filtro.toLowerCase())
  );

  // Se estiver carregando, exibe um indicador e mensagem de carregamento
  if (carregando) {
    return (
      <View style={estilos.container}>
        {/* Spinner de carregamento com cor azul escuro */}
        <ActivityIndicator size="large" color="#0D47A1" />
        {/* Texto informando que os usuários estão sendo carregados */}
        <Text style={estilos.carregandoTexto}>Carregando usuários...</Text>
      </View>
    );
  }

  // Quando os dados já estiverem carregados, exibe a tela principal
  return (
    <View style={estilos.container}>
      {/* Título da tela com emoji */}
      <Text style={estilos.titulo}>🔎 Buscar Usuário</Text>

      {/* Campo de texto para digitar o filtro (nome do usuário) */}
      <TextInput
        placeholder="Digite um nome"  // Texto que aparece quando o campo está vazio
        value={filtro}                // Valor atual do campo (estado filtro)
        onChangeText={setFiltro}      // Atualiza o estado filtro ao digitar
        style={estilos.input}         // Estilos aplicados ao campo
        placeholderTextColor="#90CAF9"// Cor do placeholder (texto de dica)
      />

      {/* Lista que renderiza os usuários filtrados */}
      <FlatList
        data={usuariosFiltrados}          // Dados que serão exibidos na lista
        keyExtractor={item => item.id.toString()} // Chave única para cada item (ID convertido em string)
        renderItem={({ item }) => (       // Função que renderiza cada item da lista
          <Pressable
            onPress={() =>
              // Ao clicar no usuário, navega para a tela de detalhes enviando o id como parâmetro
              router.push({
                pathname: '/(tabs)/screens/usuarioApi',
                params: { id: item.id.toString() },
              })
            }
            style={estilos.card}          // Estilos do card que envolve o nome do usuário
          >
            {/* Texto exibindo o nome do usuário com emoji estrela */}
            <Text style={estilos.nome}>🌟 {item.name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

// Definição dos estilos usados no componente, com paleta azul
const estilos = StyleSheet.create({
  container: {
    flex: 1,                 // O container ocupa toda a tela disponível
    padding: 16,             // Espaçamento interno de 16 pontos
    backgroundColor: '#E3F2FD', // Fundo azul claro para a tela
  },
  titulo: {
    fontSize: 20,            // Tamanho da fonte do título
    fontWeight: 'bold',      // Texto em negrito
    color: '#0D47A1',        // Azul escuro para o texto do título
    marginBottom: 10,        // Espaço abaixo do título
  },
  input: {
    backgroundColor: '#FFFFFF', // Fundo branco para o campo de texto
    borderColor: '#64B5F6',     // Borda azul intermediária
    borderWidth: 1,             // Largura da borda
    borderRadius: 8,            // Bordas arredondadas
    padding: 10,                // Espaço interno do campo
    marginBottom: 16,           // Espaço abaixo do campo
    color: '#0D47A1',           // Cor do texto digitado (azul escuro)
  },
  card: {
    backgroundColor: '#BBDEFB', // Fundo azul suave para os cards dos usuários
    padding: 12,                // Espaço interno nos cards
    marginBottom: 10,           // Espaço entre os cards
    borderRadius: 8,            // Bordas arredondadas dos cards
  },
  nome: {
    fontSize: 18,               // Tamanho da fonte para o nome do usuário
    color: '#0D47A1',           // Azul escuro para o texto do nome
  },
  carregandoTexto: {
    marginTop: 10,              // Espaço acima do texto de carregamento
    color: '#0D47A1',           // Azul escuro para o texto do loading
  },
});
