import React from 'react';  
// Importa o React para usar JSX e criar componentes.

import { View, Text, StyleSheet } from 'react-native';  
// Importa componentes básicos do React Native para criar UI: container (View), texto (Text) e estilos (StyleSheet).

type Props = {  
  nome: string;  
  classificacao: string;  
};  
// Define o tipo das props que o componente vai receber: nome do anime e sua classificação, ambos strings.

const AnimeCard: React.FC<Props> = ({ nome, classificacao }) => {  
  // Cria um componente funcional chamado AnimeCard que recebe as props nome e classificacao.

  let corFundo = '#9E9E9E';  
  // Define uma cor padrão cinza caso a classificação não seja reconhecida.

  if (classificacao === 'legal') {  
    corFundo = '#4CAF50'; // Verde para classificação "legal"
  } else if (classificacao === 'intermediario') {  
    corFundo = '#FFC107'; // Amarelo para classificação "intermediario"
  } else if (classificacao === 'ruim') {  
    corFundo = '#F44336'; // Vermelho para classificação "ruim"
  }

  return (  
    <View style={[styles.card, { backgroundColor: corFundo }]}>  
    {/* Container do card com estilos fixos + cor de fundo dinâmica */}

      <Text style={styles.nomeAnime}>{nome}</Text>  
      {/* Exibe o nome do anime com estilo de título */}

      <Text style={styles.classificacao}>{classificacao}</Text>  
      {/* Exibe a classificação com estilo de texto menor */}
    </View>  
  );  
};

const styles = StyleSheet.create({  
  card: {  
    width: '80%', // Largura do card ocupa 80% da largura da tela/pai  
    padding: 20, // Espaçamento interno para deixar o conteúdo afastado das bordas  
    borderRadius: 10, // Cantos arredondados para um visual mais suave  
    marginVertical: 10, // Espaço em cima e embaixo do card para separar dos outros  
    alignItems: 'center', // Centraliza o conteúdo horizontalmente  
    elevation: 5, // Sombra para destacar o card (Android)  
  },  
  nomeAnime: {  
    fontSize: 20, // Tamanho maior para o nome do anime  
    fontWeight: 'bold', // Texto em negrito para dar ênfase  
    color: '#fff', // Cor branca para contraste com o fundo colorido  
  },  
  classificacao: {  
    fontSize: 16, // Tamanho menor para a classificação  
    color: '#fff', // Cor branca para o texto  
  },  
});

export default AnimeCard;  
// Exporta o componente para ser usado em outros arquivos do projeto.
