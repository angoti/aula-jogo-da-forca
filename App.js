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

  // Função para sortear uma letra do alfabeto
  const sortearLetra = () => {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letras[Math.floor(Math.random() * letras.length)];
  };

  const [letraSorteada, setLetraSorteada] = useState(sortearLetra()); // estado que guarda a letra sorteada

  const testaFimDeJogo = () => {
    //testar se acertou a letra
    if (entrada.toUpperCase() === letraSorteada) console.log('acertou');
  };

  return (
    <View style={estilos.container}>
      <Image source={listaDeImagens[faseDoJogo]} />
      <TextInput
        style={estilos.caixaEntrada}
        maxLength={1} // limita a apenas 1 caractere
        value={entrada}
        onChangeText={setEntrada}
        textAlign="center" // centraliza a letra
      />
      <Button
        title="Jogar"
        onPress={() => {
          if (faseDoJogo == 6) setFaseDoJogo(0);
          else setFaseDoJogo(faseDoJogo + 1);
          console.log(letraSorteada);
          testaFimDeJogo();
          // faseDoJogo++;
          // console.log(faseDoJogo)
        }}
      />
      <Button
        title="Novo jogo"
        onPress={() => {
          setFaseDoJogo(0);
          setLetraSorteada(sortearLetra());
        }}
      />
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
    fontSize: 28,
    fontWeight: 'bold',
    backgroundColor: '#474',
  },
});
