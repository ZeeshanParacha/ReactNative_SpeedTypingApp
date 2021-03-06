import React, { Component } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AppStyles from '../config/styles';
import PropTypes from 'prop-types';


export default class TabIcon extends Component {
    render() {
        const { name, tintColor, style, type } = this.props;

        switch (type) {
        case 'material':
            return (
                <Icon
                    style={style ? style : {}}
                    name={name}
                    size={24}
                    color={tintColor}
                />
            );
        case 'entypo':
            return (
                <EntypoIcon
                    style={style ? style : {}}
                    name={name}
                    size={24}
                    color={tintColor}
                />
            );
            case 'ionicons':
            return (
                <Ionicons
                    style={style ? style : {}}
                    name={name}
                    size={24}
                    color={tintColor}
                />
            );
        case 'rounded':
            return (
                <View style={styles.rounded}>
                    <Icon
                        style={style ? style : {}}
                        name={name}
                        size={24}
                        color={
                            tintColor === AppStyles.colors.inactiveGreyColor
                                ? AppStyles.colors.white
                                : tintColor
                        }
                    />
                </View>
            );
        }
    }
}
TabIcon.propTypes = {
    name: PropTypes.string,
    tintColor: PropTypes.string,
    style: PropTypes.object,
    type: PropTypes.string
};
TabIcon.defaultProps = {
    type: 'ionicons'
};

import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    rounded: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: AppStyles.colors.inactiveGreyColor,
        justifyContent: 'center',
        alignItems: 'center'
    }
});