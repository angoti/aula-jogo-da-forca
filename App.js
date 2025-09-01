import { View, Image, Text, Button, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';

const listaDeImagens = [
  require('./assets/forca.png'),
  require('./assets/cabeca.png'),
  require('./assets/cabecacorpo.png'),
  require('./assets/cabecacorpoumbraco.png'),
  require('./assets/cabecacorpodoisbracos.png'),
  require('./assets/cabecacorpodoisbracosumaperna.png'),
  require('./assets/cabecacorpodoisbracosduaspernas.png'),
];

const listaDePalavras = [
  'MAÇÃ',
  'CORAÇÃO',
  'BANANA',
  'PROGRAMAÇÃO',
  'LÓGICA',
  'REACT',
  'SPRING',
  'NATIVO',
  'FORÇA',
  'RAZÃO',
];

const normalizar = (str) =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  //transforma a palavra retirando os acentos. Veja https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize#description

export default function App() {
  const [faseDoJogo, setFaseDoJogo] = useState(0); // estado que guarda o indice da imagem atual
  const [entrada, setEntrada] = useState(''); // estado que guarda o texto inputado na caixa de entrada
  const [fimDeJogo, setFimDeJogo] = useState(false);
  const [mensagem, setMensagem] = useState('Adivinhe a palavra');
  const [letrasCertas, setLetrasCertas] = useState([]);

  // Função que sorteia uma palavra aleatória
  function sortearPalavra() {
    const indice = Math.floor(Math.random() * listaDePalavras.length);
    return listaDePalavras[indice];
  }

  const [palavraSorteada, setPalavraSorteada] = useState(sortearPalavra());

  const testaFimDeJogo = () => {
    //testar se acertou a letra
    let letra = normalizar(entrada);
    let palavraNormalizada = normalizar(palavraSorteada);
    console.log(letra);
    console.log(palavraNormalizada);
    if (palavraNormalizada.includes(letra)) {
      let novasLetrasCertas = [...letrasCertas, letra];
      setLetrasCertas(novasLetrasCertas);
      if (
        palavraNormalizada
          .split('')
          .every((letra) => novasLetrasCertas.includes(letra))
      ) {
        setFimDeJogo(true);
        setMensagem('Acertou');
      }
    } else {
      if (faseDoJogo == 6) setFimDeJogo(true);
      else setFaseDoJogo(faseDoJogo + 1);
    }
    setEntrada('');
  };

  const iniciarNovoJogo = () => {
    setFaseDoJogo(0);
    setFimDeJogo(false);
    setLetrasCertas([]);
    setPalavraSorteada(sortearPalavra());
    setMensagem('Adivinhe a palavra');
  };

  const palavraMascarada = () => {
    return palavraSorteada
      .split('')
      .map((letra) =>
        letrasCertas.includes(normalizar(letra)) ? letra : '_ '
      );
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.mensagem}>{mensagem}</Text>
      <Image source={listaDeImagens[faseDoJogo]} />
      <Text style={estilos.mensagem}>{palavraMascarada()}</Text>
      <TextInput
        style={estilos.caixaEntrada}
        maxLength={1} // limita a apenas 1 caractere
        value={entrada}
        onChangeText={(letra) => setEntrada(letra.toUpperCase())}
        textAlign="center" // centraliza a letra
      />

      {fimDeJogo ? (
        <Button
          title="Novo jogo"
          onPress={() => {
            iniciarNovoJogo();
          }}
        />
      ) : (
        <Button
          title="Jogar"
          onPress={() => {
            testaFimDeJogo();
          }}
        />
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  caixaEntrada: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 8,
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#474',
  },
  mensagem: {
    fontSize: 28,
    fontWeight: 'bold',
    borderRadius: 8,
    backgroundColor: '#474',
    padding: 8,
    color: 'white',
    width: '90%',
    textAlign: 'center',
  },
});
