import {
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';
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
  const [fimDeJogo, setFimDeJogo] = useState(false);
  const [mensagem, setMensagem] = useState('Adivinhe a palavra');
  const [letrasCertas, setLetrasCertas] = useState([]);
  const [letrasErradas, setLetrasErradas] = useState([]);

  // Função que sorteia uma palavra aleatória
  function sortearPalavra() {
    const indice = Math.floor(Math.random() * listaDePalavras.length);
    return listaDePalavras[indice];
  }

  const [palavraSorteada, setPalavraSorteada] = useState(sortearPalavra());

  const testaFimDeJogo = (entrada) => {
    //testar se acertou a letra
    let letra = normalizar(entrada);
    let palavraNormalizada = normalizar(palavraSorteada);
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
      console.log(faseDoJogo)
      setLetrasErradas([...letrasErradas, letra]);
      if (faseDoJogo == 6) {
        console.log('fim')
        setFimDeJogo(true);
        setMensagem('Perdeu')
      } else setFaseDoJogo(faseDoJogo + 1);
    }
  };

  const iniciarNovoJogo = () => {
    setFaseDoJogo(0);
    setFimDeJogo(false);
    setLetrasCertas([]);
    setLetrasErradas([]);
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

  const Tecla = ({ letra }) => (
    <Pressable
      onPress={() => {
        if (!letrasCertas.includes(letra) && !letrasErradas.includes(letra))
          testaFimDeJogo(letra);
      }}
      style={[
        {
          width: 30,
          height: 30,
          borderWidth: 1,
          padding: 4,
          borderRadius: 8,
        },
        {
          backgroundColor: letrasCertas.includes(letra)
            ? '#77F'
            : letrasErradas.includes(letra)
            ? '#F77'
            : '#ccc',
        },
      ]}>
      <Text style={{ textAlign: 'center' }}>{letra}</Text>
    </Pressable>
  );

  const Teclado = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          flexWrap: 'wrap',
          margin: 16,
          justifyContent: 'center',
        }}>
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letra) => (
          <Tecla letra={letra} />
        ))}
      </View>
    );
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.mensagem}>{mensagem}</Text>
      <Image source={listaDeImagens[faseDoJogo]} />
      <Text style={estilos.mensagem}>{palavraMascarada()}</Text>
      <Teclado />

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
