import React, { useEffect } from "react";
import { View ,Text} from "react-native";
import { withTheme } from "styled-components";


const ClientDetail = ({navigation}) => {
    useEffect(()=>{
      
    })
    return(
        <View>
                <Text>{JSON.stringify(navigation)}</Text>
        </View>
    )
}

export default ClientDetail