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

export default function App() {
  // var faseDoJogo = 0;
  const [faseDoJogo, setFaseDoJogo] = useState(0); // estado que guarda o indice da imagem atual
  const [entrada, setEntrada] = useState(''); // estado que guarda o texto inputado na caixa de entrada
  const [fimDeJogo, setFimDeJogo] = useState(false);
  const [mensagem, setMensagem] = useState('Adivinhe a letra');

  // Função para sortear uma letra do alfabeto
  const sortearLetra = () => {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letras[Math.floor(Math.random() * letras.length)];
  };

  const [letraSorteada, setLetraSorteada] = useState(sortearLetra()); // estado que guarda a letra sorteada

  const testaFimDeJogo = () => {
    //testar se acertou a letra
    if (entrada.toUpperCase() === letraSorteada) {
      setFimDeJogo(true);
      setMensagem('Acertou');
    } else {
      if (faseDoJogo == 6) setFimDeJogo(true);
      else setFaseDoJogo(faseDoJogo + 1);
    }
    console.log(letraSorteada);
    setEntrada('')
  };

  const iniciarNovoJogo = () => {
    setFaseDoJogo(0);
    setLetraSorteada(sortearLetra());
    setFimDeJogo(false);
    setMensagem('Adivinhe a letra');
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.mensagem}>{mensagem}</Text>
      <Image source={listaDeImagens[faseDoJogo]} />
      <TextInput
        style={estilos.caixaEntrada}
        maxLength={1} // limita a apenas 1 caractere
        value={entrada}
        onChangeText={setEntrada}
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
    width:'90%',
    textAlign:'center'
  },
});
