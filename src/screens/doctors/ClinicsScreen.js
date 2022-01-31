import React from "react";
import BaseScreen from "../../base/BaseScreen";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import CommonStyles from "../../global/styles/CommonStyles";
import Icon from 'react-native-vector-icons/Ionicons';
import {normalize} from "../../provider/Utils";

export default class ClinicsScreen extends BaseScreen {

    constructor(props) {
        super(props);
        this.state = {
            doctorWorkingAddressList: this.props.route.params?.doctorClinics,
            doctorID: this.props.route.params?.doctorID,
            doctorImage: this.props.route.params?.doctorImage,
            doctorName: this.props.route.params?.doctorName,
            doctorSpeciality: this.props.route.params?.doctorSpeciality,
        };

    }

    componentDidMount() {
        this.clearLoading();
        setTimeout(() => {
            this.hideLoading();
        }, 200);
    }

    renderContent() {
        const {pageHeight} = this.state;
        return (
            <ScrollView
                style={[
                    CommonStyles.noTabScrollView,
                    {
                        // minHeight: pageHeight + (pageHeight * 0.1),
                        // marginBottom: '25%'
                    }
                ]}>
                <View style={[CommonStyles.wrapperBox,{
                    minHeight:pageHeight + (pageHeight*0.1),
                    marginBottom:'25%'
                }]}>
                    {this._renderClinics()}
                </View>
            </ScrollView>
        );
    }

    _renderClinics() {
        if (this.state.doctorWorkingAddressList.length === 0) {
            return (
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: 'rgb(105,105,105)'
                    }}>No Clinics yet for this Doctor!</Text>
                </View>
            )
        }
        return this.state.doctorWorkingAddressList.map((item, index) => (
            <TouchableOpacity
                onPress={() => this._bookAppointmentAction(item.id)}>
                <Item
                    key={item.id}
                    hospitalName={item.title}
                    address={item.address1}
                    phone1={item.phone1}
                    email={item.email}
                />
            </TouchableOpacity>
        ));
    }

    _bookAppointmentAction(id) {
        this.navigate(this.constants.BOOK_APPOINTMENT_PAGE, {
            clinicID: id,
            doctorID: this.state.doctorID,
            doctorImage: this.state.doctorImage,
            doctorName: this.state.doctorName,
            doctorSpeciality: this.state.doctorSpeciality,
        });
    }

}
//
// class Item extends React.Component {
//     render() {
//         const {hospitalName, address, phone1, email} = this.props;
//
//         return (
//             <View
//                 style={[CommonStyles.CustomitemWhiteBox, {
//                     paddingLeft: 20,
//                     paddingRight: 20,
//                     paddingTop: 16,
//                     paddingBottom: 16,
//                     flexDirection: "row",
//                     justifyContent: 'space-between',
//                 },
//                 ]}>
//
//                 <View style={{
//                     width: '75%'
//                 }}>
//                     <Text
//                         style={[
//                             CommonStyles.headerText,
//                             CommonStyles.blackColor,
//                             CommonStyles.semiBold,
//                             {
//                                 marginBottom: '3%',
//                                 fontSize: normalize(10)
//                             },
//                         ]}>
//                         {hospitalName}
//                     </Text>
//                     <Text
//                         style={[
//                             CommonStyles.normalText,
//                             CommonStyles.greyColor,
//                             CommonStyles.regularBold,
//                             {
//                                 marginBottom: '2%',
//                                 fontSize: normalize(10)
//                             },
//                         ]}>
//                         {address}
//                     </Text>
//                     <Text
//                         style={[
//                             CommonStyles.normalText,
//                             CommonStyles.greyColor,
//                             CommonStyles.regularBold,
//                             {
//                                 marginBottom: '2%',
//                                 fontSize: normalize(10)
//                             },
//                         ]}>
//                         {phone1}
//                     </Text>
//                     <Text
//                         style={[
//                             CommonStyles.normalText,
//                             CommonStyles.greyColor,
//                             CommonStyles.regularBold,
//                             {
//                                 marginBottom: '2%',
//                                 fontSize: normalize(10)
//                             },
//                         ]}>
//                         {email}
//                     </Text>
//                 </View>
//                 <View
//                     style={{
//                         width: '20%',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         alignSelf: 'center',
//                         marginRight: '5%',
//                         // position: 'absolute',
//                         // marginLeft: 250,
//                         // marginTop: 60,
//                     }}>
//                     <View
//                         style={{
//                             paddingLeft: 8,
//                             width: 100,
//                             flex: 1,
//                             flexDirection: 'row',
//                             justifyContent: 'flex-end',
//                             alignItems: 'center',
//                             alignSelf: 'center'
//                         }}>
//                         <Text style={{color: '#2e8bcb', fontWeight: 'bold'}}>BOOK </Text>
//                         <Icon style={{color: '#2e8bcb'}} name="ios-arrow-forward"/>
//                     </View>
//                 </View>
//             </View>
//         );
//     }
// }


