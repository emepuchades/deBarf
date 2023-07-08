import React, { useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import '../../languages/i18n';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { styleDrawer } from './drawerComponent.style';
import colors from '../../utils/colors';
import { signOut } from 'firebase/auth';
import { auth } from '../../utils/firebase';

const DrawerComponent = props => {

    const { t, i18n } = useTranslation();

    const [currentLanguage, setLanguage] = useState('es');

    const changeLanguage = value => {
        i18n
            .changeLanguage(value)
            .then(() => setLanguage(value))
            .catch(err => console.log(err));
    };


    const onSignOut = () => {
        signOut(auth).catch(error => console.log('Error logging out: ', error));
    };

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ backgroundColor: colors.primary }}>
                <ImageBackground
                    source={require('../../assets/images/menu-bg.jpeg')}
                    style={styles.imageBackground}>
                    <Image
                        source={require('../../assets/images/user-profile.jpeg')}
                        style={styles.imageProfile}
                    />
                    <Text style={styles.textUsername}>
                        Arya Puchades
                    </Text>
                </ImageBackground>
                <View style={styles.listNavigaton}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={styles.navBottom}>
                <View>
                    <TouchableOpacity onPress={() => changeLanguage('es')} style={styles.buttons}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: currentLanguage === 'es' ? 'bold' : 'normal',
                            marginLeft: 5,
                        }}>{t('languages.es')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => changeLanguage('en')} style={styles.buttons}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: currentLanguage === 'en' ? 'bold' : 'normal',
                            marginLeft: 5,
                        }}>{t('languages.en')}</Text>
                    </TouchableOpacity>

                </View>
                <TouchableOpacity onPress={() => onSignOut()} style={styles.buttons}>
                    <View style={styles.containerSignOut}>
                        <Ionicons name="exit-outline" size={22} />
                        <Text style={styles.textSignOut}>
                            {t('navBottom.signOut')}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DrawerComponent;

const styles = StyleSheet.create(styleDrawer);