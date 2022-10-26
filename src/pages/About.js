import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function About () {
    return (
        <View style={styles.container}>
            <Image 
                style={styles.image}
                source={require('../../assets/img/imagem.jpg')} 
            />
            <Text style={styles.text}>Aluno: Bruno Henrique Prado Potrikus</Text>
            <Text style={styles.text}>
                App desenvolvido com React Native. Tem como função tirar fotos,
                tanto com a câmera traseira quanto com a frontal, e salva-las na galeria,
                além de também ter acesso à galeria. O app possui uma tela inicial onde se 
                pode abrir a câmera ou as informações do projeto. Ao entrar na câmera, o 
                usuário poderá mudar a câmera, tirar fotos ou acessar a galeria. Foi implementado
                a opção de abrir fotos da galeria, porém essa função acabou não funcionando. A câmera
                traseira não está tirando fotos quando o app é executado no Android Studio, funcionando
                somente com aparelho físico.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 24
    },
    text: {
        textAlign: 'justify',
        marginBottom: 10,
    },
    image: {
        marginLeft: 65,
        marginBottom: 20
    }
});