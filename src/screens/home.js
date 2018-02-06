import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TextInput,
    Button,
    FlatList,
    Alert,
    ListView,
    TouchableOpacity,
    Image
} from 'react-native'
import Modal from 'react-native-modal'
import {Firebase} from '../config/firebase'

export default class HomeScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            postContent:'',
            post:[],
            modalVisible:false
        }
        this.itemsRef = Firebase.database().ref().child('shop');
    }
    _showDialog = () => {
        this.setState({modalVisible: true})
    }
    _hideDialog = () => {
        this.setState({modalVisible: false})
    }
    _post = () => {
        this.setState({modalVisible:true})
    }
    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {
            var items = [];
            snap.forEach((child) => {
                let t = {
                    key:(child.key),
                    id:child.val().id,
                    name:child.val().name,
                    price: child.val().price,
                    info: child.val().info
                }
                items.push(
                    t
                );
            });
            
    
            this.setState({
                post: items
            });
            this.state.post.map((item, idx) =>{
                console.log(item.key)
            })
    
        });
    }
    delete(key) {
        itemsRef.child(key).remove()
    }

    componentWillMount (){
        this.listenForItems(this.itemsRef)
    }
    render(){
        return(
            <View style={styles.container}>
                <Modal
                    isVisible={this.state.modalVisible}
                    onBackButtonPress={this._hideDialog}
                    onBackdropPress={this._hideDialog}>
                    <ItemPost/>
                </Modal>
                <View style={styles.postStatus}>
                    <Button
                        onPress={()=>{
                            this._showDialog()
                        }}
                        title='Đăng hàng'/>
                </View>
                <FlatList
                    data={this.state.post}
                    renderItem={({item})=>
                    
                       <Post keyt={item.key} id={item.id} name={item.name} price={item.price} info={item.info}/>
                       
                    }
                />
            </View>
        )
    }
}
const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    postStatus:{
        backgroundColor:'#f2f2f2'
    },
    postContainer:{
        backgroundColor:'#f1f1f1',
        margin:width*3.6/187.5,
        padding:width*3.6/187.5,
        borderRadius: width*3.6/187.5,
    },
    nameAuth:{
        color:'#000',
        fontSize:16
    },
    postText:{
        color:'#000',
        // backgroundColor:'#fff',
        padding:width*3.6/187.5
    },

})
export class Post extends React.Component{
    constructor(props){
        super(props)
        this.state={
            edit:false,
            info:this.props.info,
            url:''
        }
    }
    _edit(){
        Firebase.database().ref().child('shop').child(this.props.keyt).set({
            name:'post',
            info:this.state.content
        })
        this.setState({
            edit:false
        })
    }
    _delete(){
        Firebase.database().ref().child('shop').child(this.props.keyt).remove()
    }
    componentDidMount(){
        Firebase.storage().ref().child('images/'+this.props.id+'.jpg').getDownloadURL()
        .then((url)=>{
            this.setState({url:url})
        })
        .catch((err)=>{
            this.setState({url:'http://thegioiic.com/images/no_image.gif'})
        })
    }
    render(){
        console.log(this.props)
        return(
            <View style={styles.postContainer}>
                <View style={{flexDirection:'row',alignItems:'center', backgroundColor:'#f2f2f2'}}>
                    <Text>Tên sản phẩm: </Text><Text style={styles.nameAuth}>{this.props.name}</Text>
                    <TouchableOpacity style={{
                        position:'absolute',
                        right:3
                    }}
                    onPress={()=>{
                        this._delete()
                    }}>
                        <Text>Xóa</Text>
                    </TouchableOpacity>
                </View>
                    <Image style={{alignSelf:'center', width:width*167.5/187.5, height:width*157.5/187.5, resizeMode:'cover'}} source={{uri: this.state.url}} />
                    <Text style={styles.postText}>Mô tả: {this.state.info}</Text>
                <View style={{flexDirection:'row'}}>
                    <Text>Giá: {this.props.price}</Text>
                </View>
            </View>
        )
    }
}

import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'react-native-fetch-blob'
const storage = Firebase.storage()
// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
const uploadImage = (uri, mime = 'application/octet-stream') => {
    return new Promise((resolve, reject) => {
    //   const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri //android and ios
    const uploadUri = uri //android only
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


export class ItemPost extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:'',
            price:'',
            info:''
        }
    }
    _post = () =>{
        console.log('post' ,new Date().getTime())
        Firebase.database().ref().child('shop').push({
            id:new Date().getTime(),
            name:this.state.name,
            price:this.state.price,
            info:this.state.info,
        })
    }
    _pickImage() {
        console.log('picking...')
        this.setState({ uploadURL: '' })
    
        ImagePicker.launchImageLibrary({}, response  => {
            uploadImage(response.uri)
            .then(url => {this.setState({ uploadURL: url }), console.log(url)})
            .catch(error => console.log(error))
        })
    }
    render(){
        return(
            <View style={{
                width: width*167.5/187.5,
                // height: width*167.5/187.5,
                backgroundColor:'#fff',
                padding:width*5/187.5
            }}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Text>Tên sản Phẩm:</Text>
                    <TextInput
                        style={{flex:1}}
                        onChangeText={(value)=>{this.setState({name:value})}}
                    />
                </View>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Text>Giá:</Text>
                    <TextInput
                        style={{flex:1}}
                        onChangeText={(value)=>{this.setState({price:value})}}
                    />
                </View>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Text>Mô tả:</Text>
                    <TextInput
                        style={{flex:1}}
                        onChangeText={(value)=>{this.setState({info:value})}}
                    />
                </View>
                
                <View style={{flexDirection:'row', margintop:width*3.6/187.5, alignItems:'center',justifyContent:'center'}}>
                    <Button style={{width:width*80/187.5}} title='Chọn Ảnh' onPress={()=>{this._pickImage()}}/>
                    <Button style={{width:width*80/187.5}} title='Submit' onPress={()=>{this._post()}}/>
                </View>
            </View>
        )
    }
}