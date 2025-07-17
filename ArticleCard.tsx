import React from 'react';
// Importa React, necessário para criar componentes funcionais

import { View, Text, StyleSheet, Image, Pressable, Linking } from 'react-native';
// Importa componentes básicos do React Native:
// View para contêineres, Text para exibir textos,
// StyleSheet para estilos, Image para imagens,
// Pressable para botões/clicks, Linking para abrir URLs

// Define o tipo das props que o componente espera receber
type Props = {
  article: {
    title: string;               // Título do artigo
    url: string;                 // URL do artigo para abrir no navegador
    reading_time_minutes: number; // Tempo estimado de leitura
    user: { 
      name: string;              // Nome do autor
      profile_image: string;     // URL da imagem de perfil do autor
    };
    tag_list: string[];          // Lista de tags (assuntos) do artigo
  };
};

export default function ArticleCard({ article }: Props) {
  // Função para abrir o link do artigo no navegador externo
  const abrir = () => Linking.openURL(article.url);

  return (
    // Pressable torna o card clicável, disparando a função abrir()
    <Pressable onPress={abrir} style={st.card}>
      {/* Imagem do autor com estilo de avatar circular */}
      <Image source={{ uri: article.user.profile_image }} style={st.avatar} />
      
      {/* Container com as informações textuais do artigo */}
      <View style={st.info}>
        {/* Título do artigo, destacado */}
        <Text style={st.title}>{article.title}</Text>

        {/* Meta informação: nome do autor e tempo de leitura */}
        <Text style={st.meta}>
          {article.user.name} • {article.reading_time_minutes} min
        </Text>

        {/* Tags do artigo, exibidas com # e separadas por espaço */}
        <Text style={st.tags}>
          {article.tag_list.map(tag => `#${tag}`).join(' ')}
        </Text>
      </View>
    </Pressable>
  );
}

// Estilos do componente
const st = StyleSheet.create({
  card: {
    flexDirection: 'row',         // Exibe avatar e info lado a lado na horizontal
    padding: 14,                  // Espaçamento interno em todo o card
    marginBottom: 12,             // Espaço abaixo do card para separar da próxima lista
    backgroundColor: '#fff',      // Fundo branco para contraste limpo
    borderRadius: 12,             // Bordas arredondadas para visual moderno
    shadowColor: '#000',          // Cor da sombra para profundidade
    shadowOpacity: 0.1,           // Opacidade da sombra, bem suave
    shadowRadius: 6,              // Tamanho do desfoque da sombra
    shadowOffset: { width: 0, height: 3 }, // Direção da sombra para baixo
    elevation: 3,                 // Sombra para Android (elevação)
    alignItems: 'center',         // Alinha verticalmente o conteúdo no centro
  },
  avatar: { 
    width: 56,                    // Largura da imagem do autor
    height: 56,                   // Altura da imagem do autor (circular)
    borderRadius: 28,             // Faz a imagem circular (metade da largura)
  },
  info: { 
    flex: 1,                     // Faz o container de texto ocupar o espaço restante
    marginLeft: 14,              // Espaço entre o avatar e as informações
  },
  title: { 
    fontSize: 18,                // Tamanho maior para o título
    fontWeight: '700',           // Negrito para destaque
    marginBottom: 6,             // Espaço abaixo do título
    color: '#222',               // Cor escura para boa legibilidade
  },
  meta: { 
    fontSize: 13,                // Fonte menor para informações secundárias
    color: '#555',               // Cinza para menor destaque
  },
  tags: { 
    fontSize: 13,                // Mesma fonte que meta
    color: '#007aff',            // Azul padrão para links/tags
    marginTop: 6,                // Espaço acima das tags para separar do meta
  },
});