class Item extends React.Component {
    render() {
        const {hospitalName, address, phone1, email, pageWidth} = this.props;

        return (
            <View
                style={[styles.whiteBox, {
                    paddingLeft: '5%',
                    paddingHorizontal: '2%',
                    flexDirection: "row",
                    justifyContent: 'space-between',
                    marginTop: '2%'
                },
                ]}>

                <View style={{
                    width: '75%'
                }}>
                    <Text
                        style={[
                            // CommonStyles.headerText,
                            CommonStyles.blackColor,
                            CommonStyles.semiBold,
                            {
                                marginBottom: '3%',
                                fontSize: normalize(12, pageWidth)
                            },
                        ]}>
                        {hospitalName}
                    </Text>
                    <Text
                        style={[
                            // CommonStyles.normalText,
                            CommonStyles.greyColor,
                            CommonStyles.regularBold,
                            {
                                marginBottom: '2%',
                                fontSize: normalize(10, pageWidth)
                            },
                        ]}>
                        {address}
                    </Text>
                    <Text
                        style={[
                            // CommonStyles.normalText,
                            CommonStyles.greyColor,
                            CommonStyles.regularBold,
                            {
                                marginBottom: '2%',
                                fontSize: normalize(10, pageWidth)
                            },
                        ]}>
                        {phone1}
                    </Text>
                    <Text
                        style={[
                            // CommonStyles.normalText,
                            CommonStyles.greyColor,
                            CommonStyles.regularBold,
                            {
                                marginBottom: '2%',
                                fontSize: normalize(10, pageWidth)
                            },
                        ]}>
                        {email}
                    </Text>
                </View>
                <View
                    style={{
                        width: '20%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginRight: '5%',
                        // position: 'absolute',
                        // marginLeft: 250,
                        // marginTop: 60,
                    }}>
                    <View
                        style={{
                            paddingLeft: 8,
                            width: 100,
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            alignSelf: 'center'
                        }}>
                        <Text style={{
                            color: '#2e8bcb',
                            fontWeight: 'bold',
                            fontSize: normalize(10, pageWidth)
                        }}>BOOK </Text>
                        <Icon style={{color: '#2e8bcb'}} size={normalize(10)} name="ios-arrow-forward"/>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    directMap: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 22.5,
    },
    rightCol: {
        width: '20%',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        position: 'absolute',
        marginLeft: 250,
        marginTop: 60,
    },
    leftCol: {
        flex: 1,
        flexDirection: 'row',
    },
    whiteBox: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '100%',
        marginTop: '5%',
        paddingVertical: '1.5%',
        backgroundColor: 'white',
        borderWidth: 0.1,
        shadowOffset: {width: 10, height: 10},
        shadowColor: '#A9A9A9',
        shadowOpacity: 0.2,
    }
});

