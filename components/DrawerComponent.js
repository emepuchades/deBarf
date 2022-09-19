import React, { useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import '../languages/i18n';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const DrawerComponent = props => {

    const { t, i18n } = useTranslation();

    const [currentLanguage, setLanguage] = useState('en');

    const changeLanguage = value => {
        i18n
            .changeLanguage(value)
            .then(() => setLanguage(value))
            .catch(err => console.log(err));
    };

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ backgroundColor: '#8200d6' }}>
                <ImageBackground
                    source={require('../assets/images/menu-bg.jpeg')}
                    style={{ padding: 20 }}>
                    <Image
                        source={require('../assets/images/user-profile.jpeg')}
                        style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}
                    />
                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 18,
                            marginBottom: 5,
                        }}>
                        Arya Puchades
                    </Text>
                </ImageBackground>
                <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                <View>
                    <TouchableOpacity onPress={() => changeLanguage('es')} style={{ paddingVertical: 15 }}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: currentLanguage === 'es' ? 'bold' : 'normal',
                            marginLeft: 5,
                        }}>{t('languages.es')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => changeLanguage('en')} style={{ paddingVertical: 15 }}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: currentLanguage === 'en' ? 'bold' : 'normal',
                            marginLeft: 5,
                        }}>{t('languages.en')}</Text>
                    </TouchableOpacity>

                </View>
                <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="exit-outline" size={22} />
                        <Text
                            style={{
                                fontSize: 15,
                                marginLeft: 5,
                            }}>
                            {t('navBottom.signOut')}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DrawerComponent;