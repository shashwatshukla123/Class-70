import React, { Component } from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Image,TextInput } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class BookTransationScreen extends React.Component{
    constructor(){
        super()
        this.state={
            hasCameraPermission:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal',
            scannedBookID:'',
            scannedStudentID:''
        }
    }
    
    getCameraPermisssion=async(ID)=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
        hasCameraPermission:status=='granted',
        buttonState:ID,
        scanned:false
    })
    }

    handleBarCodeScanned=async({type,data})=>{
        const {buttonState}=this.state
        if(buttonState=='BookID'){
    this.setState({
        scanned:true,
        scannedData:data,
        buttonState:'normal'
    })
}
 else if(buttonState=='StudentID'){
    this.setState({
        scanned:true,
        scannedData:data,
        buttonState:'normal'
    })
}

    }
    render(){
        const hasCameraPermission=this.state.hasCameraPermission
        const scanned=this.state.scanned
        const buttonState=this.state.buttonState
        if(buttonState!=='normal'&&hasCameraPermission){
            return(
                <BarCodeScanner
                onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}/>
            )
        }
        else if(buttonState=='normal'){

        
        return(
            <View style={styles.container}>
            <View>
            <Image
            source={require('../assets/booklogo.jpg')}
            style={{width:200,height:200}}/>
            <Text style={{textAlign:'center',fontSize:30}}> WILY</Text>
            </View>
            <View style={styles.inputView}>
            <TextInput
            style={styles.inputBox}
            placeholder='BookID'
            value={this.state.scannedBookID}
            />
            <TouchableOpacity style={styles.scannedButton}
                onPress={()=>{
                    this.getCameraPermisssion('BookID')
                }}>
                <Text style={styles.buttonText}>Scan</Text>    
            </TouchableOpacity>
            </View>
            <View style={styles.inputView}>
            <TextInput
            style={styles.inputBox}
            placeholder='StudentID'
            value={this.state.scannedStudentID}
            />
            <TouchableOpacity style={styles.scannedButton}
                onPress={()=>{
                    this.getCameraPermisssion('StudentID')
                }}>
                <Text style={styles.buttonText}>Scan</Text>    
            </TouchableOpacity>
            </View>

            </View>

        )
    }
}
}

const styles= StyleSheet.create({
    scanButton:{
        backgroundColor:'red',
        padding:10,
        margin:10
    },
    buttonText:{
        fontSize:20,
        textAlign:'center',
        marginTop:10
    },
    inputView:{
    flexDirection:'row',
    margin:20        
    },
    inputBox:{
        width:200,
        height:40,
        borderWidth:1.5,
        borderRightWidth:0,
        fontSize:20
    },
    scannedButton:{
        backgroundColor:'blue',
        width:50,
        borderWidth:1.5,
        borderLeftWidth:0
    }
})

