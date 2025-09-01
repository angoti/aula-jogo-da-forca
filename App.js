import { View, Image, Text, Button } from 'react-native';
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
  const [faseDoJogo, setFaseDoJogo] = useState(0);

  return (
    <View>
      <Image source={listaDeImagens[faseDoJogo]} />
      <Button
        title="Jogar"
        onPress={() => {
          setFaseDoJogo(faseDoJogo + 1);
          // faseDoJogo++;
          // console.log(faseDoJogo)
        }}
      />
    </View>
  );
}
