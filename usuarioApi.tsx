// Importa componentes básicos e hooks do React Native para criar interface e controlar estado
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
// Importa hook do Expo Router para acessar parâmetros da rota atual (URL)
import { useLocalSearchParams } from 'expo-router';
// Importa hooks do React para controlar estado e efeitos colaterais
import { useEffect, useState } from 'react';

// Define o tipo (TypeScript) para o objeto Usuario com os campos esperados
type Usuario = {
  id: number;                 // Identificador único do usuário
  name: string;               // Nome completo
  email: string;              // Email do usuário
  phone: string;              // Telefone
  website: string;            // Website pessoal ou profissional
  company: { name: string };  // Objeto company contendo o nome da empresa
  address: { street: string; city: string }; // Objeto address com rua e cidade
};

// Componente principal da tela de detalhes do usuário
export default function DetalhesUsuario() {
  // Obtém o parâmetro 'id' da URL via hook do Expo Router (ex: /detalhesUsuario?id=3)
  const { id } = useLocalSearchParams();

  // Estado para armazenar os dados do usuário buscado (ou null se ainda não carregou)
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  // Estado para indicar se a tela está carregando dados da API
  const [carregando, setCarregando] = useState(true);

  // Hook que executa efeito colateral para buscar dados do usuário quando 'id' mudar
  useEffect(() => {
    // Se não tiver id (ex: página acessada sem parâmetro), não faz nada
    if (!id) return;

    // Faz requisição para a API pública para buscar usuário pelo id
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => res.json())       // Converte a resposta para objeto JSON
      .then(dados => {
        setUsuario(dados);           // Atualiza estado com dados do usuário
        setCarregando(false);        // Marca fim do carregamento para renderizar a tela
      });
  }, [id]); // Executa toda vez que o 'id' mudar

  // Se estiver carregando ou usuário ainda for null, mostra indicador de loading
  if (carregando || !usuario) {
    return (
      <View style={estilos.container}>
        {/* Spinner animado para indicar carregamento */}
        <ActivityIndicator size="large" color="#0D47A1" />
        {/* Texto de ajuda abaixo do spinner */}
        <Text style={estilos.carregandoTexto}>Carregando detalhes...</Text>
      </View>
    );
  }

  // Quando os dados já estiverem carregados, mostra os detalhes do usuário
  return (
    <View style={estilos.container}>
      {/* Nome do usuário com emoji para destaque */}
      <Text style={estilos.nome}>🌟 {usuario.name}</Text>
      {/* Email do usuário */}
      <Text style={estilos.info}>📧 {usuario.email}</Text>
      {/* Telefone */}
      <Text style={estilos.info}>📞 {usuario.phone}</Text>
      {/* Website */}
      <Text style={estilos.info}>🌐 {usuario.website}</Text>
      {/* Nome da empresa */}
      <Text style={estilos.info}>🏢 {usuario.company.name}</Text>
      {/* Endereço: rua e cidade */}
      <Text style={estilos.info}>
        🏠 {usuario.address.street}, {usuario.address.city}
      </Text>
    </View>
  );
}

// Estilos do componente, usando tons de azul para combinar com a outra tela
const estilos = StyleSheet.create({
  container: {
    flex: 1,                   // Ocupa toda a área da tela
    padding: 20,               // Espaçamento interno
    backgroundColor: '#E3F2FD',// Fundo azul claro suave
  },
  nome: {
    fontSize: 24,              // Fonte grande para o nome
    fontWeight: 'bold',        // Negrito para dar destaque
    color: '#0D47A1',          // Azul escuro para o texto do nome
    marginBottom: 15,          // Espaço abaixo do nome
  },
  info: {
    fontSize: 16,              // Tamanho médio para as informações
    color: '#1565C0',          // Azul intermediário para os textos
    marginBottom: 8,           // Espaço entre as linhas
  },
  carregandoTexto: {
    marginTop: 10,             // Espaço acima do texto de carregamento
    color: '#0D47A1',          // Azul escuro para texto de loading
  },
});
