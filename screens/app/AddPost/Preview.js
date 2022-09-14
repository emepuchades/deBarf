import React from "react";
import { View, Text, ScrollView } from "react-native";
import PhotoComponent from "../../../components/PhotoComponent";

const Preview = ({ image }) => {
    return (
        <View>
            <ScrollView>
                <Text>Preview</Text>
                <PhotoComponent uri={image} />
            </ScrollView>
        </View>
    );
};

export default Preview;

