import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView, Dimensions, Text, View, StyleSheet, TouchableOpacity, Alert, TouchableWithoutFeedback } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

import {
    LineChart
} from 'react-native-chart-kit'
import axios from 'axios'
import Svg, { Rect } from "react-native-svg";
import { outcomeMovements } from '../Store/actions/account'
import { URL } from '@env'
import moment from "moment";




const Texta = require('react-native-svg').Text

function Stadistics(props) {
    const width = Dimensions.get('window').width
    const height = 220
    const [decoratorValue, setDecoratorValue] = useState("0");
    const [decoratorX, setDecoratorX] = useState(700);
    const [decoratorY, setDecoratorY] = useState(0);
    const [days, setDays] = useState('')
    const [week, setWeek] = useState('')
    const [moth, setMoth] = useState('')
    const [label, setLabel] = useState('')
    const [data, setData] = useState('')
    const dispatch = useDispatch()
    const [estadisticas, setEstadisticas] = useState('')
    const usuario = useSelector(store => store.user)
    const account=useSelector(store=>store.account)
    console.log('usuario', usuario)
    console.log('cuenta', account)
    const stadistics = async () => {
        try {
            var est = await AsyncStorage.getItem('stadistics')
            setEstadisticas((JSON.parse(est)))

            // var tok = await AsyncStorage.getItem('token')
            // setToken((JSON.parse(tok)))
            console.log('token', estadisticas)

        } catch (error) {
            console.log(error)


        }

    }
    const actualizar=()=>{
        if(account){
            axios.get(`http://${URL}/api/account/est2?id=${account.account.id}`)
            .then((resp) => {
            if (resp) {
              
                const array=resp.data.content.gastos
                const labelGrafig =[] 
                const amount=[]
                array.map(item=>{
                    labelGrafig.push(moment(item.month).format('MMM'))
                     amount.push(item.total_amount)
                })
                console.log(array)
                setLabel(labelGrafig)
                setData(amount)

            }
        }).catch(err=>console.log(err))
        }


    }

    useEffect(() => {
       actualizar()
      
    }, [])

   
    const lastWeeks =  () => {
        setMoth('')
        setDays('')
        setLabel('')
      
        const days = 84
        axios.get(`http://${URL}/api/account/estadisticaGastos?id=${usuario.user.id}&days=${days}`)
            .then((resp) => {
                console.log('SEMANA', resp.data.content.gastosFraccionados.gastosSemanales)
                if (resp) {
                    setWeek(resp.data.content.gastosFraccionados.gastosSemanales)
                }
            })
            .catch(err => {
                Alert.alert(
                    'Error', //titulo
                    'You have not Income the last 12 weeks', //Mensaje
                    [{
                        text: 'OK', //Arreglo de botones
                        onPress: () => {
                            props.navigation.navigate('stadistics')
                            // setMoth('');
                            // setWeek('')
                            // dispatch(outcomeMovements(usuario.user.id,365))
                        },

                    },
                    {
                        text: 'Cancel',
                        style: 'cancel',
                        onPress: () => { props.navigation.navigate('UserProfile') },
                    }
                    ],
                )

            })
         createLabel(week)

    }
    const lastMoth =  () => {
        setLabel('')
        setDays('')
        setWeek('')
        // dispatch(outcomeMovements(usuario.user.id,365, props))

        const days = 180
        axios.get(`http://${URL}/api/account/estadisticaGastos?id=${usuario.user.id}&days=${days}`)
            .then((resp) => {
                console.log('MES', resp.data.content.gastosFraccionados.gastosMensuales)
                if (resp) {
                    setMoth(resp.data.content.gastosFraccionados.gastosMensuales)

                }
            })
            .catch(err => {
                Alert.alert(
                    'Error', //titulo
                    'You have not Income the last 6 moths', //Mensaje
                    [{
                        text: 'OK', //Arreglo de botones
                        onPress: () => {
                            props.navigation.navigate('stadistics')
                            // setMoth('');
                            // setWeek('')
                            // dispatch(outcomeMovements(usuario.user.id,365))
                        },

                    },
                    {
                        text: 'Cancel',
                        style: 'cancel',
                        onPress: () => { props.navigation.navigate('UserProfile') },
                    }
                    ],
                )

            })
         createLabel(moth)

    }

    const createLabel = (array) => {
        let labelGrafig = []
        if (typeof (array) === 'object') {
            labelGrafig = Object.keys(array).sort((a, b) => a - b) || [1]

        }

    
        setLabel(labelGrafig)
        if (labelGrafig.length > 0) {
            let arrayamount = []
            if (moth !== '') {
                setWeek('')
                console.log('MOTH', moth)
                // arrayamount=Object.keys(arra)
                for (var i = 0; i < labelGrafig.length; i++) {
                    if (moth[labelGrafig[i]]["$totalDelMes"] < 0) {
                        var aux = (moth[labelGrafig[i]]["$totalDelMes"]) * (-1)
                    }
                    else var aux = (moth[labelGrafig[i]]["$totalDelMes"])

                    arrayamount.push(aux)
                }
                setData(arrayamount)

            }
           
            if (week !== '') {
                setMoth('')
                console.log('WEEK', week)
                for (var i = 0; i < labelGrafig.length; i++) {
                    if (week[labelGrafig[i]]['totalSemana'] < 0) var aux = (week[labelGrafig[i]]['totalSemana']) * (-1)
                    else var aux = (week[labelGrafig[i]]['totalSemana'])

                    arrayamount.push(aux)
                }
                setData(arrayamount)
            }

            console.log('Array', data)
        } 

    }



    return (
        <View style={{ flex: 1, backgroundColor: '#292768' }}>

            <ScrollView >

                <View style={styles.view1}>
                 <TouchableWithoutFeedback onPress={()=>actualizar()}>
                      <Text style={styles.title}>My Stats</Text>
                      </TouchableWithoutFeedback>  

                </View>
                <View style={styles.view2}>
                    <View style={styles.graph}>
                        <Text style={styles.movements}>My account's balance </Text>
                        <View>
                            <LineChart
                                data={{
                                    labels: label || [1],
                                    datasets: [
                                        {
                                            data: data || [1]
                                        }
                                    ]
                                }}
                                fromZero
                                width={Dimensions.get("window").width - 10} // from react-native
                                height={270}
                                yAxisLabel="$"
                                decorator={() => {
                                    return (
                                        <View>
                                            <Svg>
                                                <Rect
                                                    x={decoratorX}
                                                    y={decoratorY + 10}
                                                    width="70"
                                                    height="30"
                                                    fill="black"
                                                    textAnchor="middle"
                                                />
                                                <Texta
                                                    x={decoratorX + 35}
                                                    y={decoratorY + 30}
                                                    fill="white"
                                                    fontSize="10"
                                                    fontWeight="bold"
                                                    textAnchor="middle"
                                                >
                                                    {decoratorValue}
                                                </Texta>
                                            </Svg>
                                        </View>
                                    );
                                }}
                                onDataPointClick={(data) => {
                                    setDecoratorValue(`$${data}`);
                                    if (data.x > 300) {
                                        setDecoratorX(parseInt(data.x - 50));
                                        setDecoratorY(parseInt(data.y));
                                    } else {
                                        setDecoratorX(parseInt(data.x));
                                        setDecoratorY(parseInt(data.y));
                                    }
                                }}
                                chartConfig={{
                                    backgroundColor: "#292768",
                                    backgroundGradientFrom: "#292768",
                                    backgroundGradientTo: "#292768",
                                    color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

                                    propsForDots: {
                                        r: "3",
                                        strokeWidth: "2",
                                        stroke: "#BB59FA",
                                    },
                                    propsForVerticalLabels: {
                                        fontSize: 8
                                    }
                                }}
                                bezier
                                withHorizontalLines={false}
                                formatYLabel={(num) => parseInt(num)}
                                formatXLabel={(num) => num % 2 === 0 && Object.keys(data).length > 10 ? '' : num}
                            />
                        </View>

                    </View>
                </View>
                <View style={{ marginTop: 20, alignItems: 'center' }}>
                    <Text style={{ ...styles.textButton, fontWeight: 'bold', letterSpacing: 2 }}>Selected Period:</Text>
                </View>
                <View
                    style={{
                        width: "100%",
                        marginVertical: 20,
                        flexDirection: 'row'
                    }}
                >

                    
                    <TouchableOpacity dark onPress={lastWeeks} style={styles.sortByText}>
                        <Text style={styles.textButton}>The Last 12 Week</Text>
                    </TouchableOpacity>
                    <TouchableOpacity dark onPress={lastMoth} style={styles.sortByText}>
                        <Text style={{ ...styles.textButton, justifyContent: 'flex-end' }}>The Last 6 Moth</Text>
                    </TouchableOpacity>
                   
                </View>
        
            </ScrollView>

        </View >


    )
}
export default Stadistics;

const styles = StyleSheet.create({
    movements: {
        fontSize: 16,
        textAlign: "center",
        marginVertical: 5,
        color: 'white',
        fontFamily: ''
    },
    menuOp: {
        height: 60,
        backgroundColor: "black",
    },
    view1: {
        flex: 3,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    view2: {
        flex: 10,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 30,
        marginTop: 50,
        marginVertical: 30,
        color: 'white'
    },
    sortByText: {
        width: 150,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: '#bb59fa',
        alignItems: 'center',
        marginVertical: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 3,
            height: 12,
        },
        marginHorizontal: '5%'
    },
    but:{
        width: 150,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        marginVertical: 20

    },
    textButton: {
        fontSize: 15,
        color: '#FFF',
        fontFamily: 'serif'
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});

