import React from 'react';
import {
  View,
  Text,
  Platform
} from 'react-native';
import PropTypes from 'prop-types';
import { Utils } from './Utils';
import Controls from './Controls';
import I18n from '../../../provider/TranslationProvider';
function isSameMonthAndYear(date, month, year) {
  if (date) {
    return date.month() === month && date.year() === year
  }
  return false;
}

export default function HeaderControls(props) {
  const {
    styles,
    currentMonth,
    currentYear,
    onPressNext,
    onPressPrevious,
    months,
    previousTitle,
    nextTitle,
    textStyle,
    restrictMonthNavigation,
    maxDate,
    minDate,
    headingLevel,
    previousTitleStyle,
    nextTitleStyle,
  } = props;
  const MONTHS = months? months : Utils.MONTHS; // English Month Array
  // getMonth() call below will return the month number, we will use it as the
  // index for month array in english
  const previous = previousTitle ? previousTitle : '<';
  const next = nextTitle ? nextTitle : '>';
  const month = MONTHS[currentMonth];
  const year = currentYear;

  const disablePreviousMonth = restrictMonthNavigation && isSameMonthAndYear(minDate, currentMonth, currentYear);
  const disableNextMonth = restrictMonthNavigation && isSameMonthAndYear(maxDate, currentMonth, currentYear);

  const accessibilityProps = { accessibilityRole: 'header' };
  if (Platform.OS === 'web') {
    accessibilityProps['aria-level'] = headingLevel;
  }

  return (
    <View style={{...styles.headerWrapper,...{height: props.headerHeight}}}>

      <Controls
        disabled={disablePreviousMonth}
        label={previous}
        onPressControl={onPressPrevious}
        styles={[styles.monthSelector, styles.prev]}
        textStyles={[textStyle, previousTitleStyle]}
      />

      <View>
        <Text style={[styles.monthLabel]} {...accessibilityProps}>
           { I18n.t('Calendar.'+month) } { year }
        </Text>
      </View>

      <Controls
        disabled={disableNextMonth}
        label={next}
        onPressControl={onPressNext}
        styles={[styles.monthSelector, styles.next]}
        textStyles={[textStyle, nextTitleStyle]}
      />

    </View>
  );
}

HeaderControls.propTypes = {
  currentMonth: PropTypes.number,
  currentYear: PropTypes.number,
  onPressNext: PropTypes.func,
  onPressPrevious: PropTypes.func,
};
