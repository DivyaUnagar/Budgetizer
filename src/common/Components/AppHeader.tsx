import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../Utils/Colors'
import { RFValue } from 'react-native-responsive-fontsize'
import { FONTS } from '../Utils/Fonts'
import { IMAGES } from '../Utils/Images'
import { height } from '../Utils/Constant'
import { useNavigation } from '@react-navigation/native'

const AppHeader = ({headerTitle}: {headerTitle: string}) => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Image source={IMAGES.BACK} style={styles.backButtonIcon} />
        </TouchableOpacity>
      <Text style={styles.headerTitleText}>{headerTitle}</Text>
    </View>
  )
}

export default AppHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: RFValue(16),
        paddingVertical: RFValue(10),
    },
    headerTitleText: {
        fontSize: RFValue(20, height),
        fontFamily: FONTS.Medium,
        color: COLORS.BLACK,
        textAlign: 'center',
    },
    backButton: {
        position: 'absolute',
        left: RFValue(16),
    },
    backButtonIcon: {
        width: RFValue(24),
        height: RFValue(24),
        tintColor: COLORS.BLACK,
    }
})