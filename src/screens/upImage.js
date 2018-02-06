import React from 'react'
import {
    View,
    Image, 
    Button,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'react-native-fetch-blob'
import {Firebase} from '../config/firebase'
// import firebase from 'firebase'
const storage = Firebase.storage()

// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const uploadImage = (uri, mime = 'application/octet-stream') => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    const sessionId = new Date().getTime()
    let uploadBlob = null
    const imageRef = storage.ref('images').child(`${sessionId}`)

    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
    })
  })
}



export default class UpImageScreen extends React.Component{
    constructor(props) {
        super(props)

        this.state = {}
        }

    _pickImage() {
    this.setState({ uploadURL: '' })

    ImagePicker.launchImageLibrary({}, response  => {
        uploadImage(response.uri)
        .then(url => {this.setState({ uploadURL: url }), console.log(url)})
        .catch(error => console.log(error))
    })
    }
    
    render() {
    return (
        <View style={ styles.container }>
        {
            (() => {
            switch (this.state.uploadURL) {
                case null:
                return null
                case '':
                return <ActivityIndicator />
                default:
                return (
                    <View>
                    <Image
                        source={{ uri: this.state.uploadURL }}
                        style={ styles.image }
                    />
                    <Text>{ this.state.uploadURL }</Text>
                    </View>
                )
            }
            })()
        }
        <TouchableOpacity onPress={ () => this._pickImage() }>
            <Text style={ styles.upload }>
            Upload
            </Text>
        </TouchableOpacity>
        </View>
    )
    }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    },
    image: {
    height: 200,
    resizeMode: 'contain',
    },
    upload: {
    textAlign: 'center',
    color: '#333333',
    padding: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: 'gray'
    },
})
    