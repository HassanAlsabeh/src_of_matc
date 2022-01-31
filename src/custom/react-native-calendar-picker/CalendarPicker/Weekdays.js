import React from 'react';
import {Text, View,} from 'react-native';
import {Utils} from './Utils';
import I18n from '../../../provider/TranslationProvider';

export default function Weekdays(props) {
  const {
    styles,
    startFromMonday,
    weekdays,
    textStyle,
    dayLabelsWrapper,
    dayOfWeekStyles,
  } = props;
  let wd = weekdays;
  if (!wd) {
    wd = startFromMonday? Utils.WEEKDAYS_MON : Utils.WEEKDAYS; // English Week days Array
  }

  return (
    <View style={[styles.dayLabelsWrapper, dayLabelsWrapper]}>
      { wd.map((day, key) => {
        let updatedStyle = textStyle;
        try {
          if (dayOfWeekStyles[+key]) {
            let currentDayStyle = dayOfWeekStyles[+key];
            if (currentDayStyle) {
              updatedStyle = [updatedStyle, currentDayStyle];
            }
          }
        } catch (error) {
          console.log('Error while updating weekday style: ' + error);
        }

          return (
            <Text key={key} style={[styles.dayLabels, updatedStyle]}>
              {I18n.t('Calendar.'+day)}
            </Text>
          );
        })
      }
    </View>
  );
}

Weekdays.propTypes = {};
