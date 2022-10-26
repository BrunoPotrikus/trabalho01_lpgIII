import React, { useState } from "react";

import {View,
        Text,
        StyleSheet,
        StatusBar,
        TouchableOpacity, 
        Modal,
        Image,
        PermissionsAndroid,
        Platform} from "react-native";

import { RNCamera } from "react-native-camera";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { launchImageLibrary } from "react-native-image-picker";

export default function Camera () {
  const [type, setType] = useState(RNCamera.Constants.Type.back);
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState(null);

  async function takePicture (camera) {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);

    setPhoto(data.uri);
    setOpen(true);
    console.log(`Foto em : ${data.uri}`);

    savePhoto(data.uri);
  }

  function mudarCamera () {
    setType(type === RNCamera.Constants.Type.back ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back);
  }

  async function androidPermissions () {
    const permission = PermissionsAndroid.PERMISSIONS .WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);

    if (hasPermission) return true;

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  async function savePhoto (data) {
    if (Platform.OS === 'android' && !(await androidPermissions())) return;

    CameraRoll.save(data, 'photo')
    .then((res) => {
      console.log(`Foto salva com sucesso ${res}`);
    })
    .catch((err) => {
      console.log(`Falha ao salvar ${err}`);
    });
  }

  function album () {
    const options = {
      title: 'Selecionar foto',
      chooseFromLibraryButtonTitle: 'Buscar foto...',
      noData: true,
      mediaType: 'photo'
    };

    launchImageLibrary(options, (res) => {
      if (res.didCancel) {
        console.log('Image cancelado');
      } else if (res.error) {
        console.log(`Erro: ${res.error}`);
      } else {
        setPhoto(res.uri);
        setOpen(true);
      }
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={true}/>
      
      <RNCamera
        style={styles.preview}
        type={type}
        flashMode={RNCamera.Constants.FlashMode.auto}
        androidCameraPermissionOptions={{
          title: 'Permissão para usar a câmera',
          message: 'A utilizacão da câmera é necessária',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancelar'
        }}
      >

        { ({ camera, status, recordAndroidPermissionStatus  }) => {
          if (status !== 'READY') return <View/>;
          return (
            <View style={styles.viewCamera}>

              <TouchableOpacity
                onPress={() => takePicture(camera)}
                style={styles.capture}
              >
                <Text>Tirar foto</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => mudarCamera()}
                style={styles.capture}
              >
                <Text>Mudar câmera</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => album()}
                style={styles.capture}
              >
                <Text>Álbum</Text>
              </TouchableOpacity>

            </View>
          );
        } }

      </RNCamera>
      
      { photo &&  
        <Modal
        animationType="slide"
        transparent={false}
        visible={open}
        >
          <View style={styles.modalView}>
            
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setOpen(false)}
            >
              <Text style={{fontSize: 24}}>Fechar</Text>
            </TouchableOpacity>

            <Image
            resizeMode="contain"
              style={styles.image}
              source={{uri: photo}}
            />
          </View>
        </Modal>
      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#58e56e',
    padding: 24,
    justifyContent: 'center'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  viewCamera: {
    marginBottom: 35,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 10
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  },
  modalButton: {
    margin: 10,

  },
  image: {
    width: 350,
    height: 450,
    borderRadius: 15
  }
});