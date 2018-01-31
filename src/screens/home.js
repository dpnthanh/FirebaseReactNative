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
    TouchableOpacity
} from 'react-native'

import {Firebase} from '../config/firebase'

export default class HomeScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            postContent:'',
            post:[]
        }
        this.itemsRef = Firebase.database().ref().child('post');
    }
    _postStatus = () => {
        Firebase.database().ref().child('post').push({
            name:"post",
            content:this.state.postContent,
        })
    }
    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {
            var items = [];
            snap.forEach((child) => {
                let t = {
                    key:(child.key),
                    name:child.val().name,
                    content: child.val().content
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
                <View style={styles.postStatus}>
                    <TextInput
                        onChangeText={(value)=>{this.setState({postContent:value})}}
                        placeholder='bạn đang nghĩ gì'/>
                    <Button
                        onPress={()=>{
                            this.setState({
                                postContent:''
                            })
                            this._postStatus()
                        }}
                        title='post'/>
                </View>
                <FlatList
                    data={this.state.post}
                    renderItem={({item})=>
                    
                       <Post keyt={item.key} name={item.name} content={item.content}/>
                       
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
        color:'#9a9a9a',
        fontSize:16
    },
    postText:{
        color:'#000',
        backgroundColor:'#fff',
        padding:width*3.6/187.5
    }
})
export class Post extends React.Component{
    constructor(props){
        super(props)
        this.state={
            edit:false,
            content:this.props.content
        }
    }
    _edit(){
        Firebase.database().ref().child('post').child(this.props.keyt).set({
            name:'post',
            content:this.state.content
        })
        this.setState({
            edit:false
        })
    }
    _delete(){
        Firebase.database().ref().child('post').child(this.props.keyt).remove()
    }
    render(){
        return(
            <View style={styles.postContainer}>
                <View style={{flexDirection:'row', backgroundColor:'#f2f2f2'}}>
                    <Text style={styles.nameAuth}>{this.props.name}</Text>
                    <TouchableOpacity style={{
                        position:'absolute',
                        right:30
                    }}
                    onPress={()=>{
                        this.setState({
                            edit:true
                        })
                    }}>
                        <Text>Sửa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        position:'absolute',
                        right:3
                    }}
                    onPress={()=>{
                        this.delete()
                    }}>
                        <Text>Xóa</Text>
                    </TouchableOpacity>
                </View>
                {this.state.edit||
                    <Text style={styles.postText}>{this.state.content}</Text>
                }
                {!this.state.edit||
                    <TextInput 
                        onChangeText={(value)=>{
                            this.setState({
                                content:value
                            })
                        }}
                        onSubmitEditing={()=>{
                            this._edit()
                            
                        }}
                        style={styles.postText}
                        value={this.state.content}/>
                }
            </View>
        )
    }
}