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
    ListView
} from 'react-native'

import {Firebase} from '../config/firebase'

export default class HomeScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            postContent:'',
            
        }
        this.itemRef = Firebase.database()
    }
    _postStatus = () => {
        this.itemRef.ref('post').push({
            content: this.state.postContent
        })
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
                            this._postStatus()
                        }}
                        title='post'/>
                </View>
                <Post content='asdfffffffff'/>
                <View>{this.state.list}</View>
                
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
        borderRadius: width*3.6/187.5
    },
    postText:{
        color:'#000',
        backgroundColor:'#fff',
        padding:width*3.6/187.5
    }
})
export class Post extends React.Component{
    render(){
        return(
            <View style={styles.postContainer}>
                <Text style={styles.postText}>{this.props.content}</Text>
            </View>
        )
    }
}