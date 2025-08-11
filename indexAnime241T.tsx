import React, { useState } from 'react';  
// Importa o React e o hook useState para gerenciar estado no componente funcional.

import { View, StyleSheet, TextInput, Button, ScrollView } from 'react-native';  
// Importa componentes básicos do React Native para criar UI: container, estilos, input de texto, botão e área rolável.

import AnimeCard from '@/components/AnimeCard';  
// Importa o componente AnimeCard, que exibe o card com o nome e cor baseado na classificação do anime.

type Anime = {  
  id: number;  
  nome: string;  
  classificacao: string;  
};  
// Define um tipo TypeScript para um anime, com id único, nome e classificação.

export default function App() {  
  // Componente principal da aplicação.

  const [animes, setAnimes] = useState<Anime[]>([]);  
  // Cria o estado 'animes', um array que começa vazio, para armazenar a lista de animes.

  const [novoAnime, setNovoAnime] = useState<string>('');  
  // Estado para armazenar o texto digitado no input para adicionar novo anime.

  // Função para adicionar um novo anime na lista
  const adicionarAnime = () => {
    if (novoAnime.trim() === '') return;  
    // Se o texto está vazio ou só espaços, não adiciona nada.

    setAnimes([  
      ...animes, // Mantém os animes já cadastrados.
      { id: Date.now(), nome: novoAnime, classificacao: 'legal' },  
      // Adiciona um novo objeto anime com id baseado no timestamp atual, nome vindo do input e classificação padrão 'legal'.
    ]);  

    setNovoAnime('');  
    // Limpa o campo de texto após adicionar.
  };

  // Função para atualizar a classificação de um anime específico
  const avaliarAnime = (id: number, novaClassificacao: string) => {
    setAnimes((prevAnimes) =>
      prevAnimes.map((anime) =>
        anime.id === id
          ? { ...anime, classificacao: novaClassificacao }  
          // Se o id bater, atualiza só a classificação mantendo o resto dos dados.
          : anime  
          // Caso contrário, mantém o anime igual.
      )
    );
  };

  return (
    <View style={styles.container}>  
    {/* Container principal da tela */}

      <TextInput
        style={styles.input}  
        placeholder="Digite o nome do anime"  
        value={novoAnime}  
        onChangeText={setNovoAnime}  
        // Caixa de texto para o usuário digitar o nome do anime, atualiza o estado 'novoAnime' ao digitar.
      />

      <Button title="Adicionar Anime" onPress={adicionarAnime} />  
      {/* Botão que chama a função para adicionar o anime digitado */}

      <ScrollView style={{ width: '100%', marginTop: 20 }}>  
      {/* Área rolável para listar todos os cards de animes adicionados */}

        {animes.map((anime) => (
          <View key={anime.id} style={styles.cardContainer}>  
          {/* Container de cada card individual, usando id único como key */}

            <AnimeCard nome={anime.nome} classificacao={anime.classificacao} />  
            {/* Exibe o card do anime, passando nome e classificação para definir texto e cor */}

            <View style={styles.botoes}>  
            {/* Container para os botões que mudam a classificação */}

              <Button
                title="Legal"
                onPress={() => avaliarAnime(anime.id, 'legal')}  
                // Botão que ao clicar altera a classificação para 'legal' daquele anime específico.
              />
              <Button
                title="Intermediário"
                onPress={() => avaliarAnime(anime.id, 'intermediario')}  
                // Botão para alterar a classificação para 'intermediario'.
              />
              <Button
                title="Ruim"
                onPress={() => avaliarAnime(anime.id, 'ruim')}  
                // Botão para alterar a classificação para 'ruim'.
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda a tela verticalmente
    padding: 20, // Espaçamento interno das bordas da tela
    backgroundColor: '#f2f2f2', // Cor de fundo clara da tela
  },
  input: {
    borderWidth: 1, // Borda fina ao redor do input
    borderColor: '#ccc', // Cor cinza clara para a borda
    padding: 10, // Espaçamento interno para o texto não grudar nas bordas
    marginBottom: 10, // Espaço abaixo do input
    borderRadius: 8, // Bordas arredondadas
    backgroundColor: '#fff', // Fundo branco no input
  },
  cardContainer: {
    alignItems: 'center', // Centraliza conteúdo horizontalmente
    marginBottom: 15, // Espaço entre um card e outro
  },
  botoes: {
    flexDirection: 'row', // Coloca os botões em linha horizontal
    justifyContent: 'space-around', // Espaço igual entre os botões
    width: '80%', // Largura dos botões limitada para não ocupar toda a tela
    marginTop: 5, // Pequeno espaço acima dos botões
  },
});
