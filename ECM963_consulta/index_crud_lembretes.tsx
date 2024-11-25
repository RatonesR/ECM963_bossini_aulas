import {
  Alert,
  // Button,
  FlatList,
  Pressable,
  StyleSheet, 
  Text,
  TextInput,
  View 
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import {
  useState
} from 'react'

interface Lembrete{
  id: string;
  texto: string;
}


export default function HomeScreen() {
  const [lembrete, setLembrete] = useState('')
  const [lembretes, setLembretes] = useState<Lembrete[]>([])

  const adicionar = () => {
    //construir um objeto Lembrete com id igual à data atual e o texto igual àquilo que o usuário digitou até então
    const novoLembrete : Lembrete = {
      id: Date.now().toString(),
      texto: lembrete
    }
    //atualizar a lista, incluindo esse novo lembrete
    setLembretes((estadoAnterior) => { 
      //limpar o campo lembrete
      setLembrete('')
      return [novoLembrete, ...estadoAnterior]
    })

  }

  const remover = (lembrete: Lembrete) => {
    //antes de prosseguir, ela exibe um Alert (observe, que o Alert regular do React Native, não vai funcionar na web. Tente encontrar algum que funciona no npmjs.com)
    // Alert.alert(
    //   //titulo
    //   'Remover lembrete',
    //   //mensagem central
    //   `Deseja remover este lembrete? ${lembrete.texto}`,
    //   //coleção de botões
    //   [
    //     {
    //       text: 'Cancelar',
    //       style: 'cancel'
    //     },
    //     {
    //       text: 'Remover',
    //       style: 'destructive',
    //       onPress: () => {
    //         setLembretes(
    //           lembretesAtual => lembretesAtual.filter(item => item.id !== lembrete.id)
    //         )  
    //       }
    //     }
    //   ]
    // )
    setLembretes(
      lembretesAtual => lembretesAtual.filter(item => item.id !== lembrete.id)
    )
    //buscar o lembrete a ser removido na lista, usando o seu id

    //remover ele da lista

    //atualizar a variável de estado lembretes, causando nova atualização gráfica da FlatList
  }

  const atualizar = () => {
    
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input} 
        placeholder='Digite um lembrete...'
        value={lembrete}
        onChangeText={setLembrete}
      />
      <Pressable
        style={styles.pressable}
        onPress={adicionar}>
        <Text
          style={styles.pressableText}>
          Salvar
        </Text>
      </Pressable>
      <FlatList
        keyExtractor={(l) => l.id}
        style={styles.list} 
        data={lembretes}
        renderItem={
          l => (
            <View
              style={styles.listItem}>
              <Text
                style={styles.listItemText}>
                {l.item.texto}
              </Text>
              <View
                style={styles.listItemButtons}>
                <Pressable
                  onPress={() => remover(l.item)}>
                  <AntDesign 
                    name='delete'
                    size={24}
                  />
                </Pressable>
                <Pressable>
                  <AntDesign 
                    name='edit'
                    size={24}
                  />
                </Pressable>
              </View>
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20
  },
  input: {
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 12,
    borderRadius: 8
  },
  pressable: {
    width: '80%',
    backgroundColor: '#0096F3',
    padding: 12,
    borderRadius: 8
  },
  pressableText: {
    color: 'white',
    textAlign: 'center'
  },
  list: {
    width: '80%',
    borderColor: '#CCC',
    borderWidth: 1,
    marginTop: 12,
    borderRadius: 4,
    padding: 8
  },
  listItemText: {
    width: '70%',
    textAlign: 'center'
  },
  listItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBlockColor: '#DDD',
    backgroundColor: '#F0F0F0',
    textAlign: 'center',
    borderRadius: 4,
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  listItemButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '30%'
  }
});
