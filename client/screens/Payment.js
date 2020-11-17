import React, { useState, useEffect} from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import  PaymentView  from '../src/componentes/PaymentView'
import axios  from 'axios'
import {colors} from '../utils/colors'

const Payment = () => {

    const [response, setResponse ] = useState()
    
    const [ makePayment, setMakePayment ] = useState(false)
    const [paymentStatus, setPaymentStatus] = useState('')

    const cartInfo = {
        id: '001',
        description: 'Recarga xxx',
        amount: 100
    }

    const onCheckStatus = async (paymentResponse) => {
        setPaymentStatus('Please wait while confirming your payment!')
        setResponse(paymentResponse)

        let jsonResponse = JSON.parse(paymentResponse);
        // perform operation to check payment status

        try {

            //aca va la llamada al back y la respuesta
    
            // const stripeResponse = await axios.post('http://localhost:8000/payment', {
            //     email: 'codergogoi@gmail.com',
            //     product: cartInfo,
            //     authToken: jsonResponse
            // })

            const stripeResponse = true;

            if(stripeResponse){

                // const { paid } = stripeResponse.data;
                const paid = true
                if(paid === true){
                    setPaymentStatus('Pago Aprobado')
                }else{
                    setPaymentStatus('El Pago no pudo realizarse')
                }

            }else{
                setPaymentStatus('El Pago no pudo realizarse')
            }

            
        } catch (error) {
            
            console.log(error)
            setPaymentStatus('El Pago no pudo realizarse')

        }
 
    }


    const paymentUI = () => {

        if(!makePayment){

            return <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 300, marginTop: 50}}>
                    <Text style={{ fontSize: 25, margin: 10}}> Recarga </Text>
                    <Text style={{ fontSize: 16, margin: 10}}> Descripcion: {cartInfo.description} </Text>
                    <Text style={{ fontSize: 16, margin: 10}}> Monto de la recarga: {cartInfo.amount} </Text>

                    <TouchableOpacity style={{ height: 60, width: 300, backgroundColor: colors.BACKGROUND_COLOR, borderRadius: 30, justifyContent: 'center', alignItems: 'center'
                        }}
                        onPress={() => {
                            setMakePayment(true)
                        }}
                        >
                        <Text style={{ color: '#FFF', fontSize: 20}}>
                            Recarga
                        </Text>

                    </TouchableOpacity>


                </View>


             
            // show to make payment
        }else{

            if(response !== undefined){
                return <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 300, marginTop: 50}}>
                    <Text style={{ fontSize: 25, margin: 10}}> { paymentStatus} </Text>
                    <Text style={{ fontSize: 16, margin: 10}}> { response} </Text>
                </View>

            }else{
                return <PaymentView onCheckStatus={onCheckStatus} product={cartInfo.description} amount={cartInfo.amount} />

            }
            
        }

    }


return (<View style={styles.container}>
            {paymentUI()}
        </View>)}


const styles = StyleSheet.create({
container: { flex: 1, paddingTop: 100},
})

 export default Payment 
